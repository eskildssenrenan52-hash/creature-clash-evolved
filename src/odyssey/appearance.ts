// Personalização do herói: pele, cabelo, olhos, roupas, capas, chapéus, marcas e skins prontas.
// Tudo é dado puro + um salvamento próprio ("golden-arrow-look"), então os saves antigos não são tocados.
import type { Palette } from "./data";
import type { CharExtras } from "./gfx";
import { HERO_SKINS } from "./hero-sprite";

/** Skin inicial de quem nunca escolheu: o herói pintado por IA com 5 ataques. */
export const DEFAULT_KSKIN = Math.max(0, HERO_SKINS.findIndex((s) => s.id === "ai_hero"));

export interface Look {
  skin: number; hairStyle: number; hairColor: number; eyes: number;
  outfit: number; cape: number; hat: number; mark: number;
  /** Skin com sprite do primeiro jogo (ver hero-sprite.ts). */
  kskin: number;
}
export interface Swatch { name: string; color: string }
export interface Outfit { name: string; body: string; legs: string; accent?: string; minLevel?: number }
export interface HatDef { name: string; color: string; minLevel?: number }
export interface SkinPreset { id: string; name: string; desc: string; look: Look; minLevel: number }

export const SKIN_TONES: Swatch[] = [
  { name: "Porcelana", color: "#fbe0cc" }, { name: "Clara", color: "#f4c8a0" }, { name: "Dourada", color: "#e0b080" },
  { name: "Oliva", color: "#c8946a" }, { name: "Bronzeada", color: "#a87048" }, { name: "Castanha", color: "#80502f" },
  { name: "Ébano", color: "#5a3620" }, { name: "Lunar", color: "#c8d4e8" }, { name: "Musgo", color: "#8cb070" },
];
export const HAIR_COLORS: Swatch[] = [
  { name: "Dourado", color: "#e8a030" }, { name: "Loiro", color: "#f0d040" }, { name: "Castanho", color: "#6a3a1a" },
  { name: "Preto", color: "#1c1c26" }, { name: "Ruivo", color: "#c04020" }, { name: "Branco", color: "#e8e8f0" },
  { name: "Azul", color: "#3070d0" }, { name: "Rosa", color: "#e060a0" }, { name: "Verde", color: "#40a060" }, { name: "Violeta", color: "#8050d0" },
];
export const EYE_COLORS: Swatch[] = [
  { name: "Noite", color: "#202030" }, { name: "Âmbar", color: "#b06a10" }, { name: "Safira", color: "#2060d0" },
  { name: "Esmeralda", color: "#20a050" }, { name: "Rubi", color: "#c02030" }, { name: "Ametista", color: "#8040c0" },
];
export const HAIR_STYLES = ["Padrão", "Longo", "Espetado", "Coque", "Careca"];
export const OUTFITS: Outfit[] = [
  { name: "Armadura equipada", body: "", legs: "#3a3060" },
  { name: "Aventureiro", body: "#3070c0", legs: "#2a3050", accent: "#ddc58e" },
  { name: "Caçador da Mata", body: "#2f7a3a", legs: "#3a2a18", accent: "#c8b060" },
  { name: "Brasa", body: "#c04a28", legs: "#3a1a14", accent: "#ffd060" },
  { name: "Filho do Gelo", body: "#7ab8e0", legs: "#2a3a5a", accent: "#ffffff" },
  { name: "Sombra", body: "#2a2a3a", legs: "#14141c", accent: "#8050d0" },
  { name: "Marujo", body: "#e8e8f0", legs: "#2a3a70", accent: "#c03030" },
  { name: "Nobre", body: "#7a2a8a", legs: "#201030", accent: "#f0d060", minLevel: 5 },
  { name: "Guardião Dourado", body: "#e0b030", legs: "#5a3a10", accent: "#ffffff", minLevel: 10 },
  { name: "Cântico Partido", body: "#20a0a0", legs: "#103848", accent: "#f0f0a0", minLevel: 15 },
];
export const CAPES: Swatch[] = [
  { name: "Sem capa", color: "" }, { name: "Carmesim", color: "#a02030" }, { name: "Real", color: "#5a2a9a" },
  { name: "Floresta", color: "#2a6a3a" }, { name: "Oceano", color: "#2060a0" }, { name: "Ouro", color: "#d0a030" }, { name: "Noite", color: "#1c1c2c" },
];
export const HATS: HatDef[] = [
  { name: "Sem chapéu", color: "" }, { name: "Capuz", color: "#4a4a5a" }, { name: "Chapéu de mago", color: "#5a3ab0" },
  { name: "Coroa", color: "#e8c030", minLevel: 8 }, { name: "Bandana", color: "#c03030" }, { name: "Elmo", color: "#aab4c0", minLevel: 3 },
];
export const MARKS = ["Nenhuma", "Cicatriz", "Sardas", "Pintura de guerra", "Óculos"];

export const DEFAULT_LOOK: Look = { skin: 1, hairStyle: 0, hairColor: 0, eyes: 0, outfit: 0, cape: 0, hat: 0, mark: 0, kskin: DEFAULT_KSKIN };

