import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';
import { BackgroundAmbient } from '../components/BackgroundAmbient';
import { PhoneMockup } from '../components/PhoneMockup';
import { ScreenSheetMusic } from '../components/Screenshots';
import { THEME } from '../theme';

export function Scene6SheetMusic() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const phoneEnter = spring({ frame, fps, config: { damping: 12, mass: 0.7 } });
  const textEnter = spring({ frame: frame - 4, fps, config: { damping: 14 } });
  const zoomSheet = interpolate(frame, [0, 240], [1, 1.07], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: THEME.colors.bgPage,
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isVertical ? '70px 48px' : '40px 100px',
        boxSizing: 'border-box',
        gap: isVertical ? 32 : 80,
      }}
    >
      <BackgroundAmbient isProblem={false} />

      {/* Text Area */}
      <div
        style={{
          zIndex: 10,
          maxWidth: isVertical ? 860 : 660,
          textAlign: isVertical ? 'center' : 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isVertical ? 'center' : 'flex-start',
        }}
      >
        <div style={{ transform: `scale(${textEnter})`, marginBottom: 20 }}>
          <Badge text="Músicos & Regentes" icon="🎼" variant="gold" />
        </div>

        <h2
          style={{
            fontFamily: THEME.fonts.serif,
            fontSize: isVertical ? 56 : 62,
            lineHeight: 1.15,
            fontWeight: 700,
            color: '#FFFFFF',
            margin: 0,
            marginBottom: 16,
          }}
        >
          +1.100 Hinos e Partituras 100% Offline.
        </h2>

        <p
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: isVertical ? 25 : 27,
            lineHeight: 1.45,
            color: THEME.colors.muted,
            margin: 0,
            marginBottom: 20,
          }}
        >
          Acesse partituras completas e todas as letras mesmo em locais sem Wi-Fi ou sinal de celular.
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 22px',
          borderRadius: 14,
          backgroundColor: 'rgba(92, 118, 80, 0.4)',
          border: `1.5px solid ${THEME.colors.goldSoft}`,
          color: '#FFFFFF',
          fontSize: 17,
          fontWeight: 700,
        }}>
          <span>🛡️ Arquitetura Offline-First Garantida</span>
        </div>
      </div>

      {/* Phone Area */}
      <div
        style={{
          zIndex: 10,
          position: 'relative',
          transform: `scale(${interpolate(phoneEnter, [0, 1], [0.85, 1])}) translateY(${interpolate(phoneEnter, [0, 1], [80, 0])}px)`,
          opacity: phoneEnter,
        }}
      >
        <PhoneMockup
          width={isVertical ? 380 : 360}
          height={isVertical ? 720 : 680}
          scale={isVertical ? 0.98 : 0.92}
          rotationY={isVertical ? 0 : 6}
        >
          <div style={{ width: '100%', height: '100%', transform: `scale(${zoomSheet})` }}>
            <ScreenSheetMusic />
          </div>
        </PhoneMockup>
      </div>
    </div>
  );
}
