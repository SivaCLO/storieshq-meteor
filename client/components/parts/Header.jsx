Header = React.createClass({

  logoutClicked(event) {
    event.preventDefault();

    Meteor.logout(function(err) {
      FlowRouter.go("/login");
    })
  },

  render() {
    return <div>
      <h1>Stories HQ</h1>
      {Meteor.user() ? Meteor.user().profile.name : ""}
      {Meteor.user() ? <input type="submit" value="Logout" onClick={this.logoutClicked}/> : ""}
    </div>
  }
});
