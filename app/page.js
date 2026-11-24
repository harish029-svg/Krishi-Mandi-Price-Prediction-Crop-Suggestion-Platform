import LandingPage from "./_components/LandingPage.js";

export const metadata = {
  title: "AgriSaathi | Smarter Farming Decisions & Real-Time Mandi Prices",
  description:
    "Get real-time mandi prices today, AI-powered crop suggestions, nearby agricultural markets, and historical price trends — all in one unified smart farming platform.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <LandingPage />;
}
