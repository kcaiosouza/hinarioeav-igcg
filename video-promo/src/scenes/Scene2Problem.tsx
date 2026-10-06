import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';
import { BackgroundAmbient } from '../components/BackgroundAmbient';
import { PhoneMockup } from '../components/PhoneMockup';
import { THEME } from '../theme';

export function Scene2Problem() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const contentEnter = spring({ frame, fps, config: { damping: 14 } });
  const phoneShake = Math.sin(frame * 0.8) * interpolate(frame, [0, 40, 160], [0, 6, 2], { extrapolateRight: 'clamp' });
  const pulseRed = interpolate(Math.sin(frame / 5), [-1, 1], [0.85, 1.05]);

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
        padding: isVertical ? '80px 48px' : '40px 100px',
        boxSizing: 'border-box',
        gap: isVertical ? 40 : 80,
      }}
    >
      <BackgroundAmbient isProblem={true} />

      {/* Text Area */}
      <div
        style={{
          zIndex: 10,
          maxWidth: isVertical ? 860 : 680,
          textAlign: isVertical ? 'center' : 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isVertical ? 'center' : 'flex-start',
        }}
      >
        <div style={{ transform: `scale(${contentEnter})`, marginBottom: 24 }}>
          <Badge text="A Dor Real" icon="🚫" variant="red" />
        </div>

        <h2
          style={{
            fontFamily: THEME.fonts.serif,
            fontSize: isVertical ? 56 : 62,
            lineHeight: 1.15,
            fontWeight: 700,
            color: '#FFFFFF',
            margin: 0,
            marginBottom: 20,
          }}
        >
          Índice de papel? Sem sinal de internet?
        </h2>

        <p
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: isVertical ? 26 : 28,
            lineHeight: 1.45,
            color: THEME.colors.muted,
            margin: 0,
            marginBottom: 24,
          }}
        >
          Folhear índices de papel ou ficar sem internet atrapalha o louvor da igreja.
        </p>

        {/* Pain points pills */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: isVertical ? 'center' : 'flex-start' }}>
          <div style={{
            padding: '12px 20px',
            borderRadius: 14,
            backgroundColor: 'rgba(217, 83, 79, 0.18)',
            border: '1px solid rgba(217, 83, 79, 0.4)',
            color: '#FFA8A8',
            fontSize: 17,
            fontWeight: 600,
          }}>
            ❌ Livros físicos e busca lenta
          </div>
          <div style={{
            padding: '12px 20px',
            borderRadius: 14,
            backgroundColor: 'rgba(217, 83, 79, 0.18)',
            border: '1px solid rgba(217, 83, 79, 0.4)',
            color: '#FFA8A8',
            fontSize: 17,
            fontWeight: 600,
          }}>
            ❌ Queda de conexão na reunião
          </div>
        </div>
      </div>

      {/* Visual Representation in Phone */}
      <div style={{ zIndex: 10, transform: `translateX(${phoneShake}px)` }}>
        <PhoneMockup
          width={isVertical ? 380 : 360}
          height={isVertical ? 720 : 680}
          scale={isVertical ? 0.95 : 0.9}
          rotationY={isVertical ? 0 : -8}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#151515',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 32,
              boxSizing: 'border-box',
              textAlign: 'center',
            }}
          >
            {/* Warning icon */}
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: '50%',
                backgroundColor: 'rgba(229, 115, 115, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                border: '2px solid rgba(229, 115, 115, 0.5)',
                transform: `scale(${pulseRed})`,
              }}
            >
              <span style={{ fontSize: 44 }}>📡</span>
            </div>
            <div style={{ fontFamily: THEME.fonts.serif, fontSize: 26, fontWeight: 700, color: '#FFFFFF', marginBottom: 10 }}>
              Sem Conexão
            </div>
            <div style={{ fontFamily: THEME.fonts.sans, fontSize: 15, color: '#888', lineHeight: 1.5 }}>
              Não foi possível carregar o hino.<br />Sua conexão móvel oscilou.
            </div>
          </div>
        </PhoneMockup>
      </div>
    </div>
  );
}
