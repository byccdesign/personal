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
};

const Node: React.FC<NodeProps> = ({x, y, title, detail, symbol, accent, frame, start}) => {
  const {fps} = useVideoConfig();
  const reveal = spring({fps, frame: frame - start, config: {damping: 18, stiffness: 145}});
  return (
    <div style={{position: 'absolute', left: x, top: y, width: 240, height: 112, display: 'flex', alignItems: 'center', gap: 14, padding: 18, boxSizing: 'border-box', border: '1px solid rgba(83,103,239,.13)', borderRadius: 22, background: 'rgba(255,255,255,.96)', boxShadow: '0 18px 45px rgba(83,103,239,.14)', opacity: reveal, transform: `translateY(${(1 - reveal) * 18}px) scale(${0.92 + reveal * 0.08})`}}>
      <div style={{width: 46, height: 46, flex: '0 0 46px', display: 'grid', placeItems: 'center', borderRadius: 14, color: accent, background: `${accent}18`, fontSize: 18, fontWeight: 800}}>{symbol}</div>
      <div style={{minWidth: 0}}>
        <div style={{fontSize: 20, lineHeight: 1.05, fontWeight: 750, letterSpacing: -0.7}}>{title}</div>
        <div style={{marginTop: 8, color: '#7b8494', fontSize: 14, lineHeight: 1.15}}>{detail}</div>
      </div>
    </div>
  );
};

const Edge: React.FC<{d: string; label: string; x: number; y: number; frame: number; start: number}> = ({d, label, x, y, frame, start}) => {
  const progress = interpolate(frame, [start, start + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <g opacity={progress}>
      <path d={d} pathLength={1} fill="none" stroke="#8999ef" strokeWidth={4} strokeLinecap="round" strokeDasharray={1} strokeDashoffset={1 - progress} />
      <text x={x} y={y} textAnchor="middle" fill="#6673b5" stroke="#f7f8ff" strokeWidth={10} paintOrder="stroke fill" fontSize={14} fontWeight={700} opacity={interpolate(progress, [.75, 1], [0, 1], {extrapolateLeft: 'clamp'})}>{label}</text>
    </g>
  );
};

export const FlowScene: React.FC<{opacity: number}> = ({opacity}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: 'absolute', inset: 0, opacity, transform: `translateY(${(1 - opacity) * -10}px)`}}>
      <div style={{position: 'absolute', left: 46, top: 48, right: 46}}>
        <div style={{color: '#5367ef', fontSize: 15, fontWeight: 800, letterSpacing: 1.5}}>GENERATE PROCESS FLOW</div>
        <div style={{marginTop: 10, fontSize: 34, lineHeight: 1.05, fontWeight: 760, letterSpacing: -1.6}}>Create a connected workflow</div>
      </div>
      <svg viewBox="0 0 720 900" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible'}}>
        <Edge d="M286 246 C320 246 342 246 376 246" label="Payins" x={331} y={224} frame={frame} start={24} />
        <Edge d="M496 302 C496 350 286 355 286 402" label="Transfers" x={392} y={346} frame={frame} start={44} />
        <Edge d="M286 514 C320 514 342 514 376 514" label="Payouts" x={331} y={493} frame={frame} start={64} />
        <Edge d="M496 302 C496 480 286 579 286 650" label="Issuing" x={425} y={536} frame={frame} start={84} />
        <Edge d="M286 762 C320 762 342 762 376 762" label="Outbound" x={331} y={741} frame={frame} start={106} />
      </svg>
      <Node x={46} y={190} title="Customer" detail="Starts a payment" symbol="●" accent="#5367ef" frame={frame} start={6} />
      <Node x={376} y={190} title="Platform" detail="Routes the request" symbol="◆" accent="#248f9b" frame={frame} start={14} />
      <Node x={46} y={402} title="Connected account" detail="Receives payout" symbol="▣" accent="#5367ef" frame={frame} start={34} />
      <Node x={376} y={458} title="Financial account" detail="Settlement" symbol="▥" accent="#aa7620" frame={frame} start={54} />
      <Node x={46} y={650} title="Cardholder" detail="Issuing balance" symbol="●" accent="#8056c7" frame={frame} start={74} />
      <Node x={376} y={706} title="External account" detail="Third party" symbol="▥" accent="#657080" frame={frame} start={96} />
    </div>
  );
};
