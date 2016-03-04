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

  setTitle(podcastId, title) {
    Podcasts.update(podcastId, { $set: { title: title} });
  },

  setNotes(podcastId, notes) {
    Podcasts.update(podcastId, { $set: { notes: notes} });
  },

  setPublished(podcastId, value) {
    Podcasts.update(podcastId, { $set: { published: value} });
  }

});
