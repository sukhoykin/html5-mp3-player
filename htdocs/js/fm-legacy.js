
/**
 * Legacy Flash implementation.
 * 
 * @author vadim
 */

fmLegacy = function(container, playlist) {
	
	var self = this;
	
	fmAudio.call(this, container);
	
	var object = $('<div id="fm-legacy-object" />').get(0);
	
	$(this.container).html(object);
	
	swfobject.embedSWF(
		'js/player.swf',
		'fm-legacy-object',
		'1',
		'1',
		fmLegacy.version,
		false,
		{id: container.id},
		{allowScriptAccess: 'sameDomain'}
	);
};

fmLegacy.prototype = new fmAudio;

fmLegacy.version = '9.0.0';

fmLegacy.isSupported = function() {
	return swfobject.hasFlashPlayerVersion(fmLegacy.version);
};

fmLegacy.prototype.getObject = function() {
	return document['fm-legacy-object'];
};

fmLegacy.prototype.initialVolume = null;

fmLegacy.prototype.setVolume = function(volume) {
	
	if (this.getObject() != undefined && this.getObject().setVolume != undefined) {
		this.getObject().setVolume(volume);
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
	this.getObject().play(); 
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
