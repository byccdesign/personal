import {Composition} from 'remotion';
import {MyMindMobileDemo} from './MyMindMobileDemo';
import {MyMindDesktopDemo} from './MyMindDesktopDemo';

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
  </>
);
