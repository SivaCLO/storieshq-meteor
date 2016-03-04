Script = React.createClass({
  propTypes: {
    podcastId: React.PropTypes.string.isRequired
  },

  mixins: [ReactMeteorData],

  record() {
    Meteor.call("setState", this.props.podcastId, 1, function(error, result) {
      if (error) {
        alert(error.reason);
      }
    });
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
      <br></br>
      <br></br>

      <h3>Script</h3>
      <div><textarea ref="notes" placeholder="Write down Script, Agenda, Ideas, Questions,..." defaultValue={this.data.podcast && this.data.podcast.notes ? this.data.podcast.notes : ""}></textarea></div>
      <input type="submit" value="Save" onClick={this.save}></input>
        <br></br>
        <br></br>

      <button onClick={this.record} className="btn btn-primary">I'm done Scripting. Start Recording</button>
    </div>
  }
});
