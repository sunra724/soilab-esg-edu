"use client";

import { Mail, Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";

const inquiryTypes = ["교육 도입", "공동 개발", "실습 워크숍", "기타 문의"];

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    org: "",
    email: "",
    type: inquiryTypes[0],
    message: "",
  });

  const mailto = useMemo(() => {
    const subject = `[ESG 교육 실습 문의] ${form.type} - ${form.org || form.name || "문의"}`;
    const body = [
      `이름: ${form.name}`,
      `기관/소속: ${form.org}`,
      `이메일: ${form.email}`,
      `문의 유형: ${form.type}`,
      "",
      form.message,
    ].join("\n");

    return `mailto:soilabcoop@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [form]);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = mailto;
  }

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--ink)]">이름</span>
          <input
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="focus-ring min-h-12 rounded-[var(--radius-sm)] border border-[var(--border-md)] bg-[var(--surface)] px-4 text-[var(--ink)]"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--ink)]">기관/소속</span>
          <input
            value={form.org}
            onChange={(event) => update("org", event.target.value)}
            className="focus-ring min-h-12 rounded-[var(--radius-sm)] border border-[var(--border-md)] bg-[var(--surface)] px-4 text-[var(--ink)]"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--ink)]">이메일</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            className="focus-ring min-h-12 rounded-[var(--radius-sm)] border border-[var(--border-md)] bg-[var(--surface)] px-4 text-[var(--ink)]"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--ink)]">문의 유형</span>
          <select
            value={form.type}
            onChange={(event) => update("type", event.target.value)}
            className="focus-ring min-h-12 rounded-[var(--radius-sm)] border border-[var(--border-md)] bg-[var(--surface)] px-4 text-[var(--ink)]"
          >
            {inquiryTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[var(--ink)]">문의 내용</span>
        <textarea
          required
          rows={7}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          className="focus-ring resize-y rounded-[var(--radius-sm)] border border-[var(--border-md)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)]"
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="ko-readable text-sm text-[var(--ink-mid)]">
          서버 저장 없이 메일 앱으로 연결됩니다. 입력 내용은 브라우저에서만 메일 본문으로
          변환됩니다.
        </p>
        <Button type="submit" className="sm:min-w-36">
          <Send size={17} aria-hidden="true" />
          메일 작성
        </Button>
      </div>
      <a
        href="mailto:soilabcoop@gmail.com"
        className="focus-ring inline-flex w-fit items-center gap-2 rounded-[var(--radius-sm)] text-sm font-semibold text-[var(--green-800)] hover:text-[var(--green-900)]"
      >
        <Mail size={16} aria-hidden="true" />
        soilabcoop@gmail.com
      </a>
    </form>
  );
}
