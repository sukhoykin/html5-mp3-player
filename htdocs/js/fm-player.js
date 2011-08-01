var fm_is_play = false;

function playPause(c)
{
	if (!fm_is_play) {
		
		fm_is_play = true;
		c.addClass('pause');
		
	} else {
		
		fm_is_play = false;
		c.removeClass('pause');
	}
}

$(document).ready(function(){
	
	$('.play').click(function(){
		playPause($(this));
	});
	
});