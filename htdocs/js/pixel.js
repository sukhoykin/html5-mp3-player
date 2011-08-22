
var currentPlaylist = null;
var demo = {
	'rock': {
		caption: 'Rock',
		list: {
			'mp3/rock/The Hurlyburly.mp3': ['Van Der Graaf Generator', 'The Hurlyburly'],
			'mp3/rock/Songs Of The Ocean.mp3': ['Star One', 'Songs Of The Ocean'],
			'mp3/rock/Jaws Of Life.mp3': ['John Petrucci', 'Jaws Of Life'],
			'mp3/rock/Head.mp3': ['OSI', 'Head'],
			'mp3/rock/2 X 4.mp3': ['Metallica', '2 X 4'],
			'mp3/rock/From the Beginning.mp3': ['Emerson, Lake & Palmer', 'From the Beginning'],
			'mp3/rock/New Year`s Eve.mp3': ['Pain Of Salvation', 'New Year`s Eve'],
			'mp3/rock/The Ravages Of Time.mp3': ['Threshold', 'The Ravages Of Time'],
			'mp3/rock/Trees Of Eternity.mp3': ['Ozric Tentacles', 'Trees Of Eternity'],
			'mp3/rock/Storia Senti.mp3': ['Phideaux', 'Storia Senti'],
			'mp3/rock/Balrog Boogie.mp3': ['Diablo Swing Orchestra', 'Balrog Boogie'],
			'mp3/rock/6-00.mp3': ['Dream Theater', '6:00'],
			'mp3/rock/Radioactive Toy.mp3': ['Porcupine Tree', 'Radioactive Toy'],
			'mp3/rock/Obsession.mp3': ['Blind Ego', 'Obsession'],
			'mp3/rock/Beds Are Burning.mp3': ['Midnight Oil', 'Beds Are Burning'],
			'mp3/rock/Bicycle Race.mp3': ['Queen', 'Bicycle Race'],
			'mp3/rock/Finale.mp3': ['Mike Oldfield', 'Finale'],
			'mp3/rock/Moria.mp3': ['Anyone\'s Daughter', 'Moria'],
			'mp3/rock/A Place in the Queue.mp3': ['The Tangent', 'A Place in the Queue'],
			'mp3/rock/Mammagamma.mp3': ['Alan Parsons Project', 'Mammagamma'],
			'mp3/rock/Lost Without You.mp3': ['John Petrucci', 'Lost Without You']
		}
	},
	'electronic': {
		caption: 'Electronic',
		list: {
			'mp3/electronic/Elysian Feels.mp3': ['F.S.O.L.', 'Elysian Feels'],
			'mp3/electronic/Stranded Feelings.mp3': ['Marco Torrance', 'Stranded Feelings'],
			'mp3/electronic/The Document.mp3': ['Lithium Project', 'The Document'],
			'mp3/electronic/Golden Rain.mp3': ['Cassavettz', 'Golden Rain'],
			'mp3/electronic/Mock Tudor.mp3': ['Orbital', 'Mock Tudor'],
			'mp3/electronic/Cape Blanc.mp3': ['Jens Gad', 'Cape Blanc'],
			'mp3/electronic/Commander Moira.mp3': ['Ninja 9000', 'Commander Moira'],
			'mp3/electronic/Albert Balbert.mp3': ['Vibe Tribe', 'Albert Balbert'],
			'mp3/electronic/Vortex.mp3': ['Carbon Based Lifeforms', 'Vortex'],
			'mp3/electronic/The Colours.mp3': ['The Lab', 'The Colours'],
			'mp3/electronic/Forgive Me.mp3': ['Infected Mushroom', 'Forgive Me'],
			'mp3/electronic/Harder Better Faster Stronger.mp3': ['Daft Punk', 'Harder Better Faster Stronger'],
			'mp3/electronic/The Girl And The Robot.mp3': ['Röyksopp', 'The Girl And The Robot'],
			'mp3/electronic/Insum.mp3': ['Solar Fields', 'Insum'],
			'mp3/electronic/Infected Cat.mp3': ['Mindelight', 'Infected Cat'],
			'mp3/electronic/Lotus Kiss.mp3': ['Alex Theory', 'Lotus Kiss'],
			'mp3/electronic/Slowly.mp3': ['Amon Tobin', 'Slowly'],
			'mp3/electronic/Light On.mp3': ['Dee Theo Project', 'Light On'],
			'mp3/electronic/If Only.mp3': ['PixxelTyger', 'If Only'],
			'mp3/electronic/Ironica.mp3': ['Doctor Silence', 'Ironica']
		}
	},
	'all': {
		caption: 'All',
		list: {
			'mp3/rock/The Hurlyburly.mp3': ['Van Der Graaf Generator', 'The Hurlyburly'],
			'mp3/rock/Songs Of The Ocean.mp3': ['Star One', 'Songs Of The Ocean'],
			'mp3/rock/Jaws Of Life.mp3': ['John Petrucci', 'Jaws Of Life'],
			'mp3/rock/Head.mp3': ['OSI', 'Head'],
			'mp3/rock/2 X 4.mp3': ['Metallica', '2 X 4'],
			'mp3/rock/From the Beginning.mp3': ['Emerson, Lake & Palmer', 'From the Beginning'],
			'mp3/rock/New Year`s Eve.mp3': ['Pain Of Salvation', 'New Year`s Eve'],
			'mp3/rock/The Ravages Of Time.mp3': ['Threshold', 'The Ravages Of Time'],
			'mp3/rock/Trees Of Eternity.mp3': ['Ozric Tentacles', 'Trees Of Eternity'],
			'mp3/rock/Storia Senti.mp3': ['Phideaux', 'Storia Senti'],
			'mp3/rock/Balrog Boogie.mp3': ['Diablo Swing Orchestra', 'Balrog Boogie'],
			'mp3/rock/6-00.mp3': ['Dream Theater', '6:00'],
			'mp3/rock/Radioactive Toy.mp3': ['Porcupine Tree', 'Radioactive Toy'],
			'mp3/rock/Obsession.mp3': ['Blind Ego', 'Obsession'],
			'mp3/rock/Beds Are Burning.mp3': ['Midnight Oil', 'Beds Are Burning'],
			'mp3/rock/Bicycle Race.mp3': ['Queen', 'Bicycle Race'],
			'mp3/rock/Finale.mp3': ['Mike Oldfield', 'Finale'],
			'mp3/rock/Moria.mp3': ['Anyone\'s Daughter', 'Moria'],
			'mp3/rock/A Place in the Queue.mp3': ['The Tangent', 'A Place in the Queue'],
			'mp3/rock/Mammagamma.mp3': ['Alan Parsons Project', 'Mammagamma'],
			'mp3/rock/Lost Without You.mp3': ['John Petrucci', 'Lost Without You'],
			'mp3/electronic/Elysian Feels.mp3': ['F.S.O.L.', 'Elysian Feels'],
			'mp3/electronic/Stranded Feelings.mp3': ['Marco Torrance', 'Stranded Feelings'],
			'mp3/electronic/The Document.mp3': ['Lithium Project', 'The Document'],
			'mp3/electronic/Golden Rain.mp3': ['Cassavettz', 'Golden Rain'],
			'mp3/electronic/Mock Tudor.mp3': ['Orbital', 'Mock Tudor'],
			'mp3/electronic/Cape Blanc.mp3': ['Jens Gad', 'Cape Blanc'],
			'mp3/electronic/Commander Moira.mp3': ['Ninja 9000', 'Commander Moira'],
			'mp3/electronic/Albert Balbert.mp3': ['Vibe Tribe', 'Albert Balbert'],
			'mp3/electronic/Vortex.mp3': ['Carbon Based Lifeforms', 'Vortex'],
			'mp3/electronic/The Colours.mp3': ['The Lab', 'The Colours'],
			'mp3/electronic/Forgive Me.mp3': ['Infected Mushroom', 'Forgive Me'],
			'mp3/electronic/Harder Better Faster Stronger.mp3': ['Daft Punk', 'Harder Better Faster Stronger'],
			'mp3/electronic/The Girl And The Robot.mp3': ['Röyksopp', 'The Girl And The Robot'],
			'mp3/electronic/Insum.mp3': ['Solar Fields', 'Insum'],
			'mp3/electronic/Infected Cat.mp3': ['Mindelight', 'Infected Cat'],
			'mp3/electronic/Lotus Kiss.mp3': ['Alex Theory', 'Lotus Kiss'],
			'mp3/electronic/Slowly.mp3': ['Amon Tobin', 'Slowly'],
			'mp3/electronic/Light On.mp3': ['Dee Theo Project', 'Light On'],
			'mp3/electronic/If Only.mp3': ['PixxelTyger', 'If Only'],
			'mp3/electronic/Ironica.mp3': ['Doctor Silence', 'Ironica']
		}
	}
};

$(document).ready(function(){
	
	/** all invokes are with default options */
	
	$('#fm-player').fmPlayer(
		{
			volume: 0.8,
			playlist: [],
			autoplay: false,
			layout: {
				playback: '#playback',
				prev: '#prev',
				next: '#next',
				begin: '#begin',
				end: '#end',
				bar: '#bar',
				seek: '#seek',
				loaded: '#loaded',
				played: '#played',
				head: '#head',
				repeat: '#repeat',
				shuffle: '#shuffle',
				volume: '#volume'
			}
		}
	);
	
	$('#fm-player').bind('ready', ready);
	$('#fm-player').data('fm-player').init();
	
	function ready() {
		$('#fm-playlist').fmPlaylist($('#fm-player'));
	}
	
	$('.playlist-select-link').click(function(){
		
		if (currentPlaylist != null) {
			$('#' + currentPlaylist).attr('href', '#' + currentPlaylist);
		}
		
		currentPlaylist = this.id;
		$('#' + currentPlaylist).removeAttr('href');
		
		$('#fm-playlist').data('fm-playlist').set(demo[currentPlaylist]);
	});
});
