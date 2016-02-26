Home = React.createClass({

  record() {
    FlowRouter.go('/123123');
  },

  render() {
    return <div className="home">
      <h1>Stories HQ</h1>
      <p>Here are your podcasts</p>
      <AccountsUIWrapper />
      <br></br>
      <button onClick={this.record} className="btn btn-primary">New Podcast</button>
    </div>
  }
});
