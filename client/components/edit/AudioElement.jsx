// Encapsulates the functionality for the playback of audio

AudioElement = React.createClass({

init(podcastId) {
	var wavesurfer = Object.create(WaveSurfer);
  	wavesurfer.init({
          container: '#audioMap',
          height: 100,
          pixelRatio: 1,
          scrollParent: true,
          normalize: true,
          minimap: true,
          backend: 'WebAudio'
   	});
    this.wavesurfer = wavesurfer;
    this.loadWavesurfer(podcastId);    
},

loadWavesurfer(podcastId, version) {
	var my = this;
	if(version) podcastId = podcastId + "_" + version;
	this.showLoader();
	
	this.wavesurfer.load('https://s3.amazonaws.com/stories-files/' + podcastId + '.mp3');    
  	this.wavesurfer.on('ready', function () {
  		my.populateRegions();
      	ReactDOM.render(<AudioMap audioElem={my} version={version} />, document.getElementById("audioMap"));     
    });
},

showLoader() {
	var divElem = document.createElement('div');
	divElem.setAttribute('align','center');

	var imgElement = document.createElement("img");
	imgElement.setAttribute('id', 'loading');
	imgElement.setAttribute('src', 'http://blog.teamtreehouse.com/wp-content/uploads/2015/05/loading.gif');

	divElem.appendChild(imgElement);
	document.getElementById("audioMap").innerHTML = "";
	document.getElementById("audioMap").appendChild(divElem);
},

populateRegions() {
	var peaks = this.wavesurfer.backend.getPeaks(20000);
	var duration = this.wavesurfer.getDuration();
	// Silence params
    var minValue = 0.015;
    var minSeconds = 0.25;

    var length = peaks.length;
    var coef = duration / length;
    var minLen = minSeconds / coef;

    // Gather silence indeces
    var silences = [];
    Array.prototype.forEach.call(peaks, function (val, index) {
        if (Math.abs(val) <= minValue) {
            silences.push(index);
        }
    });

    // Cluster silence values
    var clusters = [];
    silences.forEach(function (val, index) {
        if (clusters.length && val == silences[index - 1] + 1) {
            clusters[clusters.length - 1].push(val);
        } else {
            clusters.push([ val ]);
        }
    });

    // Filter silence clusters by minimum length
    var fClusters = clusters.filter(function (cluster) {
        return cluster.length >= minLen;
    });
	
	// Fetch time-based silent regions
	var silentTsRegions = fClusters.map(function(cluster, index) {
		var startTime = Math.round(cluster[0] * coef * 10) / 10;
    	var endTime = Math.round(cluster[cluster.length - 1] * coef * 10) / 10;
		return {
			start : startTime,
			end : endTime,
			width : (endTime - startTime) * 30 ,
			silent : true
		};
	});
	
	this.silentRegions = silentTsRegions;
	
    // Create spoken regions on the edges of silences
    var regions = fClusters.map(function (cluster, index) {
        var next = fClusters[index + 1];
        return {
            start: cluster[cluster.length - 1],
            end: (next ? next[0] : length - 1)
        };
    });

    // Add an initial region if the audio doesn't start with silence
    var firstCluster = fClusters[0];
    if (firstCluster && firstCluster[0] != 0) {
        regions.unshift({
            start: 0,
            end: firstCluster[firstCluster.length - 1]
        });
    }

    // Filter regions by minimum length
    var fRegions = regions.filter(function (reg) {
        return reg.end - reg.start >= minLen;
    });

    // Fetch time-based spoken regions
    var spokenTsRegions = fRegions.map(function (reg, index) {   	
    	var startTime = Math.round(reg.start * coef * 10) / 10;
    	var endTime = Math.round(reg.end * coef * 10) / 10;
        return {
            start: startTime,
            end: endTime,
            width : (endTime - startTime) * 30 ,
            position: index
        };
    });
    
    spokenTsRegions = spokenTsRegions.map(function (reg, index) {  
    	var nextRegion;
    	if ( index == spokenTsRegions.length ) nextRegion = undefined;
    	else nextRegion = spokenTsRegions[index + 1];
    	
    	if ( index == 0 ) prevRegion = undefined;
    	else prevRegion = spokenTsRegions[index - 1]; 	
        return {
            start: reg.start,
            end: reg.end,
            width : reg.width,
            next : nextRegion,
            prev : prevRegion,
            position: reg.position
        };
    });
    
    this.loadRegions(spokenTsRegions);
    this.wavesurfer.nextRegion = spokenTsRegions[0];
    this.spokenRegions = spokenTsRegions;
},

loadRegions(spokenRegions) {
	for ( var i = 0; i < spokenRegions.length; i++ ) {
		this.wavesurfer.addRegion(spokenRegions[i]);
	}
},

seekTo(startTime, prev , next) {
	this.wavesurfer.backend.seekTo(startTime);
	this.updateProgressBar(startTime);
	if (this.wavesurfer.isPlaying()) {
		this.wavesurfer.play();
	} else {
		this.wavesurfer.prevRegion = prev;
		this.wavesurfer.nextRegion = next;
	}
},

stop() {
	this.wavesurfer.pause();
	this.wavesurfer.backend.seekTo(0);
	this.updateProgressBar(0);
},

updateProgressBar(startTime) {
	var currentTimeWidth = (startTime) *30;
    var top = (~~(currentTimeWidth / 1296)*45) + 50;
    var left = currentTimeWidth % 1296;
    document.getElementById('progressBar').style.top = top + 'px';
    document.getElementById('progressBar').style.left = left + 'px';
},


play(start,end) {
	this.wavesurfer.play(start,end);
	this.startProgressBar();
},

playRegion(start,end) {
	this.play(start,end);
	while(this.wavesurfer.isPlaying()) {}
	this.seekTo(start);
},

startProgressBar() {
	var ws = this.wavesurfer;
    var requestFrame = window.requestAnimationFrame ||
                           window.webkitRequestAnimationFrame ||
                           window.mozRequestAnimationFrame;
    var frame = function () {
		if (!ws.backend.isPaused()) {
			var lineWidth = screen.width * 0.9;
			var currentTimeWidth = (ws.backend.getCurrentTime()) *30;
			var top = (~~(currentTimeWidth / lineWidth)*45) + 50;
			var left = currentTimeWidth % lineWidth;
			document.getElementById('progressBar').style.top = top + 'px';
			document.getElementById('progressBar').style.left = left + 'px';
			requestFrame(frame);
		}
	};
	
	frame();
},

bindEvents() {
	var regionEntered = function(region) {
		region.wavesurfer.currentRegion = region;
		region.wavesurfer.nextRegion = region.next;
		region.wavesurfer.prevRegion = region.prev;
	};
	
	this.wavesurfer.on('region-in', regionEntered);
	
},

render() {
	return null;
},

});