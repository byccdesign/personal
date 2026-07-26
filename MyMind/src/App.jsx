import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  Bars3BottomLeftIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
  CheckIcon,
  ChevronDownIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  CursorArrowRaysIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  FlagIcon,
  FolderOpenIcon,
  GlobeAmericasIcon,
  HandRaisedIcon,
  LightBulbIcon,
  LinkIcon,
  ListBulletIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  PlusIcon,
  PhotoIcon,
  PencilIcon,
  QuestionMarkCircleIcon,
  RocketLaunchIcon,
  ShareIcon,
  SparklesIcon,
  Squares2X2Icon,
  SwatchIcon,
  TrashIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf";

function adaptHeroIcon(Icon) {
  return function HeroIconAdapter({ size = 24, weight: _weight, ...props }) {
    return <Icon width={size} height={size} {...props} />;
  };
}

const ArrowLeft = adaptHeroIcon(ArrowLeftIcon);
const ArrowsClockwise = adaptHeroIcon(ArrowPathIcon);
const Brain = adaptHeroIcon(LightBulbIcon);
const Buildings = adaptHeroIcon(BuildingLibraryIcon);
const CalendarBlank = adaptHeroIcon(CalendarDaysIcon);
const CaretDown = adaptHeroIcon(ChevronDownIcon);
const ChartLineUp = adaptHeroIcon(ChartBarIcon);
const Check = adaptHeroIcon(CheckIcon);
const ChatCircleDots = adaptHeroIcon(ChatBubbleLeftEllipsisIcon);
const CirclesFour = adaptHeroIcon(Squares2X2Icon);
const Copy = adaptHeroIcon(DocumentDuplicateIcon);
const CursorClick = adaptHeroIcon(CursorArrowRaysIcon);
const Database = adaptHeroIcon(CircleStackIcon);
const DownloadSimple = adaptHeroIcon(ArrowDownTrayIcon);
const FileJpg = adaptHeroIcon(DocumentTextIcon);
const FilePdf = adaptHeroIcon(DocumentTextIcon);
const FileSvg = adaptHeroIcon(DocumentTextIcon);
const FileText = adaptHeroIcon(DocumentTextIcon);
const Flag = adaptHeroIcon(FlagIcon);
const FlowArrow = adaptHeroIcon(ArrowsRightLeftIcon);
const FolderOpen = adaptHeroIcon(FolderOpenIcon);
const Hand = adaptHeroIcon(HandRaisedIcon);
const Gear = adaptHeroIcon(Cog6ToothIcon);
const GlobeHemisphereWest = adaptHeroIcon(GlobeAmericasIcon);
const LinkSimple = adaptHeroIcon(LinkIcon);
const Lightbulb = adaptHeroIcon(LightBulbIcon);
const ListBullets = adaptHeroIcon(ListBulletIcon);
const MagnifyingGlassMinus = adaptHeroIcon(MagnifyingGlassMinusIcon);
const MagnifyingGlassPlus = adaptHeroIcon(MagnifyingGlassPlusIcon);
const Plus = adaptHeroIcon(PlusIcon);
const TextBlock = adaptHeroIcon(Bars3BottomLeftIcon);
const Photo = adaptHeroIcon(PhotoIcon);
const Pen = adaptHeroIcon(PencilIcon);
const HelpCircle = adaptHeroIcon(QuestionMarkCircleIcon);
const Palette = adaptHeroIcon(SwatchIcon);
const RocketLaunch = adaptHeroIcon(RocketLaunchIcon);
const ShareNetwork = adaptHeroIcon(ShareIcon);
const Sparkle = adaptHeroIcon(SparklesIcon);
const Trash = adaptHeroIcon(TrashIcon);
const UserCircle = adaptHeroIcon(UserCircleIcon);
const Users = adaptHeroIcon(UsersIcon);
const X = adaptHeroIcon(XMarkIcon);

const STORAGE_KEY = "mymind.documents.v1";
const NODE_SIZE = { width: 184, height: 82 };
const APP_BASE = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

const palette = {
  blue: { accent: "#4f6df5", soft: "#eef1ff" },
  aqua: { accent: "#53cbd4", soft: "#eafafb" },
  amber: { accent: "#daa93b", soft: "#fff7df" },
  violet: { accent: "#8b6ff3", soft: "#f3efff" },
  slate: { accent: "#697386", soft: "#f0f2f5" },
};

const iconChoices = [
  { id: "brain", label: "Idea" },
  { id: "user", label: "Person" },
  { id: "users", label: "People" },
  { id: "layers", label: "Platform" },
  { id: "bank", label: "Organization" },
  { id: "store", label: "Folder" },
  { id: "lightbulb", label: "Insight" },
  { id: "gear", label: "Process" },
  { id: "chart", label: "Growth" },
  { id: "calendar", label: "Date" },
  { id: "flag", label: "Milestone" },
  { id: "rocket", label: "Launch" },
  { id: "globe", label: "Global" },
  { id: "chat", label: "Message" },
  { id: "file", label: "Document" },
  { id: "database", label: "Database" },
  { id: "sparkle", label: "Concept" },
  { id: "check", label: "Outcome" },
];

function toneForNode(node) {
  if (node?.customColor && /^#[0-9a-f]{6}$/i.test(node.customColor)) {
    return { accent: node.customColor, soft: `${node.customColor}18` };
  }
  return palette[node?.color] || palette.violet;
}

function nodeDimensions(node) {
  if (node?.type === "image") {
    const width = node.width || 280;
    return { width, height: node.height || Math.round(width / (node.aspectRatio || 1.55)) };
  }
  if (node?.type === "text") {
    const fontSize = node.fontSize || 24;
    const longestLine = Math.max(1, ...String(node.label || "Text").split("\n").map((line) => line.length));
    const width = Math.min(420, Math.max(130, longestLine * fontSize * .58 + 28));
    const charsPerLine = Math.max(8, Math.floor((width - 20) / (fontSize * .58)));
    const lineCount = String(node.label || "Text").split("\n").reduce((count, line) => count + Math.max(1, Math.ceil(line.length / charsPerLine)), 0);
    return { width, height: Math.max(52, lineCount * fontSize * 1.25 + 22) };
  }
  if (node?.shape === "decision") {
    const length = Math.max(String(node.label || "").length, String(node.subtitle || "").length);
    return { width: Math.min(300, Math.max(210, 180 + length * 3)), height: Math.min(190, Math.max(126, 110 + Math.ceil(length / 24) * 18)) };
  }
  if (node?.shape === "terminator") return { width: Math.min(320, Math.max(196, 150 + Math.max(String(node.label || "").length, String(node.subtitle || "").length) * 5)), height: 76 };
  if (node?.shape === "data") return { width: Math.min(320, Math.max(210, 160 + Math.max(String(node.label || "").length, String(node.subtitle || "").length) * 4.5)), height: 92 };
  const longest = Math.max(String(node?.label || "").length, String(node?.subtitle || "").length);
  const width = Math.min(320, Math.max(NODE_SIZE.width, 150 + Math.max(0, longest - 15) * 4.5));
  const copyWidth = width - 72;
  const titleLines = Math.max(1, Math.ceil(String(node?.label || "").length / Math.max(10, Math.floor(copyWidth / 7))));
  const subtitleLines = Math.max(1, Math.ceil(String(node?.subtitle || "").length / Math.max(12, Math.floor(copyWidth / 5.6))));
  return { width, height: Math.max(NODE_SIZE.height, 36 + titleLines * 17 + subtitleLines * 14) };
}

function edgeGeometry(edge, source, target, offsetX = 0, offsetY = 0) {
  const sourceSize = nodeDimensions(source), targetSize = nodeDimensions(target);
  const sourcePort = edge.sourcePort || "auto";
  const goesRight = target.x >= source.x;
  let sx, sy;
  if (sourcePort === "bottom") { sx = source.x + sourceSize.width / 2; sy = source.y + sourceSize.height; }
  else if (sourcePort === "left") { sx = source.x; sy = source.y + sourceSize.height / 2; }
  else if (sourcePort === "right") { sx = source.x + sourceSize.width; sy = source.y + sourceSize.height / 2; }
  else { sx = goesRight ? source.x + sourceSize.width : source.x; sy = source.y + sourceSize.height / 2; }

  let tx, ty;
  if (target.shape === "decision") { tx = target.x + targetSize.width / 2; ty = target.y; }
  else if (sourcePort === "bottom" && target.y >= source.y) { tx = target.x + targetSize.width / 2; ty = target.y; }
  else { tx = goesRight ? target.x : target.x + targetSize.width; ty = target.y + targetSize.height / 2; }

  sx -= offsetX; sy -= offsetY; tx -= offsetX; ty -= offsetY;
  const orthogonal = edge.routing === "orthogonal" || source.shape || target.shape;
  if (orthogonal) {
    if (sourcePort === "bottom") {
      const midY = sy + (ty - sy) / 2;
      return { path: `M ${sx} ${sy} L ${sx} ${midY} L ${tx} ${midY} L ${tx} ${ty}`, labelX: sx === tx ? sx + 22 : (sx + tx) / 2, labelY: midY - 8 };
    }
    const midX = sx + (tx - sx) / 2;
    return { path: `M ${sx} ${sy} L ${midX} ${sy} L ${midX} ${ty} L ${tx} ${ty}`, labelX: midX, labelY: (sy + ty) / 2 - 8 };
  }
  const direction = goesRight ? 1 : -1;
  const bend = Math.max(70, Math.abs(tx - sx) * .48);
  return { path: `M ${sx} ${sy} C ${sx + bend * direction} ${sy}, ${tx - bend * direction} ${ty}, ${tx} ${ty}`, labelX: (sx + tx) / 2, labelY: (sy + ty) / 2 - 10 };
}

