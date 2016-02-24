// Audio Map (regions divided by silence) for the uploaded audio

AudioMap = React.createClass({

getInitialState() {
	return {
		spokenRegions : [],
		silentRegions : []
	};
},

populateRegions(wavesurfer) {
	var peaks = wavesurfer.backend.getPeaks(20000);
	var duration = wavesurfer.getDuration();
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
    var spokenTsRegions = fRegions.map(function (reg) {   	
    	var startTime = Math.round(reg.start * coef * 10) / 10;
    	var endTime = Math.round(reg.end * coef * 10) / 10;
        return {
            start: startTime,
            end: endTime,
            width : (endTime - startTime) * 30 
        };
    });
    
    this.spokenRegions = spokenTsRegions;
},

splitRegionsByLineWidth(lineWidth) {
	var curWidth = 0;
	var splitRegions = [];
	var lineRegions = [];
	var availableWidth;
	
	var i = 0, j = 0;
	var spokenRegions = this.spokenRegions;
	var silentRegions = this.silentRegions;
	var region;;
	
	while (i < spokenRegions.length || j < silentRegions.length) {
			
		if ( i == spokenRegions.length || spokenRegions[i].start > silentRegions[j].start )
			region = silentRegions[j++];
		else if ( j == silentRegions.length || silentRegions[j].start > spokenRegions[i].start )
			region = spokenRegions[i++];
				
		if( region.width + curWidth > lineWidth) {
			availableWidth = lineWidth - curWidth;
			var remWidth = region.width;
			var regionStart = region.start;
			var regionEnd = region.end;
			
			while (remWidth > availableWidth) {
				lineRegions.push({
					start : regionStart, 
					end : regionStart + availableWidth/30,
					width : availableWidth,
					silent : region.silent
				});
				
				regionStart = regionStart + availableWidth/30;
				remWidth = remWidth - availableWidth
				availableWidth = lineWidth;
				
				splitRegions.push(lineRegions);
				curWidth = 0;
				lineRegions = [];
			}
			
			lineRegions.push({
				start : regionStart, 
				end : regionEnd,
				width : remWidth,
				silent : region.silent 
			});
			curWidth += remWidth;
			
		} else {
			lineRegions.push(region);
			curWidth += region.width;
		}		
	}
	splitRegions.push(lineRegions);
	return splitRegions;
},

displayRegionsForLine(splitRegions) {
	return splitRegions.map((splitRegion) => {
		return <RegionLine regions = {splitRegion}
						   ws = {this.props.ws}
			   />;
		});
},

play() {
	this.props.ws.play();
},

pause() {
	this.props.ws.pause();
},

stop() {
	this.props.ws.seekTo(0);
	this.props.ws.pause();
},

render() {	
	this.populateRegions(this.props.ws);
	var splitRegions = this.splitRegionsByLineWidth(1296);
	return (
		<div className="audioMap">	
			<br> </br>
			<p className="text-center"> <b> Spoken Regions </b> </p>
			{this.displayRegionsForLine(splitRegions)}
			
			<div className="text-center">
			<button onClick={this.play} className ="btn btn-primary playPause">
			<span> Play </span>
			</button>
			
			<button onClick={this.pause} className="btn btn-primary playPause">
			<span> Pause </span>
			</button>
			
			<button onClick={this.stop} className="btn btn-primary playPause">
			<span> Stop </span>
			</button>
			</div>
		</div>
	);
}
});