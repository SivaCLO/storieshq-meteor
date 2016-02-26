AccountsUIWrapper = React.createClass({

  logoutClicked(event) {
    event.preventDefault();

    Meteor.logout(function(err) {
      FlowRouter.go("/logout");
    })
  },

  render() {
    return <div>
      {Meteor.user().username}
      <p><input type="submit" value="Logout" onClick={this.logoutClicked}/></p>
    </div>
  }
});
