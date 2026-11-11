import React from "react";

export default function LoadingGrid() {
  const cards = [
    { bg: "bg-green-100", border: "border-green-200" },
    { bg: "bg-blue-100", border: "border-blue-200" },
    { bg: "bg-purple-100", border: "border-purple-200" },
    { bg: "bg-orange-100", border: "border-orange-200" },
  ];

  return (
    <>
      <style>{`
        @keyframes float-shadow {
          0%, 100% {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
            transform: translateY(0);
          }
          50% {
            box-shadow: 0 15px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
            transform: translateY(-4px);
          }
        }
        .animate-float-shadow {
          animation: float-shadow 1.5s ease-in-out infinite;
        }
      `}</style>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 font-sans">
        {cards.map((theme, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 flex flex-col relative overflow-hidden border ${theme.bg} ${theme.border} animate-float-shadow`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-black/10 animate-pulse" />
              <div className="w-3/5 h-4 rounded-lg bg-black/10 animate-pulse" />
            </div>

            <div className="w-3/4 h-8 rounded-lg bg-black/15 mb-3 animate-pulse" />

            <div className="w-[45%] h-3.5 rounded-lg bg-black/10 animate-pulse" />
          </div>
        ))}
      </div>
    </>
  );
}
