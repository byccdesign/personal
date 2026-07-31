import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Download as ArrowDownTrayIcon,
  ArrowLeft as ArrowLeftIcon,
  MoveRight as ArrowLongRightIcon,
  RefreshCw as ArrowPathIcon,
  ArrowRight as ArrowRightIcon,
  ArrowUp as ArrowUpIcon,
  ExternalLink as ArrowTopRightOnSquareIcon,
  GraduationCap as AcademicCapIcon,
  AlignLeft as Bars3BottomLeftIcon,
  AlignRight as Bars3BottomRightIcon,
  AlignCenter as Bars3CenterLeftIcon,
  Bell as BellIcon,
  Zap as BoltIcon,
  Briefcase as BriefcaseIcon,
  Landmark as BuildingLibraryIcon,
  Bug as BugAntIcon,
  Camera as CameraIcon,
  CalendarDays as CalendarDaysIcon,
  BarChart3 as ChartBarIcon,
  MessageCircle as ChatBubbleLeftEllipsisIcon,
  Check as CheckIcon,
  ChevronDown as ChevronDownIcon,
  Database as CircleStackIcon,
  Cloud as CloudIcon,
  Code as CodeBracketIcon,
  Settings as Cog6ToothIcon,
  Box as CubeIcon,
  DollarSign as CurrencyDollarIcon,
  MousePointerClick as CursorArrowRaysIcon,
  MousePointer2 as CursorArrowRippleIcon,
  Copy as DocumentDuplicateIcon,
  FileText as DocumentTextIcon,
  EyeOff as EyeSlashIcon,
  Eye as EyeIcon,
  Mail as EnvelopeIcon,
  Flag as FlagIcon,
  FolderOpen as FolderOpenIcon,
  Globe as GlobeAmericasIcon,
  Hand as HandRaisedIcon,
  Heart as HeartIcon,
  Home as HomeIcon,
  Heading1 as H1Icon,
  Key as KeyIcon,
  Lightbulb as LightBulbIcon,
  Link as LinkIcon,
  List as ListBulletIcon,
  ZoomOut as MagnifyingGlassMinusIcon,
  Search as MagnifyingGlassIcon,
  ZoomIn as MagnifyingGlassPlusIcon,
  MapPin as MapPinIcon,
  Megaphone as MegaphoneIcon,
  Minus as MinusIcon,
  Music as MusicalNoteIcon,
  Phone as PhoneIcon,
  Plus as PlusIcon,
  Image as PhotoIcon,
  Pencil as PencilIcon,
  Pause as PauseIcon,
  Play as PlayIcon,
  HelpCircle as QuestionMarkCircleIcon,
  Rocket as RocketLaunchIcon,
  LogOut as ArrowRightStartOnRectangleIcon,
  ShieldCheck as ShieldCheckIcon,
  ShoppingCart as ShoppingCartIcon,
  Share2 as ShareIcon,
  Sparkles as SparklesIcon,
  LayoutGrid as Squares2X2Icon,
  CircleStop as StopCircleIcon,
  Palette as SwatchIcon,
  Star as StarIcon,
  Tag as TagIcon,
  Trash2 as TrashIcon,
  Truck as TruckIcon,
  CircleUserRound as UserCircleIcon,
  Users as UsersIcon,
  Scan as ViewfinderCircleIcon,
  Wrench as WrenchScrewdriverIcon,
  X as XMarkIcon,
  Undo2,
  Redo2,
  StickyNote,
  Network,
  Workflow,
  Search,
  ArrowUpToLine,
  ArrowDownToLine,
  Group,
  Ungroup,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import * as HeroOutlineIcons from "@heroicons/react/24/outline";
import { jsPDF } from "jspdf";
import { getStroke } from "perfect-freehand";
import penIcon from "./assets/pen.png";
import highlighterIcon from "./assets/highlighter.png";

function adaptHeroIcon(Icon) {
  return function HeroIconAdapter({ size = 24, weight: _weight, ...props }) {
    return <Icon width={size} height={size} {...props} />;
  };
}

const HERO_ICON_ENTRIES = Object.entries(LucideIcons)
  .filter(([name, component]) => name.endsWith("Icon") && name !== "Icon" && typeof component === "object")
  .sort(([a], [b]) => a.localeCompare(b));


const ArrowLeft = adaptHeroIcon(ArrowLeftIcon);
const ArrowLine = adaptHeroIcon(ArrowLongRightIcon);
const ArrowRight = adaptHeroIcon(ArrowRightIcon);
const ArrowUp = adaptHeroIcon(ArrowUpIcon);
const AcademicCap = adaptHeroIcon(AcademicCapIcon);
const Bell = adaptHeroIcon(BellIcon);
const Bolt = adaptHeroIcon(BoltIcon);
const Briefcase = adaptHeroIcon(BriefcaseIcon);
const OpenExternal = adaptHeroIcon(ArrowTopRightOnSquareIcon);
const ArrowsClockwise = adaptHeroIcon(ArrowPathIcon);
const Brain = adaptHeroIcon(LightBulbIcon);
const Buildings = adaptHeroIcon(BuildingLibraryIcon);
const Bug = adaptHeroIcon(BugAntIcon);
const Camera = adaptHeroIcon(CameraIcon);
const CalendarBlank = adaptHeroIcon(CalendarDaysIcon);
const CaretDown = adaptHeroIcon(ChevronDownIcon);
const ChartLineUp = adaptHeroIcon(ChartBarIcon);
const Check = adaptHeroIcon(CheckIcon);
const ChatCircleDots = adaptHeroIcon(ChatBubbleLeftEllipsisIcon);
const CirclesFour = adaptHeroIcon(Squares2X2Icon);
const Cloud = adaptHeroIcon(CloudIcon);
const Code = adaptHeroIcon(CodeBracketIcon);
const Cube = adaptHeroIcon(CubeIcon);
const Copy = adaptHeroIcon(DocumentDuplicateIcon);
const CursorClick = adaptHeroIcon(CursorArrowRaysIcon);
const LinkNodes = adaptHeroIcon(CursorArrowRippleIcon);
const Database = adaptHeroIcon(CircleStackIcon);
const Dollar = adaptHeroIcon(CurrencyDollarIcon);
const DownloadSimple = adaptHeroIcon(ArrowDownTrayIcon);
const Logout = adaptHeroIcon(ArrowRightStartOnRectangleIcon);
const FileJpg = adaptHeroIcon(DocumentTextIcon);
const FilePdf = adaptHeroIcon(DocumentTextIcon);
const FileSvg = adaptHeroIcon(DocumentTextIcon);
const FileText = adaptHeroIcon(DocumentTextIcon);
const EyeSlash = adaptHeroIcon(EyeSlashIcon);
const Eye = adaptHeroIcon(EyeIcon);
const Envelope = adaptHeroIcon(EnvelopeIcon);
const Flag = adaptHeroIcon(FlagIcon);
const FolderOpen = adaptHeroIcon(FolderOpenIcon);
const Hand = adaptHeroIcon(HandRaisedIcon);
const Heart = adaptHeroIcon(HeartIcon);
const Home = adaptHeroIcon(HomeIcon);
const HeadingOne = adaptHeroIcon(H1Icon);
const Key = adaptHeroIcon(KeyIcon);
const Gear = adaptHeroIcon(Cog6ToothIcon);
const GlobeHemisphereWest = adaptHeroIcon(GlobeAmericasIcon);
const LinkSimple = adaptHeroIcon(LinkIcon);
const Lightbulb = adaptHeroIcon(LightBulbIcon);
const ListBullets = adaptHeroIcon(ListBulletIcon);
const MagnifyingGlassMinus = adaptHeroIcon(MagnifyingGlassMinusIcon);
const MagnifyingGlass = adaptHeroIcon(MagnifyingGlassIcon);
const MagnifyingGlassPlus = adaptHeroIcon(MagnifyingGlassPlusIcon);
const MapPin = adaptHeroIcon(MapPinIcon);
const Megaphone = adaptHeroIcon(MegaphoneIcon);
const Minus = adaptHeroIcon(MinusIcon);
const Plus = adaptHeroIcon(PlusIcon);
const Music = adaptHeroIcon(MusicalNoteIcon);
const Phone = adaptHeroIcon(PhoneIcon);
const TextBlock = adaptHeroIcon(Bars3BottomLeftIcon);
const TextAlignCenter = adaptHeroIcon(Bars3CenterLeftIcon);
const TextAlignRight = adaptHeroIcon(Bars3BottomRightIcon);
const Photo = adaptHeroIcon(PhotoIcon);
const Pen = adaptHeroIcon(PencilIcon);
const Pause = adaptHeroIcon(PauseIcon);
const Play = adaptHeroIcon(PlayIcon);
const HelpCircle = adaptHeroIcon(QuestionMarkCircleIcon);
const Palette = adaptHeroIcon(SwatchIcon);
const RocketLaunch = adaptHeroIcon(RocketLaunchIcon);
const Shield = adaptHeroIcon(ShieldCheckIcon);
const ShoppingCart = adaptHeroIcon(ShoppingCartIcon);
const ShareNetwork = adaptHeroIcon(ShareIcon);
const Sparkle = adaptHeroIcon(SparklesIcon);
const StopCircle = adaptHeroIcon(StopCircleIcon);
const Star = adaptHeroIcon(StarIcon);
const Tag = adaptHeroIcon(TagIcon);
const Trash = adaptHeroIcon(TrashIcon);
const Truck = adaptHeroIcon(TruckIcon);
const UserCircle = adaptHeroIcon(UserCircleIcon);
const Users = adaptHeroIcon(UsersIcon);
const Viewfinder = adaptHeroIcon(ViewfinderCircleIcon);
const Wrench = adaptHeroIcon(WrenchScrewdriverIcon);
const X = adaptHeroIcon(XMarkIcon);

const STORAGE_KEY = "mymind.documents.v1";
const STORAGE_INDEX_KEY = "mymind.documentIndex.v2";
const STORAGE_DOCUMENT_PREFIX = "mymind.document.v2.";
const STORAGE_METADATA_KEY = "mymind.documentMetadata.v3";
const DOCUMENT_CACHE_DB = "mymind-document-cache";
const DOCUMENT_CACHE_STORE = "documents";
const FOLDERS_KEY = "mymind.folders.v1";
const ANNOTATION_TOKEN_KEY = "mymind.annotationTokens.v1";
const PRESENCE_CLIENT_KEY = "mymind.presenceClient.v1";
const NODE_SIZE = { width: 184, height: 82 };
const APP_BASE = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
const AVATAR_COLORS = ["#596dec", "#8a70e8", "#43a6a1", "#d07b55", "#b56591", "#5e8bbf"];

function participantAvatarColor(value, offset = 0) {
  const hash = Array.from(String(value || "guest")).reduce((total, character) => total + character.charCodeAt(0), offset);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function presenceClientId() {
  try {
    const existing = sessionStorage.getItem(PRESENCE_CLIENT_KEY);
    if (existing) return existing;
    const next = globalThis.crypto?.randomUUID?.() || uid("presence");
    sessionStorage.setItem(PRESENCE_CLIENT_KEY, next);
    return next;
  } catch {
    return uid("presence");
  }
}

function annotationTokens() {
  try { return JSON.parse(localStorage.getItem(ANNOTATION_TOKEN_KEY) || "{}"); }
  catch { return {}; }
}

function rememberAnnotationToken(id, token) {
  if (!id || !token) return;
  const tokens = annotationTokens();
  tokens[id] = token;
  localStorage.setItem(ANNOTATION_TOKEN_KEY, JSON.stringify(tokens));
}

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
  { id: "home", label: "Home" },
  { id: "briefcase", label: "Work" },
  { id: "academic", label: "Learning" },
  { id: "heart", label: "Health" },
  { id: "star", label: "Favorite" },
  { id: "bolt", label: "Energy" },
  { id: "code", label: "Development" },
  { id: "bug", label: "Bug" },
  { id: "cloud", label: "Cloud" },
  { id: "shield", label: "Security" },
  { id: "key", label: "Access" },
  { id: "dollar", label: "Finance" },
  { id: "cart", label: "Shopping" },
  { id: "truck", label: "Delivery" },
  { id: "pin", label: "Location" },
  { id: "megaphone", label: "Marketing" },
  { id: "mail", label: "Email" },
  { id: "phone", label: "Call" },
  { id: "camera", label: "Photo" },
  { id: "music", label: "Music" },
  { id: "tag", label: "Category" },
  { id: "wrench", label: "Tools" },
];

const iconKeywordRules = [
  ["bug issue error fix defect", "bug"], ["code develop software api app website", "code"], ["school learn study course education", "academic"],
  ["money finance budget revenue price payment", "dollar"], ["shop cart purchase order product", "cart"], ["ship delivery logistics transport", "truck"],
  ["security secure privacy protect", "shield"], ["password key access login", "key"], ["email mail newsletter", "mail"],
  ["call phone contact", "phone"], ["photo image camera", "camera"], ["music audio song", "music"],
  ["home house", "home"], ["work job business career", "briefcase"], ["health wellness love heart", "heart"],
  ["location place map address", "pin"], ["market campaign announce promote", "megaphone"], ["cloud server hosting", "cloud"],
  ["goal milestone target flag", "flag"], ["launch rocket start", "rocket"], ["calendar date meeting schedule event", "calendar"],
  ["data database storage", "database"], ["growth analytics chart metric report", "chart"], ["team people audience group", "users"],
  ["person user customer profile", "user"], ["message chat conversation comment", "chat"], ["document file note brief", "file"],
  ["process workflow system settings", "gear"], ["global world international", "globe"], ["idea insight concept brainstorm", "brain"],
  ["complete done success result outcome", "check"], ["tool repair build", "wrench"], ["energy fast urgent lightning", "bolt"],
];

function recommendedIconFor(text) {
  const normalized = String(text || "").toLowerCase();
  const words = new Set(normalized.split(/[^a-z0-9]+/).filter(Boolean));
  const match = iconKeywordRules.find(([keywords]) => keywords.split(" ").some((keyword) => words.has(keyword)));
  return match?.[1] || "brain";
}

function toneForNode(node) {
  if (node?.customColor && /^#[0-9a-f]{6}$/i.test(node.customColor)) {
    return { accent: node.customColor, soft: `${node.customColor}18` };
  }
  return palette[node?.color] || palette.violet;
}

function accessibleShapeColors(background) {
  const hex = /^#[0-9a-f]{6}$/i.test(background || "") ? background : "#8b6ff3";
  const rgb = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255);
  const luminance = rgb.map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
  const useLightText = (1.05 / (luminance + .05)) >= ((luminance + .05) / .05);
  return useLightText
    ? { text: "#ffffff", muted: "#ffffff" }
    : { text: "#000000", muted: "#000000" };
}

function fittedTextDimensions(label, fontSize = 24) {
  const value = String(label || "Text");
  const width = Math.min(420, Math.max(112, Math.max(...value.split("\n").map((line) => line.length), 1) * fontSize * .58 + 20));
  const charsPerLine = Math.max(8, Math.floor((width - 12) / (fontSize * .58)));
  const lineCount = value.split("\n").reduce((count, line) => count + Math.max(1, Math.ceil(line.length / charsPerLine)), 0);
  return { width, height: Math.max(50, Math.ceil(lineCount * fontSize * 1.25 + 20)) };
}

