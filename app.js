const audioElement = document.querySelector('audio');

const playBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const menuBtn = document.getElementById('menu');
const closeMenuBtn = document.getElementById('close-menu');

const backgroundImage = document.getElementById('bg-image');
const songTitle = document.getElementById('title');
const songArtist = document.getElementById('artist');
const songThumbnail = document.getElementById('thumbnail');

const currentTimeElement = document.getElementById('current-time');
const songDurationElement = document.getElementById('duration');
const progressElementContainer = document.getElementById(
  'progress-bar-container'
);
const progressElement = document.getElementById('progress');

const volumeSlider = document.getElementById('volume-slider');
const muteElement = document.getElementById('mute-unmute');
const shuffleElement = document.getElementById('shuffle');

import songs from './songs.js';

let currentSongIndex = 0;

loadSongAndPlay();

menuBtn.addEventListener('click', () => {
  document.body.classList.add('show-gallery');
});
closeMenuBtn.addEventListener('click', () => {
  document.body.classList.remove('show-gallery');
});

audioElement.addEventListener('timeupdate', () => {
  const { duration, currentTime } = audioElement;

  currentTimeElement.textContent = formatTime(currentTime);
  songDurationElement.textContent = formatTime(duration);
  progressElement.style.width = `${(currentTime / duration) * 100}%`;
});
audioElement.addEventListener('ended', () => {
  playNextSong();
});

progressElementContainer.addEventListener('click', (event) => {
  let { duration } = audioElement;
  const timeToSet =
    (event.offsetX / progressElementContainer.clientWidth) * duration;

  audioElement.currentTime = timeToSet;
});

volumeSlider.addEventListener('input', () => {
  audioElement.volume = volumeSlider.value;
});

muteElement.addEventListener('click', () => {
  if (audioElement.volume !== 0) {
    muteSong();
  } else {
    unmuteSong();
  }
});

shuffleElement.addEventListener('click', () => {
  document.body.classList.toggle('shuffle');
});

playBtn.addEventListener('click', () => {
  if (audioElement.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener('click', () => {
  playPrevSong();
});
nextBtn.addEventListener('click', () => {
  playNextSong();
});

function loadSongAndPlay() {
  audioElement.src = songs[currentSongIndex].source;
  backgroundImage.src = songs[currentSongIndex].thumbnail;
  songThumbnail.src = songs[currentSongIndex].thumbnail;
  songTitle.textContent = songs[currentSongIndex].title;
  songArtist.textContent = songs[currentSongIndex].artist;

  playSong();
}

function formatTime(time) {
  const minutes =
    Math.floor(time / 60) > 9
      ? Math.floor(time / 60)
      : `0${Math.floor(time / 60)}`;
  const seconds =
    Math.floor(time % 60) > 9
      ? Math.floor(time % 60)
      : `0${Math.floor(time % 60)}`;

  return `${minutes}:${seconds}`;
}

function playSong() {
  playBtn.querySelector('img').src = './icons/icons8-pause-24.png';
  audioElement.play();
}

function pauseSong() {
  playBtn.querySelector('img').src = './icons/icons8-play-24.png';
  audioElement.pause();
}

function playNextSong() {
  if (document.body.classList.contains('shuffle')) {
    currentSongIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentSongIndex += 1;
    if (currentSongIndex >= songs.length) currentSongIndex = 0;
  }

  loadSongAndPlay();
}

function playPrevSong() {
  if (document.body.classList.contains('shuffle')) {
    currentSongIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentSongIndex -= 1;
    if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
  }

  loadSongAndPlay();
}

function muteSong() {
  volumeSlider.value = 0;
  audioElement.volume = 0;
  muteElement.src = './icons/icons8-mute-26.png';
}

function unmuteSong() {
  volumeSlider.value = 1;
  audioElement.volume = 1;
  muteElement.src = './icons/icons8-audio-26.png';
}
