
/**
 * Native <audio> implementation.
 * 
 * @author vadim
 */
fmNative = function(container) {
	
	fmAudio.call(this, container);
};

fmNative.prototype = new fmAudio;

fmNative.isSupported = function() {
	
	try {
		return new Audio().canPlayType('audio/mpeg; codecs="mp3"');
	} catch(e) {
		return false;
	}
}

fmNative.prototype.trigger = function(eventType) {
	
	fmAudio.prototype.trigger.call(this, eventType);
	
	if (eventType == 'timeupdate') return;
	
	console.log(eventType);
};

fmNative.prototype.init = function() {
	
	var self = this;
	
	this.audio = $('<audio />').get(0);
	
	$(this.audio)
		.attr('preload', 'auto')
		.attr('autobuffer', true);
	
	$.each(fmAudio.event, function(eventType){
		$(self.audio).bind(eventType, function(){
			self.trigger(eventType);
		});
	});
	
	$(this.container).html(this.audio);
	
	this.trigger(fmAudio.event.ready);
	
	if (this.debugAudio != undefined) {
		this.debugAudio();
	}
};

fmNative.prototype.setVolume = function(volume) {
	this.audio.volume = volume;
};

fmNative.prototype.getVolume = function() {
	return Math.round(this.audio.volume * 100) / 100;
};

fmNative.prototype.setMedia = function(src) {
	
	if (src != undefined) {
		this.audio.src = src;
		//this.audio.load();
		this.trigger(fmAudio.event.media);
	} else {
		
		if (!this.audio.paused) {
			this.audio.pause();
		}
		
		this.audio.src = null;
	}
};

fmNative.prototype.hasMedia = function() {
	return this.audio.src != ''; 
};

fmNative.prototype.getBuffered = function() {
	return this.audio.buffered.end(0);
};

fmNative.prototype.getDuration = function() {
	return this.audio.duration;
};

fmNative.prototype.getCurrentTime = function() {
	return this.audio.currentTime;
},

fmNative.prototype.isPaused = function() {
	return this.audio.paused;
},

fmNative.prototype.play = function() {
	this.audio.play();
};

fmNative.prototype.pause = function() {
	this.audio.pause();
};

fmNative.prototype.setCurrentTime = function(currentTime) {
	this.audio.currentTime = currentTime;
};

fmNative.prototype.getErrorCode = function() {
	return this.audio.error.code;
};
