"use client";

import * as React from "react";
import {
  Bookmark,
  CalendarCheck2,
  CalendarDays,
  FolderPlus,
  KeyRound,
  Rocket,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { AccentPicker } from "@/components/ui/AccentPicker";
import {
  clearDraft,
  defaultValues,
  deriveKey,
  DESCRIPTION_MAX,
  loadDraft,
  sanitizeKey,
  saveDraft,
  validate,
  type FormErrors,
  type NewProjectValues,
} from "./create-project-modal";
import {
  ICON_OPTIONS,
  OWNER_OPTIONS,
  PRIORITY_OPTIONS,
  STAGE_OPTIONS,
  TEMPLATE_OPTIONS,
} from "./create-project-options";
import { controlClass, Field } from "@/components/ui/FormField";
import { SelectMenu } from "@/components/ui/SelectMenu";
import { TeamMembersField } from "./team-members-field";

const FIELD_IDS = {
  name: "cp-name",
  key: "cp-key",
  owner: "cp-owner",
  deadline: "cp-deadline",
} as const;
const dateInput = cn(
  controlClass,
  "pl-9 [color-scheme:light] dark:[color-scheme:dark]",
);

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (values: NewProjectValues) => void;
  onDraftSaved?: () => void;
};

export function CreateProjectDialog({
  open,
  onOpenChange,
  onCreate,
  onDraftSaved,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[620px]">
        {/* The form mounts only while open, so every open starts fresh (or from a saved draft) */}
        <CreateProjectForm
          onClose={() => onOpenChange(false)}
          onCreate={onCreate}
          onDraftSaved={onDraftSaved}
        />
      </DialogContent>
    </Dialog>
  );
}

