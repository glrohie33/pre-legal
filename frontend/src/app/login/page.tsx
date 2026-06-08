"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Tab = "login" | "register";

interface FormState {
  email: string;
  password: string;
}

const EMPTY: FormState = { email: "", password: "" };
const API = "http://localhost:8000";

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = tab === "login" ? "/auth/login" : "/auth/register";

    try {
      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail ?? "Something went wrong");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    } catch {
      setError("Could not connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Pre-Legal</span>
          <h1 className={styles.heading}>Legal documents, simplified.</h1>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === "login" ? styles.tabActive : ""}`}
            onClick={() => { setTab("login"); setError(""); }}
            type="button"
          >
            Sign in
          </button>
          <button
            className={`${styles.tab} ${tab === "register" ? styles.tabActive : ""}`}
            onClick={() => { setTab("register"); setError(""); }}
            type="button"
          >
            Create account
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Email address</label>
            <input
              className={styles.input}
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              value={form.password}
              onChange={set("password")}
              placeholder="••••••••"
              required
              autoComplete={tab === "login" ? "current-password" : "new-password"}
              minLength={8}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.submit} type="submit" disabled={loading}>
            {loading ? "Please wait…" : tab === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
