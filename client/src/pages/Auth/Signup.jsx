import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/useAuth.jsx";

const validateEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const passwordChecks = {
  length: /.{8,}/,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
};

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const passwordStrength = useMemo(() => {
    const score = Object.values(passwordChecks).reduce(
      (acc, regex) => (regex.test(password) ? acc + 1 : acc),
      0,
    );
    if (score >= 5) return "Strong";
    if (score >= 3) return "Medium";
    return "Weak";
  }, [password]);

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = "Full name is required.";
    else if (name.trim().length < 3)
      nextErrors.name = "Full name must be at least 3 characters.";
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!validateEmail(email))
      nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Password is required.";
    else {
      if (!passwordChecks.length.test(password))
        nextErrors.password = "Password must be at least 8 characters.";
      else if (!passwordChecks.upper.test(password))
        nextErrors.password = "Password must include an uppercase letter.";
      else if (!passwordChecks.lower.test(password))
        nextErrors.password = "Password must include a lowercase letter.";
      else if (!passwordChecks.number.test(password))
        nextErrors.password = "Password must include a number.";
      else if (!passwordChecks.special.test(password))
        nextErrors.password = "Password must include a special character.";
    }
    if (!confirmPassword)
      nextErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword)
      nextErrors.confirmPassword = "Passwords must match.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    if (!validate()) return;

    setSubmitting(true);
    try {
      await signup({ name, email, password });
      toast.success("Registration successful. Redirecting to login...");
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Sign up failed.";
      toast.error(message);
      setErrors({ form: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <ToastContainer position="top-right" />
      <div className="mx-auto max-w-md">
        <div className="card-surface p-8">
          <div className="mb-8 space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Get started
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Sign up for AssetFlow
            </h1>
            <p className="text-sm text-slate-500">
              Create an employee account to access the app.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <label className="block text-sm font-medium text-slate-700">
              Full Name
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              {errors.name ? (
                <p className="mt-2 text-sm font-medium text-rose-600">
                  {errors.name}
                </p>
              ) : null}
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              {errors.email ? (
                <p className="mt-2 text-sm font-medium text-rose-600">
                  {errors.email}
                </p>
              ) : null}
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Password
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-24 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password ? (
                <p className="mt-2 text-sm font-medium text-rose-600">
                  {errors.password}
                </p>
              ) : null}
            </label>

            <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
              <p className="font-semibold">
                Password Strength: {passwordStrength}
              </p>
            </div>

            <label className="block text-sm font-medium text-slate-700">
              Confirm Password
              <div className="relative mt-2">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-24 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword ? (
                <p className="mt-2 text-sm font-medium text-rose-600">
                  {errors.confirmPassword}
                </p>
              ) : null}
            </label>

            {errors.form ? (
              <p className="text-sm font-medium text-rose-600">{errors.form}</p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
