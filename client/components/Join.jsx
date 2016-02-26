Join = React.createClass({
  render() {
    return <div className="join">
      <h1>Stories HQ</h1>
      <p>Join the podcast</p>
      <AccountsUIWrapper />
      <br></br>
      <h1>Hello, {this.props.name}</h1>
    </div>
  }
});
