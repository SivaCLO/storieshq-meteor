Login = React.createClass({

  getInitialState: function(){
      return {
        error: null
      }
  },

  loginClicked(event) {
    event.preventDefault();

    var email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    var password = ReactDOM.findDOMNode(this.refs.password).value.trim();

    var _this = this;
    Meteor.loginWithPassword(email, password, function(err) {
      if(!err) {
        FlowRouter.go("/");
      } else {
        _this.setState({error: "Email/Password didn't match"});
      }
    })
  },

  render() {
    return <div className="login">
      <Header />
      <p>Login to create your podcast</p>
      <form className="login-form" onSubmit={this.loginClicked}>
        <p><input type="text" ref="email" placeholder="Email" /></p>
        <p><input type="password" ref="password" placeholder="Password" /></p>
        <p><input type="submit" value="Login"/></p>
        {this.state.error}
      </form>
    </div>
  }
});
