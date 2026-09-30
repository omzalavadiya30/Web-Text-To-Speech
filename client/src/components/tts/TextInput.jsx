import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextInput({
  value,
  onChange,
  onClear,
  charCount,
  wordCount,
  maxCharacters = 5000,
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tts-text" className="text-sm font-medium text-slate-700">
          Enter your text
        </Label>
        <Textarea
          id="tts-text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter or paste your text here..."
          aria-describedby="text-stats"
          className="min-h-[200px] resize-none border-slate-200 bg-slate-50 text-base shadow-none placeholder:text-slate-400 focus-visible:ring-slate-900 sm:min-h-[260px]"
        />
      </div>

      <div
        id="text-stats"
        className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500"
      >
        <div className="flex items-center gap-4">
          <span>
            Characters: {charCount} / {maxCharacters}
          </span>
          <span>Words: {wordCount}</span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:text-slate-900"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
