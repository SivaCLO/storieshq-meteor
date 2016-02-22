// File upload component

FileUpload = React.createClass({

fetchUploadedFile() {
	var uploadedFile = React.findDOMNode(this.refs.fileUpload).value;
	React.findDOMNode(this.refs.textInput).value = uploadedFile;
	var wavesurfer = Object.create(WaveSurfer);
	wavesurfer.init({
        container: '#audioMap',
        height: 100,
        pixelRatio: 1,
        scrollParent: true,
        normalize: true,
        minimap: true,
        backend: 'WebAudio'
    });
    wavesurfer.load('DegreeOfSeparation.mp3');
	wavesurfer.on('ready', function () {
         ReactDOM.render(<AudioMap ws={wavesurfer} />, document.getElementById("audioMap"));
    });
},

render() {
	return (
		<div className="text-center">
		 <input id="uploadFile" placeholder="Choose File" disabled="disabled" ref="textInput"/>
  		 <div className="fileUpload btn btn-primary">
    		<span>Upload your audio</span>
    		<input id="uploadBtn" type="file" ref="fileUpload" onChange={this.fetchUploadedFile} className="upload" accept="audio/*"/>
   		 </div>
    	</div>
	);
}

});