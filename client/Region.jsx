// A spoken region in an audio

Region = React.createClass({

playRegion() {
	this.props.ws.play(this.props.startTime, this.props.endTime);
	this.props.ws.backend.seekTo(this.props.startTime);
},

seekToRegion() {
	this.props.ws.backend.seekTo(this.props.startTime);
	this.props.ws.pause();
},

render() {
	var regionId = "region-" + this.props.startTime + "-" + this.props.endTime;
	var bgColor = 'blue';
	if (this.props.silent) {
		bgColor = 'lightblue';
	}
	var blockWidth = this.props.width + 'px';
	var blockStyle = {
            width: blockWidth,
            backgroundColor: bgColor
        };
	return (
		<div id={regionId} className="region" onClick={this.seekToRegion} onDoubleClick={this.playRegion} style={blockStyle}>
		</div>
	);
}

});