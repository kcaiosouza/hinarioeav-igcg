import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Badge } from '../components/Badge';
import { BackgroundAmbient } from '../components/BackgroundAmbient';
import { THEME } from '../theme';

export function Scene1Hook() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const badgeEnter = spring({ frame, fps, config: { damping: 12, mass: 0.6 } });
  const titleEnter = spring({ frame: frame - 6, fps, config: { damping: 14 } });
  const subEnter = spring({ frame: frame - 16, fps, config: { damping: 14 } });
  const pulseScale = interpolate(Math.sin(frame / 6), [-1, 1], [0.98, 1.02]);

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
        padding: isVertical ? '80px 48px' : '60px 120px',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      <BackgroundAmbient isProblem={true} />

      {/* Main Content */}
      <div style={{ zIndex: 10, maxWidth: 940, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Badge */}
        <div style={{ transform: `scale(${badgeEnter})`, opacity: badgeEnter, marginBottom: 36 }}>
          <Badge text="Momento do Louvor" icon="⏱️" variant="red" />
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: THEME.fonts.serif,
            fontSize: isVertical ? 64 : 68,
            lineHeight: 1.15,
            fontWeight: 700,
            color: '#FFFFFF',
            margin: 0,
            marginBottom: 28,
            transform: `translateY(${interpolate(titleEnter, [0, 1], [30, 0])}px) scale(${titleEnter})`,
            opacity: titleEnter,
            textShadow: '0 8px 32px rgba(0,0,0,0.7)',
          }}
        >
          Perdendo tempo para achar o hino na reunião?
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: isVertical ? 28 : 30,
            lineHeight: 1.4,
            fontWeight: 500,
            color: THEME.colors.muted,
            margin: 0,
            transform: `translateY(${interpolate(subEnter, [0, 1], [20, 0])}px)`,
            opacity: subEnter,
            maxWidth: 720,
          }}
        >
          A igreja já começou a cantar e você ainda está procurando o número?
        </p>

        {/* Animated Visual Cue */}
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '16px 28px',
            borderRadius: 24,
            backgroundColor: 'rgba(229, 115, 115, 0.12)',
            border: '1px solid rgba(229, 115, 115, 0.3)',
            transform: `scale(${pulseScale})`,
          }}
        >
          <span style={{ fontSize: 32 }}>⏳</span>
          <span style={{ fontFamily: THEME.fonts.sans, fontSize: 20, fontWeight: 600, color: '#FFA8A8' }}>
            Cada segundo perdido desconecta sua atenção
          </span>
        </div>
      </div>
    </div>
  );
}
