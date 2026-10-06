import React from 'react';
import { THEME } from '../theme';

export function ScreenKeypad({ typed = '420', activeBook = 'Hinário Novo' }: { typed?: string; activeBook?: string }) {
  const books = ['Hinos', 'Cânticos', 'Supl.', 'Hinário Novo'];
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: THEME.colors.bgPage,
      color: THEME.colors.cream,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 20px',
      boxSizing: 'border-box',
      fontFamily: THEME.fonts.sans,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            backgroundColor: THEME.colors.surface,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${THEME.colors.line}`,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={THEME.colors.cream} strokeWidth="2.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>
          <span style={{ fontFamily: THEME.fonts.serif, fontSize: 18, fontWeight: 700, color: THEME.colors.cream }}>
            Hinário EAV
          </span>
        </div>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          backgroundColor: THEME.colors.surface,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${THEME.colors.line}`,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={THEME.colors.goldSoft} stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
      </div>

      {/* Book Tabs */}
      <div style={{
        display: 'flex',
        backgroundColor: THEME.colors.surface,
        borderRadius: 14,
        padding: 4,
        gap: 4,
        marginBottom: 20,
        border: `1px solid ${THEME.colors.line}`,
      }}>
        {books.map((b) => {
          const isActive = b === activeBook;
          return (
            <div
              key={b}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '8px 2px',
                borderRadius: 10,
                fontSize: 11,
                fontWeight: isActive ? 700 : 500,
                backgroundColor: isActive ? THEME.colors.surfaceRaised : 'transparent',
                color: isActive ? THEME.colors.cream : THEME.colors.mutedDim,
                transition: 'all 0.2s',
              }}
            >
              {b}
            </div>
          );
        })}
      </div>

      {/* Number Display */}
      <div style={{
        flex: 1,
        minHeight: 90,
        backgroundColor: 'rgba(52, 78, 65, 0.25)',
        borderRadius: 18,
        border: `1px solid ${THEME.colors.line}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: THEME.colors.goldSoft, marginBottom: 4 }}>
          {activeBook}
        </div>
        <div style={{ fontFamily: THEME.fonts.serif, fontSize: 56, fontWeight: 700, color: THEME.colors.white, letterSpacing: 2 }}>
          {typed || '—'}
        </div>
      </div>

      {/* Keypad Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10,
        marginBottom: 16,
      }}>
        {keys.map((k, idx) => (
          <div
            key={idx}
            style={{
              height: 56,
              borderRadius: 14,
              backgroundColor: k ? THEME.colors.surface : 'transparent',
              border: k ? `1px solid ${THEME.colors.line}` : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 600,
              color: THEME.colors.cream,
              boxShadow: k ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
            }}
          >
            {k}
          </div>
        ))}
      </div>

      {/* Big Action CTA */}
      <div style={{
        backgroundColor: THEME.colors.goldSoft,
        color: THEME.colors.ink,
        padding: '14px',
        borderRadius: 14,
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 16,
        letterSpacing: 0.5,
        boxShadow: '0 4px 16px rgba(163, 177, 138, 0.3)',
      }}>
        Buscar Hino
      </div>
    </div>
  );
}

export function ScreenHymnDetail({
  number = '420',
  title = 'Mais de Cristo',
  fontSizeMultiplier = 1,
}: {
  number?: string;
  title?: string;
  fontSizeMultiplier?: number;
}) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: THEME.colors.bgPage,
      color: THEME.colors.cream,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 20px',
      boxSizing: 'border-box',
      fontFamily: THEME.fonts.sans,
      position: 'relative',
    }}>
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: THEME.colors.surface,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            ←
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: THEME.colors.goldSoft }}>Hino nº {number}</div>
            <div style={{ fontSize: 11, color: THEME.colors.mutedDim }}>Hinário Novo</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{
            padding: '6px 10px',
            borderRadius: 8,
            backgroundColor: THEME.colors.surface,
            border: `1px solid ${THEME.colors.line}`,
            fontSize: 11,
            fontWeight: 700,
            color: THEME.colors.goldSoft,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            🎼 Partitura
          </div>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: THEME.colors.surface,
            border: `1px solid ${THEME.colors.line}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFD700',
          }}>
            ★
          </div>
        </div>
      </div>

      {/* Title */}
      <div style={{
        borderBottom: `1px solid ${THEME.colors.line}`,
        paddingBottom: 16,
        marginBottom: 18,
      }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, color: THEME.colors.muted, marginBottom: 4 }}>
          A Consagração e Comunhão
        </div>
        <h1 style={{
          fontFamily: THEME.fonts.serif,
          fontSize: 28 * fontSizeMultiplier,
          fontWeight: 700,
          color: THEME.colors.white,
          margin: 0,
          lineHeight: 1.2,
        }}>
          {title}
        </h1>
      </div>

      {/* Lyrics body */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1, overflow: 'hidden' }}>
        <div style={{
          fontSize: 16 * fontSizeMultiplier,
          lineHeight: 1.6,
          color: THEME.colors.cream,
        }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: THEME.colors.goldSoft, marginBottom: 4 }}>Estrofe 1</div>
          Mais de Cristo eu quero ter,<br />
          Mais de Seu amor saber,<br />
          Mais da Sua salvação,<br />
          Mais da Sua mansidão.
        </div>

        {/* Chorus Box */}
        <div style={{
          backgroundColor: 'rgba(52, 78, 65, 0.4)',
          borderLeft: `4px solid ${THEME.colors.goldSoft}`,
          borderRadius: '0 12px 12px 0',
          padding: '14px 16px',
          fontSize: 16 * fontSizeMultiplier,
          lineHeight: 1.6,
          color: THEME.colors.white,
          fontStyle: 'italic',
        }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: THEME.colors.goldSoft, marginBottom: 4, fontStyle: 'normal' }}>
            Coro
          </div>
          Mais, mais de Cristo!<br />
          Mais, mais de Cristo!<br />
          Mais de Sua salvação,<br />
          Mais da Sua mansidão.
        </div>
      </div>

      {/* Bottom swipe hint */}
      <div style={{
        textAlign: 'center',
        fontSize: 11,
        color: THEME.colors.mutedDim,
        paddingTop: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}>
        <span>‹ Deslize para navegar ›</span>
      </div>
    </div>
  );
}

