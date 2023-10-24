import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Button from "../share/Button";
import { useState } from "react";
import { dataColor } from "../../utils/dataColor";
import {
  getListPokemon,
  setPokemonList,
} from "../../store/slice/pokemonList.slice";
import axios from "axios";
import { NamedAPIResource, PokemonColor } from "pokenode-ts";
import { setNumberPageSlice } from "../../store/slice/numberPage.slice";

interface CardViewOptionsProps {
  onChangeStatus?: () => void;
}
const CardViewOptions = ({ onChangeStatus }: CardViewOptionsProps) => {
  const dispatch = useDispatch();
  const types = useSelector((state: RootState) => state.typePokemonSlice);
  const colors = useSelector((state: RootState) => state.colorPokemonSlice);
  const habitat = useSelector((state: RootState) => state.habitatPokemonSlice);
  const typesImages = types.map((type) => {
    const image = dataColor.find((value) => value.name === type.name)!.image;
    return { ...type, image };
  });
  const [openTypes, setOpenTypes] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openHabitat, setOpenHabitat] = useState(false);
  const [loadingQuery, setLoadingQuery] = useState(false);
  const handleOpenTypes = () => setOpenTypes(!openTypes);
  const handleOpenColor = () => setOpenColor(!openColor);
  const handleOpenHabitat = () => setOpenHabitat(!openHabitat);

  const handlePickType = async (
    url: string,
    type: "type" | "color" | "habitat"
  ) => {
    // onChangeStatus?.();
    setLoadingQuery(true);
    if (type === "type") {
      const result: { pokemon: NamedAPIResource }[] = await axios
        .get(url)
        .then(({ data }) => data.pokemon);
      const pokemonsByType = result.map(({ pokemon }) => pokemon);
      dispatch(setPokemonList(pokemonsByType));
    }
    if (type === "color") {
      const { pokemon_species }: PokemonColor = await axios
        .get(url)
        .then(({ data }) => data);
      dispatch(setPokemonList(pokemon_species));
    } else {
      const { pokemon_species }: PokemonColor = await axios
        .get(url)
        .then(({ data }) => data);
      dispatch(setPokemonList(pokemon_species));
    }
    setLoadingQuery(false);
    handleClosing();
    dispatch(setNumberPageSlice(0));
  };
  const handleGetAllPokemons = () => {
    getListPokemon(dispatch);
    handleClosing();
    dispatch(setNumberPageSlice(0));
  };
  const handleClosing = () => {
    onChangeStatus?.();
    setOpenColor(false);
    setOpenTypes(false);
    setOpenHabitat(false);
  };
  return (
    <div className="bg-[#323232] right-0 top-9 text-[#f2f2f2] w-[24rem] min-h-[10rem] max-h-[30rem] z-10 absolute overflow-y-auto rounded-md px-2 pb-2 ">
      <div className="sticky top-0  w-full flex z-10 border-t-4 border-[#323232] ">
        {/* <Button
          icon="close"
          className="ml-auto h-7 bg-[#f2f2f2]  rounded-full px-[2px] hover:rotate-90 duration-500 "
          onClick={handleClosing}
        /> */}
        {loadingQuery && <span className="mx-auto text-black px-5 rounded-md text-center bg-yellow-200">Loading...</span>}
      </div>
      <div className="flex flex-col gap-2 py-2">
        <Button
          className={`w-full justify-between h-9 items-center font-semibold capitalize rounded-md px-2 flex flex-row-reverse
            duration-500  bg-red-500 hover:text-[#f2f2f2] hover:border-red-500`}
          icon="Poké_Ball_icon"
          iconClassName="h-full w-12 drop-shadow-mitical swing"
          text="All Pokemon List"
          onClick={handleGetAllPokemons}
        />
        <Button
          className={`w-full justify-between h-9 items-center font-semibold capitalize rounded-md p-2 flex flex-row-reverse
            duration-500 border-2 hover:bg-red-500 hover:text-[#f2f2f2] hover:border-red-500 ${
              openTypes
                ? "bg-red-500 border-red-500 text-[#f2f2f2]"
                : "bg-[#f2f2f2] text-[#323232]"
            }`}
          icon="caret"
          text="Pokemon Types List"
          onClick={handleOpenTypes}
        />
        {openTypes && (
          <div className="grid grid-cols-4 duration-200 gap-3 ">
            {typesImages.map((types) => (
              <figure
                key={types.name}
                className="flex flex-col justify-center items-center hover:scale-125 hover:drop-shadow-logo duration-300"
                onClick={() => handlePickType(types.url, "type")}
              >
                <img
                  src={types.image}
                  alt={types.name}
                  className={`rounded-3xl opacity-80 w-10
                   ${types.name === "shadow" && "bg-[#F2F2F2]"}`}
                />
                <span className="text-sm">{types.name}</span>
              </figure>
            ))}
          </div>
        )}
        <Button
          className={`w-full justify-between h-9 items-center font-semibold capitalize rounded-md p-2 flex flex-row-reverse
            duration-500 border-2 hover:bg-red-500 hover:text-[#f2f2f2] hover:border-red-500 ${
              openColor
                ? "bg-red-500 border-red-500 text-[#f2f2f2]"
                : "bg-[#f2f2f2] text-[#323232]"
            }`}
          icon="caret"
          text="Pokemon Color List"
          onClick={handleOpenColor}
        />
        {openColor && (
          <div className="grid grid-cols-4 duration-200 gap-3 ">
            {colors.map((types) => (
              <div
                key={types.name}
                className="flex flex-col justify-center items-center hover:scale-125 duration-300"
                onClick={() => handlePickType(types.url, "color")}
              >
                <span
                  className={`background-${types.name} w-10 h-10 rounded-full`}
                ></span>
                <span className="text-sm">{types.name}</span>
              </div>
            ))}
          </div>
        )}
        <Button
          className={`w-full justify-between h-9 items-center font-semibold capitalize rounded-md p-2 flex flex-row-reverse
            duration-500 border-2 hover:bg-red-500 hover:text-[#f2f2f2] hover:border-red-500 ${
              openHabitat
                ? "bg-red-500 border-red-500 text-[#f2f2f2]"
                : "bg-[#f2f2f2] text-[#323232]"
            }`}
          icon="caret"
          text="Pokemon Habitats List"
          onClick={handleOpenHabitat}
        />
        {openHabitat && (
          <div className="grid grid-cols-3 duration-200 gap-3 ">
            {habitat.map((types) => (
              <div
                key={types.name}
                className="flex flex-col justify-center items-center hover:scale-110 hover:drop-shadow-logo duration-300"
                onClick={() => handlePickType(types.url, "habitat")}
              >
                <span className="text-sm bg-white text-black py-2 w-full text-center font-semibold rounded-xl capitalize">
                  {types.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardViewOptions;
