import { ChangeEvent, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { NamedAPIResource } from "pokenode-ts";
import { useNavigate } from "react-router-dom";
import { quantityPerPage } from "../../routes/Pokedex";
import { setNumberPageSlice } from "../../store/slice/numberPage.slice";
import Button from "../share/Button";
import CardViewTypes from "../cards/CardViewTypes";
import CardViewOptions from "../cards/CardViewOptions";

const HeaderPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpenViewTypes, setIsOpenViewTypes] = useState(false);
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const pokemons = useSelector((state: RootState) => state.pokemonListSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleListPokemon = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSearchValue(value);
  };

  const searchList: NamedAPIResource[] = useMemo(() => {
    const filterList = pokemons
      .filter(({ name }) =>
        name.toUpperCase().startsWith(searchValue.toUpperCase())
      )
      .slice(0, 15);
    return filterList;
  }, [searchValue, pokemons]);

  const handleNavigateTo = (name: string) => {
    const index = pokemons.findIndex((pokemon) => pokemon.name === name) + 1;
    const numberPage = Math.ceil(index / quantityPerPage) - 1;
    dispatch(setNumberPageSlice(numberPage));
    setSearchValue("");
    navigate(`/pokedex/${name}`);
  };
  const handleCloseModal = () => setIsOpenViewTypes(false);
  const handleOpenModal = () => setIsOpenViewTypes(true);
  const handleCloseOptions = () => setIsOpenOptions(false);
  const handleOpenOptions = () => setIsOpenOptions(!isOpenOptions);
  return (
    <div className="h-[6vh] md:h-[10vh] bg-red-500 z-10">
      <div className="flex gap-2 justify-between md:justify-end items-center px-1 container mx-auto h-full">
        <div className="grow flex justify-start">
          <figure className="flex items-center font-extrabold text-2xl bg-[#3333337d] px-2 rounded-md ">
            <span className="text-[#f2f2f2]  hidden md:block">Pokedex</span>
            <span className="text-[#f2f2f2]  md:hidden">Px</span>
            <img
              src="svg/Poké_Ball_icon.svg"
              className="h-9 md:h-12 swing drop-shadow-logo"
              alt="logo"
            />
          </figure>
        </div>
        <div className="relative sm:flex gap-2 hidden  md:w-1/3 xl:w-1/6">
          <Button
            className="bg-[#f2f2f2] w-full justify-between h-9 items-center rounded-md p-2 flex flex-row-reverse
            duration-500 hover:border-[#f2f2f2] border-2 hover:bg-red-500 hover:text-[#f2f2f2]"
            icon="caret"
            text="Show advance options..."
            onClick={handleOpenOptions}
          />
          {isOpenOptions && <CardViewOptions  onChangeStatus={handleCloseOptions}/>}
        </div>
        <div className="relative flex gap-2 grow sm:grow-0  md:w-1/3 xl:w-1/5 z-10">
          <label
            htmlFor="pokemon"
            className="grow flex bg-[#e2e2e2] border-2 rounded-md p-1"
          >
            <input
              placeholder="Use advanced search to find Pokémon by type, weakness, ability, and
              more!"
              id="pokemon"
              type="search"
              onChange={handleListPokemon}
              className=" bg-transparent grow text-md"
              value={searchValue}
            />
            <img
              src="/svg/search.svg"
              alt="search"
              className="h-6 w-6"
              onClick={() => handleNavigateTo(searchValue)}
            />
          </label>
          {searchValue && (
            <ul className="bg-white absolute max-h-[14rem] overflow-y-auto w-full rounded-md top-9">
              {searchList.map(({ name }) => (
                <li
                  className="hover:bg-[#595959] hover:text-stone-100 duration-300 px-1 h-7 flex items-center"
                  key={name}
                  onClick={() => handleNavigateTo(name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className="hidden xl:flex bg-emerald-400 text-[#323232] w-1/5 h-[63%] p-1 rounded-md overflow-hidden text-ellipsis">
          Search for a Pokémon by name or using its National Pokédex number
        </span>
        <div className="sm:hidden">
          <img
            src="/svg/menu.svg"
            alt="search"
            className="h-8 w-8"
            onClick={handleOpenModal}
          />
        </div>
      </div>
      <CardViewTypes
        isOpen={isOpenViewTypes}
        onChangeStatus={handleCloseModal}
      />
    </div>
  );
};

export default HeaderPage;
