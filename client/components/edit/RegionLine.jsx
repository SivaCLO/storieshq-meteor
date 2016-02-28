// A single line of regions

RegionLine = React.createClass({

displayRegions(regions) {
	return regions.map((region) => {
		return <Region region={region} 
					   audioElem={this.props.audioElem}
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