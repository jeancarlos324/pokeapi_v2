import axios from "axios";
import { RefObject, useEffect, useState } from "react";
import type { EvolutionChain, ChainLink } from "pokenode-ts";
import { addToCero } from "../../utils/tools";
import { useNavigate, useParams } from "react-router-dom";
interface EvolutionCardProps {
  url: string;
  containerRef?: RefObject<HTMLDivElement>;
}
interface EvolutionImagesProps {
  image: string;
  name: string;
  order?: number;
  containerRef?: RefObject<HTMLDivElement>;
}
interface EvolutionRecursiveCardProps {
  data: ChainLink;
  order: number;
  containerRef?: RefObject<HTMLDivElement>;
}

const EvolutionImages = ({
  image,
  name,
  containerRef,
}: EvolutionImagesProps) => {
  const [loaderImage, setLoaderImage] = useState(false);
  const navigate = useNavigate();
  const { name: pokemonName } = useParams();
  useEffect(() => {
    return () => {
      // setLoaderImage(false);
    };
  }, [image]);

  const handleCenterElement = () => {
    const container = containerRef?.current;
    if (container) {
      const top = 0;
      const behavior = "smooth";
      container.scrollTo({ top, behavior });
    }
  };

  const handleLoaderImage = () => setLoaderImage(true);
  const handleNavigateTo = () => {
    handleCenterElement();
    navigate(`/pokedex/${name}`);
  };

  return (
    <div
      className={`flex flex-col gap-2	 mx-auto items-center relative h-[16rem] w-[14rem]
      `}
    >
      <img
        src={image}
        className={`rounded-[50%] border-4 cursor-pointer ${
          pokemonName === name
            ? "bg-[#323232] scale-105"
            : "bg-[#ffffff66] scale-90"
        }  shadow-md duration-500 delay-100
        ${loaderImage ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
        onLoad={handleLoaderImage}
        onClick={handleNavigateTo}
      />
      <span className="text-xl font-extrabold capitalize"> {name}</span>
      {/* <span className="text-md font-extrabold capitalize absolute  top-5 ">
        Ev. {order}
      </span> */}
    </div>
  );
};

const EvolutionRecursiveCard = ({
  data,
  order,
  containerRef,
}: EvolutionRecursiveCardProps) => {
  const orderEvolution = order + 1;
  const getId = data.species.url
    .split("/")
    .filter((s) => !isNaN(+s) && !!s.length);
  const id = addToCero(+getId[0], 3);
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
  return (
    <div className="flex md:flex-wrap gap-5 justify-between mx-auto">
      <EvolutionImages
        image={image}
        name={data.species.name}
        order={orderEvolution}
        containerRef={containerRef}
      />
      {data?.evolves_to.map((evolution, i) => (
        <EvolutionRecursiveCard
          key={i}
          data={evolution}
          order={orderEvolution}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
};

const EvolutionCard = ({ url, containerRef }: EvolutionCardProps) => {
  const [evolutions, setEvolutions] = useState<EvolutionChain | null>(null);
  useEffect(() => {
    axios.get(url).then((res) => setEvolutions(res.data));
  }, [url]);
  return (
    <div className="flex h-[19rem] items-center w-full bg-[#595959] p-2 relative">
      <img
        src="/svg/triangle.svg"
        alt="corner"
        className="absolute left-0 -top-1  h-20"
      />
      <div className="flex overflow-x-auto py-2 overflow-y-hidden md:overflow-y-auto  h-full">
        {evolutions && (
          <EvolutionRecursiveCard
            data={evolutions.chain}
            order={0}
            containerRef={containerRef}
          />
        )}
      </div>
    </div>
  );
};

export default EvolutionCard;
