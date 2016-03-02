Edit = React.createClass({

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
    wavesurfer.load('/DegreeOfSeparation.mp3');
    var audioElem = ReactDOM.render(< AudioElement/>, document.getElementById("audioMap"));
    audioElem.init(wavesurfer);

    this.showLoader();

  	wavesurfer.on('ready', function () {
      ReactDOM.render(<AudioMap audioElem={audioElem} />, document.getElementById("audioMap"));
    });
  },

  publish() {
    Meteor.call("setState", this.props.podcastId, 3, function(error, result) {
      if (error) {
        alert(error.reason);
      }
    });
    ReactLayout.render(Publish, {podcastId: this.props.podcastId});
  },

showLoader() {
	var divElem = document.createElement('div');
	divElem.setAttribute('align','center');

	var imgElement = document.createElement("img");
	imgElement.setAttribute('id', 'loading');
	imgElement.setAttribute('src', 'http://blog.teamtreehouse.com/wp-content/uploads/2015/05/loading.gif');

	divElem.appendChild(imgElement);
	document.getElementById("audioMap").innerHTML = "";
	document.getElementById("audioMap").appendChild(divElem);
},

  render() {
    return (
      <div className="edit">
        <Header />
        <br></br>
        <br></br>
        <Title podcastId={this.props.podcastId}/>

        <h3>Edit</h3>
        <button onClick={this.publish} className="btn btn-primary">I'm done Editing. Start Publishing</button>
        <div className="text-center">
          <input id="uploadFile" placeholder="Choose File" disabled="disabled" ref="textInput"/>
          <div className="fileUpload btn btn-primary">
            <span>Upload your audio</span>
            <input id="uploadBtn" type="file" ref="fileUpload" onChange={this.fetchUploadedFile} className="upload" accept="audio/*"/>
          </div>
        </div>
        <div id="audioMap"></div>
      </div>
    );
  }
});
