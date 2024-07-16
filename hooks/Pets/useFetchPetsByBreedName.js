import { getPetByBreed } from "@/src/services/apiPet";
import { useEffect, useState } from "react";

export const useFetchPetsByBreedName = (breedName) => {
  const [petData, setPetData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPetByBreed(breedName);
        setPetData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [breedName]);

  return { petData };
};
