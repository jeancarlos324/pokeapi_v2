import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dataColors from "../data/dataColors.json";
import question from "../assets/Signo.svg";
import destello from "../assets/destello3.png";
import ChipInfo from "../components/Chips/ChipInfo";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setLoadingScreen } from "../store/slice/loadingScreen";
import { axiosInstance } from "../services/axiosInstance";

export const PokemonInfo = () => {
  const [character, setCharacter] = useState([]);
  const [color, setColor] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  const getPokemonInfo = useCallback(() => {
    dispatch(setLoadingScreen(true));
    axiosInstance
      .get(`pokemon/${params.id}/`)
      .then(({ data }) => {
        setCharacter(data);
        console.log(data);
      })
      .finally(() => dispatch(setLoadingScreen(false)));
  }, [dispatch, params]);

  useEffect(() => {
    getPokemonInfo;
  }, [getPokemonInfo]);

  const newColor = () => {
    const typeColor = character.types?.map((types) => {
      return dataColors
        .filter((type) => type.name == types.type.name)
        .map((item) => item.color)
        .toString();
    });
    if (typeColor?.length === 1) {
      let newTypeColor = [typeColor.toString().concat("cc")];
      setColor(newTypeColor.concat(typeColor.toString().concat("33")));
    } else {
      setColor(typeColor);
    }
  };
  // console.log(character);
  return (
    <div
      className="h-screen w-screen flex  md:flex-row justify-start md:justify-center flex-wrap-reverse bg-gradient-to-r from-yellow-400 to-orange-600"
      style={{
        background: `linear-gradient(45deg, ${color?.[0]} 47%, ${color?.[1]} 100%)`,
      }}
    >
      <div className="flex h-full flex-col items-center w-full md:w-3/5 bg-[#ffffffcc] ">
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
      </div>
      <div className=" flex flex-col items-center relative w-full md:w-2/5  justify-center  md:h-full">
        <div
          className=" absolute h-[100px] w-[100px]  z-20"
          onClick={() => {
            setIsActive(!isActive);
            newColor();
          }}
          style={{ display: `${isActive ? "none" : "block"}` }}
        >
          <img src={question} alt={question} className="animation-frame" />
        </div>
        {!isActive && (
          <div className=" absolute h-[350px] w-[350px] ">
            <img src={destello} alt={destello} className="portal " />
          </div>
        )}
        <div className=" h-[300px] w-[300px] z-10">
          {isActive ? (
            <img
              className="h-full w-full  "
              src={character.sprites?.other["official-artwork"].front_default}
              alt={character.sprites?.other["official-artwork"].front_default}
            />
          ) : (
            <img
              className="h-full w-full brightness-0 animation-frame "
              src={character.sprites?.other["official-artwork"].front_default}
              alt={character.sprites?.other["official-artwork"].front_default}
            />
          )}
        </div>
      </div>
    </div>
  );
};
