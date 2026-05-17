'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Kontaktformular — sendet direkt an Formspree.
 * Endpoint wird per NEXT_PUBLIC_FORMSPREE_ENDPOINT eingespielt.
 * Honeypot-Feld `website` muss leer bleiben.
 */

const TOPICS: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'individuell', label: 'Individuell · Anfrage' },
  { value: 'shop', label: 'Shop · Bestellung / Frage' },
  { value: 'presse', label: 'Presse' },
  { value: 'sonstiges', label: 'Sonstiges' },
];

type FieldErrors = Partial<Record<'name' | 'email' | 'message' | 'consent', string>>;
type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string; errors?: FieldErrors };

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();
  const consent = data.get('consent');

  if (name.length < 2) errors.name = 'Bitte Namen angeben.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Bitte gültige E-Mail-Adresse angeben.';
  if (message.length < 10) errors.message = 'Bitte mindestens 10 Zeichen schreiben.';
  if (!consent) errors.consent = 'Bitte der Verarbeitung zustimmen.';
  return errors;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (String(data.get('website') ?? '').length > 0) {
      setStatus({ kind: 'success', message: 'Danke — wir melden uns.' });
      form.reset();
      return;
    }

    const errors = validate(data);
    if (Object.keys(errors).length > 0) {
      setStatus({ kind: 'error', message: 'Bitte Eingaben prüfen.', errors });
      return;
    }

    if (!ENDPOINT) {
      setStatus({
        kind: 'error',
        message:
          'Formular ist noch nicht konfiguriert. Bitte schreiben Sie uns direkt per E-Mail.',
      });
      return;
    }

    setStatus({ kind: 'submitting' });
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (res.ok) {
        setStatus({
          kind: 'success',
          message: 'Danke — Ihre Nachricht ist angekommen. Wir antworten in der Regel innerhalb eines Werktags.',
        });
        form.reset();
      } else {
        setStatus({
          kind: 'error',
          message: 'Versand fehlgeschlagen. Bitte schreiben Sie uns direkt per E-Mail.',
        });
      }
    } catch {
      setStatus({
        kind: 'error',
        message: 'Versand fehlgeschlagen. Bitte schreiben Sie uns direkt per E-Mail.',
      });
    }
  }

  const errors = status.kind === 'error' ? status.errors : undefined;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Field name="name" label="Name" required autoComplete="name" error={errors?.name} />
      <Field
        name="email"
        type="email"
        label="E-Mail"
        required
        autoComplete="email"
        error={errors?.email}
      />
      <SelectField name="topic" label="Anliegen" options={TOPICS} defaultValue="sonstiges" />
      <TextAreaField name="message" label="Nachricht" required rows={6} error={errors?.message} />

      {/* Honeypot — visuell, aber nicht semantisch versteckt. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website (bitte leer lassen)
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <CheckboxField name="consent" error={errors?.consent} />

      <StatusMessage status={status} />

      <Submit pending={status.kind === 'submitting'} />
    </form>
  );
}

// ---------------------------------------------------------------------------
// Felder
// ---------------------------------------------------------------------------

function Field({
  name,
  label,
  type = 'text',
  required,
  autoComplete,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="text-eyebrow uppercase tracking-[0.12em] text-ink/55">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        className={cn(
          'mt-2 block w-full border-b bg-transparent px-0 py-3 font-display text-[16px] text-ink',
          'transition-colors duration-slow ease-quiet placeholder:text-ink/40',
          'focus:outline-none focus:ring-0',
          error ? 'border-ink' : 'border-ink/25 focus:border-ink',
        )}
      />
      {error && (
        <p id={errId} className="mt-2 text-[13px] text-ink">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
  defaultValue,
  error,
}: {
  name: string;
  label: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  defaultValue?: string;
  error?: string;
}) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="text-eyebrow uppercase tracking-[0.12em] text-ink/55">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        className={cn(
          'mt-2 block w-full border-b bg-transparent px-0 py-3 font-display text-[16px] text-ink',
          'transition-colors duration-slow ease-quiet',
          'focus:outline-none focus:ring-0',
          error ? 'border-ink' : 'border-ink/25 focus:border-ink',
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errId} className="mt-2 text-[13px] text-ink">
          {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  name,
  label,
  rows = 5,
  required,
  error,
}: {
  name: string;
  label: string;
  rows?: number;
  required?: boolean;
  error?: string;
}) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="text-eyebrow uppercase tracking-[0.12em] text-ink/55">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        className={cn(
          'mt-2 block w-full resize-none border bg-transparent p-4 font-sans text-[16px] text-ink',
          'transition-colors duration-slow ease-quiet placeholder:text-ink/40',
          'focus:outline-none focus:ring-0',
          error ? 'border-ink' : 'border-ink/25 focus:border-ink',
        )}
      />
      {error && (
        <p id={errId} className="mt-2 text-[13px] text-ink">
          {error}
        </p>
      )}
    </div>
  );
}

function CheckboxField({ name, error }: { name: string; error?: string }) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 text-[14px] text-ink/80">
        <input
          id={id}
          type="checkbox"
          name={name}
          required
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errId : undefined}
          className="mt-0.5 size-4 accent-ink"
        />
        <span>
          Ich willige in die Verarbeitung meiner Angaben zur Bearbeitung meiner
          Anfrage ein. Details in der{' '}
          <a href="/datenschutz" className="link-underline">
            Datenschutzerklärung
          </a>
          . *
        </span>
      </label>
      {error && (
        <p id={errId} className="mt-2 text-[13px] text-ink">
          {error}
        </p>
      )}
    </div>
  );
}

function StatusMessage({ status }: { status: Status }) {
  if (status.kind === 'idle' || status.kind === 'submitting') return null;
  const isSuccess = status.kind === 'success';
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'border p-4 text-[14px]',
        isSuccess ? 'border-ink bg-stone text-ink' : 'border-ink/40 bg-paper text-ink',
      )}
    >
      {status.message}
    </div>
  );
}

function Submit({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'inline-flex h-14 items-center justify-center gap-3 px-8',
        'bg-ink text-paper font-display text-[14px] uppercase tracking-[0.08em] font-medium',
        'transition-colors duration-slow ease-quiet hover:bg-graphite',
        'disabled:cursor-wait disabled:opacity-60',
      )}
    >
      {pending ? 'Wird gesendet…' : 'Nachricht senden'}
      <ArrowUpRight className="size-4" />
    </button>
  );
}
