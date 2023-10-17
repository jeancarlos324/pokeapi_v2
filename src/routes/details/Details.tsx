import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/share/Button";
import { axiosInstance } from "../../services/axiosInstance";
import { OtherPokemonSprites, Pokemon } from "pokenode-ts";
import { DataColor } from "../../types/types";
import dataColors from "../../data/dataColors.json";

const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Pokemon | null>(null);
  const [pokemonStyle, setPokemonStyle] = useState<DataColor[] | null>();
  const [isActive, setIsActive] = useState(false);
  const getCharacter = useCallback(() => {
    axiosInstance
      .get(`pokemon/${name}/`)
      .then((res) => {
        const data = res.data as Pokemon;
        setCharacter(data);
        setIsActive(false);
        const listColor: DataColor[] = dataColors;
        const gradiantColor = data.types.map(({ type }) => {
          const findColors = listColor.find(({ name }) => name === type.name);
          return findColors!;
        });
        setPokemonStyle(gradiantColor);
      })
      .catch(() => navigate("/pokedex"));
  }, [name, navigate]);

  useEffect(() => {
    getCharacter();
  }, [getCharacter]);

  const handleLeavePage = () => navigate("/pokedex");
  const handlePickPokemon = () => setIsActive(!isActive);
  const getImages = (type: keyof OtherPokemonSprites) => {
    if (!character || !character.sprites.other) return "";
    const { front_default } = character.sprites.other[type];
    if (!front_default) return "";
    return front_default;
  };
  if (!character) {
    return;
  }
  return (
    <div
      className={`min-w-[50%] rounded-lg duration-500 delay-200`}
      style={{
        background: `${
          pokemonStyle?.length !== 1
            ? `linear-gradient(315deg, ${pokemonStyle?.[1].color} 47%,${pokemonStyle?.[0].color}  100%)`
            : pokemonStyle?.[0].color
        }`,
      }}
    >
      <Button text="close" onClick={handleLeavePage} />;
      <div className="h-full w-full">
        {/* <div className="flex h-full flex-col items-center w-full md:w-3/5 bg-[#ffffffcc] ">
          <div className="overflow-auto w-[98%] ">
            <h1
              className="text-[60px] uppercase text-slate-800 w-full text-center py-2"
              style={{
                color: `${color?.[0]}`,
              }}
            >
              {isActive ? character.name : "Who's that pokemon?"}
            </h1>
            <div className="flex justify-around w-full">
              <span className="text-[25px] flex flex-col uppercase items-center bg-slate-200 p-1 rounded-lg">
                <b className="text-[12px]">Heigth</b>
                {character.height}
              </span>
              <span className="text-[25px] flex flex-col uppercase items-center bg-slate-200 p-1 rounded-lg">
                <b className="text-[12px]">Weigth</b>
                {character.weight}
              </span>
            </div>
            <div className="flex justify-around w-full">
              <div className="flex flex-col items-center gap-4 w-1/2">
                <h3 className="text-2xl">Types</h3>
                <div className="flex justify-around w-full">
                  {character.types?.map((type) => (
                    <motion.div
                      className="bg-red-500 px-10 rounded-lg text-[20px] text-white"
                      key={type.slot}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {type.type.name}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 w-1/2 ">
                <h3 className="text-2xl">Abilities</h3>
                <div className="flex justify-around w-full">
                  {character.abilities?.map((ability) => (
                    <motion.div
                      className="bg-blue-500 px-10  rounded-lg text-[20px] text-white"
                      key={ability.ability.url}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {ability.ability.name}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[96%]">
              <h3 className="text-2xl pl-3">Stats</h3>
              <div className="grid grid-cols-2 gap-3 grow w-full p-5 bg-slate-200 rounded-3xl">
                {character.stats?.map((stat) => (
                  <div className="w-full " key={stat.stat.name}>
                    <h1 className="uppercase">{stat.stat.name}</h1>
                    <motion.div className="w-full bg-slate-400 rounded-lg text-white">
                      <div
                        className="bg-blue-400 rounded-lg pl-2"
                        style={{ width: `${0.66 * stat.base_stat}%` }}
                      >
                        {stat.base_stat}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="text-2xl py-3">Movements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-y-auto h-[200px] w-full md:w-[96%]">
              {character.moves?.map((move) => (
                <motion.div
                  className="rounded-lg uppercase p-[3px] cursor-default"
                  whileHover={{ scale: 1.1 }}
                  key={move.move.url}
                  style={{
                    background: `linear-gradient(270deg, ${color?.[0]} 47%, ${color?.[1]} 100%)`,
                  }}
                >
                  <div className="bg-white rounded-md">
                    <ChipInfo
                      className="flex flex-col"
                      content={move.move.name}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div> */}
        <div className=" flex flex-col items-center relative justify-center">
          <img
            src="svg/Signo.svg"
            alt="question"
            className="absolute h-[100px] w-[100px] z-20 cursor-pokemon"
            onClick={handlePickPokemon}
            style={{ display: `${isActive ? "none" : "block"}` }}
          />
          {!isActive && (
            <div className=" absolute h-[350px] w-[350px] ">
              <img src="image/destello3.png" alt="star" className="portal " />
            </div>
          )}
          <div className=" h-[50%] w-[50%] z-10">
            {isActive ? (
              <img
                className="h-full w-full  "
                src={getImages("official-artwork")}
                alt={character.name}
              />
            ) : (
              <img
                className="h-full w-full brightness-0 animation-frame "
                src={getImages("official-artwork")}
                alt={character.name}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
