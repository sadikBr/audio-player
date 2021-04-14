const { promises: fs } = require('fs');

const songsDetails = [];

fs.readdir('./audio/music').then((songs) => {
  songs.forEach((song) => {
    const [artist, songName] = song.split('-');
    const songDetails = {};
    songDetails['artist'] = artist.trim();
    songDetails['songName'] = songName.replace(/\.mp3/, '').trim();
    songDetails['audio'] = `./audio/music/${song}`;
    songDetails['thumbnail'] = `./audio/thumbnails/${song.replace(
      /\.mp3/,
      '.jpg'
    )}`;

    songsDetails.push(songDetails);
  });

  fs.writeFile(
    'songs.js',
    'export default ' + JSON.stringify(songsDetails),
    'utf-8'
  ).then(console.log('done!!'));
});
