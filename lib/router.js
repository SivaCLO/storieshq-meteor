FlowRouter.route('/', {
    name: 'home',
    action: function(params, queryParams) {
      console.log(Meteor.user());
      if(Meteor.user()) {
        ReactLayout.render(Home);
      } else {
        FlowRouter.go('login');
      }
    }
});

FlowRouter.route('/signup', {
    name: 'signup',
    action: function(params, queryParams) {
      console.log(Meteor.user());
      if(Meteor.user() && Meteor.user().emails && Meteor.user().emails[0].address === "admin@storieshq.com") {
        ReactLayout.render(Signup);
      } else {
        FlowRouter.go('/');
      }
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action: function(params, queryParams) {
      console.log(Meteor.user());
      if(!Meteor.user()) {
        ReactLayout.render(Login);
      } else {
        FlowRouter.go('/');
      }
    }
});

FlowRouter.route('/:podcastId', {
    name: 'record',
    action: function(params, queryParams) {
      console.log(Meteor.user());
      if(Meteor.user()) {
        ReactLayout.render(Record);
      } else {
        FlowRouter.go('login');
      }
    }
});

FlowRouter.route('/:podcastId/join', {
    name: 'join',
    action: function(params, queryParams) {
      console.log(Meteor.user());
      if(!Meteor.user()) {
        ReactLayout.render(Join);
      } else {
        FlowRouter.go('/' + params.podcastId);
      }
    }
});

FlowRouter.route('/:podcastId/edit', {
    name: 'edit',
    action: function(params, queryParams) {
      console.log(Meteor.user());
      if(Meteor.user()) {
        ReactLayout.render(Edit);
      } else {
        FlowRouter.go('login');
      }
    }
});
