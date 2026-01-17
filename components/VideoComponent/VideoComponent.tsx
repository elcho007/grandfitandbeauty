'use client';
import React from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

type Props = {};

const VideoComponent = (props: Props) => {
	const fitnessVideoRef = React.useRef<HTMLVideoElement>(null);
	const beautyVideoRef = React.useRef<HTMLVideoElement>(null);
	const fitnessUserPausedRef = React.useRef(false);
	const beautyUserPausedRef = React.useRef(false);

	const [fitnessPlaying, setFitnessPlaying] = React.useState(false);
	const [beautyPlaying, setBeautyPlaying] = React.useState(false);
	const [fitnessMuted, setFitnessMuted] = React.useState(true);
	const [beautyMuted, setBeautyMuted] = React.useState(true);

	// Play/pause handlers
	const toggleFitnessVideo = async () => {
		const video = fitnessVideoRef.current;
		if (!video) return;

		console.log('Fitness video clicked, current state:', fitnessPlaying);
		console.log('Video ready state:', video.readyState);
		console.log('Video paused:', video.paused);
		console.log('Video src:', video.currentSrc);

		if (fitnessPlaying) {
			fitnessUserPausedRef.current = true;
			video.pause();
			setFitnessPlaying(false);
		} else {
			try {
				fitnessUserPausedRef.current = false;
				// Pause beauty video when fitness plays
				if (beautyVideoRef.current && beautyPlaying) {
					beautyVideoRef.current.pause();
					setBeautyPlaying(false);
				}

				// Load the video first if it hasn't loaded
				if (video.readyState < 2) {
					console.log('Loading video...');
					video.load();
					await new Promise((resolve) => {
						video.addEventListener('loadeddata', resolve, { once: true });
					});
				}

				console.log('Attempting to play fitness video...');
				const playPromise = video.play();

				if (playPromise !== undefined) {
					await playPromise;
					console.log('Fitness video playing successfully');
					setFitnessPlaying(true);
				}
			} catch (error) {
				console.error('Error playing fitness video:', error);
				setFitnessPlaying(false);
			}
		}
	};

	const toggleBeautyVideo = async () => {
		const video = beautyVideoRef.current;
		if (!video) return;

		console.log('Beauty video clicked, current state:', beautyPlaying);
		console.log('Video ready state:', video.readyState);
		console.log('Video paused:', video.paused);
		console.log('Video src:', video.currentSrc);

		if (beautyPlaying) {
			beautyUserPausedRef.current = true;
			video.pause();
			setBeautyPlaying(false);
		} else {
			try {
				beautyUserPausedRef.current = false;
				// Pause fitness video when beauty plays
				if (fitnessVideoRef.current && fitnessPlaying) {
					fitnessVideoRef.current.pause();
					setFitnessPlaying(false);
				}

				// Load the video first if it hasn't loaded
				if (video.readyState < 2) {
					console.log('Loading video...');
					video.load();
					await new Promise((resolve) => {
						video.addEventListener('loadeddata', resolve, { once: true });
					});
				}

				console.log('Attempting to play beauty video...');
				const playPromise = video.play();

				if (playPromise !== undefined) {
					await playPromise;
					console.log('Beauty video playing successfully');
					setBeautyPlaying(true);
				}
			} catch (error) {
				console.error('Error playing beauty video:', error);
				setBeautyPlaying(false);
			}
		}
	};

	const toggleFitnessMute = () => {
		if (fitnessVideoRef.current) {
			fitnessVideoRef.current.muted = !fitnessMuted;
			setFitnessMuted(!fitnessMuted);
		}
	};

	const toggleBeautyMute = () => {
		if (beautyVideoRef.current) {
			beautyVideoRef.current.muted = !beautyMuted;
			setBeautyMuted(!beautyMuted);
		}
	};

	// Handle video end events
	React.useEffect(() => {
		const fitnessVid = fitnessVideoRef.current;
		const beautyVid = beautyVideoRef.current;

		const handleFitnessEnd = () => setFitnessPlaying(false);
		const handleBeautyEnd = () => setBeautyPlaying(false);

		if (fitnessVid) {
			fitnessVid.addEventListener('ended', handleFitnessEnd);
		}
		if (beautyVid) {
			beautyVid.addEventListener('ended', handleBeautyEnd);
		}

		return () => {
			if (fitnessVid) {
				fitnessVid.removeEventListener('ended', handleFitnessEnd);
			}
			if (beautyVid) {
				beautyVid.removeEventListener('ended', handleBeautyEnd);
			}
		};
	}, []);

	// Auto play/pause based on viewport visibility
	React.useEffect(() => {
		const fitnessVid = fitnessVideoRef.current;
		const beautyVid = beautyVideoRef.current;
		if (!fitnessVid || !beautyVid) return;

		if (typeof IntersectionObserver === 'undefined') return;

		const tryPlay = async (
			videoEl: HTMLVideoElement,
			setPlaying: React.Dispatch<React.SetStateAction<boolean>>,
		) => {
			try {
				if (videoEl.readyState < 2) {
					videoEl.load();
				}
				await videoEl.play();
				setPlaying(true);
			} catch {
				// Autoplay can be blocked (e.g. unmuted) — silently ignore.
				setPlaying(false);
			}
		};

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const target = entry.target as HTMLVideoElement;
					const visible =
						entry.isIntersecting && entry.intersectionRatio >= 0.5;

					if (target === fitnessVid) {
						if (visible) {
							if (!fitnessUserPausedRef.current) {
								void tryPlay(fitnessVid, setFitnessPlaying);
							}
						} else {
							fitnessUserPausedRef.current = false;
							fitnessVid.pause();
							setFitnessPlaying(false);
						}
					}

					if (target === beautyVid) {
						if (visible) {
							if (!beautyUserPausedRef.current) {
								void tryPlay(beautyVid, setBeautyPlaying);
							}
						} else {
							beautyUserPausedRef.current = false;
							beautyVid.pause();
							setBeautyPlaying(false);
						}
					}
				}
			},
			{ threshold: [0, 0.5, 1] },
		);

		observer.observe(fitnessVid);
		observer.observe(beautyVid);

		return () => observer.disconnect();
	}, []);

	return (
		<div className='relative w-full h-[200svh] xl:h-svh grid grid-cols-[5vw_repeat(4,1fr)_5vw] bg-(--black) overflow-hidden'>
			{/* Fitness Video */}
			<div className='relative col-span-6 xl:col-start-1 xl:col-span-3 w-full bg-black overflow-hidden group'>
				<video
					ref={fitnessVideoRef}
					className='w-full h-full object-cover'
					/* controls */
					playsInline
					preload='auto'
					loop
					muted={fitnessMuted}
					onError={(e) => {
						console.error('Fitness video error:', e);
						const target = e.target as HTMLVideoElement;
						console.error('Error code:', target.error?.code);
						console.error('Error message:', target.error?.message);
					}}>
					<source src='/videos/vidfitness.webm' type='video/webm' />
					Your browser does not support the video tag.
				</video>

				{/* Custom Controls Overlay */}
				<div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
					<div className='absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-lg text-white text-sm font-semibold'>
						Fitness
					</div>

					<button
						onClick={toggleFitnessVideo}
						className='w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center hover:bg-white/30 transition-all active:scale-95'
						aria-label={
							fitnessPlaying ? 'Pause fitness video' : 'Play fitness video'
						}>
						{fitnessPlaying ? (
							<Pause size={32} className='text-white' fill='white' />
						) : (
							<Play size={32} className='text-white ml-1' fill='white' />
						)}
					</button>

					<button
						onClick={toggleFitnessMute}
						className='absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all'
						aria-label={
							fitnessMuted ? 'Unmute fitness video' : 'Mute fitness video'
						}>
						{fitnessMuted ? (
							<VolumeX size={20} className='text-white' />
						) : (
							<Volume2 size={20} className='text-white' />
						)}
					</button>
				</div>
			</div>

			{/* Beauty Video */}
			<div className='relative col-start-1 col-span-6 xl:col-start-4 xl:col-span-3 w-full bg-black overflow-hidden group'>
				<video
					ref={beautyVideoRef}
					className='w-full h-full object-cover'
					/* controls */
					playsInline
					preload='auto'
					loop
					muted={beautyMuted}
					onError={(e) => {
						console.error('Beauty video error:', e);
						const target = e.target as HTMLVideoElement;
						console.error('Error code:', target.error?.code);
						console.error('Error message:', target.error?.message);
					}}>
					<source src='/videos/vidbeauty.webm' type='video/webm' />
					Your browser does not support the video tag.
				</video>

				{/* Custom Controls Overlay */}
				<div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
					<div className='absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-lg text-white text-sm font-semibold'>
						Beauty
					</div>

					<button
						onClick={toggleBeautyVideo}
						className='w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center hover:bg-white/30 transition-all active:scale-95'
						aria-label={
							beautyPlaying ? 'Pause beauty video' : 'Play beauty video'
						}>
						{beautyPlaying ? (
							<Pause size={32} className='text-white' fill='white' />
						) : (
							<Play size={32} className='text-white ml-1' fill='white' />
						)}
					</button>

					<button
						onClick={toggleBeautyMute}
						className='absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all'
						aria-label={
							beautyMuted ? 'Unmute beauty video' : 'Mute beauty video'
						}>
						{beautyMuted ? (
							<VolumeX size={20} className='text-white' />
						) : (
							<Volume2 size={20} className='text-white' />
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default VideoComponent;
