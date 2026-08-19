import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {fontFamily} from './fonts';
import {DesktopFlowScene} from './scenes/DesktopFlowScene';
import {DesktopIdeationScene} from './scenes/DesktopIdeationScene';
import {CommandSearchScene} from './scenes/CommandSearchScene';

const background: React.CSSProperties = {
  backgroundColor: '#f7f8ff',
  backgroundImage:
    'radial-gradient(circle, rgba(117,130,170,.24) 2px, transparent 2.2px), radial-gradient(circle at 38% 18%, rgba(102,121,255,.13), transparent 36%), radial-gradient(circle at 74% 78%, rgba(198,169,255,.16), transparent 34%)',
  backgroundSize: '36px 36px, 100% 100%, 100% 100%',
  color: '#353d4b',
  fontFamily,
};

export const MyMindDesktopDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const flowOpacity = interpolate(frame, [72, 82, 202, 218], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const boardOpacity = interpolate(frame, [208, 220, 374, 389], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rotateX = interpolate(frame, [0, 72, 145, 218, 300, 389], [3.2, 2, 3.8, 4.2, 3, 3.2]);
  const rotateY = interpolate(frame, [0, 72, 145, 218, 300, 389], [-4.5, 3.5, 4.2, -3.8, 2.5, -4.5]);
  const rotateZ = interpolate(frame, [0, 145, 218, 389], [.15, -.18, .18, .15]);

  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 20% 18%,#22283f,#090b12 68%)', overflow: 'hidden'}}>
      <AbsoluteFill style={{...background, border: '1px solid rgba(255,255,255,.8)', borderRadius: 34, boxShadow: '-26px 42px 100px rgba(0,0,0,.42), 22px 16px 56px rgba(83,103,239,.18)', overflow: 'hidden', transform: `perspective(1700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(.955)`}}>
        {frame <= 82 ? <CommandSearchScene /> : null}
        <Sequence from={72} durationInFrames={147}><DesktopFlowScene opacity={flowOpacity} /></Sequence>
        {frame >= 208 ? <DesktopIdeationScene localFrame={frame - 208} opacity={boardOpacity} /> : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
