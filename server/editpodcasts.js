
Meteor.methods({	
	delete(podcastId, version, startTime, endTime) {
		console.log('delete method entered');
		var childProcess = Npm.require('child_process');
		var fs = Npm.require('fs');
		var Future = Npm.require("fibers/future");
		
		var podcast;
		var nextVersion = 1;
		var nextPodcast = podcastId + "_" + nextVersion;
		var future = new Future();
		
		var exec = Meteor.wrapAsync(childProcess.exec);
		if (version) {
			nextVersion = parseInt(version) + 1;
			nextPodcast = podcastId + "_" + nextVersion;
			podcastId = podcastId + "_" + version;
		}
		
		var splitAndUpload = function() {
			var splitCommand = "~/ffmpeg -i /tmp/" + podcastId + ".mp3 -ss 0 -t " + startTime + " /tmp/" + podcastId + "_split1.mp3";
		    exec(splitCommand);
		    splitCommand = "~/ffmpeg -i /tmp/" + podcastId + ".mp3 -ss " + endTime + " /tmp/" + podcastId + "_split2.mp3";
		    exec(splitCommand);
		    var silentCommand = "~/ffmpeg -i /tmp/" + podcastId + "_split1.mp3 -i /tmp/" + podcastId + "_split2.mp3 -filter_complex \"[0:a][1:a]concat=n=2:a=1:v=0\" /tmp/" + nextPodcast + ".mp3";
		    exec(silentCommand);
		    fs.chmodSync('/tmp/' + nextPodcast + '.mp3', '777');
		    
		    var s3 = new AWS.S3();
		    var readStream = fs.createReadStream('/tmp/' + nextPodcast + '.mp3');
			var params = {Bucket: 'stories-files', Key: nextPodcast + '.mp3', Body: readStream};
			s3.upload(params, Meteor.bindEnvironment(function(err, data) {
				if(!err) future.return(nextVersion.toString());
				else console.log("Upload failed");
			}));
		};
		
		var path = '/tmp/' + podcastId + '.mp3';
		var podcast = podcastId + ".mp3";
		if (fs.existsSync(path)) {
			splitAndUpload();
		} else {
			var s3 = new AWS.S3();
			var params = {Bucket: 'stories-files', Key: podcast};
			var file = fs.createWriteStream('/tmp/' + podcast);
			var stream = s3.getObject(params).createReadStream().pipe(file);
			
			stream.on('finish', Meteor.bindEnvironment(function() {
				splitAndUpload();
			}));
		}
		return future.wait();		
	}	
	
});