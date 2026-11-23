import MandiWrapper from "@/app/_components/MandiWrapper";
import MarketAnalysisPage from "@/app/_components/MarketAnalysis";
import { auth } from "@/app/_lib/auth";

async function page({ searchParams }) {
  const session = await auth();
  return (
    <div className="w-full p-6 flex flex-col gap-6">
      <MandiWrapper id={session?.user?.farmerId}>
        <MarketAnalysisPage
          farmerId={session?.user?.farmerId}
          searchParams={searchParams}
        />
      </MandiWrapper>
    </div>
  );
}

export default page;
