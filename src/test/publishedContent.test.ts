import { expect, it } from "vitest";
import { safeContentUrl } from "@/lib/publishedContent";
it("permits chapter paths and HTTPS publication links", () => {
  expect(safeContentUrl("/__l5e/chapter.pdf")).toBe("/__l5e/chapter.pdf");
  expect(safeContentUrl("https://example.com/article")).toBe("https://example.com/article");
});
it("rejects executable and protocol-relative content links", () => {
  expect(safeContentUrl("javascript:alert(1)")).toBeUndefined();
  expect(safeContentUrl("//example.com")).toBeUndefined();
});