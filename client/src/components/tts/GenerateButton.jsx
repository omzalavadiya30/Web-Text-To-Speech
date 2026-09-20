"use client";

import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GenerateButton({ disabled, loading, onClick }) {
  return (
    <Button
      type="button"
      variant="default"
      size="lg"
      className="w-full justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 sm:w-auto"
      disabled={disabled || loading}
      onClick={onClick}
      aria-label="Generate speech"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Generate Speech
        </>
      )}
    </Button>
  );
}
