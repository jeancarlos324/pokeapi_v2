import { useEffect, useState } from "react";
import { axiosInstance } from "../../services/axiosInstance";
import type { PokemonSpecies } from "pokenode-ts";
interface CardSpeciePokemonProps {
  id: number;
}

const CardSpeciePokemon = ({ id }: CardSpeciePokemonProps) => {
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const navLanguaje = navigator.language.split("-")[0];
  useEffect(() => {
    axiosInstance
      .get(`/pokemon-species/${id}`)
      .then(({ data }) => setSpecies(data));
  }, [id]);

  if (!species) return;

  return <div className="text-white px-4 bg-red-400"></div>;
};

export default CardSpeciePokemon;
