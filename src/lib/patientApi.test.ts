import { describe, expect, it, beforeEach } from "vitest";
import { getToken, setToken, clearToken, TOKEN_KEY } from "@/lib/patientApi";

describe("patient token storage", () => {
  beforeEach(() => localStorage.clear());

  it("stores and reads the token", () => {
    setToken("abc123");
    expect(getToken()).toBe("abc123");
    expect(localStorage.getItem(TOKEN_KEY)).toBe("abc123");
  });

  it("clears the token", () => {
    setToken("abc123");
    clearToken();
    expect(getToken()).toBeNull();
  });
});
