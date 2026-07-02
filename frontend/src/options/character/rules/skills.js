import { classOptions } from "../options/class.js";
import { skillOptions } from "../options/skills.js";

const allSkills = Object.values(skillOptions.options).flatMap(
  (skillGroup) => skillGroup.skills,
);

export function getClassSkillChoices(classKey) {
  const skillProficiencies =
    classOptions.options[classKey]?.skill_proficiencies ?? {};
  const options =
    skillProficiencies.options === "any"
      ? allSkills
      : skillProficiencies.options ?? [];

  return {
    choose: skillProficiencies.choose ?? 0,
    options,
  };
}