function CreateProjectForm({
  onClose,
  onCreate,
  onDraftSaved,
}: {
  onClose: () => void;
  onCreate: (values: NewProjectValues) => void;
  onDraftSaved?: () => void;
}) {
  const [draft] = React.useState(() => loadDraft());
  const [values, setValues] = React.useState<NewProjectValues>(
    () => draft?.values ?? defaultValues(),
  );
  const [keyTouched, setKeyTouched] = React.useState(
    draft?.keyTouched ?? false,
  );
  const [errors, setErrors] = React.useState<FormErrors>({});

  const set = <K extends keyof NewProjectValues>(
    field: K,
    value: NewProjectValues[K],
  ) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => (field in e ? { ...e, [field]: undefined } : e));
  };

  const onName = (name: string) => {
    setValues((v) => ({
      ...v,
      name,
      key: keyTouched ? v.key : deriveKey(name),
    }));
    setErrors((e) => ({
      ...e,
      name: undefined,
      ...(keyTouched ? {} : { key: undefined }),
    }));
  };
  const onKey = (raw: string) => {
    const key = sanitizeKey(raw);
    setKeyTouched(key.length > 0); // clearing the field hands control back to auto-generation
    setValues((v) => ({ ...v, key: key || deriveKey(v.name) }));
    setErrors((e) => ({ ...e, key: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length) {
      setErrors(found);
      const first = (Object.keys(FIELD_IDS) as (keyof typeof FIELD_IDS)[]).find(
        (k) => found[k],
      );
      if (first) document.getElementById(FIELD_IDS[first])?.focus();
      return;
    }
    onCreate(values);
    clearDraft();
    onClose();
  };

  const saveAsDraft = () => {
    saveDraft({ values, keyTouched });
    onDraftSaved?.();
    onClose();
  };

  const describe = (id: string, key: keyof FormErrors) =>
    `${id}-${errors[key] ? "error" : "hint"}`;

  return (
    <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col bg-card">
      {/* Header */}
      <div className="px-5 pt-6 pr-14 pb-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-ink">
            <FolderPlus className="size-[18px]" aria-hidden />
          </span>
          <DialogTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
            Create New Project
          </DialogTitle>
        </div>
        <DialogDescription className="mt-2 max-w-sm text-sm">
          Set up a project, define timeline milestones, and invite your team.
        </DialogDescription>
      </div>

      {/* Scrollable body */}
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 pt-1 pb-6 sm:px-6">
        <Field
          id="cp-name"
          htmlFor="cp-name"
          label="Project Name"
          required
          error={errors.name}
          hint="A concise name for your project repository and team workspace."
          aside={
            <span className="font-mono text-[11px] text-muted-foreground">
              Required
            </span>
          }
        >
          <input
            id="cp-name"
            value={values.name}
            onChange={(e) => onName(e.target.value)}
            placeholder="e.g. Customer Portal V2"
            maxLength={80}
            autoComplete="off"
            aria-required
            aria-invalid={!!errors.name || undefined}
            aria-describedby={describe("cp-name", "name")}
            className={cn(controlClass, "border-brand/30 bg-card")}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-[1fr_1.35fr_1fr]">
          <Field
            id="cp-key"
            htmlFor="cp-key"
            label="Project Key"
            required
            error={errors.key}
          >
            <div className="relative">
              <KeyRound
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                id="cp-key"
                value={values.key}
                onChange={(e) => onKey(e.target.value)}
                placeholder="CPV2"
                autoComplete="off"
                spellCheck={false}
                aria-required
                aria-invalid={!!errors.key || undefined}
                aria-describedby={errors.key ? "cp-key-error" : undefined}
                className={cn(controlClass, "pl-9 font-mono uppercase bg-primary-95")}
              />
            </div>
          </Field>

          <Field id="cp-accent" label="Theme Accent">
            <AccentPicker
              value={values.accent}
              onChange={(v) => set("accent", v)}
              labelledBy="cp-accent-label"
            />
          </Field>

          <Field id="cp-icon" htmlFor="cp-icon" label="Project Icon">
            <SelectMenu
              id="cp-icon"
              value={values.icon}
              options={ICON_OPTIONS}
              onChange={(v) => set("icon", v)}
              chevron="updown"
            />
          </Field>
        </div>

        <Field
          id="cp-description"
          htmlFor="cp-description"
          label="Description"
          hint={`Max ${DESCRIPTION_MAX} characters. Summarize the core mission for cross-team visibility.`}
          aside={
            <span
              className="font-mono text-[11px] text-muted-foreground"
              aria-live="polite"
            >
              {values.description.length} / {DESCRIPTION_MAX}
            </span>
          }
        >
          <textarea
            id="cp-description"
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            maxLength={DESCRIPTION_MAX}
            rows={3}
            aria-describedby="cp-description-hint"
            className={cn(
              controlClass,
              "h-auto min-h-20 resize-none py-2.5 leading-relaxed bg-primary-95",
            )}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="cp-template"
            htmlFor="cp-template"
            label="Project Template"
          >
            <SelectMenu
              id="cp-template"
              value={values.template}
              options={TEMPLATE_OPTIONS}
              onChange={(v) => set("template", v)}
            />
          </Field>
          <Field
            id="cp-priority"
            htmlFor="cp-priority"
            label="Priority"
            required
          >
            <SelectMenu
              id="cp-priority"
              value={values.priority}
              options={PRIORITY_OPTIONS}
              onChange={(v) => set("priority", v)}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-[1fr_1.35fr]">
          <Field
            id="cp-owner"
            htmlFor="cp-owner"
            label="Project Owner"
            required
            error={errors.owner}
          >
            <SelectMenu
              id="cp-owner"
              value={values.owner}
              options={OWNER_OPTIONS}
              onChange={(v) => set("owner", v)}
              chevron="updown"
              invalid={!!errors.owner}
              describedBy={errors.owner ? "cp-owner-error" : undefined}
            />
          </Field>
          <Field id="cp-team" label={`Team Members (${values.team.length})`}>
            <TeamMembersField
              value={values.team}
              onChange={(ids) => set("team", ids)}
              labelledBy="cp-team-label"
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field id="cp-stage" htmlFor="cp-stage" label="Lifecycle Stage">
            <SelectMenu
              id="cp-stage"
              value={values.stage}
              options={STAGE_OPTIONS}
              onChange={(v) => set("stage", v)}
            />
          </Field>
          <Field id="cp-start" htmlFor="cp-start" label="Start Date">
            <div className="relative">
              <CalendarDays
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                id="cp-start"
                type="date"
                value={values.startDate}
                onChange={(e) => set("startDate", e.target.value)}
                max={values.deadline || undefined}
                className={dateInput}
              />
            </div>
          </Field>
          <Field
            id="cp-deadline"
            htmlFor="cp-deadline"
            label="Target Deadline"
            error={errors.deadline}
          >
            <div className="relative">
              <CalendarCheck2
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                id="cp-deadline"
                type="date"
                value={values.deadline}
                onChange={(e) => set("deadline", e.target.value)}
                min={values.startDate || undefined}
                aria-invalid={!!errors.deadline || undefined}
                aria-describedby={
                  errors.deadline ? "cp-deadline-error" : undefined
                }
                className={dateInput}
              />
            </div>
          </Field>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-panel px-5 py-4 sm:px-6">
        <Button
          type="button"
          variant="ghost"
          onClick={saveAsDraft}
          className="h-10 gap-2 px-2 text-muted-foreground hover:text-foreground"
        >
          <Bookmark className="size-4" aria-hidden />
          Save as draft
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10 bg-card px-4"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-10 gap-2 bg-brand px-4 text-white hover:bg-brand/90"
          >
            <Rocket className="size-4" aria-hidden />
            Create Project
          </Button>
        </div>
      </div>
    </form>
  );
}
