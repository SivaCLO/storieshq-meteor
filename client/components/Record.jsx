Record = React.createClass({

  edit() {
    FlowRouter.go('/123123/edit');
  },

  render() {
    return <div className="record">
      <h1>Stories HQ</h1>
      <p>Setup & Record your podcast</p>
      <AccountsUIWrapper />
      <br></br>
      <button onClick={this.edit} className="btn btn-primary">Edit this Podcast</button>
    </div>
  }
});
