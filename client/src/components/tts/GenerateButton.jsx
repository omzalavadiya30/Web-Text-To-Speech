"use client";

import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GenerateButton({ disabled, loading, onClick }) {
  return (
    <Button
      type="button"
      variant="default"
      size="lg"
      className="w-full cursor-pointer justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:bg-slate-900 sm:w-auto"
      disabled={loading}
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
