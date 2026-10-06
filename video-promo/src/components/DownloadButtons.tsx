import React from 'react';
import { THEME } from '../theme';

export function DownloadButtons({ scale = 1 }: { scale?: number }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
    >
      {/* App Store Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 24px',
          borderRadius: 16,
          backgroundColor: '#000000',
          border: '1.5px solid rgba(255, 255, 255, 0.25)',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Apple icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.12-1.95.99-3.09-1 .04-2.14.67-2.82 1.48-.6.69-1.12 1.83-.98 2.94 1.11.08 2.19-.57 2.81-1.33z" />
        </svg>
        <div style={{ textAlign: 'left', fontFamily: THEME.fonts.sans }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, color: '#aaa' }}>Disponível na</div>
          <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.1 }}>App Store</div>
        </div>
      </div>

      {/* Google Play Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 24px',
          borderRadius: 16,
          backgroundColor: '#000000',
          border: '1.5px solid rgba(255, 255, 255, 0.25)',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Play store icon */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M3.609 1.814L13.792 12 3.61 22.186A2.215 2.215 0 013 20.623V3.377c0-.6.225-1.163.609-1.563z" fill="#00E676" />
          <path d="M17.18 8.614l-3.388 3.386 3.388 3.386 3.856-2.196a1.43 1.43 0 000-2.38l-3.856-2.196z" fill="#FFD600" />
          <path d="M3.609 1.814l10.183 10.186 3.388-3.386L5.782.723C4.857.197 3.966.72 3.609 1.814z" fill="#00B0FF" />
          <path d="M3.609 22.186c.357 1.094 1.248 1.617 2.173 1.091l11.398-6.491-3.388-3.386L3.609 22.186z" fill="#FF3D00" />
        </svg>
        <div style={{ textAlign: 'left', fontFamily: THEME.fonts.sans }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, color: '#aaa' }}>Disponível no</div>
          <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.1 }}>Google Play</div>
        </div>
      </div>
    </div>
  );
}
