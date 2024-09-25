'use client';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import ResizableContainer from '../ResizableContainer';

function YoutubeEmbed() {
  return (
    <ResizableContainer>
      <div className="relative group">
        <div className="absolute bottom-full left-0 w-full mb-2 p-3 bg-red-100 rounded-md shadow-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-lg font-semibold text-red-800">yt</h3>
          <p className="text-sm text-red-600">lotta videos!</p>
        </div>
        <LiteYouTubeEmbed id="VGF8FAV1eeM" title="The best way to learn React" />
      </div>
    </ResizableContainer>
  )
}

export default YoutubeEmbed;
