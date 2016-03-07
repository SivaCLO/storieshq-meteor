// A spoken region in an audio

Region = React.createClass({

playRegion() {
	this.props.audioElem.playRegion(this.region.start, this.region.end);
},

seekToRegion() {
	this.props.audioElem.seekTo(this.region.start, this.region.prev, this.region.next);
},

componentDidMount() {
	var regionId = this.regionId;
    
    var canvas = document.getElementById(this.regionId);
    var ctx = canvas.getContext("2d");
    if (this.region.silent) {
    	ctx.fillStyle = "#F6F6F6";
    } else {
    	ctx.fillStyle = "blue";
    }
	
	ctx.fillRect(0, 0, this.region.width, 20);
	
},

render() {
	this.region = this.props.region;
	this.regionId = "region-" + this.region.start + "-" + this.region.end;
	
	return (
		<canvas id={this.regionId} ref={this.regionId} height="20" width={this.region.width} onClick={this.seekToRegion}>
		</canvas>
	);
}

});