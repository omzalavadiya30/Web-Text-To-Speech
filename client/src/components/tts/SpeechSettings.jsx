"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function SpeechSettings({ speed, onSpeedChange }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Label className="text-sm font-medium text-slate-700">Speaking speed</Label>
          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
            {speed.toFixed(1)}x
          </span>
        </div>
        <Slider
          value={[speed]}
          min={0.7}
          max={1.2}
          step={0.1}
          onValueChange={(value) => onSpeedChange(value[0])}
          aria-label="Speaking speed"
        />
      </div>
    </div>
  );
}
