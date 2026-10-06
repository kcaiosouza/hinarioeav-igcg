import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';
import { BackgroundAmbient } from '../components/BackgroundAmbient';
import { PhoneMockup } from '../components/PhoneMockup';
import { ScreenHymnDetail } from '../components/Screenshots';
import { THEME } from '../theme';

export function Scene7SwipeRead() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const phoneEnter = spring({ frame, fps, config: { damping: 12, mass: 0.7 } });
  const textEnter = spring({ frame: frame - 4, fps, config: { damping: 14 } });

  // Swipe animation between frame 70 and 105
  const swipeOffset = interpolate(frame, [70, 105], [0, -380], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Font size adjustment animation between frame 130 and 175
  const fontMultiplier = interpolate(frame, [130, 175], [1.0, 1.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
          <Badge text="Experiência e Leitura" icon="👆" variant="gold" />
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
          Deslize com facilidade e ajuste o tamanho do texto.
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
          Navegação fluida por gestos de swipe e ajuste de leitura para cantar com conforto em qualquer momento.
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 20px',
          borderRadius: 12,
          backgroundColor: 'rgba(92, 118, 80, 0.3)',
          border: `1px solid ${THEME.colors.goldSoft}`,
          color: THEME.colors.cream,
          fontSize: 17,
          fontWeight: 600,
        }}>
          <span>📖 Modo de leitura confortável para os olhos</span>
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
          rotationY={isVertical ? 0 : -6}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            {/* Screen 1 being swiped out */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translateX(${swipeOffset}px)`,
              }}
            >
              <ScreenHymnDetail number="420" title="Mais de Cristo" fontSizeMultiplier={fontMultiplier} />
            </div>

            {/* Screen 2 entering from right */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translateX(${swipeOffset + 380}px)`,
              }}
            >
              <ScreenHymnDetail number="421" title="Em Fervente Oração" fontSizeMultiplier={fontMultiplier} />
            </div>
          </div>
        </PhoneMockup>
      </div>
    </div>
  );
}
