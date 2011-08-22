
/**
 * Audio interface.
 * 
 * @abstract
 * @author vadim
 */

fmAudio = function(container) {
	
	this.container = container;
};

fmAudio.isSupported = function() {
	alert('fmAudio.isSupported() is not implemented');
}

fmAudio.prototype = {
	
	container: null,

	init: function() {
		alert('fmAudio.init() is not implemented');
	},
	
	setVolume: function(volume) {
		alert('fmAudio.setVolume() is not implemented');
	},

	getVolume: function() {
		alert('fmAudio.getVolume() is not implemented');
	},
	
	setMedia: function(src) {
		alert('fmAudio.src() is not implemented');
	},
	
	hasMedia: function() {
		alert('fmAudio.hasMedia() is not implemented');
	},
	
	getBuffered: function() {
		alert('fmAudio.getBuffered() is not implemented');
	},
	
	getDuration: function() {
		alert('fmAudio.getDuration() is not implemented');
	},
	
	getCurrentTime: function() {
		alert('fmAudio.getCurrentTime() is not implemented');
	},
	
	isPaused: function() {
		alert('fmAudio.isPaused() is not implemented');
	},
	
	play: function() {
		alert('fmAudio.play() is not implemented');
	},
	
	pause: function() {
		alert('fmAudio.pause() is not implemented');
	},
	
	setCurrentTime: function(sec) {
		alert('fmAudio.setCurrentTime() is not implemented');
	},
	
	getErrorCode: function(sec) {
		alert('fmAudio.getErrorCode() is not implemented');
	},

	trigger: function(eventType) {
		
		$(this.container).trigger($.Event(eventType));
	}
};

fmAudio.event = {
	
	ready: 'ready',
	media: 'media',
	
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
