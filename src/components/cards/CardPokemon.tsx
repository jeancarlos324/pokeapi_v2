import { useCallback, useEffect, useState } from "react";
import { OtherPokemonSprites, Pokemon } from "pokenode-ts";
import { DataColor } from "../../types/types";
import { addToCero } from "../../utils/tools";
import { motion } from "framer-motion";
import { dataColor } from "../../utils/dataColor";
import { axiosInstance } from "../../services/axiosInstance";
interface CardPokemonProps {
  url: string;
  id?: string;
  style?: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const CardPokemon = ({
  url,
  id,
  onClick,
  className,
  isSelected,
}: CardPokemonProps) => {
  const [data, setData] = useState<Pokemon | null>(null);
  const [loaderImage, setLoaderImage] = useState(false);
  const [pokemonStyling, setPokemonStyling] = useState<DataColor[] | null>();

  const getPokemon = useCallback(() => {
    axiosInstance.get(`pokemon/${url}`).then((res) => {
      const data = res.data as Pokemon;
      setData(data);
      const listColor: DataColor[] = dataColor;
      const gradiantColor = data.types.map(({ type }) => {
        const findColors = listColor.find(({ name }) => name === type.name);
        return findColors!;
      });
      setPokemonStyling(gradiantColor);
    });
    // .finally(() => setLoaderImage(false));
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

  const gradiantColor = () => {
    return pokemonStyling?.length !== 1
      ? `linear-gradient(315deg, ${pokemonStyling?.[1].color} 47%,${pokemonStyling?.[0].color}  100%)`
      : `${pokemonStyling?.[0].color}`;
  };
  return (
    <motion.div
      id={id}
      initial={{
        backgroundImage: "url(/svg/loader.svg)",
        backgroundColor: "#e2e2e2",
      }}
      animate={{ background: gradiantColor() }}
      className={`flex flex-col bg-no-repeat bg-center
      ${!loaderImage && "min-h-[330px] sm:min-h-[300px]"}
       w-full  md:w-[15.2rem]
      ${!isSelected ? "drop-shadow-selected  opacity-1" : ""}
      items-center rounded-lg cursor-pointer duration-500 delay-150
       ${className}`}
      onClick={onClick}
    >
      <div
        className={`relative flex h-[190px] sm:h-[160px] w-full justify-center`}
      >
        <motion.div
          className={`h-[2rem] w-[2rem] flex gap-1 absolute top-1 left-1 duration-500 ${
            loaderImage ? "scale-100" : "scale-0"
          }`}
        >
          {pokemonStyling?.map((style) => (
            <img
              key={style.id}
              src={style.image}
              alt={style.name}
              className=" border-[#F2F2F2] border-[1px] rounded-3xl opacity-80"
            />
          ))}
        </motion.div>
        <figure
          className={`h-[250px] w-[250px] sm:h-[200px] sm:w-[200px] relative ${
            !isSelected ? "scale-[150%] " : "hover:scale-125"
          } ${!loaderImage ? "opacity-0" : "opacity-100"}   duration-500`}
        >
          <img
            className={`h-1/3 w-full absolute brightness-[0.3] bottom-0 sm:bottom-3 left-0`}
            src={getImages("official-artwork")}
            alt={getImages("official-artwork")}
          />
          <img
            className={`h-full w-full absolute -bottom-3 sm:bottom-0`}
            src={getImages("official-artwork")}
            alt={getImages("official-artwork")}
            onLoad={() => setLoaderImage(true)}
          />
        </figure>
      </div>
      {data && (
        <div className="flex flex-col h-auto w-[98%] mb-1 rounded-b-lg  bg-[#ffffffb9] items-center pt-14 ">
          <h2 className="uppercase text-[22px] font-bold">{data?.name}</h2>
          <div className="uppercase text-center">
            <h3 className="text-[14px] text-slate-700">
              N° {addToCero(data?.id)}
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
        </div>
      )}
    </motion.div>
  );
};

export default CardPokemon;
