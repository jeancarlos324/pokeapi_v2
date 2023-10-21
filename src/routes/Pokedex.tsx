import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import Button from "../components/share/Button";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { ListPokemon } from "../types/types";
import CardPokemon from "../components/cards/CardPokemon";
import "./pokedex.css";
import { setNumberPageSlice } from "../store/slice/numberPage.slice";
export const quantityPerPage = 24;

const Pokedex = () => {
  const { name: pokemonName } = useParams();
  const dispatch = useDispatch();
  const containerRef: RefObject<HTMLDivElement> = useRef(null);
  const numberPage = useSelector((state: RootState) => state.numberPage);
  const pokemons = useSelector((state: RootState) => state.pokemonListSlice);
  const [pokemonsSilce, setPokemonsSlice] = useState<ListPokemon[]>([]);
  // const [numPages, setNumPages] = useState(numberPage);
  const navigate = useNavigate();

  const totalPages = Math.ceil(pokemons!.length / quantityPerPage);
  const firstItemPage = numberPage * quantityPerPage;
  const lastItemPage = (numberPage + 1) * quantityPerPage;

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

  useEffect(() => {
    if (pokemonName && pokemonsSilce) handleCenterElement(pokemonName);
  }, [pokemonName, pokemonsSilce]);

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
    numberPage == 0
      ? dispatch(setNumberPageSlice(0))
      : dispatch(setNumberPageSlice(numberPage - 1));
  };
  const handleNextPage = () => {
    numberPage < totalPages - 1
      ? dispatch(setNumberPageSlice(numberPage + 1))
      : dispatch(setNumberPageSlice(totalPages - 1));
  };

  const handlePickPage = (button: number) => {
    dispatch(setNumberPageSlice(button - 1));
  };
  return (
    <div className="container relative justify-end w-full py-1 h-[92vh] md:h-[89vh] m-auto flex gap-3">
      <div
        className={`${
          pokemonName ? "hidden" : "flex"
        } w-full sm:flex flex-col gap-2 relative mt-auto h-[100%]`}
      >
        <div
          className={`flex justify-center flex-wrap px-5 sm:px-0 scroll-smooth gap-5 sm:gap-2 grow overflow-y-auto`}
          ref={containerRef}
        >
          {pokemonsSilce.map((pokemon) => (
            <CardPokemon
              id={pokemon.name}
              key={pokemon.url}
              url={pokemon.name}
              className={
                pokemonName && pokemonName !== pokemon.name
                  ? "opacity-40 hover:opacity-80"
                  : ""
              }
              isSelected={pokemonName !== pokemon.name}
              onClick={() => handleNavigateToPokemon(pokemon.name)}
            />
          ))}
          <div className="w-full bg-[#323232] sticky pt-1 -bottom-[1px] justify-around flex gap-1 md:gap-2 px-1 h-9 sm:pt-2 ">
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
                (numberPage - pagesQuantity < i &&
                  i < numberPage + pagesQuantity);
              return (
                <Button
                  key={button}
                  className={` text-white
                ${
                  isVisible
                    ? "border-2 border-red-500 rounded-sm w-10 "
                    : "bg-red-500 hidden md:block mt-auto h-1 md:h-2 w-1 md:w-2 rounded-md "
                }
                ${numberPage === i && "bg-red-500 rounded-sm"}`}
                  text={!isVisible ? "" : button}
                  onClick={() => handlePickPage(button)}
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
