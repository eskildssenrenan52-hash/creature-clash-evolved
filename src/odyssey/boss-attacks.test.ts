import { describe, expect, it } from 'vitest';
import { STORY_BOSSES, beatsFor } from './story';
import { bossAttacksFor } from './boss-attacks';

describe('catálogo de chefes', () => {
  it('tem vinte ataques distintos e efeitos próprios por chefe', () => {
    for (const boss of STORY_BOSSES) {
      const attacks = bossAttacksFor(boss);
      expect(attacks).toHaveLength(20);
      expect(new Set(attacks.map((a) => a.id)).size).toBe(20);
      expect(new Set(attacks.map((a) => a.fx)).size).toBeGreaterThanOrEqual(10);
      expect(attacks.every((a) => a.color && a.name.includes(boss.name))).toBe(true);
    }
  });
  it('tem introdução cinematográfica única para cada primeira aparição', () => {
    for (const boss of STORY_BOSSES) {
      const intro = beatsFor(`boss:intro:${boss.id}`);
      expect(intro).toHaveLength(1);
      expect(intro[0]?.stage?.actors).toHaveLength(2);
      expect(intro[0]?.lines.length).toBeGreaterThanOrEqual(3);
    }
  });
});
