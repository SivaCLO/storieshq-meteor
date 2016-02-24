// A single line of regions

RegionLine = React.createClass({

displayRegions(regions) {
	return regions.map((region) => {
		return <Region startTime={region.start} 
					   endTime={region.end} 
					   width={region.width}
					   silent={region.silent} 
					   ws={this.props.ws}
			   />;
		});
},

render() {
	var regions = this.props.regions;
	return (
		<div align="left">
			{this.displayRegions(regions)}	
			<br> </br>
		</div>
	);
}

});