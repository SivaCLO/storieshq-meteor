Record = React.createClass({
  propTypes: {
    podcastId: React.PropTypes.string.isRequired
  },

  mixins: [ReactMeteorData],

  edit() {
    FlowRouter.go('/' + this.props.podcastId + '/edit');
  },

  getMeteorData() {
    console.log(Podcasts.findOne({_id: this.props.podcastId}));
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
    return <div className="record">
      <Header />
      <br></br>
      <br></br>
      <p>Setup & Record your podcast</p>
      <p>Title : {this.data.podcast && this.data.podcast.title ? this.data.podcast.title : ""}</p>
      <input type="text" ref="title" placeholder="Enter new title"></input>
      <input type="submit" value="Save" onClick={this.saveTitle}></input>
        <br></br>
        <br></br>
      <button className="btn btn-primary">Start Recording</button>
      <button onClick={this.edit} className="btn btn-primary">Edit & Publish</button>
    </div>
  }
});
