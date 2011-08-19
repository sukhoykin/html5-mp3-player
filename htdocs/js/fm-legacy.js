
/**
 * Legacy Flash implementation.
 * 
 * @author vadim
 */

fmLegacy = function(container) {
	
	fmAudio.call(this, container);
};

fmLegacy.prototype = new fmAudio;

fmLegacy.version = '9.0.0';

fmLegacy.isSupported = function() {
	return swfobject.hasFlashPlayerVersion(fmLegacy.version);
};

fmLegacy.prototype.getObject = function() {
	return document['fm_legacy_object'];
};

fmLegacy.prototype.initialVolume = null;

fmLegacy.prototype.init = function() {
	
	var object = $('<div id="fm_legacy_object" />').get(0);
	
	$(this.container).html(object);
	
	swfobject.embedSWF(
		'js/player.swf',
		'fm_legacy_object',
		'320',
		'240',
		fmLegacy.version,
		false,
		{id: this.container.id},
		{allowScriptAccess: 'sameDomain'}
	);
};

fmLegacy.prototype.setVolume = function(volume) {
	
	if (this.getObject() != undefined && this.getObject().setVolume != undefined) {
		this.getObject().setVolume(volume);
		//this.trigger(fmAudio.event.volumechange);
	} else {
		this.initialVolume = volume;
	}
};

fmLegacy.prototype.getInitialVolume = function() {
	return this.initialVolume;
};

fmLegacy.prototype.getVolume = function() {
	return this.getObject().getVolume();
};

fmLegacy.prototype.setMedia = function(src) {
	this.getObject().setMedia(src == undefined ? null : src);
};

fmLegacy.prototype.hasMedia = function() {
	return this.getObject().hasMedia(); 
};

fmLegacy.prototype.getBuffered = function() {
	return this.getObject().getBuffered(); 
};

fmLegacy.prototype.getDuration = function() {
	return this.getObject().getDuration(); 
};

fmLegacy.prototype.getCurrentTime = function() {
	return this.getObject().getCurrentTime();
},

fmLegacy.prototype.isPaused = function() {
	return this.getObject().isPaused();
},

fmLegacy.prototype.play = function() {
	this.getObject()._play(); 
};

fmLegacy.prototype.pause = function() {
	this.getObject().pause(); 
};

fmLegacy.prototype.setCurrentTime = function(currentTime) {
	this.getObject().setCurrentTime(currentTime); 
};

fmLegacy.prototype.getErrorCode = function() {
	return this.getObject().getErrorCode();
};

//debug trigger
fmLegacy.prototype.trigger = function(eventType) {
	
	fmAudio.prototype.trigger.call(this, eventType);
	
	//this.debugAudio();
	
	if (eventType == 'timeupdate') return;
	//debug
	$('#fm-debug').append(eventType + '<br />');
};
