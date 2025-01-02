import { SparklesCore } from './ui/sparkles';
import React from 'react';

const BackgroundSparkles = React.memo(() => {
  return (
    <SparklesCore
      className="absolute inset-0 w-full h-full"
      particleColor='#ffffff'
      particleSize={10}
      background='transparent'
      maxSize={1}
      minSize={0.5}
    />
  );
});

BackgroundSparkles.displayName = 'BackgroundSparkles';

export default BackgroundSparkles; 