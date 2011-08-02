var fm_is_play = false;

var audio = null;

function debug(str)
{
	$('.debug').append(str + '<br />');
}

/**
 * TODO: player has to continue play list if stop button was not clicked
 */

function playPause(button)
{
	if (audio == null) {
		
		$('.container').html('<audio id="audio" preload="metadata" autobuffer></audio>');
		
		audio = $('#audio')[0];
		
		$(audio).bind('abort', function(){
			debug('abort');
		});
		
		$(audio).bind('canplay', function(){
			debug('canplay: ' + this.buffered.length);
		});
		
		$(audio).bind('canplaythrough', function(){
			debug('canplaythrough: ' + this.buffered.length);
			this.play();
		});
		
		$(audio).bind('durationchange', function(){
			debug('durationchange: ' + this.duration);
		});
		
		$(audio).bind('emptied', function(){
			debug('emptied');
		});
		
		$(audio).bind('ended', function(){
			debug('ended');
		});
		
		$(audio).bind('error', function(){
			debug('error: ' + this.error.code);
		});
		
		$(audio).bind('loadeddata', function(){
			debug('loadeddata: ' + this.buffered.length);
		});
		
		$(audio).bind('loadedmetadata', function(e){
			debug('loadedmetadata');
			debug('currentTime:' + this.currentTime);
			debug('initialTime:' + this.initialTime);
			debug('defaultPlaybackRate:' + this.defaultPlaybackRate);
			debug('playbackRate:' + this.playbackRate);
		});
		
		$(audio).bind('loadstart', function(){
			debug('loadstart');
		});
		
		$(audio).bind('pause', function(){
			debug('pause');
		});
		
		$(audio).bind('play', function(){
			debug('play');
		});
		
		$(audio).bind('playing', function(){
			debug('playing');
		});
		
		$(audio).bind('progress', function(){
			debug('progress: ' + this.buffered.end(0));
			
		});
		
		$(audio).bind('ratechange', function(){
			debug('ratechange');
		});
		
		$(audio).bind('readystatechange', function(){
			debug('readystatechange');
		});
		
		$(audio).bind('seeked', function(){
			debug('seeked');
		});
		
		$(audio).bind('seeking', function(){
			debug('seeking');
		});
		
		$(audio).bind('stalled', function(){
			debug('stalled');
		});
		
		$(audio).bind('suspend', function(){
			debug('suspend');
		});
		
		$(audio).bind('timeupdate', function(){
			//debug('timeupdate');
		});
		
		$(audio).bind('volumechange', function(){
			debug('volumechange');
		});
		
		$(audio).bind('waiting', function(){
			debug('waiting');
		});
		
		//audio.src = '../mp3/sample.mp3';
		audio.src = '../mp3/stream.mp3';
		
		//audio.play();
		
		button.addClass('pause');
	}
	/*
	if (!fm_is_play) {
		
		fm_is_play = true;
		
		
		
		
		
		button.addClass('pause');
		
	} else {
		
		fm_is_play = false;
		button.removeClass('pause');
	}*/
}

$(document).ready(function(){
	// Events seeding
	$('.play').click(function(){
		playPause($(this));
	});
});