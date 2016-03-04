if (Meteor.isClient) {
  Meteor.subscribe("podcasts");
}

FlowRouter.route('/', {
    name: 'home',
    action: function(params, queryParams) {
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
      if(!Meteor.user()) {
        ReactLayout.render(Signup);
      } else {
        FlowRouter.go('/');
      }
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action: function(params, queryParams) {
      if(!Meteor.user()) {
        ReactLayout.render(Login);
      } else {
        FlowRouter.go('/');
      }
    }
});

FlowRouter.route('/:podcastId', {
    name: 'podcast',
    action: function(params, queryParams) {
      if(Meteor.user()) {
        podcast = Podcasts.findOne({_id: params.podcastId});
        if(podcast) {
          ReactLayout.render(PodcastHome, {podcastId: params.podcastId});
        } else {
          FlowRouter.go('/');
        }
      } else {
        FlowRouter.go('login');
      }
    }
});

FlowRouter.route('/:podcastId/script', {
    name: 'podcast',
    action: function(params, queryParams) {
      if(Meteor.user()) {
        podcast = Podcasts.findOne({_id: params.podcastId});
        if(podcast) {
          ReactLayout.render(Script, {podcastId: params.podcastId});
        } else {
          FlowRouter.go('/');
        }
      } else {
        FlowRouter.go('login');
      }
    }
});

FlowRouter.route('/:podcastId/record', {
    name: 'record',
    action: function(params, queryParams) {
      if(Meteor.user()) {
        podcast = Podcasts.findOne({_id: params.podcastId});
        if(podcast) {
          ReactLayout.render(Record, {podcastId: params.podcastId});
        } else {
          FlowRouter.go('/');
        }
      } else {
        FlowRouter.go('login');
      }
    }
});

FlowRouter.route('/:podcastId/edit', {
    name: 'edit',
    action: function(params, queryParams) {
      if(Meteor.user()) {
        podcast = Podcasts.findOne({_id: params.podcastId});
        if(podcast) {
          ReactLayout.render(Edit, {podcastId: params.podcastId});
        } else {
          FlowRouter.go('/');
        }
      } else {
        FlowRouter.go('login');
      }
    }
});

FlowRouter.route('/:podcastId/publish', {
    name: 'publish',
    action: function(params, queryParams) {
      if(Meteor.user()) {
        podcast = Podcasts.findOne({_id: params.podcastId});
        if(podcast) {
          ReactLayout.render(Publish, {podcastId: params.podcastId});
        } else {
          FlowRouter.go('/');
        }
      } else {
        FlowRouter.go('login');
      }
    }
});

FlowRouter.route('/:podcastId/join', {
    name: 'join',
    action: function(params, queryParams) {
      if(!Meteor.user()) {
        ReactLayout.render(Join);
      } else {
        FlowRouter.go('/' + params.podcastId);
      }
    }
});
