import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { beforeEach, expect, it, vi } from "vitest";
import AdminLayout from "@/components/admin/AdminLayout";
import { FarmerLangProvider } from "@/lib/farmerI18n";
const mocks = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth: { getUser: async () => ({ data: { user: { id: "farmer-id" } }, error: null }), onAuthStateChange: () => ({ data: { subscription: { unsubscribe: vi.fn() } } }) }, rpc: mocks.rpc } }));
const show = () => render(<HelmetProvider><FarmerLangProvider><MemoryRouter initialEntries={["/admin/subscribers"]}><Routes><Route path="/admin" element={<AdminLayout />}><Route path="subscribers" element={<div>Private subscriber records</div>} /></Route></Routes></MemoryRouter></FarmerLangProvider></HelmetProvider>);
beforeEach(() => { vi.clearAllMocks(); });
it("blocks a signed-in farmer without the admin role", async () => {
  mocks.rpc.mockResolvedValue({ data: false, error: null }); show();
  await screen.findByText("Admin access required");
  expect(screen.queryByText("Private subscriber records")).toBeNull();
  expect(mocks.rpc).toHaveBeenCalledWith("has_role", { _user_id: "farmer-id", _role: "admin" });
});
it("shows private management only after the server confirms admin", async () => {
  mocks.rpc.mockResolvedValue({ data: true, error: null }); show();
  await waitFor(() => expect(screen.getByText("Private subscriber records")).not.toBeNull());
});