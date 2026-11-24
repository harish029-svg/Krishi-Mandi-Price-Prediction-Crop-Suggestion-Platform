import "@/app/globals.css";
import AppLayout from "@/app/_components/AppLayout";
import QueryProvider from "../_components/QueryProvider";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Farmer Portal",
  description:
    "Private farmer dashboard for tracking mandi prices, soil-based crop recommendations, and land analytics.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PortalLayout({ children }) {
  const session = await auth();
  return (
    <QueryProvider>
      <AppLayout session={session}>{children}</AppLayout>
    </QueryProvider>
  );
}
