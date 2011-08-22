
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
var player;
function callback() {
	player.setPlaylist(
		["http://tihonov.yofm.kefir.mtu.immo/bypass/audio_link?audio_id=10121465", "http://tihonov.yofm.kefir.mtu.immo/bypass/audio_link?audio_id=10122093", "bypass/audio_link?audio_id=10415321", "bypass/audio_link?audio_id=10668609", "bypass/audio_link?audio_id=10786545", "bypass/audio_link?audio_id=10829385", "bypass/audio_link?audio_id=10917737", "bypass/audio_link?audio_id=10949266", "bypass/audio_link?audio_id=11032378", "bypass/audio_link?audio_id=11033998", "bypass/audio_link?audio_id=11084028", "bypass/audio_link?audio_id=11132448", "bypass/audio_link?audio_id=11172127", "bypass/audio_link?audio_id=11286701", "bypass/audio_link?audio_id=11286905", "bypass/audio_link?audio_id=11287887", "bypass/audio_link?audio_id=11297945", "bypass/audio_link?audio_id=11298027", "bypass/audio_link?audio_id=11298058", "bypass/audio_link?audio_id=11298093", "bypass/audio_link?audio_id=11298166", "bypass/audio_link?audio_id=11299515", "bypass/audio_link?audio_id=11300226", "bypass/audio_link?audio_id=11303999", "bypass/audio_link?audio_id=11304221", "bypass/audio_link?audio_id=11306705", "bypass/audio_link?audio_id=11306723", "bypass/audio_link?audio_id=11309829", "bypass/audio_link?audio_id=11312658", "bypass/audio_link?audio_id=12073617", "bypass/audio_link?audio_id=12396061", "bypass/audio_link?audio_id=12472520", "bypass/audio_link?audio_id=12486446", "bypass/audio_link?audio_id=12504777", "bypass/audio_link?audio_id=12548020", "bypass/audio_link?audio_id=12550133", "bypass/audio_link?audio_id=12800986", "bypass/audio_link?audio_id=12801209", "bypass/audio_link?audio_id=12821709", "bypass/audio_link?audio_id=12822772", "bypass/audio_link?audio_id=12845642", "bypass/audio_link?audio_id=12855561", "bypass/audio_link?audio_id=12939999", "bypass/audio_link?audio_id=12944517", "bypass/audio_link?audio_id=12962266", "bypass/audio_link?audio_id=13023277", "bypass/audio_link?audio_id=13023868", "bypass/audio_link?audio_id=13036559", "bypass/audio_link?audio_id=13041041", "bypass/audio_link?audio_id=13055782", "bypass/audio_link?audio_id=13083759", "bypass/audio_link?audio_id=13084141", "bypass/audio_link?audio_id=13284002", "bypass/audio_link?audio_id=13289024", "bypass/audio_link?audio_id=13306655", "bypass/audio_link?audio_id=13553023", "bypass/audio_link?audio_id=13554375", "bypass/audio_link?audio_id=13600638", "bypass/audio_link?audio_id=13603206", "bypass/audio_link?audio_id=13603890", "bypass/audio_link?audio_id=13603964", "bypass/audio_link?audio_id=13604726", "bypass/audio_link?audio_id=13614241", "bypass/audio_link?audio_id=13615597", "bypass/audio_link?audio_id=14569331", "bypass/audio_link?audio_id=15132244", "bypass/audio_link?audio_id=15138434", "bypass/audio_link?audio_id=15865466", "bypass/audio_link?audio_id=16343461", "bypass/audio_link?audio_id=16459904", "bypass/audio_link?audio_id=17164193", "bypass/audio_link?audio_id=17164545", "bypass/audio_link?audio_id=17164711", "bypass/audio_link?audio_id=17164775", "bypass/audio_link?audio_id=17165581", "bypass/audio_link?audio_id=17165807", "bypass/audio_link?audio_id=17165880", "bypass/audio_link?audio_id=17166126", "bypass/audio_link?audio_id=17166449", "bypass/audio_link?audio_id=17166617", "bypass/audio_link?audio_id=17166929", "bypass/audio_link?audio_id=17167245", "bypass/audio_link?audio_id=17167261", "bypass/audio_link?audio_id=17167463", "bypass/audio_link?audio_id=17167663", "bypass/audio_link?audio_id=17167949", "bypass/audio_link?audio_id=17168069", "bypass/audio_link?audio_id=17168089", "bypass/audio_link?audio_id=17168239", "bypass/audio_link?audio_id=17168265", "bypass/audio_link?audio_id=17168303", "bypass/audio_link?audio_id=17168375", "bypass/audio_link?audio_id=17168777", "bypass/audio_link?audio_id=17168941", "bypass/audio_link?audio_id=17169015", "bypass/audio_link?audio_id=17169519", "bypass/audio_link?audio_id=17169560", "bypass/audio_link?audio_id=17169745", "bypass/audio_link?audio_id=17169841", "bypass/audio_link?audio_id=17169997", "bypass/audio_link?audio_id=17170093", "bypass/audio_link?audio_id=17170533", "bypass/audio_link?audio_id=17170661", "bypass/audio_link?audio_id=17170745", "bypass/audio_link?audio_id=17170801", "bypass/audio_link?audio_id=17170974", "bypass/audio_link?audio_id=17171073", "bypass/audio_link?audio_id=17171185", "bypass/audio_link?audio_id=17171229", "bypass/audio_link?audio_id=17171314", "bypass/audio_link?audio_id=17171399", "bypass/audio_link?audio_id=17171669", "bypass/audio_link?audio_id=17171743", "bypass/audio_link?audio_id=17171849", "bypass/audio_link?audio_id=17171936", "bypass/audio_link?audio_id=17172083", "bypass/audio_link?audio_id=17172091", "bypass/audio_link?audio_id=17172139", "bypass/audio_link?audio_id=17172179", "bypass/audio_link?audio_id=17172195", "bypass/audio_link?audio_id=17172211", "bypass/audio_link?audio_id=17172403", "bypass/audio_link?audio_id=17172531", "bypass/audio_link?audio_id=17172667", "bypass/audio_link?audio_id=17172675", "bypass/audio_link?audio_id=17172875", "bypass/audio_link?audio_id=17172899", "bypass/audio_link?audio_id=17172995", "bypass/audio_link?audio_id=17173003", "bypass/audio_link?audio_id=17173027", "bypass/audio_link?audio_id=17173099", "bypass/audio_link?audio_id=17173275", "bypass/audio_link?audio_id=17173363", "bypass/audio_link?audio_id=17173403", "bypass/audio_link?audio_id=17173539", "bypass/audio_link?audio_id=17173579", "bypass/audio_link?audio_id=17173619", "bypass/audio_link?audio_id=17173627", "bypass/audio_link?audio_id=17173771", "bypass/audio_link?audio_id=17173819", "bypass/audio_link?audio_id=17173899", "bypass/audio_link?audio_id=17173915", "bypass/audio_link?audio_id=17173947", "bypass/audio_link?audio_id=17174531"]
	);
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
	
	player = $('#fm-player').data('fm-player');
	
	$('#fm-player').bind('ready', callback);
	player.init();
	
	$('#fm-playlist').fmPlaylist($('#fm-player'));
	
	$('.playlist-select-link').click(function(){
		//$('#fm-player').data('fm-player').setVolume('0.4');
		if (currentPlaylist != null) {
			$('#' + currentPlaylist).attr('href', '#' + currentPlaylist);
		}
		
		currentPlaylist = this.id;
		$('#' + currentPlaylist).removeAttr('href');
		
		$('#fm-playlist').data('fm-playlist').set(demo[currentPlaylist]);
	});
});