const L = (o: Partial<Look>): Look => ({ ...DEFAULT_LOOK, ...o });
export const SKIN_PRESETS: SkinPreset[] = [
  { id: "heroi", name: "Herói de Potos", desc: "O visual clássico da jornada.", minLevel: 1, look: L({}) },
  { id: "cacador", name: "Caçadora da Mata", desc: "Cabelo longo, capa verde e capuz.", minLevel: 1, look: L({ skin: 3, hairStyle: 1, hairColor: 2, eyes: 3, outfit: 2, cape: 3, hat: 1 }) },
  { id: "mago", name: "Mago Errante", desc: "Chapéu pontudo e manto violeta.", minLevel: 1, look: L({ skin: 0, hairColor: 5, hairStyle: 2, eyes: 5, outfit: 7, cape: 2, hat: 2, mark: 4 }) },
  { id: "pirata", name: "Lobo do Mar", desc: "Bandana, cicatriz e capa carmesim.", minLevel: 2, look: L({ skin: 4, hairColor: 3, eyes: 1, outfit: 6, cape: 1, hat: 4, mark: 1 }) },
  { id: "sombra", name: "Sombra do Véu", desc: "Tudo escuro, olhos de ametista.", minLevel: 4, look: L({ skin: 7, hairColor: 9, hairStyle: 1, eyes: 5, outfit: 5, cape: 6, hat: 1 }) },
  { id: "gelo", name: "Filho do Gelo", desc: "Pele lunar e cabelo branco.", minLevel: 6, look: L({ skin: 7, hairColor: 5, hairStyle: 3, eyes: 2, outfit: 4, cape: 4 }) },
  { id: "rei", name: "Rei do Cântico", desc: "Coroa dourada e manto real.", minLevel: 10, look: L({ skin: 2, hairColor: 1, eyes: 1, outfit: 8, cape: 2, hat: 3 }) },
];

const clamp = (v: unknown, n: number) => { const x = Math.floor(Number(v)); return Number.isFinite(x) && x >= 0 && x < n ? x : 0; };
export function sanitizeLook(raw: Partial<Look> | null | undefined): Look {
  const r = raw ?? {};
  return {
    skin: raw ? clamp(r.skin, SKIN_TONES.length) : DEFAULT_LOOK.skin, hairStyle: clamp(r.hairStyle, HAIR_STYLES.length),
    hairColor: clamp(r.hairColor, HAIR_COLORS.length), eyes: clamp(r.eyes, EYE_COLORS.length),
    outfit: clamp(r.outfit, OUTFITS.length), cape: clamp(r.cape, CAPES.length), hat: clamp(r.hat, HATS.length), mark: clamp(r.mark, MARKS.length), kskin: raw && r.kskin !== undefined ? clamp(r.kskin, HERO_SKINS.length) : DEFAULT_KSKIN,
  };
}

const KEY = "golden-arrow-look";
let current: Look | null = null;
export function getLook(): Look {
  if (current) return current;
  try { const raw = typeof localStorage !== "undefined" ? localStorage.getItem(KEY) : null; current = raw ? sanitizeLook(JSON.parse(raw)) : { ...DEFAULT_LOOK }; }
  catch { current = { ...DEFAULT_LOOK }; }
  return current;
}
export function setLook(next: Look) {
  current = sanitizeLook(next);
  try { localStorage.setItem(KEY, JSON.stringify(current)); } catch { /* armazenamento indisponível */ }
}

/** Itens bloqueados por nível seguem disponíveis para quem já os escolheu antes (nunca "tira" a roupa do jogador). */
export const outfitUnlocked = (i: number, level: number) => level >= (OUTFITS[i]?.minLevel ?? 1);
export const hatUnlocked = (i: number, level: number) => level >= (HATS[i]?.minLevel ?? 1);

export function randomLook(level: number, rnd: () => number = Math.random): Look {
  const pick = (n: number) => Math.floor(rnd() * n);
  const okOutfits = OUTFITS.map((_, i) => i).filter((i) => outfitUnlocked(i, level));
  const okHats = HATS.map((_, i) => i).filter((i) => hatUnlocked(i, level));
  return { skin: pick(SKIN_TONES.length), hairStyle: pick(HAIR_STYLES.length), hairColor: pick(HAIR_COLORS.length), eyes: pick(EYE_COLORS.length),
    outfit: okOutfits[pick(okOutfits.length)] ?? 0, cape: pick(CAPES.length), hat: okHats[pick(okHats.length)] ?? 0, mark: pick(MARKS.length), kskin: 9 };
}

const memo = new Map<string, { pal: Palette; extras: CharExtras }>();
/** Converte a escolha do jogador em paleta + extras para drawChar. `armorColor` e `ring` vêm do equipamento. */
export function resolveLook(look: Look, armorColor: string, ring: string): { pal: Palette; extras: CharExtras } {
  const k = `${look.skin}.${look.hairStyle}.${look.hairColor}.${look.eyes}.${look.outfit}.${look.cape}.${look.hat}.${look.mark}|${armorColor}|${ring}`;
  const hit = memo.get(k); if (hit) return hit;
  const o = OUTFITS[look.outfit] ?? OUTFITS[0];
  const pal: Palette = { skin: SKIN_TONES[look.skin].color, hair: HAIR_COLORS[look.hairColor].color, body: o.body || armorColor, legs: o.legs, accent: o.body ? (o.accent ?? ring) : ring };
  const extras: CharExtras = { hairStyle: look.hairStyle, eyes: EYE_COLORS[look.eyes].color, cape: CAPES[look.cape].color || undefined, hat: look.hat, hatColor: HATS[look.hat]?.color ?? "", mark: look.mark };
  if (memo.size > 200) memo.clear();
  const v = { pal, extras }; memo.set(k, v); return v;
}
