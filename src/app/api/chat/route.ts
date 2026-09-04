import { NextRequest, NextResponse } from "next/server";

const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.8-27b",
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant"
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message = "", history = [] } = body;

    const groqKey = process.env.GROQ_API_KEY;

    if (groqKey && message.trim()) {
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
                  content: `You are EcoVault AI, the intelligent carbon co-pilot for India's institutional voluntary carbon registry and escrow exchange.
You provide precise, authoritative, and helpful advice to corporate sustainability officers, ESG managers, and project developers.

Live Marketplace Catalog on EcoVault:
1. Mahanadi Mangrove Blue Carbon (Odisha) - ₹320/t (99% trust score, ACVA verified, GCI-REG-2026-OD942)
2. Malwa Agricultural Biogas Hub (Punjab) - ₹295/t (95% trust score, Stubble burning abatement, GCI-REG-2026-PB108)
3. Thar Desert Solar Harvest (Rajasthan) - ₹260/t (92% trust score, Grid displacement, GCI-REG-2026-RJ402)
4. Western Ghats Community Agroforestry (Maharashtra) - ₹360/t (97% trust score, Native broadleaf sequestration, GCI-REG-2026-MH711)
5. Kutch Coastal Wind Farm (Gujarat) - ₹275/t (94% trust score, Clean energy offset, GCI-REG-2026-GJ519)
6. Bengaluru Urban Biomass Pelletization (Karnataka) - ₹310/t (96% trust score, Circular waste recovery, GCI-REG-2026-KA304)

Key Architectural Pillars:
- Anti-Greenwashing & Verification: Satellite Lidar canopy monitoring, Sentinel-2 spectral indices, and ACVA (Accredited Carbon Verification Agency) audits.
- Institutional 4-Stage Escrow: Stage 1 (Deposit Lock) -> Stage 2 (Registry GCI Serial Quarantined) -> Stage 3 (Lidar Satellite Verification) -> Stage 4 (Developer Payout & Permanent Certificate Retirement).
- Compliance: Full SEBI BRSR Core and Indian Carbon Credit Trading Scheme (CCTS) readiness.

Guidelines:
- Always answer the user's specific question directly with relevant numbers, project names, and actionable advice.
- Keep responses concise (2 to 4 sentences or punchy bullet points), professional, and easy to read.`
                },
                ...history.slice(-4).map((h: any) => ({
                  role: h.sender === "user" ? "user" : "assistant",
                  content: h.text
                })),
                { role: "user", content: message }
              ],
              temperature: 0.2,
              max_tokens: 300
            })
          });

          if (groqRes.ok) {
            const data = await groqRes.json();
            const reply = data?.choices?.[0]?.message?.content;
            if (reply && reply.trim()) {
              return NextResponse.json({ reply: reply.trim() });
            }
          }
        } catch (modelErr) {
          console.warn(`Groq model ${modelName} error:`, modelErr);
        }
      }
    }

    // Dynamic Context-Aware Intelligent Fallback Engine
    const normalized = message.toLowerCase();
    let dynamicReply = "";

    if (normalized.includes("forestry") || normalized.includes("forest") || normalized.includes("tree") || normalized.includes("mangrove")) {
      dynamicReply = "We have 2 premium Forestry and Blue Carbon projects active:\n• **Mahanadi Mangrove Restoration** (Odisha) – ₹320/t (99% Trust Score, ACVA Verified)\n• **Western Ghats Community Agroforestry** (Maharashtra) – ₹360/t (97% Trust Score)\nBoth feature continuous Sentinel-2 satellite canopy monitoring.";
    } else if (normalized.includes("biogas") || normalized.includes("stubble") || normalized.includes("methane") || normalized.includes("agriculture")) {
      dynamicReply = "Our leading Agricultural Biogas project is the **Malwa Agricultural Biogas Hub** in Punjab at **₹295/t** (95% Trust Score). It directly abates open-field stubble burning and provides organic fertilizer co-benefits to local farmer collectives.";
    } else if (normalized.includes("300") || normalized.includes("cheap") || normalized.includes("lowest") || normalized.includes("budget") || normalized.includes("price")) {
      dynamicReply = "Here are our verified credits priced under ₹300/tonne:\n1. **Thar Desert Solar Harvest** (Rajasthan) – **₹260/t**\n2. **Kutch Coastal Wind Farm** (Gujarat) – **₹275/t**\n3. **Malwa Agricultural Biogas Hub** (Punjab) – **₹295/t**\nAll batches are registry-held with instant escrow settlement.";
    } else if (normalized.includes("escrow") || normalized.includes("safe") || normalized.includes("payment") || normalized.includes("settle")) {
      dynamicReply = "EcoVault's 4-Stage Escrow eliminates counterparty risk:\n1. Buyer locks funds in institutional escrow.\n2. National Registry quarantines the specific GCI serial batch.\n3. Satellite telemetry confirms project additionality.\n4. Funds release to developer upon permanent retirement certificate issuance.";
    } else if (normalized.includes("acva") || normalized.includes("audit") || normalized.includes("verification") || normalized.includes("greenwash")) {
      dynamicReply = "ACVA (**Accredited Carbon Verification Agency**) is our independent third-party audit protocol. It combines ground soil core telemetry with Sentinel-2 Lidar satellite scans, ensuring zero double-counting and 100% additionality for SEBI BRSR audits.";
    } else if (normalized.includes("brsr") || normalized.includes("sebi") || normalized.includes("compliance") || normalized.includes("reporting")) {
      dynamicReply = "All EcoVault retirement certificates include immutable GCI serial hashes, geo-coordinates, and vintage tracking tailored directly for SEBI BRSR Core Principle 6 (Environment) disclosures and ISO 14064 compliance.";
    } else {
      dynamicReply = `Based on current market liquidity, EcoVault lists 6 verified Indian projects spanning Blue Carbon, Agroforestry, Biogas, and Renewables (₹260 to ₹360/t). You can filter projects by vintage or initiate direct escrow-backed purchase negotiations.`;
    }

    return NextResponse.json({ reply: dynamicReply });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
