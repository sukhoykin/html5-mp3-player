
/**
 * fmPlayer plugin for jQuery.
 * 
 * Usage:
 * $(id).fmPlayer([options]);
 * 
 * Get instance:
 * $(id).data(id);
 * 
 * TODO: errors processing
 * TODO: prev/next button
 * TODO: loop track
 * TODO: loop playlist
 * TODO: shuffle
 * TODO: full preload
 * TODO: playlist scroll
 * TODO: favicon (play/pause)
 * TODO: seek + load part
 * TODO: flash implementation
 * TODO: seek button
 * TODO: currentTime/duration
 * 
 * @author vadim
 */
(function ( $ ) {
	
	$.fn.fmPlayer = function (options) {
		
		this.each(function(){
			$.data(this, this.id, new fmPlayer(this, options));
		});
		
		return this;
	};
	
})( jQuery );

/**
 * Player component.
 * 
 * @author vadim
 */
fmPlayer = function (container, options) {
	
	var self = this;
	
	this.audio = new fmNative(container);
	
	var playbackClick = function() {
		
		if (self.audio.getMedia() == null) {
			
			self.play();
			
		} else if (self.audio.isPaused()) {
			
			self.resume();
			
		} else {
			self.pause();
		}
	};
	
	var seekClick = function(e) {
		self.seek(e.offsetX / $(self.options.layout.bar).width() * self.audio.getDuration());
	};
	
	var barHoverIn = function() {
		self.begin.addClass('hover');
		self.end.addClass('hover');
	};
	
	var barHoverOut = function() {
		self.begin.removeClass('hover');
		self.end.removeClass('hover');
	};
	
	var volumeClick = function(e) {
		self.audio.setVolume((e.offsetX - 4) / ($(self.volume).width() - 8));
	};
	
	var volumeDoubleClick = function() {
		self.audio.setVolume(0);
	};
	
	var volumechange = function() {
		
		if (self.currentVolumeClass != null) {
			self.volume.removeClass(self.currentVolumeClass);
		}
		
		if (self.audio.getVolume()) {
			
			self.currentVolumeClass = 'level-' + (Math.ceil(self.audio.getVolume() / 2 * 10));
			self.volume.addClass(self.currentVolumeClass);
		}
	};
	
	var progress = function() {
		self.loaded.css('width', parseInt(self.audio.getBuffered() / self.audio.getDuration() * $(self.options.layout.bar).width()) + 'px');
	};
	
	var canplaythrough = function() {
		
		self._seek.addClass('playing');
		
		self.audio.play();
	};
	
	var timeupdate = function() {
		
		progress();
		
		self.played.css('width', parseInt(self.audio.getCurrentTime() / self.audio.getDuration() * $(self.options.layout.bar).width()) + 'px');
	};
	
	var ended = function() {
		
		self.next();
	};

	$.extend(this.options, options);
	
	this.playback = $(this.options.layout.playback);
	this.begin = $(this.options.layout.begin);
	this.end = $(this.options.layout.end);
	this.bar = $(this.options.layout.bar);
	this._seek = $(this.options.layout.seek);
	this.loaded = $(this.options.layout.loaded);
	this.played = $(this.options.layout.played);
	this.volume = $(this.options.layout.volume);
	
	this.playback.click(playbackClick);
	this.bar.hover(barHoverIn, barHoverOut);
	this._seek.click(function(e){seekClick(e);});
	this.volume.click(function(e){volumeClick(e);});
	this.volume.dblclick(volumeDoubleClick);
	
	$(container).bind(fmAudio.event.volumechange, volumechange);
	$(container).bind(fmAudio.event.progress, progress);
	$(container).bind(fmAudio.event.canplaythrough, canplaythrough);
	$(container).bind(fmAudio.event.timeupdate, timeupdate);
	$(container).bind(fmAudio.event.ended, ended);
	
	this.audio.setVolume(this.options.volume);
	this.setPlaylist(this.options.playlist);
	
	if (this.options.autoplay && this.options.playlist.length) {
		volumechange();
		this.play();
	}
};

fmPlayer.event = {
	playlist: 'playlist',
	stop: 'stop'
};

fmPlayer.prototype = {

	audio: null,
	
	playback: null,
	begin: null,
	end: null,
	bar: null,
	_seek: null,
	loaded: null,
	played: null,
	volume: null,

	options: {
		volume: 0.8,
		playlist: [],
		autoplay: false,
		layout: {
			playback: '#playback',
			begin: '#begin',
			end: '#end',
			seek: '#seek',
			loaded: '#loaded',
			played: '#played',
			volume: '#volume'
		}
	},
	
	currentVolumeClass: null,
	
	playlist: [],
	currentTrack: 0,
	
	setPlaylist: function(playlist) {
		
		this.playlist = playlist;
		this.currentTrack = 0;
		
		if (this.playlist.length) {
			
			this.playback.addClass('enabled');
			this.begin.addClass('enabled');
			this.end.addClass('enabled');
			this.bar.addClass('enabled');
			
		} else {
			
			this.playback.removeClass('enabled');
			this.begin.removeClass('enabled');
			this.end.removeClass('enabled');
			this.bar.removeClass('enabled');
		}
		
		this.audio.trigger(fmPlayer.event.playlist);
	},
	
	getCurrentTrack: function() {
		return this.currentTrack;
	},
	
	play: function(track) {
		
		if (track == undefined) {
			track = 0;
		}
		
		if (track < this.playlist.length) {
			
			this.currentTrack = parseInt(track);
			
			this.audio.setMedia(this.playlist[track]);
			
			this.playback.addClass('pause');
		}
	},
	
	pause: function() {
		
		if (this.audio.getMedia() != null) {
			
			this.audio.pause();
			this.playback.removeClass('pause');
		}
	},
	
	resume: function() {
		
		if (this.audio.getMedia() != null) {
			
			this.audio.play();
			this.playback.addClass('pause');
		}
	},
	
	seek: function(sec) {
		
		if (this.audio.getMedia() != null) {
			
			this.audio.setCurrentTime(sec);
		}
	},
	
	next: function() {
		
		if (this.currentTrack + 1 < this.playlist.length) {
			
			this.play(this.currentTrack + 1);
			
		} else {
			this.stop();
		}
	},
	
	stop: function() {
		
		if (this.audio.getMedia() != null) {
			
			this.audio.setMedia();
			
			this.playback.removeClass('pause');
			this._seek.removeClass('playing');
			this.loaded.css('width', '0');
			this.played.css('width', '0');
			
			this.audio.trigger(fmPlayer.event.stop);
		}
	}
};
