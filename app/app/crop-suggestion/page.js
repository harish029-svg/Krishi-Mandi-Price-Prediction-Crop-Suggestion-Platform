import CropSuggestionForm from "./CropSuggestionForm";

export const metadata = {
  title: "AI Crop Suggestions",
  description:
    "Get personalized, AI-driven crop suggestions based on your soil type and local agricultural conditions.",
};

export default function Page() {
  return <CropSuggestionForm />;
}
