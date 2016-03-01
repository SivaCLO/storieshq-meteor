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
      podcasts: Podcasts.find({}, {sort: {createdAt: -1}}).fetch(),
    };
  },

  renderPodcasts() {
    return this.data.podcasts.map((podcast) => {
      return <Podcast key={podcast._id} podcast={podcast} />;
    });
  },

  render() {
    return <div className="home">
      <Header />
      <br></br>
      <button onClick={this.setup} className="btn btn-primary">New Podcast</button>
      <br></br><br></br>
      <p>Here are your podcasts</p>
      {this.renderPodcasts()}

    </div>
  }
});
