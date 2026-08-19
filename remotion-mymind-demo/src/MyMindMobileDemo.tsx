import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {FlowScene} from './scenes/FlowScene';
import {IdeationScene} from './scenes/IdeationScene';
import {fontFamily} from './fonts';
import {CommandSearchScene} from './scenes/CommandSearchScene';

const background: React.CSSProperties = {
  backgroundColor: '#f7f8ff',
  backgroundImage:
    'radial-gradient(circle, rgba(117,130,170,.25) 2px, transparent 2.2px), radial-gradient(circle at 38% 18%, rgba(102,121,255,.13), transparent 36%), radial-gradient(circle at 74% 78%, rgba(198,169,255,.16), transparent 34%)',
  backgroundSize: '32px 32px, 100% 100%, 100% 100%',
  color: '#353d4b',
  fontFamily,
};

export const MyMindMobileDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const flowOpacity = interpolate(frame, [72, 82, 202, 218], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const boardOpacity = interpolate(frame, [208, 220, 374, 389], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rotateX = interpolate(frame, [0, 72, 218, 389], [1.2, .5, 1.1, 1.2]);
  const rotateY = interpolate(frame, [0, 72, 218, 389], [-1.4, 1.2, -1.1, -1.4]);

  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 18% 14%,#22283f,#090b12 68%)', overflow: 'hidden'}}>
      <AbsoluteFill style={{...background, border: '1px solid rgba(255,255,255,.82)', borderRadius: 30, boxShadow: '0 34px 80px rgba(0,0,0,.42)', overflow: 'hidden', transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(.96)`}}>
        {frame <= 82 ? <CommandSearchScene mobile /> : null}
        <Sequence from={72} durationInFrames={147}><FlowScene opacity={flowOpacity} /></Sequence>
        {frame >= 208 ? <IdeationScene localFrame={frame - 208} opacity={boardOpacity} /> : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
