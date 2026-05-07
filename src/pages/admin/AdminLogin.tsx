import { useState, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Coffee, Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const ADMIN_EMAIL = "admin@kopinusantara.id";
const ADMIN_PASSWORD = "admin123";

export default function AdminLogin() {
  const { state, dispatch } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (state.authed) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a slight delay for UX
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        dispatch({ type: "LOGIN" });
      } else {
        setError("Email atau password salah. Silakan coba lagi.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, hsl(var(--gold)) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--espresso)) 0%, transparent 50%)",
        }}
      />

      <div className="w-full max-w-sm relative">
        {/* Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-[0_4px_32px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Gold accent top */}
          <div className="h-1 w-full" style={{ background: "var(--gradient-gold)" }} />

          <div className="px-8 py-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ background: "var(--gradient-gold)" }}
              >
                <Coffee size={20} className="text-espresso" />
              </div>
              <h1 className="font-display text-gray-900 text-2xl">Kopi Nusantara</h1>
              <p className="font-ui text-sm text-gray-400 tracking-widest uppercase mt-1">Admin Panel</p>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-ui text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@kopinusantara.id"
                    required
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg font-ui text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-amber-400 focus:bg-white transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-ui text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg font-ui text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-amber-400 focus:bg-white transition-colors duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg font-ui text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                style={{ background: "var(--gradient-gold)", color: "hsl(var(--espresso))" }}
              >
                {loading ? "Memverifikasi..." : "Masuk ke Dashboard"}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center font-ui text-xs text-gray-400 mt-4">
          © {new Date().getFullYear()} Kopi Nusantara
        </p>
      </div>
    </div>
  );
}
