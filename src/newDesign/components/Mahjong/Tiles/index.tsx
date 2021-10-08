import { tiles } from "../Assets";

const getImage = (idx: number): { src: string; category: string } | null => {
  if (idx <= 4) return { src: tiles.characters_1, category: "characters_1" };
  if (idx <= 8) return { src: tiles.characters_2, category: "characters_2" };
  if (idx <= 12) return { src: tiles.characters_3, category: "characters_3" };
  if (idx <= 16) return { src: tiles.characters_4, category: "characters_4" };
  if (idx <= 20) return { src: tiles.characters_5, category: "characters_5" };
  if (idx <= 24) return { src: tiles.characters_6, category: "characters_6" };
  if (idx <= 28) return { src: tiles.characters_7, category: "characters_7" };
  if (idx <= 32) return { src: tiles.characters_8, category: "characters_8" };
  if (idx <= 36) return { src: tiles.characters_9, category: "characters_9" };
  if (idx <= 40) return { src: tiles.dots_1, category: "dots_1" };
  if (idx <= 44) return { src: tiles.dots_2, category: "dots_2" };
  if (idx <= 48) return { src: tiles.dots_3, category: "dots_3" };
  if (idx <= 52) return { src: tiles.dots_4, category: "dots_4" };
  if (idx <= 56) return { src: tiles.dots_5, category: "dots_5" };
  if (idx <= 60) return { src: tiles.dots_6, category: "dots_6" };
  if (idx <= 64) return { src: tiles.dots_7, category: "dots_7" };
  if (idx <= 68) return { src: tiles.dots_8, category: "dots_8" };
  if (idx <= 72) return { src: tiles.dots_9, category: "dots_9" };
  if (idx <= 76) return { src: tiles.bamboo_1, category: "bamboo_1" };
  if (idx <= 80) return { src: tiles.bamboo_2, category: "bamboo_2" };
  if (idx <= 84) return { src: tiles.bamboo_3, category: "bamboo_3" };
  if (idx <= 88) return { src: tiles.bamboo_4, category: "bamboo_4" };
  if (idx <= 92) return { src: tiles.bamboo_5, category: "bamboo_5" };
  if (idx <= 96) return { src: tiles.bamboo_6, category: "bamboo_6" };
  if (idx <= 100) return { src: tiles.bamboo_7, category: "bamboo_7" };
  if (idx <= 104) return { src: tiles.bamboo_8, category: "bamboo_8" };
  if (idx <= 108) return { src: tiles.bamboo_9, category: "bamboo_9" };
  if (idx <= 112) return { src: tiles.wind_east, category: "wind_east" };
  if (idx <= 116) return { src: tiles.wind_south, category: "wind_south" };
  if (idx <= 120) return { src: tiles.wind_west, category: "wind_west" };
  if (idx <= 124) return { src: tiles.wind_north, category: "wind_north" };
  if (idx <= 128) return { src: tiles.dragon_red, category: "dragon_red" };
  if (idx <= 132) return { src: tiles.dragon_white, category: "dragon_white" };
  if (idx <= 136) return { src: tiles.dragon_green, category: "dragon_green" };
  return null;
};

export function GetWindTile(value: number) {
  if (value === 4) return tiles.wind_east;
  if (value === 5) return tiles.wind_south;
  if (value === 6) return tiles.wind_west;
  if (value === 7) return tiles.wind_north;
  if (!value) return null;
}

export default function GetMahjongTile(idx) {
  if (idx > 136 || idx < 1) return null;
  return getImage(idx);
}