function nodeDimensions(node) {
  if (node?.type === "icon") return { width: node.width || 64, height: node.height || node.width || 64 };
  if (node?.type === "link") return { width: node.width || 300, height: 196 };
  if (node?.type === "image") {
    const width = node.width || 280;
    const cropRatios = { square: 1, "4:3": 4 / 3, "16:9": 16 / 9 };
    const aspectRatio = cropRatios[node.cropAspect] || node.aspectRatio || 1.55;
    return { width, height: Math.round(width / aspectRatio) };
  }
  if (node?.type === "arrow") return { width: node.width || 220, height: node.height || 44 };
  if (node?.type === "text") {
    const fontSize = node.fontSize || 24;
    if (node.textFit === "auto") return fittedTextDimensions(node.label, fontSize);
    const longestLine = Math.max(1, ...String(node.label || "Text").split("\n").map((line) => line.length));
    const width = node.width || Math.min(420, Math.max(130, longestLine * fontSize * .58 + 28));
    const charsPerLine = Math.max(8, Math.floor((width - 20) / (fontSize * .58)));
    const lineCount = String(node.label || "Text").split("\n").reduce((count, line) => count + Math.max(1, Math.ceil(line.length / charsPerLine)), 0);
    return { width, height: node.height || Math.max(52, lineCount * fontSize * 1.25 + 22) };
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

function nodeBounds(node) {
  const size = nodeDimensions(node);
  return { minX: node.x, minY: node.y, maxX: node.x + size.width, maxY: node.y + size.height };
}

function drawingBounds(drawing) {
  const points = drawing.points || [];
  if (!points.length) return null;
  const padding = Math.max(4, (drawing.width || 2.4) / 2);
  return {
    minX: Math.min(...points.map((point) => point.x)) - padding,
    minY: Math.min(...points.map((point) => point.y)) - padding,
    maxX: Math.max(...points.map((point) => point.x)) + padding,
    maxY: Math.max(...points.map((point) => point.y)) + padding,
  };
}

function rectIntersects(a, b) {
  return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
}

function selectedElementsBounds(nodes, drawings) {
  const boxes = [...nodes.map(nodeBounds), ...drawings.map(drawingBounds).filter(Boolean)];
  if (!boxes.length) return null;
  const minX = Math.min(...boxes.map((box) => box.minX));
  const minY = Math.min(...boxes.map((box) => box.minY));
  const maxX = Math.max(...boxes.map((box) => box.maxX));
  const maxY = Math.max(...boxes.map((box) => box.maxY));
  return { x: minX, y: minY, width: Math.max(1, maxX - minX), height: Math.max(1, maxY - minY) };
}

function normaliseLinkUrl(value) {
  const input = String(value || "").trim();
  if (!input) return null;
  if (!/^https?:\/\//i.test(input) && !input.includes(".")) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

function mediaPreviewForUrl(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    let youtubeId = null;
    if (host === "youtu.be") youtubeId = url.pathname.split("/").filter(Boolean)[0];
    if (host.endsWith("youtube.com")) youtubeId = url.searchParams.get("v") || url.pathname.match(/\/(?:shorts|embed)\/([^/?#]+)/)?.[1];
    if (youtubeId) return {
      mediaKind: "youtube",
      thumbnail: `${APP_BASE}api/index.php?action=youtube-thumbnail&id=${encodeURIComponent(youtubeId)}`,
      thumbnailFallbacks: [`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`, `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`, `https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg`],
      thumbnailKind: "preview",
    };
    if (host.endsWith("instagram.com")) {
      const match = url.pathname.match(/\/(p|reel|tv)\/([^/?#]+)/);
      if (match) return { mediaKind: match[1] === "reel" ? "instagram-reel" : "instagram", embedUrl: `https://www.instagram.com/${match[1]}/${match[2]}/embed/`, thumbnailKind: "embed" };
    }
  } catch { /* The URL was already validated by normaliseLinkUrl. */ }
  return {};
}

function edgeGeometry(edge, source, target, offsetX = 0, offsetY = 0) {
  const sourceSize = nodeDimensions(source), targetSize = nodeDimensions(target);
  const sourcePort = edge.sourcePort || "auto";
  const targetPort = edge.targetPort || "auto";
  const goesRight = target.x >= source.x;
  let sx, sy;
  if (sourcePort === "top") { sx = source.x + sourceSize.width / 2; sy = source.y; }
  else if (sourcePort === "bottom") { sx = source.x + sourceSize.width / 2; sy = source.y + sourceSize.height; }
  else if (sourcePort === "left") { sx = source.x; sy = source.y + sourceSize.height / 2; }
  else if (sourcePort === "right") { sx = source.x + sourceSize.width; sy = source.y + sourceSize.height / 2; }
  else { sx = goesRight ? source.x + sourceSize.width : source.x; sy = source.y + sourceSize.height / 2; }

  let tx, ty;
  if (targetPort === "top") { tx = target.x + targetSize.width / 2; ty = target.y; }
  else if (targetPort === "bottom") { tx = target.x + targetSize.width / 2; ty = target.y + targetSize.height; }
  else if (targetPort === "left") { tx = target.x; ty = target.y + targetSize.height / 2; }
  else if (targetPort === "right") { tx = target.x + targetSize.width; ty = target.y + targetSize.height / 2; }
  else if (target.shape === "decision") { tx = target.x + targetSize.width / 2; ty = target.y; }
  else if (sourcePort === "bottom" && target.y >= source.y) { tx = target.x + targetSize.width / 2; ty = target.y; }
  else { tx = goesRight ? target.x : target.x + targetSize.width; ty = target.y + targetSize.height / 2; }

  sx -= offsetX; sy -= offsetY; tx -= offsetX; ty -= offsetY;
  const orthogonal = edge.routing === "orthogonal" || source.shape || target.shape;
  if (orthogonal) {
    if (sourcePort === "bottom" || sourcePort === "top" || (sourcePort === "auto" && (targetPort === "bottom" || targetPort === "top"))) {
      const midY = sy + (ty - sy) / 2;
      return { path: `M ${sx} ${sy} L ${sx} ${midY} L ${tx} ${midY} L ${tx} ${ty}`, labelX: sx === tx ? sx + 22 : (sx + tx) / 2, labelY: midY - 8, startX: sx, startY: sy, endX: tx, endY: ty };
    }
    const midX = sx + (tx - sx) / 2;
    return { path: `M ${sx} ${sy} L ${midX} ${sy} L ${midX} ${ty} L ${tx} ${ty}`, labelX: midX, labelY: (sy + ty) / 2 - 8, startX: sx, startY: sy, endX: tx, endY: ty };
  }
  const direction = goesRight ? 1 : -1;
  const bend = Math.max(70, Math.abs(tx - sx) * .48);
  return { path: `M ${sx} ${sy} C ${sx + bend * direction} ${sy}, ${tx - bend * direction} ${ty}, ${tx} ${ty}`, labelX: (sx + tx) / 2, labelY: (sy + ty) / 2 - 10, startX: sx, startY: sy, endX: tx, endY: ty };
}

function reconnectPreviewPath(edge, source, target, side, point) {
  const geometry = edgeGeometry(edge, source, target);
  const fixed = side === "target" ? { x: geometry.startX, y: geometry.startY } : { x: geometry.endX, y: geometry.endY };
  const start = side === "target" ? fixed : point;
  const end = side === "target" ? point : fixed;
  const direction = end.x >= start.x ? 1 : -1;
  const bend = Math.max(60, Math.abs(end.x - start.x) * .45);
  return `M ${start.x} ${start.y} C ${start.x + bend * direction} ${start.y}, ${end.x - bend * direction} ${end.y}, ${end.x} ${end.y}`;
}

function connectionPreviewPath(source, sourcePort, point) {
  const size = nodeDimensions(source);
  const port = sourcePort || "auto";
  const goesRight = point.x >= source.x + size.width / 2;
  let x = source.x + (goesRight ? size.width : 0);
  let y = source.y + size.height / 2;
  if (port === "left") x = source.x;
  if (port === "right") x = source.x + size.width;
  if (port === "bottom") { x = source.x + size.width / 2; y = source.y + size.height; }
  if (port === "top") { x = source.x + size.width / 2; y = source.y; }
  if (port === "bottom" || port === "top") {
    const bend = Math.max(44, Math.abs(point.y - y) * .45);
    return `M ${x} ${y} C ${x} ${y + bend}, ${point.x} ${point.y - bend}, ${point.x} ${point.y}`;
  }
  const bend = Math.max(54, Math.abs(point.x - x) * .45);
  const direction = port === "left" ? -1 : port === "right" ? 1 : (goesRight ? 1 : -1);
  return `M ${x} ${y} C ${x + bend * direction} ${y}, ${point.x - bend * direction} ${point.y}, ${point.x} ${point.y}`;
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

function svgPathFromStroke(points = []) {
  if (points.length < 3) return "";
  const average = (a, b) => (a + b) / 2;
  let path = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)} Q ${points[1][0].toFixed(2)} ${points[1][1].toFixed(2)} ${average(points[1][0], points[2][0]).toFixed(2)} ${average(points[1][1], points[2][1]).toFixed(2)} T`;
  for (let index = 2; index < points.length - 1; index += 1) {
    path += ` ${average(points[index][0], points[index + 1][0]).toFixed(2)} ${average(points[index][1], points[index + 1][1]).toFixed(2)}`;
  }
  return `${path} Z`;
}

function perfectDrawingPath(drawing, offsetX = 0, offsetY = 0) {
  const input = (drawing?.points || []).map((point) => [point.x - offsetX, point.y - offsetY, point.pressure ?? .5]);
  if (input.length < 2) return "";
  const isHighlighter = drawing.mode === "highlighter";
  return svgPathFromStroke(getStroke(input, {
    size: drawing.width || 2.4,
    thinning: 0,
    smoothing: .5,
    streamline: drawing.streamline ?? .65,
    simulatePressure: false,
    last: true,
    start: { cap: !isHighlighter },
    end: { cap: !isHighlighter },
  }));
}

function rangeFillStyle(value, min, max) {
  const pct = ((value - min) / (max - min)) * 100;
  return { backgroundImage: "linear-gradient(var(--primary), var(--primary))", backgroundSize: `${pct}% 100%` };
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

function readImageFile(file, { metadataOnly = false } = {}) {
  return new Promise((resolve, reject) => {
    const source = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      if (metadataOnly) {
        URL.revokeObjectURL(source);
        resolve({ dataUrl: null, aspectRatio: image.naturalWidth / image.naturalHeight || 1, mimeType: file.type, isGif: file.type === "image/gif", isSvg: file.type === "image/svg+xml" });
        return;
      }
      if (file.type === "image/gif") {
        const reader = new FileReader();
        reader.onload = () => {
          URL.revokeObjectURL(source);
          resolve({ dataUrl: reader.result, aspectRatio: image.naturalWidth / image.naturalHeight || 1, mimeType: file.type, isGif: true });
        };
        reader.onerror = () => { URL.revokeObjectURL(source); reject(new Error("Unable to read GIF")); };
        reader.readAsDataURL(file);
        return;
      }
      if (file.type === "image/svg+xml") {
        const reader = new FileReader();
        reader.onload = () => {
          URL.revokeObjectURL(source);
          resolve({ dataUrl: reader.result, aspectRatio: image.naturalWidth / image.naturalHeight || 1, mimeType: file.type, isSvg: true });
        };
        reader.onerror = () => { URL.revokeObjectURL(source); reject(new Error("Unable to read SVG")); };
        reader.readAsDataURL(file);
        return;
      }
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
      const outputType = file.type === "image/png" ? "image/png" : file.type === "image/webp" ? "image/webp" : "image/jpeg";
      resolve({ dataUrl: canvas.toDataURL(outputType, .9), aspectRatio: width / height, mimeType: outputType, isSvg: false });
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
  nodes: [{ id: "start", x: 470, y: 260, label: "Start here", subtitle: "Double-click to edit", icon: "brain", color: "violet" }],
  edges: [],
});

function pageContent(source = {}) {
  return {
    nodes: Array.isArray(source.nodes) ? source.nodes.map((node) => {
      if (node?.type !== "link" || !node.linkUrl) return node;
      const mediaPreview = mediaPreviewForUrl(node.linkUrl);
      return mediaPreview.mediaKind === "youtube" ? { ...node, ...mediaPreview } : node;
    }) : [],
    edges: Array.isArray(source.edges) ? source.edges : [],
    drawings: Array.isArray(source.drawings) ? source.drawings : [],
    annotations: Array.isArray(source.annotations) ? source.annotations : [],
  };
}

function normalisePagedDocument(source) {
  const document = source || {};
  const existingPages = Array.isArray(document.pages) && document.pages.length
    ? document.pages.map((page, index) => ({ id: page.id || uid("page"), name: String(page.name || `Page ${index + 1}`), ...pageContent(page) }))
    : [{ id: "page-1", name: "Page 1", ...pageContent(document) }];
  const activePageId = existingPages.some((page) => page.id === document.activePageId) ? document.activePageId : existingPages[0].id;
  const activePage = existingPages.find((page) => page.id === activePageId) || existingPages[0];
  return { ...document, pages: existingPages, activePageId, ...pageContent(activePage) };
}

function syncActivePage(document) {
  if (!document?.activePageId || !Array.isArray(document.pages)) return document;
  const content = pageContent(document);
  return { ...document, pages: document.pages.map((page) => page.id === document.activePageId ? { ...page, ...content } : page) };
}

function activatePage(document, pageId) {
  const synced = syncActivePage(document);
  const page = synced.pages.find((item) => item.id === pageId);
  return page ? { ...synced, activePageId: page.id, ...pageContent(page) } : synced;
}

async function parseMyMindFile(file) {
  if (!file) throw new Error("Choose a MyMind canvas file.");
  if (file.size > 50 * 1024 * 1024) throw new Error("This canvas file is larger than the 50 MB import limit.");
  let payload;
  try { payload = JSON.parse(await file.text()); }
  catch { throw new Error("MyMind could not read this file. It may be damaged or incomplete."); }
  if (payload?.type !== "mymind-canvas" || payload.version !== 1 || !payload.document) throw new Error("This is not a valid .mymind canvas file.");
  const imported = normalisePagedDocument(payload.document);
  const nodeCount = (imported.pages || []).reduce((sum, page) => sum + (page.nodes?.length || 0), 0);
  const drawingCount = (imported.pages || []).reduce((sum, page) => sum + (page.drawings?.length || 0), 0);
  const drawingPointCount = (imported.pages || []).reduce((sum, page) => sum + (page.drawings || []).reduce((points, drawing) => points + (drawing.points?.length || 0), 0), 0);
  if (nodeCount > 50000 || drawingPointCount > 2000000) throw new Error("This canvas exceeds MyMind’s safe import limits.");
  return { imported, itemCount: nodeCount + drawingCount };
}

function seedDocuments() {
  const process = processTemplate();
  const mind = mindMapTemplate();
  return [
    { id: "sample-flow", title: "Payment flow", slug: "payment-flow", shared: true, updatedAt: new Date().toISOString(), ...process },
    { id: "sample-mind", title: "Launch mind map", slug: "launch-mind-map", shared: false, updatedAt: new Date(Date.now() - 86400000).toISOString(), ...mind },
  ];
}

function documentMetadata(document) {
  return {
    id: document.id,
    title: document.title,
    slug: document.slug,
    shared: Boolean(document.shared),
    guestEditable: Boolean(document.guestEditable),
    folderId: document.folderId || null,
    updatedAt: document.updatedAt,
    revision: Number(document.revision || 0),
  };
}

function readLocalDocumentMetadata() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_METADATA_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch { return []; }
}

function writeLocalDocumentMetadata(documents) {
  try {
    localStorage.setItem(STORAGE_METADATA_KEY, JSON.stringify(documents.map(documentMetadata)));
    return true;
  } catch { return false; }
}

function openDocumentCache() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") { reject(new Error("IndexedDB unavailable")); return; }
    const request = indexedDB.open(DOCUMENT_CACHE_DB, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(DOCUMENT_CACHE_STORE)) {
        request.result.createObjectStore(DOCUMENT_CACHE_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Could not open canvas cache"));
  });
}

async function readLocalDocument(id) {
  try {
    const database = await openDocumentCache();
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(DOCUMENT_CACHE_STORE, "readonly");
      const request = transaction.objectStore(DOCUMENT_CACHE_STORE).get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error("Could not read canvas cache"));
      transaction.oncomplete = () => database.close();
    });
  } catch { return null; }
}

async function writeLocalDocument(document) {
  const metadata = readLocalDocumentMetadata();
  const nextMetadata = metadata.some((item) => item.id === document.id)
    ? metadata.map((item) => item.id === document.id ? documentMetadata(document) : item)
    : [documentMetadata(document), ...metadata];
  writeLocalDocumentMetadata(nextMetadata);
  try {
    const database = await openDocumentCache();
    await new Promise((resolve, reject) => {
      const transaction = database.transaction(DOCUMENT_CACHE_STORE, "readwrite");
      transaction.objectStore(DOCUMENT_CACHE_STORE).put(document);
      transaction.oncomplete = () => { database.close(); resolve(); };
      transaction.onerror = () => reject(transaction.error || new Error("Could not cache canvas"));
    });
    localStorage.removeItem(`${STORAGE_DOCUMENT_PREFIX}${document.id}`);
    return true;
  } catch {
    return false;
  }
}

async function removeLocalDocument(id) {
  try {
    localStorage.removeItem(`${STORAGE_DOCUMENT_PREFIX}${id}`);
    const index = JSON.parse(localStorage.getItem(STORAGE_INDEX_KEY) || "[]");
    if (Array.isArray(index)) localStorage.setItem(STORAGE_INDEX_KEY, JSON.stringify(index.filter((item) => item !== id)));
    const database = await openDocumentCache();
    await new Promise((resolve, reject) => {
      const transaction = database.transaction(DOCUMENT_CACHE_STORE, "readwrite");
      transaction.objectStore(DOCUMENT_CACHE_STORE).delete(id);
      transaction.oncomplete = () => { database.close(); resolve(); };
      transaction.onerror = () => reject(transaction.error || new Error("Could not remove cached canvas"));
    });
  } catch {
    // Server deletion remains authoritative when browser storage is unavailable.
  }
}

async function clearLocalWorkspace() {
  try {
    const index = JSON.parse(localStorage.getItem(STORAGE_INDEX_KEY) || "[]");
    if (Array.isArray(index)) index.forEach((id) => localStorage.removeItem(`${STORAGE_DOCUMENT_PREFIX}${id}`));
    localStorage.removeItem(STORAGE_INDEX_KEY);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_METADATA_KEY);
    localStorage.removeItem(FOLDERS_KEY);
    if (typeof indexedDB !== "undefined") {
      await new Promise((resolve) => {
        const request = indexedDB.deleteDatabase(DOCUMENT_CACHE_DB);
        request.onsuccess = request.onerror = request.onblocked = () => resolve();
      });
    }
  } catch {
    // The server session is still invalidated even if browser storage is unavailable.
  }
}

function readLocalFolders() {
  try { const stored = JSON.parse(localStorage.getItem(FOLDERS_KEY)); return Array.isArray(stored) ? stored : []; }
  catch { return []; }
}

function writeLocalFolders(folders) {
  try { localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders)); }
  catch { /* The server remains the primary persistence layer. */ }
}

async function apiRequest(action, body, { onProgress, signal } = {}) {
  onProgress?.(8);
  const response = await fetch(`${APP_BASE}api/index.php?action=${action}`, {
    method: body ? "POST" : "GET",
    cache: "no-store",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });
  onProgress?.(28);
  let payload = null;
  if (onProgress && response.body) {
    const reader = response.body.getReader();
    const expectedBytes = Number(response.headers.get("Content-Length") || 0);
    const decoder = new TextDecoder();
    const textChunks = [];
    let receivedBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textChunks.push(decoder.decode(value, { stream: true }));
      receivedBytes += value.byteLength;
      const transferProgress = expectedBytes > 0
        ? Math.min(92, 28 + (receivedBytes / expectedBytes) * 64)
        : Math.min(88, 28 + Math.log2(receivedBytes / 16384 + 1) * 12);
      onProgress(Math.round(transferProgress));
    }
    textChunks.push(decoder.decode());
    const text = textChunks.join("");
    try { payload = text ? JSON.parse(text) : null; } catch { payload = null; }
    onProgress(96);
  } else {
    try { payload = await response.json(); } catch { payload = null; }
  }
  if (!response.ok) {
    const error = new Error(payload?.error || "API unavailable");
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

async function fetchPrivateDocument(id, options = {}) {
  const metadataResult = await apiRequest(`document-meta&id=${encodeURIComponent(id)}`, undefined, {
    ...options,
    onProgress: options.onProgress ? (progress) => options.onProgress(Math.round(progress * .2)) : undefined,
  });
  const metadata = metadataResult?.document;
  if (!metadata) throw new Error("Canvas metadata unavailable");
  const cached = await readLocalDocument(id);
  if (cached && Number(cached.revision || 0) === Number(metadata.revision || 0)) {
    options.onProgress?.(98);
    return { ...cached, ...metadata };
  }
  const result = await apiRequest(`document&id=${encodeURIComponent(id)}`, undefined, {
    ...options,
    onProgress: options.onProgress ? (progress) => options.onProgress(Math.round(20 + progress * .78)) : undefined,
  });
  return result.document;
}

function pageSaveDocument(document) {
  const synced = syncActivePage(document);
  const activePage = synced.pages.find((page) => page.id === synced.activePageId) || synced.pages[0];
  return {
    id: synced.id,
    title: synced.title,
    slug: synced.slug,
    shared: synced.shared,
    guestEditable: synced.guestEditable,
    folderId: synced.folderId || null,
    activePageId: activePage.id,
    pages: synced.pages.map((page) => ({ id: page.id, name: page.name })),
    page: activePage,
    deletedAnnotationIds: synced.deletedAnnotationIds || [],
    deletedReplyIds: synced.deletedReplyIds || [],
  };
}

async function persistCanvasPage(document, { guest = false, slug = "", baseRevision = null } = {}) {
  const payload = { document: pageSaveDocument(document) };
  if (Number.isInteger(baseRevision)) payload.baseRevision = baseRevision;
  if (guest) payload.slug = slug;
  try {
    const result = await apiRequest("page-save", payload);
    return { status: "server", revision: Number(result.revision ?? baseRevision ?? 0) };
  } catch (error) {
    if (error.status !== 404) throw error;
    const fallback = guest
      ? await apiRequest("guest-save", { slug, document, ...(Number.isInteger(baseRevision) ? { baseRevision } : {}) })
      : await apiRequest("save", { document });
    return { status: "server", revision: Number(fallback.revision ?? baseRevision ?? 0) };
  }
}

function uploadMediaFile(file, onProgress, guestSlug = "") {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("file", file, file.name || `canvas-image-${Date.now()}`);
    if (guestSlug) form.append("slug", guestSlug);
    const request = new XMLHttpRequest();
    request.open("POST", `${APP_BASE}api/index.php?action=media-upload`);
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(Math.max(1, Math.min(99, Math.round(event.loaded / event.total * 100))));
    };
    request.onerror = () => reject(new Error("Media upload unavailable"));
    request.onload = () => {
      if (request.status < 200 || request.status >= 300) { reject(new Error("Media upload unavailable")); return; }
      try {
        const result = JSON.parse(request.responseText);
        if (!result.url) throw new Error("Media upload did not return a URL");
        onProgress?.(100);
        resolve(result.url);
      } catch (error) { reject(error); }
    };
    request.send(form);
  });
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
  if (name === "home") return <Home {...props} />;
  if (name === "briefcase") return <Briefcase {...props} />;
  if (name === "academic") return <AcademicCap {...props} />;
  if (name === "heart") return <Heart {...props} />;
  if (name === "star") return <Star {...props} />;
  if (name === "bolt") return <Bolt {...props} />;
  if (name === "code") return <Code {...props} />;
  if (name === "bug") return <Bug {...props} />;
  if (name === "cloud") return <Cloud {...props} />;
  if (name === "shield") return <Shield {...props} />;
  if (name === "key") return <Key {...props} />;
  if (name === "dollar") return <Dollar {...props} />;
  if (name === "cart") return <ShoppingCart {...props} />;
  if (name === "truck") return <Truck {...props} />;
  if (name === "pin") return <MapPin {...props} />;
  if (name === "megaphone") return <Megaphone {...props} />;
  if (name === "mail") return <Envelope {...props} />;
  if (name === "phone") return <Phone {...props} />;
  if (name === "camera") return <Camera {...props} />;
  if (name === "music") return <Music {...props} />;
  if (name === "tag") return <Tag {...props} />;
  if (name === "wrench") return <Wrench {...props} />;
  return <Brain {...props} />;
}

export function App() {
  const [documents, setDocuments] = useState(() => readLocalDocumentMetadata());
  const [folders, setFolders] = useState(() => readLocalFolders());
  const [route, setRoute] = useState(routeFromPath);
  const [newDialog, setNewDialog] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);
  const [routeLoading, setRouteLoading] = useState(true);
  const [publicDocument, setPublicDocument] = useState(null);
  const [routeError, setRouteError] = useState(null);
  const [loadProgress, setLoadProgress] = useState(6);
  const [loadSlow, setLoadSlow] = useState(false);

  const acceptServerWorkspace = useCallback(async (data) => {
    const serverDocuments = Array.isArray(data.documents) ? data.documents : [];
    setDocuments(serverDocuments);
    writeLocalDocumentMetadata(serverDocuments);
    if (Array.isArray(data.folders)) {
      setFolders(data.folders);
      writeLocalFolders(data.folders);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const slowTimer = window.setTimeout(() => { if (active) setLoadSlow(true); }, 5000);
    const progressTimer = window.setInterval(() => {
      if (active) setLoadProgress((current) => Math.min(current + 2, 24));
    }, 350);
    setRouteLoading(true);
    setLoadProgress(6);
    setLoadSlow(false);
    setRouteError(null);
    if (route.publicView) setPublicDocument(null);
    const onRoute = () => setRoute(routeFromPath());
    window.addEventListener("popstate", onRoute);
    const load = route.publicView
      ? apiRequest(`shared&slug=${encodeURIComponent(route.slug || "")}`, undefined, { signal: controller.signal, onProgress: (progress) => active && setLoadProgress(progress) }).then((data) => {
          if (data.document && active) {
            setLoadProgress(98);
            setPublicDocument(data.document);
            setDocuments((items) => items.some((item) => item.id === data.document.id) ? items.map((item) => item.id === data.document.id ? data.document : item) : [data.document, ...items]);
          }
        })
      : route.screen === "editor"
        ? fetchPrivateDocument(route.id || "", { signal: controller.signal, onProgress: (progress) => active && setLoadProgress(progress) }).then((loadedDocument) => {
          if (loadedDocument && active) {
            setLoadProgress(98);
            setDocuments((items) => {
              const next = items.some((item) => item.id === loadedDocument.id)
                ? items.map((item) => item.id === loadedDocument.id ? loadedDocument : item)
                : [loadedDocument, ...items];
              writeLocalDocumentMetadata(next);
              return next;
            });
            void writeLocalDocument(loadedDocument);
            setAuthRequired(false);
          }
        })
        : apiRequest("list", undefined, { signal: controller.signal, onProgress: (progress) => active && setLoadProgress(progress) }).then(async (data) => {
          if (Array.isArray(data.documents) && active) {
            await acceptServerWorkspace(data);
            setLoadProgress(98);
            setAuthRequired(false);
          }
        });
    load.catch((error) => {
      if (!active || error.name === "AbortError") return;
      if (route.publicView) setRouteError(error.status === 404 ? "not-found" : "unavailable");
      else if (error.status === 401) {
        setAuthRequired(true);
        setRouteError(null);
      } else {
        setAuthRequired(false);
        setRouteError(error.status === 404 ? "not-found" : "unavailable");
      }
    })
      .finally(() => {
        window.clearTimeout(slowTimer);
        window.clearInterval(progressTimer);
        if (active) {
          setLoadProgress(100);
          setRouteLoading(false);
        }
      });
    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(slowTimer);
      window.clearInterval(progressTimer);
      window.removeEventListener("popstate", onRoute);
    };
  }, [acceptServerWorkspace, route.id, route.publicView, route.screen, route.slug]);

  const commitDocuments = useCallback((updater) => {
    setDocuments((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      writeLocalDocumentMetadata(next);
      return next;
    });
  }, []);

  const commitFolders = useCallback((updater) => {
    setFolders((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      writeLocalFolders(next);
      return next;
    });
  }, []);

  const saveFolder = (folder) => {
    commitFolders((items) => items.some((item) => item.id === folder.id) ? items.map((item) => item.id === folder.id ? folder : item) : [...items, folder]);
    apiRequest("folder-save", { folder }).catch(() => {});
  };

  const deleteFolder = (folderId) => {
    commitFolders((items) => items.filter((item) => item.id !== folderId));
    commitDocuments((items) => items.map((doc) => doc.folderId === folderId ? { ...doc, folderId: null } : doc));
    apiRequest("folder-delete", { id: folderId }).catch(() => {});
  };

  const moveDocument = (documentId, folderId) => {
    const current = documents.find((doc) => doc.id === documentId);
    const changed = current ? { ...current, folderId: folderId || null } : null;
    if (!changed) return;
    commitDocuments((items) => items.map((doc) => doc.id === documentId ? changed : doc));
    apiRequest("document-folder", { id: documentId, folderId: folderId || null }).catch(() => {});
  };

  const createDocument = async (template) => {
    const id = uid("canvas");
    const title = template === "mind" ? "Untitled mind map" : template === "process" ? "Untitled process" : "Untitled canvas";
    const graph = template === "mind" ? mindMapTemplate() : template === "process" ? processTemplate() : blankTemplate();
    const doc = { id, title, slug: `${slugify(title)}-${id.slice(-4)}`, shared: false, updatedAt: new Date().toISOString(), ...graph };
    commitDocuments((items) => [doc, ...items]);
    await writeLocalDocument(doc);
    setNewDialog(false);
    try { await apiRequest("save", { document: doc }); }
    catch { /* The editor can still open the locally cached draft. */ }
    navigate(`/editor/${id}`);
  };

  const importDocument = async (file) => {
    const { imported } = await parseMyMindFile(file);
    const id = uid("canvas");
    const title = String(imported.title || file.name?.replace(/\.mymind$/i, "") || "Imported canvas").slice(0, 255);
    const doc = normalisePagedDocument({
      ...imported,
      id,
      title,
      slug: `${slugify(title)}-${id.slice(-4)}`,
      shared: false,
      guestEditable: false,
      folderId: null,
      updatedAt: new Date().toISOString(),
    });
    commitDocuments((items) => [doc, ...items]);
    await writeLocalDocument(doc);
    try { await apiRequest("save", { document: doc }); }
    catch { /* Preserve the imported canvas locally if the API is temporarily unavailable. */ }
    navigate(`/editor/${id}`);
  };

  const deleteDocument = (id) => {
    commitDocuments((items) => items.filter((item) => item.id !== id));
    void removeLocalDocument(id);
    apiRequest("delete", { id }).catch(() => {});
  };

  if (routeLoading) return <LoadingScreen message={route.publicView ? "Opening shared canvas…" : "Opening your workspace…"} progress={loadProgress} slow={loadSlow} />;

  if (authRequired && !route.publicView) {
    return <Login onLogin={async (password) => {
      await apiRequest("login", { password });
      if (route.screen === "editor") {
        const loadedDocument = await fetchPrivateDocument(route.id || "");
        if (loadedDocument) {
          setDocuments((items) => items.some((item) => item.id === loadedDocument.id)
            ? items.map((item) => item.id === loadedDocument.id ? loadedDocument : item)
            : [loadedDocument, ...items]);
          void writeLocalDocument(loadedDocument);
        }
      } else {
        const data = await apiRequest("list");
        await acceptServerWorkspace(data);
      }
      setRouteError(null);
      setAuthRequired(false);
    }} serviceUnavailable={routeError === "unavailable"} />;
  }

  if (route.screen === "dashboard") {
    return <Dashboard documents={documents} folders={folders} onNew={() => setNewDialog(true)} onImport={importDocument} onDelete={deleteDocument} onSaveFolder={saveFolder} onDeleteFolder={deleteFolder} onMoveDocument={moveDocument} onLogout={async () => {
      try { await apiRequest("logout", {}); } catch { /* Lock the local UI even if the network drops during logout. */ }
      finally {
        await clearLocalWorkspace();
        setDocuments([]);
        setFolders([]);
        setAuthRequired(true);
        setRouteError(null);
        navigate("/");
      }
    }} dialog={newDialog} closeDialog={() => setNewDialog(false)} createDocument={createDocument} />;
  }

  const document = route.publicView
    ? publicDocument
    : documents.find((item) => item.id === route.id);

  if (route.publicView && routeError === "unavailable") return <ServiceUnavailable />;
  if (!route.publicView && routeError === "unavailable") return <ServiceUnavailable />;
  if (!document) return <NotFound />;

  return <Editor
    key={document?.id || route.slug}
    initialDocument={document}
    publicView={route.publicView}
    onFetchRemote={() => route.publicView
      ? apiRequest(`shared&slug=${encodeURIComponent(route.slug || "")}`).then((data) => data.document)
      : apiRequest(`document&id=${encodeURIComponent(document?.id || "")}`).then((data) => data.document)}
    onPresence={(clientId) => apiRequest("presence", route.publicView
      ? { slug: route.slug, clientId }
      : { documentId: document?.id, clientId })}
    onSave={(next, { localOnly = false, baseRevision = null } = {}) => {
    if (route.publicView) {
      if (localOnly) return Promise.resolve({ status: "local", revision: baseRevision });
      return persistCanvasPage(next, { guest: true, slug: route.slug, baseRevision }).catch((error) => error.status === 409
        ? { status: "conflict", revision: Number(error.payload?.currentRevision ?? baseRevision) }
        : { status: "failed", revision: baseRevision });
    }
    const localCache = writeLocalDocument(next);
    setDocuments((items) => items.some((item) => item.id === next.id) ? items.map((item) => item.id === next.id ? next : item) : [next, ...items]);
    if (localOnly) return localCache.then((savedLocally) => ({ status: savedLocally ? "local" : "failed", revision: baseRevision }));
    return persistCanvasPage(next, { baseRevision })
      .then((result) => {
        if (Number.isInteger(result.revision)) void writeLocalDocument({ ...next, revision: result.revision });
        return result;
      })
      .catch(async (error) => {
        if (error.status === 409) return { status: "conflict", revision: Number(error.payload?.currentRevision ?? baseRevision) };
        const savedLocally = await localCache;
        return { status: savedLocally ? "local" : "failed", revision: baseRevision };
      });
  }}
  />;
}

function Login({ onLogin, serviceUnavailable = false }) {
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
      catch (loginError) { setError(loginError?.status === 401 ? "That password didn’t work. Please try again." : "MyMind could not reach its database. Please try again in a moment."); }
      finally { setBusy(false); }
    }}>
      <span className="login-icon"><Brain size={27} weight="duotone" /></span>
      <p className="eyebrow">Private workspace</p>
      <h1>Welcome back</h1>
      <p>Enter your MyMind password to open the dashboard.</p>
      {serviceUnavailable && <div className="login-warning">The workspace is locked because its database is currently unavailable.</div>}
      <label>Password<input type="password" autoFocus autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
      {error && <div className="login-error">{error}</div>}
      <button className="primary-button" disabled={busy || !password}>{busy ? "Opening…" : "Open MyMind"}</button>
    </form>
  </div>;
}

function Dashboard({ documents, folders, onNew, onImport, onDelete, onSaveFolder, onDeleteFolder, onMoveDocument, onLogout, dialog, closeDialog, createDocument }) {
  const [query, setQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [importing, setImporting] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [folderDraft, setFolderDraft] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const dashboardImportRef = useRef(null);
  const folderEditCommittingRef = useRef(false);
  const filtered = documents.filter((doc) => doc.title.toLowerCase().includes(query.toLowerCase()) && (selectedFolder === "all" || (selectedFolder === "unfiled" ? !doc.folderId : doc.folderId === selectedFolder)));
  const beginFolderEdit = (folder = null) => {
    folderEditCommittingRef.current = false;
    setEditingFolderId(folder?.id || "new");
    setFolderDraft(folder?.name || "New folder");
  };
  const finishFolderEdit = () => {
    if (folderEditCommittingRef.current) return;
    folderEditCommittingRef.current = true;
    const name = folderDraft.trim();
    if (name) {
      const existing = folders.find((folder) => folder.id === editingFolderId);
      onSaveFolder(existing ? { ...existing, name } : { id: uid("folder"), name });
    }
    setEditingFolderId(null);
    setFolderDraft("");
    window.requestAnimationFrame(() => { folderEditCommittingRef.current = false; });
  };
  const cancelFolderEdit = () => {
    folderEditCommittingRef.current = true;
    setEditingFolderId(null);
    setFolderDraft("");
    window.requestAnimationFrame(() => { folderEditCommittingRef.current = false; });
  };
  const confirmDashboardDelete = () => {
    if (!confirmDelete) return;
    if (confirmDelete.type === "folder") {
      onDeleteFolder(confirmDelete.item.id);
      if (selectedFolder === confirmDelete.item.id) setSelectedFolder("all");
    } else onDelete(confirmDelete.item.id);
    setConfirmDelete(null);
  };
  return (
    <div className="app-shell dashboard-shell">
      <header className="topbar dashboard-topbar">
        <Brand />
        <label className="search-field dashboard-search"><MagnifyingGlass size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search canvases" aria-label="Search canvases" /></label>
        <div className="topbar-actions"><button className="secondary-button dashboard-logout" onClick={onLogout}><Logout size={17} /> Logout</button><div className="avatar">CU</div></div>
      </header>
      <div className="dashboard-body">
        <aside className="folder-sidebar" aria-label="Canvas folders">
            <div className="folder-sidebar-heading"><strong>Folders</strong><button aria-label="Add folder" title="Add folder" onClick={() => beginFolderEdit()}><Plus size={16} /></button></div>
            <button className={selectedFolder === "all" ? "active" : ""} onClick={() => setSelectedFolder("all")}><Squares2X2Icon width="16" /><span>All canvases</span><small>{documents.length}</small></button>
            <button className={selectedFolder === "unfiled" ? "active" : ""} onClick={() => setSelectedFolder("unfiled")}><FolderOpen size={16} /><span>Unfiled</span></button>
            <div className="folder-list">
              {editingFolderId === "new" && <form className="folder-row folder-edit-row" onSubmit={(event) => { event.preventDefault(); finishFolderEdit(); }}><FolderOpen size={16} /><input autoFocus value={folderDraft} aria-label="New folder name" onFocus={(event) => event.currentTarget.select()} onChange={(event) => setFolderDraft(event.target.value)} onBlur={finishFolderEdit} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); cancelFolderEdit(); } }} /></form>}
              {folders.map((folder) => editingFolderId === folder.id
                ? <form key={folder.id} className={`folder-row folder-edit-row ${selectedFolder === folder.id ? "active" : ""}`} onSubmit={(event) => { event.preventDefault(); finishFolderEdit(); }}><FolderOpen size={16} /><input autoFocus value={folderDraft} aria-label={`Rename ${folder.name}`} onFocus={(event) => event.currentTarget.select()} onChange={(event) => setFolderDraft(event.target.value)} onBlur={finishFolderEdit} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); cancelFolderEdit(); } }} /></form>
                : <div key={folder.id} className={`folder-row ${selectedFolder === folder.id ? "active" : ""}`}><button onClick={() => setSelectedFolder(folder.id)}><FolderOpen size={16} /><span>{folder.name}</span></button><div><button aria-label={`Rename ${folder.name}`} onClick={() => beginFolderEdit(folder)}><Pen size={13} /></button><button aria-label={`Delete ${folder.name}`} onClick={() => setConfirmDelete({ type: "folder", item: folder })}><Trash size={13} /></button></div></div>)}
            </div>
        </aside>
        <main className="dashboard">
          <section className="dashboard-heading">
            <div><h1>{selectedFolder === "all" ? "All canvases" : selectedFolder === "unfiled" ? "Unfiled" : folders.find((folder) => folder.id === selectedFolder)?.name || "Canvases"}</h1></div>
            <div className="dashboard-heading-actions">
              <button className="secondary-button" disabled={importing} onClick={() => dashboardImportRef.current?.click()}><ArrowDownTrayIcon width="18" /> {importing ? "Importing…" : "Import .mymind"}</button>
              <input ref={dashboardImportRef} className="visually-hidden-input" type="file" accept=".mymind,application/vnd.mymind.canvas+json,application/json" onChange={async (event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (!file) return;
                setImporting(true);
                try { await onImport(file); }
                catch (error) { window.alert(error instanceof Error ? error.message : "MyMind could not import this canvas."); }
                finally { setImporting(false); }
              }} />
              <div className="new-canvas-trigger">
                <button className="primary-button" onClick={onNew}><Plus size={18} weight="bold" /> New canvas</button>
                {dialog && <NewCanvasMenu onClose={closeDialog} onCreate={createDocument} />}
              </div>
            </div>
          </section>
          <div className="dashboard-content">
            <section className="document-grid">
              {filtered.map((doc) => <DocumentCard key={doc.id} document={doc} folders={folders} onMove={onMoveDocument} onDelete={() => setConfirmDelete({ type: "file", item: doc })} />)}
              <button className="new-card" onClick={onNew}><span><Plus size={22} /></span><strong>Create a canvas</strong><small>Start blank or use a template</small></button>
            </section>
          </div>
        </main>
      </div>
      {confirmDelete && <ConfirmDialog title={confirmDelete.type === "folder" ? `Delete “${confirmDelete.item.name}”?` : `Delete “${confirmDelete.item.title}”?`} message={confirmDelete.type === "folder" ? "The folder will be deleted. Its canvases will remain available in All canvases." : "This canvas and its saved content will be permanently deleted."} confirmLabel={confirmDelete.type === "folder" ? "Delete folder" : "Delete canvas"} onClose={() => setConfirmDelete(null)} onConfirm={confirmDashboardDelete} />}
    </div>
  );
}

function Brand({ interactive = true }) {
  const content = <><span className="brand-mark"><Brain size={23} weight="duotone" /></span><span>MyMind</span></>;
  return interactive ? <button className="brand" onClick={() => navigate("/")}>{content}</button> : <span className="brand">{content}</span>;
}

function DocumentCard({ document, folders, onMove, onDelete }) {
  // The dashboard list endpoint intentionally returns metadata only. Full graph
  // data is fetched when a canvas opens, so cards must also render without it.
  const nodes = Array.isArray(document.nodes) ? document.nodes : [];
  const edges = Array.isArray(document.edges) ? document.edges : [];
  const previewNodes = nodes.slice(0, 5);
  const minNodeX = previewNodes.length ? Math.min(...previewNodes.map((node) => Number(node.x) || 0)) : 0;
  const minNodeY = previewNodes.length ? Math.min(...previewNodes.map((node) => Number(node.y) || 0)) : 0;
  const [folderOpen, setFolderOpen] = useState(false);
  const folderPickerRef = useRef(null);
  const selectedFolder = folders.find((folder) => folder.id === document.folderId);
  useEffect(() => {
    if (!folderOpen) return undefined;
    const close = (event) => { if (!folderPickerRef.current?.contains(event.target)) setFolderOpen(false); };
    const closeOnEscape = (event) => { if (event.key === "Escape") setFolderOpen(false); };
    window.document.addEventListener("pointerdown", close);
    window.addEventListener("keydown", closeOnEscape);
    return () => { window.document.removeEventListener("pointerdown", close); window.removeEventListener("keydown", closeOnEscape); };
  }, [folderOpen]);
  const moveToFolder = (folderId) => {
    onMove(document.id, folderId);
    setFolderOpen(false);
  };
  return (
    <article className={`document-card ${folderOpen ? "folder-menu-open" : ""}`} onClick={() => navigate(`/editor/${document.id}`)}>
      <div className="document-preview">
        <svg className="preview-lines" viewBox="0 0 300 150" aria-hidden="true">
          {edges.slice(0, 5).map((edge) => {
            const source = nodes.find((node) => node.id === edge.source);
            const target = nodes.find((node) => node.id === edge.target);
            if (!source || !target) return null;
            const sx = 35 + ((Number(source.x) || 0) - minNodeX) * .24;
            const sy = 30 + ((Number(source.y) || 0) - minNodeY) * .24;
            const tx = 35 + ((Number(target.x) || 0) - minNodeX) * .24;
            const ty = 30 + ((Number(target.y) || 0) - minNodeY) * .24;
            return <path key={edge.id} d={`M ${sx} ${sy} C ${(sx + tx) / 2} ${sy}, ${(sx + tx) / 2} ${ty}, ${tx} ${ty}`} />;
          })}
        </svg>
        {previewNodes.map((node) => <span key={node.id} className={`preview-node tone-${node.color}`} style={{ left: `${24 + ((Number(node.x) || 0) - minNodeX) * .24}px`, top: `${18 + ((Number(node.y) || 0) - minNodeY) * .24}px` }} />)}
      </div>
      <div className="document-meta">
        <div><h2>{document.title}</h2><p>Updated {new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(document.updatedAt))}</p><div ref={folderPickerRef} className={`folder-picker ${folderOpen ? "open" : ""}`} onClick={(event) => event.stopPropagation()}><button type="button" className="folder-picker-trigger" aria-label={`Move ${document.title} to a folder`} aria-haspopup="listbox" aria-expanded={folderOpen} onClick={() => setFolderOpen((open) => !open)}><FolderOpen size={13} /><span>{selectedFolder?.name || "Unfiled"}</span><CaretDown size={11} /></button>{folderOpen && <div className="folder-picker-menu" role="listbox" aria-label={`Choose folder for ${document.title}`}><strong>Move to folder</strong><button role="option" aria-selected={!document.folderId} className={!document.folderId ? "selected" : ""} onClick={() => moveToFolder("")}><span className="folder-option-check">{!document.folderId && <Check size={13} />}</span><FolderOpen size={14} /><span>Unfiled</span></button>{folders.map((folder) => <button key={folder.id} role="option" aria-selected={document.folderId === folder.id} className={document.folderId === folder.id ? "selected" : ""} onClick={() => moveToFolder(folder.id)}><span className="folder-option-check">{document.folderId === folder.id && <Check size={13} />}</span><FolderOpen size={14} /><span>{folder.name}</span></button>)}</div>}</div></div>
        <button className="card-delete" aria-label={`Delete ${document.title}`} onClick={(event) => { event.stopPropagation(); onDelete(); }}><Trash size={17} /></button>
      </div>
      {document.shared && <span className="shared-badge"><ShareNetwork size={13} /> Shared</span>}
    </article>
  );
}

function NewCanvasMenu({ onClose, onCreate }) {
  useModalKeyboard(onClose, () => onCreate("blank"));
  return <>
    <div className="popover-backdrop" onMouseDown={onClose} />
    <div className="new-canvas-menu" role="menu" aria-label="Choose a starting point" onMouseDown={(event) => event.stopPropagation()}>
      <button role="menuitem" style={{ "--stagger": 0 }} onClick={() => onCreate("blank")}><StickyNote size={18} /><span>Blank Canvas</span></button>
      <button role="menuitem" style={{ "--stagger": 1 }} onClick={() => onCreate("mind")}><Network size={18} /><span>Mind Map</span></button>
      <button role="menuitem" style={{ "--stagger": 2 }} onClick={() => onCreate("process")}><Workflow size={18} /><span>Process Flow</span></button>
    </div>
  </>;
}

function ConfirmDialog({ title, message, confirmLabel, onClose, onConfirm }) {
  useModalKeyboard(onClose, onConfirm);
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="modal compact-modal confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-message" onMouseDown={(event) => event.stopPropagation()}>
      <div className="modal-header"><h2 id="confirm-dialog-title">{title}</h2><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={17} /></button></div>
      <p id="confirm-dialog-message">{message}</p>
      <div className="modal-actions"><button className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button danger-button" autoFocus onClick={onConfirm}><Trash size={15} /> {confirmLabel}</button></div>
    </div>
  </div>;
}

function Editor({ initialDocument, publicView: isPublicLink, onSave, onFetchRemote, onPresence }) {
  const fallback = useMemo(() => ({ id: uid("canvas"), title: "Shared canvas unavailable", slug: "unavailable", shared: false, updatedAt: new Date().toISOString(), ...blankTemplate() }), []);
  const [document, setDocument] = useState(() => normalisePagedDocument(initialDocument || fallback));
  const [selection, setSelection] = useState([]);
  const [edgeSelection, setEdgeSelection] = useState([]);
  const [drawingSelection, setDrawingSelection] = useState([]);
  const [marquee, setMarquee] = useState(null);
  const [draftDrawing, setDraftDrawing] = useState(null);
  const [penWidth, setPenWidth] = useState(2.4);
  const [penColor, setPenColor] = useState("#3f4652");
  const [penStreamline, setPenStreamline] = useState(.65);
  const [penMode, setPenMode] = useState("pen");
  const [pan, setPan] = useState({ x: 80, y: 90 });
  const [zoom, setZoom] = useState(.9);
  const [tool, setTool] = useState("select");
  const [connectionSource, setConnectionSource] = useState(null);
  const [connectionPreview, setConnectionPreview] = useState(null);
  const [connectionTargetId, setConnectionTargetId] = useState(null);
  const [connectionTargetPort, setConnectionTargetPort] = useState(null);
  const [reconnectPreview, setReconnectPreview] = useState(null);
  const [nodeMenu, setNodeMenu] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportScope, setExportScope] = useState("all");
  const [shareOpen, setShareOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [imageSourceOpen, setImageSourceOpen] = useState(false);
  const [saveState, setSaveState] = useState("Saved");
  const [editingNode, setEditingNode] = useState(null);
  const [editingEdge, setEditingEdge] = useState(null);
  const [nodeToolbarMenu, setNodeToolbarMenu] = useState(null);
  const [edgeToolbarMenu, setEdgeToolbarMenu] = useState(null);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState(null);
  const [pendingAnnotation, setPendingAnnotation] = useState(null);
  const [annotationsVisible, setAnnotationsVisible] = useState(true);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [spaceHeld, setSpaceHeld] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [rotationFeedback, setRotationFeedback] = useState(null);
  const [rotationModeId, setRotationModeId] = useState(null);
  const [mediaUpload, setMediaUpload] = useState(null);
  const [guestWelcomeOpen, setGuestWelcomeOpen] = useState(isPublicLink);
  const [participants, setParticipants] = useState([]);
  const [zoomMenuOpen, setZoomMenuOpen] = useState(false);
  const [iconBrowserOpen, setIconBrowserOpen] = useState(false);
  const canvasRef = useRef(null);
  const imageInputRef = useRef(null);
  const dragRef = useRef(null);
  const saveTimer = useRef(null);
  const immediateSaveChain = useRef(Promise.resolve());
  const pendingSaveRef = useRef(null);
  const onSaveRef = useRef(onSave);
  const onFetchRemoteRef = useRef(onFetchRemote);
  const onPresenceRef = useRef(onPresence);
  const serverRevisionRef = useRef(Number.isInteger(initialDocument?.revision) ? initialDocument.revision : null);
  const conflictRef = useRef(false);
  const presenceClientRef = useRef(presenceClientId());
  const clipboardRef = useRef(null);
  const feedbackTimer = useRef(null);
  const historyRef = useRef({ past: [], future: [] });
  const publicView = isPublicLink && !document.guestEditable;
  const collaborationEnabled = Boolean(initialDocument && (isPublicLink || document.shared));

  const finishSave = useCallback((result, savedDocument) => {
    const status = result?.status || "failed";
    if (status === "conflict") {
      conflictRef.current = true;
      setSaveState("Refresh to sync");
      return;
    }
    if (Number.isFinite(Number(result?.revision))) serverRevisionRef.current = Number(result.revision);
    if (pendingSaveRef.current === savedDocument) pendingSaveRef.current = null;
    setSaveState(status === "failed" ? "Save failed" : status === "local" ? "Saved locally" : "Saved");
  }, []);

  const acceptApiRevision = useCallback((response) => {
    if (Number.isInteger(response?.revision)) serverRevisionRef.current = response.revision;
  }, []);

  const updateDocument = useCallback((updater, { immediate = false } = {}) => {
    if (publicView) return;
    setDocument((current) => {
      const nextValue = typeof updater === "function" ? updater(current) : updater;
      const next = syncActivePage({ ...nextValue, updatedAt: new Date().toISOString() });
      if (!saveTimer.current) {
        historyRef.current.past = [...historyRef.current.past.slice(-59), current];
        historyRef.current.future = [];
      }
      setSaveState("Saving…");
      pendingSaveRef.current = next;
      queueMicrotask(() => onSaveRef.current(next, { localOnly: true, baseRevision: serverRevisionRef.current }));
      clearTimeout(saveTimer.current);
      if (conflictRef.current) {
        setSaveState("Refresh to sync");
        return next;
      }
      if (immediate) {
        saveTimer.current = null;
        immediateSaveChain.current = immediateSaveChain.current.catch(() => {}).then(async () => {
          const result = await onSaveRef.current(next, { baseRevision: serverRevisionRef.current });
          finishSave(result, next);
        });
        return next;
      }
      saveTimer.current = setTimeout(async () => {
        saveTimer.current = null;
        const result = await onSaveRef.current(next, { baseRevision: serverRevisionRef.current });
        finishSave(result, next);
      }, 450);
      return next;
    });
  }, [finishSave, publicView]);

  const showFeedback = useCallback((type, count = 1) => {
    clearTimeout(feedbackTimer.current);
    setFeedback({ id: Date.now(), type, count });
    feedbackTimer.current = setTimeout(() => setFeedback(null), 1800);
  }, []);

  const applyHistory = useCallback((direction) => {
    if (publicView) return;
    const source = direction === "undo" ? historyRef.current.past : historyRef.current.future;
    if (!source.length) return;
    showFeedback(direction);
    setDocument((current) => {
      const next = syncActivePage({ ...source[source.length - 1], updatedAt: new Date().toISOString() });
      const destination = direction === "undo" ? "future" : "past";
      historyRef.current[direction === "undo" ? "past" : "future"] = source.slice(0, -1);
      historyRef.current[destination] = [...historyRef.current[destination].slice(-59), current];
      clearTimeout(saveTimer.current);
      setSaveState("Saving…");
      pendingSaveRef.current = next;
      queueMicrotask(() => onSaveRef.current(next, { localOnly: true, baseRevision: serverRevisionRef.current }));
      saveTimer.current = setTimeout(async () => {
        saveTimer.current = null;
        const result = await onSaveRef.current(next, { baseRevision: serverRevisionRef.current });
        finishSave(result, next);
      }, 80);
      return next;
    });
    setContextMenu(null);
  }, [finishSave, publicView, showFeedback]);

  useEffect(() => {
    onSaveRef.current = onSave;
    onFetchRemoteRef.current = onFetchRemote;
    onPresenceRef.current = onPresence;
  }, [onFetchRemote, onPresence, onSave]);
  useEffect(() => () => {
    clearTimeout(saveTimer.current);
    clearTimeout(feedbackTimer.current);
    if (pendingSaveRef.current && !conflictRef.current) onSaveRef.current(pendingSaveRef.current, { baseRevision: serverRevisionRef.current });
  }, []);

  useEffect(() => {
    if (!collaborationEnabled) { setParticipants([]); return undefined; }
    let stopped = false;
    const heartbeat = async () => {
      try {
        const result = await onPresenceRef.current?.(presenceClientRef.current);
        if (!stopped && Array.isArray(result?.participants)) setParticipants(result.participants);
      } catch { /* Presence is optional and never blocks editing. */ }
    };
    heartbeat();
    const timer = window.setInterval(heartbeat, 8000);
    return () => { stopped = true; window.clearInterval(timer); };
  }, [collaborationEnabled]);

  useEffect(() => {
    if (!collaborationEnabled) return undefined;
    let stopped = false;
    const refresh = async () => {
      if (conflictRef.current || pendingSaveRef.current || dragRef.current) return;
      try {
        const remote = await onFetchRemoteRef.current?.();
        const remoteRevision = Number(remote?.revision || 0);
        if (stopped || !remote || remoteRevision <= serverRevisionRef.current) return;
        const next = normalisePagedDocument(remote);
        serverRevisionRef.current = remoteRevision;
        setDocument(next);
        setSaveState(publicView ? "View only" : "Saved");
        onSaveRef.current(next, { localOnly: true, baseRevision: remoteRevision });
      } catch { /* Keep the current canvas available during transient network failures. */ }
    };
    const timer = window.setInterval(refresh, publicView ? 2500 : 3500);
    return () => { stopped = true; window.clearInterval(timer); };
  }, [collaborationEnabled, publicView]);

  const clearCanvasSelection = () => {
    setSelection([]);
    setEdgeSelection([]);
    setDrawingSelection([]);
    setSelectedAnnotationId(null);
    setEditingNode(null);
    setEditingEdge(null);
    setConnectionSource(null);
    setRotationModeId(null);
  };

  const switchPage = (pageId) => {
    if (pageId === document.activePageId) return;
    if (isPublicLink) setDocument((current) => activatePage(current, pageId));
    else updateDocument((current) => activatePage(current, pageId));
    clearCanvasSelection();
  };

  const addPage = () => {
    const page = { id: uid("page"), name: `Page ${(document.pages || []).length + 1}`, nodes: [], edges: [], drawings: [], annotations: [] };
    updateDocument((current) => { const synced = syncActivePage(current); return activatePage({ ...synced, pages: [...synced.pages, page] }, page.id); });
    clearCanvasSelection();
  };

  const renamePage = (pageId, name) => {
    const nextName = String(name || "").trim();
    if (!nextName) return;
    updateDocument((current) => ({ ...current, pages: current.pages.map((page) => page.id === pageId ? { ...page, name: nextName } : page) }));
  };

  const deletePage = (pageId) => {
    if (document.pages.length <= 1) return;
    updateDocument((current) => {
      const synced = syncActivePage(current);
      const index = synced.pages.findIndex((page) => page.id === pageId);
      const pages = synced.pages.filter((page) => page.id !== pageId);
      if (pageId !== synced.activePageId) return { ...synced, pages };
      const nextPage = pages[Math.min(Math.max(index, 0), pages.length - 1)];
      return activatePage({ ...synced, pages }, nextPage.id);
    });
    clearCanvasSelection();
  };

  useEffect(() => {
    if (!connectionSource) {
      setConnectionPreview(null);
      setConnectionTargetId(null);
      setConnectionTargetPort(null);
    }
  }, [connectionSource]);

  const nodeMap = useMemo(() => Object.fromEntries(document.nodes.map((node) => [node.id, node])), [document.nodes]);
  const collapsedNodeIds = useMemo(() => new Set(document.edges.filter((edge) => edge.hidden && edge.hiddenNodeId).map((edge) => edge.hiddenNodeId)), [document.edges]);
  const [vanishingNodeIds, setVanishingNodeIds] = useState(() => new Set());
  const [vanishingEdgeIds, setVanishingEdgeIds] = useState(() => new Set());
  const prevCollapsedNodeIdsRef = useRef(new Set());
  const prevHiddenEdgeIdsRef = useRef(new Set());
  useEffect(() => {
    const previousNodeIds = prevCollapsedNodeIdsRef.current;
    const newlyHiddenNodeIds = [...collapsedNodeIds].filter((id) => !previousNodeIds.has(id));
    prevCollapsedNodeIdsRef.current = collapsedNodeIds;
    const hiddenEdgeIds = new Set(document.edges.filter((edge) => edge.hidden).map((edge) => edge.id));
    const previousEdgeIds = prevHiddenEdgeIdsRef.current;
    const newlyHiddenEdgeIds = [...hiddenEdgeIds].filter((id) => !previousEdgeIds.has(id));
    prevHiddenEdgeIdsRef.current = hiddenEdgeIds;
    if (!newlyHiddenNodeIds.length && !newlyHiddenEdgeIds.length) return;
    if (newlyHiddenNodeIds.length) setVanishingNodeIds((current) => new Set([...current, ...newlyHiddenNodeIds]));
    if (newlyHiddenEdgeIds.length) setVanishingEdgeIds((current) => new Set([...current, ...newlyHiddenEdgeIds]));
    const timer = setTimeout(() => {
      if (newlyHiddenNodeIds.length) setVanishingNodeIds((current) => { const next = new Set(current); newlyHiddenNodeIds.forEach((id) => next.delete(id)); return next; });
      if (newlyHiddenEdgeIds.length) setVanishingEdgeIds((current) => { const next = new Set(current); newlyHiddenEdgeIds.forEach((id) => next.delete(id)); return next; });
    }, 200);
    return () => clearTimeout(timer);
  }, [collapsedNodeIds, document.edges]);
  const selectedBounds = useMemo(() => selectedElementsBounds(
    document.nodes.filter((node) => selection.includes(node.id) && !collapsedNodeIds.has(node.id)),
    (document.drawings || []).filter((drawing) => drawingSelection.includes(drawing.id)),
  ), [collapsedNodeIds, document.drawings, document.nodes, drawingSelection, selection]);

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

  const addTextNode = useCallback((initialLabel = "Add text") => {
    const label = String(initialLabel || "Add text").slice(0, 2000);
    const fontSize = 24;
    const { width, height } = fittedTextDimensions(label, fontSize);
    const centerX = (canvasRef.current?.clientWidth / 2 - pan.x) / zoom - width / 2;
    const centerY = (canvasRef.current?.clientHeight / 2 - pan.y) / zoom - height / 2;
    const node = { id: uid("node"), type: "text", x: centerX, y: centerY, width, height, label, fontSize, textFit: "auto", textAlign: "left", color: "slate" };
    updateDocument((doc) => ({ ...doc, nodes: [...doc.nodes, node] }));
    setSelection([node.id]);
    setEdgeSelection([]);
    setEditingNode(node.id);
  }, [pan.x, pan.y, updateDocument, zoom]);

  const addIconNode = useCallback((iconName) => {
    const width = 64;
    const x = (canvasRef.current?.clientWidth / 2 - pan.x) / zoom - width / 2;
    const y = (canvasRef.current?.clientHeight / 2 - pan.y) / zoom - width / 2;
    const node = { id: uid("icon"), type: "icon", iconName, label: iconName.replace(/Icon$/, "").replace(/([a-z])([A-Z])/g, "$1 $2"), x, y, width, height: width, color: "slate" };
    updateDocument((doc) => ({ ...doc, nodes: [...doc.nodes, node] }));
    setSelection([node.id]);
    setDrawingSelection([]);
    setEdgeSelection([]);
    setIconBrowserOpen(false);
  }, [pan.x, pan.y, updateDocument, zoom]);

  const addArrowShape = useCallback(() => {
    const width = 220;
    const x = (canvasRef.current?.clientWidth / 2 - pan.x) / zoom - width / 2;
    const y = (canvasRef.current?.clientHeight / 2 - pan.y) / zoom - 22;
    const node = { id: uid("arrow"), type: "arrow", x, y, width, height: 44, color: "slate", lineStyle: "solid", label: "Arrow line" };
    updateDocument((doc) => ({ ...doc, nodes: [...doc.nodes, node] }));
    setSelection([node.id]);
    setEdgeSelection([]);
    setDrawingSelection([]);
  }, [pan.x, pan.y, updateDocument, zoom]);

  const addImageFile = useCallback(async (file, clientPoint) => {
    if (publicView || !file?.type?.startsWith("image/")) return;
    const hostableImage = ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type);
    const isLargeUpload = file.size > 10 * 1024 * 1024 && hostableImage;
    if (isLargeUpload) setMediaUpload({ name: file.name || "Large image", progress: 2, status: "Preparing upload…" });
    try {
      const image = await readImageFile(file, { metadataOnly: isLargeUpload });
      let imageData = image.dataUrl;
      if (hostableImage) {
        try {
          imageData = await uploadMediaFile(file, isLargeUpload ? (progress) => setMediaUpload({ name: file.name || "Large image", progress, status: progress < 100 ? "Uploading…" : "Finishing…" }) : undefined, isPublicLink ? document.slug : "");
        } catch (error) {
          if (isLargeUpload) throw error;
          /* Keep the optimized data URL as an offline development fallback. */
        }
      }
      const bounds = canvasRef.current?.getBoundingClientRect();
      const x = clientPoint && bounds ? (clientPoint.x - bounds.left - pan.x) / zoom - 140 : (canvasRef.current?.clientWidth / 2 - pan.x) / zoom - 140;
      const y = clientPoint && bounds ? (clientPoint.y - bounds.top - pan.y) / zoom - 90 : (canvasRef.current?.clientHeight / 2 - pan.y) / zoom - 90;
      const node = { id: uid("image"), type: "image", x, y, label: file.name?.replace(/\.[^.]+$/, "") || "Image", imageData, aspectRatio: image.aspectRatio, mimeType: image.mimeType, isSvg: image.isSvg, isGif: image.isGif, width: 280, cropAspect: "original", cropZoom: 1, cropX: 50, cropY: 50 };
      updateDocument((doc) => ({ ...doc, nodes: [...doc.nodes, node] }));
      setSelection([node.id]);
      setEdgeSelection([]);
      if (isLargeUpload) {
        setMediaUpload({ name: file.name || "Large image", progress: 100, status: "Ready!" });
        setTimeout(() => setMediaUpload(null), 900);
      }
    } catch {
      if (isLargeUpload) {
        setMediaUpload({ name: file.name || "Large image", progress: 0, status: "Upload failed. Try a file under 25 MB.", error: true });
        setTimeout(() => setMediaUpload(null), 3200);
      }
    }
  }, [document.slug, isPublicLink, pan.x, pan.y, publicView, updateDocument, zoom]);

  const addImageUrl = useCallback(async (value) => {
    if (publicView) return;
    const imageUrl = normaliseLinkUrl(value);
    if (!imageUrl) throw new Error("Enter a valid image URL.");
    setMediaUpload({ name: imageUrl, progress: 18, status: "Checking image…" });
    let image;
    try {
      image = await new Promise((resolve, reject) => {
        const probe = new Image();
        const timer = window.setTimeout(() => reject(new Error("The image took too long to respond.")), 8000);
        probe.onload = () => {
          window.clearTimeout(timer);
          resolve({ width: probe.naturalWidth || 1, height: probe.naturalHeight || 1 });
        };
        probe.onerror = () => {
          window.clearTimeout(timer);
          reject(new Error("That URL did not return a usable image."));
        };
        probe.referrerPolicy = "no-referrer";
        probe.src = imageUrl;
      });
    } catch (error) {
      setMediaUpload({ name: imageUrl, progress: 0, status: error instanceof Error ? error.message : "Image could not be loaded.", error: true });
      window.setTimeout(() => setMediaUpload(null), 3200);
      throw error;
    }
    const width = 280;
    const aspectRatio = image.width / image.height;
    const node = {
      id: uid("image"),
      type: "image",
      x: (canvasRef.current?.clientWidth / 2 - pan.x) / zoom - width / 2,
      y: (canvasRef.current?.clientHeight / 2 - pan.y) / zoom - (width / aspectRatio) / 2,
      label: new URL(imageUrl).pathname.split("/").pop()?.replace(/\.[^.]+$/, "") || "Remote image",
      imageData: imageUrl,
      aspectRatio,
      mimeType: "image/remote",
      isSvg: /\.svg(?:$|[?#])/i.test(imageUrl),
      isGif: /\.gif(?:$|[?#])/i.test(imageUrl),
      width,
      cropAspect: "original",
      cropZoom: 1,
      cropX: 50,
      cropY: 50,
    };
    updateDocument((doc) => ({ ...doc, nodes: [...doc.nodes, node] }));
    setSelection([node.id]);
    setEdgeSelection([]);
    setDrawingSelection([]);
    setMediaUpload({ name: node.label, progress: 100, status: "Image added" });
    window.setTimeout(() => setMediaUpload(null), 900);
  }, [pan.x, pan.y, publicView, updateDocument, zoom]);

  const addLinkNode = useCallback(async (value) => {
    if (publicView) return;
    const linkUrl = normaliseLinkUrl(value);
    if (!linkUrl) return;
    const parsed = new URL(linkUrl);
    const mediaPreview = mediaPreviewForUrl(linkUrl);
    const id = uid("link");
    const node = {
      id,
      type: "link",
      x: (canvasRef.current?.clientWidth / 2 - pan.x) / zoom - 150,
      y: (canvasRef.current?.clientHeight / 2 - pan.y) / zoom - 98,
      label: parsed.hostname.replace(/^www\./, ""),
      subtitle: linkUrl,
      linkUrl,
      domain: parsed.hostname.replace(/^www\./, ""),
      thumbnail: mediaPreview.thumbnail || `${parsed.origin}/favicon.ico`,
      thumbnailKind: mediaPreview.thumbnailKind || "favicon",
      ...mediaPreview,
      color: "blue",
    };
    updateDocument((doc) => ({ ...doc, nodes: [...doc.nodes, node] }));
    setSelection([id]);
    setEdgeSelection([]);
    setDrawingSelection([]);
    try {
      const preview = await apiRequest("link-preview", { url: linkUrl });
      updateDocument((doc) => ({ ...doc, nodes: doc.nodes.map((item) => item.id === id ? {
        ...item,
        label: preview.title || item.label,
        subtitle: preview.description || item.subtitle,
        thumbnail: preview.image || preview.icon || item.thumbnail,
        thumbnailKind: preview.image ? "preview" : item.thumbnailKind,
      } : item) }));
    } catch { /* Keep the immediate domain and favicon fallback. */ }
  }, [pan.x, pan.y, publicView, updateDocument, zoom]);

  const beginAnnotation = (clientX, clientY) => {
    const bounds = canvasRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setPendingAnnotation({ x: (clientX - bounds.left - pan.x) / zoom, y: (clientY - bounds.top - pan.y) / zoom });
  };

  const addAnnotation = async ({ comment, author }) => {
    if (!pendingAnnotation) return;
    if (isPublicLink) {
      const response = await apiRequest("comment", { slug: document.slug, pageId: document.activePageId, annotation: { ...pendingAnnotation, comment, author } });
      acceptApiRevision(response);
      if (!response.annotation) throw new Error("Comment could not be saved");
      rememberAnnotationToken(response.annotation.id, response.editToken);
      setDocument((current) => syncActivePage({ ...current, annotations: [...(current.annotations || []), response.annotation] }));
      setSelectedAnnotationId(response.annotation.id);
    } else {
      const annotations = document.annotations || [];
      const annotation = { id: uid("annotation"), number: Math.max(0, ...annotations.map((item) => Number(item.number) || 0)) + 1, ...pendingAnnotation, comment, author: author || "Christine", createdAt: new Date().toISOString(), replies: [] };
      updateDocument((doc) => ({ ...doc, annotations: [...(doc.annotations || []), annotation] }));
      setSelectedAnnotationId(annotation.id);
    }
    setPendingAnnotation(null);
  };

  const canManageAnnotation = (itemId) => !isPublicLink || !!annotationTokens()[itemId];

  const updateAnnotationComment = async (annotationId, comment) => {
    if (isPublicLink) {
      const response = await apiRequest("annotation", { slug: document.slug, pageId: document.activePageId, annotationId, operation: "update", comment, token: annotationTokens()[annotationId] });
      acceptApiRevision(response);
      setDocument((current) => syncActivePage({ ...current, annotations: response.annotations || current.annotations }));
    } else updateDocument((doc) => ({ ...doc, annotations: (doc.annotations || []).map((item) => item.id === annotationId ? { ...item, comment, editedAt: new Date().toISOString() } : item) }));
  };

  const deleteAnnotation = async (annotationId) => {
    if (isPublicLink) {
      const response = await apiRequest("annotation", { slug: document.slug, pageId: document.activePageId, annotationId, operation: "delete", token: annotationTokens()[annotationId] });
      acceptApiRevision(response);
      setDocument((current) => syncActivePage({ ...current, annotations: response.annotations || [] }));
    } else updateDocument((doc) => ({ ...doc, annotations: (doc.annotations || []).filter((item) => item.id !== annotationId), deletedAnnotationIds: [...new Set([...(doc.deletedAnnotationIds || []), annotationId])] }));
    setSelectedAnnotationId(null);
  };

  const addAnnotationReply = async (annotationId, { comment, author }) => {
    if (isPublicLink) {
      const response = await apiRequest("annotation", { slug: document.slug, pageId: document.activePageId, annotationId, operation: "reply", comment, author });
      acceptApiRevision(response);
      rememberAnnotationToken(response.reply?.id, response.editToken);
      setDocument((current) => syncActivePage({ ...current, annotations: response.annotations || current.annotations }));
    } else {
      const reply = { id: uid("reply"), comment, author: author || "Christine", createdAt: new Date().toISOString() };
      updateDocument((doc) => ({ ...doc, annotations: (doc.annotations || []).map((item) => item.id === annotationId ? { ...item, replies: [...(item.replies || []), reply] } : item) }));
    }
  };

  const mutateAnnotationReply = async (annotationId, replyId, operation, comment = "") => {
    if (isPublicLink) {
      const response = await apiRequest("annotation", { slug: document.slug, pageId: document.activePageId, annotationId, replyId, operation, comment, token: annotationTokens()[replyId] });
      acceptApiRevision(response);
      setDocument((current) => syncActivePage({ ...current, annotations: response.annotations || current.annotations }));
    } else updateDocument((doc) => ({ ...doc, annotations: (doc.annotations || []).map((item) => item.id === annotationId ? { ...item, replies: (item.replies || []).flatMap((reply) => reply.id !== replyId ? [reply] : operation === "reply-delete" ? [] : [{ ...reply, comment, editedAt: new Date().toISOString() }]) } : item), ...(operation === "reply-delete" ? { deletedReplyIds: [...new Set([...(doc.deletedReplyIds || []), replyId])] } : {}) }));
  };

  const startAnnotationDrag = (annotation, event) => {
    if (tool !== "select" || !canManageAnnotation(annotation.id)) return;
    dragRef.current = { type: "annotation", id: annotation.id, startX: event.clientX, startY: event.clientY, annotationX: annotation.x, annotationY: annotation.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

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

  const createConnection = (sourceInfo, targetNode, targetPort = "auto") => {
    if (!sourceInfo || !targetNode || sourceInfo.nodeId === targetNode.id) return false;
    const edgeId = uid("edge");
    const sourceNode = document.nodes.find((item) => item.id === sourceInfo.nodeId);
    if (!sourceNode) return false;
    const isFlowchart = !!(sourceNode.shape || targetNode.shape);
    const label = sourceNode.shape === "decision" ? (sourceInfo.port === "bottom" ? "No" : "Yes") : "";
    updateDocument((doc) => ({ ...doc, edges: [...doc.edges, { id: edgeId, source: sourceInfo.nodeId, target: targetNode.id, label, sourcePort: sourceInfo.port, targetPort, ...(isFlowchart ? { routing: "orthogonal" } : {}) }] }));
    setConnectionSource(null);
    setTool("select");
    setSelection([]);
    setEdgeSelection([edgeId]);
    return true;
  };

  const startReconnect = (edge, side, event) => {
    if (publicView) return;
    const bounds = canvasRef.current.getBoundingClientRect();
    const point = { x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom };
    setEditingEdge(null);
    setEdgeToolbarMenu(null);
    setReconnectPreview({ edgeId: edge.id, side, point });
    setConnectionTargetId(null);
    dragRef.current = { type: "reconnect", edgeId: edge.id, side };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const startSelectionDrag = (event, nodeIds, drawingIds) => {
    dragRef.current = {
      type: "selection",
      startX: event.clientX,
      startY: event.clientY,
      nodes: document.nodes.filter((node) => nodeIds.includes(node.id)).map((node) => ({ id: node.id, x: node.x, y: node.y })),
      drawings: (document.drawings || []).filter((drawing) => drawingIds.includes(drawing.id)).map((drawing) => ({ id: drawing.id, points: drawing.points.map((point) => ({ ...point })) })),
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onCanvasPointerDown = (event) => {
    setContextMenu(null);
    setPagesOpen(false);
    setNodeMenu(false);
    const wantsToPan = tool === "hand" || event.button === 1 || spaceHeld;
    if (wantsToPan) {
      dragRef.current = { type: "pan", startX: event.clientX, startY: event.clientY, panX: pan.x, panY: pan.y };
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }
    if (tool === "annotate") {
      beginAnnotation(event.clientX, event.clientY);
      event.preventDefault();
      return;
    }
    if (tool === "pen" && !publicView) {
      const bounds = canvasRef.current.getBoundingClientRect();
      const point = { x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom };
      setDraftDrawing({ id: uid("drawing"), points: [{ ...point, pressure: event.pressure || .5 }], color: penColor, width: penWidth, streamline: penStreamline, mode: penMode });
      setSelection([]); setEdgeSelection([]); setDrawingSelection([]);
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }
    if (event.target !== event.currentTarget && !event.target.classList.contains("edge-layer")) return;
    if (tool === "select" && !publicView) {
      const bounds = canvasRef.current.getBoundingClientRect();
      const point = { x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom };
      const additive = event.shiftKey;
      const baseNodeIds = additive ? selection : [];
      const baseDrawingIds = additive ? drawingSelection : [];
      if (!additive) { setSelection([]); setDrawingSelection([]); }
      setEdgeSelection([]);
      setSelectedAnnotationId(null);
      setNodeToolbarMenu(null);
      setMarquee({ x: point.x, y: point.y, width: 0, height: 0 });
      dragRef.current = { type: "marquee", start: point, baseNodeIds, baseDrawingIds };
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }
    setSelection([]);
    setEdgeSelection([]);
    setDrawingSelection([]);
    setSelectedAnnotationId(null);
  };

  const onNodePointerDown = (event, node) => {
    if (spaceHeld || event.button === 1 || event.button === 2 || tool === "pen" || tool === "hand") return;
    event.stopPropagation();
    if (tool === "annotate") { beginAnnotation(event.clientX, event.clientY); return; }
    setSelectedAnnotationId(null);
    if (publicView) return;
    setRotationModeId(null);
    const clickedPort = event.target instanceof Element && event.target.classList.contains("node-port");
    if (clickedPort && !connectionSource) {
      const bounds = canvasRef.current.getBoundingClientRect();
      const sourceInfo = { nodeId: node.id, port: event.target.dataset.port || "auto" };
      setTool("connect");
      setConnectionSource(sourceInfo);
      setConnectionPreview({ x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom });
      setSelection([node.id]);
      setEdgeSelection([]);
      dragRef.current = { type: "connect", source: sourceInfo, startX: event.clientX, startY: event.clientY, moved: false };
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }
    if (tool === "connect" || connectionSource) {
      if (!connectionSource) {
        const bounds = canvasRef.current.getBoundingClientRect();
        const sourceInfo = { nodeId: node.id, port: "auto" };
        setConnectionSource(sourceInfo);
        setConnectionPreview({ x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom });
        setSelection([node.id]);
        dragRef.current = { type: "connect", source: sourceInfo, startX: event.clientX, startY: event.clientY, moved: false };
        event.currentTarget.setPointerCapture(event.pointerId);
      } else if (connectionSource.nodeId !== node.id) {
        createConnection(connectionSource, node, clickedPort ? event.target.dataset.port || "auto" : "auto");
      }
      return;
    }
    setEdgeSelection([]);
    if (event.shiftKey && selection.includes(node.id)) {
      setSelection((current) => current.filter((id) => id !== node.id));
      return;
    }
    const preserveGroup = selection.includes(node.id);
    const groupedNodeIds = node.groupId ? document.nodes.filter((item) => item.groupId === node.groupId).map((item) => item.id) : [node.id];
    const groupedDrawingIds = node.groupId ? (document.drawings || []).filter((item) => item.groupId === node.groupId).map((item) => item.id) : [];
    const nextNodeIds = event.shiftKey ? [...new Set([...selection, ...groupedNodeIds])] : preserveGroup ? selection : groupedNodeIds;
    const nextDrawingIds = event.shiftKey ? [...new Set([...drawingSelection, ...groupedDrawingIds])] : preserveGroup ? drawingSelection : groupedDrawingIds;
    setSelection(nextNodeIds);
    setDrawingSelection(nextDrawingIds);
    startSelectionDrag(event, nextNodeIds, nextDrawingIds);
  };

  const onDrawingPointerDown = (event, drawing) => {
    if (publicView) return;
    setPenWidth(drawing.width || 2.4);
    setPenColor(drawing.color || "#3f4652");
    setPenStreamline(drawing.streamline ?? .65);
    setPenMode(drawing.mode || "pen");
    setEdgeSelection([]);
    setConnectionSource(null);
    if (event.shiftKey && drawingSelection.includes(drawing.id)) {
      setDrawingSelection((current) => current.filter((id) => id !== drawing.id));
      return;
    }
    const preserveGroup = drawingSelection.includes(drawing.id);
    const groupedDrawingIds = drawing.groupId ? (document.drawings || []).filter((item) => item.groupId === drawing.groupId).map((item) => item.id) : [drawing.id];
    const groupedNodeIds = drawing.groupId ? document.nodes.filter((item) => item.groupId === drawing.groupId).map((item) => item.id) : [];
    const nextDrawingIds = event.shiftKey ? [...new Set([...drawingSelection, ...groupedDrawingIds])] : preserveGroup ? drawingSelection : groupedDrawingIds;
    const nextNodeIds = event.shiftKey ? [...new Set([...selection, ...groupedNodeIds])] : preserveGroup ? selection : groupedNodeIds;
    setDrawingSelection(nextDrawingIds);
    setSelection(nextNodeIds);
    startSelectionDrag(event, nextNodeIds, nextDrawingIds);
  };

  const startElementResize = (corner, event) => {
    const node = selection.length === 1 ? document.nodes.find((item) => item.id === selection[0] && ["image", "text", "arrow", "icon"].includes(item.type)) : null;
    if (!node) return;
    event.preventDefault();
    event.stopPropagation();
    const size = nodeDimensions(node);
    const signX = corner.includes("left") ? -1 : 1;
    const signY = corner.includes("top") ? -1 : 1;
    dragRef.current = {
      type: "element-resize",
      id: node.id,
      elementType: node.type,
      signX,
      signY,
      width: size.width,
      height: size.height,
      startX: event.clientX,
      startY: event.clientY,
      rotation: Number(node.rotation || 0),
      centerX: node.x + size.width / 2,
      centerY: node.y + size.height / 2,
      anchorX: signX < 0 ? node.x + size.width : node.x,
      anchorY: signY < 0 ? node.y + size.height : node.y,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const startElementRotate = (corner, event) => {
    const node = selection.length === 1 ? document.nodes.find((item) => item.id === selection[0] && item.type === "arrow") : null;
    if (!node) return;
    event.preventDefault();
    event.stopPropagation();
    const size = nodeDimensions(node);
    const bounds = canvasRef.current.getBoundingClientRect();
    const point = { x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom };
    const centerX = node.x + size.width / 2;
    const centerY = node.y + size.height / 2;
    const rotation = ((node.rotation || 0) % 360 + 360) % 360;
    dragRef.current = { type: "element-rotate", id: node.id, corner, centerX, centerY, initialRotation: rotation, initialPointerAngle: Math.atan2(point.y - centerY, point.x - centerX) };
    setRotationFeedback(rotation);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (dragRef.current?.type === "element-rotate") {
      const drag = dragRef.current;
      const bounds = canvasRef.current.getBoundingClientRect();
      const point = { x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom };
      const pointerAngle = Math.atan2(point.y - drag.centerY, point.x - drag.centerX);
      const rotation = ((drag.initialRotation + (pointerAngle - drag.initialPointerAngle) * 180 / Math.PI) % 360 + 360) % 360;
      const roundedRotation = Math.round(rotation);
      setRotationFeedback(roundedRotation);
      updateDocument((doc) => ({ ...doc, nodes: doc.nodes.map((node) => node.id === drag.id ? { ...node, rotation: roundedRotation } : node) }));
      return;
    }
    if (dragRef.current?.type === "element-resize") {
      const drag = dragRef.current;
      const bounds = canvasRef.current.getBoundingClientRect();
      const point = { x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom };
      const extentX = (point.x - drag.anchorX) * drag.signX;
      const extentY = (point.y - drag.anchorY) * drag.signY;
      let width;
      let height;
      let x;
      let y;
      if (drag.elementType === "arrow") {
        const radians = drag.rotation * Math.PI / 180;
        const axisX = Math.cos(radians);
        const axisY = Math.sin(radians);
        const pointerDelta = ((event.clientX - drag.startX) / zoom) * axisX + ((event.clientY - drag.startY) / zoom) * axisY;
        width = Math.max(80, Math.min(1600, drag.width + pointerDelta * drag.signX));
        height = drag.height;
        const fixedX = drag.centerX - axisX * drag.width * drag.signX / 2;
        const fixedY = drag.centerY - axisY * drag.width * drag.signX / 2;
        const nextCenterX = fixedX + axisX * width * drag.signX / 2;
        const nextCenterY = fixedY + axisY * width * drag.signX / 2;
        x = nextCenterX - width / 2;
        y = nextCenterY - height / 2;
      } else if (["image", "icon"].includes(drag.elementType)) {
        const projectedScale = (extentX * drag.width + extentY * drag.height) / (drag.width ** 2 + drag.height ** 2);
        const minimum = drag.elementType === "icon" ? 32 : 80;
        width = Math.max(minimum, Math.min(1600, drag.width * projectedScale));
        height = width * (drag.height / drag.width);
        x = drag.signX < 0 ? drag.anchorX - width : drag.anchorX;
        y = drag.signY < 0 ? drag.anchorY - height : drag.anchorY;
      } else {
        width = Math.max(80, Math.min(1600, extentX));
        height = Math.max(40, Math.min(1200, extentY));
        x = drag.signX < 0 ? drag.anchorX - width : drag.anchorX;
        y = drag.signY < 0 ? drag.anchorY - height : drag.anchorY;
      }
      updateDocument((doc) => ({ ...doc, nodes: doc.nodes.map((node) => node.id === drag.id ? { ...node, x, y, width, ...(["text", "arrow", "icon"].includes(drag.elementType) ? { height } : {}), ...(drag.elementType === "text" ? { textFit: "free" } : {}) } : node) }));
      return;
    }
    if (draftDrawing) {
      const bounds = canvasRef.current.getBoundingClientRect();
      let point = { x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom, pressure: event.pressure || .5 };
      if (event.shiftKey) point = snapDrawingPoint(draftDrawing.points[0], point);
      setDraftDrawing((current) => event.shiftKey ? { ...current, points: [current.points[0], point] } : { ...current, points: [...current.points, point] });
      return;
    }
    if (dragRef.current?.type === "marquee") {
      const bounds = canvasRef.current.getBoundingClientRect();
      const point = { x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom };
      const drag = dragRef.current;
      const area = { minX: Math.min(drag.start.x, point.x), minY: Math.min(drag.start.y, point.y), maxX: Math.max(drag.start.x, point.x), maxY: Math.max(drag.start.y, point.y) };
      setMarquee({ x: area.minX, y: area.minY, width: area.maxX - area.minX, height: area.maxY - area.minY });
      const nodeIds = document.nodes.filter((node) => !collapsedNodeIds.has(node.id) && rectIntersects(area, nodeBounds(node))).map((node) => node.id);
      const drawingIds = (document.drawings || []).filter((drawing) => { const box = drawingBounds(drawing); return box && rectIntersects(area, box); }).map((drawing) => drawing.id);
      setSelection([...new Set([...drag.baseNodeIds, ...nodeIds])]);
      setDrawingSelection([...new Set([...drag.baseDrawingIds, ...drawingIds])]);
      return;
    }
    if (dragRef.current?.type === "annotation") {
      const drag = dragRef.current;
      const dx = (event.clientX - drag.startX) / zoom;
      const dy = (event.clientY - drag.startY) / zoom;
      setDocument((doc) => syncActivePage({ ...doc, annotations: (doc.annotations || []).map((item) => item.id === drag.id ? { ...item, x: drag.annotationX + dx, y: drag.annotationY + dy } : item) }));
      return;
    }
    if (dragRef.current?.type === "reconnect") {
      const bounds = canvasRef.current.getBoundingClientRect();
      setReconnectPreview((current) => current ? { ...current, point: { x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom } } : current);
      const hitElement = window.document.elementFromPoint(event.clientX, event.clientY);
      const hoveredNode = hitElement?.closest?.("[data-node-id]");
      const edge = document.edges.find((item) => item.id === dragRef.current.edgeId);
      const blockedId = dragRef.current.side === "target" ? edge?.source : edge?.target;
      const hoveredId = hoveredNode?.dataset.nodeId;
      const validTarget = hoveredId && hoveredId !== blockedId;
      setConnectionTargetId(validTarget ? hoveredId : null);
      setConnectionTargetPort(validTarget ? hitElement?.closest?.(".node-port")?.dataset.port || "auto" : null);
      return;
    }
    if (connectionSource) {
      const bounds = canvasRef.current.getBoundingClientRect();
      setConnectionPreview({ x: (event.clientX - bounds.left - pan.x) / zoom, y: (event.clientY - bounds.top - pan.y) / zoom });
      const hitElement = window.document.elementFromPoint(event.clientX, event.clientY);
      const hoveredNode = hitElement?.closest?.("[data-node-id]");
      const hoveredId = hoveredNode?.dataset.nodeId;
      const validTarget = hoveredId && hoveredId !== connectionSource.nodeId;
      setConnectionTargetId(validTarget ? hoveredId : null);
      setConnectionTargetPort(validTarget ? hitElement?.closest?.(".node-port")?.dataset.port || "auto" : null);
      if (dragRef.current?.type === "connect" && Math.hypot(event.clientX - dragRef.current.startX, event.clientY - dragRef.current.startY) > 4) dragRef.current.moved = true;
    }
    const drag = dragRef.current;
    if (!drag) return;
    if (drag.type === "pan") setPan({ x: drag.panX + event.clientX - drag.startX, y: drag.panY + event.clientY - drag.startY });
    if (drag.type === "selection") {
      const dx = (event.clientX - drag.startX) / zoom;
      const dy = (event.clientY - drag.startY) / zoom;
      const nodeOrigins = Object.fromEntries(drag.nodes.map((node) => [node.id, node]));
      const drawingOrigins = Object.fromEntries(drag.drawings.map((drawing) => [drawing.id, drawing]));
      updateDocument((doc) => ({ ...doc,
        nodes: doc.nodes.map((node) => nodeOrigins[node.id] ? { ...node, x: nodeOrigins[node.id].x + dx, y: nodeOrigins[node.id].y + dy } : node),
        drawings: (doc.drawings || []).map((drawing) => drawingOrigins[drawing.id] ? { ...drawing, points: drawingOrigins[drawing.id].points.map((point) => ({ x: point.x + dx, y: point.y + dy })) } : drawing),
      }));
    }
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (drag?.type === "element-rotate") {
      setRotationFeedback(null);
      setRotationModeId(null);
      dragRef.current = null;
      return;
    }
    if (drag?.type === "marquee") {
      setMarquee(null);
      dragRef.current = null;
      return;
    }
    if (drag?.type === "annotation") {
      const annotation = (document.annotations || []).find((item) => item.id === drag.id);
      if (annotation) {
        if (isPublicLink) apiRequest("annotation", { slug: document.slug, pageId: document.activePageId, annotationId: drag.id, operation: "move", x: annotation.x, y: annotation.y, token: annotationTokens()[drag.id] }).catch(() => setDocument((doc) => syncActivePage({ ...doc, annotations: (doc.annotations || []).map((item) => item.id === drag.id ? { ...item, x: drag.annotationX, y: drag.annotationY } : item) })));
        else updateDocument((doc) => doc);
      }
      dragRef.current = null;
      return;
    }
    if (drag?.type === "reconnect") {
      const edge = document.edges.find((item) => item.id === drag.edgeId);
      const hitElement = event?.type !== "pointercancel" ? window.document.elementFromPoint(event.clientX, event.clientY) : null;
      const targetElement = hitElement?.closest?.("[data-node-id]");
      const droppedNode = targetElement ? document.nodes.find((node) => node.id === targetElement.dataset.nodeId) : null;
      const droppedPort = hitElement?.closest?.(".node-port")?.dataset.port || "auto";
      const blockedId = drag.side === "target" ? edge?.source : edge?.target;
      if (edge && droppedNode && droppedNode.id !== blockedId) {
        const sourceId = drag.side === "source" ? droppedNode.id : edge.source;
        const targetId = drag.side === "target" ? droppedNode.id : edge.target;
        const sourceNode = document.nodes.find((node) => node.id === sourceId);
        const targetNode = document.nodes.find((node) => node.id === targetId);
        updateDocument((doc) => ({ ...doc, edges: doc.edges.map((item) => item.id === edge.id ? { ...item, source: sourceId, target: targetId, sourcePort: drag.side === "source" ? droppedPort : item.sourcePort, targetPort: drag.side === "target" ? droppedPort : item.targetPort, routing: sourceNode?.shape || targetNode?.shape ? "orthogonal" : undefined } : item) }));
      }
      setReconnectPreview(null);
      setConnectionTargetId(null);
      setConnectionTargetPort(null);
      dragRef.current = null;
      return;
    }
    if (drag?.type === "connect") {
      const hitElement = event?.type !== "pointercancel" ? window.document.elementFromPoint(event.clientX, event.clientY) : null;
      const targetElement = hitElement?.closest?.("[data-node-id]");
      const targetNode = targetElement ? document.nodes.find((node) => node.id === targetElement.dataset.nodeId) : null;
      const targetPort = hitElement?.closest?.(".node-port")?.dataset.port || connectionTargetPort || "auto";
      const connected = targetNode ? createConnection(drag.source, targetNode, targetPort) : false;
      if (!connected && (drag.moved || event?.type === "pointercancel")) {
        setConnectionSource(null);
        setTool("select");
      }
      setConnectionTargetId(null);
      setConnectionTargetPort(null);
      dragRef.current = null;
      return;
    }
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

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const wheelHandler = (e) => {
      // Prevent browser pinch-to-zoom (ctrl+touchpad) and handle it on the canvas
      if (e.ctrlKey) {
        e.preventDefault();
        onWheel(e);
      }
    };
    el.addEventListener("wheel", wheelHandler, { passive: false });
    return () => el.removeEventListener("wheel", wheelHandler, { passive: false });
  }, [canvasRef, zoom, pan]);

  const zoomAtCenter = useCallback((nextValue) => {
    const nextZoom = Math.min(2, Math.max(.35, nextValue));
    const width = canvasRef.current?.clientWidth || 900;
    const height = canvasRef.current?.clientHeight || 700;
    const cx = width / 2;
    const cy = height / 2;
    setPan((current) => ({ x: cx - ((cx - current.x) / zoom) * nextZoom, y: cy - ((cy - current.y) / zoom) * nextZoom }));
    setZoom(nextZoom);
  }, [zoom]);

  const zoomToBounds = useCallback((bounds) => {
    if (!bounds) return;
    const width = canvasRef.current?.clientWidth || 900;
    const height = canvasRef.current?.clientHeight || 700;
    const boundsWidth = Math.max(1, bounds.width ?? bounds.maxX - bounds.minX);
    const boundsHeight = Math.max(1, bounds.height ?? bounds.maxY - bounds.minY);
    const minX = bounds.x ?? bounds.minX;
    const minY = bounds.y ?? bounds.minY;
    const nextZoom = Math.min(2, Math.max(.35, Math.min((width - 140) / boundsWidth, (height - 140) / boundsHeight)));
    setZoom(nextZoom);
    setPan({ x: width / 2 - (minX + boundsWidth / 2) * nextZoom, y: height / 2 - (minY + boundsHeight / 2) * nextZoom });
    setZoomMenuOpen(false);
  }, []);

  const zoomToContent = useCallback(() => {
    const bounds = selectedElementsBounds(document.nodes.filter((node) => !collapsedNodeIds.has(node.id)), document.drawings || []);
    zoomToBounds(bounds);
  }, [collapsedNodeIds, document.drawings, document.nodes, zoomToBounds]);

  const deleteSelection = useCallback(() => {
    if ((!selection.length && !edgeSelection.length && !drawingSelection.length) || publicView) return;
    const count = selection.length + edgeSelection.length + drawingSelection.length;
    updateDocument((doc) => ({ ...doc, nodes: doc.nodes.filter((node) => !selection.includes(node.id)), edges: doc.edges.filter((edge) => !edgeSelection.includes(edge.id) && !selection.includes(edge.source) && !selection.includes(edge.target)), drawings: (doc.drawings || []).filter((drawing) => !drawingSelection.includes(drawing.id)) }));
    setSelection([]);
    setEdgeSelection([]);
    setDrawingSelection([]);
    showFeedback("deleted", count);
  }, [drawingSelection, edgeSelection, publicView, selection, showFeedback, updateDocument]);

  const hideSelectedConnection = () => {
    if (!edgeSelection.length || publicView) return;
    updateDocument((doc) => ({ ...doc, edges: doc.edges.map((edge) => edgeSelection.includes(edge.id) ? { ...edge, hidden: true, hiddenNodeId: edge.target } : edge) }));
    setEdgeSelection([]);
  };

  const showHiddenConnections = (nodeId) => {
    const reveal = (doc) => ({ ...doc, edges: doc.edges.map((edge) => {
      const belongsToBranch = edge.hiddenByRoot === nodeId;
      const touchesNode = edge.source === nodeId || edge.target === nodeId;
      if ((!belongsToBranch && !touchesNode) || !edge.hidden) return edge;
      const { hiddenNodeId: _hiddenNodeId, hiddenByRoot: _hiddenByRoot, ...visibleEdge } = edge;
      return { ...visibleEdge, hidden: false };
    }) });
    if (publicView) setDocument(reveal);
    else updateDocument(reveal);
  };

  const hideNodeConnections = (nodeId) => updateDocument((doc) => {
    const branchEdgeIds = new Set();
    const visitedNodes = new Set([nodeId]);
    const pendingNodes = [nodeId];
    while (pendingNodes.length) {
      const sourceId = pendingNodes.shift();
      doc.edges.filter((edge) => edge.source === sourceId && edge.target !== nodeId).forEach((edge) => {
        branchEdgeIds.add(edge.id);
        if (!visitedNodes.has(edge.target)) {
          visitedNodes.add(edge.target);
          pendingNodes.push(edge.target);
        }
      });
    }
    if (!branchEdgeIds.size) {
      doc.edges.filter((edge) => edge.source === nodeId || edge.target === nodeId).forEach((edge) => branchEdgeIds.add(edge.id));
    }
    return { ...doc, edges: doc.edges.map((edge) => {
      if (!branchEdgeIds.has(edge.id)) return edge;
      const hiddenNodeId = edge.source === nodeId || visitedNodes.has(edge.source) ? edge.target : edge.source;
      return { ...edge, hidden: true, hiddenNodeId, hiddenByRoot: nodeId };
    }) };
  });

  const changeDrawingWidth = (width) => {
    setPenWidth(width);
    if (!drawingSelection.length) return;
    updateDocument((doc) => ({ ...doc, drawings: (doc.drawings || []).map((drawing) => drawingSelection.includes(drawing.id) ? { ...drawing, width } : drawing) }));
  };

  const changeDrawingColor = (color) => {
    setPenColor(color);
    if (!drawingSelection.length) return;
    updateDocument((doc) => ({ ...doc, drawings: (doc.drawings || []).map((drawing) => drawingSelection.includes(drawing.id) ? { ...drawing, color } : drawing) }));
  };

  const changeDrawingStreamline = (streamline) => {
    setPenStreamline(streamline);
    if (!drawingSelection.length) return;
    updateDocument((doc) => ({ ...doc, drawings: (doc.drawings || []).map((drawing) => drawingSelection.includes(drawing.id) ? { ...drawing, streamline } : drawing) }));
  };

  const changeDrawingMode = (mode) => {
    setPenMode(mode);
    const width = mode === "highlighter" ? 14 : 2.4;
    const color = mode === "highlighter" ? "#ffd84a" : "#3f4652";
    setPenWidth(width);
    setPenColor(color);
    if (!drawingSelection.length) return;
    updateDocument((doc) => ({ ...doc, drawings: (doc.drawings || []).map((drawing) => drawingSelection.includes(drawing.id) ? { ...drawing, mode, width, color } : drawing) }));
  };

  const changeStacking = useCallback((direction, target = null) => {
    if (publicView) return;
    const nodeIds = new Set(target?.nodeIds || selection);
    const drawingIds = new Set(target?.drawingIds || drawingSelection);
    if (!nodeIds.size && !drawingIds.size) return;
    const reorder = (items, ids) => {
      const chosen = items.filter((item) => ids.has(item.id));
      const rest = items.filter((item) => !ids.has(item.id));
      return direction === "front" ? [...rest, ...chosen] : [...chosen, ...rest];
    };
    updateDocument((doc) => ({
      ...doc,
      nodes: reorder(doc.nodes.map((node) => nodeIds.has(node.id) ? { ...node, stackLevel: direction } : node), nodeIds),
      drawings: reorder((doc.drawings || []).map((drawing) => drawingIds.has(drawing.id) ? { ...drawing, stackLevel: direction } : drawing), drawingIds),
    }));
    setContextMenu(null);
  }, [drawingSelection, publicView, selection, updateDocument]);

  const groupSelection = useCallback((target = null) => {
    if (publicView) return;
    const nodeIds = target?.nodeIds || selection;
    const drawingIds = target?.drawingIds || drawingSelection;
    if (nodeIds.length + drawingIds.length < 2) return;
    const groupId = uid("group");
    updateDocument((doc) => ({
      ...doc,
      nodes: doc.nodes.map((node) => nodeIds.includes(node.id) ? { ...node, groupId } : node),
      drawings: (doc.drawings || []).map((drawing) => drawingIds.includes(drawing.id) ? { ...drawing, groupId } : drawing),
    }));
    setContextMenu(null);
    showFeedback("grouped", nodeIds.length + drawingIds.length);
  }, [drawingSelection, publicView, selection, showFeedback, updateDocument]);

  const ungroupSelection = useCallback((target = null) => {
    if (publicView) return;
    const nodeIds = target?.nodeIds || selection;
    const drawingIds = target?.drawingIds || drawingSelection;
    const groupIds = new Set([
      ...document.nodes.filter((node) => nodeIds.includes(node.id)).map((node) => node.groupId),
      ...(document.drawings || []).filter((drawing) => drawingIds.includes(drawing.id)).map((drawing) => drawing.groupId),
    ].filter(Boolean));
    if (!groupIds.size) return;
    updateDocument((doc) => ({
      ...doc,
      nodes: doc.nodes.map((node) => groupIds.has(node.groupId) ? { ...node, groupId: undefined } : node),
      drawings: (doc.drawings || []).map((drawing) => groupIds.has(drawing.groupId) ? { ...drawing, groupId: undefined } : drawing),
    }));
    setContextMenu(null);
    showFeedback("ungrouped", nodeIds.length + drawingIds.length);
  }, [document.drawings, document.nodes, drawingSelection, publicView, selection, showFeedback, updateDocument]);

  const openNodeContextMenu = (event, node) => {
    if (publicView) return;
    event.preventDefault();
    event.stopPropagation();
    const keepGroup = selection.includes(node.id);
    const nodeIds = keepGroup ? selection : [node.id];
    const drawingIds = keepGroup ? drawingSelection : [];
    if (!keepGroup) { setSelection([node.id]); setDrawingSelection([]); setEdgeSelection([]); }
    const bounds = canvasRef.current?.getBoundingClientRect();
    setContextMenu({ x: Math.max(8, Math.min((bounds?.width || 900) - 224, event.clientX - (bounds?.left || 0))), y: Math.max(8, Math.min((bounds?.height || 700) - 278, event.clientY - (bounds?.top || 0))), nodeIds, drawingIds, rotateNodeId: node.type === "arrow" ? node.id : null });
  };

  const openDrawingContextMenu = (event, drawing) => {
    if (publicView) return;
    event.preventDefault();
    event.stopPropagation();
    const keepGroup = drawingSelection.includes(drawing.id);
    const drawingIds = keepGroup ? drawingSelection : [drawing.id];
    const nodeIds = keepGroup ? selection : [];
    if (!keepGroup) { setDrawingSelection([drawing.id]); setSelection([]); setEdgeSelection([]); }
    const bounds = canvasRef.current?.getBoundingClientRect();
    setContextMenu({ x: Math.max(8, Math.min((bounds?.width || 900) - 224, event.clientX - (bounds?.left || 0))), y: Math.max(8, Math.min((bounds?.height || 700) - 278, event.clientY - (bounds?.top || 0))), nodeIds, drawingIds });
  };

  const selectionPayload = useCallback(() => {
    const nodeIds = new Set(selection);
    const nodes = document.nodes.filter((node) => nodeIds.has(node.id));
    const drawings = (document.drawings || []).filter((drawing) => drawingSelection.includes(drawing.id));
    const edges = document.edges.filter((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target));
    return nodes.length || drawings.length ? { type: "mymind-elements", version: 1, nodes, drawings, edges } : null;
  }, [document.drawings, document.edges, document.nodes, drawingSelection, selection]);

  const pasteElements = useCallback((payload, offset = 32) => {
    if (publicView || payload?.type !== "mymind-elements") return false;
    const nodeMap = new Map();
    const nodes = (payload.nodes || []).map((node) => { const id = uid("node"); nodeMap.set(node.id, id); return { ...node, id, x: Number(node.x || 0) + offset, y: Number(node.y || 0) + offset }; });
    const drawings = (payload.drawings || []).map((drawing) => ({ ...drawing, id: uid("drawing"), points: (drawing.points || []).map((point) => ({ x: point.x + offset, y: point.y + offset })) }));
    const edges = (payload.edges || []).flatMap((edge) => nodeMap.has(edge.source) && nodeMap.has(edge.target) ? [{ ...edge, id: uid("edge"), source: nodeMap.get(edge.source), target: nodeMap.get(edge.target) }] : []);
    if (!nodes.length && !drawings.length) return false;
    updateDocument((doc) => ({ ...doc, nodes: [...doc.nodes, ...nodes], edges: [...doc.edges, ...edges], drawings: [...(doc.drawings || []), ...drawings] }));
    setSelection(nodes.map((node) => node.id));
    setDrawingSelection(drawings.map((drawing) => drawing.id));
    setEdgeSelection([]);
    return true;
  }, [publicView, updateDocument]);

  const duplicateSelection = useCallback(() => {
    const payload = selectionPayload();
    if (payload && pasteElements(payload, 32)) showFeedback("duplicated", (payload.nodes || []).length + (payload.drawings || []).length);
  }, [pasteElements, selectionPayload, showFeedback]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPagesOpen(false);
        setNodeMenu(false);
        setZoomMenuOpen(false);
        setCommandPaletteOpen((open) => !open);
        return;
      }
      if (commandPaletteOpen) return;
      if ((event.key === "Backspace" || event.key === "Delete") && !["INPUT", "TEXTAREA"].includes(window.document.activeElement?.tagName)) deleteSelection();
      if ((event.metaKey || event.ctrlKey) && event.key === "0") { event.preventDefault(); setPan({ x: 80, y: 90 }); setZoom(.9); }
      const modalOpen = editingNode || editingEdge || exportOpen || shareOpen || shortcutsOpen || linkOpen || imageSourceOpen || pendingAnnotation;
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
      if (event.key === "Escape" && tool === "annotate" && !pendingAnnotation) setTool("select");
      if (event.key === "Escape") {
        setContextMenu(null);
        setRotationModeId(null);
        setSelectedAnnotationId(null);
        setPagesOpen(false);
        setNodeMenu(false);
      }
      const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(activeTag) || window.document.activeElement?.isContentEditable;
      if (!publicView && !modalOpen && !isTyping && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
        event.preventDefault();
        applyHistory(event.shiftKey ? "redo" : "undo");
      }
      if (!publicView && !modalOpen && !isTyping && (event.metaKey || event.ctrlKey) && (event.key.toLowerCase() === "x" || event.key.toLowerCase() === "y")) {
        event.preventDefault();
        applyHistory("redo");
      }
      if (!modalOpen && !isTyping && (event.metaKey || event.ctrlKey) && (event.key === "+" || event.key === "=" || event.key === "-")) {
        event.preventDefault();
        zoomAtCenter(event.key === "-" ? zoom - .1 : zoom + .1);
      }
      if (!modalOpen && !isTyping && (event.metaKey || event.ctrlKey) && ["1", "5", "7"].includes(event.key)) {
        event.preventDefault();
        const m = { "1": 1, "5": .5, "7": .7 };
        zoomAtCenter(m[event.key]);
      }
      if (!publicView && !modalOpen && !isTyping && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "d") { event.preventDefault(); duplicateSelection(); }
      if (!publicView && !modalOpen && !isTyping && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "g") {
        event.preventDefault();
        if (event.shiftKey) ungroupSelection();
        else groupSelection();
      }
      if (!publicView && !modalOpen && !isTyping && (event.metaKey || event.ctrlKey) && (event.key === "[" || event.key === "]")) {
        event.preventDefault();
        changeStacking(event.key === "]" ? "front" : "back");
      }
      if (event.key === " " && !modalOpen && !isTyping) {
        event.preventDefault();
        setSpaceHeld(true);
      }
      if (!modalOpen && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        setTool("annotate");
        setConnectionSource(null);
      }
      if (publicView && !modalOpen && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey && ["v", "h"].includes(event.key.toLowerCase())) {
        event.preventDefault();
        setPagesOpen(false);
        setTool(event.key.toLowerCase() === "h" ? "hand" : "select");
      }
      if (!publicView && !modalOpen && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const shortcut = event.key.toLowerCase();
        if (["v", "h", "l", "n", "t", "p", "d", "k", "s", "i"].includes(shortcut)) {
          event.preventDefault();
          setPagesOpen(false);
          setNodeMenu(false);
        }
        if (shortcut === "v") { setTool("select"); setConnectionSource(null); }
        if (shortcut === "h") { setTool("hand"); setConnectionSource(null); }
        if (shortcut === "l") { setTool("connect"); setConnectionSource(null); }
        if (shortcut === "n") addNode("idea");
        if (shortcut === "t") addTextNode();
        if (shortcut === "p") setImageSourceOpen(true);
        if (shortcut === "d") { setTool("pen"); setConnectionSource(null); }
        if (shortcut === "k") setLinkOpen(true);
        if (shortcut === "s") addArrowShape();
        if (shortcut === "i") setIconBrowserOpen(true);
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
  }, [addArrowShape, addConnectedNode, addNode, addTextNode, applyHistory, changeStacking, commandPaletteOpen, connectionSource, deleteSelection, document.nodes, duplicateSelection, editingEdge, editingNode, exportOpen, groupSelection, imageSourceOpen, linkOpen, pendingAnnotation, publicView, selection, shareOpen, shortcutsOpen, tool, ungroupSelection, zoom, zoomAtCenter]);

  useEffect(() => {
    const dismissFloatingPanels = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (selectedAnnotationId && !target?.closest(".floating-annotation-panel, .annotation-marker")) setSelectedAnnotationId(null);
      if (pendingAnnotation && !target?.closest(".annotation-composer")) setPendingAnnotation(null);
      if (pagesOpen && !target?.closest(".pages-control")) setPagesOpen(false);
      if (nodeMenu && !target?.closest(".toolbar-popover-wrap")) setNodeMenu(false);
    };
    window.document.addEventListener("pointerdown", dismissFloatingPanels, true);
    return () => window.document.removeEventListener("pointerdown", dismissFloatingPanels, true);
  }, [nodeMenu, pagesOpen, pendingAnnotation, selectedAnnotationId]);

  useEffect(() => {
    const onCopy = (event) => {
      if (publicView || ["INPUT", "TEXTAREA", "SELECT"].includes(window.document.activeElement?.tagName) || window.document.activeElement?.isContentEditable) return;
      const payload = selectionPayload();
      if (!payload) return;
      clipboardRef.current = payload;
      event.preventDefault();
      const serialized = JSON.stringify(payload);
      event.clipboardData?.setData("application/x-mymind", serialized);
      event.clipboardData?.setData("text/plain", `MYMIND:${serialized}`);
      showFeedback("copied", (payload.nodes || []).length + (payload.drawings || []).length);
    };
    const onPaste = (event) => {
      if (publicView || editingNode || exportOpen || shareOpen || shortcutsOpen || linkOpen || imageSourceOpen || pendingAnnotation) return;
      const activeTag = window.document.activeElement?.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(activeTag) || window.document.activeElement?.isContentEditable) return;
      const custom = event.clipboardData?.getData("application/x-mymind");
      const plainText = event.clipboardData?.getData("text/plain") || "";
      const serialized = custom || (plainText.startsWith("MYMIND:") ? plainText.slice(7) : "");
      if (serialized) {
        try { const payload = JSON.parse(serialized); if (pasteElements(payload)) { event.preventDefault(); clipboardRef.current = payload; showFeedback("pasted", (payload.nodes || []).length + (payload.drawings || []).length); return; } }
        catch { /* Continue with image and URL clipboard handling. */ }
      } else if (!event.clipboardData?.items?.length && clipboardRef.current && pasteElements(clipboardRef.current)) { event.preventDefault(); showFeedback("pasted", (clipboardRef.current.nodes || []).length + (clipboardRef.current.drawings || []).length); return; }
      const imageItem = Array.from(event.clipboardData?.items || []).find((item) => item.type.startsWith("image/"));
      if (imageItem) {
        event.preventDefault();
        addImageFile(imageItem.getAsFile());
        showFeedback("pasted", 1);
        return;
      }
      const pastedUrl = normaliseLinkUrl(plainText);
      if (pastedUrl) { event.preventDefault(); addLinkNode(pastedUrl); showFeedback("pasted", 1); return; }
      if (plainText.trim()) { event.preventDefault(); addTextNode(plainText.trim()); showFeedback("pasted", 1); }
    };
    window.addEventListener("copy", onCopy);
    window.addEventListener("paste", onPaste);
    return () => { window.removeEventListener("copy", onCopy); window.removeEventListener("paste", onPaste); };
  }, [addImageFile, addLinkNode, addTextNode, editingNode, exportOpen, imageSourceOpen, linkOpen, pasteElements, pendingAnnotation, publicView, selectionPayload, shareOpen, shortcutsOpen, showFeedback]);

  const shareUrl = `${window.location.origin}${APP_BASE}${document.slug}`;
  const toggleShare = () => updateDocument((doc) => doc.shared ? { ...doc, shared: false, guestEditable: false } : { ...doc, shared: true }, { immediate: true });
  const toggleGuestEditing = () => updateDocument((doc) => ({ ...doc, guestEditable: !doc.guestEditable }), { immediate: true });

  const exportDiagram = async (format, scopeOverride = null) => {
    if (format === "mymind") {
      const portable = syncActivePage({ ...document, shared: false, guestEditable: false, folderId: null });
      downloadBlob(new Blob([JSON.stringify({ type: "mymind-canvas", version: 1, exportedAt: new Date().toISOString(), document: portable })], { type: "application/vnd.mymind.canvas+json" }), `${slugify(document.title)}.mymind`);
      setExportOpen(false);
      return;
    }
    const effectiveScope = scopeOverride || exportScope;
    const selectedMode = effectiveScope === "selected";
    const ids = selectedMode ? new Set(selection) : null;
    const availableNodes = document.nodes.filter((node) => !collapsedNodeIds.has(node.id));
    const nodes = selectedMode ? availableNodes.filter((node) => ids.has(node.id)) : availableNodes;
    const drawings = selectedMode ? (document.drawings || []).filter((drawing) => drawingSelection.includes(drawing.id)) : (document.drawings || []);
    const inlineImageData = {};
    await Promise.all(nodes.filter((node) => node.type === "image" && node.imageData && !node.imageData.startsWith("data:")).map(async (node) => {
      try { inlineImageData[node.id] = await toDataUri(node.imageData); }
      catch { inlineImageData[node.id] = null; }
    }));
    const visibleEdges = document.edges.filter((edge) => !edge.hidden && !collapsedNodeIds.has(edge.source) && !collapsedNodeIds.has(edge.target));
    const edges = selectedMode ? visibleEdges.filter((edge) => ids.has(edge.source) && ids.has(edge.target)) : visibleEdges;
    if (!nodes.length && !drawings.length) return;
    let minNodeX = Infinity, minNodeY = Infinity, maxNodeX = -Infinity, maxNodeY = -Infinity;
    nodes.forEach((node) => {
      const size = nodeDimensions(node);
      minNodeX = Math.min(minNodeX, node.x);
      minNodeY = Math.min(minNodeY, node.y);
      maxNodeX = Math.max(maxNodeX, node.x + size.width);
      maxNodeY = Math.max(maxNodeY, node.y + size.height);
    });
    drawings.forEach((drawing) => (drawing.points || []).forEach((point) => {
      minNodeX = Math.min(minNodeX, point.x);
      minNodeY = Math.min(minNodeY, point.y);
      maxNodeX = Math.max(maxNodeX, point.x);
      maxNodeY = Math.max(maxNodeY, point.y);
    }));
    const bounds = {
      minX: minNodeX - 70,
      minY: minNodeY - 70,
      maxX: maxNodeX + 70,
      maxY: maxNodeY + 70,
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
    const drawingMarkup = (items) => items.map((drawing) => {
      return `<path d="${perfectDrawingPath(drawing, bounds.minX, bounds.minY)}" fill="${drawing.color || "#3f4652"}"/>`;
    }).join("");
    const backDrawingPaths = drawingMarkup(drawings.filter((drawing) => drawing.stackLevel === "back"));
    const frontDrawingPaths = drawingMarkup(drawings.filter((drawing) => drawing.stackLevel !== "back"));
    const cards = nodes.map((node) => {
      const tone = toneForNode(node);
      const shapeColors = accessibleShapeColors(tone.accent);
      const x = node.x - bounds.minX, y = node.y - bounds.minY;
      const size = nodeDimensions(node);
      if (node.type === "image") {
        const href = node.id in inlineImageData ? inlineImageData[node.id] : node.imageData;
        if (!href) return "";
        const fit = node.cropAspect && node.cropAspect !== "original" ? "slice" : "meet";
        return `<image href="${href}" x="${x}" y="${y}" width="${size.width}" height="${size.height}" preserveAspectRatio="xMidYMid ${fit}"/>`;
      }
      if (node.type === "arrow") {
        const strokeWidth = Math.max(2, size.height / 14.7);
        return `<g transform="rotate(${node.rotation || 0} ${x + size.width / 2} ${y + size.height / 2})" fill="none" stroke="${tone.accent}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" ${node.lineStyle === "dashed" ? 'stroke-dasharray="9 7"' : ""}><line x1="${x + 4}" y1="${y + size.height / 2}" x2="${x + size.width - size.height * .36}" y2="${y + size.height / 2}"/><polyline points="${x + size.width - size.height * .68},${y + size.height * .18} ${x + size.width - size.height * .34},${y + size.height / 2} ${x + size.width - size.height * .68},${y + size.height * .82}"/></g>`;
      }
      if (node.type === "icon") {
        const HeroIcon = LucideIcons[node.iconName] || HeroOutlineIcons[node.iconName] || LucideIcons.SparklesIcon;
        const iconMarkup = renderToStaticMarkup(<HeroIcon width={size.width} height={size.height} strokeWidth="1.7" color={tone.accent} />);
        return `<g transform="translate(${x} ${y})">${iconMarkup}</g>`;
      }
      if (node.type === "text") {
        const fontSize = node.fontSize || 24;
        const lines = wrapSvgText(node.label, Math.max(8, Math.floor((size.width - 20) / (fontSize * .58))));
        const background = node.textBackground ? `<rect x="${x}" y="${y}" width="${size.width}" height="${size.height}" rx="10" fill="${node.textBackground}"/>` : "";
        const alignment = node.textAlign || "left";
        const textX = alignment === "center" ? x + size.width / 2 : alignment === "right" ? x + size.width - 10 : x + 10;
        const anchor = alignment === "center" ? "middle" : alignment === "right" ? "end" : "start";
        return `<g>${background}<text text-anchor="${anchor}" font-family="Inter,Arial" font-size="${fontSize}" font-weight="600" fill="${tone.accent}">${svgLines(lines, textX, y + fontSize, fontSize * 1.25)}</text></g>`;
      }
      const titleLines = wrapSvgText(node.label, Math.max(10, Math.floor((size.width - 72) / 7)));
      const subtitleLines = wrapSvgText(node.subtitle || "", Math.max(12, Math.floor((size.width - 72) / 5.6)));
      const titleStart = y + 27;
      const subtitleStart = titleStart + titleLines.length * 17 + 4;
      const shapeSurface = node.shape === "decision"
        ? `<polygon points="${x + size.width / 2},${y} ${x + size.width},${y + size.height / 2} ${x + size.width / 2},${y + size.height} ${x},${y + size.height / 2}" fill="${tone.accent}" stroke="${tone.accent}"/>`
        : node.shape === "data"
          ? `<polygon points="${x + 22},${y} ${x + size.width},${y} ${x + size.width - 22},${y + size.height} ${x},${y + size.height}" fill="${tone.accent}" stroke="${tone.accent}"/>`
          : `<rect x="${x}" y="${y}" width="${size.width}" height="${size.height}" rx="${node.shape === "terminator" ? size.height / 2 : node.shape === "process" ? 9 : 16}" fill="${node.shape ? tone.accent : "#ffffff"}" stroke="${node.shape ? tone.accent : "#e0e4ea"}"/>`;
      if (node.shape) {
        const shapeTitle = wrapSvgText(node.label, Math.max(12, Math.floor((size.width - 50) / 7)));
        const shapeSubtitle = wrapSvgText(node.subtitle || "", Math.max(14, Math.floor((size.width - 50) / 5.6)));
        const contentHeight = shapeTitle.length * 17 + shapeSubtitle.length * 14 + 4;
        const shapeTitleStart = y + (size.height - contentHeight) / 2 + 13;
        const shapeSubtitleStart = shapeTitleStart + shapeTitle.length * 17 + 4;
        return `<g>${shapeSurface}<text text-anchor="middle" font-family="Inter,Arial" font-size="14" font-weight="700" fill="${shapeColors.text}">${svgLines(shapeTitle, x + size.width / 2, shapeTitleStart, 17)}</text><text text-anchor="middle" font-family="Inter,Arial" font-size="11" fill="${shapeColors.muted}">${svgLines(shapeSubtitle, x + size.width / 2, shapeSubtitleStart, 14)}</text></g>`;
      }
      const icon = renderToStaticMarkup(<IconForNode name={node.icon} size={20} aria-hidden="true" />).replace("<svg ", `<svg x="${x + 20}" y="${y + 21}" color="${tone.accent}" `);
      return `<g>${shapeSurface}<circle cx="${x + 30}" cy="${y + 31}" r="17" fill="${tone.soft}"/>${icon}<text font-family="Inter,Arial" font-size="14" font-weight="700" fill="#333944">${svgLines(titleLines, x + 57, titleStart, 17)}</text><text font-family="Inter,Arial" font-size="11" fill="#7a8290">${svgLines(subtitleLines, x + 57, subtitleStart, 14)}</text></g>`;
    }).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 Z" fill="#bcc2cc"/></marker><marker id="circle" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><circle cx="4" cy="4" r="3" fill="#ffffff" stroke="#9da5b1" stroke-width="1.5"/></marker></defs><rect width="100%" height="100%" fill="#f7f8fb"/>${paths}${backDrawingPaths}${cards}${frontDrawingPaths}</svg>`;
    const filename = `${slugify(document.title)}-${effectiveScope}`;
    if (format === "svg") downloadBlob(new Blob([svg], { type: "image/svg+xml" }), `${filename}.svg`);
    else rasterizeSvg(svg, width, height, format, filename);
    setExportOpen(false);
  };

  const selectedNode = selection.length === 1 && drawingSelection.length === 0 ? nodeMap[selection[0]] : null;
  const selectedNodeSize = selectedNode ? nodeDimensions(selectedNode) : null;
  const selectedNodeScreenTop = selectedNode ? pan.y + selectedNode.y * zoom : 0;
  const nodeToolbarStyle = selectedNode ? {
    left: Math.max(190, Math.min((canvasRef.current?.clientWidth || 900) - 190, pan.x + (selectedNode.x + selectedNodeSize.width / 2) * zoom)),
    top: selectedNodeScreenTop < 78 ? pan.y + (selectedNode.y + selectedNodeSize.height) * zoom + 12 : selectedNodeScreenTop - 12,
    transform: selectedNodeScreenTop < 78 ? "translate(-50%, 0)" : "translate(-50%, -100%)",
  } : null;
  const imageToolbarBelow = selectedNode?.type === "image" && selectedNodeScreenTop < 285;
  const imageToolbarStyle = selectedNode?.type === "image" ? {
    left: Math.max(190, Math.min((canvasRef.current?.clientWidth || 900) - 190, pan.x + (selectedNode.x + selectedNodeSize.width / 2) * zoom)),
    top: imageToolbarBelow ? pan.y + (selectedNode.y + selectedNodeSize.height) * zoom + 16 : selectedNodeScreenTop - 14,
    transform: imageToolbarBelow ? "translate(-50%, 0)" : "translate(-50%, -100%)",
  } : null;
  const selectedEdge = edgeSelection.length === 1 ? document.edges.find((edge) => edge.id === edgeSelection[0]) : null;
  const visibleParticipants = participants.filter((participant) => participant.clientId !== presenceClientRef.current);
  const selectedAnnotation = (document.annotations || []).find((annotation) => annotation.id === selectedAnnotationId) || null;
  const commentItems = (document.pages || []).flatMap((page) => {
    const annotations = page.id === document.activePageId ? (document.annotations || []) : (page.annotations || []);
    return annotations.map((annotation) => ({ annotation, pageId: page.id, pageName: page.name }));
  });
  const focusComment = ({ annotation, pageId }) => {
    if (pageId !== document.activePageId) switchPage(pageId);
    const width = canvasRef.current?.clientWidth || 900;
    const height = canvasRef.current?.clientHeight || 700;
    setPan({ x: width / 2 - (Number(annotation.x) || 0) * zoom, y: height / 2 - (Number(annotation.y) || 0) * zoom });
    setAnnotationsVisible(true);
    setSelectedAnnotationId(annotation.id);
    setSelection([]);
    setEdgeSelection([]);
    setDrawingSelection([]);
  };
  const annotationPanelStyle = selectedAnnotation ? {
    left: Math.max(180, Math.min((canvasRef.current?.clientWidth || 900) - 180, pan.x + selectedAnnotation.x * zoom)),
    top: Math.max(16, Math.min((canvasRef.current?.clientHeight || 700) - 320, pan.y + selectedAnnotation.y * zoom + 14)),
  } : null;
  const pendingAnnotationPanelStyle = pendingAnnotation ? {
    left: Math.max(170, Math.min((canvasRef.current?.clientWidth || 900) - 170, pan.x + pendingAnnotation.x * zoom)),
    top: Math.max(16, Math.min((canvasRef.current?.clientHeight || 700) - 190, pan.y + pendingAnnotation.y * zoom + 14)),
  } : null;
  const selectedEdgeGeometry = selectedEdge && nodeMap[selectedEdge.source] && nodeMap[selectedEdge.target] ? edgeGeometry(selectedEdge, nodeMap[selectedEdge.source], nodeMap[selectedEdge.target]) : null;
  const selectedEdgeScreenPoint = selectedEdgeGeometry ? { x: pan.x + selectedEdgeGeometry.labelX * zoom, y: pan.y + selectedEdgeGeometry.labelY * zoom } : null;
  const edgeToolbarStyle = selectedEdgeScreenPoint ? {
    left: Math.max(225, Math.min((canvasRef.current?.clientWidth || 900) - 225, selectedEdgeScreenPoint.x)),
    top: selectedEdgeScreenPoint.y < 78 ? selectedEdgeScreenPoint.y + 22 : selectedEdgeScreenPoint.y - 15,
    transform: selectedEdgeScreenPoint.y < 78 ? "translate(-50%, 0)" : "translate(-50%, -100%)",
  } : null;

  if (!initialDocument && isPublicLink) return <NotFound />;

  const hasSelection = selection.length > 0 || drawingSelection.length > 0 || edgeSelection.length > 0;
  const commandPaletteCommands = publicView ? [
    { id: "zoom-in", label: "Zoom in", icon: MagnifyingGlassPlus, shortcut: "⌘+", run: () => zoomAtCenter(zoom + .1) },
    { id: "zoom-out", label: "Zoom out", icon: MagnifyingGlassMinus, shortcut: "⌘−", run: () => zoomAtCenter(zoom - .1) },
    { id: "zoom-reset", label: "Reset zoom to 100%", icon: MagnifyingGlass, shortcut: "⌘1", run: () => zoomAtCenter(1) },
    { id: "zoom-content", label: "Zoom to content", icon: Viewfinder, run: zoomToContent },
    { id: "shortcuts", label: "Keyboard shortcuts", icon: HelpCircle, shortcut: "?", run: () => setShortcutsOpen(true) },
  ] : [
    { id: "add-idea", label: "Add idea node", icon: Lightbulb, shortcut: "N", run: () => addNode("idea") },
    { id: "add-text", label: "Add text", icon: TextBlock, shortcut: "T", run: () => addTextNode() },
    { id: "add-image", label: "Add image", icon: Photo, shortcut: "P", run: () => setImageSourceOpen(true) },
    { id: "add-link", label: "Add link", icon: LinkSimple, shortcut: "K", run: () => setLinkOpen(true) },
    { id: "add-arrow", label: "Add arrow", icon: ArrowLine, shortcut: "S", run: () => addArrowShape() },
    { id: "add-icon", label: "Add icon", icon: Cube, shortcut: "I", run: () => setIconBrowserOpen(true) },
    { id: "tool-select", label: "Select tool", icon: CursorClick, shortcut: "V", run: () => { setTool("select"); setConnectionSource(null); } },
    { id: "tool-hand", label: "Pan tool", icon: Hand, shortcut: "H", run: () => { setTool("hand"); setConnectionSource(null); } },
    { id: "tool-connect", label: "Connect tool", icon: LinkNodes, shortcut: "L", run: () => { setTool("connect"); setConnectionSource(null); } },
    { id: "tool-draw", label: "Draw tool", icon: Pen, shortcut: "D", run: () => { setTool("pen"); setConnectionSource(null); } },
    { id: "tool-comment", label: "Add comment", icon: ChatCircleDots, shortcut: "A", run: () => setTool("annotate") },
    { id: "undo", label: "Undo", icon: Undo2, shortcut: "⌘Z", run: () => applyHistory("undo") },
    { id: "redo", label: "Redo", icon: Redo2, shortcut: "⌘⇧Z", run: () => applyHistory("redo") },
    { id: "zoom-in", label: "Zoom in", icon: MagnifyingGlassPlus, shortcut: "⌘+", run: () => zoomAtCenter(zoom + .1) },
    { id: "zoom-out", label: "Zoom out", icon: MagnifyingGlassMinus, shortcut: "⌘−", run: () => zoomAtCenter(zoom - .1) },
    { id: "zoom-reset", label: "Reset zoom to 100%", icon: MagnifyingGlass, shortcut: "⌘1", run: () => zoomAtCenter(1) },
    { id: "zoom-content", label: "Zoom to content", icon: Viewfinder, run: zoomToContent },
    ...(hasSelection ? [
      { id: "duplicate", label: "Duplicate selection", icon: Copy, shortcut: "⌘D", run: duplicateSelection },
      { id: "group", label: "Group selection", icon: Group, shortcut: "⌘G", run: () => groupSelection() },
      { id: "ungroup", label: "Ungroup selection", icon: Ungroup, shortcut: "⌘⇧G", run: () => ungroupSelection() },
      { id: "front", label: "Bring to front", icon: ArrowUpToLine, shortcut: "⌘]", run: () => changeStacking("front") },
      { id: "back", label: "Send to back", icon: ArrowDownToLine, shortcut: "⌘[", run: () => changeStacking("back") },
      { id: "delete", label: "Delete selection", icon: Trash, shortcut: "⌫", run: deleteSelection },
    ] : []),
    { id: "toggle-comments", label: commentsOpen ? "Hide comments panel" : "Show comments panel", icon: ChatCircleDots, run: () => setCommentsOpen((open) => !open) },
    { id: "export", label: "Export canvas", icon: DownloadSimple, run: () => setExportOpen(true) },
    { id: "share", label: "Share canvas", icon: ShareNetwork, run: () => setShareOpen(true) },
    { id: "shortcuts", label: "Keyboard shortcuts", icon: HelpCircle, shortcut: "?", run: () => setShortcutsOpen(true) },
    { id: "back-to-dashboard", label: "Back to all canvases", icon: ArrowLeft, run: () => navigate("/") },
  ];

  return <div className={`app-shell editor-shell ${isPublicLink ? "is-public" : ""}`}>
    {commandPaletteOpen && <CommandPalette commands={commandPaletteCommands} onClose={() => setCommandPaletteOpen(false)} />}
    <header className="topbar editor-topbar">
      <div className="editor-title-row">
        {!isPublicLink && <button className="editor-back-button" aria-label="Back to dashboard" onClick={() => navigate("/")}><ArrowLeft size={16} /></button>}
        <input className="document-title" value={document.title} readOnly={isPublicLink} aria-readonly={isPublicLink} onChange={(e) => updateDocument((doc) => ({ ...doc, title: e.target.value }))} />
      </div>
      <div className="topbar-actions">
        {(!isPublicLink || visibleParticipants.length > 0) && <span className="topbar-presence" title={[...(!isPublicLink ? ["Christine"] : []), ...visibleParticipants.map((participant) => participant.name)].join(", ")} aria-label={`${visibleParticipants.length + 1} ${visibleParticipants.length ? "people" : "person"} currently here`}>
          {!isPublicLink && <span className="avatar topbar-avatar" style={{ background: participantAvatarColor("Christine") }}>CU</span>}
          {collaborationEnabled && visibleParticipants.slice(0, isPublicLink ? 3 : 2).map((participant, index) => <span key={participant.clientId} className={`avatar topbar-avatar is-${participant.role}`} style={{ background: participantAvatarColor(participant.clientId || participant.name, index + 1) }} aria-hidden="true"><UserCircle size={14} /></span>)}
        </span>}
        <span className="save-state"><span /> {publicView ? "View only" : isPublicLink ? `Guest · ${saveState}` : saveState}</span>
        <button className={`icon-button comments-toggle ${commentsOpen ? "active" : ""}`} aria-pressed={commentsOpen} aria-label={commentsOpen ? "Hide comments panel" : "Show comments panel"} title={commentsOpen ? "Hide comments panel" : "Show comments panel"} onClick={() => { setCommentsOpen((open) => !open); setExportOpen(false); setAnnotationsVisible(true); }}><ChatCircleDots size={19} />{commentItems.length > 0 && <span>{commentItems.length}</span>}</button>
        {!publicView && <button className={`secondary-button ${exportOpen ? "active" : ""}`} aria-expanded={exportOpen} onClick={() => { setExportOpen((open) => !open); setCommentsOpen(false); }}><DownloadSimple size={17} /> Export <CaretDown size={13} /></button>}
        {!isPublicLink && <button className="primary-button" onClick={() => setShareOpen(true)}><ShareNetwork size={17} /> Share</button>}
        {isPublicLink && <span className="public-pill"><ShareNetwork size={15} /> {publicView ? "Shared canvas" : "Guest editing"}</span>}
      </div>
    </header>

    <div className="editor-body">
      {!publicView && <aside className="left-toolbar" aria-label="Canvas tools">
        <PagesPanel pages={document.pages} activePageId={document.activePageId} open={pagesOpen} canManage onToggle={() => { setNodeMenu(false); setPagesOpen((value) => !value); }} onSwitch={switchPage} onAdd={addPage} onRename={renamePage} onDelete={deletePage} />
        <span />
        <button className={!pagesOpen && !nodeMenu && tool === "select" ? "active" : ""} title="Pointer · V" aria-label="Pointer tool" aria-keyshortcuts="V" onClick={() => { setPagesOpen(false); setNodeMenu(false); setTool("select"); }}><CursorClick size={21} /></button>
        <button className={!pagesOpen && !nodeMenu && tool === "hand" ? "active" : ""} title="Hand tool · H" aria-label="Hand tool" aria-keyshortcuts="H" onClick={() => { setPagesOpen(false); setNodeMenu(false); setTool("hand"); }}><Hand size={21} /></button>
        <span />
        <button className={!pagesOpen && !nodeMenu && tool === "connect" ? "active" : ""} title="Link nodes · L" aria-label="Link nodes" aria-keyshortcuts="L" onClick={() => { setPagesOpen(false); setNodeMenu(false); setTool("connect"); setConnectionSource(null); }}><LinkNodes size={21} /></button>
        <button className={!pagesOpen && !nodeMenu && tool === "pen" ? "active" : ""} title="Draw · D" aria-label="Draw with pen" aria-keyshortcuts="D" onClick={() => { setPagesOpen(false); setNodeMenu(false); setTool("pen"); setConnectionSource(null); }}><Pen size={21} /></button>
        <button className={!pagesOpen && !nodeMenu && tool === "annotate" ? "active" : ""} title="Annotate · A" aria-label="Add annotation" aria-keyshortcuts="A" onClick={() => { setPagesOpen(false); setNodeMenu(false); setTool("annotate"); setConnectionSource(null); }}><ChatCircleDots size={21} /></button>
        <div className="toolbar-popover-wrap">
          <button className={nodeMenu ? "active" : ""} title="Add node · N" aria-label="Add node" aria-keyshortcuts="N" onClick={() => { setPagesOpen(false); setNodeMenu(!nodeMenu); }}><Plus size={22} /></button>
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
        <button title="Add text · T" aria-label="Add text" aria-keyshortcuts="T" onClick={() => addTextNode()}><HeadingOne size={21} /></button>
        <button className={iconBrowserOpen ? "active" : ""} title="Add icon · I" aria-label="Add Heroicon" aria-keyshortcuts="I" onClick={() => { setPagesOpen(false); setNodeMenu(false); setIconBrowserOpen((open) => !open); }}><Cube size={21} /></button>
        <button title="Add arrow line · S" aria-label="Add arrow line" aria-keyshortcuts="S" onClick={addArrowShape}><ArrowLine size={21} /></button>
        <button title="Add picture · P" aria-label="Add picture from URL or file" aria-keyshortcuts="P" onClick={() => setImageSourceOpen(true)}><Photo size={21} /></button>
        <button title="Add link · K" aria-label="Add link" aria-keyshortcuts="K" onClick={() => setLinkOpen(true)}><LinkSimple size={21} /></button>
        <input ref={imageInputRef} className="visually-hidden-input" type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) { addImageFile(file); setImageSourceOpen(false); } event.target.value = ""; }} />
        <span />
        <button title="Delete selected" disabled={!selection.length && !edgeSelection.length && !drawingSelection.length} onClick={deleteSelection}><Trash size={20} /></button>
        <button title="Keyboard shortcuts · ?" aria-label="Keyboard shortcuts" aria-keyshortcuts="?" onClick={() => setShortcutsOpen(true)}><HelpCircle size={21} /></button>
      </aside>}
      {!publicView && iconBrowserOpen && <IconBrowser onSelect={addIconNode} onClose={() => setIconBrowserOpen(false)} />}
      {publicView && <aside className="left-toolbar public-annotation-toolbar" aria-label="Shared canvas tools">
        <PagesPanel pages={document.pages} activePageId={document.activePageId} open={pagesOpen} canManage={false} onToggle={() => setPagesOpen((value) => !value)} onSwitch={switchPage} />
        <span />
        <button className={!pagesOpen && tool === "select" ? "active" : ""} title="Pointer · V" aria-label="Pointer tool" aria-keyshortcuts="V" onClick={() => { setPagesOpen(false); setTool("select"); }}><CursorClick size={21} /></button>
        <button className={!pagesOpen && tool === "hand" ? "active" : ""} title="Hand tool · H" aria-label="Hand tool" aria-keyshortcuts="H" onClick={() => { setPagesOpen(false); setTool("hand"); }}><Hand size={21} /></button>
        <span />
        <button className={!pagesOpen && tool === "annotate" ? "active" : ""} title="Annotate · A" aria-label="Add annotation" aria-keyshortcuts="A" onClick={() => { setPagesOpen(false); setTool(tool === "annotate" ? "select" : "annotate"); }}><ChatCircleDots size={21} /></button>
        <button title="Keyboard shortcuts · ?" aria-label="Keyboard shortcuts" onClick={() => setShortcutsOpen(true)}><HelpCircle size={20} /></button>
      </aside>}

      <main ref={canvasRef} className={`canvas ${tool === "hand" || spaceHeld ? "is-panning" : ""} ${tool === "pen" ? "is-drawing" : ""} ${tool === "annotate" ? "is-annotating" : ""}`} onPointerDown={onCanvasPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} onWheel={onWheel} onDragOver={(event) => { if (Array.from(event.dataTransfer?.items || []).some((item) => item.type.startsWith("image/"))) event.preventDefault(); }} onDrop={(event) => { const file = Array.from(event.dataTransfer?.files || []).find((item) => item.type.startsWith("image/")); if (file) { event.preventDefault(); addImageFile(file, { x: event.clientX, y: event.clientY }); } }}>
        <div className="canvas-grid" style={{ backgroundPosition: `${pan.x}px ${pan.y}px`, backgroundSize: `${24 * zoom}px ${24 * zoom}px` }} />
        <div className="world" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
          <svg className="edge-layer" width="4000" height="2400" viewBox="-1000 -600 4000 2400">
            <defs><marker id="canvas-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 Z" /></marker><marker id="preview-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#5367ef" /></marker><marker id="canvas-circle" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto"><circle cx="4.5" cy="4.5" r="3.2" /></marker></defs>
            {connectionSource && connectionPreview && nodeMap[connectionSource.nodeId] && <path className="connection-preview" d={connectionPreviewPath(nodeMap[connectionSource.nodeId], connectionSource.port, connectionPreview)} markerEnd="url(#preview-arrow)" />}
            {reconnectPreview && (() => { const edge = document.edges.find((item) => item.id === reconnectPreview.edgeId); const source = edge && nodeMap[edge.source]; const target = edge && nodeMap[edge.target]; return edge && source && target ? <path className="connection-preview reconnect-preview" d={reconnectPreviewPath(edge, source, target, reconnectPreview.side, reconnectPreview.point)} markerEnd="url(#preview-arrow)" /> : null; })()}
            {document.edges.filter((edge) => (!edge.hidden && !collapsedNodeIds.has(edge.source) && !collapsedNodeIds.has(edge.target)) || vanishingEdgeIds.has(edge.id)).map((edge) => <CanvasEdge key={edge.id} edge={edge} source={nodeMap[edge.source]} target={nodeMap[edge.target]} selected={edgeSelection.includes(edge.id)} reconnecting={reconnectPreview?.edgeId === edge.id} panning={spaceHeld || tool === "hand" || tool === "pen"} hiding={edge.hidden} onSelect={() => { if (publicView) return; setEditingEdge(null); setEdgeToolbarMenu(null); setEdgeSelection([edge.id]); setDrawingSelection([]); setSelection([]); setConnectionSource(null); setTool("select"); }} onEdit={() => { if (publicView) return; setEdgeSelection([edge.id]); setEdgeToolbarMenu(null); setEditingEdge(edge.id); }} onReconnect={(side, event) => startReconnect(edge, side, event)} />)}
          </svg>
          <svg className="drawing-layer drawing-layer-back" width="4000" height="2400" viewBox="-1000 -600 4000 2400">
            {(document.drawings || []).filter((drawing) => drawing.stackLevel === "back").map((drawing) => <DrawingStroke key={drawing.id} drawing={drawing} selected={drawingSelection.includes(drawing.id)} passive={spaceHeld || tool !== "select"} onSelect={(event) => onDrawingPointerDown(event, drawing)} onContextMenu={(event) => openDrawingContextMenu(event, drawing)} />)}
          </svg>
          {document.nodes.filter((node) => !collapsedNodeIds.has(node.id) || vanishingNodeIds.has(node.id)).map((node) => <CanvasNode key={node.id} node={node} hiding={collapsedNodeIds.has(node.id)} hiddenConnectionCount={document.edges.filter((edge) => (edge.source === node.id || edge.target === node.id) && edge.hidden).length} onShowHidden={() => showHiddenConnections(node.id)} selected={selection.includes(node.id)} connecting={connectionSource?.nodeId === node.id} dropTarget={connectionTargetId === node.id} editing={editingNode === node.id} onEdit={() => { if (!publicView && !["image", "arrow", "icon"].includes(node.type)) { setNodeToolbarMenu(null); setEditingNode(node.id); } }} onSaveEdit={(patch) => { const fitted = node.type === "text" && node.textFit !== "free" ? fittedTextDimensions(patch.label, node.fontSize || 24) : {}; updateDocument((doc) => ({ ...doc, nodes: doc.nodes.map((item) => item.id === node.id ? { ...item, ...patch, ...fitted } : item) })); setEditingNode(null); }} onCancelEdit={() => setEditingNode(null)} onPointerDown={onNodePointerDown} onContextMenu={(event) => openNodeContextMenu(event, node)} onKeyDown={(event) => { if (!publicView && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); setSelection([node.id]); setEdgeSelection([]); setDrawingSelection([]); } }} />)}
          <svg className="drawing-layer" width="4000" height="2400" viewBox="-1000 -600 4000 2400">
            {(document.drawings || []).filter((drawing) => drawing.stackLevel !== "back").map((drawing) => <DrawingStroke key={drawing.id} drawing={drawing} selected={drawingSelection.includes(drawing.id)} passive={spaceHeld || tool !== "select"} onSelect={(event) => onDrawingPointerDown(event, drawing)} onContextMenu={(event) => openDrawingContextMenu(event, drawing)} />)}
            {draftDrawing && <DrawingStroke drawing={draftDrawing} passive />}
          </svg>
          {!publicView && marquee && <SelectionMarquee bounds={marquee} zoom={zoom} />}
          {!publicView && selectedBounds && <SelectionFrame bounds={selectedBounds} zoom={zoom} count={selection.length + drawingSelection.length} resizable={["image", "text", "icon", "arrow"].includes(selectedNode?.type) && rotationModeId !== selectedNode?.id} rotatable={selectedNode?.type === "arrow" && rotationModeId === selectedNode.id} rotation={selectedNode?.rotation || 0} resizeLabel={selectedNode?.type || "element"} onResizeStart={startElementResize} onRotateStart={startElementRotate} />}
          {annotationsVisible && (document.annotations || []).map((annotation) => <AnnotationMarker key={annotation.id} annotation={annotation} selected={annotation.id === selectedAnnotationId} draggable={canManageAnnotation(annotation.id)} onDragStart={(event) => startAnnotationDrag(annotation, event)} onSelect={() => { setSelectedAnnotationId(annotation.id); setSelection([]); setEdgeSelection([]); setDrawingSelection([]); }} />)}
        </div>
        {tool === "connect" && <div className="mode-toast"><LinkNodes size={16} /> {connectionSource ? "Choose a destination node" : "Choose a starting node"}</div>}
        {tool === "annotate" && !pendingAnnotation && <div className="mode-toast"><ChatCircleDots size={16} /> Click anywhere to add an annotation</div>}
        {rotationFeedback !== null && <div className="mode-toast rotation-mode-toast"><ArrowsClockwise size={16} /> Rotating arrow <strong>{rotationFeedback}°</strong></div>}
        {!publicView && (tool === "pen" || drawingSelection.length > 0) && <DrawingThicknessToolbar width={penWidth} color={penColor} streamline={penStreamline} mode={penMode} selectionCount={drawingSelection.length} onChange={changeDrawingWidth} onColorChange={changeDrawingColor} onStreamlineChange={changeDrawingStreamline} onModeChange={changeDrawingMode} onDelete={deleteSelection} />}
        {!publicView && selectedNode && !selectedNode.type && !editingNode && <NodeStyleToolbar node={selectedNode} style={nodeToolbarStyle} openMenu={nodeToolbarMenu} setOpenMenu={setNodeToolbarMenu} connectionCount={document.edges.filter((edge) => edge.source === selectedNode.id || edge.target === selectedNode.id).length} hiddenConnectionCount={document.edges.filter((edge) => (edge.source === selectedNode.id || edge.target === selectedNode.id) && edge.hidden).length} onHideConnections={() => { hideNodeConnections(selectedNode.id); setNodeToolbarMenu(null); }} onShowConnections={() => { showHiddenConnections(selectedNode.id); setNodeToolbarMenu(null); }} onChange={(patch) => updateDocument((doc) => ({ ...doc, nodes: doc.nodes.map((node) => node.id === selectedNode.id ? { ...node, ...patch } : node) }))} onDelete={deleteSelection} />}
        {!publicView && selectedNode?.type === "text" && !editingNode && <TextStyleToolbar node={selectedNode} style={nodeToolbarStyle} openMenu={nodeToolbarMenu} setOpenMenu={setNodeToolbarMenu} onChange={(patch) => updateDocument((doc) => ({ ...doc, nodes: doc.nodes.map((node) => node.id === selectedNode.id ? { ...node, ...patch } : node) }))} onDelete={deleteSelection} />}
        {!publicView && selectedNode?.type === "image" && <ImageStyleToolbar node={selectedNode} style={imageToolbarStyle} popoverPlacement={imageToolbarBelow ? "below" : "above"} openMenu={nodeToolbarMenu} setOpenMenu={setNodeToolbarMenu} onChange={(patch) => updateDocument((doc) => ({ ...doc, nodes: doc.nodes.map((node) => node.id === selectedNode.id ? { ...node, ...patch } : node) }))} onDelete={deleteSelection} />}
        {!publicView && selectedNode?.type === "icon" && <IconStyleToolbar node={selectedNode} style={nodeToolbarStyle} openMenu={nodeToolbarMenu} setOpenMenu={setNodeToolbarMenu} onChange={(patch) => updateDocument((doc) => ({ ...doc, nodes: doc.nodes.map((node) => node.id === selectedNode.id ? { ...node, ...patch } : node) }))} onDelete={deleteSelection} />}
        {!publicView && selectedNode?.type === "arrow" && <ArrowStyleToolbar node={selectedNode} style={nodeToolbarStyle} openMenu={nodeToolbarMenu} setOpenMenu={setNodeToolbarMenu} onChange={(patch) => updateDocument((doc) => ({ ...doc, nodes: doc.nodes.map((node) => node.id === selectedNode.id ? { ...node, ...patch } : node) }))} onDelete={deleteSelection} />}
        {!publicView && selectedEdge && selectedEdgeGeometry && !editingEdge && <EdgeStyleToolbar edge={selectedEdge} style={edgeToolbarStyle} openMenu={edgeToolbarMenu} setOpenMenu={setEdgeToolbarMenu} onEditLabel={() => { setEdgeToolbarMenu(null); setEditingEdge(selectedEdge.id); }} onChange={(patch) => updateDocument((doc) => ({ ...doc, edges: doc.edges.map((edge) => edge.id === selectedEdge.id ? { ...edge, ...patch } : edge) }))} onHide={hideSelectedConnection} onDelete={deleteSelection} />}
        {!publicView && selectedEdge && selectedEdgeScreenPoint && editingEdge === selectedEdge.id && <EdgeLabelEditor edge={selectedEdge} style={{ left: selectedEdgeScreenPoint.x, top: selectedEdgeScreenPoint.y }} onSave={(label) => { updateDocument((doc) => ({ ...doc, edges: doc.edges.map((edge) => edge.id === selectedEdge.id ? { ...edge, label } : edge) })); setEditingEdge(null); }} onCancel={() => setEditingEdge(null)} />}
        {annotationsVisible && selectedAnnotation && <AnnotationInspector floating style={annotationPanelStyle} annotation={selectedAnnotation} publicView={isPublicLink} canEdit={canManageAnnotation(selectedAnnotation.id)} canEditReply={(replyId) => canManageAnnotation(replyId)} onUpdate={(comment) => updateAnnotationComment(selectedAnnotation.id, comment)} onDelete={() => deleteAnnotation(selectedAnnotation.id)} onReply={(reply) => addAnnotationReply(selectedAnnotation.id, reply)} onUpdateReply={(replyId, comment) => mutateAnnotationReply(selectedAnnotation.id, replyId, "reply-update", comment)} onDeleteReply={(replyId) => mutateAnnotationReply(selectedAnnotation.id, replyId, "reply-delete")} onClose={() => setSelectedAnnotationId(null)} />}
        {pendingAnnotation && <AnnotationDialog publicView={isPublicLink} style={pendingAnnotationPanelStyle} onClose={() => setPendingAnnotation(null)} onAdd={addAnnotation} />}
        {contextMenu && <CanvasContextMenu
          menu={contextMenu}
          canGroup={(contextMenu.nodeIds.length + contextMenu.drawingIds.length) > 1}
          canUngroup={[...document.nodes, ...(document.drawings || [])].some((item) => item.groupId && [...contextMenu.nodeIds, ...contextMenu.drawingIds].includes(item.id))}
          canRotate={Boolean(contextMenu.rotateNodeId)}
          onGroup={() => groupSelection(contextMenu)}
          onUngroup={() => ungroupSelection(contextMenu)}
          onRotate={() => { setRotationModeId(contextMenu.rotateNodeId); setContextMenu(null); }}
          onDelete={() => { deleteSelection(); setContextMenu(null); }}
          onExport={(format) => { exportDiagram(format, "selected"); setContextMenu(null); }}
          onBack={() => changeStacking("back", contextMenu)}
          onFront={() => changeStacking("front", contextMenu)}
        />}
        <div className="canvas-floating-controls">
          {!publicView && <div className="undo-redo-controls" role="toolbar" aria-label="Undo and redo">
            <button aria-label="Undo" title="Undo · ⌘Z" disabled={!historyRef.current.past.length} onClick={() => applyHistory("undo")}><Undo2 size={18} /></button>
            <button aria-label="Redo" title="Redo · ⌘⇧Z" disabled={!historyRef.current.future.length} onClick={() => applyHistory("redo")}><Redo2 size={18} /></button>
          </div>}
          <div className="zoom-controls">
            {zoomMenuOpen && <div className="zoom-menu" role="menu" onPointerDown={(event) => event.stopPropagation()}>
              <button role="menuitem" onClick={zoomToContent}><span>Zoom to content</span><kbd>1</kbd></button>
              <button role="menuitem" disabled={!selectedBounds} onClick={() => zoomToBounds(selectedBounds)}><span>Zoom to selection</span><kbd>2</kbd></button>
              {[.5, .7, 1, 1.5, 2].map((value) => <button key={value} role="menuitem" className={Math.abs(zoom - value) < .01 ? "active" : ""} onClick={() => { zoomAtCenter(value); setZoomMenuOpen(false); }}><span>{Math.round(value * 100)}%</span><kbd>{value === .5 ? "5" : value === .7 ? "7" : value === 1 ? "0" : ""}</kbd></button>)}
            </div>}
            <button aria-label="Zoom out" title="Zoom out · ⌘−" onClick={() => zoomAtCenter(zoom - .1)}><MagnifyingGlassMinus size={18} /></button>
            <button className="zoom-value-button" aria-haspopup="menu" aria-expanded={zoomMenuOpen} onClick={() => setZoomMenuOpen((open) => !open)}>{Math.round(zoom * 100)}%</button>
            <button aria-label="Zoom in" title="Zoom in · ⌘+" onClick={() => zoomAtCenter(zoom + .1)}><MagnifyingGlassPlus size={18} /></button>
            <button title="Reset view" onClick={() => { setPan({ x: 80, y: 90 }); setZoom(.9); }}><ArrowsClockwise size={18} /></button>
          </div>
        </div>
        <div className="canvas-hint">D draws · Shift straightens · Hold Space + drag to pan</div>
        {feedback && <CanvasFeedback key={feedback.id} feedback={feedback} />}
        {mediaUpload && <MediaUploadStatus upload={mediaUpload} />}
      </main>

      {commentsOpen && <CommentsPanel comments={commentItems} onSelect={focusComment} onClose={() => setCommentsOpen(false)} />}
      {exportOpen && <ExportPanel scope={exportScope} setScope={setExportScope} hasSelection={selection.length > 0 || drawingSelection.length > 0} onClose={() => setExportOpen(false)} onExport={exportDiagram} />}
    </div>

    {shareOpen && <ShareDialog document={document} url={shareUrl} publishing={saveState === "Saving…"} ready={saveState === "Saved"} onToggle={toggleShare} onToggleGuestEditing={toggleGuestEditing} onClose={() => setShareOpen(false)} />}
    {imageSourceOpen && <ImageSourceDialog onClose={() => setImageSourceOpen(false)} onChooseFile={() => imageInputRef.current?.click()} onAddUrl={addImageUrl} />}
    {linkOpen && <LinkDialog onClose={() => setLinkOpen(false)} onAdd={(url) => { addLinkNode(url); setLinkOpen(false); }} />}
    {shortcutsOpen && <ShortcutsDialog onClose={() => setShortcutsOpen(false)} />}
    {guestWelcomeOpen && <GuestWelcomeModal accessMode={publicView ? "viewer" : "editor"} onClose={() => setGuestWelcomeOpen(false)} />}
  </div>;
}

function GifImageNode({ node }) {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [manualPlayback, setManualPlayback] = useState(null);
  const playing = manualPlayback === true || (manualPlayback === null && hovered);
  const captureFrame = useCallback(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image?.complete || !canvas) return;
    const width = image.naturalWidth || 1;
    const height = image.naturalHeight || 1;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);
  }, []);
  useEffect(() => { if (!playing) requestAnimationFrame(captureFrame); }, [captureFrame, playing]);
  return <span className={`image-node-viewport gif-node-viewport ${playing ? "is-playing" : "is-paused"}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <canvas ref={canvasRef} aria-hidden="true" />
    <img ref={imageRef} src={node.imageData} alt={node.label || "Canvas GIF"} draggable="false" onLoad={captureFrame} style={{ objectPosition: "50% 50%", transform: `scale(${node.cropZoom || 1})` }} />
    <button className="gif-playback-button" aria-label={playing ? "Pause GIF" : "Play GIF"} title={playing ? "Pause GIF" : "Play GIF"} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); if (playing) { captureFrame(); setManualPlayback(false); } else setManualPlayback(true); }}>{playing ? <Pause size={16} /> : <Play size={16} />}</button>
  </span>;
}

function LinkThumbnail({ node }) {
  return <img src={node.thumbnail} alt="" draggable="false" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={(event) => {
    const index = Number(event.currentTarget.dataset.fallbackIndex || 0);
    const fallback = (node.thumbnailFallbacks || [])[index];
    if (fallback) {
      event.currentTarget.dataset.fallbackIndex = String(index + 1);
      event.currentTarget.src = fallback;
      return;
    }
    event.currentTarget.style.display = "none";
  }} />;
}

function CanvasNode({ node, hiddenConnectionCount, onShowHidden, selected, connecting, dropTarget, editing, hiding, onEdit, onSaveEdit, onCancelEdit, onPointerDown, onContextMenu, onKeyDown }) {
  const tone = toneForNode(node);
  const shapeColors = accessibleShapeColors(tone.accent);
  const size = nodeDimensions(node);
  return <article className={`canvas-node ${node.type ? `node-type-${node.type}` : ""} ${node.isSvg ? "is-svg" : ""} ${node.cropAspect && node.cropAspect !== "original" ? "is-cropped" : ""} ${node.shape ? `shape-${node.shape}` : ""} ${selected ? "selected" : ""} ${connecting ? "connecting" : ""} ${dropTarget ? "connection-drop-target" : ""} ${editing ? "editing" : ""} ${hiding ? "is-vanishing" : ""}`} role="button" tabIndex="0" data-node-id={node.id} aria-label={`${node.label}. ${node.subtitle || ""}. Press Enter to select, then Tab to add a connected node.`} style={{ left: node.x, top: node.y, width: size.width, height: size.height, zIndex: node.stackLevel === "front" ? 12 : node.stackLevel === "back" ? 1 : undefined, transform: node.type === "arrow" ? `rotate(${node.rotation || 0}deg)` : undefined, "--node-accent": tone.accent, "--node-soft": tone.soft, "--shape-fill": tone.accent, "--shape-text": shapeColors.text, "--shape-muted": shapeColors.muted, "--text-size": `${node.fontSize || 24}px`, "--text-background": node.textBackground || "transparent", "--text-align": node.textAlign || "left" }} onPointerDown={(event) => onPointerDown(event, node)} onContextMenu={onContextMenu} onKeyDown={editing ? undefined : onKeyDown} onDoubleClick={(event) => { event.stopPropagation(); onEdit(); }}>
    {node.type === "image" && (node.isGif || node.mimeType === "image/gif" ? <GifImageNode node={node} /> : <span className="image-node-viewport"><img src={node.imageData} alt={node.label || "Canvas image"} draggable="false" style={{ objectPosition: "50% 50%", transform: `scale(${node.cropZoom || 1})` }} /></span>)}
    {node.type === "icon" && (() => { const HeroIcon = LucideIcons[node.iconName] || HeroOutlineIcons[node.iconName] || LucideIcons.SparklesIcon; return <HeroIcon className="standalone-icon" aria-hidden="true" />; })()}
    {node.type === "arrow" && (() => {
      const size = nodeDimensions(node);
      return <svg className={`arrow-shape ${node.lineStyle === "dashed" ? "dashed" : ""}`} viewBox={`0 0 ${size.width} ${size.height}`} aria-hidden="true" style={{ "--arrow-stroke": Math.max(2, size.height / 14.7) }}><line x1="4" y1={size.height / 2} x2={size.width - size.height * .36} y2={size.height / 2} /><polyline points={`${size.width - size.height * .68},${size.height * .18} ${size.width - size.height * .34},${size.height / 2} ${size.width - size.height * .68},${size.height * .82}`} /></svg>;
    })()}
    {editing ? <InlineNodeEditor node={node} onSave={onSaveEdit} onCancel={onCancelEdit} /> : <>
      {node.type === "text" && <span className="text-node-copy">{node.label}</span>}
      {node.type === "link" && <div className="link-card-content">
        <div className={`link-card-thumbnail ${node.thumbnailKind === "favicon" ? "is-favicon" : ""} ${node.mediaKind ? "is-media" : ""}`}><GlobeHemisphereWest size={30} />{node.embedUrl && !node.thumbnail ? <iframe src={node.embedUrl} title={`${node.label} preview`} loading="lazy" tabIndex="-1" /> : <LinkThumbnail node={node} />}{node.mediaKind && <span className="media-play"><Play size={14} /></span>}</div>
        <div className="link-card-copy"><strong>{node.label}</strong><small>{node.subtitle}</small><span>{node.domain}</span></div>
        <a href={node.linkUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${node.label}`} title="Open link" onPointerDown={(event) => event.stopPropagation()} onDoubleClick={(event) => event.stopPropagation()}><OpenExternal size={17} /></a>
      </div>}
      {!node.type && <><span className="node-icon"><IconForNode name={node.icon} /></span><span className="node-copy"><strong>{node.label}</strong><small>{node.subtitle}</small></span></>}
    </>}
    <i className="node-port left" data-port="left" aria-hidden="true" /><i className="node-port right" data-port="right" aria-hidden="true" />
    {node.shape === "decision" && <><i className="node-port top" data-port="top" aria-hidden="true" /><i className="node-port bottom" data-port="bottom" aria-hidden="true" /></>}
    {hiddenConnectionCount > 0 && <button className="hidden-connections-badge" aria-label={`Show ${hiddenConnectionCount} hidden ${hiddenConnectionCount === 1 ? "connection" : "connections"}`} title="Show hidden connections" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onShowHidden(); }}>+{hiddenConnectionCount}</button>}
  </article>;
}