function drawingPath(points = []) {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y} L ${points[0].x + .1} ${points[0].y + .1}`;
  if (points.length === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length - 1; index += 1) {
    const midpoint = { x: (points[index].x + points[index + 1].x) / 2, y: (points[index].y + points[index + 1].y) / 2 };
    path += ` Q ${points[index].x} ${points[index].y} ${midpoint.x} ${midpoint.y}`;
  }
  const last = points[points.length - 1];
  return `${path} L ${last.x} ${last.y}`;
}

function snapDrawingPoint(start, point) {
  const dx = point.x - start.x, dy = point.y - start.y;
  const distance = Math.hypot(dx, dy);
  const increment = Math.PI / 12;
  const angle = Math.round(Math.atan2(dy, dx) / increment) * increment;
  return { x: start.x + Math.cos(angle) * distance, y: start.y + Math.sin(angle) * distance };
}

function edgeEndpoint(edge, side) {
  if (edge.endpointStyle === "circle") return "circle";
  if (side === "start") return edge.startShape || "none";
  return edge.endShape || "arrow";
}

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const source = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const maxDimension = 1400;
      const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
      const width = Math.max(1, Math.round(image.naturalWidth * scale));
      const height = Math.max(1, Math.round(image.naturalHeight * scale));
      const canvas = window.document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, width, height);
      URL.revokeObjectURL(source);
      resolve({ dataUrl: canvas.toDataURL("image/jpeg", .9), aspectRatio: width / height });
    };
    image.onerror = () => { URL.revokeObjectURL(source); reject(new Error("Unable to read image")); };
    image.src = source;
  });
}

const nowLabel = () => new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date());
const uid = (prefix = "id") => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "untitled-canvas";

function processTemplate() {
  return {
    nodes: [
      { id: "customer", x: 70, y: 210, label: "Customer", subtitle: "Starts a payment", icon: "user", color: "blue" },
      { id: "platform", x: 350, y: 210, label: "Platform", subtitle: "Routes the request", icon: "layers", color: "aqua" },
      { id: "account", x: 650, y: 90, label: "Connected account", subtitle: "Receives payout", icon: "store", color: "blue" },
      { id: "financial", x: 940, y: 90, label: "Financial account", subtitle: "Settlement", icon: "bank", color: "amber" },
      { id: "cardholder", x: 650, y: 330, label: "Cardholder", subtitle: "Issuing balance", icon: "user", color: "violet" },
      { id: "external", x: 940, y: 330, label: "External account", subtitle: "Third party", icon: "bank", color: "slate" },
    ],
    edges: [
      { id: "e1", source: "customer", target: "platform", label: "Payins" },
      { id: "e2", source: "platform", target: "account", label: "Transfers" },
      { id: "e3", source: "account", target: "financial", label: "Payouts" },
      { id: "e4", source: "platform", target: "cardholder", label: "Issuing" },
      { id: "e5", source: "cardholder", target: "external", label: "Outbound payment" },
    ],
  };
}

function mindMapTemplate() {
  return {
    nodes: [
      { id: "root", x: 500, y: 260, label: "Big idea", subtitle: "Start exploring", icon: "brain", color: "violet" },
      { id: "research", x: 190, y: 100, label: "Research", subtitle: "Questions & insights", icon: "list", color: "blue" },
      { id: "audience", x: 190, y: 420, label: "Audience", subtitle: "People & needs", icon: "users", color: "aqua" },
      { id: "concepts", x: 820, y: 100, label: "Concepts", subtitle: "Possible directions", icon: "sparkle", color: "amber" },
      { id: "actions", x: 820, y: 420, label: "Next steps", subtitle: "Turn ideas into action", icon: "check", color: "violet" },
    ],
    edges: [
      { id: "m1", source: "root", target: "research", label: "Explore" },
      { id: "m2", source: "root", target: "audience", label: "Understand" },
      { id: "m3", source: "root", target: "concepts", label: "Imagine" },
      { id: "m4", source: "root", target: "actions", label: "Plan" },
    ],
  };
}

const blankTemplate = () => ({
  nodes: [{ id: "start", x: 470, y: 260, label: "Start here", subtitle: "Double-click to rename", icon: "brain", color: "violet" }],
  edges: [],
});

function seedDocuments() {
  const process = processTemplate();
  const mind = mindMapTemplate();
  return [
    { id: "sample-flow", title: "Payment flow", slug: "payment-flow", shared: true, updatedAt: new Date().toISOString(), ...process },
    { id: "sample-mind", title: "Launch mind map", slug: "launch-mind-map", shared: false, updatedAt: new Date(Date.now() - 86400000).toISOString(), ...mind },
  ];
}

function readLocalDocuments() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(stored) && stored.length) return stored;
  } catch {}
  const seeded = seedDocuments();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

function writeLocalDocuments(documents) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(documents)); }
  catch { /* Large pasted images still save through the configured server API. */ }
}

async function apiRequest(action, body) {
  const response = await fetch(`${APP_BASE}api/index.php?action=${action}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    const error = new Error("API unavailable");
    error.status = response.status;
    throw error;
  }
  return response.json();
}

function routeFromPath() {
  const baseParts = APP_BASE.split("/").filter(Boolean);
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const parts = baseParts.every((part, index) => pathParts[index] === part) ? pathParts.slice(baseParts.length) : pathParts;
  if (parts[0] === "editor" && parts[1]) return { screen: "editor", id: parts[1], publicView: false };
  if (parts[0]) return { screen: "editor", slug: parts[0], publicView: true };
  return { screen: "dashboard", publicView: false };
}

