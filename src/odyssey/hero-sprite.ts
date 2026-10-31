// Protagonista com os sprites do primeiro jogo: corpo base, skins prontas e arma equipada em camadas.
// Skins "ai" vêm de folhas pintadas por IA (public/hero): 3 linhas de andar + 5 ataques com 5 quadros.
import type { ItemDef, Palette, WeaponKind } from "./data";
import { drawK, kImage, K_DIR, K_SHEETS } from "./kaetram";
import type { CharExtras } from "./gfx";
import type { FxName } from "./vfx";

export type ComboFx = [FxName, FxName, FxName, FxName, FxName];
export interface HeroSkin { id: string; name: string; desc: string; sheet: string; minLevel: number; ai?: boolean; fx?: ComboFx }
const CLASSIC_FX: ComboFx = ["slash", "impact", "slash", "shock", "explosion"];
const ai = (id: string, name: string, desc: string, minLevel: number, fx: ComboFx): HeroSkin => ({ id: `ai_${id}`, name, desc, sheet: `hero/${id}`, minLevel, ai: true, fx });

/**
 * Índice salvo em Look.kskin. Os 10 primeiros mantêm a ordem antiga (9 = herói em pixels,
 * personalizável) para saves existentes; as skins de IA entram depois.
 */
export const HERO_SKINS: HeroSkin[] = [
  { id: "base", name: "Aventureiro", desc: "O herói clássico do primeiro jogo.", sheet: "player/base", minLevel: 1 },
  { id: "danbo", name: "Danbo", desc: "Robô de papelão, firme e leal.", sheet: "player/skin/danbo", minLevel: 1 },
  { id: "danboblue", name: "Danbo Azul", desc: "Pintado com tinta do mar.", sheet: "player/skin/danboblue", minLevel: 2 },
  { id: "danbogreen", name: "Danbo Verde", desc: "Camuflado para a mata.", sheet: "player/skin/danbogreen", minLevel: 3 },
  { id: "danbored", name: "Danbo Rubro", desc: "Pronto para a forja.", sheet: "player/skin/danbored", minLevel: 4 },
  { id: "taekwondo", name: "Mestre Taekwondo", desc: "Faixa preta e dobok branco.", sheet: "player/skin/taekwondo", minLevel: 5 },
  { id: "oldman", name: "Velho Sábio", desc: "Barba longa, passos lentos, olhar atento.", sheet: "player/skin/oldmanskin", minLevel: 7 },
  { id: "skeleton", name: "Esqueleto", desc: "Voltou do Abismo e esqueceu de morrer.", sheet: "player/skin/skeletonskin", minLevel: 10 },
  { id: "darkskeleton", name: "Esqueleto Sombrio", desc: "Ossos tingidos pela Noite.", sheet: "player/skin/darkskeletonskin", minLevel: 15 },
  { id: "classic", name: "Herói em pixels", desc: "O visual personalizável original (pele, cabelo, roupa…).", sheet: "", minLevel: 1 },
  ai("hero", "Herói da Flecha", "Túnica verde e espada fiel. Combo de vento e explosão.", 1, ["slash", "slash", "wind", "impact", "explosion"]),
  ai("knight", "Cavaleiro de Prata", "Armadura completa; termina com luz sagrada.", 1, ["slash", "impact", "earth", "slash", "holy"]),
  ai("ninja", "Ninja da Lua", "Golpes rápidos que somem nas sombras.", 1, ["slash", "wind", "slash", "void", "lightning"]),
  ai("mage", "Arquimago", "Fogo, gelo e raio num só combo — e um meteoro.", 1, ["arcane", "explosion", "ice", "lightning", "meteor"]),
  ai("archer", "Arqueira Élfica", "Rajadas de vento e natureza.", 1, ["wind", "nature", "impact", "wind", "lightning"]),
  ai("cat", "Gato Guerreiro", "Pequeno, veloz e cheio de garra.", 1, ["slash", "impact", "wind", "slash", "arcane"]),
  ai("danbo", "Danbo de Batalha", "Papelão reforçado, socos que racham o chão.", 2, ["impact", "impact", "earth", "shock", "explosion"]),
  ai("taekwondo", "Lutador Faixa Preta", "Chutes em sequência e onda de choque.", 2, ["impact", "impact", "wind", "impact", "shock"]),
  ai("samurai", "Samurai Errante", "Lâmina silenciosa, trovão no final.", 3, ["slash", "slash", "wind", "impact", "lightning"]),
  ai("pirate", "Capitã Pirata", "Sabre e pólvora: o mar responde.", 3, ["slash", "water", "impact", "water", "explosion"]),
  ai("sea", "Guardião dos Mares", "Tridente e marés que sobem do chão.", 4, ["water", "ice", "water", "shock", "water"]),
  ai("oldman", "Sábio Ancião", "Cajado antigo que chama meteoros.", 4, ["arcane", "wind", "lightning", "arcane", "meteor"]),
  ai("skeleton", "Guerreiro Ossudo", "Ossos que estalam e o vazio que engole.", 5, ["slash", "void", "impact", "void", "explosion"]),
  ai("druid", "Druida do Bosque", "Vinhas, folhas e a fúria da terra.", 5, ["nature", "wind", "earth", "nature", "nature"]),
  ai("paladin", "Paladino Dourado", "Cada golpe é uma oração de luz.", 6, ["slash", "holy", "impact", "holy", "holy"]),
  ai("ice", "Guardião do Gelo", "Cristais que estilhaçam no impacto.", 7, ["ice", "slash", "ice", "water", "ice"]),
  ai("princess", "Princesa Guerreira", "Elegância arcana e lâmina afiada.", 8, ["slash", "holy", "arcane", "slash", "shock"]),
  ai("viking", "Viking do Norte", "Machado pesado, trovão de Odin.", 9, ["impact", "earth", "slash", "earth", "lightning"]),
  ai("witch", "Bruxa da Floresta", "Veneno, sombras e runas.", 10, ["poison", "void", "arcane", "poison", "nature"]),
  ai("wolf", "Lobisomem", "Garras sangrentas e uivo que sacode a terra.", 11, ["blood", "slash", "impact", "blood", "shock"]),
  ai("pumpkin", "Cavaleiro Abóbora", "Chamas e veneno da noite de colheita.", 12, ["explosion", "poison", "slash", "void", "explosion"]),
  ai("vampire", "Conde Vampiro", "Morcegos e lâminas de sangue.", 13, ["blood", "void", "blood", "slash", "blood"]),
  ai("mecha", "Mecha X-01", "Punhos de aço, laser e choque elétrico.", 14, ["impact", "shock", "lightning", "explosion", "shock"]),
  ai("necro", "Necromante", "O vazio obedece à sua foice.", 15, ["void", "poison", "void", "arcane", "void"]),
  ai("angel", "Anjo Celeste", "Asas de luz e julgamento sagrado.", 16, ["holy", "slash", "holy", "shock", "holy"]),
  ai("demon", "Demônio de Lava", "Fogo do abismo e meteoros.", 18, ["explosion", "slash", "explosion", "void", "meteor"]),
];
export const CLASSIC_SKIN = HERO_SKINS.findIndex((s) => s.id === "classic");
export const skinUnlocked = (i: number, level: number) => level >= (HERO_SKINS[i]?.minLevel ?? 1);
/** Efeito especial do golpe `step` (0–4) do combo para a skin. */
export const skinFx = (i: number, step: number): FxName => (HERO_SKINS[i]?.fx ?? CLASSIC_FX)[((step % 5) + 5) % 5] ?? "slash";