function InlineNodeEditor({ node, onSave, onCancel }) {
  const [label, setLabel] = useState(node.label || "");
  const [subtitle, setSubtitle] = useState(node.subtitle || "");
  const [icon, setIcon] = useState(node.icon === "lightbulb" ? "brain" : node.icon);
  const suggestedIcon = recommendedIconFor(`${label} ${subtitle}`);
  const suggestedChoice = iconChoices.find((choice) => choice.id === suggestedIcon);
  const save = () => onSave({ label: label.trim() || "Untitled node", subtitle: subtitle.trim(), ...(!node.type ? { icon } : {}) });
  return <form className={`inline-node-editor ${node.type === "text" ? "text-only" : ""}`} onSubmit={(event) => { event.preventDefault(); save(); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) save(); }} onPointerDown={(event) => event.stopPropagation()} onDoubleClick={(event) => event.stopPropagation()}>
    {node.type === "text" ? <textarea autoFocus aria-label="Edit text" value={label} wrap="soft" onFocus={(event) => { if (node.textFit === "auto" && label === "Add text") event.currentTarget.select(); }} onChange={(event) => setLabel(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); onCancel(); } }} /> : <input autoFocus aria-label="Node title" value={label} onChange={(event) => setLabel(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); onCancel(); } }} />}
    {node.type !== "text" && <textarea aria-label="Node description" value={subtitle} placeholder="Add a description" rows="2" onChange={(event) => setSubtitle(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); onCancel(); } if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); save(); } }} />}
    {!node.type && label.trim().length >= 2 && suggestedIcon !== icon && <button type="button" className="inline-icon-suggestion" onClick={() => setIcon(suggestedIcon)} title={`Use ${suggestedChoice?.label || "suggested"} icon`}><IconForNode name={suggestedIcon} size={15} /><span>Suggested: {suggestedChoice?.label}</span></button>}
  </form>;
}

