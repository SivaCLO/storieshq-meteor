Meteor.publish("podcasts", function () {
  return Podcasts.find({
      owner: this.userId
  });
});
