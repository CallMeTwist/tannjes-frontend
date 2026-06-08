import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  clearToken, fetchMe, getToken, loginPatient, logoutPatient, registerPatient, setToken,
  type PatientProfile,
} from "@/lib/patientApi";

type AuthState = {
  patient: PatientProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<PatientProfile>;
  register: (input: { name: string; email: string; phone?: string; password: string; department_slug?: string }) => Promise<PatientProfile>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const PatientAuthContext = createContext<AuthState | null>(null);

export const PatientAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!getToken()) {
      setPatient(null);
      setLoading(false);
      return;
    }
    try {
      setPatient(await fetchMe());
    } catch {
      clearToken();
      setPatient(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const { token, patient } = await loginPatient(email, password);
    setToken(token);
    setPatient(patient);
    return patient;
  }, []);

  const register = useCallback<AuthState["register"]>(async (input) => {
    const { token, patient } = await registerPatient(input);
    setToken(token);
    setPatient(patient);
    return patient;
  }, []);

  const logout = useCallback(async () => {
    await logoutPatient();
    setPatient(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({ patient, loading, isAuthenticated: !!patient, login, register, logout, refresh }),
    [patient, loading, login, register, logout, refresh],
  );

  return <PatientAuthContext.Provider value={value}>{children}</PatientAuthContext.Provider>;
};

export const usePatientAuth = (): AuthState => {
  const ctx = useContext(PatientAuthContext);
  if (!ctx) throw new Error("usePatientAuth must be used within PatientAuthProvider");
  return ctx;
};
