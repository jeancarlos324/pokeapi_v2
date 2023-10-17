import axios from "axios";
import React, { useEffect, useState } from "react";

const PokemonInputType = ({className,onChange}) => {
  const [typePokemonData, setTypePokemonData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/type`)
      .then((res) => setTypePokemonData(res.data.results));
  }, []);


  return (
    <div className={`${className} flex flex-col items-center`}>
      <h2 className=" font-semibold text-[18px]">Choose a Type of Pokemon</h2>
      <select
        onChange={onChange}
        className="w-full h-[40px] capitalize overflow-y-auto border-2 border-red-500 rounded-lg "
        id="select"
      >
        <option className="text-slate-400 h-[40px]">Select type Pokemon</option>
        {typePokemonData.map((type) => (
          <option
            key={type.url}
            value={type.url}
            className="option-type"
          >
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonInputType;
