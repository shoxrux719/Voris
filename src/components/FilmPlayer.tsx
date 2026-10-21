import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, LoaderCircle, X } from 'lucide-react';
import type { Film, FilmLanguage } from '../data/films';
import { videoAssets } from '../data/video-assets';

const labels = {
  uz: { close: 'Yopish', quality: 'Sifat', loading: 'Video yuklanmoqda…', error: 'Video ochilmadi. Uni alohida ochib ko‘ring.', open: 'Videoni ochish', contact: 'Shunday video kerakmi?', telegram: 'Loyihani muhokama qilish' },
  ru: { close: 'Закрыть', quality: 'Качество', loading: 'Видео загружается…', error: 'Видео не открылось. Попробуйте открыть его отдельно.', open: 'Открыть видео', contact: 'Хотите видео для своего проекта?', telegram: 'Обсудить съёмку' },
  en: { close: 'Close', quality: 'Quality', loading: 'Loading video…', error: 'The video could not load. Try opening it separately.', open: 'Open video', contact: 'A film for your next project?', telegram: 'Discuss a shoot' },
};

export function FilmPlayer({ film, lang, onClose }: { film: Film; lang: FilmLanguage; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playback = useRef({ time: 0, playing: true });
  const [quality, setQuality] = useState<'720' | '1080'>('720');
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const c = labels[lang];
  const source = videoAssets[film.id][quality];

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      if (dialog?.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = source;
    return () => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [source]);

  return (
    <dialog ref={dialogRef} className="film-dialog" aria-labelledby="film-player-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="film-player-shell">
        <button className="film-close" type="button" onClick={onClose} aria-label={c.close} autoFocus><X size={22} /></button>
        <div className="film-screen">
          <video
            ref={videoRef}
            poster={`/assets/videos/${film.id}-poster.jpg`}
            controls
            playsInline
            autoPlay
            preload="auto"
            aria-label={film.title[lang]}
            onLoadedMetadata={(event) => {
              const video = event.currentTarget;
              video.currentTime = Math.min(playback.current.time, Math.max(0, video.duration - .1));
              if (playback.current.playing) void video.play().catch(() => setLoading(false));
            }}
            onCanPlay={() => setLoading(false)}
            onPlaying={() => setLoading(false)}
            onWaiting={() => setLoading(true)}
            onError={() => { setLoading(false); setFailed(true); }}
          />
          {loading && !failed && <div className="film-loading" role="status"><LoaderCircle size={23} /><span>{c.loading}</span></div>}
          {failed && <div className="film-failed" role="alert"><p>{c.error}</p><a href={source} target="_blank" rel="noreferrer">{c.open}<ArrowUpRight size={17} /></a></div>}
        </div>
        <div className="film-player-info">
          <p className="film-player-kicker">VORIS TUROBOV / MOBILE FILM</p>
          <h2 id="film-player-title">{film.title[lang]}</h2>
          <p className="film-player-category">{film.category[lang]} <span>·</span> {film.duration} <span>·</span> 9:16</p>
          <div className="film-quality" role="group" aria-label={c.quality}>
            <span>{c.quality}</span>
            {(['720', '1080'] as const).map((value) => <button type="button" key={value} aria-pressed={quality === value} onClick={() => {
              if (quality === value) return;
              const video = videoRef.current;
              playback.current = { time: video?.currentTime ?? 0, playing: video ? !video.paused : true };
              setFailed(false);
              setLoading(true);
              setQuality(value);
            }}>{value}p</button>)}
          </div>
          <div className="film-player-cta"><p>{c.contact}</p><a href="https://t.me/voris_21" target="_blank" rel="noreferrer">{c.telegram}<ArrowUpRight size={18} /></a></div>
        </div>
      </div>
    </dialog>
  );
}
