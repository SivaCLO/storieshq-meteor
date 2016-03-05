Script = React.createClass({
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
    Meteor.call("setNotes", this.props.podcastId, notes, function(error, result) {
      if (error) {
        alert(error.reason);
      }
    });
  },

  render() {
    return <div className="script">
      <Header podcastId={this.props.podcastId} headerText={this.data.podcast.title ? this.data.podcast.title : "Untitled"}/>
      <div className="text-center">
        <h2>Script</h2>
        <div><textarea onChange={this.save} ref="notes" placeholder="Write down Script, Agenda, Ideas, Questions,..." defaultValue={this.data.podcast && this.data.podcast.notes ? this.data.podcast.notes : ""}></textarea></div>
        <p><button onClick={this.record} className="btn btn-warning">I'm done Scripting. Start Recording</button></p>
      </div>
    </div>
  }
});
