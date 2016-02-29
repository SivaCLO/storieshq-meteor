Record = React.createClass({

  edit() {
    FlowRouter.go('/123123/edit');
  },

  render() {
    return <div className="record">
      <Header />
      <p>Setup & Record your podcast</p>
      <button onClick={this.edit} className="btn btn-primary">Edit this Podcast</button>
    </div>
  }
});
