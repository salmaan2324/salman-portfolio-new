"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Award, BriefcaseBusiness, FileImage, GraduationCap, LayoutDashboard, LogOut, Mail, Plus, Save, Settings, Share2, Shield, Sparkles, Trash2, Upload, Wrench, X } from "lucide-react";

type Row = { id: string; [key: string]: unknown };
type Field = { key: string; label: string; type?: "text" | "url" | "date" | "textarea" | "list" | "checkbox" | "select"; options?: string[]; required?: boolean };
type Tab = "overview" | "projects" | "categories" | "skills" | "experiences" | "education" | "services" | "certificates" | "socials" | "messages" | "media" | "settings";

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: BriefcaseBusiness },
  { id: "categories", label: "Categories", icon: Sparkles },
  { id: "skills", label: "Skills", icon: Shield },
  { id: "experiences", label: "Experience", icon: BriefcaseBusiness },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "services", label: "Services", icon: Wrench },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "socials", label: "Social links", icon: Share2 },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "media", label: "Media & CV", icon: FileImage },
  { id: "settings", label: "Site settings", icon: Settings },
];

const fields: Partial<Record<Tab, Field[]>> = {
  projects: [
    { key: "title", label: "Project title", required: true }, { key: "description", label: "Description", type: "textarea", required: true },
    { key: "category", label: "Category", type: "select", options: ["NETWORKING", "CCTV_SECURITY", "GRAPHIC_DESIGN", "E_COMMERCE", "ICT", "BUSINESS_PROJECTS"], required: true },
    { key: "featuredImage", label: "Featured image URL", type: "url" }, { key: "imageUrls", label: "Additional image URLs (one per line)", type: "list" },
    { key: "equipment", label: "Technologies or equipment (one per line)", type: "list" }, { key: "projectDate", label: "Project date", type: "date" },
    { key: "location", label: "Location (optional)" }, { key: "githubUrl", label: "GitHub URL", type: "url" }, { key: "liveUrl", label: "Live URL", type: "url" },
    { key: "isFeatured", label: "Featured project", type: "checkbox" }, { key: "isPublished", label: "Published publicly", type: "checkbox" },
  ],
  categories: [{ key: "name", label: "Category name", required: true }, { key: "slug", label: "URL slug (lowercase, hyphenated)", required: true }, { key: "sortOrder", label: "Sort order", type: "text" }],
  skills: [{ key: "name", label: "Skill name", required: true }, { key: "description", label: "Description", type: "textarea" }, { key: "categoryId", label: "Skill category", type: "select", required: true }, { key: "sortOrder", label: "Sort order" }],
  experiences: [
    { key: "title", label: "Job title", required: true }, { key: "company", label: "Company", required: true }, { key: "location", label: "Location", required: true },
    { key: "startDate", label: "Start date", type: "date", required: true }, { key: "endDate", label: "End date", type: "date" },
    { key: "isCurrent", label: "Current position", type: "checkbox" }, { key: "isTrainee", label: "Trainee / internship position", type: "checkbox" },
    { key: "responsibilities", label: "Responsibilities (one per line)", type: "list", required: true }, { key: "sortOrder", label: "Sort order" },
  ],
  education: [
    { key: "degree", label: "Degree", required: true }, { key: "institution", label: "Institution", required: true }, { key: "location", label: "Location", required: true },
    { key: "startDate", label: "Start date", type: "date", required: true }, { key: "endDate", label: "End date", type: "date" },
    { key: "details", label: "Details", type: "textarea" }, { key: "sortOrder", label: "Sort order" },
  ],
  services: [{ key: "title", label: "Service title", required: true }, { key: "description", label: "Description", type: "textarea", required: true }, { key: "isPublished", label: "Published publicly", type: "checkbox" }, { key: "sortOrder", label: "Sort order" }],
  certificates: [{ key: "name", label: "Certificate name", required: true }, { key: "issuer", label: "Issuer" }, { key: "issueDate", label: "Issue date", type: "date" }, { key: "expiryDate", label: "Expiry date", type: "date" }, { key: "credentialUrl", label: "Credential URL", type: "url" }, { key: "isPublished", label: "Published publicly", type: "checkbox" }],
  socials: [{ key: "name", label: "Platform", required: true }, { key: "url", label: "Profile URL", type: "url", required: true }, { key: "isVisible", label: "Visible on public site", type: "checkbox" }, { key: "sortOrder", label: "Sort order" }],
  settings: [
    { key: "fullName", label: "Full name", required: true }, { key: "headline", label: "Professional headline", required: true },
    { key: "biography", label: "Biography", type: "textarea", required: true }, { key: "email", label: "Email", type: "text", required: true },
    { key: "phonePrimary", label: "Primary phone", required: true }, { key: "phoneSecondary", label: "Secondary phone", required: true },
    { key: "city", label: "City", required: true }, { key: "country", label: "Country", required: true },
    { key: "profileImageUrl", label: "Profile image URL", type: "url" }, { key: "cvUrl", label: "Public CV URL", type: "url" },
    { key: "siteTitle", label: "SEO title", required: true }, { key: "siteDescription", label: "SEO description", type: "textarea", required: true },
  ],
};

