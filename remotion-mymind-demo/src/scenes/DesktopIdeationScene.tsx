import {Img, interpolate, staticFile} from 'remotion';

const items = [
  {src: 'boiler.jpg', color: '#7b2d1a'},
  {src: 'concert.jpg', color: '#762b14'},
  {src: 'mykonos.jpg', color: '#805a48'},
  {src: 'crosswalk.jpg', color: '#a67e31'},
  {src: 'impala.jpg', color: '#232812'},
  {src: 'iceland.jpg', color: '#6f8e9a'},
];

const loose = [[120,190,440,270,-4],[740,150,420,300,2],[1350,190,430,270,3],[170,535,420,270,2],[750,500,430,270,-3],[1360,520,400,270,3]];
const colour = [[120,190,480,250,0],[720,190,480,250,0],[1320,190,480,250,0],[120,520,480,250,0],[720,520,480,250,0],[1320,520,480,250,0]];
const masonryLayout = [[120,170,480,250,0],[720,170,480,350,0],[1320,170,480,280,0],[120,450,480,330,0],[720,550,480,230,0],[1320,480,480,300,0]];

const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const phase = (frame: number, start: number, end: number) => interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const DesktopIdeationScene: React.FC<{localFrame: number; opacity: number}> = ({localFrame, opacity}) => {
  const sort = phase(localFrame, 30, 50);
  const masonry = phase(localFrame, 78, 100);
  const draw = phase(localFrame, 125, 152);
  const settlingOpacity = Math.min(
    interpolate(localFrame, [26, 32, 48, 56], [1, .55, .55, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    interpolate(localFrame, [74, 80, 98, 106], [1, .55, .55, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  );
  const active = localFrame >= 125 ? 'Draw' : localFrame >= 78 ? 'Masonry' : localFrame >= 30 ? 'Sort by colour' : '';

  return (
    <div style={{position: 'absolute', inset: 0, opacity, translate: `0 ${(1 - opacity) * 14}px`}}>
      <div style={{position: 'absolute', left: 70, right: 70, top: 42, height: 88, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px 0 28px', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,.92)', borderRadius: 22, background: 'rgba(255,255,255,.92)', boxShadow: '0 14px 38px rgba(83,103,239,.14)'}}>
        <div style={{display: 'flex', gap: 12, alignItems: 'center', fontSize: 23, fontWeight: 700}}><span style={{width: 12, height: 12, borderRadius: 12, background: '#5367ef', boxShadow: '0 0 0 7px rgba(83,103,239,.1)'}} />Visual ideation</div>
        <div style={{display: 'flex', gap: 10}}>{['Sort by colour','Masonry','Draw'].map((label) => <div key={label} style={{padding: '14px 18px', borderRadius: 12, border: `1px solid ${active === label ? '#cfd5ff' : '#e4e7f3'}`, background: active === label ? '#eef0ff' : '#fff', color: active === label ? '#4659d5' : '#737b8a', fontSize: 16, fontWeight: 700}}>{label}</div>)}</div>
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: settlingOpacity}}>
        {items.map((item, index) => {
          const first = loose[index];
          const second = colour[index];
          const third = masonryLayout[index];
          const intermediate = first.map((value, i) => mix(value, second[i], sort));
          const value = intermediate.map((v, i) => mix(v, third[i], masonry));
          return <div key={item.src} style={{position: 'absolute', left: value[0], top: value[1], width: value[2], height: value[3], overflow: 'hidden', border: '5px solid white', borderRadius: 20, boxShadow: '0 20px 42px rgba(43,51,92,.2)', rotate: `${value[4]}deg`, boxSizing: 'border-box', background: item.color}}>
            <Img src={staticFile(`images/${item.src}`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            {sort > .65 ? <span style={{position: 'absolute', right: 12, bottom: 12, width: 18, height: 18, border: '3px solid white', borderRadius: 20, background: item.color, boxShadow: '0 2px 8px rgba(0,0,0,.24)'}} /> : null}
          </div>;
        })}
        <svg viewBox="0 0 1920 930" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', opacity: draw}}>
          <path pathLength={1} d="M1325 425 C1420 375 1645 382 1725 480 C1790 560 1718 660 1548 650 C1390 640 1280 560 1295 478 C1300 452 1310 435 1325 425Z" fill="none" stroke="#ff5c23" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={1} strokeDashoffset={1 - draw} />
        </svg>
        {draw > 0 ? <span style={{position: 'absolute', left: mix(1690, 1300, draw), top: mix(500, 445, draw), display: 'grid', placeItems: 'center', width: 48, height: 48, border: '4px solid white', borderRadius: 30, background: '#ff5c23', color: 'white', boxShadow: '0 10px 24px rgba(255,92,35,.3)', fontSize: 22, opacity: draw}}>✎</span> : null}
      </div>
    </div>
  );
};
