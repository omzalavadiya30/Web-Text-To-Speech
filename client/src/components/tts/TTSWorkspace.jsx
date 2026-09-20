"use client";

import { useMemo, useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AudioPlayer from "@/components/tts/AudioPlayer";
import ErrorMessage from "@/components/common/ErrorMessage";
import GenerateButton from "@/components/tts/GenerateButton";
import LanguageSelector from "@/components/tts/LanguageSelector";
import SpeechSettings from "@/components/tts/SpeechSettings";
import VoiceSelector from "@/components/tts/VoiceSelector";
import { languages } from "@/data/languages";
import { getVoicesForLanguage } from "@/data/voices";

const MAX_CHARACTERS = 5000;

export default function TTSWorkspace() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [voice, setVoice] = useState("en-female");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const wordCount = useMemo(() => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  }, [text]);

  const charCount = text.length;
  const availableVoices = getVoicesForLanguage(language);

  const handleTextChange = (value) => {
    if (value.length <= MAX_CHARACTERS) {
      setText(value);
      setError("");
    } else {
      setError(`Text exceeds the maximum of ${MAX_CHARACTERS} characters.`);
    }
  };

  const handleGenerate = () => {
    if (!text.trim()) {
      setError("Please enter some text before generating speech.");
      return;
    }

    if (!language || !availableVoices.some((item) => item.id === voice)) {
      setError("Please select a valid language and voice.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError("");
    }, 1000);
  };

  const clearText = () => {
    setText("");
    setError("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-600">
            <Sparkles className="h-3.5 w-3.5" />
            AI voice studio
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Text to Speech
          </h1>
          <p className="mt-3 max-w-xl text-base text-slate-600 sm:text-lg">
            Transform your text into natural-sounding speech.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.95fr]">
        <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-200 bg-slate-50/80 px-5 py-5 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-xl font-semibold text-slate-900">Text input</CardTitle>
              <button
                type="button"
                onClick={clearText}
                className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
              >
                Clear
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="tts-text" className="text-sm font-medium text-slate-700">
                Enter your text
              </Label>
              <Textarea
                id="tts-text"
                value={text}
                onChange={(event) => handleTextChange(event.target.value)}
                placeholder="Enter or paste your text here..."
                aria-describedby="text-stats"
                className="min-h-50 resize-none border-slate-200 bg-slate-50 text-base shadow-none placeholder:text-slate-400 focus-visible:ring-slate-900 sm:min-h-65"
              />
            </div>

            <div id="text-stats" className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
              <div className="flex items-center gap-4">
                <span>Characters: {charCount} / {MAX_CHARACTERS}</span>
                <span>Words: {wordCount}</span>
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
                Max 5000 chars
              </div>
            </div>

            {error && <ErrorMessage title="Validation error" message={error} />}

            <div className="grid gap-4 md:grid-cols-2">
              <LanguageSelector value={language} onChange={setLanguage} label="Language" />
              <VoiceSelector language={language} value={voice} onChange={setVoice} label="Voice" />
            </div>

            <SpeechSettings speed={speed} onSpeedChange={setSpeed} pitch={pitch} onPitchChange={setPitch} />

            <div className="flex justify-end border-t border-slate-200 pt-4">
              <GenerateButton
                disabled={!text.trim()}
                loading={loading}
                onClick={handleGenerate}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-lg font-semibold text-slate-900">Output</CardTitle>
                <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-600">
                  Empty
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AudioPlayer hasAudio={false} />
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-900">Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                <Wand2 className="mt-0.5 h-4 w-4 text-slate-700" />
                <p>Use concise sentences for more natural results.</p>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                <Sparkles className="mt-0.5 h-4 w-4 text-slate-700" />
                <p>Try different voices and pitch values for variety.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
