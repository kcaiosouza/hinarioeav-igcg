import React from 'react';
import { Composition } from 'remotion';
import { VideoPromo } from './Video';

export function RemotionRoot() {
  return (
    <>
      {/* 9:16 Vertical Composition for Reels / Shorts / TikTok */}
      <Composition
        id="PromoVertical"
        component={VideoPromo}
        durationInFrames={1550}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          hasVoiceover: true,
        }}
      />

      {/* 16:9 Horizontal Composition for YouTube / Large Screens */}
      <Composition
        id="PromoHorizontal"
        component={VideoPromo}
        durationInFrames={1550}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          hasVoiceover: true,
        }}
      />
    </>
  );
}
