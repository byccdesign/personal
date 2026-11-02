import {Easing, interpolate, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';

type CaseStudyClipProps = {
  source: string;
  title: string;
  eyebrow: string;
  startFrom: number;
};

export const CaseStudyClip: React.FC<CaseStudyClipProps> = ({source, title, eyebrow, startFrom}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: '#f6f6f4', color: '#202326', fontFamily: 'Arial, sans-serif'}}>
      <OffthreadVideo
        src={staticFile(`clips/${source}`)}
        startFrom={startFrom}
        style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', background: '#f6f6f4'}}
      />
      <div style={{position: 'absolute', inset: 'auto 0 0', height: 186, background: 'linear-gradient(0deg, rgba(246,246,244,.99) 0%, rgba(246,246,244,.92) 46%, rgba(246,246,244,0) 100%)'}} />
      <div style={{position: 'absolute', top: 28, left: 34, display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', border: '1px solid rgba(220,222,225,.9)', borderRadius: 999, background: 'rgba(255,255,255,.88)', boxShadow: '0 8px 26px rgba(24,30,42,.08)'}}>
        <div style={{width: 10, height: 10, borderRadius: 10, background: '#5367ef'}} />
        <div style={{fontSize: 14, lineHeight: 1, fontWeight: 750, letterSpacing: 1.5, color: '#697080'}}>{eyebrow.toUpperCase()}</div>
      </div>
      <div style={{position: 'absolute', left: 40, right: 40, bottom: 30, display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 24}}>
        <div style={{maxWidth: 990, fontSize: 38, lineHeight: 1.06, fontWeight: 650, letterSpacing: -1.4, opacity: interpolate(frame, [0, 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.16, 1, .3, 1)})}}>{title}</div>
        <div style={{flex: '0 0 auto', padding: '11px 15px', border: '1px solid #d9dadd', borderRadius: 999, color: '#636a73', background: 'rgba(255,255,255,.82)', fontSize: 12, fontWeight: 650, letterSpacing: .2}}>MYMIND / WORKING PROTOTYPE</div>
      </div>
    </div>
  );
};
