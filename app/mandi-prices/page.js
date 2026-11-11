import { Suspense } from "react";
import MandiWrapper from "../components/MandiWrapper";
import Table from "../components/Table";
import TableSkeleton from "../components/TableSekelton";
import MandiChart from "../components/MandiChart";
export const metadata = {
  title: "mandi prices",
};

function page({ searchParams }) {
  return (
    <div className="w-full p-6 flex flex-col gap-6">
      <MandiWrapper>
        <Suspense fallback={<TableSkeleton />}>
          {/* The Server Component is passed as children to the Client Wrapper */}
          <Table searchParams={searchParams} />
        </Suspense>
      </MandiWrapper>
      <MandiChart />
    </div>
  );
}

export default page;
