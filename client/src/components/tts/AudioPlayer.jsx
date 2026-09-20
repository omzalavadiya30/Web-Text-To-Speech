import { Download, PauseCircle, PlayCircle, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AudioPlayer({ hasAudio = false }) {
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
      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" size="icon" aria-label="Play generated audio">
          <PlayCircle className="h-5 w-5" />
        </Button>
        <Button type="button" variant="outline" size="icon" aria-label="Pause generated audio">
          <PauseCircle className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/3 bg-slate-900" />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>00:12</span>
            <span>00:36</span>
          </div>
        </div>
        <Button type="button" variant="outline" size="icon" aria-label="Download generated audio">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
