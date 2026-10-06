import React from 'react';

export interface PhoneMockupProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  scale?: number;
  rotationY?: number;
  rotationX?: number;
  translateY?: number;
  translateX?: number;
  shadowOpacity?: number;
}

export function PhoneMockup({
  children,
  width = 420,
  height = 860,
  scale = 1,
  rotationY = 0,
  rotationX = 0,
  translateY = 0,
  translateX = 0,
  shadowOpacity = 0.5,
}: PhoneMockupProps) {
  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        transform: `perspective(1200px) translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`,
        transformOrigin: 'center center',
        boxSizing: 'border-box',
        filter: `drop-shadow(0 ${28 * scale}px ${48 * scale}px rgba(0, 0, 0, ${shadowOpacity}))`,
      }}
    >
      {/* Outer Metallic Frame */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 48,
          padding: 12,
          backgroundColor: '#1b221d',
          boxSizing: 'border-box',
          border: '2px solid rgba(218, 215, 205, 0.22)',
          boxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.2), 0 0 20px rgba(0, 0, 0, 0.8)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Inner Bezel and Screen */}
        <div
          style={{
            flex: 1,
            borderRadius: 38,
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: '#0e1712',
          }}
        >
          {/* Dynamic Island Notch */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 108,
              height: 26,
              backgroundColor: '#000000',
              borderRadius: 20,
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 8,
              boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {/* Front Camera Lens Dot */}
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                backgroundColor: '#111b22',
                border: '1px solid #1f2c34',
              }}
            />
          </div>

          {/* Actual Screen Content */}
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {children}
          </div>

          {/* Glass Reflection Highlight overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 60%)',
              zIndex: 998,
            }}
          />
        </div>
      </div>
    </div>
  );
}
