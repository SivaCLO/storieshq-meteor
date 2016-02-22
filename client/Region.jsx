// A spoken region in an audio

Region = React.createClass({

render() {
	var regionId = "region-" + this.props.start + "-" + this.props.end;
	var blockWidth = this.props.width + 'px';
	var blockStyle = {
            width: blockWidth
        };
	return (
		<div id="region" style={blockStyle}>
		</div>
	);
}

});