function AnnotationMarker({ annotation, selected, draggable, onDragStart, onSelect }) {
  return <button className={`annotation-marker ${selected ? "selected" : ""} ${draggable ? "draggable" : ""}`} style={{ left: annotation.x, top: annotation.y }} aria-label={`Annotation ${annotation.number}: ${annotation.comment}`} title={draggable ? `Annotation ${annotation.number} · drag to move` : `Annotation ${annotation.number}`} onPointerDown={(event) => { event.stopPropagation(); if (draggable) onDragStart(event); }} onClick={(event) => { event.stopPropagation(); onSelect(); }}><span>{annotation.number}</span></button>;
}

function formatCommentTime(date) {
  if (!date || Number.isNaN(date.valueOf())) return "Just now";
  const seconds = Math.max(0, Math.round((Date.now() - date.valueOf()) / 1000));
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return date.toLocaleDateString();
}

function resizeTextarea(event) {
  event.currentTarget.style.height = "auto";
  event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
}

function AnnotationInspector({ annotation, publicView, canEdit, canEditReply, onUpdate, onDelete, onReply, onUpdateReply, onDeleteReply, onClose, floating = false, style }) {
  const created = annotation.createdAt ? new Date(annotation.createdAt) : null;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(annotation.comment || "");
  const [reply, setReply] = useState("");
  const [replyAuthor, setReplyAuthor] = useState(publicView ? "Guest" : "Christine");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { setEditing(false); setDraft(annotation.comment || ""); setReply(""); setError(""); }, [annotation.id, annotation.comment]);
  const saveComment = async () => {
    if (!draft.trim()) { setError("A comment cannot be empty."); return; }
    setBusy(true); setError("");
    try { await onUpdate(draft.trim()); setEditing(false); }
    catch (saveError) { setError(saveError?.message || "The comment could not be updated."); }
    finally { setBusy(false); }
  };
  const submitReply = async () => {
    if (!reply.trim()) { setError("Write a reply first."); return; }
    setBusy(true); setError("");
    try { await onReply({ comment: reply.trim(), author: replyAuthor.trim() || "Guest" }); setReply(""); }
    catch (saveError) { setError(saveError?.message || "The reply could not be added."); }
    finally { setBusy(false); }
  };
  return <aside className={`inspector annotation-inspector ${floating ? "floating-annotation-panel" : ""}`} style={style} aria-label={`Annotation ${annotation.number}`} onPointerDown={(event) => event.stopPropagation()}>
    <div className="annotation-panel-header"><h2>Comment</h2><button className="icon-button compact-close" aria-label="Close comment panel" onClick={onClose}><X size={14} /></button></div>
    <article className="annotation-entry root-annotation-entry">
      <div className="annotation-author"><span>{String(annotation.author || "Guest").slice(0, 1).toUpperCase()}</span><div><strong>{annotation.author || "Guest"}</strong><small>{formatCommentTime(created)}{annotation.editedAt ? " · edited" : ""}</small></div></div>
      {editing ? <form className="annotation-edit-form" onSubmit={(event) => { event.preventDefault(); saveComment(); }}>
      <textarea autoFocus value={draft} maxLength="1000" aria-label="Edit annotation comment" onChange={(event) => { setDraft(event.target.value); setError(""); }} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); setDraft(annotation.comment || ""); setEditing(false); } }} />
      <div><button type="button" className="text-button" onClick={() => { setDraft(annotation.comment || ""); setEditing(false); }}>Cancel</button><button className="primary-button" disabled={busy || !draft.trim()}>Save</button></div>
      </form> : <p className="annotation-comment">{annotation.comment}</p>}
      {canEdit && !editing && <div className="annotation-owner-actions"><button className="icon-action" aria-label="Edit comment" title="Edit" onClick={() => setEditing(true)}><Pen size={14} /></button><button className="icon-action danger" aria-label="Delete comment" title="Delete" onClick={async () => { if (!window.confirm("Delete this annotation and all its replies?")) return; setBusy(true); try { await onDelete(); } catch (deleteError) { setError(deleteError?.message || "The annotation could not be deleted."); setBusy(false); } }} disabled={busy}><Trash size={14} /></button></div>}
    </article>
    <section className="annotation-thread" aria-label="Comment replies">
      {(annotation.replies || []).length ? <div className="reply-list">{annotation.replies.map((item) => <AnnotationReply key={item.id} reply={item} canEdit={canEditReply(item.id)} onUpdate={(comment) => onUpdateReply(item.id, comment)} onDelete={() => onDeleteReply(item.id)} />)}</div> : <p className="thread-empty">No replies yet.</p>}
      <form className="reply-form" onSubmit={(event) => { event.preventDefault(); submitReply(); }}>
        {publicView && <input value={replyAuthor} maxLength="80" aria-label="Your name" placeholder="Your name" onChange={(event) => setReplyAuthor(event.target.value)} />}
        <div className="reply-composer"><textarea rows="1" value={reply} maxLength="1000" aria-label="Reply to comment" placeholder="Reply" onInput={resizeTextarea} onChange={(event) => { setReply(event.target.value); setError(""); }} /><button className="primary-button" aria-label="Post reply" title="Post reply" disabled={busy || !reply.trim()}><ArrowUp size={16} /></button></div>
      </form>
    </section>
    {error && <p className="field-error" role="alert">{error}</p>}
    <p className="inspector-help">Drag your numbered annotation to reposition it. Press A to add another.</p>
  </aside>;
}

