import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.json();

    const {
      soilType,
      season,
      landSize,
    } = formData;

    // Validate input
    if (!soilType || !season || !Number.isFinite(Number(landSize)) || Number(landSize) <= 0) {
      return NextResponse.json(
        { error: "Please provide valid details" },
        { status: 400 }
      );
    }

    // Server-side crop recommendation
    let cropName = "";

    if (soilType === "Clayey") {
      cropName = "Paddy (Rice)";
    } 
    else if (soilType === "Sandy") {
      cropName = "Bajra (Pearl Millet)";
    } 
    else if (soilType === "Black Soil") {
      cropName = "Cotton / Soybean";
    } 
    else if (soilType === "Loamy") {
      cropName = "Wheat";
    }
    else {
      cropName = "Moong (Green Gram)";
    }

    const recommendation = {
      cropName,
      reasons: [
        `Suitable candidate for ${soilType} soil`,
        `Selected for ${season} season`,
        `Land size: ${landSize} acres`
      ],
      sellingPeriod: "March - April"
    };

    return NextResponse.json({
      success: true,
      recommendation
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}