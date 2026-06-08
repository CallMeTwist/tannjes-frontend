import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AuthShell from "@/components/patient/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePatientAuth } from "@/hooks/usePatientAuth";
import { useDepartments } from "@/hooks/useDepartments";

const Register = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const departmentSlug = params.get("department") ?? "";
  const departments = useDepartments();
  const departmentName = departments.find((d) => d.slug === departmentSlug)?.name;
  const { register } = usePatientAuth();

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({ ...form, department_slug: departmentSlug || undefined });
      navigate("/patient/pay");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your patient account"
      subtitle="It takes less than a minute."
      badge={departmentName ? `Consulting: ${departmentName}` : undefined}
      footer={<>Already registered? <Link to="/patient/login" className="font-semibold text-brand-pink">Sign in</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <p className="mt-1 text-xs text-muted-foreground">At least 8 characters.</p>
        </div>
        {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full bg-brand-pink hover:bg-brand-pink/90">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create account
        </Button>
      </form>
    </AuthShell>
  );
};

export default Register;
