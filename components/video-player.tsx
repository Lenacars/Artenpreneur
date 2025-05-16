// components/video-player.tsx
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

interface VideoPlayerProps {
  videoUrl: string;
  videoId: string;
}

export function VideoPlayer({ videoUrl, videoId }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Video pozisyonunu kaydet
    const saveProgress = async () => {
      if (!session?.user) return;
      
      await fetch('/api/video-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoId,
          progress: (video.currentTime / video.duration) * 100,
          lastPosition: video.currentTime,
        }),
      });
    };

    video.addEventListener('timeupdate', saveProgress);
    return () => video.removeEventListener('timeupdate', saveProgress);
  }, [videoId, session]);

  return (
    <div className="relative aspect-video">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full h-full"
      />
    </div>
  );
}