export function ScreenSearch() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: THEME.colors.bgPage,
      color: THEME.colors.cream,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 20px',
      boxSizing: 'border-box',
      fontFamily: THEME.fonts.sans,
    }}>
      {/* Search Input bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: THEME.colors.surface,
        borderRadius: 14,
        padding: '12px 16px',
        border: `1px solid ${THEME.colors.line}`,
        gap: 10,
        marginBottom: 18,
      }}>
        <span style={{ fontSize: 16 }}>🔍</span>
        <div style={{ flex: 1, fontSize: 15, color: THEME.colors.white, fontWeight: 600 }}>
          Mais de Seu amor
        </div>
        <span style={{ fontSize: 12, color: THEME.colors.mutedDim, background: THEME.colors.surfaceRaised, borderRadius: 10, padding: '2px 8px' }}>
          Limpar
        </span>
      </div>

      {/* Results header */}
      <div style={{ fontSize: 12, color: THEME.colors.muted, marginBottom: 12, fontWeight: 600 }}>
        3 HINOS ENCONTRADOS
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{
          backgroundColor: THEME.colors.surfaceRaised,
          borderRadius: 14,
          padding: '14px 16px',
          border: `1px solid ${THEME.colors.goldSoft}`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: THEME.colors.goldSoft, textTransform: 'uppercase' }}>
              Hinário Novo · nº 420
            </span>
            <span style={{ fontSize: 11, color: THEME.colors.mutedDim }}>Correspondência exata</span>
          </div>
          <div style={{ fontFamily: THEME.fonts.serif, fontSize: 18, fontWeight: 700, color: THEME.colors.white, marginBottom: 6 }}>
            Mais de Cristo
          </div>
          <div style={{ fontSize: 13, color: THEME.colors.cream, lineHeight: 1.4 }}>
            "...Mais de Cristo eu quero ter, <strong style={{ color: '#FFD700', backgroundColor: 'rgba(255,215,0,0.15)', padding: '1px 4px', borderRadius: 4 }}>Mais de Seu amor</strong> saber..."
          </div>
        </div>

        <div style={{
          backgroundColor: THEME.colors.surface,
          borderRadius: 14,
          padding: '14px 16px',
          border: `1px solid ${THEME.colors.line}`,
          opacity: 0.85,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: THEME.colors.goldSoft, marginBottom: 4 }}>
            Hinos · nº 184
          </div>
          <div style={{ fontFamily: THEME.fonts.serif, fontSize: 17, fontWeight: 600, color: THEME.colors.white }}>
            Cristo É Tudo Para Mim
          </div>
          <div style={{ fontSize: 12, color: THEME.colors.mutedDim, marginTop: 4 }}>
            "Todo o amor de Deus em Cristo revelado..."
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScreenSheetMusic() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#fbfbf9',
      color: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      boxSizing: 'border-box',
      fontFamily: THEME.fonts.sans,
      position: 'relative',
    }}>
      {/* Dark overlay header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        backgroundColor: THEME.colors.bgPage,
        borderRadius: 12,
        color: THEME.colors.cream,
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: THEME.colors.goldSoft }}>
          Partitura · nº 420 (Pág. 1/2)
        </div>
        <div style={{
          backgroundColor: THEME.colors.gold,
          color: THEME.colors.cream,
          padding: '2px 8px',
          borderRadius: 6,
          fontSize: 10,
          fontWeight: 700,
        }}>
          100% OFFLINE
        </div>
      </div>

      {/* Musical Sheet Graphic */}
      <div style={{
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        border: '1px solid #e0dfd5',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        <div style={{ textAlign: 'center', borderBottom: '1px solid #eee', paddingBottom: 8 }}>
          <div style={{ fontFamily: THEME.fonts.serif, fontSize: 18, fontWeight: 700 }}>420. Mais de Cristo</div>
          <div style={{ fontSize: 10, color: '#666' }}>E. E. Hewitt · J. R. Sweney</div>
        </div>

        {/* Music Staves */}
        {[1, 2, 3].map((staff) => (
          <div key={staff} style={{ position: 'relative', height: 48, borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
            <div style={{ position: 'absolute', top: 12, width: '100%', height: 1, backgroundColor: '#222' }} />
            <div style={{ position: 'absolute', top: 24, width: '100%', height: 1, backgroundColor: '#222' }} />
            <div style={{ position: 'absolute', top: 36, width: '100%', height: 1, backgroundColor: '#222' }} />
            {/* Notes representation */}
            <div style={{ position: 'absolute', left: 10, top: 2, fontSize: 32 }}>𝄞</div>
            <div style={{ position: 'absolute', left: 45, top: 12, fontSize: 12, fontWeight: 700 }}>4/4</div>
            <div style={{ position: 'absolute', left: 80, top: 20, width: 10, height: 8, borderRadius: '50%', backgroundColor: '#222' }} />
            <div style={{ position: 'absolute', left: 88, top: 0, width: 2, height: 24, backgroundColor: '#222' }} />
            <div style={{ position: 'absolute', left: 140, top: 14, width: 10, height: 8, borderRadius: '50%', backgroundColor: '#222' }} />
            <div style={{ position: 'absolute', left: 148, top: -4, width: 2, height: 24, backgroundColor: '#222' }} />
            <div style={{ position: 'absolute', left: 200, top: 8, width: 10, height: 8, borderRadius: '50%', backgroundColor: '#222' }} />
            <div style={{ position: 'absolute', left: 208, top: -10, width: 2, height: 24, backgroundColor: '#222' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
