import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';
import { BackgroundAmbient } from '../components/BackgroundAmbient';
import { PhoneMockup } from '../components/PhoneMockup';
import { ScreenHymnDetail, ScreenKeypad } from '../components/Screenshots';
import { THEME } from '../theme';

export function Scene4Keypad() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const phoneEnter = spring({ frame, fps, config: { damping: 12, mass: 0.7 } });
  const textEnter = spring({ frame: frame - 4, fps, config: { damping: 14 } });

  // Simulate typing numbers across 150 frames
  let typedNumber = '';
  if (frame >= 30 && frame < 55) {
    typedNumber = '4';
  } else if (frame >= 55 && frame < 80) {
    typedNumber = '42';
  } else if (frame >= 80) {
    typedNumber = '420';
  }

  // Switch to hymn screen after clicking search around frame 105
  const isHymnOpen = frame >= 110;
  const screenFade = spring({ frame: frame - 110, fps, config: { damping: 14 } });

  // Cursor touch simulation position
  const showTouch4 = frame >= 26 && frame <= 36;
  const showTouch2 = frame >= 51 && frame <= 61;
  const showTouch0 = frame >= 76 && frame <= 86;
  const showTouchSearch = frame >= 102 && frame <= 114;

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
          <Badge text="Agilidade Total" icon="⚡" variant="gold" />
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
          Digite o número e abra em 2 segundos.
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
          Teclado numérico dedicado com troca instantânea entre Hinos, Cânticos e Hinário Novo.
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
          <span>⏱️ Tempo médio de abertura: &lt; 2s</span>
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
          {!isHymnOpen ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <ScreenKeypad typed={typedNumber} activeBook="Hinário Novo" />

              {/* Simulated Touch ripples */}
              {showTouch4 && (
                <div style={{
                  position: 'absolute',
                  top: '56%',
                  left: '20%',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.55)',
                  transform: 'scale(1.4)',
                  pointerEvents: 'none',
                }} />
              )}
              {showTouch2 && (
                <div style={{
                  position: 'absolute',
                  top: '46%',
                  left: '50%',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.55)',
                  transform: 'scale(1.4)',
                  pointerEvents: 'none',
                }} />
              )}
              {showTouch0 && (
                <div style={{
                  position: 'absolute',
                  top: '76%',
                  left: '50%',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.55)',
                  transform: 'scale(1.4)',
                  pointerEvents: 'none',
                }} />
              )}
              {showTouchSearch && (
                <div style={{
                  position: 'absolute',
                  bottom: '5%',
                  left: '50%',
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                  transform: 'scale(1.5)',
                  pointerEvents: 'none',
                }} />
              )}
            </div>
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              transform: `scale(${interpolate(screenFade, [0, 1], [0.95, 1])})`,
              opacity: screenFade,
            }}>
              <ScreenHymnDetail number="420" title="Mais de Cristo" />
            </div>
          )}
        </PhoneMockup>
      </div>
    </div>
  );
}
