"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function VoiceSelector({ selectedVoice, onVoiceChange, voices, label = "Voice" }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-700">{label}</Label>
      <Select value={selectedVoice} onValueChange={onVoiceChange}>
        <SelectTrigger aria-label="Select voice" className="w-full">
          <SelectValue placeholder="Select a voice" />
        </SelectTrigger>
        <SelectContent>
          {voices.length > 0 ? (
            voices.map((voice) => (
              <SelectItem key={voice.id} value={voice.id}>
                {voice.label}
              </SelectItem>
            ))
          ) : (
            <div className="px-2 py-3 text-sm text-slate-500">Select a language first</div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
