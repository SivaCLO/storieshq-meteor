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

  setState(podcastId, state) {
    Podcasts.update(podcastId, { $set: { state: state} });
  }

});
