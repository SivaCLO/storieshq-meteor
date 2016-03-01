Header = React.createClass({

  logoutClicked(event) {
    event.preventDefault();
    Meteor.logout(function(err) {
      FlowRouter.go("/login");
    })
  },

  home() {
    FlowRouter.go("/");
  },

  render() {
    return <div>
      <a href="" onClick={this.home}><h1>Stories HQ</h1></a>
      {Meteor.user() ? Meteor.user().profile.name : ""}
      {Meteor.user() ? <input type="submit" value="Logout" onClick={this.logoutClicked}/> : ""}
    </div>
  }
});