function AnnotationReply({ reply, canEdit, onUpdate, onDelete }) {
  const created = reply.createdAt ? new Date(reply.createdAt) : null;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(reply.comment || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { setDraft(reply.comment || ""); }, [reply.comment]);
  const save = async () => {
    if (!draft.trim()) { setError("A reply cannot be empty."); return; }
    setBusy(true); setError("");
    try { await onUpdate(draft.trim()); setEditing(false); }
    catch (saveError) { setError(saveError?.message || "The reply could not be updated."); }
    finally { setBusy(false); }
  };
  return <article className="annotation-reply annotation-entry">
    <div className="annotation-author"><span>{String(reply.author || "Guest").slice(0, 1).toUpperCase()}</span><div><strong>{reply.author || "Guest"}</strong><small>{formatCommentTime(created)}{reply.editedAt ? " · edited" : ""}</small></div></div>
    {editing ? <form onSubmit={(event) => { event.preventDefault(); save(); }}><textarea autoFocus value={draft} maxLength="1000" aria-label="Edit reply" onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); setDraft(reply.comment || ""); setEditing(false); } }} /><div className="reply-actions"><button type="button" className="text-button" onClick={() => setEditing(false)}>Cancel</button><button className="text-button" disabled={busy || !draft.trim()}>Save</button></div></form> : <p>{reply.comment}</p>}
    {canEdit && !editing && <div className="reply-actions"><button className="icon-action" aria-label="Edit reply" title="Edit" onClick={() => setEditing(true)}><Pen size={14} /></button><button className="icon-action danger" aria-label="Delete reply" title="Delete" disabled={busy} onClick={async () => { if (!window.confirm("Delete this reply?")) return; setBusy(true); try { await onDelete(); } catch (deleteError) { setError(deleteError?.message || "The reply could not be deleted."); setBusy(false); } }}><Trash size={14} /></button></div>}
    {error && <p className="field-error" role="alert">{error}</p>}
  </article>;
}

