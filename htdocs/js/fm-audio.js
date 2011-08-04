
/**
 * Audio Interface.
 * @abstract
 */

fmAudio = function(container) {
	
	this.container = container;
};

fmAudio.prototype = {
	
	container: null,
	audio: null,
	
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

	trigger: function(eventType) {
		
		var event = $.Event(eventType);
		
		event.player = this;
		
		$(this.container).trigger(event);
	}
};

fmAudio.event = {
	playlist: 'fm-playlist',
	volumechange: 'volumechange'
};
