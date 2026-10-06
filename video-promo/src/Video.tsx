import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';

import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Problem } from './scenes/Scene2Problem';
import { Scene3Turn } from './scenes/Scene3Turn';
import { Scene4Keypad } from './scenes/Scene4Keypad';
import { Scene5Search } from './scenes/Scene5Search';
import { Scene6SheetMusic } from './scenes/Scene6SheetMusic';
import { Scene7SwipeRead } from './scenes/Scene7SwipeRead';
import { Scene8CTA } from './scenes/Scene8CTA';

export interface VideoPromoProps {
  hasVoiceover?: boolean;
}

const SPEAKING_INTERVALS: [number, number][] = [
  [10, 93],
  [115, 356],
  [380, 518],
  [540, 664],
  [690, 869],
  [895, 1107],
  [1135, 1328],
  [1355, 1509],
];

function getMusicVolume(frame: number, hasVoiceover: boolean): number {
  if (frame < 0 || frame >= 1550) return 0;

  let baseVol = 0.45;
  if (frame >= 105 && frame < 370) {
    baseVol = 0.35; // slightly subdued during problem scene
  }

  let currentVol = baseVol;
  if (hasVoiceover) {
    let minDistance = 9999;
    let isInside = false;

    for (const [start, end] of SPEAKING_INTERVALS) {
      if (frame >= start && frame <= end) {
        isInside = true;
        break;
      }
      const dist = Math.min(Math.abs(frame - start), Math.abs(frame - end));
      if (dist < minDistance) minDistance = dist;
    }

    if (isInside) {
      currentVol = 0.18;
    } else if (minDistance < 10) {
      // Smooth 10-frame crossfade
      const factor = minDistance / 10;
      currentVol = 0.18 + (baseVol - 0.18) * factor;
    } else {
      currentVol = baseVol;
    }
  }

  // Fade-in at start (0 to 30 frames)
  if (frame < 30) {
    currentVol = currentVol * (frame / 30);
  }

  // Fade-out at end (1500 to 1550 frames)
  if (frame > 1500) {
    currentVol = currentVol * Math.max(0, (1550 - frame) / 50);
  }

  return currentVol;
}

export function VideoPromo({ hasVoiceover = true }: VideoPromoProps) {
  const frame = useCurrentFrame();
  const musicVolume = getMusicVolume(frame, hasVoiceover);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0e1712' }}>
      {/* Global Font Face Styles */}
      <style>{`
        @font-face {
          font-family: 'Fraunces';
          src: url('${staticFile('fonts/Fraunces_600SemiBold.ttf')}') format('truetype');
          font-weight: 600;
          font-style: normal;
        }
        @font-face {
          font-family: 'Fraunces';
          src: url('${staticFile('fonts/Fraunces_700Bold.ttf')}') format('truetype');
          font-weight: 700;
          font-style: normal;
        }
        @font-face {
          font-family: 'Inter';
          src: url('${staticFile('fonts/Inter_400Regular.ttf')}') format('truetype');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'Inter';
          src: url('${staticFile('fonts/Inter_600SemiBold.ttf')}') format('truetype');
          font-weight: 600;
          font-style: normal;
        }
        @font-face {
          font-family: 'Inter';
          src: url('${staticFile('fonts/Inter_700Bold.ttf')}') format('truetype');
          font-weight: 700;
          font-style: normal;
        }
        * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>

      {/* Background Music with Smooth Ducking */}
      <Audio
        src={staticFile('audio/bg-music.mp3')}
        volume={musicVolume}
        startFrom={0}
      />

      {/* Voiceover Audios with exact durations and breathing room */}
      {hasVoiceover && (
        <>
          {/* 01-gancho.mp3 (2.77s / 83 frames) */}
          <Sequence from={10} durationInFrames={83}>
            <Audio src={staticFile('voiceover/01-gancho.mp3')} volume={1} />
          </Sequence>

          {/* 02-problema.mp3 (8.05s / 241 frames) */}
          <Sequence from={115} durationInFrames={241}>
            <Audio src={staticFile('voiceover/02-problema.mp3')} volume={1} />
          </Sequence>

          {/* 03-virada.mp3 (4.60s / 138 frames) */}
          <Sequence from={380} durationInFrames={138}>
            <Audio src={staticFile('voiceover/03-virada.mp3')} volume={1} />
          </Sequence>

          {/* 04-teclado.mp3 (4.13s / 124 frames) */}
          <Sequence from={540} durationInFrames={124}>
            <Audio src={staticFile('voiceover/04-teclado.mp3')} volume={1} />
          </Sequence>

          {/* 05-busca.mp3 (5.96s / 179 frames) */}
          <Sequence from={690} durationInFrames={179}>
            <Audio src={staticFile('voiceover/05-busca.mp3')} volume={1} />
          </Sequence>

          {/* 06-offline.mp3 (7.08s / 212 frames) */}
          <Sequence from={895} durationInFrames={212}>
            <Audio src={staticFile('voiceover/06-offline.mp3')} volume={1} />
          </Sequence>

          {/* 07-leitura.mp3 (6.43s / 193 frames) */}
          <Sequence from={1135} durationInFrames={193}>
            <Audio src={staticFile('voiceover/07-leitura.mp3')} volume={1} />
          </Sequence>

          {/* 99-cta.mp3 (5.15s / 154 frames) */}
          <Sequence from={1355} durationInFrames={154}>
            <Audio src={staticFile('voiceover/99-cta.mp3')} volume={1} />
          </Sequence>
        </>
      )}

      {/* Visual Scenes */}
      {/* Scene 1: Gancho (0 - 105 frames) */}
      <Sequence from={0} durationInFrames={105}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: Problema (105 - 370 frames) */}
      <Sequence from={105} durationInFrames={265}>
        <Scene2Problem />
      </Sequence>

      {/* Scene 3: Virada (370 - 530 frames) */}
      <Sequence from={370} durationInFrames={160}>
        <Scene3Turn />
      </Sequence>

      {/* Scene 4: Teclado (530 - 680 frames) */}
      <Sequence from={530} durationInFrames={150}>
        <Scene4Keypad />
      </Sequence>

      {/* Scene 5: Busca (680 - 885 frames) */}
      <Sequence from={680} durationInFrames={205}>
        <Scene5Search />
      </Sequence>

      {/* Scene 6: Partituras & Offline (885 - 1125 frames) */}
      <Sequence from={885} durationInFrames={240}>
        <Scene6SheetMusic />
      </Sequence>

      {/* Scene 7: Swipe & Leitura (1125 - 1345 frames) */}
      <Sequence from={1125} durationInFrames={220}>
        <Scene7SwipeRead />
      </Sequence>

      {/* Scene 8: CTA Final (1345 - 1550 frames) */}
      <Sequence from={1345} durationInFrames={205}>
        <Scene8CTA />
      </Sequence>
    </AbsoluteFill>
  );
}
