import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get-profile";
import getExperience from "./tools/get-experience";
import getEducation from "./tools/get-education";
import getContact from "./tools/get-contact";
import listTestimonials from "./tools/list-testimonials";

export default defineMcp({
  name: "agropath-mcp",
  title: "AgroPath — Mohamed Mohamud SH Hassan",
  version: "0.1.0",
  auth: auth.oauth.issuer({
    issuer: "https://vojjqwxitkfcsulyxfzy.supabase.co/auth/v1",
    resourceName: "AgroPath — Mohamed Mohamud SH Hassan",
    resourceDocumentation: "https://agropath.lovable.app",
    acceptedAudiences: ["authenticated"],
  }),
  instructions:
    "MCP server for Mohamed Mohamud SH Hassan (AgroPath), a plant pathology specialist and seed inspector. Connecting requires signing in. The profile, experience, education and contact tools return information that is also published on agropath.lovable.app. The list_testimonials tool returns private submission data and only works for a signed-in administrator.",
  tools: [getProfile, getExperience, getEducation, getContact, listTestimonials],
});