function navigate(path) {
  const relativePath = path.replace(/^\//, "");
  window.history.pushState({}, "", `${APP_BASE}${relativePath}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function useModalKeyboard(onClose, onPrimary) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
        return;
      }
      if (event.key === "Enter" && onPrimary && event.target instanceof Element && !event.target.closest("button") && event.target.tagName !== "TEXTAREA") {
        event.preventDefault();
        onPrimary();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrimary]);
}

function IconForNode({ name, size = 24 }) {
  const props = { size, weight: "duotone", "aria-hidden": true };
  if (name === "user") return <UserCircle {...props} />;
  if (name === "bank") return <Buildings {...props} />;
  if (name === "store") return <FolderOpen {...props} />;
  if (name === "users") return <Users {...props} />;
  if (name === "sparkle") return <Sparkle {...props} />;
  if (name === "check") return <Check {...props} />;
  if (name === "list") return <ListBullets {...props} />;
  if (name === "layers") return <CirclesFour {...props} />;
  if (name === "lightbulb") return <Lightbulb {...props} />;
  if (name === "gear") return <Gear {...props} />;
  if (name === "chart") return <ChartLineUp {...props} />;
  if (name === "calendar") return <CalendarBlank {...props} />;
  if (name === "flag") return <Flag {...props} />;
  if (name === "rocket") return <RocketLaunch {...props} />;
  if (name === "globe") return <GlobeHemisphereWest {...props} />;
  if (name === "chat") return <ChatCircleDots {...props} />;
  if (name === "file") return <FileText {...props} />;
  if (name === "database") return <Database {...props} />;
  return <Brain {...props} />;
}

export function App() {
  const [documents, setDocuments] = useState(() => readLocalDocuments());
  const [route, setRoute] = useState(routeFromPath);
  const [newDialog, setNewDialog] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);

  useEffect(() => {
    const onRoute = () => setRoute(routeFromPath());
    window.addEventListener("popstate", onRoute);
    const load = route.publicView
      ? apiRequest(`shared&slug=${encodeURIComponent(route.slug || "")}`).then((data) => {
          if (data.document) setDocuments((items) => items.some((item) => item.id === data.document.id) ? items.map((item) => item.id === data.document.id ? data.document : item) : [data.document, ...items]);
        })
      : apiRequest("list").then((data) => {
          if (Array.isArray(data.documents)) {
            setDocuments(data.documents);
            writeLocalDocuments(data.documents);
            setAuthRequired(false);
          }
        });
    load.catch((error) => { if (error.status === 401 && !route.publicView) setAuthRequired(true); });
    return () => window.removeEventListener("popstate", onRoute);
  }, [route.publicView, route.slug]);

  const commitDocuments = useCallback((updater) => {
    setDocuments((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      writeLocalDocuments(next);
      return next;
    });
  }, []);

  const createDocument = (template) => {
    const id = uid("canvas");
    const title = template === "mind" ? "Untitled mind map" : template === "process" ? "Untitled process" : "Untitled canvas";
    const graph = template === "mind" ? mindMapTemplate() : template === "process" ? processTemplate() : blankTemplate();
    const doc = { id, title, slug: `${slugify(title)}-${id.slice(-4)}`, shared: false, updatedAt: new Date().toISOString(), ...graph };
    commitDocuments((items) => [doc, ...items]);
    apiRequest("save", { document: doc }).catch(() => {});
    setNewDialog(false);
    navigate(`/editor/${id}`);
  };

  const deleteDocument = (id) => {
    commitDocuments((items) => items.filter((item) => item.id !== id));
    apiRequest("delete", { id }).catch(() => {});
  };

  if (authRequired && !route.publicView) {
    return <Login onLogin={async (password) => {
      await apiRequest("login", { password });
      const data = await apiRequest("list");
      if (Array.isArray(data.documents)) {
        setDocuments(data.documents);
        writeLocalDocuments(data.documents);
      }
      setAuthRequired(false);
    }} />;
  }

  if (route.screen === "dashboard") {
    return <Dashboard documents={documents} onNew={() => setNewDialog(true)} onDelete={deleteDocument} dialog={newDialog} closeDialog={() => setNewDialog(false)} createDocument={createDocument} />;
  }

  const document = route.publicView
    ? documents.find((item) => item.slug === route.slug && item.shared)
    : documents.find((item) => item.id === route.id);

  return <Editor key={document?.id || route.slug} initialDocument={document} publicView={route.publicView} onSave={(next) => {
    commitDocuments((items) => items.some((item) => item.id === next.id) ? items.map((item) => item.id === next.id ? next : item) : [next, ...items]);
    return apiRequest("save", { document: next }).catch(() => null);
  }} />;
}

function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return <div className="login-page">
    <Brand />
    <form className="login-card" onSubmit={async (event) => {
      event.preventDefault();
      setBusy(true);
      setError("");
      try { await onLogin(password); }
      catch { setError("That password didn’t work. Please try again."); }
      finally { setBusy(false); }
    }}>
      <span className="login-icon"><Brain size={27} weight="duotone" /></span>
      <p className="eyebrow">Private workspace</p>
      <h1>Welcome back</h1>
      <p>Enter your MyMind password to open the dashboard.</p>
      <label>Password<input type="password" autoFocus autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
      {error && <div className="login-error">{error}</div>}
      <button className="primary-button" disabled={busy || !password}>{busy ? "Opening…" : "Open MyMind"}</button>
    </form>
  </div>;
}

function Dashboard({ documents, onNew, onDelete, dialog, closeDialog, createDocument }) {
  const [query, setQuery] = useState("");
  const filtered = documents.filter((doc) => doc.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="app-shell dashboard-shell">
      <header className="topbar dashboard-topbar">
        <Brand />
        <div className="topbar-actions"><button className="icon-button"><MagnifyingGlassPlus size={20} /></button><div className="avatar">CU</div></div>
      </header>
      <main className="dashboard">
        <section className="dashboard-heading">
          <div><p className="eyebrow">Your visual workspace</p><h1>All canvases</h1><p>Map ideas, explain systems, and keep every version in one calm place.</p></div>
          <button className="primary-button" onClick={onNew}><Plus size={18} weight="bold" /> New canvas</button>
        </section>
        <div className="dashboard-tools">
          <label className="search-field"><MagnifyingGlassPlus size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search canvases" /></label>
          <span>{filtered.length} {filtered.length === 1 ? "canvas" : "canvases"}</span>
        </div>
        <section className="document-grid">
          {filtered.map((doc) => <DocumentCard key={doc.id} document={doc} onDelete={onDelete} />)}
          <button className="new-card" onClick={onNew}><span><Plus size={22} /></span><strong>Create a canvas</strong><small>Start blank or use a template</small></button>
        </section>
      </main>
      {dialog && <TemplateDialog onClose={closeDialog} onCreate={createDocument} />}
    </div>
  );
}

function Brand() {
  return <button className="brand" onClick={() => navigate("/")}><span className="brand-mark"><Brain size={23} weight="duotone" /></span><span>MyMind</span></button>;
}

function DocumentCard({ document, onDelete }) {
  const previewNodes = document.nodes.slice(0, 5);
  return (
    <article className="document-card" onClick={() => navigate(`/editor/${document.id}`)}>
      <div className="document-preview">
        <svg className="preview-lines" viewBox="0 0 300 150" aria-hidden="true">
          {document.edges.slice(0, 5).map((edge) => {
            const source = document.nodes.find((node) => node.id === edge.source);
            const target = document.nodes.find((node) => node.id === edge.target);
            if (!source || !target) return null;
            const minX = Math.min(...document.nodes.map((node) => node.x));
            const minY = Math.min(...document.nodes.map((node) => node.y));
            const sx = 35 + (source.x - minX) * .24;
            const sy = 30 + (source.y - minY) * .24;
            const tx = 35 + (target.x - minX) * .24;
            const ty = 30 + (target.y - minY) * .24;
            return <path key={edge.id} d={`M ${sx} ${sy} C ${(sx + tx) / 2} ${sy}, ${(sx + tx) / 2} ${ty}, ${tx} ${ty}`} />;
          })}
        </svg>
        {previewNodes.map((node) => <span key={node.id} className={`preview-node tone-${node.color}`} style={{ left: `${24 + (node.x - Math.min(...document.nodes.map((item) => item.x))) * .24}px`, top: `${18 + (node.y - Math.min(...document.nodes.map((item) => item.y))) * .24}px` }} />)}
      </div>
      <div className="document-meta">
        <div><h2>{document.title}</h2><p>Updated {new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(document.updatedAt))}</p></div>
        <button className="card-delete" aria-label={`Delete ${document.title}`} onClick={(event) => { event.stopPropagation(); onDelete(document.id); }}><Trash size={17} /></button>
      </div>
      {document.shared && <span className="shared-badge"><ShareNetwork size={13} /> Shared</span>}
    </article>
  );
}

function TemplateDialog({ onClose, onCreate }) {
  useModalKeyboard(onClose, () => onCreate("blank"));
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="modal template-modal" role="dialog" aria-modal="true" aria-labelledby="template-dialog-title" onMouseDown={(e) => e.stopPropagation()}>
      <div className="modal-header"><div><p className="eyebrow">Create new</p><h2 id="template-dialog-title">Choose a starting point</h2></div><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={20} /></button></div>
      <div className="template-grid">
        <button onClick={() => onCreate("blank")}><span className="template-icon"><Plus size={25} /></span><strong>Blank canvas</strong><small>Begin with one central idea</small></button>
        <button onClick={() => onCreate("mind")}><span className="template-icon violet"><Brain size={25} /></span><strong>Mind map</strong><small>Branch thoughts from a core idea</small></button>
        <button onClick={() => onCreate("process")}><span className="template-icon aqua"><FlowArrow size={25} /></span><strong>Process flow</strong><small>Explain a system step by step</small></button>
      </div>
    </div>
  </div>;
}

function Editor({ initialDocument, publicView, onSave }) {
  const fallback = useMemo(() => ({ id: uid("canvas"), title: "Shared canvas unavailable", slug: "unavailable", shared: false, updatedAt: new Date().toISOString(), ...blankTemplate() }), []);
  const [document, setDocument] = useState(initialDocument || fallback);
  const [selection, setSelection] = useState([]);
  const [edgeSelection, setEdgeSelection] = useState([]);
  const [drawingSelection, setDrawingSelection] = useState([]);
  const [draftDrawing, setDraftDrawing] = useState(null);
  const [pan, setPan] = useState({ x: 80, y: 90 });
  const [zoom, setZoom] = useState(.9);
  const [tool, setTool] = useState("select");
  const [connectionSource, setConnectionSource] = useState(null);
  const [nodeMenu, setNodeMenu] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportScope, setExportScope] = useState("all");
  const [shareOpen, setShareOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [saveState, setSaveState] = useState("Saved");
  const [editingNode, setEditingNode] = useState(null);
  const [spaceHeld, setSpaceHeld] = useState(false);
  const canvasRef = useRef(null);
  const imageInputRef = useRef(null);
  const dragRef = useRef(null);
  const saveTimer = useRef(null);

  const updateDocument = useCallback((updater) => {
    if (publicView) return;
    setDocument((current) => {
      const nextValue = typeof updater === "function" ? updater(current) : updater;
      const next = { ...nextValue, updatedAt: new Date().toISOString() };
      setSaveState("Saving…");
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(async () => { await onSave(next); setSaveState("Saved"); }, 450);
      return next;
    });
  }, [onSave, publicView]);

  useEffect(() => () => clearTimeout(saveTimer.current), []);

  const nodeMap = useMemo(() => Object.fromEntries(document.nodes.map((node) => [node.id, node])), [document.nodes]);

  const addNode = useCallback((kind = "idea") => {
    const centerX = (canvasRef.current?.clientWidth / 2 - pan.x) / zoom - NODE_SIZE.width / 2;
    const centerY = (canvasRef.current?.clientHeight / 2 - pan.y) / zoom - NODE_SIZE.height / 2;
    const presets = {
      idea: ["New idea", "Add a short note", "brain", "violet"],
      person: ["Person", "Role or audience", "user", "blue"],
      process: ["Process step", "Describe what happens", "gear", "aqua", "process"],
      outcome: ["Outcome", "Expected result", "check", "amber"],
      decision: ["Decision?", "Yes or no", "check", "amber", "decision"],
      terminator: ["Start / End", "Flow boundary", "flag", "violet", "terminator"],
      data: ["Input / Output", "Data entering or leaving", "database", "blue", "data"],
    };
    const [label, subtitle, icon, color, shape] = presets[kind];
    const node = { id: uid("node"), x: centerX + Math.random() * 40, y: centerY + Math.random() * 40, label, subtitle, icon, color, ...(shape ? { shape } : {}) };
    updateDocument((doc) => ({ ...doc, nodes: [...doc.nodes, node] }));
    setSelection([node.id]);
    setNodeMenu(false);
  }, [pan.x, pan.y, updateDocument, zoom]);

  const addTextNode = useCallback(() => {
    const centerX = (canvasRef.current?.clientWidth / 2 - pan.x) / zoom - 90;
    const centerY = (canvasRef.current?.clientHeight / 2 - pan.y) / zoom - 30;
    const node = { id: uid("node"), type: "text", x: centerX, y: centerY, label: "Add text", fontSize: 24, color: "slate" };
    updateDocument((doc) => ({ ...doc, nodes: [...doc.nodes, node] }));
    setSelection([node.id]);
    setEdgeSelection([]);
  }, [pan.x, pan.y, updateDocument, zoom]);

  const addImageFile = useCallback(async (file, clientPoint) => {
    if (publicView || !file?.type?.startsWith("image/")) return;
    const image = await readImageFile(file);
    const bounds = canvasRef.current?.getBoundingClientRect();
    const x = clientPoint && bounds ? (clientPoint.x - bounds.left - pan.x) / zoom - 140 : (canvasRef.current?.clientWidth / 2 - pan.x) / zoom - 140;
    const y = clientPoint && bounds ? (clientPoint.y - bounds.top - pan.y) / zoom - 90 : (canvasRef.current?.clientHeight / 2 - pan.y) / zoom - 90;
    const node = { id: uid("image"), type: "image", x, y, label: "Screenshot", imageData: image.dataUrl, aspectRatio: image.aspectRatio, width: 280 };
    updateDocument((doc) => ({ ...doc, nodes: [...doc.nodes, node] }));
    setSelection([node.id]);
    setEdgeSelection([]);
  }, [pan.x, pan.y, publicView, updateDocument, zoom]);

  const addConnectedNode = useCallback((sourceId) => {
    if (publicView) return;
    const source = document.nodes.find((node) => node.id === sourceId);
    if (!source) return;
    const branchCount = document.edges.filter((edge) => edge.source === sourceId).length;
    const node = {
      id: uid("node"),
      x: source.x + 300,
      y: source.y + branchCount * 112,
      label: "New node",
      subtitle: "Add a short note",
      icon: "lightbulb",
      color: source.color || "violet",
      customColor: source.customColor || null,
    };
    const flowchartEdge = !!source.shape;
    const edge = { id: uid("edge"), source: sourceId, target: node.id, label: source.shape === "decision" ? "Yes" : "", ...(flowchartEdge ? { routing: "orthogonal", sourcePort: "right" } : {}) };
    updateDocument((doc) => ({ ...doc, nodes: [...doc.nodes, node], edges: [...doc.edges, edge] }));
    setSelection([node.id]);
    setEdgeSelection([]);
    requestAnimationFrame(() => window.document.querySelector(`[data-node-id="${node.id}"]`)?.focus());
  }, [document.edges, document.nodes, publicView, updateDocument]);

  const onCanvasPointerDown = (event) => {
    const wantsToPan = tool === "hand" || event.button === 1 || spaceHeld;
    if (wantsToPan) {
      dragRef.current = { type: "pan", startX: event.clientX, startY: event.clientY, panX: pan.x, panY: pan.y };
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }
    if (tool === "pen" && !publicView) {
      const bounds = canvasRef.current.getBoundingClientRect();
      const point = { x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom };
      setDraftDrawing({ id: uid("drawing"), points: [point], color: "#3f4652", width: 2.4 });
      setSelection([]); setEdgeSelection([]); setDrawingSelection([]);
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }
    if (event.target !== event.currentTarget && !event.target.classList.contains("edge-layer")) return;
    setSelection([]);
    setEdgeSelection([]);
    setDrawingSelection([]);
  };

  const onNodePointerDown = (event, node) => {
    if (spaceHeld || event.button === 1 || tool === "pen") return;
    event.stopPropagation();
    if (publicView) return;
    const clickedPort = event.target instanceof Element && event.target.classList.contains("node-port");
    if (clickedPort && !connectionSource) {
      setTool("connect");
      setConnectionSource({ nodeId: node.id, port: event.target.dataset.port || "auto" });
      setSelection([node.id]);
      setEdgeSelection([]);
      return;
    }
    if (tool === "connect" || connectionSource) {
      if (!connectionSource) {
        setConnectionSource({ nodeId: node.id, port: "auto" });
        setSelection([node.id]);
      } else if (connectionSource.nodeId !== node.id) {
        const edgeId = uid("edge");
        const sourceNode = document.nodes.find((item) => item.id === connectionSource.nodeId);
        const isFlowchart = !!(sourceNode?.shape || node.shape);
        const label = sourceNode?.shape === "decision" ? (connectionSource.port === "bottom" ? "No" : "Yes") : "";
        updateDocument((doc) => ({ ...doc, edges: [...doc.edges, { id: edgeId, source: connectionSource.nodeId, target: node.id, label, sourcePort: connectionSource.port, ...(isFlowchart ? { routing: "orthogonal" } : {}) }] }));
        setConnectionSource(null);
        setTool("select");
        setSelection([]);
        setEdgeSelection([edgeId]);
      }
      return;
    }
    setEdgeSelection([]);
    setDrawingSelection([]);
    setSelection((current) => event.shiftKey ? (current.includes(node.id) ? current.filter((id) => id !== node.id) : [...current, node.id]) : [node.id]);
    dragRef.current = { type: "node", id: node.id, startX: event.clientX, startY: event.clientY, nodeX: node.x, nodeY: node.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (draftDrawing) {
      const bounds = canvasRef.current.getBoundingClientRect();
      let point = { x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom };
      if (event.shiftKey) point = snapDrawingPoint(draftDrawing.points[0], point);
      setDraftDrawing((current) => event.shiftKey ? { ...current, points: [current.points[0], point] } : { ...current, points: [...current.points, point] });
      return;
    }
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.type === "pan") setPan({ x: drag.panX + event.clientX - drag.startX, y: drag.panY + event.clientY - drag.startY });
    if (drag.type === "node") {
      const dx = (event.clientX - drag.startX) / zoom;
      const dy = (event.clientY - drag.startY) / zoom;
      updateDocument((doc) => ({ ...doc, nodes: doc.nodes.map((node) => node.id === drag.id ? { ...node, x: drag.nodeX + dx, y: drag.nodeY + dy } : node) }));
    }
  };

  const endDrag = () => {
    if (draftDrawing?.points.length > 1) {
      const completed = draftDrawing;
      updateDocument((doc) => ({ ...doc, drawings: [...(doc.drawings || []), completed] }));
      setDrawingSelection([completed.id]);
    }
    setDraftDrawing(null);
    dragRef.current = null;
  };

  const onWheel = (event) => {
    event.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const nextZoom = Math.min(1.8, Math.max(.35, zoom * (event.deltaY > 0 ? .92 : 1.08)));
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;
    setPan({ x: mx - ((mx - pan.x) / zoom) * nextZoom, y: my - ((my - pan.y) / zoom) * nextZoom });
    setZoom(nextZoom);
  };

  const deleteSelection = useCallback(() => {
    if ((!selection.length && !edgeSelection.length && !drawingSelection.length) || publicView) return;
    updateDocument((doc) => ({ ...doc, nodes: doc.nodes.filter((node) => !selection.includes(node.id)), edges: doc.edges.filter((edge) => !edgeSelection.includes(edge.id) && !selection.includes(edge.source) && !selection.includes(edge.target)), drawings: (doc.drawings || []).filter((drawing) => !drawingSelection.includes(drawing.id)) }));
    setSelection([]);
    setEdgeSelection([]);
    setDrawingSelection([]);
  }, [drawingSelection, edgeSelection, publicView, selection, updateDocument]);

  const hideSelectedConnection = () => {
    if (!edgeSelection.length || publicView) return;
    updateDocument((doc) => ({ ...doc, edges: doc.edges.map((edge) => edgeSelection.includes(edge.id) ? { ...edge, hidden: true } : edge) }));
    setEdgeSelection([]);
  };

  const showHiddenConnections = (nodeId) => {
    const reveal = (doc) => ({ ...doc, edges: doc.edges.map((edge) => (edge.source === nodeId || edge.target === nodeId) && edge.hidden ? { ...edge, hidden: false } : edge) });
    if (publicView) setDocument(reveal);
    else updateDocument(reveal);
  };

  const hideNodeConnections = (nodeId) => updateDocument((doc) => ({ ...doc, edges: doc.edges.map((edge) => edge.source === nodeId || edge.target === nodeId ? { ...edge, hidden: true } : edge) }));

  useEffect(() => {
    const onKey = (event) => {
      if ((event.key === "Backspace" || event.key === "Delete") && !["INPUT", "TEXTAREA"].includes(window.document.activeElement?.tagName)) deleteSelection();
      if ((event.metaKey || event.ctrlKey) && event.key === "0") { event.preventDefault(); setPan({ x: 80, y: 90 }); setZoom(.9); }
      const modalOpen = editingNode || exportOpen || shareOpen || shortcutsOpen;
      const activeTag = window.document.activeElement?.tagName;
      const selectedSource = selection.length === 1 ? selection[0] : (document.nodes.length === 1 ? document.nodes[0].id : null);
      if (event.key === "Tab" && selectedSource && !publicView && !modalOpen && !["INPUT", "TEXTAREA", "BUTTON", "SELECT"].includes(activeTag)) {
        event.preventDefault();
        addConnectedNode(selectedSource);
      }
      if (event.key === "Escape" && connectionSource) {
        setConnectionSource(null);
        setTool("select");
      }
      const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(activeTag) || window.document.activeElement?.isContentEditable;
      if (event.key === " " && !modalOpen && !isTyping) {
        event.preventDefault();
        setSpaceHeld(true);
      }
      if (!publicView && !modalOpen && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const shortcut = event.key.toLowerCase();
        if (["v", "h", "l", "n", "t", "p", "d"].includes(shortcut)) event.preventDefault();
        if (shortcut === "v") { setTool("select"); setConnectionSource(null); }
        if (shortcut === "h") { setTool("hand"); setConnectionSource(null); }
        if (shortcut === "l") { setTool("connect"); setConnectionSource(null); }
        if (shortcut === "n") addNode("idea");
        if (shortcut === "t") addTextNode();
        if (shortcut === "p") imageInputRef.current?.click();
        if (shortcut === "d") { setTool("pen"); setConnectionSource(null); }
        if (shortcut === "?") { event.preventDefault(); setShortcutsOpen(true); }
      }
    };
    const onKeyUp = (event) => { if (event.key === " ") setSpaceHeld(false); };
    const onBlur = () => setSpaceHeld(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [addConnectedNode, addNode, addTextNode, connectionSource, deleteSelection, document.nodes, editingNode, exportOpen, publicView, selection, shareOpen, shortcutsOpen]);

  useEffect(() => {
    const onPaste = (event) => {
      if (publicView || editingNode || exportOpen || shareOpen || shortcutsOpen) return;
      const imageItem = Array.from(event.clipboardData?.items || []).find((item) => item.type.startsWith("image/"));
      if (!imageItem) return;
      event.preventDefault();
      addImageFile(imageItem.getAsFile());
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [addImageFile, editingNode, exportOpen, publicView, shareOpen, shortcutsOpen]);

  const shareUrl = `${window.location.origin}${APP_BASE}${document.slug}`;
  const toggleShare = () => updateDocument((doc) => ({ ...doc, shared: !doc.shared }));

  const exportDiagram = (format) => {
    const selectedMode = exportScope === "selected";
    const ids = selectedMode ? new Set(selection) : null;
    const nodes = selectedMode ? document.nodes.filter((node) => ids.has(node.id)) : document.nodes;
    const drawings = selectedMode ? (document.drawings || []).filter((drawing) => drawingSelection.includes(drawing.id)) : (document.drawings || []);
    const visibleEdges = document.edges.filter((edge) => !edge.hidden);
    const edges = selectedMode ? visibleEdges.filter((edge) => ids.has(edge.source) && ids.has(edge.target)) : visibleEdges;
    if (!nodes.length && !drawings.length) return;
    const drawingPoints = drawings.flatMap((drawing) => drawing.points || []);
    const minNodeX = nodes.length ? Math.min(...nodes.map((node) => node.x)) : Infinity;
    const minNodeY = nodes.length ? Math.min(...nodes.map((node) => node.y)) : Infinity;
    const maxNodeX = nodes.length ? Math.max(...nodes.map((node) => node.x + nodeDimensions(node).width)) : -Infinity;
    const maxNodeY = nodes.length ? Math.max(...nodes.map((node) => node.y + nodeDimensions(node).height)) : -Infinity;
    const bounds = {
      minX: Math.min(minNodeX, ...(drawingPoints.map((point) => point.x))) - 70,
      minY: Math.min(minNodeY, ...(drawingPoints.map((point) => point.y))) - 70,
      maxX: Math.max(maxNodeX, ...(drawingPoints.map((point) => point.x))) + 70,
      maxY: Math.max(maxNodeY, ...(drawingPoints.map((point) => point.y))) + 70,
    };
    const width = Math.max(600, bounds.maxX - bounds.minX);
    const height = Math.max(400, bounds.maxY - bounds.minY);
    const escape = (text) => String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]));
    const wrapSvgText = (text, maxChars) => {
      const lines = [];
      String(text || "").split("\n").forEach((paragraph) => {
        const words = paragraph.split(/\s+/).filter(Boolean);
        if (!words.length) { lines.push(""); return; }
        let line = "";
        words.forEach((word) => {
          const next = line ? `${line} ${word}` : word;
          if (next.length > maxChars && line) { lines.push(line); line = word; }
          else line = next;
        });
        if (line) lines.push(line);
      });
      return lines.length ? lines : [""];
    };
    const svgLines = (lines, x, startY, lineHeight) => lines.map((line, index) => `<tspan x="${x}" y="${startY + index * lineHeight}">${escape(line)}</tspan>`).join("");
    const paths = edges.map((edge) => {
      const s = nodeMap[edge.source], t = nodeMap[edge.target];
      if (!s || !t) return "";
      const geometry = edgeGeometry(edge, s, t, bounds.minX, bounds.minY);
      const startShape = edgeEndpoint(edge, "start"), endShape = edgeEndpoint(edge, "end");
      const marker = `${startShape !== "none" ? `marker-start="url(#${startShape})"` : ""} ${endShape !== "none" ? `marker-end="url(#${endShape})"` : ""}`;
      const dash = edge.lineStyle === "dashed" ? 'stroke-dasharray="8 7"' : "";
      return `<path d="${geometry.path}" fill="none" stroke="#bcc2cc" stroke-width="2" ${dash} ${marker}/><text x="${geometry.labelX}" y="${geometry.labelY}" text-anchor="middle" font-family="Inter,Arial" font-size="12" font-weight="600" fill="#5267e8">${escape(edge.label || "")}</text>`;
    }).join("");
    const drawingPaths = drawings.map((drawing) => {
      const points = (drawing.points || []).map((point) => ({ x: point.x - bounds.minX, y: point.y - bounds.minY }));
      return `<path d="${drawingPath(points)}" fill="none" stroke="${drawing.color || "#3f4652"}" stroke-width="${drawing.width || 2.4}" stroke-linecap="round" stroke-linejoin="round"/>`;
    }).join("");
    const cards = nodes.map((node) => {
      const tone = toneForNode(node);
      const x = node.x - bounds.minX, y = node.y - bounds.minY;
      const size = nodeDimensions(node);
      if (node.type === "image") return `<g><rect x="${x}" y="${y}" width="${size.width}" height="${size.height}" rx="14" fill="#ffffff" stroke="#e0e4ea"/><image href="${node.imageData}" x="${x + 7}" y="${y + 7}" width="${size.width - 14}" height="${size.height - 14}" preserveAspectRatio="xMidYMid meet"/></g>`;
      if (node.type === "text") {
        const fontSize = node.fontSize || 24;
        const lines = wrapSvgText(node.label, Math.max(8, Math.floor((size.width - 20) / (fontSize * .58))));
        return `<text font-family="Inter,Arial" font-size="${fontSize}" font-weight="600" fill="${tone.accent}">${svgLines(lines, x + 10, y + fontSize, fontSize * 1.25)}</text>`;
      }
      const titleLines = wrapSvgText(node.label, Math.max(10, Math.floor((size.width - 72) / 7)));
      const subtitleLines = wrapSvgText(node.subtitle || "", Math.max(12, Math.floor((size.width - 72) / 5.6)));
      const titleStart = y + 27;
      const subtitleStart = titleStart + titleLines.length * 17 + 4;
      const shapeSurface = node.shape === "decision"
        ? `<polygon points="${x + size.width / 2},${y} ${x + size.width},${y + size.height / 2} ${x + size.width / 2},${y + size.height} ${x},${y + size.height / 2}" fill="#ffffff" stroke="#e0e4ea"/>`
        : node.shape === "data"
          ? `<polygon points="${x + 22},${y} ${x + size.width},${y} ${x + size.width - 22},${y + size.height} ${x},${y + size.height}" fill="#ffffff" stroke="#e0e4ea"/>`
          : `<rect x="${x}" y="${y}" width="${size.width}" height="${size.height}" rx="${node.shape === "terminator" ? size.height / 2 : node.shape === "process" ? 9 : 16}" fill="#ffffff" stroke="#e0e4ea"/>`;
      if (node.shape) {
        const shapeTitle = wrapSvgText(node.label, Math.max(12, Math.floor((size.width - 50) / 7)));
        const shapeSubtitle = wrapSvgText(node.subtitle || "", Math.max(14, Math.floor((size.width - 50) / 5.6)));
        const contentHeight = shapeTitle.length * 17 + shapeSubtitle.length * 14 + 4;
        const shapeTitleStart = y + (size.height - contentHeight) / 2 + 13;
        const shapeSubtitleStart = shapeTitleStart + shapeTitle.length * 17 + 4;
        return `<g>${shapeSurface}<text text-anchor="middle" font-family="Inter,Arial" font-size="14" font-weight="700" fill="#333944">${svgLines(shapeTitle, x + size.width / 2, shapeTitleStart, 17)}</text><text text-anchor="middle" font-family="Inter,Arial" font-size="11" fill="#7a8290">${svgLines(shapeSubtitle, x + size.width / 2, shapeSubtitleStart, 14)}</text></g>`;
      }
      return `<g>${shapeSurface}<circle cx="${x + 30}" cy="${y + 31}" r="17" fill="${tone.soft}"/><circle cx="${x + 30}" cy="${y + 31}" r="6" fill="${tone.accent}"/><text font-family="Inter,Arial" font-size="14" font-weight="700" fill="#333944">${svgLines(titleLines, x + 57, titleStart, 17)}</text><text font-family="Inter,Arial" font-size="11" fill="#7a8290">${svgLines(subtitleLines, x + 57, subtitleStart, 14)}</text></g>`;
    }).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 Z" fill="#bcc2cc"/></marker><marker id="circle" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><circle cx="4" cy="4" r="3" fill="#ffffff" stroke="#9da5b1" stroke-width="1.5"/></marker></defs><rect width="100%" height="100%" fill="#f7f8fb"/>${drawingPaths}${paths}${cards}</svg>`;
    const filename = `${slugify(document.title)}-${exportScope}`;
    if (format === "svg") downloadBlob(new Blob([svg], { type: "image/svg+xml" }), `${filename}.svg`);
    else rasterizeSvg(svg, width, height, format, filename);
    setExportOpen(false);
  };

  if (!initialDocument && publicView) return <NotFound />;

  return <div className={`app-shell editor-shell ${publicView ? "is-public" : ""}`}>
    <header className="topbar editor-topbar">
      <div className="editor-title-row">
        <button className="icon-button" aria-label="Back to dashboard" onClick={() => navigate("/")}><ArrowLeft size={20} /></button>
        <Brand />
        <span className="topbar-divider" />
        <input className="document-title" value={document.title} readOnly={publicView} onChange={(e) => updateDocument((doc) => ({ ...doc, title: e.target.value, slug: slugify(e.target.value) }))} />
        <span className="save-state"><span /> {publicView ? "View only" : saveState}</span>
      </div>
      <div className="topbar-actions">
        {!publicView && <button className="secondary-button" onClick={() => setExportOpen(true)}><DownloadSimple size={17} /> Export <CaretDown size={13} /></button>}
        {!publicView && <button className="primary-button" onClick={() => setShareOpen(true)}><ShareNetwork size={17} /> Share</button>}
        {publicView && <span className="public-pill"><ShareNetwork size={15} /> Shared canvas</span>}
        <div className="avatar">CU</div>
      </div>
    </header>

    <div className="editor-body">
      {!publicView && <aside className="left-toolbar" aria-label="Canvas tools">
        <button className={tool === "select" ? "active" : ""} title="Pointer · V" aria-label="Pointer tool" aria-keyshortcuts="V" onClick={() => setTool("select")}><CursorClick size={21} /></button>
        <button className={tool === "hand" ? "active" : ""} title="Hand tool · H" aria-label="Hand tool" aria-keyshortcuts="H" onClick={() => setTool("hand")}><Hand size={21} /></button>
        <span />
        <button className={tool === "connect" ? "active" : ""} title="Link nodes · L" aria-label="Link nodes" aria-keyshortcuts="L" onClick={() => { setTool("connect"); setConnectionSource(null); }}><LinkSimple size={21} /></button>
        <button className={tool === "pen" ? "active" : ""} title="Draw · D" aria-label="Draw with pen" aria-keyshortcuts="D" onClick={() => { setTool("pen"); setConnectionSource(null); }}><Pen size={21} /></button>
        <div className="toolbar-popover-wrap">
          <button className={nodeMenu ? "active" : ""} title="Add node · N" aria-label="Add node" aria-keyshortcuts="N" onClick={() => setNodeMenu(!nodeMenu)}><Plus size={22} /></button>
          {nodeMenu && <div className="node-menu">
            <p>Add node</p>
            <button onClick={() => addNode("idea")}><span className="menu-node violet"><Brain size={18} /></span><span><strong>Idea</strong><small>Thought or topic</small></span></button>
            <button onClick={() => addNode("person")}><span className="menu-node blue"><UserCircle size={18} /></span><span><strong>Person</strong><small>Role or audience</small></span></button>
            <button onClick={() => addNode("process")}><span className="menu-node aqua"><CirclesFour size={18} /></span><span><strong>Process</strong><small>Step or system</small></span></button>
            <button onClick={() => addNode("outcome")}><span className="menu-node amber"><Check size={18} /></span><span><strong>Outcome</strong><small>Result or decision</small></span></button>
            <div className="node-menu-divider"><span>Flowchart</span></div>
            <button onClick={() => addNode("terminator")}><span className="menu-node violet"><Flag size={18} /></span><span><strong>Start / End</strong><small>Beginning or end</small></span></button>
            <button onClick={() => addNode("decision")}><span className="menu-node amber"><Check size={18} /></span><span><strong>Decision</strong><small>Branch the flow</small></span></button>
            <button onClick={() => addNode("data")}><span className="menu-node blue"><Database size={18} /></span><span><strong>Input / Output</strong><small>Data in or out</small></span></button>
          </div>}
        </div>
        <button title="Add text · T" aria-label="Add text" aria-keyshortcuts="T" onClick={addTextNode}><TextBlock size={21} /></button>
        <button title="Upload picture · P" aria-label="Upload picture" aria-keyshortcuts="P" onClick={() => imageInputRef.current?.click()}><Photo size={21} /></button>
        <input ref={imageInputRef} className="visually-hidden-input" type="file" accept="image/*" onChange={(event) => { addImageFile(event.target.files?.[0]); event.target.value = ""; }} />
        <span />
        <button title="Delete selected" disabled={!selection.length && !edgeSelection.length && !drawingSelection.length} onClick={deleteSelection}><Trash size={20} /></button>
        <button title="Keyboard shortcuts · ?" aria-label="Keyboard shortcuts" aria-keyshortcuts="?" onClick={() => setShortcutsOpen(true)}><HelpCircle size={21} /></button>
      </aside>}

      <main ref={canvasRef} className={`canvas ${tool === "hand" || spaceHeld ? "is-panning" : ""} ${tool === "pen" ? "is-drawing" : ""}`} onPointerDown={onCanvasPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onWheel={onWheel} onDragOver={(event) => { if (Array.from(event.dataTransfer?.items || []).some((item) => item.type.startsWith("image/"))) event.preventDefault(); }} onDrop={(event) => { const file = Array.from(event.dataTransfer?.files || []).find((item) => item.type.startsWith("image/")); if (file) { event.preventDefault(); addImageFile(file, { x: event.clientX, y: event.clientY }); } }}>
        <div className="canvas-grid" style={{ backgroundPosition: `${pan.x}px ${pan.y}px`, backgroundSize: `${24 * zoom}px ${24 * zoom}px` }} />
        <div className="world" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
          <svg className="edge-layer" width="4000" height="2400" viewBox="-1000 -600 4000 2400">
            <defs><marker id="canvas-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 Z" /></marker><marker id="canvas-circle" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto"><circle cx="4.5" cy="4.5" r="3.2" /></marker></defs>
            {(document.drawings || []).map((drawing) => <DrawingStroke key={drawing.id} drawing={drawing} selected={drawingSelection.includes(drawing.id)} passive={spaceHeld || tool !== "select"} onSelect={() => { if (publicView) return; setDrawingSelection((current) => current.includes(drawing.id) ? current.filter((id) => id !== drawing.id) : [...current, drawing.id]); setSelection([]); setEdgeSelection([]); setConnectionSource(null); }} />)}
            {draftDrawing && <DrawingStroke drawing={draftDrawing} passive />}
            {document.edges.filter((edge) => !edge.hidden).map((edge) => <CanvasEdge key={edge.id} edge={edge} source={nodeMap[edge.source]} target={nodeMap[edge.target]} selected={edgeSelection.includes(edge.id)} panning={spaceHeld || tool === "hand" || tool === "pen"} onSelect={() => { if (publicView) return; setEdgeSelection([edge.id]); setDrawingSelection([]); setSelection([]); setConnectionSource(null); setTool("select"); }} />)}
          </svg>
          {document.nodes.map((node) => <CanvasNode key={node.id} node={node} hiddenConnectionCount={document.edges.filter((edge) => (edge.source === node.id || edge.target === node.id) && edge.hidden).length} onShowHidden={() => showHiddenConnections(node.id)} selected={selection.includes(node.id)} connecting={connectionSource?.nodeId === node.id} onPointerDown={onNodePointerDown} onKeyDown={(event) => { if (!publicView && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); setSelection([node.id]); setEdgeSelection([]); setDrawingSelection([]); } }} onDoubleClick={() => !publicView && node.type !== "image" && setEditingNode(node.id)} />)}
        </div>
        {tool === "connect" && <div className="mode-toast"><LinkSimple size={16} /> {connectionSource ? "Choose a destination node" : "Choose a starting node"}</div>}
        {drawingSelection.length > 1 && <div className="drawing-selection-count">{drawingSelection.length} strokes selected</div>}
        <div className="zoom-controls">
          <button onClick={() => setZoom((value) => Math.max(.35, value - .1))}><MagnifyingGlassMinus size={18} /></button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((value) => Math.min(1.8, value + .1))}><MagnifyingGlassPlus size={18} /></button>
          <button title="Reset view" onClick={() => { setPan({ x: 80, y: 90 }); setZoom(.9); }}><ArrowsClockwise size={18} /></button>
        </div>
        <div className="canvas-hint">D draws · Shift straightens · Hold Space + drag to pan</div>
      </main>

      {!publicView && selection.length === 1 && <NodeInspector node={nodeMap[selection[0]]} connectionCount={document.edges.filter((edge) => edge.source === selection[0] || edge.target === selection[0]).length} hiddenConnectionCount={document.edges.filter((edge) => (edge.source === selection[0] || edge.target === selection[0]) && edge.hidden).length} onHideConnections={() => hideNodeConnections(selection[0])} onShowConnections={() => showHiddenConnections(selection[0])} onChange={(patch) => updateDocument((doc) => ({ ...doc, nodes: doc.nodes.map((node) => node.id === selection[0] ? { ...node, ...patch } : node) }))} />}
      {!publicView && edgeSelection.length === 1 && <EdgeInspector edge={document.edges.find((edge) => edge.id === edgeSelection[0])} onChange={(patch) => updateDocument((doc) => ({ ...doc, edges: doc.edges.map((edge) => edge.id === edgeSelection[0] ? { ...edge, ...patch } : edge) }))} onHide={hideSelectedConnection} onDelete={deleteSelection} />}
    </div>

    {editingNode && <RenameDialog node={nodeMap[editingNode]} onClose={() => setEditingNode(null)} onSave={(patch) => { updateDocument((doc) => ({ ...doc, nodes: doc.nodes.map((node) => node.id === editingNode ? { ...node, ...patch } : node) })); setEditingNode(null); }} />}
    {exportOpen && <ExportDialog scope={exportScope} setScope={setExportScope} hasSelection={selection.length > 0 || drawingSelection.length > 0} onClose={() => setExportOpen(false)} onExport={exportDiagram} />}
    {shareOpen && <ShareDialog document={document} url={shareUrl} onToggle={toggleShare} onClose={() => setShareOpen(false)} />}
    {shortcutsOpen && <ShortcutsDialog onClose={() => setShortcutsOpen(false)} />}
  </div>;
}

