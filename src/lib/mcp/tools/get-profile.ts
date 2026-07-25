import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description:
    "Return the professional profile of Mohamed Mohamud SH Hassan: name, brand, title, summary, and areas of expertise.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const profile = {
      name: "Mohamed Mohamud SH Hassan",
      brand: "AgroPath",
      titles: [
        "Plant Pathology Specialist",
        "Seed Inspector",
        "Founder & CEO of PathoSolutions",
      ],
      tagline: "Advancing Sustainable Agriculture Through Science",
      summary:
        "Plant pathology specialist and seed inspector working at the intersection of research, regulation, and farmer support. Focus areas include seed quality assurance, plant disease diagnostics, integrated pest management, and climate-smart agriculture, with a mission aligned to UN SDG 2 (Zero Hunger) and African agricultural transformation.",
      expertise: [
        "Plant Pathology & Diagnostics",
        "Seed Inspection & Certification",
        "Integrated Pest Management (IPM)",
        "Climate-Smart Agriculture",
        "Agricultural Research & Extension",
      ],
      website: "https://agropath.lovable.app",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(profile, null, 2) }],
      structuredContent: profile,
    };
  },
});
