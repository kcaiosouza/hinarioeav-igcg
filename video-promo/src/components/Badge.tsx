import React from 'react';
import { THEME } from '../theme';

export function Badge({
  text,
  icon,
  variant = 'gold',
}: {
  text: string;
  icon?: string;
  variant?: 'gold' | 'red' | 'dark';
}) {
  const isRed = variant === 'red';
  const isDark = variant === 'dark';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 22px',
        borderRadius: 9999,
        backgroundColor: isRed
          ? 'rgba(229, 115, 115, 0.16)'
          : isDark
            ? 'rgba(38, 58, 48, 0.7)'
            : 'rgba(52, 78, 65, 0.85)',
        border: `1.5px solid ${isRed ? 'rgba(229, 115, 115, 0.4)' : THEME.colors.goldSoft}`,
        color: isRed ? '#FFA8A8' : THEME.colors.cream,
        fontFamily: THEME.fonts.sans,
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
      }}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </div>
  );
}
