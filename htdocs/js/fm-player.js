
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
		self._seek.click(function(e){seekClick(e);});
		
		self.audio.play();
	};
	
	var timeupdate = function() {
		
		progress();
		
		self.played.css('width', parseInt(self.audio.getCurrentTime() / self.audio.getDuration() * $(self.options.layout.bar).width()) + 'px');
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
	this.volume.click(function(e){volumeClick(e);});
	this.volume.dblclick(volumeDoubleClick);
	
	$(container).bind(fmAudio.event.volumechange, volumechange);
	$(container).bind(fmAudio.event.progress, progress);
	$(container).bind(fmAudio.event.canplaythrough, canplaythrough);
	$(container).bind(fmAudio.event.timeupdate, timeupdate);
	
	this.audio.setVolume(this.options.volume);
	this.setPlaylist(this.options.playlist);
	
	if (this.options.autoplay && this.options.playlist.length) {
		this.play();
		volumechange();
	}
};

fmPlayer.event = {
	playlist: 'playlist'
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
	
	play: function(track) {
		
		if (this.playlist.length) {
			
			if (track == undefined) {
				track = 0;
			}
			
			this.currentTrack = track;
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
		
		this.audio.setCurrentTime(sec);
	},
	
	next: function() {
		
		this.play(this.currentTrack + 1);
	}
};
