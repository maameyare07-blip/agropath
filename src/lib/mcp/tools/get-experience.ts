import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_experience",
  title: "Get professional experience",
  description:
    "Return the professional experience timeline for Mohamed Mohamud SH Hassan, including roles, organizations, dates, and key achievements.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const experience = [
      {
        title: "Seed Inspector",
        organization:
          "Somali Agricultural Regulatory and Inspection Services (SARIS)",
        period: "September 2025 – Present",
        current: true,
        achievements: [
          "Certified seed varieties for national distribution",
          "Ensured regulatory compliance with international phytosanitary standards",
          "Performed field and laboratory quality assessments for seed integrity",
          "Provided strategic advisory to the Ministry of Agriculture on seed policy",
        ],
      },
      {
        title: "Founder & CEO",
        organization: "PathoSolutions",
        period: "2024 – Present",
        current: true,
        achievements: [
          "Scaled agricultural innovation platform to 500+ farmers served",
          "Developed and managed an agricultural blog and knowledge platform",
          "Cultivated strategic partnerships with international organizations",
          "Promoted evidence-based plant disease management solutions",
        ],
      },
      {
        title: "Lecturer & Research Supervisor",
        organization: "Afgoye International University, Somalia",
        period: "April 2025 – September 2025",
        current: false,
        achievements: [
          "Mentored 2+ students in plant pathology and crop protection",
          "Supervised student research projects in sustainable agriculture",
          "Modernized curriculum to align with global agricultural standards",
          "Introduced evidence-based teaching methodologies",
        ],
      },
    ];
    return {
      content: [{ type: "text", text: JSON.stringify(experience, null, 2) }],
      structuredContent: { experience },
    };
  },
});
