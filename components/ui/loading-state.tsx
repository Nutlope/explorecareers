'use client';

import { useState, useEffect } from 'react';
import { Loader2, Clock } from 'lucide-react';

interface LoadingStateProps {
  estimatedSeconds?: number;
}

export default function LoadingState({ estimatedSeconds = 20 }: LoadingStateProps) {
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        const increment = Math.random() * 4 + 1;
        return Math.min(prev + increment, 95);
      });
    }, 400);

    const timeInterval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const remainingTime = Math.max(estimatedSeconds - elapsedTime, 0);

  return (
    <div className="flex items-center gap-3 px-2">
      <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />
      
      <div className="w-24 h-1.5 bg-white/30 rounded-full overflow-hidden flex-shrink-0">
        <div 
          className="h-full bg-white rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex items-center gap-1 text-xs whitespace-nowrap">
        <Clock className="h-3 w-3" />
        <span>{remainingTime}s</span>
      </div>
    </div>
  );
}
