import { Composition } from "remotion";
import { Main } from "./Main";
import "./fonts";

// Raw.mp4 = 2486 frames @ 30fps (82.87s). Never change: the raw is already cut by the editor.
export const RAW_FRAMES = 2486;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HSB"
      component={Main}
      durationInFrames={RAW_FRAMES}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
