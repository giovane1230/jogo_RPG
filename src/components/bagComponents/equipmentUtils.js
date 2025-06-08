export function getItemSlot(item) {
  const category = (
    item.type ||
    item.equipment_category?.name ||
    ""
  ).toLowerCase();

  const itemIndex = item.index?.toLowerCase() || "";
  const itemName = item.name?.toLowerCase() || "";
  const itemCategory = item.category?.toLowerCase() || "";

  if (
    itemCategory === "shield" ||
    itemIndex.includes("shield") ||
    itemName.includes("shield")
  ) {
    return "shield";
  }

  if (
    ["light-armor", "medium-armor", "heavy-armor", "armor"].includes(category)
  )
    return "armor";

  if (item.properties?.some((prop) => prop.index === "two-handed")) {
    return "two-handed";
  }

  if (category === "weapon") return "weapon";

  if (
    [
      "arcane-foci",
      "druidic-foci",
      "holy-symbols",
      "staff",
      "wand",
      "rod",
      "focus",
    ].includes(category)
  )
    return "focus";

  if (category === "ring") return "ring";
  if (category === "wondrous-items") return "wondrousItem";

  return null;
}

export function isProficient(character, item) {
  if (character.class?.index === "monk") {
    return true;
  }
  const profs = character.proficiencies.map((p) => p.name.toLowerCase());
  const itemName = item.name?.toLowerCase();
  const itemType = item.type?.toLowerCase();
  let itemCategoryRaw = item.category?.toLowerCase() || "";
  let itemCategory = itemCategoryRaw;

  const isShield =
    item.index?.toLowerCase().includes("shield") ||
    itemCategoryRaw === "shield";

  if (isShield) {
    itemCategory = "shields";
  } else if (itemType === "armor") {
    if (["light", "medium", "heavy"].includes(itemCategoryRaw)) {
      itemCategory = `${itemCategoryRaw} armor`;
    }
  } else if (itemType === "weapon") {
    if (["simple", "martial"].includes(itemCategoryRaw)) {
      itemCategory = `${itemCategoryRaw} weapons`;
    }
  }

  const isProf =
    profs.includes(itemCategory) ||
    (profs.includes("all armor") && itemType === "armor" && !isShield) ||
    (profs.includes("all weapons") && itemType === "weapon") ||
    profs.includes("quarterstaffs");
  profs.includes(itemName);

  return isProf;
}