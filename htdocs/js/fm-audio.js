
/**
 * Audio Interface.
 * @abstract
 */

fmAudio = function(container) {
	
	this.container = container;
};

fmAudio.prototype = {
	
	container: null,
	
	volume: 1,
	
	playlist: [],
	currentTrack: 0,

	setVolume: function(volume) {
		this.volume = volume;
	},
	
	setPlaylist: function(playlist) {
		
		this.playlist = playlist;
		
		if (this.playlist.length) {
			this.trigger(fmAudio.event.playlist);
		}
	},
	
	play: function() {
		alert('fmAudio.play() is not implemented');
	},

	trigger: function(eventType) {
		
		var event = $.Event(eventType);
		
		$(this.container).trigger(event);
	}
};

fmAudio.event = {
	
	playlist: 'playlist',
	
	loadstart: 'loadstart',
	progress: 'progress',
	suspend: 'suspend',
	abort: 'abort',
	error: 'error',
	emptied: 'emptied',
	stalled: 'stalled',
	
	loadedmetadata: 'loadedmetadata',
	loadeddata: 'loadeddata',
	canplay: 'canplay',
	canplaythrough: 'canplaythrough',
	playing: 'playing',
	waiting: 'waiting',
	
	seeking: 'seeking',
	seeked: 'seeked',
	ended: 'ended',
	
	durationchange: 'durationchange',
	timeupdate: 'timeupdate',
	play: 'play',
	pause: 'pause',
	ratechange: 'ratechange',
	volumechange: 'volumechange'
};
