import { getCurrentPets } from "@/src/services/apiPet";
import { useEffect, useState } from "react";

export const useFetchPet = (pid) => {
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCurrentPets(pid);
        setPetData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1200);
      }
    };

    fetchData();
  }, [pid]);
  return { petData, loading };
};
