
/**
 * MP3 Player with playlist support. Player use html and flash solutions for 
 * media playback. If browser support <audio> and MP3 playback the html
 * solution will be used, otherwise flash.
 * 
 * Plugin for jQuery usage: 
 * id = '#fm-player-container';
 * $(id).fmPlayer([options]);
 * ...
 * player = $(id).data(id);
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
 * TODO: playlist-html-js: donor as diplay none blocks from HTML to JS
 * TODO: scroll playlist to playing track
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
	
	if (fmNative.isSupported()) {
		this.audio = new fmNative(container);
	} else {
		alert('Your browser can`t playback MP3 using <audio>. Legacy Flash solution is not implemented.');
	}
	
	var playbackClick = function() {
		
		if (!self.audio.hasMedia()) {
			
			self.play();
			
		} else if (self.audio.isPaused()) {
			
			self.resume();
			
		} else {
			self.pause();
		}
	};
	
	var prevClick = function() {
		self.prev();
	};
	
	var nextClick = function() {
		self.next();
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
	
	var playlist = function() {
		
		if (self.playlist.length) {
			
			self.playback.addClass('enabled');
			self._prev.addClass('enabled');
			self._next.addClass('enabled');
			self.begin.addClass('enabled');
			self.end.addClass('enabled');
			self.bar.addClass('enabled');
			
		} else {
			
			self.playback.removeClass('enabled');
			self._prev.removeClass('enabled');
			self._next.removeClass('enabled');
			self.begin.removeClass('enabled');
			self.end.removeClass('enabled');
			self.bar.removeClass('enabled');
		}
	};
	
	var media = function() {
		self.playback.addClass('pause');
	};
	
	var play = function() {
		self.playback.addClass('pause');
	};
	
	var pause = function() {
		self.playback.removeClass('pause');
	};
	
	var stop = function() {
		
		self.playback.removeClass('pause');
		self._seek.removeClass('playing');
		self.loaded.css('width', '0');
		self.played.css('width', '0');
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
	
	var error = function() {
		alert('Media error code: ' + self.audio.getErrorCode());
	};

	$.extend(this.options, options);
	
	this.playback = $(this.options.layout.playback);
	this._prev = $(this.options.layout.prev);
	this._next = $(this.options.layout.next);
	this.begin = $(this.options.layout.begin);
	this.end = $(this.options.layout.end);
	this.bar = $(this.options.layout.bar);
	this._seek = $(this.options.layout.seek);
	this.loaded = $(this.options.layout.loaded);
	this.played = $(this.options.layout.played);
	this.volume = $(this.options.layout.volume);
	
	this.playback.click(playbackClick);
	this._prev.click(prevClick);
	this._next.click(nextClick);
	this.bar.hover(barHoverIn, barHoverOut);
	this._seek.click(function(e){seekClick(e);});
	this.volume.click(function(e){volumeClick(e);});
	this.volume.dblclick(volumeDoubleClick);
	
	$(container).bind(fmPlayer.event.playlist, playlist);
	$(container).bind(fmPlayer.event.media, media);
	$(container).bind(fmAudio.event.play, play);
	$(container).bind(fmAudio.event.pause, pause);
	$(container).bind(fmPlayer.event.stop, stop);
	$(container).bind(fmAudio.event.volumechange, volumechange);
	$(container).bind(fmAudio.event.progress, progress);
	$(container).bind(fmAudio.event.canplaythrough, canplaythrough);
	$(container).bind(fmAudio.event.timeupdate, timeupdate);
	$(container).bind(fmAudio.event.ended, ended);
	$(container).bind(fmAudio.event.error, error);
	
	this.audio.setVolume(this.options.volume);
	this.setPlaylist(this.options.playlist);
	
	if (this.options.autoplay && this.options.playlist.length) {
		volumechange();
		this.play();
	}
};

fmPlayer.event = {
	playlist: 'playlist',
	media: 'media',
	stop: 'stop'
};

fmPlayer.prototype = {

	audio: null,
	
	playback: null,
	_prev: null,
	_next: null,
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
	
	getCurrentTrack: function() {
		return this.currentTrack;
	},
	
	setPlaylist: function(playlist) {
		
		this.playlist = playlist;
		this.currentTrack = 0;
		
		this.audio.trigger(fmPlayer.event.playlist);
	},
	
	play: function(track) {
		
		if (track == undefined || track < 0) {
			track = 0;
		}
		
		if (track < this.playlist.length) {
			
			this.currentTrack = parseInt(track);
			this.audio.setMedia(this.playlist[track]);
			
			this.audio.trigger(fmPlayer.event.media);
			
		} else {
			stop();
		}
	},
	
	prev: function() {
		this.play(this.currentTrack - 1);
	},
	
	next: function() {
		this.play(this.currentTrack + 1);
	},
	
	pause: function() {
		
		if (this.audio.hasMedia()) {
			this.audio.pause();
		}
	},
	
	resume: function() {
		
		if (this.audio.hasMedia()) {
			this.audio.play();
		}
	},
	
	seek: function(sec) {
		
		if (this.audio.hasMedia()) {
			this.audio.setCurrentTime(sec);
		}
	},
	
	stop: function() {
		
		if (this.audio.hasMedia()) {
			
			this.audio.setMedia();
			
			this.audio.trigger(fmPlayer.event.stop);
		}
	}
};
