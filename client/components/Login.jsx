Login = React.createClass({

  getInitialState: function(){
      return {
        error: null
      }
  },

  loginClicked(event) {
    event.preventDefault();

    var username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    var password = ReactDOM.findDOMNode(this.refs.password).value.trim();

    var _this = this;
    Meteor.loginWithPassword(username, password, function(err) {
      if(!err) {
        FlowRouter.go("/");
      } else {
        _this.setState({
          error: "Username/Password didn't match"});
      }
    })
  },

  render() {
    return <div className="login">
      <h1>Stories HQ</h1>
      <p>Login to create your podcast</p>
      <br></br>
      <form className="login-form" onSubmit={this.loginClicked}>
        <p><input type="text" ref="username" placeholder="Username" /></p>
        <p><input type="password" ref="password" placeholder="Password" /></p>
        <p><input type="submit" value="Login"/></p>
        {this.state.error}
      </form>
    </div>
  }
});
