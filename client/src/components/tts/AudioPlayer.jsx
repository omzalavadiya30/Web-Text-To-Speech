import { Volume2 } from "lucide-react";

export default function AudioPlayer({ hasAudio = false, audioUrl = "" }) {
  if (!hasAudio) {
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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <audio aria-label="Generated speech" className="w-full" controls controlsList="nodownload" preload="metadata" src={audioUrl}>
        Your browser does not support audio playback.
      </audio>
    </div>
  );
}
