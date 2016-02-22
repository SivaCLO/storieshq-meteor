if (Meteor.isClient) {
	
	Meteor.startup(function () {
		ReactDOM.render(<FileUpload />, document.getElementById("uploadFile"));
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
