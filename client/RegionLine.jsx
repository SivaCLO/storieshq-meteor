// A single line of regions

RegionLine = React.createClass({

displayRegions(regions) {
	return regions.map((region) => {
		return <Region startTime={region.start} 
					   endTime={region.end} 
					   width={region.width} 
			   />;
		});
},

render() {
	var regions = this.props.regions;
	return (
		<div>
		{this.displayRegions(regions)}	
		</div>
	);
}

});