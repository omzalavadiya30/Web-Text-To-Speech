"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getVoicesForLanguage } from "@/data/voices";

export default function VoiceSelector({ language, value, onChange, label = "Voice" }) {
  const voices = getVoicesForLanguage(language);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-700">{label}</Label>
      <Select value={value} onValueChange={onChange}>
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
