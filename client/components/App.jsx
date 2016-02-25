App = React.createClass({

  record() {
    FlowRouter.go('/record');
  },

  edit() {
    FlowRouter.go('/edit');
  },

  render() {
    return <div>
      <button onClick={this.record} className="btn btn-primary">Record</button>
      <button onClick={this.edit} className="btn btn-primary">Edit</button>
    </div>
  }
});