function AnnotationDialog({ publicView, onClose, onAdd, style }) {
  const [author, setAuthor] = useState(publicView ? "Guest" : "Christine");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useModalKeyboard(onClose);
  const submit = async () => {
    if (!comment.trim()) { setError("Add a comment for this annotation."); return; }
    setBusy(true);
    setError("");
    try { await onAdd({ comment: comment.trim(), author: author.trim() || "Guest" }); }
    catch (saveError) { setError(saveError?.message || "The comment could not be saved."); }
    finally { setBusy(false); }
  };
  return <form className="annotation-composer" style={style} role="dialog" aria-modal="false" aria-labelledby="annotation-dialog-title" onSubmit={(event) => { event.preventDefault(); submit(); }} onPointerDown={(event) => event.stopPropagation()}>
    <div className="annotation-panel-header"><h2 id="annotation-dialog-title">Comment</h2><button type="button" className="icon-button compact-close" aria-label="Close dialog" onClick={onClose}><X size={14} /></button></div>
    {publicView && <input className="annotation-name-input" value={author} maxLength="80" aria-label="Your name" placeholder="Your name" onChange={(event) => setAuthor(event.target.value)} />}
    <div className="annotation-add-composer"><textarea rows="1" autoFocus value={comment} maxLength="1000" placeholder="Add a comment" onInput={resizeTextarea} onChange={(event) => { setComment(event.target.value); setError(""); }} onKeyDown={(event) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); submit(); } }} /><button className="primary-button" aria-label="Add annotation" title="Add annotation" disabled={busy || !comment.trim()}><ArrowUp size={16} /></button></div>
    {error && <p className="field-error" role="alert">{error}</p>}
  </form>;
}

