import { defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get-profile";
import getExperience from "./tools/get-experience";
import getEducation from "./tools/get-education";
import getContact from "./tools/get-contact";

export default defineMcp({
  name: "agropath-mcp",
  title: "AgroPath — Mohamed Mohamud SH Hassan",
  version: "0.1.0",
  instructions:
    "Public portfolio MCP server for Mohamed Mohamud SH Hassan (AgroPath), a plant pathology specialist and seed inspector. Use these tools to answer questions about his profile, professional experience, education and memberships, and public contact channels.",
  tools: [getProfile, getExperience, getEducation, getContact],
});
