import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0 || seconds === Infinity) {
    return "0:00";
  }

  const totalSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};

export default function AudioPlayer({ hasAudio = false, audioUrl = "" }) {
  const audioRef = useRef(null);
  const hasValidAudio = Boolean(hasAudio && typeof audioUrl === "string" && audioUrl.trim());

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [playerError, setPlayerError] = useState("");

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return undefined;
    }

    const handleLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setCurrentTime(0);
      setIsLoading(false);
      setPlayerError("");
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setPlayerError("");
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(audio.duration || 0);
    };

    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setPlayerError("Unable to load the generated audio.");
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!hasValidAudio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
      audio.load();
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  }, [audioUrl, hasValidAudio]);

  const handlePlayPause = async () => {
    const audio = audioRef.current;

    if (!audio || !hasValidAudio) {
      return;
    }

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      setIsPlaying(false);
      setPlayerError("Unable to play the generated audio.");
    }
  };

  const handleSeek = (nextValue) => {
    const audio = audioRef.current;
    const safeValue = Number(nextValue);

    if (!audio || !Number.isFinite(safeValue)) {
      return;
    }

    const clampedValue = Math.min(Math.max(safeValue, 0), duration || safeValue || 0);
    audio.currentTime = clampedValue;
    setCurrentTime(clampedValue);
  };

  const handleVolumeChange = (nextValue) => {
    const audio = audioRef.current;
    const safeValue = Number(nextValue);

    if (!audio || !Number.isFinite(safeValue)) {
      return;
    }

    const clampedValue = Math.min(Math.max(safeValue, 0), 1);
    audio.volume = clampedValue;
    setVolume(clampedValue);
    setIsMuted(clampedValue === 0);

    if (clampedValue > 0) {
      setPreviousVolume(clampedValue);
    }
  };

  const handleMuteToggle = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const nextVolume = volume > 0 ? 0 : previousVolume || 1;
    audio.volume = nextVolume;
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);

    if (nextVolume > 0) {
      setPreviousVolume(nextVolume);
    }
  };

  if (!hasValidAudio) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
        <div className="mb-4 rounded-full bg-white p-3 text-slate-500 shadow-sm ring-1 ring-slate-200">
          <Volume2 className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No audio generated yet</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Your generated speech will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onLoadStart={() => {
          setIsLoading(true);
          setPlayerError("");
        }}
        aria-label="Generated speech"
        className="hidden"
      >
        Your browser does not support audio playback.
      </audio>

      {isLoading && !isPlaying && (
        <p className="text-sm text-slate-600">Loading audio...</p>
      )}

      {playerError && (
        <p className="text-sm text-red-600">{playerError}</p>
      )}

      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="default"
          size="icon"
          onClick={handlePlayPause}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          title={isPlaying ? "Pause audio" : "Play audio"}
          className="h-11 w-11 rounded-full bg-slate-900 text-white hover:bg-slate-700"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-slate-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <Slider
            value={[Number.isFinite(currentTime) ? currentTime : 0]}
            min={0}
            max={duration || 0}
            step={0.1}
            onValueChange={(value) => handleSeek(value[0])}
            aria-label="Audio progress"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleMuteToggle}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          title={isMuted ? "Unmute audio" : "Mute audio"}
          className="h-10 w-10 rounded-full"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>

        <div className="flex-1">
          <Slider
            value={[Number.isFinite(volume) ? volume : 1]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(value) => handleVolumeChange(value[0])}
            aria-label="Volume"
          />
        </div>

        <span className="w-10 text-right text-xs font-medium text-slate-600">
          {Math.round((Number.isFinite(volume) ? volume : 1) * 100)}%
        </span>
      </div>
    </div>
  );
}
