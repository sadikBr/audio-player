const audioElement = document.querySelector('audio');

const playBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const backgroundImage = document.getElementById('bg-image');
const songTitle = document.getElementById('title');
const songArtist = document.getElementById('artist');
const songThumbnail = document.getElementById('thumbnail');

import songs from './songs.js';

let currentSongIndex = 0;

loadSongAndPlay();

playBtn.addEventListener('click', () => {
  if (audioElement.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener('click', () => {
  currentSongIndex -= 1;

  if (currentSongIndex < 0) currentSongIndex = songs.length - 1;

  loadSongAndPlay();
});
nextBtn.addEventListener('click', () => {
  currentSongIndex += 1;

  if (currentSongIndex >= songs.length) currentSongIndex = 0;

  loadSongAndPlay();
});

function loadSongAndPlay() {
  audioElement.src = songs[currentSongIndex].source;
  backgroundImage.src = songs[currentSongIndex].thumbnail;
  songThumbnail.src = songs[currentSongIndex].thumbnail;
  songTitle.textContent = songs[currentSongIndex].title;
  songArtist.textContent = songs[currentSongIndex].artist;
  playSong();
}

function playSong() {
  playBtn.querySelector('img').src = './icons/icons8-pause-24.png';
  audioElement.play();
}

function pauseSong() {
  playBtn.querySelector('img').src = './icons/icons8-play-24.png';
  audioElement.pause();
}
