export default function VideoPage() {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Eğitim Videosu</h1>
        <video controls width="640">
          <source src="/api/get-video-url" type="video/mp4" />
          Tarayıcınız video oynatmayı desteklemiyor.
        </video>
      </div>
    );
  }
  