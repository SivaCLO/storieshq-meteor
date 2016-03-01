Podcasts = new Mongo.Collection("podcasts");

Meteor.methods({
  createPodcast() {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var id = Podcasts.insert({
      createdAt: new Date(),
      owner: Meteor.userId(),
    });

    return id;
  },

  setup(podcastId, title, notes) {
    Podcasts.update(podcastId, { $set: { title: title, notes: notes} });
  }

});
