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
  	var audioElem = ReactDOM.render(< AudioElement/>, document.getElementById("audioMap"));
    audioElem.init("7JNjgRy42tsQJS2xG");
  },

  publish() {
    FlowRouter.go("/" + this.props.podcastId + "/publish");
  },

  render() {
    return <div className="edit">
      <Header podcastId={this.props.podcastId} headerText={this.data.podcast.title ? this.data.podcast.title : "Untitled"}/>
      <div>
        <h2 className="text-center">Edit</h2>
        <div id="audioMap"></div>
        <div className="text-center">
          <button onClick={this.publish} className="btn btn-success">I'm done Editing. Start Publishing</button>
      	</div>
      </div>
    </div>

  }
});
