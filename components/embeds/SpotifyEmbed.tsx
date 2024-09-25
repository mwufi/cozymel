import { Spotify } from 'react-spotify-embed';

export default function SpotifyEmbed() {
  return (
    <div className="relative group">
      <div className="absolute bottom-full left-0 w-full mb-2 p-3 bg-green-100 rounded-md shadow-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-lg font-semibold text-green-800">tunes</h3>
        <p className="text-sm text-green-600">lotta tunes!</p>
      </div>
      <Spotify link="https://open.spotify.com/track/4F6dlpCLyi8jWWFEjdxCQ0" />
    </div>
  )
}