function CanvasNode({ node, hiddenConnectionCount, onShowHidden, selected, connecting, onPointerDown, onKeyDown, onDoubleClick }) {
  const tone = toneForNode(node);
  const size = nodeDimensions(node);
  return <article className={`canvas-node ${node.type ? `node-type-${node.type}` : ""} ${node.shape ? `shape-${node.shape}` : ""} ${selected ? "selected" : ""} ${connecting ? "connecting" : ""}`} role="button" tabIndex="0" data-node-id={node.id} aria-label={`${node.label}. ${node.subtitle || ""}. Press Enter to select, then Tab to add a connected node.`} style={{ left: node.x, top: node.y, width: size.width, height: size.height, "--node-accent": tone.accent, "--node-soft": tone.soft, "--text-size": `${node.fontSize || 24}px` }} onPointerDown={(event) => onPointerDown(event, node)} onKeyDown={onKeyDown} onDoubleClick={onDoubleClick}>
    {node.type === "image" && <img src={node.imageData} alt={node.label || "Canvas screenshot"} draggable="false" />}
    {node.type === "text" && <span className="text-node-copy">{node.label}</span>}
    {!node.type && <><span className="node-icon"><IconForNode name={node.icon} /></span><span className="node-copy"><strong>{node.label}</strong><small>{node.subtitle}</small></span></>}
    <i className="node-port left" data-port="left" aria-hidden="true" /><i className="node-port right" data-port="right" aria-hidden="true" />
    {node.shape === "decision" && <i className="node-port bottom" data-port="bottom" aria-hidden="true" />}
    {hiddenConnectionCount > 0 && <button className="hidden-connections-badge" aria-label={`Show ${hiddenConnectionCount} hidden ${hiddenConnectionCount === 1 ? "connection" : "connections"}`} title="Show hidden connections" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onShowHidden(); }}>+{hiddenConnectionCount}</button>}
  </article>;
}

