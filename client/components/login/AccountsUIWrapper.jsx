AccountsUIWrapper = React.createClass({

  logoutClicked(event) {
    event.preventDefault();

    Meteor.logout(function(err) {
      FlowRouter.go("/login");
    })
  },

  render() {
    return <div>
      {Meteor.user().profile.name}
      <input type="submit" value="Logout" onClick={this.logoutClicked}/>
    </div>
  }
});
