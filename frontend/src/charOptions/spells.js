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

    return orderSpells(result.results);
  } catch (error) {
    console.error(error);
    return {};
  }
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

export const spells = await getSpells();
