import axios from "axios";
import { useCallback, useEffect, useState } from "react";
// import ChipInfo from "./Chips/ChipInfo";
import dataColors from "../../data/dataColors.json";
import { OtherPokemonSprites, Pokemon } from "pokenode-ts";
import { DataColor } from "../../types/types";
// import LoadingScreen from "./LoadingScreen";

interface CardPokemonProps {
  url: string;
  style?: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const CardPokemon = ({
  url,
  onClick,
  className,
  isSelected,
}: CardPokemonProps) => {
  const [data, setData] = useState<Pokemon | null>(null);
  const [pokemonStyling, setPokemonStyling] = useState<DataColor[] | null>();

  const getPokemon = useCallback(() => {
    axios.get(url).then((res) => {
      const data = res.data as Pokemon;
      setData(data);
      const listColor: DataColor[] = dataColors;
      const gradiantColor = data.types.map(({ type }) => {
        const findColors = listColor.find(({ name }) => name === type.name);
        return findColors!;
      });
      setPokemonStyling(gradiantColor);
    });
  }, [url]);

  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  const getImages = (type: keyof OtherPokemonSprites) => {
    if (!data || !data.sprites.other) return "";
    const { front_default } = data.sprites.other[type];
    if (!front_default) return "";
    return front_default;
  };
  return (
    <div
      className={`flex flex-col w-full md:w-[15.2rem] items-center rounded-lg drop-shadow-xl cursor-pointer duration-500 ${className}`}
      style={{
        background: `${
          pokemonStyling?.length !== 1
            ? `linear-gradient(315deg, ${pokemonStyling?.[1].color} 47%,${pokemonStyling?.[0].color}  100%)`
            : pokemonStyling?.[0].color
        }`,
        color: `${pokemonStyling?.[0].color}`,
      }}
      onClick={onClick}
    >
      <div className="relative flex h-[150px] w-full justify-center">
        <div className="h-[2rem] w-[2rem] flex gap-1 absolute top-1 left-1">
          {pokemonStyling?.map((style) => (
            <img
              key={style.id}
              src={style.image}
              alt={style.name}
              className="rounded-sm border-[#F2F2F2] border-[1px] opacity-80"
            />
          ))}
        </div>
        <div
          className={`h-[200px] w-[200px] relative ${
            !isSelected ? "scale-[140%] " : "hover:scale-125"
          }  duration-500`}
        >
          <img
            className="h-1/3 w-full absolute brightness-[0.3] bottom-3 left-0 "
            src={getImages("official-artwork")}
            alt={getImages("official-artwork")}
          />
          <img
            className="h-full w-full absolute"
            src={getImages("official-artwork")}
            alt={getImages("official-artwork")}
          />
        </div>
      </div>
      <div className="flex flex-col w-[98%] mb-1 rounded-b-lg  bg-[#F2F2F2] items-center pt-14 ">
        <h2 className="uppercase text-[22px] font-bold">{data?.name}</h2>
        <div className="uppercase text-center ">
          <h3 className="text-[14px] text-slate-700">
            N° {data?.id.toString().padStart(4, "0")}
          </h3>
          <div className="flex gap-2">
            {data?.types.map((type, index) => (
              <span
                className="text-[16px] font-semibold"
                key={type.type.name}
                style={{ color: `${pokemonStyling?.[index].color}` }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        {/* <div className="grid grid-cols-2 grow w-full p-5">
          {data?.stats.map((stat) => (
            <ChipInfo
              className="flex flex-col"
              key={stat.stat.name}
              title={stat.stat.name}
              content={stat.base_stat}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default CardPokemon;
