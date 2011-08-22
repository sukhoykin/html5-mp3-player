package {
	import flash.events.Event;

	class PlayerEvent extends Event {
		
		public static const ready : String = 'ready';
		public static const media : String = 'media';
		
		public static const loadstart : String = 'loadstart';
		public static const progress : String = 'progress';
		public static const suspend : String = 'suspend';
		public static const abort : String = 'abort';
		public static const error : String = 'error';
		public static const emptied : String = 'emptied';
		public static const stalled : String = 'stalled';
		
		public static const loadedmetadata : String = 'loadedmetadata';
		public static const loadeddata : String = 'loadeddata';
		public static const canplay : String = 'canplay';
		public static const canplaythrough : String = 'canplaythrough';
		public static const playing : String = 'playing';
		public static const waiting : String = 'waiting';
		
		public static const seeking : String = 'seeking';
		public static const seeked : String = 'seeked';
		public static const ended : String = 'ended';
		
		public static const durationchange : String = 'durationchange';
		public static const timeupdate : String = 'timeupdate';
		public static const play : String = 'play';
		public static const pause : String = 'pause';
		public static const ratechange : String = 'ratechange';
		public static const volumechange : String = 'volumechange';

		public static const list : Array = new Array(
			'ready', 'media',
			'loadstart', 'progress', 'suspend', 'abort', 'error', 'emptied', 'stalled',
			'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'playing', 'waiting',
			'seeking', 'seeked', 'ended',
			'durationchange', 'timeupdate', 'play', 'pause', 'ratechange', 'volumechange'
		);

		public function PlayerEvent(type : String) {
			super(type);
		}
	}
}