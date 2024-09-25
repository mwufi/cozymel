'use client';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import ResizableContainer from '../ResizableContainer';

function YoutubeEmbed() {
  return (
    <ResizableContainer>
      <div className="p-4 bg-white">hi there</div>
      <LiteYouTubeEmbed id="VGF8FAV1eeM" title="The best way to learn React" />
    </ResizableContainer>
  )
}

export default YoutubeEmbed;