function CanvasEdge({ edge, source, target, selected, panning, onSelect }) {
  if (!source || !target) return null;
  const geometry = edgeGeometry(edge, source, target);
  const markerFor = (shape) => shape === "arrow" ? "url(#canvas-arrow)" : shape === "circle" ? "url(#canvas-circle)" : undefined;
  return <g className={`canvas-edge ${edge.lineStyle === "dashed" ? "dashed" : ""} ${selected ? "selected" : ""}`} onPointerDown={(event) => { if (panning) return; event.stopPropagation(); onSelect(); }}><path className="edge-hit" d={geometry.path} /><path className="edge-line" d={geometry.path} markerStart={markerFor(edgeEndpoint(edge, "start"))} markerEnd={markerFor(edgeEndpoint(edge, "end"))} /><text x={geometry.labelX} y={geometry.labelY} textAnchor="middle">{edge.label}</text></g>;
}

function DrawingStroke({ drawing, selected, passive, onSelect }) {
  const path = drawingPath(drawing.points);
  return <g className={`drawing-stroke ${selected ? "selected" : ""}`} onPointerDown={(event) => { if (passive) return; event.stopPropagation(); onSelect?.(); }}><path className="drawing-hit" d={path} /><path className="drawing-line" d={path} style={{ stroke: drawing.color || "#3f4652", strokeWidth: drawing.width || 2.4 }} /></g>;
}

