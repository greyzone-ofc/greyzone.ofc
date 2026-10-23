import { ImageResponse } from 'next/og';

export const alt = 'GREYZONE – Websites, software, AI and automation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0A0A0A',
          color: '#FFFFFF',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              background: '#D1162C',
              borderRadius: 2,
            }}
          />
          GREYZONE
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: 900,
            }}
          >
            Websites, software, AI and automation.
          </div>
          <div style={{ fontSize: 28, color: '#868A90', maxWidth: 780 }}>
            Technology and design studio in Ahmedabad — working across India and
            internationally.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
