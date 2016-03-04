Signup = React.createClass({

  getInitialState: function(){
      return {
        error: null
      }
  },

  signupClicked(event) {
    event.preventDefault();

    var name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    var email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    var password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    var password2 = ReactDOM.findDOMNode(this.refs.password2).value.trim();

    if(password != password2) {
      this.setState({
        error: "Passwords didn't match"
      });
    } else {
      var _this = this;
      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          name: name
        }
      }, function(err) {
        if(!err) {
          FlowRouter.go("/")
        } else {
          console.log(err)
          _this.setState({
            error: err.reason
          });
        }
      });
    }
  },

  render() {
    return <div className="signup">
      <Header headerText="Signup to create your podcast"/>
      <br></br>
      <br></br>

      <form className="signup-form" onSubmit={this.signupClicked}>
        <p><input type="text" ref="name" placeholder="Name" /></p>
        <p><input type="text" ref="email" placeholder="Email" /></p>
        <p><input type="password" ref="password" placeholder="Password" /></p>
        <p><input type="password" ref="password2" placeholder="Password Again" /></p>
        <p><input type="submit" value="Signup"/></p>
        {this.state.error}
      </form>
    </div>
  }
});
