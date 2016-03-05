Edit = React.createClass({

  propTypes: {
    podcastId: React.PropTypes.string.isRequired
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      podcast: Podcasts.findOne({_id: this.props.podcastId}),
    };
  },

  componentWillMount() {
    if(!this.data.podcast) {
      FlowRouter.go('/');
    }
  },

  componentDidMount() {
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
    wavesurfer.load('https://s3.amazonaws.com/stories-files/7JNjgRy42tsQJS2xG.mp3');
    var audioElem = ReactDOM.render(< AudioElement/>, document.getElementById("audioMap"));
    audioElem.init(wavesurfer);

    this.showLoader();

  	wavesurfer.on('ready', function () {
      ReactDOM.render(<AudioMap audioElem={audioElem} />, document.getElementById("audioMap"));
    });
  },

  publish() {
    FlowRouter.go("/" + this.props.podcastId + "/publish");
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
    return <div className="edit">
      <Header podcastId={this.props.podcastId} headerText={this.data.podcast.title ? this.data.podcast.title : "Untitled"}/>
      <div className="text-center">
        <h2>Edit</h2>
        <div id="audioMap"></div>
        <button onClick={this.publish} className="btn btn-success">I'm done Editing. Start Publishing</button>
      </div>
    </div>

  }
});
