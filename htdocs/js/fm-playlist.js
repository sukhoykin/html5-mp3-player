
/**
 * fmPlaylist plugin for jQuery.
 * 
 * Usage:
 * $(id).fmPlaylist([options]);
 * 
 * @author vadim
 */
(function ( $ ) {
	
	$.fn.fmPlaylist = function (player, options) {
		
		this.each(function(){
			$.data(this, this.id, new fmPlaylist(this, player, options));
		});
		
		return this;
	};
	
})( jQuery );

/**
 * Playlist component.
 * 
 * @author vadim
 */
fmPlaylist = function (container, player, options) {

	var self = this;
	
	this.container = container;
	this.player = player.data('fm-player');
	
	var play = function() {
		
		if (self.currentTrack != null) {
			self.currentTrack.empty();
		}
		
		self.currentTrack = $($(self.tbody.children('#track-number-' + self.player.getCurrentTrack()).get(0)).children().get(0));
		
		self.currentTrack.html('<div class="playing"></div>');
	};
	
	var pause = function() {
		
		self.currentTrack.html('<div class="paused"></div>');
	};
	
	$.extend(this.options, options);
	
	player.bind('play', play);
	player.bind('pause', pause);
	
	this.caption = $(this.options.layout.caption);
};

fmPlaylist.prototype = {
	
	player: null,
	container: null,

	caption: null,
	playtable: null,
	tbody: null,
	
	options: {
		layout: {
			caption: '#caption'
		}
	},
	
	playlist: null,
	currentTrack: null,
	
	trackDoubleClick: function(track) {
		this.player.play(track);
	},
	
	set: function(playlist) {
		
		var self = this;
		
		this.playlist = playlist;
		
		playlist = [];
		
		this.playtable = $('<table cellpadding="0" cellspacing="0" class="playtable" />');
		this.playtable.html('<tr class="header"><td class="playing-col"></td><td class="artist-col">Artist</td><td class="title-col">Title</td</tr>');
		
		this.tbody = $(this.playtable.children().get(0));
		
		$.each(this.playlist.list, function(source, meta){
			
			/** this == meta */
			
			var tr = $('<tr id="track-number-' + playlist.length + '" class="item"><td></td><td>' + meta[0] + '</td><td>' + meta[1] + '</td></tr>');
			
			tr.dblclick(function(){self.trackDoubleClick(this.id.substring(13))});
			
			self.playtable.append(tr);
			
			playlist.push(source);
		});
		
		this.caption.text(this.playlist.caption);
		this.player.setPlaylist(playlist);
		
		$(this.container).html(this.playtable);
	}
};