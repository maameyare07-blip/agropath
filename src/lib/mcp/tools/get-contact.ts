import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact",
  title: "Get contact information",
  description:
    "Return public contact and social channels for Mohamed Mohamud SH Hassan, including email, phone, WhatsApp, and blog.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const contact = {
      email: "maameyare07@gmail.com",
      phone: "+252612330512",
      whatsapp: "+252612330512",
      blog: "https://pathosolutions.blogspot.com",
      website: "https://agropath.lovable.app",
      location: "Somalia",
      inquiryTypes: [
        "Research collaboration",
        "Consulting",
        "Speaking / training",
        "Media / press",
        "General inquiry",
      ],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
      structuredContent: contact,
    };
  },
});