function NodeInspector({ node, onChange, connectionCount, hiddenConnectionCount, onHideConnections, onShowConnections }) {
  if (!node) return null;
  const tone = toneForNode(node);
  const connectionControls = <NodeConnectionsControl count={connectionCount} hiddenCount={hiddenConnectionCount} onHide={onHideConnections} onShow={onShowConnections} />;
  if (node.type === "image") return <aside className="inspector">
    <div className="inspector-heading"><div><p className="eyebrow">Selected image</p><h2>Screenshot</h2></div><span className="inspector-node-icon" style={{ "--node-accent": "#5367ef", "--node-soft": "#edf0ff" }}><Photo size={20} /></span></div>
    <label>Alternative text<input value={node.label || ""} onChange={(event) => onChange({ label: event.target.value })} placeholder="Describe this image" /></label>
    <div className="inspector-field"><span>Width</span><input className="size-range" type="range" min="180" max="640" step="10" value={node.width || 280} onChange={(event) => onChange({ width: Number(event.target.value), height: null })} /><small>{node.width || 280}px</small></div>
    {connectionControls}
    <p className="inspector-help">Paste an image from your clipboard or drag another image onto the canvas at any time.</p>
  </aside>;
  if (node.type === "text") return <aside className="inspector">
    <div className="inspector-heading"><div><p className="eyebrow">Selected text</p><h2>Text</h2></div><span className="inspector-node-icon" style={{ "--node-accent": tone.accent, "--node-soft": tone.soft }}><TextBlock size={20} /></span></div>
    <label>Content<textarea value={node.label || ""} onChange={(event) => onChange({ label: event.target.value })} /></label>
    <div className="inspector-field"><span>Size</span><div className="choice-segments"><button className={(node.fontSize || 24) === 16 ? "selected" : ""} onClick={() => onChange({ fontSize: 16 })}>Small</button><button className={(node.fontSize || 24) === 24 ? "selected" : ""} onClick={() => onChange({ fontSize: 24 })}>Medium</button><button className={(node.fontSize || 24) === 36 ? "selected" : ""} onClick={() => onChange({ fontSize: 36 })}>Large</button></div></div>
    <ColorControl node={node} tone={tone} onChange={onChange} />
    {connectionControls}
    <p className="inspector-help">Text blocks expand automatically and can be moved anywhere on the canvas.</p>
  </aside>;
  return <aside className="inspector">
    <div className="inspector-heading"><div><p className="eyebrow">Selected node</p><h2>Appearance</h2></div><span className="inspector-node-icon" style={{ "--node-accent": tone.accent, "--node-soft": tone.soft }}><IconForNode name={node.icon} size={20} /></span></div>
    <label>Title<input value={node.label} onChange={(e) => onChange({ label: e.target.value })} /></label>
    <label>Description<input value={node.subtitle} onChange={(e) => onChange({ subtitle: e.target.value })} /></label>
    <div className="inspector-field"><span>Shape</span><div className="shape-options"><button className={!node.shape ? "selected" : ""} onClick={() => onChange({ shape: null })}>Card</button><button className={node.shape === "process" ? "selected" : ""} onClick={() => onChange({ shape: "process" })}>Process</button><button className={node.shape === "decision" ? "selected" : ""} onClick={() => onChange({ shape: "decision" })}>Decision</button><button className={node.shape === "terminator" ? "selected" : ""} onClick={() => onChange({ shape: "terminator" })}>Start / End</button><button className={node.shape === "data" ? "selected" : ""} onClick={() => onChange({ shape: "data" })}>Input / Output</button></div></div>
    <ColorControl node={node} tone={tone} onChange={onChange} />
    <div className="inspector-field"><span>Icon</span><div className="icon-options">{iconChoices.map((choice) => <button key={choice.id} className={node.icon === choice.id ? "selected" : ""} aria-label={choice.label} title={choice.label} onClick={() => onChange({ icon: choice.id })}><IconForNode name={choice.id} size={18} /></button>)}</div></div>
    {connectionControls}
    <p className="inspector-help">Double-click a node for quick editing. Use the link tool to connect it to another node.</p>
  </aside>;
}

