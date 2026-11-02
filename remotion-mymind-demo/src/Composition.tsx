import {Composition} from 'remotion';
import {MyMindMobileDemo} from './MyMindMobileDemo';
import {MyMindDesktopDemo} from './MyMindDesktopDemo';
import {CaseStudyClip} from './CaseStudyClip';

export const MyComposition: React.FC = () => (
  <>
    <Composition
      id="MyMindMobileDemo"
      component={MyMindMobileDemo}
      durationInFrames={390}
      fps={30}
      width={720}
      height={900}
    />
    <Composition
      id="MyMindDesktopDemo"
      component={MyMindDesktopDemo}
      durationInFrames={390}
      fps={30}
      width={1920}
      height={930}
    />
    <Composition
      id="MyMindCaptureClip"
      component={CaseStudyClip}
      durationInFrames={150}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{source: 'capture.mp4', title: 'Make room for unfinished thinking.', eyebrow: 'Capture', startFrom: 0}}
    />
    <Composition
      id="MyMindCreateClip"
      component={CaseStudyClip}
      durationInFrames={150}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{source: 'command-search.mp4', title: 'Bring useful actions closer to the canvas.', eyebrow: 'Create', startFrom: 0}}
    />
    <Composition
      id="MyMindFlowClip"
      component={CaseStudyClip}
      durationInFrames={180}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{source: 'flow-canvas.mp4', title: 'Keep the first draft open to change.', eyebrow: 'Structure', startFrom: 270}}
    />
    <Composition
      id="MyMindCommentsClip"
      component={CaseStudyClip}
      durationInFrames={150}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{source: 'comments.mp4', title: 'Keep feedback attached to the work.', eyebrow: 'Collaborate', startFrom: 0}}
    />
  </>
);
