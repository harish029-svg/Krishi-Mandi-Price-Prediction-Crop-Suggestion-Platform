import { Suspense } from "react";
import MandiWrapper from "../../_components/MandiWrapper";
import Table from "../../_components/Table";
import TableSkeleton from "../../_components/TableSekelton";
import MandiChart from "../../_components/MandiChart";
import TableChartSkeleton from "../../_components/TableChartSkeleton";
import { auth } from "@/app/_lib/auth";
export const metadata = {
  title: "mandi prices",
};

async function Page({ searchParams }) {
  const session = await auth();
  return (
    <div className="w-full p-6 flex flex-col gap-6">
      <MandiWrapper id={session?.user?.farmerId}>
        <Suspense fallback={<TableChartSkeleton />}>
          {/* The Server Component is passed as children to the Client Wrapper */}
          <Table searchParams={searchParams} />
          <MandiChart searchParams={searchParams} />
        </Suspense>
      </MandiWrapper>
    </div>
  );
}

export default Page;
