import Navbar from "@/components/layout/Navbar";
import PageContainer from "@/components/layout/PageContainer";
import TTSWorkspace from "@/components/tts/TTSWorkspace";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />
      <PageContainer className="py-8 sm:py-10 lg:py-12">
        <TTSWorkspace />
      </PageContainer>
    </main>
  );
}
