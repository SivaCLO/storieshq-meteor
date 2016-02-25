FlowRouter.route('/', {
    name: 'home',
    action: function(params, queryParams) {
      ReactLayout.render(App);
    }
});

FlowRouter.route('/edit', {
    name: 'edit',
    action: function(params, queryParams) {
      ReactLayout.render(Edit);
    }
});

FlowRouter.route('/record', {
    name: 'record',
    action: function(params, queryParams) {
      ReactLayout.render(Record);
    }
});
