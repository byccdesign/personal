import {Img, interpolate, staticFile} from 'remotion';

const items = [
  {src: 'boiler.jpg', color: '#7b2d1a'},
  {src: 'concert.jpg', color: '#762b14'},
  {src: 'mykonos.jpg', color: '#805a48'},
  {src: 'crosswalk.jpg', color: '#a67e31'},
  {src: 'impala.jpg', color: '#232812'},
  {src: 'iceland.jpg', color: '#6f8e9a'},
];

const loose = [[34,148,205,180,-4],[257,118,202,210,2],[482,155,204,190,3],[52,387,206,225,2],[278,370,210,188,-3],[492,390,192,218,3]];
const colour = [[34,156,202,180,0],[259,156,202,180,0],[484,156,202,180,0],[34,378,202,180,0],[259,378,202,180,0],[484,378,202,180,0]];
const masonryLayout = [[34,140,202,188,0],[259,140,202,248,0],[484,140,202,212,0],[34,348,202,300,0],[259,408,202,220,0],[484,372,202,256,0]];

const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const phase = (frame: number, start: number, end: number) => interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const IdeationScene: React.FC<{localFrame: number; opacity: number}> = ({localFrame, opacity}) => {
  const sort = phase(localFrame, 30, 50);
  const masonry = phase(localFrame, 78, 100);
  const draw = phase(localFrame, 125, 152);
  const settlingOpacity = Math.min(
    interpolate(localFrame, [26, 32, 48, 56], [1, .58, .58, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    interpolate(localFrame, [74, 80, 98, 106], [1, .58, .58, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  );
  const active = localFrame >= 125 ? 'Draw' : localFrame >= 78 ? 'Masonry' : localFrame >= 30 ? 'Sort by colour' : '';

  return (
    <div style={{position: 'absolute', inset: 0, opacity, transform: `translateY(${(1 - opacity) * 14}px)`}}>
      <div style={{position: 'absolute', left: 28, right: 28, top: 28, height: 82, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 0 20px', boxSizing: 'border-box', border: '1px solid rgba(255,255,255,.9)', borderRadius: 20, background: 'rgba(255,255,255,.9)', boxShadow: '0 12px 34px rgba(83,103,239,.14)'}}>
        <div style={{display: 'flex', gap: 10, alignItems: 'center', fontSize: 18, fontWeight: 760}}><span style={{width: 10, height: 10, borderRadius: 10, background: '#5367ef', boxShadow: '0 0 0 6px rgba(83,103,239,.1)'}} />Visual ideation</div>
        <div style={{display: 'flex', gap: 7}}>{['Sort by colour','Masonry','Draw'].map((label) => <div key={label} style={{padding: '12px 10px', borderRadius: 10, border: `1px solid ${active === label ? '#cfd5ff' : '#e4e7f3'}`, background: active === label ? '#eef0ff' : '#fff', color: active === label ? '#4659d5' : '#737b8a', fontSize: 12, fontWeight: 700}}>{label}</div>)}</div>
      </div>
      <div style={{position: 'absolute', inset: '124px 0 0', opacity: settlingOpacity}}>
        {items.map((item, index) => {
          const first = loose[index];
          const second = colour[index];
          const third = masonryLayout[index];
          const intermediate = first.map((value, i) => mix(value, second[i], sort));
          const value = intermediate.map((v, i) => mix(v, third[i], masonry));
          return <div key={item.src} style={{position: 'absolute', left: value[0], top: value[1], width: value[2], height: value[3], overflow: 'hidden', border: '4px solid white', borderRadius: 16, boxShadow: '0 18px 36px rgba(43,51,92,.2)', transform: `rotate(${value[4]}deg)`, boxSizing: 'border-box', background: item.color}}>
            <Img src={staticFile(`images/${item.src}`)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            {sort > .65 ? <span style={{position: 'absolute', right: 9, bottom: 9, width: 14, height: 14, border: '2px solid white', borderRadius: 20, background: item.color, boxShadow: '0 2px 7px rgba(0,0,0,.22)'}} /> : null}
          </div>;
        })}
        <svg viewBox="0 0 720 776" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', opacity: draw}}>
          <path pathLength={1} d="M472 340 C528 302 630 314 652 380 C671 437 622 480 548 471 C480 463 440 419 450 374 C454 357 461 346 472 340Z" fill="none" stroke="#ff5c23" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={1} strokeDashoffset={1 - draw} />
        </svg>
        {draw > 0 ? <span style={{position: 'absolute', left: mix(610, 448, draw), top: mix(390, 360, draw), display: 'grid', placeItems: 'center', width: 38, height: 38, border: '3px solid white', borderRadius: 30, background: '#ff5c23', color: 'white', boxShadow: '0 8px 20px rgba(255,92,35,.3)', fontSize: 18, opacity: draw}}>✎</span> : null}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 34, textAlign: 'center', color: '#657080', fontSize: 17, fontWeight: 650}}>{active || 'Bring references together'}</div>
    </div>
  );
};
