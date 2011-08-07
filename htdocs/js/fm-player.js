
fmPlayer = function (container, options) {
	
	var self = this;
	
	// TODO: legacy detection
	this.audio = new fmNative(container);
	//this.player = player;
	
	var volumechange = function(player) {
		
		if (self.currentVolumeClass != null) {
			self.volume.removeClass(self.currentVolumeClass);
		}
		alert(Math.ceil(self.audio.volume / 2 * 10));
		currentVolumeClass = 'level-' + (Math.ceil(self.audio.volume / 2 * 10));
		
		self.volume.addClass(currentVolumeClass);
	};

	$.extend(this.options, options);
	
	
	_playback = $(this.options.layout.playback);
	_seek = $(this.options.layout.seek);
	_loaded = $(this.options.layout.loaded);
	_played = $(this.options.layout.played);
	_volume = $(this.options.layout.volume);
	
	if (_playback.get(0) != undefined) {
		this.playback = _playback;
		//this.playback.bind('click')
	}
	
	if (_seek.get(0) != undefined) {
		this.seek = _seek;
	}
	
	if (_loaded.get(0) != undefined) {
		this.loaded = _loaded;
	}
	
	if (_played.get(0) != undefined) {
		this.played = _played;
	}
	
	if (_volume.get(0) != undefined) {
		this.volume = _volume;
	}
	
	// each fmAudio.event loop
	$(container).bind(fmAudio.event.playlist, function(){
		alert('fm-playlist');
	});
	
	//this.volumechange2();
	
	//$(container).bind('volumechange', this.volumechange2);
	$(container).bind(fmAudio.event.volumechange, volumechange);
	
	this.audio.setVolume(this.options.volume);
	this.audio.setPlaylist(this.options.playlist);
	
	if (this.options.autoplay && this.options.playlist.length) {
		this.audio.play();
	}
};

fmPlayer.prototype = {

	audio: null,
	
	playback: null,
	seek: null,
	loaded: null,
	played: null,
	volume: null,

	options: {
		volume: 0.8,
		playlist: [],
		autoplay: false,
		layout: {
			playback: '#playback',
			seek: '#seek',
			loaded: '#loaded',
			played: '#played',
			volume: '#volume'
		}
	},
	
	currentVolumeClass: null
};
