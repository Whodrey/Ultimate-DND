export function getProficiencyBonus(level) {
  const numericLevel = Number(level);
  const normalizedLevel = Number.isFinite(numericLevel) ? numericLevel : 1;
  const clampedLevel = Math.min(20, Math.max(1, normalizedLevel));
  const wholeLevel = Math.floor(clampedLevel);

  return Math.ceil(wholeLevel / 4) + 1;
}
