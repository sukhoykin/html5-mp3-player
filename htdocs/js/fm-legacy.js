
/**
 * Legacy Flash implementation.
 */

fmLegacy = function(container, playlist) {
	
	fmAudio.call(this, container, playlist);
};

fmLegacy.prototype = new fmAudio;