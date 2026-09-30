"use client";

import { useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AudioPlayer from "@/components/tts/AudioPlayer";
import ErrorMessage from "@/components/common/ErrorMessage";
import GenerateButton from "@/components/tts/GenerateButton";
import LanguageSelector from "@/components/tts/LanguageSelector";
import SpeechSettings from "@/components/tts/SpeechSettings";
import TextInput from "@/components/tts/TextInput";
import VoiceSelector from "@/components/tts/VoiceSelector";
import { languages } from "@/data/languages";
import { getVoicesForLanguage } from "@/data/voices";

const MAX_CHARACTERS = 5000;
const EMPTY_TEXT_ERROR = "Please enter some text before generating speech.";

export default function TTSWorkspace() {
  const [text, setText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedVoice, setSelectedVoice] = useState("en-female");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audioState, setAudioState] = useState({ hasAudio: false });

  const wordCount = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = text.length;
  const availableVoices = getVoicesForLanguage(selectedLanguage);
  const validSelectedVoice = availableVoices.some((voice) => voice.id === selectedVoice)
    ? selectedVoice
    : availableVoices[0]?.id ?? "";

  const handleLanguageChange = (nextLanguage) => {
    const nextLanguageVoices = getVoicesForLanguage(nextLanguage);
    setSelectedLanguage(nextLanguage);
    setSelectedVoice(nextLanguageVoices[0]?.id ?? "");
  };

  const handleTextChange = (value) => {
    setText(value.slice(0, MAX_CHARACTERS));
    setError("");
  };

  const handleGenerate = () => {
    if (!text.trim()) {
      setError(EMPTY_TEXT_ERROR);
      return;
    }

    if (!selectedLanguage || !availableVoices.some((item) => item.id === validSelectedVoice)) {
      setError("Please select a valid language and voice.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError("");
      setAudioState({ hasAudio: false });
    }, 1000);
  };

  const handleClear = () => {
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
            </div>
          </CardHeader>
          <CardContent className="space-y-5 p-5 sm:p-6">
            <TextInput
              value={text}
              onChange={handleTextChange}
              onClear={handleClear}
              charCount={charCount}
              wordCount={wordCount}
              maxCharacters={MAX_CHARACTERS}
            />

            {error && <ErrorMessage title="Validation error" message={error} />}

            <div className="grid gap-4 md:grid-cols-2">
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
                languages={languages}
              />
              <VoiceSelector
                selectedVoice={validSelectedVoice}
                onVoiceChange={setSelectedVoice}
                voices={availableVoices}
              />
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
              <AudioPlayer hasAudio={audioState.hasAudio} />
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