// Folhas de IA: 48 px por quadro, pés em y=44, linhas 0–2 andar (frente/lado/costas), 3–7 ataques virados à direita.
for (const s of HERO_SKINS) {
  if (!s.ai) continue;
  K_SHEETS[s.sheet] = {
    url: `/${s.sheet}.png`, w: 48, h: 48, ox: -16, oy: -28,
    anims: {
      idle_down: [1, 0], idle_right: [1, 1], idle_up: [1, 2],
      walk_down: [5, 0], walk_right: [5, 1], walk_up: [5, 2],
      atk1: [5, 3], atk2: [5, 4], atk3: [5, 5], atk4: [5, 6], atk5: [5, 7],
    },
  };
}

/** Folha de arma para cada tipo quando o item não tiver uma própria. */
const KIND_SPRITE: Record<WeaponKind, string> = { sword: "tinsword", spear: "bronzespear", bow: "woodenbow", staff: "naturestaff" };
export function weaponSheet(item: Pick<ItemDef, "sprite" | "weapon"> | undefined): string {
  const s = item?.sprite ?? KIND_SPRITE[item?.weapon ?? "sword"];
  return `player/weapon/${s}`;
}

/**
 * Desenha o herói com sprites Kaetram. Retorna false quando a skin é a clássica
 * ou as imagens ainda não carregaram (o jogo então usa drawChar).
 */
