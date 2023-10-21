import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/share/Button";
import { axiosInstance } from "../../services/axiosInstance";
import { OtherPokemonSprites, Pokemon, PokemonSpecies } from "pokenode-ts";
import { DataColor } from "../../types/types";
import dataColors from "../../data/dataColors.json";
import { addToCero, toCapitalizeCase } from "../../utils/tools";
import ChipInfo from "../../components/share/chip/ChipInfo";
import { motion } from "framer-motion";
import EvolutionCard from "../../components/cards/EvolutionCard";
import CardSurprice from "../../components/cards/CardSurprice";

const navLanguaje = navigator.language.split("-")[0];

const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Pokemon | null>(null);
  const [openSurprice, setOpenSurprice] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [pokemonStyle, setPokemonStyle] = useState<DataColor[] | null>();
  const [isActive, setIsActive] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loader, setLoader] = useState(false);
  const containerRef: RefObject<HTMLDivElement> = useRef(null);

  const getCharacter = useCallback(() => {
    setLoader(true);
    axiosInstance
      .get(`pokemon/${name}/`)
      .then((res) => {
        const data = res.data as Pokemon;
        setCharacter(data);
        const listColor: DataColor[] = dataColors;
        const gradiantColor = data.types.map(({ type }) => {
          const findColors = listColor.find(({ name }) => name === type.name);
          return findColors!;
        });
        const newTitle = toCapitalizeCase(data.name);
        document.title = `${newTitle} | Pokédex`;
        setPokemonStyle(gradiantColor);
      })
      .catch(() => navigate("/pokedex"))
      .finally(() => setLoader(false));
  }, [name, navigate]);

  useEffect(() => {
    getCharacter();
    return () => {
      document.title = "Pokédex";
      setOpenSurprice(false);
      // setCharacter(null);
      // setLoadingImage(false);
      // setIsActive(false);
    };
  }, [getCharacter]);

  useEffect(() => {
    if (character) {
      axiosInstance
        .get(`/pokemon-species/${character.id}`)
        .then(({ data }) => setSpecies(data));
    }
    // return () => {
    //   setLoadingImage(false);
    // };
  }, [character]);

  if (!character) return;
  const getImages = (type: keyof OtherPokemonSprites) => {
    if (!character.sprites.other) return "";
    const { front_default } = character.sprites.other[type];
    if (!front_default) return "";
    return front_default;
  };

  // console.log(species);
  // console.log(character);
  const pokemonInfo = species?.flavor_text_entries.filter(
    ({ language }) => language.name === navLanguaje
  );

  const handleLeavePage = () => navigate("/pokedex");
  const handlePickPokemon = () => setIsActive(!isActive);

  return (
    <div
      className={`w-full ${
        loader ? "overflow-hidden" : "overflow-auto"
      } md:min-w-[50%] rounded-lg duration-500 delay-200 relative px-1 pb-10 sm:pb-1 `}
      ref={containerRef}
    >
      {loader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full absolute z-20 flex bg-[#F06161ee] backdrop-blur-xl backdrop-opacity-20 duration-500"
        >
          <img src="/svg/loader.svg" className="w-1/6 m-auto" />
        </motion.div>
      )}
      <Button
        text="Go back to pokédex"
        className="absolute right-5 sm:right-2 top-2 rounded-lg px-3 py-1 bg-[#EF4444] text-[#F2F2F2] cursor-pointer"
        onClick={handleLeavePage}
      />
      <div
        className="rounded-b-[2rem] py-10 lg:py-0 duration-300"
        style={{
          background: `${
            pokemonStyle?.length !== 1
              ? `linear-gradient(315deg, ${pokemonStyle?.[1].color}66 47%,${pokemonStyle?.[0].color}bb  100%)`
              : pokemonStyle?.[0].color + "66"
          }`,
        }}
      >
        <h2
          className={`${
            species?.is_legendary
              ? "text-legendary"
              : species?.is_mythical
              ? "text-mitical"
              : "text-[#F2F2F2]"
          } ${
            isActive ? "text-[2.5rem]" : "text-[1.8rem] py-2"
          } text-center font-[600]`}
        >
          {isActive ? toCapitalizeCase(character.name) : "Who's that pokemon?"}{" "}
          {isActive && (
            <span className="text-[1.4rem] font-light">
              N°{addToCero(character.id)}
            </span>
          )}
        </h2>
        <div className=" w-full flex flex-col lg:flex-row justify-between h-1/2">
          <div className="w-5/6 mx-auto lg:w-2/5 h-[20rem] sm:h-[18rem] flex flex-col items-center justify-center ">
            <figure
              id={character.name}
              className={`
              h-full w-full z-0 lg:scale-[120%]  relative duration-500
              ${!loadingImage ? "opacity-0 scale-0" : "opacity-100 scale-100"}
              ${
                species?.is_legendary
                  ? "drop-shadow-legendary"
                  : species?.is_mythical
                  ? "drop-shadow-mitical"
                  : "drop-shadow-normal"
              }`}
            >
              {!isActive && (
                <>
                  <img
                    src="svg/Signo.svg"
                    alt="question"
                    className="absolute h-1/2 w-1/2 inset-[6rem] bottom-0  m-auto z-10 cursor-pointer"
                    onClick={handlePickPokemon}
                  />
                  <img
                    src="image/destello3.png"
                    alt="star"
                    className=" h-4/5 m-auto w-4/5 sm:h-full sm:w-full absolute portal -z-10 inset-5 "
                  />
                </>
              )}
              <img
                className={`h-full w-full z-0 lg:absolute rounded-3xl right-[-1.5rem] bottom-[-2.5rem] animation-frame
              ${!isActive && "brightness-0 "}`}
                src={getImages("official-artwork")}
                alt={character.name}
                onLoad={() => setLoadingImage(true)}
              />
            </figure>
          </div>
          <div className="w-full lg:w-3/5 px-4 gap-5 flex flex-col ">
            <div className=" text-white">
              {species?.is_legendary && (
                <p className="text-xl text-center sm:text-left text-legendary font-extrabold">
                  Legendary
                </p>
              )}
              {species?.is_mythical && (
                <p className="text-xl text-center sm:text-left text-mitical font-extrabold">
                  Mythical
                </p>
              )}
              <p className="text-justify ">
                {pokemonInfo?.at(-1)?.flavor_text}
              </p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-[#2e2e2ed3] rounded-lg backdrop-blur-xl p-2  justify-around w-full lg:w-[92%] ml-auto">
              <ChipInfo text={`${character.height}m`} icon="height" />
              <ChipInfo text={`${character.weight}Kg`} icon="weigth" />
              <div className="flex items-center gap-1">
                <ChipInfo icon="male" />
                {species?.has_gender_differences && <ChipInfo icon="female" />}
                <span className="text-white capitalize font-bold">
                  {species?.has_gender_differences ? "male female" : "male"}{" "}
                </span>
              </div>
              {species?.habitat && (
                <ChipInfo text={species?.habitat.name} icon="habitat" />
              )}
            </div>
            <div className="flex  w-full lg:w-[92%] ml-auto justify-between pr-2 lg:pb-2">
              <div className="flex flex-col  gap-1 text-white pb-2">
                <span className="font-extrabold uppercase">Main Abilities</span>
                <div className="flex lg:grid lg:grid-cols-2 flex-col gap-3">
                  {character &&
                    character.abilities.map((ability) => (
                      <ChipInfo
                        className="h-7"
                        key={ability.ability.url}
                        text={ability.ability.name}
                        icon="skill"
                      />
                    ))}
                </div>
              </div>
              <div className="flex flex-col text-white ">
                <span className="font-extrabold lg:hidden uppercase">
                  Types
                </span>
                <div className="flex gap-5 font-semibold items-center lg:justify-end">
                  {pokemonStyle?.map((type) => (
                    <figure
                      key={type.id}
                      className="w-10 h-fit flex flex-col items-center"
                      onClick={() =>
                        ["pikachu", "charmander"].includes(character.name) &&
                        setOpenSurprice(!openSurprice)
                      }
                    >
                      <img
                        className={`h-full w-full rounded-[50%] `}
                        src={type.image}
                      />
                      <span>{type.name}</span>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          loader && "hidden"
        } flex flex-col items-center w-full pt-4 lg:pt-12 text-white`}
      >
        <div className="w-full px-1">
          <div className="w-full">
            <h3 className="text-2xl font-extrabold pb-2">Stats</h3>
            <div className="grid grid-cols-2 gap-3 grow w-full py-5 px-2 sm:p-5 text-[#2e2e2ed3] bg-slate-200 rounded-md">
              {character.stats?.map((stat) => (
                <div className="w-full" key={stat.stat.name}>
                  <h3 className="uppercase font-bold pl-1">{stat.stat.name}</h3>
                  <div className="w-full bg-slate-400 rounded-xl text-white">
                    <span
                      className="h-full rounded-xl pl-2 flex items-center duration-500"
                      style={{
                        width: `${6.6 * Math.ceil(stat.base_stat / 16.66)}%`,
                        background: `${pokemonStyle?.[0].color}`,
                      }}
                    >
                      {stat.base_stat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {openSurprice && (
            <div className="relative w-full">
              <img
                src="/image/surprice.jpeg"
                className="absolute z-10 w-12 right-0 top-2"
                onClick={() => setOpenCard(true)}
              />
            </div>
          )}
          <div>
            <h3 className="text-2xl py-3">Evolutions</h3>
            {species && (
              <EvolutionCard
                url={species.evolution_chain.url}
                containerRef={containerRef}
              />
            )}
          </div>
        </div>
        <div className="w-full h-12"></div>
      </div>
      <CardSurprice
        isOpen={openCard}
        onChangeStatus={() => setOpenCard(false)}
      />
    </div>
  );
};

export default Details;
