export const getPathName = (pathName) => {
  const speciesName = pathName.SpeciesName.replace(/-/g, " ") || "";
  const breedName = pathName.BreedName
    ? pathName.BreedName.replace(/-/g, " ")
    : "";
  const petName = pathName.PetName ? pathName.PetName.replace(/-/g, " ") : "";

  return { speciesName, breedName, petName };
};