export function drawHero(c: CanvasRenderingContext2D, x: number, y: number, o: { skin: number; dir: number; moving: boolean; frameT: number; attack: number; combo?: number; weapon?: Pick<ItemDef, "sprite" | "weapon"> | null; time: number; alpha?: number; scale?: number; pal?: Palette; extras?: CharExtras }): boolean {
  const skin = HERO_SKINS[o.skin] ?? HERO_SKINS[0];
  if (!skin.sheet || !kImage(skin.sheet)) return false;
  const d = K_DIR[o.dir] ?? "down", flip = o.dir === 1;
  const attacking = o.attack > 0;
  if (skin.ai) {
    // A arte já traz a arma própria da skin; ataques usam a vista lateral.
    const step = (((o.combo ?? 0) % 5) + 5) % 5;
    const anim = attacking ? `atk${step + 1}` : o.moving ? `walk_${d}` : `idle_${d}`;
    const frame = attacking ? Math.min(4, Math.floor((1 - o.attack) * 5)) : o.moving ? o.frameT : 0;
    const bob = !attacking && !o.moving ? Math.round(Math.sin(o.time * 3) * 0.5) : 0;
    return drawK(c, skin.sheet, anim, frame, x, y + bob, flip, o.alpha ?? 1, o.scale ?? 1);
  }
  const bow = o.weapon?.weapon === "bow";
  const anim = attacking ? `${bow ? "bow_" : ""}atk_${d}` : o.moving ? `walk_${d}` : `idle_${d}`;
  const frame = attacking ? Math.min(3, Math.floor((1 - o.attack) * 4)) : o.moving ? o.frameT : o.time * 2.2;
  const wsheet = o.weapon ? weaponSheet(o.weapon) : null;
  const sc = o.scale ?? 1, a = o.alpha ?? 1;
  if (wsheet && d === "up") drawK(c, wsheet, anim, frame, x, y, flip, a, sc);
  drawK(c, skin.sheet, anim, frame, x, y, flip, a, sc);
  if (wsheet && d !== "up") drawK(c, wsheet, anim, frame, x, y, flip, a, sc);
  drawCustomization(c, x, y, d, o.pal, o.extras, o.time, sc, a);
  return true;
}

function drawCustomization(c: CanvasRenderingContext2D, x: number, y: number, dir: string, pal: Palette | undefined, ex: CharExtras | undefined, time: number, sc: number, alpha: number) {
  if (!pal && !ex) return;
  c.save(); c.globalAlpha = alpha; c.translate(Math.round(x), Math.round(y)); c.scale(sc, sc);
  const face = pal?.skin ?? "#f0c8a0", hair = pal?.hair ?? "#f0d040", eye = ex?.eyes ?? "#202030";
  // Tint suave: preserva os pixels da skin Kaetram e aplica a escolha do jogador.
  c.globalCompositeOperation = "multiply"; c.globalAlpha = alpha * .2; c.fillStyle = face; c.fillRect(-4, -16, 8, 7); c.globalCompositeOperation = "source-over";
  c.globalAlpha = alpha * .7;
  if (ex?.cape) { c.fillStyle = ex.cape; c.beginPath(); c.moveTo(-7, -9); c.quadraticCurveTo(-11, -3 + Math.sin(time * 4) * 1.4, -6, 0); c.lineTo(3, -1); c.lineTo(4, -10); c.closePath(); c.fill(); }
  c.fillStyle = hair; c.fillRect(-4, -18, 8, 2); if (ex?.hairStyle === 1) c.fillRect(-6, -14, 2, 6); if (ex?.hairStyle === 2) { c.fillRect(-5, -20, 2, 2); c.fillRect(3, -20, 2, 2); }
  if (dir === "down" || dir === "left" || dir === "right") { c.fillStyle = eye; c.fillRect(dir === "left" ? -4 : 2, -14, 1.5, 2); c.fillRect(dir === "right" ? 2 : -4, -14, 1.5, 2); }
  if (ex?.mark === 1) { c.fillStyle = "#d84b55"; c.fillRect(dir === "left" ? -2 : 2, -12, 1, 4); }
  if (ex?.mark === 2) { c.fillStyle = "#a05a30"; c.fillRect(-3, -11, 1, 1); c.fillRect(2, -11, 1, 1); }
  if (ex?.hat && ex.hatColor) { c.fillStyle = ex.hatColor; c.fillRect(-6, -19, 12, 2); c.fillRect(-3, -22, 6, 3); if (ex.hat === 2) c.fillRect(-1, -25, 2, 3); }
  c.restore();
}
