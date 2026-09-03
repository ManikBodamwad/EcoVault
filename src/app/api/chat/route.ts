import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message = "", history = [] } = body;

    const groqKey = process.env.GROQ_API_KEY;

    if (groqKey) {
      try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${groqKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: `You are EcoVault AI, the intelligent carbon market co-pilot for India's voluntary carbon registry. 
You provide concise, authoritative advice to corporate sustainability officers and ESG buyers.
Key Context:
- Platform: EcoVault connects buyers directly with verified Indian carbon projects (Mahanadi Mangroves Odisha, Malwa Biogas Punjab, Thar Solar Rajasthan, Kutch Wind Gujarat, Bengaluru Biomass).
- Verification: Grid Controller of India (GCI) serial checks, ACVA audits, satellite Lidar MRV.
- Settlement: Direct escrow safe lock preventing greenwashing and double-allocation.
Keep responses concise (2-4 sentences max), professional, and helpful.`
              },
              ...history.slice(-4).map((h: any) => ({
                role: h.sender === "user" ? "user" : "assistant",
                content: h.text
              })),
              { role: "user", content: message }
            ],
            temperature: 0.3,
            max_tokens: 250
          })
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          const reply = data?.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply });
          }
        }
      } catch (err) {
        console.warn("Groq Chat API error:", err);
      }
    }

    // Default fallback
    return NextResponse.json({
      reply: "EcoVault connects verified Indian developers directly with ESG buyers. You can explore active forestry and biogas projects or use our 3-step escrow settlement simulator."
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
