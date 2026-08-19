import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

type NodeProps = {
  x: number;
  y: number;
  title: string;
  detail: string;
  symbol: string;
  accent: string;
  frame: number;
  start: number;
  width?: number;
};

const Node: React.FC<NodeProps> = ({x, y, title, detail, symbol, accent, frame, start, width = 300}) => {
  const {fps} = useVideoConfig();
  const reveal = spring({fps, frame: frame - start, config: {damping: 18, stiffness: 145}});
  return (
    <div style={{position: 'absolute', left: x, top: y, width, height: 130, display: 'flex', alignItems: 'center', gap: 18, padding: 22, boxSizing: 'border-box', border: '1px solid rgba(83,103,239,.13)', borderRadius: 24, background: 'rgba(255,255,255,.96)', boxShadow: '0 20px 54px rgba(83,103,239,.15)', opacity: reveal, translate: `0 ${(1 - reveal) * 20}px`, scale: 0.92 + reveal * 0.08}}>
      <div style={{width: 54, height: 54, flex: '0 0 54px', display: 'grid', placeItems: 'center', borderRadius: 16, color: accent, background: `${accent}18`, fontSize: 20, fontWeight: 800}}>{symbol}</div>
      <div style={{minWidth: 0}}>
        <div style={{fontSize: 25, lineHeight: 1.05, fontWeight: 700, letterSpacing: -1}}>{title}</div>
        <div style={{marginTop: 9, color: '#7b8494', fontSize: 17, lineHeight: 1.2, fontWeight: 500}}>{detail}</div>
      </div>
    </div>
  );
};

const Edge: React.FC<{d: string; label: string; x: number; y: number; frame: number; start: number}> = ({d, label, x, y, frame, start}) => {
  const progress = interpolate(frame, [start, start + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <g opacity={progress}>
      <path d={d} pathLength={1} fill="none" stroke="#8999ef" strokeWidth={5} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1 - progress} />
      <text x={x} y={y} textAnchor="middle" fill="#6673b5" stroke="#f7f8ff" strokeWidth={14} paintOrder="stroke fill" fontSize={19} fontWeight={700} opacity={interpolate(progress, [.75, 1], [0, 1], {extrapolateLeft: 'clamp'})}>{label}</text>
    </g>
  );
};

export const DesktopFlowScene: React.FC<{opacity: number}> = ({opacity}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: 'absolute', inset: 0, opacity, translate: `0 ${(1 - opacity) * -12}px`}}>
      <div style={{position: 'absolute', left: 90, top: 60}}>
        <div style={{color: '#5367ef', fontSize: 18, fontWeight: 800, letterSpacing: 2}}>GENERATE PROCESS FLOW</div>
        <div style={{marginTop: 10, fontSize: 46, lineHeight: 1.05, fontWeight: 700, letterSpacing: -2}}>Create a connected workflow</div>
      </div>
      <svg viewBox="0 0 1920 930" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible'}}>
        <Edge d="M370 455 C420 455 470 455 520 455" label="Payins" x={445} y={430} frame={frame} start={24} />
        <Edge d="M800 455 C900 455 925 265 1050 265" label="Transfers" x={917} y={350} frame={frame} start={44} />
        <Edge d="M1350 265 C1410 265 1480 265 1540 265" label="Payouts" x={1445} y={240} frame={frame} start={64} />
        <Edge d="M800 455 C900 455 925 645 1050 645" label="Issuing" x={917} y={572} frame={frame} start={84} />
        <Edge d="M1350 645 C1410 645 1480 645 1540 645" label="Outbound payment" x={1445} y={620} frame={frame} start={106} />
      </svg>
      <Node x={90} y={390} width={280} title="Customer" detail="Starts a payment" symbol="●" accent="#5367ef" frame={frame} start={6} />
      <Node x={520} y={390} width={280} title="Platform" detail="Routes the request" symbol="◆" accent="#248f9b" frame={frame} start={14} />
      <Node x={1050} y={200} title="Connected account" detail="Receives payout" symbol="▣" accent="#5367ef" frame={frame} start={34} />
      <Node x={1540} y={200} title="Financial account" detail="Settlement" symbol="▥" accent="#aa7620" frame={frame} start={54} />
      <Node x={1050} y={580} title="Cardholder" detail="Issuing balance" symbol="●" accent="#8056c7" frame={frame} start={74} />
      <Node x={1540} y={580} title="External account" detail="Third party" symbol="▥" accent="#657080" frame={frame} start={96} />
    </div>
  );
};
