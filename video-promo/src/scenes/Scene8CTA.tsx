import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundAmbient } from '../components/BackgroundAmbient';
import { Badge } from '../components/Badge';
import { DownloadButtons } from '../components/DownloadButtons';
import { THEME } from '../theme';

export function Scene8CTA() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const logoEnter = spring({ frame, fps, config: { damping: 10, mass: 0.8 } });
  const titleEnter = spring({ frame: frame - 6, fps, config: { damping: 14 } });
  const buttonsEnter = spring({ frame: frame - 14, fps, config: { damping: 12 } });
  const pulseButton = interpolate(Math.sin(frame / 6), [-1, 1], [0.98, 1.03]);

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

      {/* Main Container */}
      <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 920 }}>
        {/* Badge */}
        <div style={{ transform: `scale(${logoEnter})`, marginBottom: 28 }}>
          <Badge text="Pronto para usar" icon="✨" variant="gold" />
        </div>

        {/* Icon with glow */}
        <div style={{ position: 'relative', marginBottom: 28, transform: `scale(${logoEnter})` }}>
          <div
            style={{
              position: 'absolute',
              inset: -16,
              borderRadius: 44,
              backgroundColor: THEME.colors.goldSoft,
              filter: 'blur(32px)',
              opacity: 0.45,
            }}
          />
          <div
            style={{
              position: 'relative',
              width: isVertical ? 140 : 130,
              height: isVertical ? 140 : 130,
              borderRadius: 34,
              overflow: 'hidden',
              border: `2px solid ${THEME.colors.goldSoft}`,
              boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
            }}
          >
            <Img
              src={staticFile('icon.png')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: THEME.fonts.serif,
            fontSize: isVertical ? 64 : 68,
            lineHeight: 1.1,
            fontWeight: 700,
            color: '#FFFFFF',
            margin: 0,
            marginBottom: 14,
            transform: `translateY(${interpolate(titleEnter, [0, 1], [20, 0])}px)`,
            opacity: titleEnter,
          }}
        >
          Baixe o Hinário EAV
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: isVertical ? 26 : 28,
            fontWeight: 500,
            color: THEME.colors.goldSoft,
            margin: 0,
            marginBottom: 36,
            transform: `translateY(${interpolate(titleEnter, [0, 1], [15, 0])}px)`,
            opacity: titleEnter,
          }}
        >
          Todo o repertório de louvor reunido no seu bolso.
        </p>

        {/* Action Button */}
        <div
          style={{
            transform: `scale(${buttonsEnter * pulseButton})`,
            opacity: buttonsEnter,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              padding: '18px 44px',
              borderRadius: 9999,
              backgroundColor: THEME.colors.goldSoft,
              color: THEME.colors.ink,
              fontFamily: THEME.fonts.sans,
              fontSize: isVertical ? 22 : 24,
              fontWeight: 700,
              letterSpacing: 0.5,
              boxShadow: '0 8px 32px rgba(163, 177, 138, 0.45)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span>⬇️</span>
            <span>Instalar Gratuitamente</span>
          </div>
        </div>

        {/* Store Badges */}
        <div style={{ transform: `scale(${buttonsEnter})`, opacity: buttonsEnter }}>
          <DownloadButtons scale={isVertical ? 1 : 1.05} />
        </div>
      </div>
    </div>
  );
}
