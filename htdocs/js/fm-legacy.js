
/**
 * Legacy Flash implementation.
 * 
 * @author vadim
 */

fmLegacy = function(container, playlist) {
	
	fmAudio.call(this, container, playlist);
};

fmLegacy.prototype = new fmAudio;

fmLegacy.isSupported = function() {
	alert('fmAudio.isSupported() is not implemented');
}
