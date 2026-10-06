import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';
import { BackgroundAmbient } from '../components/BackgroundAmbient';
import { THEME } from '../theme';

export function Scene3Turn() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const logoScale = spring({ frame, fps, config: { damping: 10, mass: 0.8 } });
  const textEnter = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const glowPulse = interpolate(Math.sin(frame / 6), [-1, 1], [0.85, 1.15]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: THEME.colors.bgPage,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isVertical ? '80px 48px' : '40px 100px',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      <BackgroundAmbient isProblem={false} />

      {/* Hero Badge */}
      <div style={{ zIndex: 10, transform: `scale(${logoScale})`, marginBottom: 32 }}>
        <Badge text="A Solução Definitiva" icon="✨" variant="gold" />
      </div>

      {/* App Logo with Radiant Glow */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          marginBottom: 36,
          transform: `scale(${logoScale})`,
        }}
      >
        {/* Glow halo */}
        <div
          style={{
            position: 'absolute',
            inset: -24,
            borderRadius: 52,
            backgroundColor: THEME.colors.goldSoft,
            filter: 'blur(40px)',
            opacity: 0.55 * glowPulse,
          }}
        />

        {/* Icon container */}
        <div
          style={{
            position: 'relative',
            width: isVertical ? 160 : 150,
            height: isVertical ? 160 : 150,
            borderRadius: 38,
            overflow: 'hidden',
            border: `2px solid ${THEME.colors.goldSoft}`,
            boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
          }}
        >
          <Img
            src={staticFile('icon.png')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Main Brand Title */}
      <h1
        style={{
          zIndex: 10,
          fontFamily: THEME.fonts.serif,
          fontSize: isVertical ? 74 : 78,
          lineHeight: 1.1,
          fontWeight: 700,
          color: '#FFFFFF',
          margin: 0,
          marginBottom: 16,
          transform: `translateY(${interpolate(textEnter, [0, 1], [30, 0])}px)`,
          opacity: textEnter,
        }}
      >
        Hinário EAV
      </h1>

      {/* Tagline */}
      <p
        style={{
          zIndex: 10,
          fontFamily: THEME.fonts.sans,
          fontSize: isVertical ? 32 : 34,
          fontWeight: 600,
          color: THEME.colors.goldSoft,
          margin: 0,
          maxWidth: 820,
          transform: `translateY(${interpolate(textEnter, [0, 1], [20, 0])}px)`,
          opacity: textEnter,
        }}
      >
        Rápido, bonito e sempre à mão.
      </p>
    </div>
  );
}