function PagesPanel({ pages, activePageId, open, canManage, onToggle, onSwitch, onAdd, onRename, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const activePage = pages.find((page) => page.id === activePageId) || pages[0];
  const beginRename = (page) => { setEditingId(page.id); setName(page.name); };
  const finishRename = () => { if (editingId && name.trim()) onRename(editingId, name); setEditingId(null); };
  return <div className="pages-control" onPointerDown={(event) => event.stopPropagation()}>
    {open && <section className="pages-popover" aria-label="Canvas pages">
      <div className="pages-heading"><div><strong>Pages</strong><span>{pages.length}</span></div>{canManage && <button aria-label="Add page" onClick={onAdd}><Plus size={16} /></button>}</div>
      <div className="pages-list">
        {pages.map((page, index) => <div key={page.id} className={`page-row ${page.id === activePageId ? "active" : ""}`}>
          {editingId === page.id ? <div className="page-select editing"><span>{index + 1}</span><input autoFocus value={name} maxLength="60" aria-label="Page name" onChange={(event) => setName(event.target.value)} onBlur={finishRename} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); finishRename(); } if (event.key === "Escape") { event.preventDefault(); setEditingId(null); } }} /></div> : <button className="page-select" onClick={() => onSwitch(page.id)} onDoubleClick={() => canManage && beginRename(page)}><span>{index + 1}</span><strong>{page.name}</strong></button>}
          {canManage && editingId !== page.id && <div className="page-actions"><button aria-label={`Rename ${page.name}`} onClick={() => beginRename(page)}><Pen size={13} /></button><button aria-label={`Delete ${page.name}`} disabled={pages.length === 1} onClick={() => { if (window.confirm(`Delete “${page.name}” and everything on it?`)) onDelete(page.id); }}><Trash size={13} /></button></div>}
        </div>)}
      </div>
    </section>}
    <button className={`pages-trigger ${open ? "active" : ""}`} aria-expanded={open} aria-label={`Pages · ${activePage?.name || "Page 1"}`} title={`Pages · ${activePage?.name || "Page 1"}`} onClick={onToggle}><FileText size={20} /><span>{activePage?.name || "Page 1"}</span><CaretDown size={12} /></button>
  </div>;
}

function CanvasEdge({ edge, source, target, selected, reconnecting, panning, hiding, onSelect, onEdit, onReconnect }) {
  if (!source || !target) return null;
  const geometry = edgeGeometry(edge, source, target);
  const markerFor = (shape) => shape === "arrow" ? "url(#canvas-arrow)" : shape === "circle" ? "url(#canvas-circle)" : undefined;
  return <g className={`canvas-edge ${edge.lineStyle === "dashed" ? "dashed" : ""} ${selected ? "selected" : ""} ${reconnecting ? "reconnecting" : ""} ${hiding ? "is-vanishing" : ""}`} onPointerDown={(event) => { if (panning) return; event.stopPropagation(); onSelect(); }} onDoubleClick={(event) => { if (panning) return; event.stopPropagation(); onEdit(); }}><path className="edge-hit" d={geometry.path} /><path className="edge-line" d={geometry.path} markerStart={markerFor(edgeEndpoint(edge, "start"))} markerEnd={markerFor(edgeEndpoint(edge, "end"))} /><text x={geometry.labelX} y={geometry.labelY} textAnchor="middle">{edge.label}</text>{selected && <>
    <circle className="edge-reconnect-handle" cx={geometry.startX} cy={geometry.startY} r="6" onPointerDown={(event) => { event.stopPropagation(); onReconnect("source", event); }}><title>Reconnect start node</title></circle>
    <circle className="edge-reconnect-handle" cx={geometry.endX} cy={geometry.endY} r="6" onPointerDown={(event) => { event.stopPropagation(); onReconnect("target", event); }}><title>Reconnect end node</title></circle>
  </>}</g>;
}

function DrawingStroke({ drawing, selected, passive, onSelect, onContextMenu }) {
  const centerPath = drawingPath(drawing.points);
  const outlinePath = perfectDrawingPath(drawing);
  const isHighlighter = drawing.mode === "highlighter";
  return <g className={`drawing-stroke ${selected ? "selected" : ""}`} onPointerDown={(event) => { if (passive || event.button === 2) return; event.stopPropagation(); onSelect?.(event); }} onContextMenu={onContextMenu}><path className="drawing-hit" d={centerPath} /><path className="drawing-line" d={outlinePath} style={{ fill: drawing.color || "#3f4652", mixBlendMode: isHighlighter ? "multiply" : undefined, opacity: isHighlighter ? 0.45 : 1 }} /></g>;
}

function CanvasContextMenu({ menu, canGroup, canUngroup, canRotate, onGroup, onUngroup, onRotate, onDelete, onExport, onBack, onFront }) {
  return <div className="canvas-context-menu" role="menu" style={{ left: menu.x, top: menu.y }} onPointerDown={(event) => event.stopPropagation()}>
    {canGroup && <button role="menuitem" onClick={onGroup}><span>Group selection</span><kbd>⌘ G</kbd></button>}
    {canUngroup && <button role="menuitem" onClick={onUngroup}><span>Ungroup</span><kbd>⇧⌘ G</kbd></button>}
    {canRotate && <button role="menuitem" onClick={onRotate}><span>Rotate arrow</span><ArrowsClockwise size={15} /></button>}
    <div className="context-menu-label">Export selected</div>
    <div className="context-export-row">{["jpg", "svg", "png", "gif"].map((format) => <button key={format} role="menuitem" onClick={() => onExport(format)}>{format.toUpperCase()}</button>)}</div>
    <button role="menuitem" onClick={onFront}><span>Bring to front</span><kbd>⌘ ]</kbd></button>
    <button role="menuitem" onClick={onBack}><span>Send to back</span><kbd>⌘ [</kbd></button>
    <button className="danger" role="menuitem" onClick={onDelete}><span>Delete</span><kbd>⌫</kbd></button>
  </div>;
}

function IconBrowser({ onSelect, onClose }) {
  const [query, setQuery] = useState("");
  const icons = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle ? HERO_ICON_ENTRIES.filter(([name]) => name.toLowerCase().includes(needle)) : HERO_ICON_ENTRIES;
  }, [query]);
  return <aside className="icon-browser" aria-label="Icon browser">
    <div className="icon-browser-head"><div><strong>Icons</strong><small>{icons.length} icons</small></div><button aria-label="Close icon browser" onClick={onClose}><X size={16} /></button></div>
    <label className="icon-browser-search"><MagnifyingGlassIcon width="16" /><input autoFocus value={query} placeholder="Search icons" onChange={(event) => setQuery(event.target.value)} /></label>
    <div className={`icon-grid ${query.trim() ? "is-filtered" : ""}`}>{icons.map(([name, HeroIcon]) => <button key={name} title={name.replace(/Icon$/, "").replace(/([a-z])([A-Z])/g, "$1 $2")} aria-label={`Add ${name}`} onClick={() => onSelect(name)}><HeroIcon width="21" /></button>)}</div>
    {!icons.length && <p className="icon-empty">No icons match “{query}”.</p>}
  </aside>;
}

function HeroIconReplacementPicker({ currentIcon, onSelect }) {
  const [query, setQuery] = useState("");
  const icons = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle ? HERO_ICON_ENTRIES.filter(([name]) => name.toLowerCase().includes(needle)) : HERO_ICON_ENTRIES;
  }, [query]);
  return <div className="icon-replacement-picker">
    <label className="icon-browser-search"><MagnifyingGlassIcon width="16" /><input autoFocus value={query} placeholder="Search icons" onChange={(event) => setQuery(event.target.value)} /></label>
    <div className="replacement-icon-grid">{icons.map(([name, HeroIcon]) => <button key={name} className={name === currentIcon ? "selected" : ""} title={name.replace(/Icon$/, "").replace(/([a-z])([A-Z])/g, "$1 $2")} aria-label={`Replace with ${name}`} onClick={() => onSelect(name)}><HeroIcon width="20" /></button>)}</div>
    {!icons.length && <p className="icon-empty">No icons match “{query}”.</p>}
  </div>;
}

function SelectionFrame({ bounds, zoom, count, resizable = false, rotatable = false, rotation = 0, resizeLabel = "element", onResizeStart, onRotateStart }) {
  const stroke = 2 / zoom;
  const handle = 10 / zoom;
  const handles = ["top-left", "top-right", "bottom-left", "bottom-right"];
  return <div className={`selection-frame ${resizable ? "resizable" : ""} ${rotatable ? "rotatable" : ""}`} aria-hidden={!resizable && !rotatable} style={{ left: bounds.x, top: bounds.y, width: bounds.width, height: bounds.height, borderWidth: stroke, transform: rotation ? `rotate(${rotation}deg)` : undefined, "--selection-handle": `${handle}px`, "--selection-offset": `${-handle / 2 - stroke / 2}px` }}>
    {handles.map((corner) => resizable || rotatable ? <button key={corner} type="button" className={`selection-handle ${corner}`} title={rotatable ? "Drag to rotate arrow" : undefined} aria-label={rotatable ? `Rotate arrow from ${corner.replace("-", " ")} corner` : `Resize ${resizeLabel} from ${corner.replace("-", " ")} corner`} onPointerDown={(event) => rotatable ? onRotateStart?.(corner, event) : onResizeStart?.(corner, event)} /> : <i key={corner} className={`selection-handle ${corner}`} />)}
    {count > 1 && <span className="selection-count" style={{ fontSize: `${10 / zoom}px`, height: `${22 / zoom}px`, padding: `0 ${7 / zoom}px`, top: `${-30 / zoom}px` }}>{count} selected</span>}
  </div>;
}

function SelectionMarquee({ bounds, zoom }) {
  return <div className="selection-marquee" aria-hidden="true" style={{ left: bounds.x, top: bounds.y, width: bounds.width, height: bounds.height, borderWidth: 1.5 / zoom }} />;
}

function CanvasFeedback({ feedback }) {
  const itemLabel = `${feedback.count} ${feedback.count === 1 ? "item" : "items"}`;
  const content = {
    copied: { icon: <Copy size={17} />, label: `${itemLabel} copied` },
    pasted: { icon: <Check size={17} />, label: `${itemLabel} pasted` },
    duplicated: { icon: <DocumentDuplicateIcon width="17" />, label: `${itemLabel} duplicated` },
    grouped: { icon: <Squares2X2Icon width="17" />, label: `${itemLabel} grouped` },
    ungrouped: { icon: <Squares2X2Icon width="17" />, label: `${itemLabel} ungrouped` },
    deleted: { icon: <Trash size={17} />, label: `${itemLabel} deleted` },
    imported: { icon: <FileText size={17} />, label: `${itemLabel} imported` },
    undo: { icon: <ArrowsClockwise size={17} />, label: "Change undone" },
    redo: { icon: <ArrowsClockwise size={17} />, label: "Change redone" },
  }[feedback.type];
  return <div className={`canvas-feedback-toast is-${feedback.type}`} role="status" aria-live="polite">{content.icon}<span>{content.label}</span></div>;
}

function MediaUploadStatus({ upload }) {
  return <div className={`media-upload-status ${upload.error ? "error" : ""}`} role="status" aria-live="polite">
    <span className="media-upload-spinner"><ArrowPathIcon width="18" /></span>
    <div><strong>{upload.status}</strong><small>{upload.name}</small><i><span style={{ width: `${upload.progress}%` }} /></i></div>
    <b>{upload.error ? "!" : `${upload.progress}%`}</b>
  </div>;
}

function PenToolIcon() {
  return <img src={penIcon} alt="" aria-hidden="true" draggable="false" />;
}

function HighlighterToolIcon() {
  return <img src={highlighterIcon} alt="" aria-hidden="true" draggable="false" />;
}

function DrawingThicknessToolbar({ width, color, streamline, mode = "pen", selectionCount, onChange, onColorChange, onStreamlineChange, onModeChange, onDelete }) {
  const colors = mode === "highlighter" ? ["#ffd84a", "#7ee787", "#7ec8e3", "#ff8fc7", "#c9a4f5"] : ["#3f4652", "#5367ef", "#e05252", "#2fa86f", "#d79524"];
  const minWidth = mode === "highlighter" ? 6 : 1.5;
  const maxWidth = mode === "highlighter" ? 24 : 7;
  return <div className="drawing-thickness-toolbar" role="toolbar" aria-label="Drawing style" onPointerDown={(event) => event.stopPropagation()}>
    <div className="drawing-mode-toggle">
      <button className={mode === "pen" ? "selected" : ""} aria-pressed={mode === "pen"} title="Pen" onClick={() => onModeChange && onModeChange("pen")}><PenToolIcon /></button>
      <button className={mode === "highlighter" ? "selected" : ""} aria-pressed={mode === "highlighter"} title="Highlighter" onClick={() => onModeChange && onModeChange("highlighter")}><HighlighterToolIcon /></button>
    </div>
    <div className="stroke-width-slider" title={`${width}px`}><input type="range" min={minWidth} max={maxWidth} step=".1" value={width} aria-label="Stroke width" onChange={(event) => onChange(Number(event.target.value))} /></div>
    <div className="drawing-color-options">{colors.map((value) => <button key={value} className={color === value ? "selected" : ""} aria-label={`Use ${value} ${mode === "highlighter" ? "highlighter" : "pen"} colour`} title={value} onClick={() => onColorChange(value)}><i style={{ background: value }} /></button>)}<label className="drawing-custom-color" title={`Custom ${mode === "highlighter" ? "highlighter" : "pen"} colour`} style={{ "--pen-color": color }}><Palette size={15} /><input aria-label={`Custom ${mode === "highlighter" ? "highlighter" : "pen"} colour`} type="color" value={color} onChange={(event) => onColorChange(event.target.value)} /></label></div>
    <label className="drawing-range">Streamline <span>{Math.round(streamline * 100)}%</span><input type="range" min="0" max="1" step=".05" value={streamline} style={rangeFillStyle(streamline, 0, 1)} onChange={(event) => onStreamlineChange(Number(event.target.value))} /></label>
    <button className="drawing-delete" disabled={!selectionCount} aria-label="Delete selected drawing" title={selectionCount ? "Delete selected drawing" : "Select a drawing to delete"} onClick={onDelete}><Trash size={17} /></button>
  </div>;
}

function NodeShapeIcon({ shape, size = 17 }) {
  if (shape === "process") return <CirclesFour size={size} />;
  if (shape === "decision") return <Check size={size} />;
  if (shape === "terminator") return <Flag size={size} />;
  if (shape === "data") return <Database size={size} />;
  return <Brain size={size} />;
}

function EndpointIcon({ shape, size = 18 }) {
  if (shape === "arrow") return <ArrowRight size={size} />;
  if (shape === "circle") return <StopCircle size={size} />;
  return <Minus size={size} />;
}

function EdgeStyleToolbar({ edge, style, openMenu, setOpenMenu, onEditLabel, onChange, onHide, onDelete }) {
  const toggleMenu = (menu) => setOpenMenu((current) => current === menu ? null : menu);
  const endpointMenu = (side) => {
    const value = edgeEndpoint(edge, side);
    return <div className="node-toolbar-item">
      <button className={`endpoint-trigger ${openMenu === side ? "active" : ""}`} aria-label={`Change ${side} endpoint. Current: ${value}`} title={`${side === "start" ? "Start" : "End"} point: ${value}`} aria-expanded={openMenu === side} onClick={() => toggleMenu(side)}><EndpointIcon shape={value} /><CaretDown size={11} /></button>
      {openMenu === side && <div className="node-toolbar-popover endpoint-popover"><strong>{side} point</strong><div className="endpoint-toolbar-options">{["none", "arrow", "circle"].map((shape) => <button key={shape} className={value === shape ? "selected" : ""} aria-label={`${shape} ${side} point`} title={shape} onClick={() => { onChange({ [side === "start" ? "startShape" : "endShape"]: shape, endpointStyle: null }); setOpenMenu(null); }}><EndpointIcon shape={shape} /></button>)}</div></div>}
    </div>;
  };
  return <div className="node-style-toolbar edge-style-toolbar" role="toolbar" aria-label="Selected connection styling" style={style} onPointerDown={(event) => event.stopPropagation()}>
    <button className="edge-label-button" aria-label="Edit connection label" title="Edit label" onClick={onEditLabel}><Pen size={17} /><span>{edge.label || "Add label"}</span></button>
    <span className="node-toolbar-divider" />
    <div className="node-toolbar-item">
      <button className={openMenu === "line" ? "active" : ""} aria-label="Change line style" aria-expanded={openMenu === "line"} onClick={() => toggleMenu("line")}><i className={`line-preview ${edge.lineStyle === "dashed" ? "dashed" : "solid"}`} /><CaretDown size={11} /></button>
      {openMenu === "line" && <div className="node-toolbar-popover line-style-popover"><strong>Line</strong><div className="line-toolbar-options"><button className={(edge.lineStyle || "solid") === "solid" ? "selected" : ""} onClick={() => { onChange({ lineStyle: "solid" }); setOpenMenu(null); }}><i className="line-preview solid" />Solid</button><button className={edge.lineStyle === "dashed" ? "selected" : ""} onClick={() => { onChange({ lineStyle: "dashed" }); setOpenMenu(null); }}><i className="line-preview dashed" />Dashed</button></div></div>}
    </div>
    <span className="node-toolbar-divider" />
    {endpointMenu("start")}
    <span className="node-toolbar-divider" />
    {endpointMenu("end")}
    <span className="node-toolbar-divider" />
    <button aria-label="Hide connection" title="Hide connection" onClick={onHide}><EyeSlash size={17} /></button>
    <button className="toolbar-delete" aria-label="Delete connection" title="Delete connection" onClick={onDelete}><Trash size={17} /></button>
  </div>;
}

function EdgeLabelEditor({ edge, style, onSave, onCancel }) {
  const [label, setLabel] = useState(edge.label || "");
  const save = () => onSave(label.trim());
  return <form className="edge-label-editor" style={style} onSubmit={(event) => { event.preventDefault(); save(); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) save(); }} onPointerDown={(event) => event.stopPropagation()}>
    <input autoFocus aria-label="Connection label" value={label} placeholder="Add label" onChange={(event) => setLabel(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); onCancel(); } }} />
  </form>;
}

function TextStyleToolbar({ node, style, openMenu, setOpenMenu, onChange, onDelete }) {
  const tone = toneForNode(node);
  const backgrounds = [["#ffffff", "White"], ["#111318", "Black"], ["#fff3c4", "Yellow"], ["#eafafb", "Aqua"], ["#eef1ff", "Blue"], ["#f3efff", "Violet"]];
  return <div className="node-style-toolbar text-style-toolbar" style={style} role="toolbar" aria-label="Text formatting" onPointerDown={(event) => event.stopPropagation()}>
    <div className="node-toolbar-item"><button aria-label="Change text colour" className={openMenu === "text-colour" ? "active" : ""} onClick={() => setOpenMenu(openMenu === "text-colour" ? null : "text-colour")}><span className="toolbar-colour-dot" style={{ background: tone.accent }} /><CaretDown size={11} /></button>{openMenu === "text-colour" && <div className="node-toolbar-popover colour-popover"><ColorControl node={node} tone={tone} onChange={onChange} /></div>}</div>
    <span className="node-toolbar-divider" />
    {[["left", TextBlock], ["center", TextAlignCenter], ["right", TextAlignRight]].map(([alignment, AlignmentIcon]) => <button key={alignment} className={(node.textAlign || "left") === alignment ? "active" : ""} aria-label={`Align text ${alignment}`} title={`${alignment[0].toUpperCase()}${alignment.slice(1)} align`} onClick={() => onChange({ textAlign: alignment })}><AlignmentIcon size={17} /></button>)}
    <span className="node-toolbar-divider" />
    {[16, 24, 36].map((size) => <button key={size} className={(node.fontSize || 24) === size ? "active" : ""} aria-label={`${size === 16 ? "Small" : size === 24 ? "Medium" : "Large"} text`} onClick={() => onChange({ fontSize: size })}>{size === 16 ? "S" : size === 24 ? "M" : "L"}</button>)}
    <span className="node-toolbar-divider" />
    <button aria-label="Auto width" title="Fit width to text" onClick={() => onChange({ width: null })}>Auto W</button>
    <button aria-label="Auto height" title="Fit height to wrapped text" onClick={() => onChange({ height: null })}>Auto H</button>
    <span className="node-toolbar-divider" />
    <div className="node-toolbar-item"><button aria-label="Change text background" className={openMenu === "text-background" ? "active" : ""} onClick={() => setOpenMenu(openMenu === "text-background" ? null : "text-background")}><Palette size={17} /><CaretDown size={11} /></button>{openMenu === "text-background" && <div className="node-toolbar-popover colour-popover text-background-popover"><strong>Background</strong><div className="background-options"><button className={!node.textBackground ? "selected transparent-swatch" : "transparent-swatch"} aria-label="Transparent background" onClick={() => { onChange({ textBackground: null }); setOpenMenu(null); }} />{backgrounds.map(([value, label]) => <button key={value} className={node.textBackground?.toLowerCase() === value ? "selected" : ""} style={{ background: value }} aria-label={`${label} background`} title={label} onClick={() => { onChange({ textBackground: value }); setOpenMenu(null); }} />)}<label className="custom-background" title="Custom background"><Palette size={15} /><input type="color" aria-label="Custom text background" value={node.textBackground || "#ffffff"} onChange={(event) => onChange({ textBackground: event.target.value })} /></label></div></div>}</div>
    <span className="node-toolbar-divider" />
    <button className="toolbar-delete" aria-label="Delete text" onClick={onDelete}><Trash size={17} /></button>
  </div>;
}

function ImageStyleToolbar({ node, style, popoverPlacement, openMenu, setOpenMenu, onChange, onDelete }) {
  const toggle = (menu) => setOpenMenu((current) => current === menu ? null : menu);
  return <div className={`node-style-toolbar image-style-toolbar popovers-${popoverPlacement}`} style={style} role="toolbar" aria-label="Image formatting" onPointerDown={(event) => event.stopPropagation()}>
    <div className="node-toolbar-item"><button className={openMenu === "image-details" ? "active" : ""} aria-label="Image details" onClick={() => toggle("image-details")}><Photo size={18} /><CaretDown size={11} /></button>{openMenu === "image-details" && <div className="node-toolbar-popover image-details-popover"><strong>Image</strong><label>Alternative text<input value={node.label || ""} onChange={(event) => onChange({ label: event.target.value })} /></label><label>Width <span>{node.width || 280}px</span><input type="range" min="120" max="900" step="10" value={node.width || 280} style={rangeFillStyle(node.width || 280, 120, 900)} onChange={(event) => onChange({ width: Number(event.target.value) })} /></label>{node.isSvg && <p>SVG · transparent vector</p>}</div>}</div>
    <span className="node-toolbar-divider" />
    <div className="node-toolbar-item"><button className={openMenu === "crop" ? "active" : ""} aria-label="Crop image" onClick={() => toggle("crop")}><Viewfinder size={18} /><span>Crop</span></button>{openMenu === "crop" && <div className="node-toolbar-popover crop-popover"><strong>Crop image</strong><div className="crop-aspects">{[["original", "Original"], ["square", "1:1"], ["4:3", "4:3"], ["16:9", "16:9"]].map(([value, label]) => <button key={value} className={(node.cropAspect || "original") === value ? "selected" : ""} onClick={() => onChange({ cropAspect: value })}>{label}</button>)}</div><label>Zoom <span>{Math.round((node.cropZoom || 1) * 100)}%</span><input type="range" min="1" max="3" step=".05" value={node.cropZoom || 1} style={rangeFillStyle(node.cropZoom || 1, 1, 3)} onChange={(event) => onChange({ cropZoom: Number(event.target.value) })} /></label><button className="crop-reset" onClick={() => onChange({ cropAspect: "original", cropZoom: 1 })}>Reset crop</button></div>}</div>
    <span className="node-toolbar-divider" />
    <button className="toolbar-delete" aria-label="Delete image" onClick={onDelete}><Trash size={17} /></button>
  </div>;
}

function IconStyleToolbar({ node, style, openMenu, setOpenMenu, onChange, onDelete }) {
  const tone = toneForNode(node);
  const CurrentIcon = LucideIcons[node.iconName] || HeroOutlineIcons[node.iconName] || CubeIcon;
  const toggle = (menu) => setOpenMenu((current) => current === menu ? null : menu);
  return <div className="node-style-toolbar icon-style-toolbar" style={style} role="toolbar" aria-label="Icon formatting" onPointerDown={(event) => event.stopPropagation()}>
    <div className="node-toolbar-item"><button className={openMenu === "icon-colour" ? "active" : ""} aria-label="Icon colour" onClick={() => toggle("icon-colour")}><span className="toolbar-colour-dot" style={{ background: tone.accent }} /><CaretDown size={11} /></button>{openMenu === "icon-colour" && <div className="node-toolbar-popover colour-popover"><ColorControl node={node} tone={tone} onChange={onChange} /></div>}</div>
    <span className="node-toolbar-divider" />
    <div className="node-toolbar-item"><button className={openMenu === "icon-replace" ? "active" : ""} aria-label="Replace icon" onClick={() => toggle("icon-replace")}><CurrentIcon width="17" /><CaretDown size={11} /></button>{openMenu === "icon-replace" && <div className="node-toolbar-popover icon-replace-popover"><HeroIconReplacementPicker currentIcon={node.iconName} onSelect={(iconName) => { onChange({ iconName }); setOpenMenu(null); }} /></div>}</div>
    <span className="node-toolbar-divider" />
    <button className="toolbar-delete" aria-label="Delete icon" onClick={onDelete}><Trash size={17} /></button>
  </div>;
}

