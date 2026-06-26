async function getSpells() {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://www.dnd5eapi.co/api/2014/spells",
      requestOptions,
    );

    const result = await response.json();
    const detailedSpells = await mapWithConcurrency(
      result.results ?? [],
      8,
      (spell) => getSpellDetails(spell, requestOptions),
    );

    return orderSpells(detailedSpells);
  } catch (error) {
    console.error(error);
    return {};
  }
}

async function getSpellDetails(spell, requestOptions) {
  try {
    const response = await fetch(
      "https://www.dnd5eapi.co" + spell.url,
      requestOptions,
    );

    if (!response.ok) {
      return withSpellSubtitle(spell);
    }

    const details = await response.json();

    return withSpellSubtitle({ ...spell, ...details });
  } catch (error) {
    console.error(error);
    return withSpellSubtitle(spell);
  }
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = [];
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, worker),
  );

  return results;
}

function orderSpells(spells) {
  const orderedSpells = {};

  spells.forEach((spell) => {
    const level = spell.level;

    if (!orderedSpells[level]) {
      orderedSpells[level] = [];
    }

    orderedSpells[level].push(spell);
  });
  return orderedSpells;
}

function withSpellSubtitle(spell) {
  return {
    ...spell,
    subtitle: getSpellSubtitle(spell),
  };
}

function getSpellSubtitle(spell) {
  const description = Array.isArray(spell.desc)
    ? spell.desc.join(" ")
    : spell.desc ?? "";
  const shortDescription = trimToFirstSentence(description);

  return truncateText(shortDescription || getSpellFallbackSubtitle(spell), 120);
}

function trimToFirstSentence(text) {
  const normalizedText = String(text).replace(/\s+/g, " ").trim();
  const sentenceMatch = normalizedText.match(/^.+?[.!?](\s|$)/);

  return sentenceMatch?.[0]?.trim() ?? normalizedText;
}

function truncateText(text, maxLength) {
  const normalizedText = String(text).replace(/\s+/g, " ").trim();

  if (normalizedText.length <= maxLength) return normalizedText;

  return normalizedText.slice(0, maxLength - 1).trimEnd() + "...";
}

function getSpellFallbackSubtitle(spell) {
  const levelLabel = Number(spell.level) === 0 ? "Cantrip" : `Level ${spell.level}`;
  const schoolLabel = spell.school?.name;

  return [levelLabel, schoolLabel].filter(Boolean).join(" - ");
}

export const spells = await getSpells();
