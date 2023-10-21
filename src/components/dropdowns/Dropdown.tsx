/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useMemo, useState } from "react";

type DataType = { [key: string]: any };

interface DropdownProps {
  data: DataType[];
  textField: string;
  index: string | number;
  onSelected?: (index: string | number, textField: string) => void;
  className?: string;
}
const Dropdown = ({
  data,
  className,
  textField,
  index,
  onSelected,
}: DropdownProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleListPokemon = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSearchValue(value);
    // onSelected?.(0, value);
  };

  const searchList = useMemo(() => {
    const filterList = data
      .filter(({ name }) =>
        name.toUpperCase().startsWith(searchValue.toUpperCase())
      )
      .slice(0, 15);
    return filterList;
  }, [searchValue, data]);

  const handlePickItem = (value: DataType) => {
    setSearchValue(value[textField]);
    onSelected?.(value[index], value[textField]);
  };

  return (
    <div className={`${className}`}>
      <label
        htmlFor="pokemon"
        className="grow flex bg-[#e2e2e2] border-2 rounded-md p-1"
      >
        <input
          placeholder="Use advanced search to find Pokémon by type, weakness, ability, and more!"
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
          onClick={() => onSelected?.(0, searchValue)}
        />
      </label>
      <ul className="bg-white absolute max-h-[14rem] overflow-y-auto w-full rounded-md top-9">
        {searchList.map((value) => (
          <li
            className="hover:bg-[#595959] hover:text-stone-100 duration-300 px-1 h-7 flex items-center"
            key={value[index]}
            onClick={() => handlePickItem(value)}
          >
            {value[textField]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