function NodeConnectionsControl({ count, hiddenCount, onHide, onShow }) {
  if (count < 2) return null;
  const visibleCount = count - hiddenCount;
  return <div className="node-connections-control"><div><span>Connections</span><strong>{count}</strong></div><p>{visibleCount} visible · {hiddenCount} hidden</p><div className="choice-segments"><button disabled={visibleCount === 0} onClick={onHide}>Hide all</button><button disabled={hiddenCount === 0} onClick={onShow}>Show all</button></div></div>;
}

function ColorControl({ node, tone, onChange }) {
  return <div className="inspector-field"><span>Colour</span><div className="color-options">{Object.keys(palette).map((color) => <button key={color} aria-label={`Use ${color}`} className={!node.customColor && node.color === color ? "selected" : ""} style={{ background: palette[color].accent }} onClick={() => onChange({ color, customColor: null })} />)}<span className={`custom-color ${node.customColor ? "selected" : ""}`} title="Choose a custom colour" style={{ "--custom-color": node.customColor || tone.accent }}><Palette size={15} weight="bold" /><input aria-label="Custom colour" type="color" value={node.customColor || tone.accent} onChange={(event) => onChange({ color: "custom", customColor: event.target.value })} /></span></div></div>;
}

function EdgeInspector({ edge, onChange, onHide, onDelete }) {
  if (!edge) return null;
  return <aside className="inspector connection-inspector">
    <div className="inspector-heading"><div><p className="eyebrow">Selected path</p><h2>Connection</h2></div><span className="inspector-node-icon connection-icon"><LinkSimple size={20} /></span></div>
    <label>Label<input value={edge.label || ""} onChange={(event) => onChange({ label: event.target.value })} placeholder="Connection label" /></label>
    <div className="inspector-field"><span>Line</span><div className="choice-segments"><button className={(edge.lineStyle || "solid") === "solid" ? "selected" : ""} onClick={() => onChange({ lineStyle: "solid" })}><i className="line-preview solid" />Solid</button><button className={edge.lineStyle === "dashed" ? "selected" : ""} onClick={() => onChange({ lineStyle: "dashed" })}><i className="line-preview dashed" />Dashed</button></div></div>
    <EndpointControl label="Start point" value={edgeEndpoint(edge, "start")} onChange={(startShape) => onChange({ startShape, endpointStyle: null })} />
    <EndpointControl label="End point" value={edgeEndpoint(edge, "end")} onChange={(endShape) => onChange({ endShape, endpointStyle: null })} />
    <button className="hide-connection" onClick={onHide}>Hide connection</button>
    <button className="remove-connection" onClick={onDelete}><Trash size={17} /> Remove connection</button>
    <p className="inspector-help">Hidden paths appear as a count on their source node. Select that count to restore all of the node’s hidden connections.</p>
  </aside>;
}

