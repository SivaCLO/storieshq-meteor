PodcastHome = React.createClass({
  propTypes: {
    podcastId: React.PropTypes.string.isRequired
  },

  mixins: [ReactMeteorData],

  record() {
    ReactLayout.render(Record, {podcastId: this.props.podcastId});
  },

  getMeteorData() {
    return {
      podcast: Podcasts.findOne({_id: this.props.podcastId}),
    };
  },

  save() {
    var notes = ReactDOM.findDOMNode(this.refs.notes).value.trim();
    Meteor.call("setup", this.props.podcastId, title, function(error, result) {
      if (error) {
        alert(error.reason);
      }
    });
  },

  render() {
    return <div className="script">
      <Header podcastId={this.props.podcastId}/>
      <div className="text-center">
        <h2>{this.data.podcast.title ? this.data.podcast.title : "Untitled"}</h2>
      </div>
    </div>
  }
});
