import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_education",
  title: "Get education and memberships",
  description:
    "Return academic credentials and professional memberships for Mohamed Mohamud SH Hassan.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const data = {
      education: [
        {
          degree: "MSc in Plant Pathology",
          institution: "Lovely Professional University (LPU), India",
        },
        {
          degree: "BSc in Agriculture",
          institution:
            "International University of Business Agriculture and Technology (IUBAT), Bangladesh",
        },
      ],
      memberships: [
        {
          organization: "FAO e-Agriculture Community",
          role: "Member",
          description:
            "Global community of practice on ICT for sustainable agriculture and rural development, hosted by the Food and Agriculture Organization of the United Nations.",
        },
      ],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    };
  },
});
