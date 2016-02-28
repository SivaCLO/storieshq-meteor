// Encapsulates the functionality for the playback of audio

AudioElement = React.createClass({

init: function(ws) {
	this.wavesurfer = ws;
},

seekTo: function(startTime, prev , next) {
	this.wavesurfer.backend.seekTo(startTime);
	this.updateProgressBar(startTime);
	if (this.wavesurfer.isPlaying()) {
		this.wavesurfer.play();
	} else {
		this.wavesurfer.prevRegion = prev;
		this.wavesurfer.nextRegion = next;
	}
},

stop : function() {
	this.wavesurfer.pause();
	this.wavesurfer.backend.seekTo(0);
	this.updateProgressBar(0);
},

updateProgressBar: function(startTime) {
	var currentTimeWidth = (startTime) *30;
    var top = (~~(currentTimeWidth / 1296)*45) + 50;
    var left = currentTimeWidth % 1296;
    document.getElementById('progressBar').style.top = top + 'px';
    document.getElementById('progressBar').style.left = left + 'px';
},


play: function(start,end) {
	this.wavesurfer.play(start,end);
	this.startProgressBar();
},

playRegion: function(start,end) {
	this.play(start,end);
	while(this.wavesurfer.isPlaying()) {}
	this.seekTo(start);
},

startProgressBar: function() {
	var ws = this.wavesurfer;
    var requestFrame = window.requestAnimationFrame ||
                           window.webkitRequestAnimationFrame ||
                           window.mozRequestAnimationFrame;
    var frame = function () {
		if (!ws.backend.isPaused()) {
			var lineWidth = screen.width * 0.9;
			var currentTimeWidth = (ws.backend.getCurrentTime()) *30;
			var top = (~~(currentTimeWidth / lineWidth)*45) + 50;
			var left = currentTimeWidth % lineWidth;
			document.getElementById('progressBar').style.top = top + 'px';
			document.getElementById('progressBar').style.left = left + 'px';
			requestFrame(frame);
		}
	};
	
	frame();
},

bindEvents() {
	var regionEntered = function(region) {
		region.wavesurfer.currentRegion = region;
		region.wavesurfer.nextRegion = region.next;
		region.wavesurfer.prevRegion = region.prev;
	};
	
	this.wavesurfer.on('region-in', regionEntered);
	
},

render: function() {
	return null;
},

});