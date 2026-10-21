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
import { BulkActionBar } from "./BulkActionBar";
import { ProjectsEmpty } from "./ProjectsEmpty";
import { ProjectsGrid } from "./ProjectsGrid";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsPagination } from "./ProjectsPagination";
import { ProjectsTable } from "./ProjectsTable";
import { ProjectsToolbar, type ViewMode } from "./ProjectsToolbar";

export function ProjectsView() {
  const [projects, setProjects] = React.useState<Project[]>(INITIAL_PROJECTS);
  const [filters, setFilters] = React.useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = React.useState<SortKey>("due-asc");
  const [view, setView] = React.useState<ViewMode>("list");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(6);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

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
      <ProjectsHeader total={live.length} />

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
    </div>
  );
}
