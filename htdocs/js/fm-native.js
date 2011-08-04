
/**
 * Native <audio> implementation.
 */
fmNative = function(container) {
	
	fmAudio.call(this, container);
	
	this.audio = $('<audio />');
	
	$(this.audio)
		.attr('preload', 'metadata')
		.attr('autobuffer', true);
	
	$(this.container).html(this.audio);
};

fmNative.prototype = new fmAudio;

fmNative.prototype.setVolume = function(volume) {

	fmAudio.prototype.setVolume.call(this, volume);
	
	if (this.audio.src != undefined) {
		
	} else {
		this.trigger(fmAudio.event.volumechange);
	}
};