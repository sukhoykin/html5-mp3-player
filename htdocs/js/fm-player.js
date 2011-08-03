var fm_is_play = false;

var audio = null;

function debug(str)
{
	$('.debug').append(str + '<br />');
}

function audioDebug(audio)
{
	$(audio).bind('playing', function(){
		debug('playing');
	});
	
	$(audio).bind('abort', function(){
		debug('abort');
	});
	
	$(audio).bind('canplay', function(){
		debug('canplay');
	});
	
	$(audio).bind('durationchange', function(){
		debug('durationchange');
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
		debug('loadeddata');
	});
	
	$(audio).bind('loadedmetadata', function(e){
		debug('loadedmetadata');
	});
	
	$(audio).bind('loadstart', function(){
		debug('loadstart');
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
	
	$(audio).bind('volumechange', function(){
		debug('volumechange');
	});
	
	$(audio).bind('waiting', function(){
		debug('waiting');
	});
}

/**
 * TODO: create an object for player + cache selector elements
 * TODO: player must preload next track in a list while current is playing
 * TODO: player has to continue play list if stop button was not clicked
 */

function playPause(button)
{
	if (audio == null) {
		
		$('#audio-container').html('<audio id="audio" preload="metadata" autobuffer></audio>');
		
		// HTML5 <audio> support:
		audio = $('#audio').get(0);
		// else Flash support.
		
		$(audio).bind('progress', function(){
			$('#loaded').css('width', parseInt(this.buffered.end(0) / this.duration * $('#bar').width()) + 'px');
		});
		
		$(audio).bind('timeupdate', function(){
			$('#played').css('width', parseInt(this.currentTime / this.duration * $('#bar').width()) + 'px');
		});
		
		$(audio).bind('canplaythrough', function(){
			
			$('#seek').addClass('playing');
			
			$('#seek').click(function(e){
				seek(e.offsetX / $('#bar').width() * audio.duration);
			});
			
			this.play();
		});
		
		$(audio).bind('play', function(){
			button.addClass('pause');
		});
		
		$(audio).bind('pause', function(){
			button.removeClass('pause');
		});
		
		audioDebug(audio);
		
		//audio.src = '../mp3/sample.mp3';
		audio.src = '../mp3/stream.mp3';
		//audio.src = 'http://t.doc-0-0-sj.sj.googleusercontent.com/stream?id=2893ef84fee7220c&itag=25&o=08564193242353898071&ip=0.0.0.0&ipbits=0&expire=1312379026&sparams=id,itag,o,ip,ipbits,expire&signature=AAB4C1B67FE6D606211D9CF2077B79CA9F0E662.1E6331C6EC897A6DAFA6CB98B1228DD39CF998CA&key=sj2';
		
	} else {
		
		// HTML5 <audio> support:
		audio = $('#audio').get(0);
		// else Flash support.
		
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	}
}

function seek(sec)
{
	// HTML5 <audio> support:
	audio = $('#audio').get(0);
	// else Flash support.
	
	/**
	 * TODO: check buffered range (seek or range request)
	 * TODO: check seekable range (seek or range request)
	 */
	
	audio.currentTime = sec;
}

$(document).ready(function(){
	// Events seeding
	$('#playPause').click(function(){
		playPause($(this));
	});
});