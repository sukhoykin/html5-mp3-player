package {
	
	import flash.display.Sprite;
	
	import flash.text.TextField;
	
	import flash.utils.Timer;
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.media.SoundTransform;
	import flash.net.URLRequest;
	import flash.events.Event;
	import flash.events.TimerEvent;
	import flash.events.IOErrorEvent;
	import flash.events.ProgressEvent;
	import flash.events.NetStatusEvent;
	import flash.events.AsyncErrorEvent;
	
	import PlayerEvent;
	
	import flash.system.Security;
	import flash.external.ExternalInterface;
	
	public class Player extends Sprite {
		
		private var timer : Timer = new Timer(100);
		private var triggerTimer : Timer = new Timer(30);
		
		private var sound : Sound = null;
		private var channel : SoundChannel = null;
		
		private var loading : Boolean = false;
		private var canplay : Boolean = false;
		
		private var volume : Number;
		private var position : Number = 0;
		
		private var errorCode : int = 0;
		
		private var debug : TextField = new TextField();
		
		private static const audio_api : Array = new Array(
			'setVolume', 'getVolume',
			'setMedia', 'hasMedia',
			'getBuffered', 'getDuration', 'getCurrentTime',
			'isPaused', '_play', 'pause',
			'setCurrentTime',
			'getErrorCode'
		);
		
		public function Player() {
			
			addChild(debug);
			
			debug.x = 0;
			debug.y = 0;
			debug.width = 320;
			debug.height = 240;
			
			log('ExternalInterface: ' + ExternalInterface.available.toString());
			
			Security.allowDomain('*');
			
			timer.addEventListener(TimerEvent.TIMER, init);
			timer.start();
			
			
		}
		
		private function init(e : TimerEvent) : void {
			
			log('init');
			
			if (ExternalInterface.call("jQuery('#" + loaderInfo.parameters.id + "').fmPlayer", 'method', 'getInitialVolume') == undefined) {
				log('not ready');
				return;
			}
			
			timer.stop();
			
			log('getInitialVolume: ' + ExternalInterface.call("jQuery('#" + loaderInfo.parameters.id + "').fmPlayer", 'method', 'getInitialVolume'));
			
			for each (var method : String in audio_api) {
				ExternalInterface.addCallback(method, this[method]);
			}
			
			for each (var event : String in PlayerEvent.list) {
				addEventListener(event, playerEvent);
			}
			
			addEventListener(Event.ENTER_FRAME, enterFrame);
			
			setVolume(
				ExternalInterface.call("jQuery('#" + loaderInfo.parameters.id + "').fmPlayer", 'method', 'getInitialVolume')
			);
		}
		
		private function setVolume(volume : Number) : void {
			
			if (volume > 1) volume = 1;
			
			log('setVolume: ' + volume);
			
			this.volume = volume;
			
			if (!isPaused()) {
				var soundTransform : SoundTransform = new SoundTransform(volume);
				channel.soundTransform = soundTransform;
			}
			
			/**
			 * Could not call Flash methods from JS through direct trigger, timers used.
			 */
			triggerTimer.addEventListener(TimerEvent.TIMER, triggerVolumeChange);
			triggerTimer.start();
		}
		
		public function triggerVolumeChange(e : TimerEvent) : void {
			
			log('triggerVolumeChange');
			
			triggerTimer.removeEventListener(TimerEvent.TIMER, triggerVolumeChange);
			triggerTimer.stop();
			dispatchEvent(new Event(PlayerEvent.volumechange));
		}
		
		private function getVolume() : Number {
			log('getVolume');
			return volume;
		}
		
		private function setMedia(src : String) : void {
			
			log('setMedia: ' + src);
			
			if (hasMedia()) {
				
				if (!isPaused()) {
					channel.stop();
					channel = null;
				}
				
				dispatchEvent(new Event(PlayerEvent.abort));
				dispatchEvent(new Event(PlayerEvent.emptied));
				
				sound = null;
			}
			
			if (src == null) return;
			
			position = 0;
			
			sound = new Sound();
			
			sound.addEventListener(Event.OPEN, soundOpen);
			sound.addEventListener(IOErrorEvent.IO_ERROR, soundError);
			sound.addEventListener(Event.ID3, soundId3);
			sound.addEventListener(ProgressEvent.PROGRESS, soundProgress);
			sound.addEventListener(Event.COMPLETE, soundLoadComplete);
			
			sound.load(new URLRequest(src));
		}
		
		private function hasMedia() : Boolean {
			return sound != null;
		}
		
		private function getBuffered() : Number {
			return sound.bytesLoaded / sound.bytesTotal * getDuration();
		}
		
		private function getDuration() : Number {
			return sound.length / 1000;
		}
		
		private function getCurrentTime() : Number {
			return channel.position / 1000;
		}
		
		private function isPaused() : Boolean {
			return channel == null;
		}
		
		private function _play() : void {
			
			dispatchEvent(new Event(PlayerEvent.play));
			
			channel = sound.play(position * 1000);
			
			var soundTransform : SoundTransform = new SoundTransform(volume);
			channel.soundTransform = soundTransform;
			
			channel.addEventListener(Event.SOUND_COMPLETE, soundComplete);
			
			dispatchEvent(new Event(PlayerEvent.playing));
		}
		
		private function pause() : void {
			
			if (!isPaused()) {
				
				dispatchEvent(new Event(PlayerEvent.pause));
				
				position = getCurrentTime();
				channel.stop();
				channel = null;
			}
		}
		
		private function setCurrentTime(currentTime : Number) : void {
			
			log('setCurrentTime: ' + currentTime);
			
			dispatchEvent(new Event(PlayerEvent.seeking));
			
			if (!isPaused()) {
				
				channel.stop();
				channel = null;
				
				channel = sound.play(currentTime * 1000);
				
				var soundTransform : SoundTransform = new SoundTransform(volume);
				channel.soundTransform = soundTransform;
				
				channel.addEventListener(Event.SOUND_COMPLETE, soundComplete);
			}
			
			position = currentTime;
			
			dispatchEvent(new Event(PlayerEvent.seeked));
		}
		
		private function getErrorCode() : Number {
			
			return errorCode;
		}
		
		public function playerEvent(event : Event) : void {
			log('#' + event.type);
			ExternalInterface.call("jQuery('#" + loaderInfo.parameters.id + "').fmPlayer", 'event', event.type);
		}
		
		public function enterFrame(event : Event) : void {
			if (loading) {
				dispatchEvent(new Event(PlayerEvent.progress));
			}
			
			if (!isPaused()) {
				dispatchEvent(new Event(PlayerEvent.timeupdate));
			}
		}
		
		public function soundOpen(event : Event) : void {
			log('soundOpen');
			canplay = false;
			dispatchEvent(new Event(PlayerEvent.loadstart));
		}
		
		public function soundError(event : IOErrorEvent) : void {
			log('soundError');
			errorCode = 2;
			dispatchEvent(new Event(PlayerEvent.error));
		}
		
		public function soundId3(event : Event) : void {
			log('soundId3');
		}

		public function soundProgress(event : ProgressEvent) : void {
			
			if (!canplay) {
				log('soundProgress');
				dispatchEvent(new Event(PlayerEvent.durationchange));
				dispatchEvent(new Event(PlayerEvent.loadedmetadata));
				dispatchEvent(new Event(PlayerEvent.loadeddata));
				dispatchEvent(new Event(PlayerEvent.canplay));
				dispatchEvent(new Event(PlayerEvent.canplaythrough));
				dispatchEvent(new Event(PlayerEvent.progress));
				
				loading = true;
				canplay = true;
			}
		}
		
		public function soundLoadComplete(event : Event) : void {
			log('soundLoadComplete');
			loading = false;
			dispatchEvent(new Event(PlayerEvent.progress));
		}
		
		public function soundComplete(event : Event) : void {
			log('soundComplete');
			dispatchEvent(new Event(PlayerEvent.timeupdate));
			dispatchEvent(new Event(PlayerEvent.ended));
		}
		
		private function log(msg : String) : void {
			debug.text += msg + "\n";
		}
	}
}
