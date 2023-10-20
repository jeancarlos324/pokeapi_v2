import { RefObject, useCallback, useEffect, useRef, useState } from "react";
// import Card from "../components/Card";
import { motion } from "framer-motion";
import Button from "../components/share/Button";
// import PokemonInputType from "../components/input/PokemonInputType";
// import PokemonCharacter from "../components/input/PokemonCharacter";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingScreen } from "../store/slice/loadingScreen";
import { RootState } from "../store";
import { axiosInstance } from "../services/axiosInstance";
import { ListPokemon } from "../types/types";
import { PokemonClient } from "pokenode-ts";
import type { Pokemon } from "pokenode-ts";
import CardPokemon from "../components/cards/CardPokemon";
import "./pokedex.css";
import { useAnimation } from "framer-motion";
import Header from "../components/header";
const Pokedex = () => {
  const { name: pokemonName } = useParams();
  const controls = useAnimation();
  const containerRef: RefObject<HTMLDivElement> = useRef(null);
  const pokemons = useSelector((state: RootState) => state.pokemonListSlice);
  const [pokemonsSilce, setPokemonsSlice] = useState<ListPokemon[]>([]);
  const [numPages, setNumPages] = useState(0);
  const [typeIsActive, setTypeIsActive] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const navigate = useNavigate();
  const trainer = useSelector((state: RootState) => state.userTrainer);
  // const avatar = useSelector((state: RootState) => state.avatar);
  const dispatch = useDispatch();

  const quantityPerPage = 24;
  const totalPages = Math.ceil(pokemons!.length / quantityPerPage);
  const firstItemPage = numPages * quantityPerPage;
  const lastItemPage = (numPages + 1) * quantityPerPage;

  const setPagePokemons = useCallback(() => {
    setPokemonsSlice(pokemons!.slice(firstItemPage, lastItemPage));
  }, [pokemons, firstItemPage, lastItemPage]);

  useEffect(() => {
    setPagePokemons();
  }, [setPagePokemons]);

  const pages = new Array(totalPages).fill(0).map((item, index) => {
    let sum = 0;
    sum = index + 1;
    return item + sum;
  });

  // const dispatchTypePokemon = (e) => {
  //   dispatch(setLoadingScreen(true));
  //   const URL = e.target.value;
  //   axios
  //     .get(URL)
  //     .then((res) => setPokemons(res.data.pokemon))
  //     .finally(() => dispatch(setLoadingScreen(false)));
  // };
  // const searchPokemon = (name: string) => {
  //   console.log(name);
  //   let newURL = `https://pokeapi.co/api/v2/pokemon/${name}/`;
  //   let newName = name;
  //   const newArray = [
  //     {
  //       name: newName,
  //       url: newURL,
  //     },
  //   ];
  //   setPokemons(newArray);
  // };

  const handleCenterElement = (element: string) => {
    const container = containerRef.current;
    const selectedElement = document.getElementById(element);
    if (container && selectedElement) {
      const { offsetTop, clientHeight } = container;
      const { offsetTop: offsetTopE } = selectedElement;
      const top = offsetTopE - offsetTop - clientHeight / 3;
      const behavior = "smooth";
      container.scrollTo({ top, behavior });
    }
  };
  const handleNavigateToPokemon = (name: string) => {
    handleCenterElement(name);
    navigate(`/pokedex/${name}`);
  };

  const handlePreviusPage = () => {
    numPages == 0 ? setNumPages(0) : setNumPages(numPages - 1);
  };
  const handleNextPage = () => {
    numPages < totalPages - 1
      ? setNumPages(numPages + 1)
      : setNumPages(totalPages - 1);
  };

  return (
    <div className="container relative justify-end w-full py-1 h-[92vh] md:h-[91vh] m-auto flex gap-3">
      <div
        className={`${
          pokemonName ? "hidden" : "flex"
        } w-full sm:flex flex-col gap-2 relative mt-auto h-[100%]`}
      >
        <div
          className={`flex justify-center flex-wrap px-5 sm:px-0 gap-5 sm:gap-2 grow overflow-y-auto`}
          ref={containerRef}
        >
          {pokemonsSilce.map((pokemon) => (
            <CardPokemon
              id={pokemon.name}
              key={pokemon.url}
              url={pokemon.url}
              className={
                pokemonName && pokemonName !== pokemon.name
                  ? "opacity-40 hover:opacity-80"
                  : ""
              }
              isSelected={pokemonName !== pokemon.name}
              onClick={() => handleNavigateToPokemon(pokemon.name)}
            />
          ))}
          <div className="w-full bg-[#323232] sticky -bottom-[1px] justify-around flex gap-1 md:gap-2 px-1 h-8 sm:h-9 sm:pt-2 ">
            <Button
              icon="angle"
              className="bg-red-500 rotate-180 rounded-sm"
              onClick={handlePreviusPage}
            />
            {pages.map((button, i) => {
              const size = window.innerWidth;
              const isMovil = size < 780;
              const pagesQuantity = isMovil ? 2 : 3;
              const isVisible =
                i <= (isMovil ? 0 : 1) ||
                pages.length - (isMovil ? 1 : 2) <= i ||
                (numPages - pagesQuantity < i && i < numPages + pagesQuantity);
              return (
                <Button
                  key={button}
                  className={` text-white
                ${
                  isVisible
                    ? "border-2 border-red-500 rounded-sm w-10 "
                    : "bg-red-500 hidden md:block mt-auto h-1 md:h-2 w-1 md:w-2 rounded-md "
                }
                ${numPages === i && "bg-red-500 rounded-sm"}`}
                  text={!isVisible ? "" : button}
                  onClick={() => setNumPages(button - 1)}
                />
              );
            })}
            <Button
              icon="angle"
              className="bg-red-500 rounded-sm"
              onClick={handleNextPage}
            />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Pokedex;
