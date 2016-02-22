// Audio Map (regions divided by silence) for the uploaded audio

AudioMap = React.createClass({

fetchRegions(wavesurfer) {
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

    // Create regions on the edges of silences
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

    // Return time-based regions
    return fRegions.map(function (reg) {   	
    	var startTime = Math.round(reg.start * coef * 10) / 10;
    	var endTime = Math.round(reg.end * coef * 10) / 10;
        return {
            start: startTime,
            end: endTime,
            width : (endTime - startTime) * 20 
        };
    });
	
},

splitRegionsByLineWidth(lineWidth, regions) {
	var curWidth = 0;
	var splitRegions = [];
	var lineRegions = [];
	
	for (var i = 0; i < regions.length; i++) {
		var region = regions[i];
				
		if( region.width + curWidth > lineWidth) {
			var availableWidth = lineWidth - curWidth;
			var remWidth = region.width;
			var regionStart = region.start;
			var regionEnd = region.end;
			
			while (remWidth > availableWidth) {
				lineRegions.push({
					start : regionStart, 
					end : regionStart + availableWidth/20,
					width : availableWidth
				});
				
				regionStart = regionStart + availableWidth/20;
				remWidth = remWidth - availableWidth
				availableWidth = lineWidth;
				
				splitRegions.push(lineRegions);
				curWidth = 0;
				lineRegions = [];
			}
			
			lineRegions.push({
				start : regionStart, 
				end : regionEnd,
				width : remWidth 
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
			   />;
		});
},

render() {	
	var regions = this.fetchRegions(this.props.ws);
	var splitRegions = this.splitRegionsByLineWidth(1000, regions);
	return (
		<div className="text-center">	
		<br> </br>
		<p> <b> Spoken Regions </b> </p>
			{this.displayRegionsForLine(splitRegions)}
		</div>
	);
}
});