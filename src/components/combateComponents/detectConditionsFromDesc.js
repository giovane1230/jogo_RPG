import conditionsData from "../buffDebuffsComponents/conditionsData";

export default function detectConditionsFromDesc(desc) {
  const conds = [];
  for (const key of Object.keys(conditionsData)) {
    const regex = new RegExp(`\\b${key}\\b`, "i");
    if (regex.test(desc)) conds.push({ index: key });
  }
  return conds;
}