function ArrowStyleToolbar({ node, style, openMenu, setOpenMenu, onChange, onDelete }) {
  const tone = toneForNode(node);
  const toggle = (menu) => setOpenMenu((current) => current === menu ? null : menu);
  return <div className="node-style-toolbar arrow-style-toolbar" style={style} role="toolbar" aria-label="Arrow line formatting" onPointerDown={(event) => event.stopPropagation()}>
    <div className="node-toolbar-item"><button className={openMenu === "arrow-colour" ? "active" : ""} aria-label="Arrow colour" onClick={() => toggle("arrow-colour")}><span className="toolbar-colour-dot" style={{ background: tone.accent }} /><CaretDown size={11} /></button>{openMenu === "arrow-colour" && <div className="node-toolbar-popover colour-popover"><ColorControl node={node} tone={tone} onChange={onChange} /></div>}</div>
    <span className="node-toolbar-divider" />
    <div className="node-toolbar-item"><button className={openMenu === "arrow-line" ? "active" : ""} aria-label="Arrow line style" onClick={() => toggle("arrow-line")}><i className={`line-preview ${node.lineStyle === "dashed" ? "dashed" : "solid"}`} /><CaretDown size={11} /></button>{openMenu === "arrow-line" && <div className="node-toolbar-popover line-style-popover"><strong>Line</strong><div className="line-toolbar-options"><button className={(node.lineStyle || "solid") === "solid" ? "selected" : ""} onClick={() => { onChange({ lineStyle: "solid" }); setOpenMenu(null); }}><i className="line-preview solid" />Solid</button><button className={node.lineStyle === "dashed" ? "selected" : ""} onClick={() => { onChange({ lineStyle: "dashed" }); setOpenMenu(null); }}><i className="line-preview dashed" />Dashed</button></div></div>}</div>
    <span className="node-toolbar-divider" />
    <button className="toolbar-delete" aria-label="Delete arrow" onClick={onDelete}><Trash size={17} /></button>
  </div>;
}

function IconPicker({ node, onSelect }) {
  const [query, setQuery] = useState("");
  const normalizedIcon = node.icon === "lightbulb" ? "brain" : node.icon;
  const suggestedIcon = recommendedIconFor(`${node.label || ""} ${node.subtitle || ""}`);
  const suggestedChoice = iconChoices.find((choice) => choice.id === suggestedIcon);
  const visibleIcons = iconChoices.filter((choice) => `${choice.label} ${choice.id}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <button type="button" className={`icon-suggestion ${normalizedIcon === suggestedIcon ? "selected" : ""}`} onClick={() => onSelect(suggestedIcon)}><IconForNode name={suggestedIcon} size={17} /><span><small>Suggested for this node</small><strong>{suggestedChoice?.label}</strong></span></button>
    <input className="icon-search" type="search" value={query} placeholder="Search icons" aria-label="Search icons" onChange={(event) => setQuery(event.target.value)} />
    <div className="icon-options">{visibleIcons.map((choice) => <button key={choice.id} className={normalizedIcon === choice.id ? "selected" : ""} aria-label={choice.label} title={choice.label} onClick={() => onSelect(choice.id)}><IconForNode name={choice.id} size={18} /></button>)}</div>
    {!visibleIcons.length && <p className="icon-empty">No matching icons</p>}
  </>;
}

function NodeStyleToolbar({ node, style, openMenu, setOpenMenu, connectionCount, hiddenConnectionCount, onHideConnections, onShowConnections, onChange, onDelete }) {
  const tone = toneForNode(node);
  const shapeLabel = { process: "Process", decision: "Decision", terminator: "Start / End", data: "Input / Output" }[node.shape] || "Card";
  const toggleMenu = (menu) => setOpenMenu((current) => current === menu ? null : menu);
  return <div className="node-style-toolbar" role="toolbar" aria-label="Selected node styling" style={style} onPointerDown={(event) => event.stopPropagation()}>
    <div className="node-toolbar-item">
      <button className={openMenu === "colour" ? "active" : ""} aria-label="Change node colour" aria-expanded={openMenu === "colour"} onClick={() => toggleMenu("colour")}><i className="toolbar-colour-dot" style={{ background: tone.accent }} /><CaretDown size={11} /></button>
      {openMenu === "colour" && <div className="node-toolbar-popover colour-popover"><div className="color-options">{Object.keys(palette).map((color) => <button key={color} aria-label={`Use ${color}`} className={!node.customColor && node.color === color ? "selected" : ""} style={{ background: palette[color].accent }} onClick={() => { onChange({ color, customColor: null }); setOpenMenu(null); }} />)}<span className={`custom-color ${node.customColor ? "selected" : ""}`} title="Choose a custom colour" style={{ "--custom-color": node.customColor || tone.accent }}><Palette size={15} /><input aria-label="Custom colour" type="color" value={node.customColor || tone.accent} onChange={(event) => onChange({ color: "custom", customColor: event.target.value })} /></span></div></div>}
    </div>
    <span className="node-toolbar-divider" />
    <div className="node-toolbar-item">
      <button className={`toolbar-labelled ${openMenu === "shape" ? "active" : ""}`} aria-label="Change node shape" aria-expanded={openMenu === "shape"} onClick={() => toggleMenu("shape")}><NodeShapeIcon shape={node.shape} /><span>{shapeLabel}</span><CaretDown size={11} /></button>
      {openMenu === "shape" && <div className="node-toolbar-popover shape-popover"><strong>Shape</strong><div className="shape-options">{[[null, "Card"], ["process", "Process"], ["decision", "Decision"], ["terminator", "Start / End"], ["data", "Input / Output"]].map(([shape, label]) => <button key={label} className={(node.shape || null) === shape ? "selected" : ""} onClick={() => { onChange({ shape }); setOpenMenu(null); }}><NodeShapeIcon shape={shape} size={16} /><span>{label}</span></button>)}</div></div>}
    </div>
    <span className="node-toolbar-divider" />
    <div className="node-toolbar-item">
      <button className={openMenu === "icon" ? "active" : ""} aria-label="Change node icon" aria-expanded={openMenu === "icon"} onClick={() => toggleMenu("icon")}><IconForNode name={node.icon} size={18} /><CaretDown size={11} /></button>
      {openMenu === "icon" && <div className="node-toolbar-popover icon-popover"><strong>Icon</strong><IconPicker node={node} onSelect={(icon) => { onChange({ icon }); setOpenMenu(null); }} /></div>}
    </div>
    {connectionCount > 0 && <><span className="node-toolbar-divider" /><div className="node-toolbar-item">
      <button className={openMenu === "connections" ? "active" : ""} aria-label={`${connectionCount} node connections`} aria-expanded={openMenu === "connections"} onClick={() => toggleMenu("connections")}><LinkNodes size={18} /><span className="toolbar-count">{connectionCount}</span></button>
      {openMenu === "connections" && <div className="node-toolbar-popover connections-popover"><div className="popover-heading"><strong>Connections</strong><span>{connectionCount}</span></div><p>{connectionCount - hiddenConnectionCount} visible · {hiddenConnectionCount} hidden</p><div className="popover-actions"><button disabled={connectionCount - hiddenConnectionCount === 0} onClick={onHideConnections}>Hide all</button><button disabled={hiddenConnectionCount === 0} onClick={onShowConnections}>Show all</button></div></div>}
    </div><button className="toolbar-visibility" disabled={connectionCount - hiddenConnectionCount === 0} aria-label="Hide connected nodes and descendant branches" title="Hide connected branch" onClick={onHideConnections}><EyeSlash size={17} /></button></>}
    <span className="node-toolbar-divider" />
    <button className="toolbar-delete" aria-label="Delete selected node" title="Delete node" onClick={onDelete}><Trash size={17} /></button>
  </div>;
}

function NodeInspector({ node, onChange, connectionCount, hiddenConnectionCount, onHideConnections, onShowConnections }) {
  if (!node) return null;
  const tone = toneForNode(node);
  const connectionControls = <NodeConnectionsControl count={connectionCount} hiddenCount={hiddenConnectionCount} onHide={onHideConnections} onShow={onShowConnections} />;
  if (node.type === "image") return <aside className="inspector">
    <div className="inspector-heading"><div><p className="eyebrow">Selected image</p><h2>Screenshot</h2></div><span className="inspector-node-icon" style={{ "--node-accent": "#5367ef", "--node-soft": "#edf0ff" }}><Photo size={20} /></span></div>
    <label>Alternative text<input value={node.label || ""} onChange={(event) => onChange({ label: event.target.value })} placeholder="Describe this image" /></label>
    <div className="inspector-field"><span>Width</span><input className="size-range" type="range" min="180" max="640" step="10" value={node.width || 280} style={rangeFillStyle(node.width || 280, 180, 640)} onChange={(event) => onChange({ width: Number(event.target.value), height: null })} /><small>{node.width || 280}px</small></div>
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
    <div className="inspector-field"><span>Icon</span><div className="icon-options">{iconChoices.map((choice) => <button key={choice.id} className={(node.icon === "lightbulb" ? "brain" : node.icon) === choice.id ? "selected" : ""} aria-label={choice.label} title={choice.label} onClick={() => onChange({ icon: choice.id })}><IconForNode name={choice.id} size={18} /></button>)}</div></div>
    {connectionControls}
    <p className="inspector-help">Double-click a node for quick editing. Use the link tool to connect it to another node.</p>
  </aside>;
}

function NodeConnectionsControl({ count, hiddenCount, onHide, onShow }) {
  if (count < 2) return null;
  const visibleCount = count - hiddenCount;
  return <div className="node-connections-control"><div><span>Connections</span><strong>{count}</strong></div><p>{visibleCount} visible · {hiddenCount} hidden</p><div className="choice-segments"><button disabled={visibleCount === 0} onClick={onHide}>Hide all</button><button disabled={hiddenCount === 0} onClick={onShow}>Show all</button></div></div>;
}

function ImageSourceDialog({ onClose, onChooseFile, onAddUrl }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const addUrl = async () => {
    if (!url.trim()) { setError("Enter an image URL."); return; }
    setBusy(true);
    setError("");
    try {
      await onAddUrl(url.trim());
      onClose();
    } catch (addError) {
      setError(addError instanceof Error ? addError.message : "MyMind could not load that image.");
    } finally {
      setBusy(false);
    }
  };
  useModalKeyboard(onClose, addUrl);
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <form className="modal compact-modal image-source-modal" role="dialog" aria-modal="true" aria-labelledby="image-source-title" onSubmit={(event) => { event.preventDefault(); addUrl(); }} onMouseDown={(event) => event.stopPropagation()}>
      <div className="modal-header"><h2 id="image-source-title">Add a picture</h2><button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={19} /></button></div>
      <button type="button" className="image-upload-choice" onClick={onChooseFile}><Photo size={21} /><span><strong>Upload from device</strong><small>PNG, JPG, GIF, WebP, or SVG</small></span></button>
      <div className="image-source-divider"><span>or use a URL</span></div>
      <label>Image URL<input autoFocus type="url" inputMode="url" value={url} placeholder="https://example.com/image.png" aria-invalid={Boolean(error)} onChange={(event) => { setUrl(event.target.value); setError(""); }} /></label>
      {error && <p className="field-error" role="alert">{error}</p>}
      <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={busy || !url.trim()}><LinkSimple size={16} /> {busy ? "Loading…" : "Add from URL"}</button></div>
    </form>
  </div>;
}

function ColorControl({ node, tone, onChange }) {
  const neutralColors = node.type === "text" ? [["#ffffff", "white"], ["#111318", "black"]] : [];
  const isPresetNeutral = neutralColors.some(([value]) => value === node.customColor?.toLowerCase());
  return <div className="inspector-field"><span>Colour</span><div className="color-options">{Object.keys(palette).map((color) => <button key={color} aria-label={`Use ${color}`} className={!node.customColor && node.color === color ? "selected" : ""} style={{ background: palette[color].accent }} onClick={() => onChange({ color, customColor: null })} />)}{neutralColors.map(([value, label]) => <button key={value} aria-label={`Use ${label}`} title={label} className={node.customColor?.toLowerCase() === value ? "selected" : ""} style={{ background: value }} onClick={() => onChange({ color: "custom", customColor: value })} />)}<span className={`custom-color ${node.customColor && !isPresetNeutral ? "selected" : ""}`} title="Choose a custom colour" style={{ "--custom-color": node.customColor || tone.accent }}><Palette size={15} weight="bold" /><input aria-label="Custom colour" type="color" value={node.customColor || tone.accent} onChange={(event) => onChange({ color: "custom", customColor: event.target.value })} /></span></div></div>;
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
    <p className="inspector-help">Hidden connections collapse their connected node cards too. Select the count on the remaining node to restore the cards and paths.</p>
  </aside>;
}

function EndpointControl({ label, value, onChange }) {
  return <div className="inspector-field"><span>{label}</span><div className="choice-segments endpoint-segments">{["none", "arrow", "circle"].map((shape) => <button key={shape} className={value === shape ? "selected" : ""} aria-label={`${shape} ${label.toLowerCase()}`} title={shape} onClick={() => onChange(shape)}><EndpointIcon shape={shape} /></button>)}</div></div>;
}

function LinkDialog({ onClose, onAdd }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const submit = () => {
    const url = normaliseLinkUrl(value);
    if (!url) { setError("Enter a valid website address."); return; }
    onAdd(url);
  };
  useModalKeyboard(onClose, submit);
  return <div className="modal-backdrop" onMouseDown={onClose}><form className="modal compact-modal link-modal" role="dialog" aria-modal="true" aria-labelledby="link-dialog-title" onSubmit={(event) => { event.preventDefault(); submit(); }} onMouseDown={(event) => event.stopPropagation()}>
    <div className="modal-header"><h2 id="link-dialog-title">Add a link</h2><button type="button" className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={19} /></button></div>
    <label>Website URL<input autoFocus type="url" inputMode="url" value={value} placeholder="https://example.com" aria-invalid={!!error} onChange={(event) => { setValue(event.target.value); setError(""); }} /></label>
    {error && <p className="field-error" role="alert">{error}</p>}
    <p className="dialog-note">MyMind will add the page title, description, and available preview image.</p>
    <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button"><LinkSimple size={16} /> Add link</button></div>
  </form></div>;
}

function CommandPalette({ commands, onClose }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  useModalKeyboard(onClose);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle ? commands.filter((command) => command.label.toLowerCase().includes(needle)) : commands;
  }, [commands, query]);
  useEffect(() => { setActiveIndex(0); }, [results.length, query]);
  const run = (command) => {
    if (!command) return;
    onClose();
    command.run();
  };
  return <div className="popover-backdrop command-palette-backdrop" onMouseDown={onClose}>
    <div className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(event) => event.stopPropagation()}>
      <label className="command-palette-search">
        <MagnifyingGlass size={22} />
        <input ref={inputRef} value={query} placeholder="Search command" aria-label="Search command" autoComplete="off" onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => {
          if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, results.length - 1)); }
          else if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)); }
          else if (event.key === "Enter") { event.preventDefault(); run(results[activeIndex]); }
        }} />
      </label>
      {results.length > 0 && <div className="command-palette-results" role="listbox">
        {results.map((command, index) => <button key={command.id} type="button" role="option" aria-selected={index === activeIndex} className={index === activeIndex ? "active" : ""} onMouseEnter={() => setActiveIndex(index)} onClick={() => run(command)}>
          <command.icon size={17} />
          <span>{command.label}</span>
          {command.shortcut && <kbd>{command.shortcut}</kbd>}
        </button>)}
      </div>}
      {!results.length && <p className="command-palette-empty">No matching commands</p>}
    </div>
  </div>;
}

function ShortcutsDialog({ onClose }) {
  useModalKeyboard(onClose, onClose);
  const shortcuts = [
    ["V", "Pointer / select tool"],
    ["H", "Hand / canvas pan tool"],
    ["L", "Link nodes"],
    ["N", "Add a node"],
    ["T", "Add a text block"],
    ["I", "Open the Heroicons browser"],
    ["P", "Upload a picture"],
    ["S", "Add a basic arrow line"],
    ["K", "Add a website link"],
    ["D", "Draw with the pen tool"],
    ["A", "Add a numbered canvas annotation"],
    ["⌘ / Ctrl + Z", "Undo"],
    ["⇧⌘ Z / Ctrl + Y", "Redo"],
    ["⌘ / Ctrl + X", "Redo (MyMind shortcut)"],
    ["⌘ / Ctrl + D", "Duplicate selected canvas elements"],
    ["⌘ / Ctrl + G", "Group selected elements"],
    ["⇧⌘ / Ctrl + G", "Ungroup selected elements"],
    ["⌘ / Ctrl + +", "Zoom in around the canvas centre"],
    ["⌘ / Ctrl + −", "Zoom out around the canvas centre"],
    ["⌘ / Ctrl + C", "Copy selected canvas elements"],
    ["⌘ / Ctrl + V", "Paste elements, links, or clipboard images"],
    ["⌘ / Ctrl + [", "Send selected elements to the back"],
    ["⌘ / Ctrl + ]", "Bring selected elements to the front"],
    ["Shift + draw", "Snap the stroke to a straight 15° line"],
    ["Space + drag", "Temporarily pan the canvas"],
    ["Tab", "Add a child to the selected node"],
    ["Enter / Space", "Select a focused node"],
    ["Delete", "Remove selected nodes or paths"],
    ["Esc", "Cancel inline editing, close a modal, or cancel linking"],
    ["⌘ / Ctrl + 0", "Reset the canvas view"],
  ];
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal shortcuts-modal" role="dialog" aria-modal="true" aria-labelledby="shortcuts-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
    <div className="modal-header"><h2 id="shortcuts-dialog-title">Keyboard shortcuts</h2><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={20} /></button></div>
    <div className="shortcuts-list">{shortcuts.map(([keys, action]) => <div key={keys}><kbd>{keys}</kbd><span>{action}</span></div>)}</div>
    <div className="modal-actions"><button className="primary-button" onClick={onClose}>Done</button></div>
  </div></div>;
}

function GuestWelcomeModal({ accessMode, onClose }) {
  const canEdit = accessMode === "editor";
  useModalKeyboard(onClose, onClose);
  return <div className="modal-backdrop guest-welcome-backdrop">
    <section className="modal guest-welcome-modal" role="dialog" aria-modal="true" aria-labelledby="guest-welcome-title">
      <div className="guest-welcome-art">
        <img src={`${APP_BASE}assets/mymind-cloud-welcome.webp`} alt="A fuzzy blue cloud mascot waving hello" />
        <span>{canEdit ? "Editing powers: unlocked ✨" : "Viewer mode: cozy & curious 👀"}</span>
      </div>
      <div className="guest-welcome-copy">
        <h2 id="guest-welcome-title">Welcome to Christine’s canvas</h2>
        <p>{canEdit
          ? "You’ve got editing powers. Add ideas, draw questionable doodles, move things around, and leave comments."
          : "You’re in viewer mode. Roam around, peek at every idea, and leave comments. The furniture stays put."}</p>
        <div className="guest-welcome-tips">
          <div><kbd>?</kbd><span><strong>Meet your shortcuts</strong><small>Press ? anytime for the full cheat sheet.</small></span></div>
          <div><kbd>Space</kbd><span><strong>Glide around</strong><small>Hold Space and drag to roam the canvas.</small></span></div>
          {canEdit
            ? <div><kbd>D</kbd><span><strong>Doodle freely</strong><small>Pick the pen, then turn thoughts into squiggles.</small></span></div>
            : <div><kbd>A</kbd><span><strong>Leave a tiny note</strong><small>Add a comment wherever a thought pops up.</small></span></div>}
        </div>
        <p className="guest-visibility-note">{canEdit
          ? "Tiny heads-up: anything you put here, Christine can see it. Yes, even that doodle. 👀"
          : "Comments you leave are visible to Christine. Be brilliant, or at least entertaining. 👀"}</p>
        <div className="modal-actions">
          <button className="primary-button" autoFocus onClick={onClose}>{canEdit ? "Let’s make a tiny mess" : "Let me have a look"}</button>
        </div>
      </div>
    </section>
  </div>;
}

function ExportPanel({ scope, setScope, hasSelection, onClose, onExport }) {
  useModalKeyboard(onClose, () => onExport("pdf"));
  return <aside className="inspector export-panel floating-side-panel" aria-labelledby="export-dialog-title">
    <div className="floating-panel-header"><h2 id="export-dialog-title">Export canvas</h2><div><button className="icon-button" aria-label="Close export panel" onClick={onClose}><X size={18} /></button></div></div>
    <div className="segmented"><button className={scope === "all" ? "active" : ""} onClick={() => setScope("all")}>Whole canvas</button><button disabled={!hasSelection} className={scope === "selected" ? "active" : ""} onClick={() => setScope("selected")}>Selected items</button></div>
    {!hasSelection && <p className="dialog-note">Select one or more nodes to enable a focused export.</p>}
    <div className="export-grid">
      <button onClick={() => onExport("mymind")}><FileText size={27} weight="duotone" /><span><strong>MyMind</strong><small>Reopen and keep editing</small></span></button>
      <button onClick={() => onExport("pdf")}><FilePdf size={27} weight="duotone" /><span><strong>PDF</strong><small>Ready to present</small></span></button>
      <button onClick={() => onExport("jpg")}><FileJpg size={27} weight="duotone" /><span><strong>JPG</strong><small>Easy to share</small></span></button>
      <button onClick={() => onExport("png")}><Photo size={27} weight="duotone" /><span><strong>PNG</strong><small>Crisp raster image</small></span></button>
      <button onClick={() => onExport("gif")}><Play size={27} weight="duotone" /><span><strong>GIF</strong><small>Static GIF snapshot</small></span></button>
      <button onClick={() => onExport("svg")}><FileSvg size={27} weight="duotone" /><span><strong>SVG</strong><small>Editable vector</small></span></button>
    </div>
  </aside>;
}

function CommentsPanel({ comments, onSelect, onClose }) {
  useModalKeyboard(onClose);
  return <aside className="inspector comments-panel floating-side-panel" aria-labelledby="comments-panel-title">
    <div className="floating-panel-header"><div><h2 id="comments-panel-title">Comments</h2><small>{comments.length} {comments.length === 1 ? "comment" : "comments"}</small></div><button className="icon-button" aria-label="Close comments panel" onClick={onClose}><X size={18} /></button></div>
    <div className="comments-panel-list">
      {comments.length ? comments.map(({ annotation, pageId, pageName }) => <article className="comments-panel-item" key={`${pageId}-${annotation.id}`}>
        <button className="comment-jump" aria-label={`Go to comment ${annotation.number}`} title={`Go to comment ${annotation.number}`} onClick={() => onSelect({ annotation, pageId })}>{annotation.number}</button>
        <div><div><strong>{annotation.author || "Guest"}</strong><small>{pageName || "Canvas"}</small></div><p>{annotation.comment}</p>{(annotation.replies || []).length > 0 && <span>{annotation.replies.length} {(annotation.replies || []).length === 1 ? "reply" : "replies"}</span>}</div>
      </article>) : <div className="comments-panel-empty"><ChatCircleDots size={24} /><strong>No comments yet</strong><p>Use the comment tool to leave a note on the canvas.</p></div>}
    </div>
  </aside>;
}

function ShareDialog({ document, url, publishing, ready: _ready, onToggle, onToggleGuestEditing, onClose }) {
  const [copied, setCopied] = useState(false);
  const linkReady = document.shared;
  const copy = async () => {
    if (!linkReady) return;
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  useModalKeyboard(onClose, linkReady ? copy : onToggle);
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal share-modal" role="dialog" aria-modal="true" aria-labelledby="share-dialog-title" onMouseDown={(e) => e.stopPropagation()}>
    <div className="modal-header"><h2 id="share-dialog-title">Share this canvas</h2><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={20} /></button></div>
    <div className="share-status"><span className={document.shared ? "live" : ""}><ShareNetwork size={21} /></span><div><strong>{publishing ? "Publishing shared link…" : document.shared ? "Anyone with the link can access" : "This canvas is private"}</strong><small>{document.guestEditable ? "Guests can edit this canvas." : "Guests can view and comment."}</small></div><button className={`switch ${document.shared ? "on" : ""}`} aria-label="Toggle shared link" disabled={publishing} onClick={onToggle}><i /></button></div>
    <div className={`share-status guest-edit-status ${!document.shared ? "disabled" : ""}`}><span className={document.guestEditable ? "live" : ""}><PencilIcon width="20" /></span><div><strong>Allow guest editing</strong><small>Anyone with the shared link can change canvas content.</small></div><button className={`switch ${document.guestEditable ? "on" : ""}`} aria-label="Toggle guest editing" disabled={!document.shared} onClick={onToggleGuestEditing}><i /></button></div>
    <div className={`copy-field ${!linkReady ? "disabled" : ""}`}><span>{url}</span><button disabled={!linkReady} onClick={copy}>{copied ? <Check size={18} /> : <Copy size={18} />}{copied ? "Copied" : "Copy"}</button></div>
  </div></div>;
}

function LoadingScreen({ message = "Loading…", progress = 0, slow = false }) {
  const percentage = Math.max(0, Math.min(100, Math.round(progress)));
  return <div className="app-loading" role="status" aria-live="polite">
    <Brand />
    <div className="loading-card">
      <span><ArrowPathIcon width="24" /></span>
      <strong>{message}</strong>
      <div className="loading-progress" aria-label={`${percentage}% loaded`}><i><b style={{ width: `${percentage}%` }} /></i><em>{percentage}%</em></div>
      <small>{slow ? "This canvas is larger than usual. We are still loading it safely." : "Getting the latest version ready."}</small>
      {slow && <button type="button" className="secondary-button" onClick={() => window.location.reload()}>Retry loading</button>}
    </div>
  </div>;
}

function NotFound() {
  return <div className="not-found"><Brand /><div><span><FolderOpen size={28} /></span><h1>Canvas not found</h1><p>This link may be private, deleted, or mistyped.</p><button className="primary-button" onClick={() => navigate("/")}>Go to dashboard</button></div></div>;
}

function ServiceUnavailable() {
  return <div className="not-found"><Brand /><div><span><Database size={28} /></span><h1>Canvas is temporarily unavailable</h1><p>The shared canvas could not be loaded from the server. Your link may still be valid—please try again.</p><button className="primary-button" onClick={() => window.location.reload()}>Try again</button></div></div>;
}

function toDataUri(url) {
  return fetch(url, { mode: "cors" }).then((response) => {
    if (!response.ok) throw new Error("Image request failed");
    return response.blob();
  }).then((blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read image data"));
    reader.readAsDataURL(blob);
  }));
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function rasterizeSvg(svg, width, height, format, filename) {
  const source = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  const image = new Image();
  image.onload = () => {
    try {
      const canvas = window.document.createElement("canvas");
      const maxPixels = 16000000;
      const maxDimension = format === "gif" ? 1600 : 4096;
      const scale = Math.min(2, maxDimension / Math.max(width, height), Math.sqrt(maxPixels / Math.max(1, width * height)));
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      const context = canvas.getContext("2d");
      context.fillStyle = "#f7f8fb";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const jpg = canvas.toDataURL("image/jpeg", .94);
      if (format === "jpg") {
        const anchor = window.document.createElement("a");
        anchor.href = jpg;
        anchor.download = `${filename}.jpg`;
        anchor.click();
      } else if (format === "png") {
        canvas.toBlob((blob) => blob && downloadBlob(blob, `${filename}.png`), "image/png");
      } else if (format === "gif") {
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        downloadBlob(encodeStaticGif(pixels, canvas.width, canvas.height), `${filename}.gif`);
      } else {
        const landscape = width >= height;
        const pageScale = Math.min(1, 14400 / Math.max(width, height));
        const pageWidth = Math.max(1, width * pageScale);
        const pageHeight = Math.max(1, height * pageScale);
        const pdf = new jsPDF({ orientation: landscape ? "landscape" : "portrait", unit: "pt", format: [pageWidth, pageHeight] });
        pdf.addImage(jpg, "JPEG", 0, 0, pageWidth, pageHeight);
        pdf.save(`${filename}.pdf`);
      }
    } catch {
      window.alert("MyMind could not finish this export. An image on the canvas may be blocking it — try removing images added by URL and export again.");
    }
    URL.revokeObjectURL(source);
  };
  image.onerror = () => {
    URL.revokeObjectURL(source);
    window.alert("MyMind could not rasterize this export. Try SVG or the editable MyMind format.");
  };
  image.src = source;
}

function encodeStaticGif(rgba, width, height) {
  const bytes = [];
  const pushText = (value) => [...value].forEach((char) => bytes.push(char.charCodeAt(0)));
  const pushWord = (value) => bytes.push(value & 255, (value >> 8) & 255);
  pushText("GIF89a");
  pushWord(width); pushWord(height);
  bytes.push(0xf7, 0, 0);
  for (let index = 0; index < 256; index += 1) {
    const red = (index >> 5) & 7;
    const green = (index >> 2) & 7;
    const blue = index & 3;
    bytes.push(Math.round(red * 255 / 7), Math.round(green * 255 / 7), Math.round(blue * 255 / 3));
  }
  bytes.push(0x2c, 0, 0, 0, 0);
  pushWord(width); pushWord(height);
  bytes.push(0, 8);
  const compressed = [];
  let bitBuffer = 0;
  let bitCount = 0;
  const writeCode = (code) => {
    bitBuffer |= code << bitCount;
    bitCount += 9;
    while (bitCount >= 8) {
      compressed.push(bitBuffer & 255);
      bitBuffer >>= 8;
      bitCount -= 8;
    }
  };
  writeCode(256);
  let sinceClear = 0;
  for (let offset = 0; offset < rgba.length; offset += 4) {
    if (sinceClear >= 250) { writeCode(256); sinceClear = 0; }
    writeCode(((rgba[offset] >> 5) << 5) | ((rgba[offset + 1] >> 5) << 2) | (rgba[offset + 2] >> 6));
    sinceClear += 1;
  }
  writeCode(257);
  if (bitCount) compressed.push(bitBuffer & 255);
  for (let offset = 0; offset < compressed.length; offset += 255) {
    const block = compressed.slice(offset, offset + 255);
    bytes.push(block.length, ...block);
  }
  bytes.push(0, 0x3b);
  return new Blob([new Uint8Array(bytes)], { type: "image/gif" });
}
