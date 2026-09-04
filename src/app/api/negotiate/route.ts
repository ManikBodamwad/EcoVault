import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      projectName = "Mahanadi Mangrove Restoration", 
      developer = "Ananya Eco-Holdings", 
      location = "Odisha",
      askingPrice = 320, 
      offeredPrice = 300, 
      volume = 1000,
      projectType = "Forestry"
    } = body;

    const discountPct = Math.round(((askingPrice - offeredPrice) / askingPrice) * 100);
    const volumeMultiplier = volume >= 5000 ? 0.92 : volume >= 2000 ? 0.95 : 0.97;
    const floorPrice = Math.round(askingPrice * volumeMultiplier);

    // 1. Live Groq AI Call with fallback model list
    const groqKey = process.env.GROQ_API_KEY;

    if (groqKey) {
      const GROQ_MODELS = [
        "openai/gpt-oss-120b",
        "openai/gpt-oss-20b",
        "qwen/qwen3.8-27b",
        "llama-3.3-70b-versatile",
        "llama-3.1-8b-instant"
      ];

      for (const modelName of GROQ_MODELS) {
        try {
          const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${groqKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: modelName,
              messages: [
                {
                  role: "system",
                  content: "You are an AI negotiation agent representing verified carbon project developers across India on the EcoVault platform. Always respond with realistic carbon market economics, local MRV costs, and community benefit sharing. Return strictly valid JSON with keys: status, finalPrice, message, developerName, registryHold."
                },
                {
                  role: "user",
                  content: `You represent developer "${developer}" in ${location}, India managing the "${projectName}" (${projectType} carbon project).
A corporate buyer is bidding ₹${offeredPrice}/ton for ${volume.toLocaleString()} tons. Official asking price is ₹${askingPrice}/ton. Minimum acceptable floor price for this volume is ₹${floorPrice}/ton.

Respond as ${developer}.
Return raw JSON object:
{
  "status": "${offeredPrice >= floorPrice ? "accepted" : "countered"}",
  "finalPrice": ${offeredPrice >= floorPrice ? offeredPrice : floorPrice},
  "message": "<2-3 sentence authentic response explaining why you accept or counter based on local MRV costs, seasonal maintenance, and community benefit sharing in ${location}>",
  "developerName": "${developer}",
  "registryHold": true
}`
                }
              ],
              temperature: 0.2
            })
          });

          if (groqRes.ok) {
            const data = await groqRes.json();
            const content = data?.choices?.[0]?.message?.content;
            if (content) {
              const cleaned = content.replace(/```json/g, "").replace(/```/g, "").trim();
              const parsed = JSON.parse(cleaned);
              if (parsed.status && parsed.message) {
                return NextResponse.json(parsed);
              }
            }
          }
        } catch (groqErr) {
          console.warn(`Groq API negotiation error with ${modelName}:`, groqErr);
        }
      }
    }

    // 2. Intelligent Rule-Based Engine Fallback
    let responsePayload;

    if (offeredPrice >= askingPrice) {
      responsePayload = {
        status: "accepted",
        finalPrice: offeredPrice,
        message: `Offer Accepted at ₹${offeredPrice}/ton. ${developer} has confirmed the allocation of ${volume.toLocaleString()} tons of ${projectName}. GCI registry lock has been initiated.`,
        developerName: developer,
        registryHold: true
      };
    } else if (offeredPrice >= floorPrice) {
      responsePayload = {
        status: "accepted",
        finalPrice: offeredPrice,
        message: `Volume Discount Approved! ${developer} accepted your bid of ₹${offeredPrice}/ton (${discountPct}% below ask) for your commitment of ${volume.toLocaleString()} tons. Your checkout pricing has been updated.`,
        developerName: developer,
        registryHold: true
      };
    } else {
      const counterPrice = Math.max(floorPrice, Math.round((askingPrice + offeredPrice) / 2));
      responsePayload = {
        status: "countered",
        finalPrice: counterPrice,
        message: `Counter-Offer from ${developer}: "We cannot clear ₹${offeredPrice}/ton due to continuous satellite Lidar audit and community ranger costs in ${location}. However, for ${volume.toLocaleString()} tons, our best clearing price is ₹${counterPrice}/ton."`,
        developerName: developer,
        registryHold: false
      };
    }

    return NextResponse.json(responsePayload);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Negotiation processing error", details: error?.message },
      { status: 500 }
    );
  }
}