function EndpointControl({ label, value, onChange }) {
  return <div className="inspector-field"><span>{label}</span><div className="choice-segments endpoint-segments"><button className={value === "none" ? "selected" : ""} onClick={() => onChange("none")}>None</button><button className={value === "arrow" ? "selected" : ""} onClick={() => onChange("arrow")}>Arrow</button><button className={value === "circle" ? "selected" : ""} onClick={() => onChange("circle")}>Circle</button></div></div>;
}

function ShortcutsDialog({ onClose }) {
  useModalKeyboard(onClose, onClose);
  const shortcuts = [
    ["V", "Pointer / select tool"],
    ["H", "Hand / canvas pan tool"],
    ["L", "Link nodes"],
    ["N", "Add a node"],
    ["T", "Add a text block"],
    ["P", "Upload a picture"],
    ["D", "Draw with the pen tool"],
    ["Shift + draw", "Snap the stroke to a straight 15° line"],
    ["Space + drag", "Temporarily pan the canvas"],
    ["Tab", "Add a child to the selected node"],
    ["Enter / Space", "Select a focused node"],
    ["Delete", "Remove selected nodes or paths"],
    ["Esc", "Close a modal or cancel linking"],
    ["⌘ / Ctrl + 0", "Reset the canvas view"],
  ];
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal shortcuts-modal" role="dialog" aria-modal="true" aria-labelledby="shortcuts-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
    <div className="modal-header"><div><p className="eyebrow">Accessibility</p><h2 id="shortcuts-dialog-title">Keyboard shortcuts</h2></div><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={20} /></button></div>
    <div className="shortcuts-list">{shortcuts.map(([keys, action]) => <div key={keys}><kbd>{keys}</kbd><span>{action}</span></div>)}</div>
    <div className="modal-actions"><button className="primary-button" onClick={onClose}>Done</button></div>
  </div></div>;
}

function RenameDialog({ node, onClose, onSave }) {
  const [label, setLabel] = useState(node.label);
  const [subtitle, setSubtitle] = useState(node.subtitle);
  useModalKeyboard(onClose);
  return <div className="modal-backdrop" onMouseDown={onClose}><form className="modal compact-modal" role="dialog" aria-modal="true" aria-labelledby="rename-dialog-title" onSubmit={(e) => { e.preventDefault(); onSave({ label, subtitle }); }} onMouseDown={(e) => e.stopPropagation()}>
    <div className="modal-header"><h2 id="rename-dialog-title">Edit node</h2><button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={19} /></button></div>
    <label>Title<input autoFocus value={label} onChange={(e) => setLabel(e.target.value)} /></label>
    <label>Description<input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} /></label>
    <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button">Save changes</button></div>
  </form></div>;
}

function ExportDialog({ scope, setScope, hasSelection, onClose, onExport }) {
  useModalKeyboard(onClose, () => onExport("pdf"));
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal export-modal" role="dialog" aria-modal="true" aria-labelledby="export-dialog-title" onMouseDown={(e) => e.stopPropagation()}>
    <div className="modal-header"><div><p className="eyebrow">Download</p><h2 id="export-dialog-title">Export canvas</h2></div><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={20} /></button></div>
    <div className="segmented"><button className={scope === "all" ? "active" : ""} onClick={() => setScope("all")}>Whole canvas</button><button disabled={!hasSelection} className={scope === "selected" ? "active" : ""} onClick={() => setScope("selected")}>Selected items</button></div>
    {!hasSelection && <p className="dialog-note">Select one or more nodes to enable a focused export.</p>}
    <div className="export-grid">
      <button onClick={() => onExport("pdf")}><FilePdf size={27} weight="duotone" /><span><strong>PDF</strong><small>Ready to present</small></span></button>
      <button onClick={() => onExport("jpg")}><FileJpg size={27} weight="duotone" /><span><strong>JPG</strong><small>Easy to share</small></span></button>
      <button onClick={() => onExport("svg")}><FileSvg size={27} weight="duotone" /><span><strong>SVG</strong><small>Editable vector</small></span></button>
    </div>
  </div></div>;
}

function ShareDialog({ document, url, onToggle, onClose }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard?.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1400); };
  useModalKeyboard(onClose, document.shared ? copy : onToggle);
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal share-modal" role="dialog" aria-modal="true" aria-labelledby="share-dialog-title" onMouseDown={(e) => e.stopPropagation()}>
    <div className="modal-header"><div><p className="eyebrow">Publish</p><h2 id="share-dialog-title">Share this canvas</h2></div><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={20} /></button></div>
    <div className="share-status"><span className={document.shared ? "live" : ""}><ShareNetwork size={21} /></span><div><strong>{document.shared ? "Anyone with the link can view" : "This canvas is private"}</strong><small>Shared canvases are view-only.</small></div><button className={`switch ${document.shared ? "on" : ""}`} onClick={onToggle}><i /></button></div>
    <div className={`copy-field ${!document.shared ? "disabled" : ""}`}><span>{url}</span><button disabled={!document.shared} onClick={copy}>{copied ? <Check size={18} /> : <Copy size={18} />}{copied ? "Copied" : "Copy"}</button></div>
    <p className="dialog-note">After deployment, this URL uses your own domain and the canvas slug.</p>
  </div></div>;
}

function NotFound() {
  return <div className="not-found"><Brand /><div><span><FolderOpen size={28} /></span><h1>Canvas not found</h1><p>This link may be private, deleted, or mistyped.</p><button className="primary-button" onClick={() => navigate("/")}>Go to dashboard</button></div></div>;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function rasterizeSvg(svg, width, height, format, filename) {
  const source = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  const image = new Image();
  image.onload = () => {
    const canvas = window.document.createElement("canvas");
    const scale = Math.min(2, 4000 / Math.max(width, height));
    canvas.width = width * scale;
    canvas.height = height * scale;
    const context = canvas.getContext("2d");
    context.scale(scale, scale);
    context.drawImage(image, 0, 0, width, height);
    const jpg = canvas.toDataURL("image/jpeg", .94);
    if (format === "jpg") {
      const anchor = window.document.createElement("a");
      anchor.href = jpg;
      anchor.download = `${filename}.jpg`;
      anchor.click();
    } else {
      const landscape = width >= height;
      const pdf = new jsPDF({ orientation: landscape ? "landscape" : "portrait", unit: "pt", format: [width, height] });
      pdf.addImage(jpg, "JPEG", 0, 0, width, height);
      pdf.save(`${filename}.pdf`);
    }
    URL.revokeObjectURL(source);
  };
  image.src = source;
}
