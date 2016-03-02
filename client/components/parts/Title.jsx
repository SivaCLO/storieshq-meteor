Title = React.createClass({
  propTypes: {
    podcastId: React.PropTypes.string.isRequired
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      podcast: Podcasts.findOne({_id: this.props.podcastId}),
    };
  },

  saveTitle() {
    var title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    Meteor.call("setTitle", this.props.podcastId, title, function(error, result) {
      if (error) {
        alert(error.reason);
      }
    });
  },

  render() {
    return <div className="title">
      Title : <input type="text" ref="title" placeholder="Untitled" defaultValue={this.data.podcast && this.data.podcast.title ? this.data.podcast.title : ""}></input>
      <input type="submit" value="Change Title" onClick={this.saveTitle}></input>
        <br></br>
        <br></br>
    </div>
  }
});
