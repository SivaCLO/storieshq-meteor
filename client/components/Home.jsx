Home = React.createClass({

  mixins: [ReactMeteorData],

  setup() {

    Meteor.call("createPodcast", function(error, result) {
      if (error) {
        alert(error.reason);
      } else {
        if(result) {
          FlowRouter.go('/' + result);
        }
      }
    });
  },

  getMeteorData() {
    return {
      inProgressPodcasts: Podcasts.find({state: { $ne: 99}}, {sort: {createdAt: -1}}).fetch(),
      publishedPodcasts: Podcasts.find({state: 99}, {sort: {createdAt: -1}}).fetch(),
    };
  },

  renderInProgressPodcasts() {
    return this.data.inProgressPodcasts.map((podcast) => {
      return <Podcast key={podcast._id} podcast={podcast} />;
    });
  },

  renderPublishedPodcasts() {
    return this.data.publishedPodcasts.map((podcast) => {
      return <Podcast key={podcast._id} podcast={podcast} />;
    });
  },

  render() {
    return <div className="home">
      <Header />
      <br></br>
      <br></br>

      <button onClick={this.setup} className="btn btn-primary">New Podcast</button>
      <br></br><br></br>
      <p>Here are your podcasts</p>
      <h4>In Progress</h4>
      {this.renderInProgressPodcasts()}
      <br></br>
      <br></br>
      <h4>Published</h4>
      {this.renderPublishedPodcasts()}

    </div>
  }
});
