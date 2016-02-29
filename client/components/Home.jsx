Home = React.createClass({

  record() {
    FlowRouter.go('/123123');
  },

  render() {
    return <div className="home">
      <Header />
      <p>Here are your podcasts</p>
      <br></br>
      <button onClick={this.record} className="btn btn-primary">New Podcast</button>
    </div>
  }
});
