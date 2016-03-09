// Audio Map (regions divided by silence) for the uploaded audio

AudioMap = React.createClass({

getInitialState() {
	return {
		spokenRegions : [],
		silentRegions : []
	};
},

extractParams() {
	this.audioElem = this.props.audioElem;
	this.spokenRegions = this.audioElem.spokenRegions;
	this.silentRegions = this.audioElem.silentRegions;	
	this.version = this.props.version;
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
						   audioElem = {this.audioElem}
			   />;
		});
},

play() {
	this.audioElem.play();
},

pause() {
	this.audioElem.wavesurfer.pause();
},

stop() {
	this.audioElem.stop();
},

prev() {
	var previousRegion = this.audioElem.wavesurfer.prevRegion;
	var index = previousRegion.position;
	this.audioElem.seekTo(previousRegion.start, this.spokenRegions[index - 1], this.spokenRegions[index + 1]);
},

next() {
	var nextRegion = this.audioElem.wavesurfer.nextRegion;
	var index = nextRegion.position;
	this.audioElem.seekTo(nextRegion.start, this.spokenRegions[index - 1], this.spokenRegions[index + 1]);
},

delete() {
	var startTime = 5;
	var endTime = 10;
	var my = this;
	
	this.audioElem.showLoader();
	Meteor.call("delete", "7JNjgRy42tsQJS2xG", this.version, startTime, endTime, function(error,nextVersion) {
		if(error) {
			console.log(error.reason);
		} else {
			my.setState({ version: nextVersion });
			my.audioElem.loadWavesurfer("7JNjgRy42tsQJS2xG", nextVersion);
		}
	});
},

render() {	
	this.extractParams();
	var lineWidth = screen.width * 0.9;
	var splitRegions = this.splitRegionsByLineWidth(lineWidth);
	
	this.audioElem.bindEvents();
	var animStyle = {
            position : 'relative',
            left :'0px',
            top : '50px',
            color : 'red'
        };
	return (
		<div className="audioMap">	
			<br> </br>
			  <div id="progressBar" className="glyphicon glyphicon-music" style={animStyle}/>
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
			
			<button onClick={this.prev} className="btn btn-primary playPause">
			<span> Prev </span>
			</button>
			
			<button onClick={this.next} className="btn btn-primary playPause">
			<span> Next </span>
			</button>
			
			<button onClick={this.delete} className="btn btn-primary playPause">
			<span> Delete </span>
			</button>
			</div>
		</div>
	);
}
});