const resourceFor: Partial<Record<Tab, string>> = { projects: "projects", categories: "categories", skills: "skills", experiences: "experiences", education: "education", services: "services", certificates: "certificates", socials: "socials", messages: "messages", media: "media", settings: "settings" };
const titles: Partial<Record<Tab, string>> = { projects: "title", categories: "name", skills: "name", experiences: "title", services: "title", certificates: "name", socials: "name", messages: "subject", media: "fileName" };

function displayValue(value: unknown) {
  if (value instanceof Date) return value.toLocaleDateString();
  if (typeof value === "string" && value.includes("T") && !Number.isNaN(Date.parse(value))) return new Date(value).toLocaleDateString();
  return String(value ?? "");
}

function secondaryValue(row: Row) {
  const category = row.category;
  const categoryName = typeof category === "object" && category !== null && "name" in category
    ? (category as { name?: unknown }).name
    : undefined;
  return displayValue(row.company ?? categoryName ?? row.slug ?? row.institution ?? row.categoryId ?? "");
}

function initialForm(tab: Tab, row?: Row): Record<string, string | boolean> {
  return Object.fromEntries((fields[tab] ?? []).map((field) => {
    const value = row?.[field.key];
    if (field.type === "checkbox") return [field.key, Boolean(value)];
    if (field.type === "list") return [field.key, Array.isArray(value) ? value.join("\n") : ""];
    if (field.type === "date") return [field.key, typeof value === "string" ? value.slice(0, 10) : ""];
    if (field.key === "sortOrder") return [field.key, value === undefined ? "0" : String(value)];
    return [field.key, value === null || value === undefined ? "" : String(value)];
  }));
}

