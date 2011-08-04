
fmPlayer = function (container, options) {
	
	// TODO: legacy detection
	var player = new fmNative(container);
	//this.player = player;
	
	var volumechange = function(player) {
		
		if (this.currentVolumeClass != null) {
			this.volume.removeClass(this.currentVolumeClass);
		}
		alert(currentVolumeClass);
		this.currentVolumeClass = 'level-' + (Math.ceil(this.player.volume / 2 * 10));
		
		this.volume.addClass(this.currentVolumeClass);
	};

	$.extend(this.options, options);
	
	
	playback = $(this.options.layout.playback);
	seek = $(this.options.layout.seek);
	loaded = $(this.options.layout.loaded);
	played = $(this.options.layout.played);
	volume = $(this.options.layout.volume);
	
	if (playback.get(0) != undefined) {
		this.playback = playback;
		//this.playback.bind('click')
	}
	
	if (seek.get(0) != undefined) {
		this.seek = seek;
	}
	
	if (loaded.get(0) != undefined) {
		this.loaded = loaded;
	}
	
	if (played.get(0) != undefined) {
		this.played = played;
	}
	
	if (volume.get(0) != undefined) {
		this.volume = volume;
	}
	
	// each fmAudio.event loop
	$(container).bind('fm-playlist', function(){
		alert('fm-playlist');
	});
	
	
	
	$(container).bind('volumechange', function() {
		volumechange(player);
	});
	
	player.setVolume(this.options.volume);
	player.setPlaylist(this.options.playlist);
	
	if (this.options.autoplay && this.options.playlist.length) {
		this.play();
	}
};

fmPlayer.prototype = {

	player: null,
	
	playback: undefined,
	seek: undefined,
	loaded: undefined,
	played: undefined,
	volume: undefined,

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
	
	currentVolumeClass: null,
	
	play: function() {
		
	}
};
