import { useCallback, useEffect, useState } from "react";
// import Card from "../components/Card";
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

const Pokedex = () => {
  const { name: pokemonName } = useParams();
  const [pokemons, setPokemons] = useState<ListPokemon[]>([]);
  const [pokemonsSilce, setPokemonsSlice] = useState<ListPokemon[]>([]);
  const [numPages, setNumPages] = useState(0);
  const [typeIsActive, setTypeIsActive] = useState(false);

  const navigate = useNavigate();
  const trainer = useSelector((state: RootState) => state.userTrainer);
  const avatar = useSelector((state: RootState) => state.avatar);
  const dispatch = useDispatch();

  const quantityPerPage = 12;
  const totalPages = Math.ceil(pokemons.length / quantityPerPage);
  const firstItemPage = numPages * quantityPerPage;
  const lastItemPage = (numPages + 1) * quantityPerPage;

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    // dispatch(setLoadingScreen(true));
    axiosInstance.get(`/pokemon?limit=200&offset=0`).then((res) => {
      setPokemons(res.data.results);
    });
    // .finally(() => dispatch(setLoadingScreen(false)));
  };

  const setPagePokemons = useCallback(() => {
    setPokemonsSlice(pokemons.slice(firstItemPage, lastItemPage));
  }, [pokemons, firstItemPage, lastItemPage]);

  useEffect(() => {
    setPagePokemons();
  }, [setPagePokemons]);

  // const pages = new Array(totalPages).fill(0).map((item, index) => {
  //   let sum = 0;
  //   sum = index + 1;
  //   return item + sum;
  // });

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

  const handleNavigateToPokemon = (name: string) => {
    navigate(`/pokedex/${name}`);
  };

  return (
    <div className=" container w-full h-full m-auto ">
      {/* <p className="flex gap-5 w-full bg-gradient-to-r from-red-500 to-yellow-400 p-2 capitalize text-[20px] text-white">
        <img
          src={avatar}
          className=" object-cover w-[100px] h-[100px] border-2 rounded-xl"
        />
        <div className="flex flex-col justify-start">
          <span>Wellcome</span>
          <span className="text-slate-800 uppercase font-semibold">
            {trainer}
          </span>
          <span>here you can see all the pokemons in the world!!</span>
        </div>
      </p> */}
      {/* <Button
        className="bg-red-500 px-2 rounded-xl text-white"
        onClick={() => setTypeIsActive(!typeIsActive)}
        text={typeIsActive ? "Search by Character" : "Search by Type"}
      /> */}
      {/* {typeIsActive ? (
        <PokemonInputType
          className=" w-[90%] md:w-1/3"
          onChange={dispatchTypePokemon}
        />
      ) : (
        <PokemonCharacter
          addPokemon={searchPokemon}
          className=" w-[90%] md:w-1/3"
        />
      )}
      <div className=" w-[90%] md:w-2/3 flex flex-col">
        <h2 className="flex justify-center uppercase font-medium text-center gap-2">
          <span>Page:</span>
          <b>{numPages + 1}</b>
        </h2>
        <div className="w-full flex justify-around">
          <Button
            text="<"
            className="button-pages"
            onClick={() =>
              numPages == 0 ? setNumPages(0) : setNumPages(numPages - 1)
            }
          />
          <button style={{ textUnderlineOffset: "2px" }}></button>
          {pages.map((button) => (
            <Button
              key={button}
              className="button-pokemon"
              text={button}
              onClick={() => setNumPages(button - 1)}
            />
          ))}
          <Button
            text=">"
            className="button-pages"
            onClick={() =>
              numPages < totalPages - 1
                ? setNumPages(numPages + 1)
                : setNumPages(totalPages - 1)
            }
          />
        </div>
      </div>*/}
      <div className={pokemonName ? "bg-red-400" : "bg-blue-200"}>gaaa</div>
      <div className="w-full flex max-h-[96%] sm:max-h-[85%] gap-2">
        <div
          className={`${
            pokemonName ? "hidden" : "flex"
          } sm:flex justify-center flex-wrap overflow-auto px-5 sm:px-0 pt-5 sm:pt-0 gap-5 sm:gap-2  grow`}
        >
          {pokemonsSilce.map((pokemon) => (
            <CardPokemon
              key={pokemon.url}
              url={pokemon.url}
              className={
                pokemonName && pokemonName !== pokemon.name ? "opacity-40" : ""
              }
              isSelected={pokemonName !== pokemon.name}
              onClick={() => handleNavigateToPokemon(pokemon.name)}
            />
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Pokedex;
