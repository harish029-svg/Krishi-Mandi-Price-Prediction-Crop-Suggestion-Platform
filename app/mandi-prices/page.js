import { Suspense } from "react";
import MandiWrapper from "../components/MandiWrapper";
import Table from "../components/Table";
import TableSkeleton from "../components/TableSekelton";
import MandiChart from "../components/MandiChart";
import TableChartSkeleton from "../components/TableChartSkeleton";
export const metadata = {
  title: "mandi prices",
};

async function Page({ searchParams }) {
  return (
    <div className="w-full p-6 flex flex-col gap-6">
      <MandiWrapper>
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
