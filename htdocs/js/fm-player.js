
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
 * --TODO: loop track--
 * TODO: loop playlist
 * TODO: shuffle
 * TODO: seek button
 * TODO: currentTime/duration
 * TODO: full preload
 * TODO: alt text
 * 
 * TODO: debug: Ctrl+D -- on/off
 * TODO: IE + Opera: playlist: user-select
 * TODO: errors processing
 * TODO: playlist scroll
 * TODO: favicon (play/pause)
 * TODO: seek + load part
 * TODO: playlist-html-js: donor as display none blocks from HTML to JS
 * TODO: scroll playlist to playing track
 * TODO: crossfade
 * TODO: playlist entity
 * TODO: all id names without -, use _ instead
 * TODO: playlist edit: drag 1 track, shift+click - drag multiple tracks
 * 
 * @author vadim
 */
(function ( $ ) {
	
	$.fn.fmPlayer = function (options) {
		
		if (typeof options === 'string') {

			var value;
			var args = arguments;
			
			this.each(function(){
				
				var audio = $.data(this, this.id).getAudio();
				
				if (options == 'method' && $.isFunction(audio[args[1]])) {
					
					value = audio[args[1]].apply(audio, Array.prototype.slice.call(args, 2));
					
				} else if (options == 'event') {
					audio.trigger(args[1]);
				}
			});
			
			return value;
		}
		
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
	
	/**
	 * Private methods.
	 */
	
	/**
	 * Control handlers.
	 */
	var playbackClick = function() {
		console.log('playbackClick');
		self.playback();
	};
	
	var prevClick = function() {
		self.prev();
	};
	
	var nextClick = function() {
		self.next();
	};
	
	var seekClick = function(e) {
		self.seek((e.pageX - self._bar.offset().left) / self._bar.width() * self.getDuration());
	};
	
	var barMouseEnter = function() {
		self._begin.addClass('hover');
		self._end.addClass('hover');
	};
	
	var barMouseLeave = function() {
		self._begin.removeClass('hover');
		self._end.removeClass('hover');
	};
	
	var is_head_drag = false;
	
	var headMouseDown = function(e) {
		
		self.audio.debug('headMouseDown');
		
		$(document).mousemove(headMouseMove);
		$(document).mouseup(headMouseUpOut);
		
		is_head_drag = true;
		
		return false;
	};
	
	var headMouseMove = function(e) {
		
		var left = e.pageX - self._bar.offset().left - self._head.width() / 2;
		var limit = self._bar.width() - self._head.width();
		
		if (left < 0) {
			left = 0;
		} else if (left > limit) {
			left = limit;
		}
		
		self._head.css('left', left + 'px');
	};
	
	var headMouseUp = function(e) {
		
		self.audio.debug('headMouseUp');
		
		$(document).unbind('mousemove', headMouseMove);
		$(document).unbind('mouseup', headMouseUpOut);
		
		is_head_drag = false;
		
		return false;
	};
	
	var headMouseUpOut = function(e) {
		
		headMouseUp();
		
		var left = self._head.offset().left - self._bar.offset().left;
		var limit = self._bar.width() - self._head.width();
		
		self.seek(left / limit * self.getDuration());
		
		return false;
	};
	
	var repeatClick = function() {
		self.repeat();
	};
	
	var shuffleClick = function() {
		self.shuffle();
	};
	
	var volumeClick = function(e) {
		self.volume((e.pageX - self._volume.offset().left - 4) / (self._volume.width() - 8));
	};
	
	var volumeDoubleClick = function() {
		self.volume(0);
	};
	
	/**
	 * Event handlers.
	 */
	
	var ready = function() {
		console.log('fmPlayer.ready');
		self.is_ready = true;
		
		self._volume.click(function(e){volumeClick(this.offsetLeft, e);});
		self._volume.dblclick(volumeDoubleClick);
		
		self.volume(self.options.volume);
		self.setPlaylist(self.options.playlist);
		
		if (self.options.autoplay && self.options.playlist.length) {
			self.play();
		}
	};
	
	var playlist = function() {
		
		self._playback.unbind('click');
		self._prev.unbind('click');
		self._next.unbind('click');
		self._bar.unbind('mouseenter');
		self._bar.unbind('mouseleave');
		self._head.unbind('mousedown');
		self._head.unbind('mouseup');
		self._repeat.unbind('click');
		self._shuffle.unbind('click');
		
		if (self.playlist.length) {
			console.log('fmPlayer.enable');
			self._playback.click(playbackClick);
			self._prev.click(prevClick);
			self._next.click(nextClick);
			self._bar.hover(barMouseEnter, barMouseLeave);
			self._head.mousedown(headMouseDown);
			self._head.mouseup(headMouseUp);
			self._repeat.click(repeatClick);
			self._shuffle.click(shuffleClick);
			
			self._playback.addClass('enabled');
			self._prev.addClass('enabled');
			self._begin.addClass('enabled');
			self._end.addClass('enabled');
			self._bar.addClass('enabled');
			self._next.addClass('enabled');
			self._repeat.addClass('enabled');
			self._shuffle.addClass('enabled');
			
		} else {
			
			self._playback.removeClass('enabled');
			self._prev.removeClass('enabled');
			self._begin.removeClass('enabled');
			self._end.removeClass('enabled');
			self._bar.removeClass('enabled');
			self._next.removeClass('enabled');
			self._repeat.removeClass('enabled');
			self._shuffle.removeClass('enabled');
		}
	};
	
	var media = function() {
		self._playback.addClass('pause');
	};
	
	var play = function() {
		self._playback.addClass('pause');
	};
	
	var pause = function() {
		self._playback.removeClass('pause');
	};
	
	var playing = function() {
		
		self._seek.click(seekClick);
		
		self._head.addClass('enabled');
	};
	
	var repeaton = function() {
		self._repeat.addClass('on');
	};
	
	var repeatoff = function() {
		self._repeat.removeClass('on');
	};
	
	var shuffleon = function() {
		self._shuffle.addClass('on');
	};
	
	var shuffleoff = function() {
		self._shuffle.removeClass('on');
	};
	
	var stop = function() {
		
		self._seek.unbind('click');
		
		self._playback.removeClass('pause');
		self._seek.removeClass('playing');
		self._loaded.css('width', '0');
		self._played.css('width', '0');
		self._head.removeClass('enabled');
	};
	
	var volumechange = function() {
		
		if (self.currentVolumeClass != null) {
			self._volume.removeClass(self.currentVolumeClass);
		}
		
		self.currentVolumeClass = 'level-' + (Math.ceil(self.volume() / 2 * 10));
		self._volume.addClass(self.currentVolumeClass);
	};
	
	var progress = function() {
		self._loaded.css('width', parseInt(self.getBuffered() / self.getDuration() * self._bar.width()) + 'px');
	};
	
	var canplaythrough = function() {
		
		self._seek.addClass('playing');
		
		self.playback();
	};
	
	var timeupdate = function() {
		
		progress();
		
		self._played.css('width', parseInt(self.getCurrentTime() / self.getDuration() * self._bar.width()) + 'px');
		
		if (!is_head_drag) {
			self._head.css('left', parseInt(self.getCurrentTime() / self.getDuration() * (self._bar.width() - self._head.width())) + 'px');
		}
	};
	
	var ended = function() {
		
		self._played.css('width', self._bar.width() + 'px');
		
		if (self.is_repeat) {
			self.replay();
		} else {
			self.next();
		}
	};
	
	var error = function() {
		alert('Media error code: ' + self.audio.getErrorCode());
		self.stop();
	};
	
	/**
	 * Construct.
	 */
	
	$.extend(this.options, options);
	
	this._playback = $(this.options.layout.playback);
	this._prev = $(this.options.layout.prev);
	this._next = $(this.options.layout.next);
	this._begin = $(this.options.layout.begin);
	this._end = $(this.options.layout.end);
	this._bar = $(this.options.layout.bar);
	this._seek = $(this.options.layout.seek);
	this._loaded = $(this.options.layout.loaded);
	this._played = $(this.options.layout.played);
	this._head = $(this.options.layout.head);
	this._repeat = $(this.options.layout.repeat);
	this._shuffle = $(this.options.layout.shuffle);
	this._volume = $(this.options.layout.volume);
	
	$(container).bind(fmAudio.event.ready, ready);
	$(container).bind(fmAudio.event.media, media);
	$(container).bind(fmAudio.event.play, play);
	$(container).bind(fmAudio.event.playing, playing);
	$(container).bind(fmAudio.event.pause, pause);
	$(container).bind(fmAudio.event.volumechange, volumechange);
	$(container).bind(fmAudio.event.progress, progress);
	$(container).bind(fmAudio.event.canplaythrough, canplaythrough);
	$(container).bind(fmAudio.event.timeupdate, timeupdate);
	$(container).bind(fmAudio.event.ended, ended);
	$(container).bind(fmAudio.event.error, error);
	
	$(container).bind(fmPlayer.event.playlist, playlist);
	$(container).bind(fmPlayer.event.repeaton, repeaton);
	$(container).bind(fmPlayer.event.repeatoff, repeatoff);
	$(container).bind(fmPlayer.event.shuffleon, shuffleon);
	$(container).bind(fmPlayer.event.shuffleoff, shuffleoff);
	$(container).bind(fmPlayer.event.stop, stop);
	
	if (fmNative.isSupported()) {
		this.audio = new fmNative(container);
	} else if (fmLegacy.isSupported()) {
		this.audio = new fmLegacy(container);
	} else {
		alert('Your browser can not play MP3.');
		return;
	}
};

fmPlayer.event = {
	playlist: 'playlist',
	repeaton: 'repeaton',
	repeatoff: 'repeatoff',
	shuffleon: 'shuffleon',
	shuffleoff: 'shuffleoff',
	stop: 'stop'
};

fmPlayer.prototype = {

	audio: null,
	
	is_ready: false,
	
	_playback: null,
	_prev: null,
	_next: null,
	_begin: null,
	_end: null,
	_bar: null,
	_seek: null,
	_loaded: null,
	_played: null,
	_head: null,
	_repeat: null,
	_shuffle: null,
	_volume: null,

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
			repeat: '#repeat',
			shuffle: '#shuffle',
			volume: '#volume'
		}
	},
	
	currentVolumeClass: null,
	
	playlist: [],
	currentTrack: 0,
	
	is_repeat: false,
	
	is_shuffle: false,
	shuffleOrder: null,
	shuffleCurrentTrack: 0,
	
	init: function() {
		this.audio.init();
	},
	
	getAudio: function() {
		return this.audio;
	},
	
	isReady: function() {
		return this.is_ready;
	},
	
	getCurrentTrack: function() {
		return this.currentTrack;
	},
	
	setPlaylist: function(playlist) {
		
		this.stop();
		
		this.playlist = playlist;
		this.currentTrack = 0;
		
		this.trigger(fmPlayer.event.playlist);
	},
	
	volume: function(volume) {
		
		if (volume != undefined) {
			this.audio.setVolume(volume);
		} else {
			return this.audio.getVolume();
		}
	},
	
	getDuration: function() {
		return this.audio.getDuration();
	},
	
	getBuffered: function() {
		return this.audio.getBuffered();
	},
	
	getCurrentTime: function() {
		return this.audio.getCurrentTime();
	},
	
	play: function(track) {
		
		if (track == undefined || track < 0) {
			track = 0;
		}
		
		if (track < this.playlist.length) {
			
			if (this.is_shuffle) {
				
				this.shuffleCurrentTrack = parseInt(track);
				this.currentTrack = this.shuffleOrder[this.shuffleCurrentTrack];
				
			} else {
				this.currentTrack = parseInt(track);
			}
			
			this.audio.setMedia(this.playlist[this.currentTrack]);
			
		} else {
			this.stop();
		}
	},
	
	playback: function() {
		
		if (!this.audio.hasMedia()) {
			
			this.play();
			
		} else if (this.audio.isPaused()) {
			
			this.audio.play();
			
		} else {
			this.audio.pause();
		}
	},
	
	replay: function() {
		
		if (this.is_shuffle) {
			
			this.play(this.shuffleCurrentTrack);
			
		} else {
			this.play(this.currentTrack);
		}
	},
	
	prev: function() {
		
		if (this.is_shuffle) {
			
			this.play(this.shuffleCurrentTrack - 1);
			
		} else {
			this.play(this.currentTrack - 1);
		}
	},
	
	next: function() {
		
		if (this.is_shuffle) {
			
			this.play(this.shuffleCurrentTrack + 1);
			
		} else {
			this.play(this.currentTrack + 1);
		}
	},
	
	seek: function(sec) {
		console.log('seek: ' + sec);
		if (this.audio.hasMedia()) {
			this.audio.setCurrentTime(sec);
		}
	},
	
	repeat: function() {		
		this.is_repeat = !this.is_repeat;
		this.trigger(this.is_repeat ? fmPlayer.event.repeaton : fmPlayer.event.repeatoff);
	},
	
	shuffle: function() {
		
		this.is_shuffle = !this.is_shuffle;
		
		if (this.is_shuffle) {
			
			this.shuffleOrder = new Array();
			
			for (key in this.playlist) {
				this.shuffleOrder.push(parseInt(key));
			}
			
			this.shuffleOrder.sort(function(){
				return 0.5 - Math.random();
			});
			
			this.shuffleCurrentTrack = 0;
		}
		
		this.trigger(this.is_shuffle ? fmPlayer.event.shuffleon : fmPlayer.event.shuffleoff);
	},
	
	stop: function() {
		
		if (this.audio.hasMedia()) {
			
			if (!this.audio.isPaused()) {
				this.audio.pause();
			}
			
			this.audio.setMedia();
			this.trigger(fmPlayer.event.stop);
		}
	},

	trigger: function(eventType) {
		
		this.audio.trigger(eventType);
	}
};
