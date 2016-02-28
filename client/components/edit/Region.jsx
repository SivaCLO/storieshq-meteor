// A spoken region in an audio

Region = React.createClass({

playRegion() {
	this.props.audioElem.playRegion(this.region.start, this.region.end);
},

seekToRegion() {
	this.props.audioElem.seekTo(this.region.start, this.region.prev, this.region.next);
},

render() {
	this.region = this.props.region;
	var regionId = "region-" + this.region.start + "-" + this.region.end;
	var bgColor = 'blue';
	if (this.region.silent) {
		bgColor = 'lightblue';
	}
	var blockWidth = this.region.width + 'px';
	var blockStyle = {
            width: blockWidth,
            backgroundColor: bgColor
        };
	return (
		<div id={regionId} className="region" onClick={this.seekToRegion} style={blockStyle}>
		</div>
	);
}

});