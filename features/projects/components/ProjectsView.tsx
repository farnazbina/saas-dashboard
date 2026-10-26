"use client";

import * as React from "react";

import {
  INITIAL_PROJECTS,
  type Project,
  type ProjectStatus,
} from "@/data/projects-data";
import {
  DEFAULT_FILTERS,
  filterProjects,
  sortProjects,
  type Filters,
  type SortKey,
} from "@/utils/projects-utils";
import { ActiveFilters, activeFilterCount } from "./ActiveFilters";
import { CreateProjectDialog } from "./CreateProjectDialog"
import { PEOPLE, type NewProjectValues } from "./CreateProjectModal"
import { BulkActionBar } from "./BulkActionBar";
import { ProjectsEmpty } from "./ProjectsEmpty";
import { ProjectsGrid } from "./ProjectsGrid";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsPagination } from "./ProjectsPagination";
import { ProjectsTable } from "./ProjectsTable";
import { ProjectsToolbar, type ViewMode } from "./ProjectsToolbar";
import { CircleCheck, X } from "lucide-react";

export function ProjectsView() {
  const [projects, setProjects] = React.useState<Project[]>(INITIAL_PROJECTS);
  const [filters, setFilters] = React.useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = React.useState<SortKey>("due-asc");
  const [view, setView] = React.useState<ViewMode>("list");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(6);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [createOpen, setCreateOpen] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 6000);
    return () => clearTimeout(t);
  }, [notice]);

  const live = React.useMemo(
    () => projects.filter((p) => !p.archived),
    [projects],
  );
  const owners = React.useMemo(
    () => [...new Set(live.map((p) => p.owner))].sort(),
    [live],
  );
  const filtered = React.useMemo(
    () => sortProjects(filterProjects(projects, filters), sort),
    [projects, filters, sort],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);
  const selectedCount = selected.size;

  /* ---- filters / sort (always return to page 1) ---- */
  const updateFilters = (patch: Partial<Filters>) => {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1);
  };
  const removeFilter = (key: keyof Filters) =>
    updateFilters({ [key]: DEFAULT_FILTERS[key] });
  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };
  const changeSort = (s: SortKey) => {
    setSort(s);
    setPage(1);
  };
  const changePageSize = (n: number) => {
    setPageSize(n);
    setPage(1);
  };

  /* ---- selection ---- */
  const toggleOne = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  const togglePage = (checked: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev);
      pageItems.forEach((p) => (checked ? next.add(p.id) : next.delete(p.id)));
      return next;
    });
  const clearSelection = () => setSelected(new Set());

  /* ---- bulk + single actions ---- */
  const patchSelected = (patch: (p: Project) => Project) =>
    setProjects((all) => all.map((p) => (selected.has(p.id) ? patch(p) : p)));

  const bulkStatus = (status: ProjectStatus) =>
    patchSelected((p) => ({ ...p, status }));
  const bulkOwner = (owner: string) =>
    patchSelected((p) => ({
      ...p,
      owner,
      team: p.team.includes(owner) ? p.team : [owner, ...p.team],
    }));
  const bulkArchive = () => {
    patchSelected((p) => ({ ...p, archived: true }));
    clearSelection();
  };
  const bulkDelete = () => {
    if (
      !window.confirm(
        `Delete ${selectedCount} selected project${selectedCount === 1 ? "" : "s"}? This can't be undone.`,
      )
    )
      return;
    setProjects((all) => all.filter((p) => !selected.has(p.id)));
    clearSelection();
  };
  const archiveOne = (id: string) => {
    setProjects((all) =>
      all.map((p) => (p.id === id ? { ...p, archived: true } : p)),
    );
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  /* ---- create ---- */
  const createProject = (v: NewProjectValues) => {
    const owner = PEOPLE.find((p) => p.id === v.owner);
    const ownerName = owner?.name ?? "Unassigned";
    const team = [
      ownerName,
      ...v.team
        .map((id) => PEOPLE.find((p) => p.id === id)?.name ?? "")
        .filter((n) => n && n !== ownerName),
    ];
    const project: Project = {
      id: `p-${Date.now()}`,
      name: v.name.trim(),
      description: v.description.trim() || "No description yet.",
      icon: v.icon,
      accent: v.accent,
      key: v.key,
      template: v.template,
      status: v.stage,
      priority: v.priority,
      owner: ownerName,
      team,
      progress: 0,
      tasksDone: 0,
      tasksTotal: 0,
      due: v.deadline,
      createdAt: Date.now(),
    };
    setProjects((all) => [project, ...all]);
    // Show it right away: clear filters, sort by newest, go to page 1
    setFilters(DEFAULT_FILTERS);
    setSort("due-asc");
    setPage(1);
    setNotice(`“${project.name}” was created and is shown first.`);
  };

  const pagination = (className?: string) => (
    <ProjectsPagination
      className={className}
      page={currentPage}
      totalPages={totalPages}
      total={filtered.length}
      from={filtered.length ? start + 1 : 0}
      to={start + pageItems.length}
      pageSize={pageSize}
      selectedCount={view === "list" ? selectedCount : 0}
      onPage={setPage}
      onPageSize={changePageSize}
    />
  );

  return (
    <div className="space-y-4 sm:space-y-5">
      <ProjectsHeader
        total={live.length}
        onCreate={() => setCreateOpen(true)}
      />

      {notice && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-xl border border-success/30 bg-success-soft px-4 py-2.5 text-sm text-success-ink"
        >
          <span className="flex items-center gap-2">
            <CircleCheck className="size-4 shrink-0" aria-hidden />
            {notice}
          </span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setNotice(null)}
            className="rounded p-0.5 hover:bg-black/10 focus-visible:ring-2 focus-visible:ring-current focus-visible:outline-none dark:hover:bg-white/10"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <ProjectsToolbar
        filters={filters}
        onFilters={updateFilters}
        owners={owners}
        sort={sort}
        onSort={changeSort}
        view={view}
        onView={setView}
      >
        {activeFilterCount(filters) > 0 && (
          <ActiveFilters
            filters={filters}
            onRemove={removeFilter}
            onClear={clearFilters}
          />
        )}
      </ProjectsToolbar>

      {view === "list" && selectedCount > 0 && (
        <BulkActionBar
          count={selectedCount}
          owners={owners}
          onStatus={bulkStatus}
          onOwner={bulkOwner}
          onArchive={bulkArchive}
          onDelete={bulkDelete}
          onClear={clearSelection}
        />
      )}

      {filtered.length === 0 ? (
        <ProjectsEmpty onClear={clearFilters} />
      ) : view === "list" ? (
        <ProjectsTable
          projects={pageItems}
          selected={selected}
          onToggle={toggleOne}
          onTogglePage={togglePage}
          sort={sort}
          onSort={changeSort}
          footer={pagination("border-t")}
        />
      ) : (
        <>
          <ProjectsGrid projects={pageItems} onArchive={archiveOne} />
          {pagination("rounded-2xl border bg-card shadow-xs")}
        </>
      )}

      <CreateProjectDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={createProject}
        onDraftSaved={() =>
          setNotice(
            "Draft saved. It will be restored the next time you create a project.",
          )
        }
      />
    </div>
  );
}
