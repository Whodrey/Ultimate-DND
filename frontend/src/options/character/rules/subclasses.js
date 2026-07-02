export function getClassData(classOptions, classKey) {
  if (!classKey) return null;

  return classOptions.options[classKey] ?? null;
}

export function canChooseSubclass(classData, level) {
  return Boolean(classData?.subclasses?.length) && Number(level) >= 3;
}

export function getSubclassOptions(classData, level) {
  if (!canChooseSubclass(classData, level)) return null;

  return classData.subclasses;
}
