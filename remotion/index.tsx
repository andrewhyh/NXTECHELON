import React from "react";
import { Composition, registerRoot } from "remotion";
import { Recr8Intro } from "./Recr8Intro";

const RemotionRoot = () => {
  return (
    <Composition
      id="Recr8Intro"
      component={Recr8Intro}
      durationInFrames={180}
      fps={30}
      width={1440}
      height={900}
      defaultProps={{
        brandText: "REC.R8",
        navItems: ["Work", "Approach", "About", "Careers", "News", "Contact"],
      }}
    />
  );
};

registerRoot(RemotionRoot);
