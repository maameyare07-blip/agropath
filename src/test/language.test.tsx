import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, expect, it } from "vitest";
import { FarmerLangProvider, useFarmerLang } from "@/lib/farmerI18n";

beforeEach(() => { localStorage.clear(); });

it("persists Somali as the shared site language", async () => {
  const { result } = renderHook(useFarmerLang, { wrapper: FarmerLangProvider });
  act(() => result.current.setLang("so"));
  await waitFor(() => expect(localStorage.getItem("site-lang")).toBe("so"));
  expect(document.documentElement.lang).toBe("so");
  expect(document.documentElement.dir).toBe("ltr");
});

it("uses right-to-left direction for the Arabic version", async () => {
  const { result } = renderHook(useFarmerLang, { wrapper: FarmerLangProvider });
  act(() => result.current.setLang("ar"));
  await waitFor(() => expect(document.documentElement.dir).toBe("rtl"));
  expect(document.documentElement.lang).toBe("ar");
  expect(localStorage.getItem("site-lang")).toBe("ar");
});