export default function AdminDashboard({ administrator }: { administrator: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [rows, setRows] = useState<Row[]>([]);
  const [categories, setCategories] = useState<Row[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [settings, setSettings] = useState<Row | null>(null);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Record<string, string | boolean>>({});
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function requestJson(path: string, init?: RequestInit) {
    const response = await fetch(path, init);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? "Request failed.");
    return result;
  }

  async function load(tab = activeTab) {
    if (tab === "overview") {
      const result = await requestJson("/api/admin/dashboard");
      setStats(result);
      return;
    }
    const resource = resourceFor[tab];
    if (!resource) return;
    const result = await requestJson(`/api/admin/content/${resource}`);
    if (tab === "settings") {
      setSettings(result);
      setForm(initialForm(tab, result ?? undefined));
      return;
    }
    setRows(Array.isArray(result) ? result : []);
    if (tab === "categories") setCategories(Array.isArray(result) ? result : []);
    if (tab === "skills") {
      const categoriesResult = await requestJson("/api/admin/content/categories");
      setCategories(categoriesResult);
    }
  }

  useEffect(() => {
    let cancelled = false;
    const resource = resourceFor[activeTab];
    const endpoint = activeTab === "overview" ? "/api/admin/dashboard" : `/api/admin/content/${resource}`;
    const requests = [
      fetch(endpoint).then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Unable to load records.");
        return result;
      }),
    ];
    if (activeTab === "skills") requests.push(fetch("/api/admin/content/categories").then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to load skill categories.");
      return result;
    }));

    void Promise.all(requests).then(([result, categoryResult]) => {
      if (cancelled) return;
      if (activeTab === "overview") setStats(result);
      else if (activeTab === "settings") {
        setSettings(result);
        setForm(initialForm(activeTab, result ?? undefined));
      } else {
        setRows(Array.isArray(result) ? result : []);
        if (activeTab === "categories") setCategories(Array.isArray(result) ? result : []);
        if (activeTab === "skills" && Array.isArray(categoryResult)) setCategories(categoryResult);
      }
    }).catch((error: unknown) => {
      if (!cancelled) setNotice(error instanceof Error ? error.message : "Unable to load records.");
    });
    return () => { cancelled = true; };
  }, [activeTab]);

  function startCreate() {
    setEditing(null);
    setForm(initialForm(activeTab));
    setNotice("");
  }

  function startEdit(row: Row) {
    setEditing(row);
    setForm(initialForm(activeTab, row));
    setNotice("");
  }

  function payloadFor(tab: Tab) {
    const fieldsForTab = fields[tab] ?? [];
    const payload: Record<string, unknown> = {};
    for (const field of fieldsForTab) {
      const value = form[field.key];
      if (field.type === "checkbox") payload[field.key] = Boolean(value);
      else if (field.type === "list") payload[field.key] = String(value ?? "").split(/\r?\n/).map((part) => part.trim()).filter(Boolean);
      else if (field.type === "date") payload[field.key] = value ? new Date(`${value}T00:00:00.000Z`).toISOString() : null;
      else if (field.key === "sortOrder") payload[field.key] = Number(value || 0);
      else if ((field.type === "url" || ["endDate", "location", "details", "description"].includes(field.key)) && !value) payload[field.key] = null;
      else if (value !== undefined) payload[field.key] = value;
    }
    return payload;
  }

  async function saveForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const resource = resourceFor[activeTab];
    if (!resource) return;
    setBusy(true);
    setNotice("");
    try {
      const id = activeTab === "settings" ? "site" : editing?.id;
      const method = id ? "PATCH" : "POST";
      await requestJson(`/api/admin/content/${resource}${id ? `/${id}` : ""}`, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payloadFor(activeTab)) });
      setEditing(null);
      setNotice("Changes saved.");
      await load(activeTab);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to save changes.");
    } finally { setBusy(false); }
  }

  async function removeRow(resource: string, id: string) {
    if (!window.confirm("Delete this record? This cannot be undone.")) return;
    try {
      await requestJson(`/api/admin/${resource === "media" ? "media" : `content/${resource}`}/${id}`, { method: "DELETE" });
      setNotice("Record deleted.");
      await load(activeTab);
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to delete record."); }
  }

  async function markMessage(row: Row, read: boolean) {
    try {
      await requestJson(`/api/admin/content/messages/${row.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ read }) });
      await load("messages");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to update message."); }
  }

  async function uploadMedia(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const file = (formElement.elements.namedItem("file") as HTMLInputElement).files?.[0];
    if (!file) return;
    setBusy(true);
    setNotice("Uploading file...");
    try {
      const body = new FormData(formElement);
      const media = await requestJson("/api/admin/media", { method: "POST", body });
      formElement.reset();
      setRows((current) => [media, ...current]);
      setNotice("Upload complete. Select its role or copy its URL into project details.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Upload failed."); }
    finally { setBusy(false); }
  }

  async function setMediaUsage(url: string, kind: string) {
    const key = kind === "DOCUMENT" ? "cvUrl" : "profileImageUrl";
    try {
      await requestJson("/api/admin/content/settings/site", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ [key]: url }) });
      setNotice(kind === "DOCUMENT" ? "Public CV link updated." : "Profile image link updated.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to update site settings."); }
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const activeTabInfo = tabs.find((tab) => tab.id === activeTab);
  const activeFields = fields[activeTab] ?? [];

  return <main className="admin-shell">
    <aside className="admin-sidebar"><Link className="admin-brand" href="/" aria-label="Public portfolio"><span className="brand-mark">SA</span><span>Portfolio admin</span></Link><p className="admin-sidebar-label">WORKSPACE</p>
      <nav className="admin-nav" aria-label="Admin navigation">{tabs.map(({ id, label, icon: Icon }) => <button className={activeTab === id ? "active" : ""} key={id} type="button" onClick={() => { setActiveTab(id); setEditing(null); setNotice(""); }}><Icon size={16} />{label}{id === "messages" && stats.unreadMessages ? <span className="nav-count">{stats.unreadMessages}</span> : null}</button>)}</nav>
      <div className="admin-account"><span className="admin-avatar">{administrator.slice(0, 1).toUpperCase()}</span><div><strong>{administrator}</strong><span>Administrator</span></div><button type="button" title="Sign out" aria-label="Sign out" onClick={signOut}><LogOut size={15} /></button></div>
    </aside>
    <section className="admin-main"><header className="admin-topbar"><div><span className="admin-breadcrumb">Workspace / {activeTabInfo?.label}</span><h1>{activeTabInfo?.label}</h1></div><a className="admin-public-link" href="/" target="_blank" rel="noreferrer">View public site ↗</a></header>
      <div className="admin-content">
        {notice && <p className="admin-notice" role="status">{notice}<button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}><X size={14} /></button></p>}
        {activeTab === "overview" && <section className="overview-grid" aria-label="Portfolio overview">
          {[ ["Projects", stats.projects, "Total records"], ["Published", stats.publishedProjects, "Visible publicly"], ["Messages", stats.messages, `${stats.unreadMessages ?? 0} unread`], ["Skills", stats.skills, "Across categories"], ["Experience", stats.experiences, "Role records"], ["Education", stats.education, "Education records"] ].map(([label, count, caption]) => <article className="overview-stat" key={label}><span>{label}</span><strong>{count ?? "—"}</strong><small>{caption}</small></article>)}
                    {[ ["Projects", stats.projects, "Total records"], ["Published", stats.publishedProjects, "Visible publicly"], ["Messages", stats.messages, `${stats.unreadMessages ?? 0} unread`], ["Skills", stats.skills, "Across categories"], ["Experience", stats.experiences, "Role records"], ["Education", stats.education, "Education records"] ].map(([label, count, caption]) => <article className="overview-stat" key={label}><span>{label}</span><strong>{count ?? "—"}</strong><small>{caption}</small></article>)}
          <div className="overview-note"><h2>Portfolio workspace</h2><p>Manage verified content, publish real projects and respond to contact messages. Newly created projects stay unpublished until you choose to make them public.</p></div>
        </section>}

        {activeTab === "messages" && <div className="admin-record-list">{rows.length ? rows.map((row) => <article className={`message-record ${row.readAt ? "is-read" : "is-unread"}`} key={row.id}><div className="record-main"><div className="record-title-line"><h2>{displayValue(row.subject)}</h2><span className="record-date">{displayValue(row.createdAt)}</span></div><p className="message-sender">{displayValue(row.name)} · <a href={`mailto:${encodeURIComponent(displayValue(row.email))}`}>{displayValue(row.email)}</a></p><p className="message-body">{displayValue(row.message)}</p></div><div className="record-actions"><button type="button" onClick={() => markMessage(row, !row.readAt)}>{row.readAt ? "Mark unread" : "Mark read"}</button><button type="button" className="danger-action" onClick={() => removeRow("messages", row.id)} aria-label="Delete message"><Trash2 size={15} /></button></div></article>) : <EmptyState title="No contact messages yet" body="Messages from the public contact form will appear here." />}</div>}

        {activeTab === "media" && <div className="media-workspace"><form className="upload-panel" onSubmit={uploadMedia}><div><span className="upload-icon"><Upload size={19} /></span><h2>Upload a public-site asset</h2><p>JPEG, PNG or WebP up to 8 MB, or a PDF up to 10 MB. Files are stored in Cloudinary and can be publicly delivered when used on the site.</p></div><label className="field-label">Alt text or document description<input name="altText" maxLength={250} placeholder="Describe the image for accessibility" /></label><label className="file-picker">Choose image or PDF<input name="file" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" required /></label><button className="admin-primary" type="submit" disabled={busy}><Upload size={15} />{busy ? "Uploading..." : "Upload file"}</button><p className="upload-warning">Only upload files intended for public display. Do not upload private documents.</p></form>
          <div className="media-grid">{rows.filter((row) => row.kind === "IMAGE").map((row) => <article className="media-card" key={row.id}><Image src={displayValue(row.url)} alt={displayValue(row.altText) || "Uploaded media"} width={280} height={180} unoptimized /><div><strong>{displayValue(row.fileName)}</strong><span>{Math.ceil(Number(row.sizeBytes) / 1024)} KB</span></div><div className="media-actions"><button type="button" onClick={() => setMediaUsage(displayValue(row.url), "IMAGE")}>Use as profile</button><button type="button" onClick={() => navigator.clipboard.writeText(displayValue(row.url))}>Copy URL</button><button type="button" className="danger-action" aria-label="Delete image" onClick={() => removeRow("media", row.id)}><Trash2 size={14} /></button></div></article>)}</div>
          {rows.filter((row) => row.kind === "DOCUMENT").map((row) => <article className="document-record" key={row.id}><FileImage size={18} /><div><strong>{displayValue(row.fileName)}</strong><span>{Math.ceil(Number(row.sizeBytes) / 1024)} KB · PDF</span></div><button type="button" onClick={() => setMediaUsage(displayValue(row.url), "DOCUMENT")}>Use as public CV</button><button type="button" className="danger-action" aria-label="Delete document" onClick={() => removeRow("media", row.id)}><Trash2 size={14} /></button></article>)}
          {!rows.length && <EmptyState title="Media library is empty" body="Configure Cloudinary in the environment, then upload an image or a public-ready CV." />}</div>}

        {activeTab === "settings" && <div className="settings-layout"><div className="settings-note"><h2>Public identity</h2><p>These details appear on the website. Do not enter private information such as a date of birth or residential address.</p><p>Social links are managed separately in the database; the public GitHub link is already set from the supplied profile.</p></div><EditorForm tab={activeTab} fields={activeFields} form={form} setForm={setForm} categories={categories} saving={busy} editing={Boolean(settings)} onCancel={() => {}} onSubmit={saveForm} /></div>}

        {activeTab !== "overview" && activeTab !== "messages" && activeTab !== "media" && activeTab !== "settings" && <div className="records-layout">
          {activeTab !== "categories" && <div className="records-heading"><div><h2>{editing ? "Edit record" : `Manage ${activeTab}`}</h2><p>{activeTab === "projects" ? "Unpublished records remain hidden from the public site." : "Only add details that are accurate and verified."}</p></div>{!editing && <button className="admin-primary" type="button" onClick={startCreate}><Plus size={15} /> Add {activeTab === "experiences" ? "experience" : activeTab.slice(0, -1)}</button>}</div>}
          {activeTab === "categories" && <div className="records-heading"><div><h2>Skill categories</h2><p>Add or remove groups for the professional capability list.</p></div><button className="admin-primary" type="button" onClick={startCreate}><Plus size={15} /> Add category</button></div>}
          {editing !== null ? <EditorForm tab={activeTab} fields={activeFields} form={form} setForm={setForm} categories={categories} saving={busy} editing={Boolean(editing)} onCancel={() => setEditing(null)} onSubmit={saveForm} /> : null}
          <div className="admin-record-list">{rows.map((row) => <article className="admin-record" key={row.id}><div className="record-main"><div className="record-title-line"><h2>{displayValue(row[titles[activeTab] ?? "title"] ?? row.id)}</h2>{activeTab === "projects" && <span className={`status-tag ${row.isPublished ? "published" : "draft"}`}>{row.isPublished ? "Published" : "Draft"}</span>}</div><p>{secondaryValue(row)}</p>{activeTab === "projects" && <span className="record-meta">{displayValue(row.category)}{row.isFeatured ? " · Featured" : ""}</span>}</div><div className="record-actions"><button type="button" onClick={() => startEdit(row)}>Edit</button><button type="button" className="danger-action" aria-label={`Delete ${displayValue(row[titles[activeTab] ?? "title"])}`} onClick={() => removeRow(resourceFor[activeTab] ?? "", row.id)}><Trash2 size={15} /></button></div></article>)}</div>
          {!rows.length && !editing && <EmptyState title={`No ${activeTab} records yet`} body={activeTab === "projects" ? "Project records begin unpublished. Add verified project details when ready." : "Use the add action to create the first record."} />}
        </div>}
      </div>
    </section>
  </main>;
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return <div className="admin-empty"><span><FileImage size={19} /></span><h2>{title}</h2><p>{body}</p></div>;
}

function EditorForm({ tab, fields: formFields, form, setForm, categories, saving, editing, onCancel, onSubmit }: {
  tab: Tab; fields: Field[]; form: Record<string, string | boolean>; setForm: (next: Record<string, string | boolean>) => void;
  categories: Row[]; saving: boolean; editing: boolean; onCancel: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const isSettings = tab === "settings";
  return <form className="record-editor" onSubmit={onSubmit}>
    <div className="editor-heading"><h2>{isSettings ? "Site profile and metadata" : editing ? "Edit details" : "New record"}</h2>{!isSettings && <button type="button" className="icon-button" onClick={onCancel} title="Close editor" aria-label="Close editor"><X size={16} /></button>}</div>
    <div className="editor-fields">{formFields.map((field) => {
      if (field.type === "checkbox") return <label className="checkbox-field" key={field.key}><input type="checkbox" checked={Boolean(form[field.key])} onChange={(event) => setForm({ ...form, [field.key]: event.target.checked })} />{field.label}</label>;
      if (field.type === "select") {
        const options = field.key === "categoryId" ? categories.map((item) => ({ value: item.id, label: displayValue(item.name) })) : (field.options ?? []).map((value) => ({ value, label: value.replaceAll("_", " ") }));
        return <label className="editor-field" key={field.key}>{field.label}<select required={field.required} value={String(form[field.key] ?? "")} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}><option value="">Choose one</option>{options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select></label>;
      }
      const value = String(form[field.key] ?? "");
      return <label className={`editor-field ${field.type === "textarea" || field.type === "list" ? "editor-wide" : ""}`} key={field.key}>{field.label}
        {field.type === "textarea" || field.type === "list" ? <textarea required={field.required} rows={field.type === "list" ? 5 : 4} value={value} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} placeholder={field.type === "list" ? "One item per line" : ""} /> : <input required={field.required} type={field.type === "date" ? "date" : field.type === "url" ? "url" : "text"} value={value} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} />}
      </label>;
    })}</div>
    <div className="editor-actions"><button className="admin-primary" type="submit" disabled={saving}><Save size={14} />{saving ? "Saving..." : isSettings ? "Save settings" : "Save record"}</button>{!isSettings && <button type="button" className="admin-secondary" onClick={onCancel}>Cancel</button>}</div>
  </form>;
}