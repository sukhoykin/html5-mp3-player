(function ( $ ) {
	
	$.fn.fmPlayer = function (options) {
		
		//$.data(this, 'fmPlayer', new fmPlayer(this, options));
		
		return new fmPlayer(this, options);
	};
	
})( jQuery );
