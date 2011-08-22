
fmNative.prototype.trigger = function(eventType) {
	
	fmAudio.prototype.trigger.call(this, eventType);
	
	this.debugAudio();
	
	if (eventType == 'timeupdate') return;
	
	$('#fm-debug').append(eventType + '<br />');
};

fmNative.prototype.debugAudio = function() {
	
	$('#fm-debug-audio').html(
		'<div>src: ' + this.audio.src + '</div>' +
		'<div>currentSrc: ' + this.audio.currentSrc + '</div>' +
		'<div>networkState: ' + this.audio.networkState + '</div>' +
		'<div>preload: ' + this.audio.preload + '</div>' +
		(
			(this.audio.buffered != undefined && this.audio.buffered.length)
			? 
				'<div>buffered.length: ' + this.audio.buffered.length + '</div>' +
				'<div>buffered.start(0): ' + this.audio.buffered.start(0) + '</div>' +
				'<div>buffered.end(0): ' + this.audio.buffered.end(0) + '</div>'
			:
				'<div>buffered.length: undefined</div>' +
				'<div>buffered.start(0): undefined</div>' +
				'<div>buffered.end(0): undefined</div>'
		) +
		'<div>readyState: ' + this.audio.readyState + '</div>' +
		'<div>seeking: ' + this.audio.seeking + '</div>' +
		'<div>currentTime: ' + this.audio.currentTime + '</div>' +
		'<div>initialTime: ' + this.audio.initialTime + '</div>' +
		'<div>duration: ' + this.audio.duration + '</div>' +
		'<div>startOffsetTime: ' + this.audio.startOffsetTime + '</div>' +
		'<div>paused: ' + this.audio.paused + '</div>' +
		'<div>defaultPlaybackRate: ' + this.audio.defaultPlaybackRate + '</div>' +
		'<div>playbackRate: ' + this.audio.playbackRate + '</div>' +
		(
			(this.audio.played != undefined && this.audio.played.length)
			? 
				'<div>played.length: ' + this.audio.played.length + '</div>' +
				'<div>played.start(0): ' + this.audio.played.start(0) + '</div>' +
				'<div>played.end(0): ' + this.audio.played.end(0) + '</div>'
			:
				'<div>played.length: undefined</div>' +
				'<div>played.start(0): undefined</div>' +
				'<div>played.end(0): undefined</div>'
		) +
		(
				(this.audio.seekable != undefined && this.audio.seekable.length)
			? 
				'<div>seekable.length: ' + this.audio.seekable.length + '</div>' +
				'<div>seekable.start(0): ' + this.audio.seekable.start(0) + '</div>' +
				'<div>seekable.end(0): ' + this.audio.seekable.end(0) + '</div>'
			:
				'<div>seekable.length: undefined</div>' +
				'<div>seekable.start(0): undefined</div>' +
				'<div>seekable.end(0): undefined</div>'
		) +
		'<div>ended: ' + this.audio.ended + '</div>' +
		'<div>autoplay: ' + this.audio.autoplay + '</div>' +
		'<div>loop: ' + this.audio.loop + '</div>' +
		'<div>volume: ' + this.audio.volume + '</div>' +
		'<div>muted: ' + this.audio.muted + '</div>' +
		'<div>defaultMuted: ' + this.audio.defaultMuted + '</div>'
	);
};


fmLegacy.prototype.trigger = function(eventType) {
	
	fmAudio.prototype.trigger.call(this, eventType);
	
	if (eventType == 'timeupdate') return;

	$('#fm-debug').append(eventType + '<br />');
};

fmLegacy.prototype.debug = function(msg) {
	$('#fm-debug-audio').append(msg + '<br />');
};

