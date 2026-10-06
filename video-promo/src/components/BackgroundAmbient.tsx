import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';

export function BackgroundAmbient({ isProblem = false }: { isProblem?: boolean }) {
  const frame = useCurrentFrame();

  const glow1X = interpolate(frame, [0, 960], [-50, 50], { extrapolateRight: 'clamp' });
  const glow1Y = interpolate(frame, [0, 960], [-30, 30], { extrapolateRight: 'clamp' });
  const glow2X = interpolate(frame, [0, 960], [40, -40], { extrapolateRight: 'clamp' });

  const primaryGlowColor = isProblem ? 'rgba(217, 83, 79, 0.16)' : 'rgba(163, 177, 138, 0.22)';
  const secondaryGlowColor = isProblem ? 'rgba(180, 40, 40, 0.12)' : 'rgba(92, 118, 80, 0.25)';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Glow 1 */}
      <div
        style={{
          position: 'absolute',
          top: -120 + glow1Y,
          right: -120 + glow1X,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: primaryGlowColor,
          filter: 'blur(150px)',
          transition: 'background 0.5s ease',
        }}
      />

      {/* Glow 2 */}
      <div
        style={{
          position: 'absolute',
          bottom: -150 - glow1Y,
          left: -150 + glow2X,
          width: 650,
          height: 650,
          borderRadius: '50%',
          background: secondaryGlowColor,
          filter: 'blur(160px)',
          transition: 'background 0.5s ease',
        }}
      />

      {/* Subtle Grid / Texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, ${THEME.colors.line} 1px, transparent 0)`,
          backgroundSize: '48px 48px',
          opacity: 0.35,
        }}
      />
    </div>
  );
}
