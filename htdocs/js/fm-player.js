/**
 * @class fmPlayer
 * 
 * TODO: class must be a singleton instance
 * TODO: cache selector elements for decrease DOM inspection
 * TODO: player must preload next track in a list while current is playing
 * TODO: player has to continue play list if stop button was not clicked
 */

/**
 * @private
 */
var legacy = false;

/**
 * @private
 */
var audio = null;

/**
 * @public
 */
function fmPlayer() {
	
	if (!legacy) {
		$('#audio-container').html('<audio id="audio" preload="metadata" autobuffer></audio>');
	} else {
		alert('SWF audio is not implemented.');
	}

	// HTML5 <audio> support:
	audio = $('#audio').get(0);
	// else Flash support.
	
	//audio = $.html('<audio id="audio" preload="metadata" autobuffer></audio>');
	//$('#audio-container').append(audio);
	
	audioDebug(audio);
	
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
		
		// progress duplicate
		$('#loaded').css('width', parseInt(this.buffered.end(0) / this.duration * $('#bar').width()) + 'px');
		
		button.addClass('pause');
	});
	
	$(audio).bind('pause', function(){
		button.removeClass('pause');
	});
}

/**
 * @public
 */
function play(url) {
	audio.src = url;
}

/**
 * @private
 * @param sec
 */
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

/**
 * @protected
 * @param button
 */
function playPause(button)
{
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
}

/**
 * Business Logic
 */
$(document).ready(function(){
	
	fmPlayer();
	
	$('.playitem').click(function(){
		play('../mp3/' + this.id + '.mp3');
	});
});

/**
 * Debug functions
 */

function debug(str)
{
	$('#fm-debug').append(str + '<br />');
}

function debugTime(str)
{
	$('#fm-debug').append(str);
}

function audioDebug(audio)
{
	$(audio).bind('progress', function(){
		debug('progress(' + parseInt(audio.buffered.end(0)) + ')');
	});
	
	$(audio).bind('timeupdate', function(){
		debugTime('.');
	});
	
	$(audio).bind('canplaythrough', function(){
		debug('canplaythrough');
	});
	
	$(audio).bind('play', function(){
		debug('play');
	});
	
	$(audio).bind('pause', function(){
		debug('pause');
	});
	
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