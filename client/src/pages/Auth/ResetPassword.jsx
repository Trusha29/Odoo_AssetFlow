import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const passwordPattern = {
  length: /.{8,}/,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
};

const strengthLabel = (value) => {
  const checks = Object.values(passwordPattern).reduce(
    (count, regex) => (regex.test(value) ? count + 1 : count),
    0,
  );

  if (checks >= 4) return "Strong";
  if (checks >= 3) return "Medium";
  return "Weak";
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validatePassword = () => {
    if (!passwordPattern.length.test(password)) {
      setError("Password must be at least 8 characters.");
      return false;
    }
    if (!passwordPattern.upper.test(password)) {
      setError("Password must contain an uppercase letter.");
      return false;
    }
    if (!passwordPattern.lower.test(password)) {
      setError("Password must contain a lowercase letter.");
      return false;
    }
    if (!passwordPattern.number.test(password)) {
      setError("Password must contain a number.");
      return false;
    }
    if (!passwordPattern.special.test(password)) {
      setError("Password must contain a special character.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!validatePassword()) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitting(false);
    setSuccess("Your password has been reset successfully.");
    toast.success("Password reset completed.");
    setTimeout(() => navigate("/login"), 1200);
  };

  const strength = strengthLabel(password);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-md">
        <div className="card-surface p-8">
          <div className="mb-8 space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Reset password
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Set a new password
            </h1>
            <p className="text-sm text-slate-500">
              Enter your new password and confirm it to finish resetting.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-slate-700">
              New Password
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-indigo-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
              <p className="font-semibold">Password strength: {strength}</p>
            </div>

            <label className="block text-sm font-medium text-slate-700">
              Confirm Password
              <div className="relative mt-2">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-indigo-600"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            {error ? (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            ) : null}
            {success ? (
              <p className="text-sm font-medium text-emerald-700">{success}</p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
