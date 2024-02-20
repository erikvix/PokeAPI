import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePokeStore } from "@/store/PokeStore";

type listPokemon = {
  height: number;
  weight: number;
  id: number;
  name: string;
  description: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
    front_default: string;
    versions: {
      "generation-v": {
        "black-white": {
          animated: {
            front_default: string;
          };
        };
      };
    };
  };
  types: {
    "0": {
      type: {
        name: string;
      };
    };
    "1": {
      type: {
        name: string;
      };
    };
  };
};

const index = () => {
  const [data, setData] = useState<listPokemon[]>([]);
  const store = usePokeStore();
  const urlDesc = "https://pokeapi.co/api/v2/characteristic/{id}/";

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/` + store.name)
      .then((response) => {
        return response.json();
      })
      .then((data: listPokemon) => {
        setData([data]);
        console.log(data);
      });
  }, [store.name]);
  return (
    <section className="mt-10 card">
      <div className="justify-center flex flex-col items-center">
        {data
          ? data.map((item, index) => (
              <Card className="max-w-max" key={item.id | index}>
                <CardHeader>
                  <CardDescription className="text-center text-lg capitalize font-semibold tracking-tight ">
                    {`#${item.id}`}
                  </CardDescription>
                  <CardTitle className="text-center text-4xl capitalize font-semibold tracking-tight ">
                    {item.name}
                  </CardTitle>
                  <CardTitle className="text-center text-xl capitalize font-semibold tracking-tight ">
                    {item.types["0"].type.name}
                    {item.types["1"] ? (
                      <CardTitle className="text-center text-xl capitalize font-semibold tracking-tight">
                        {item.types["1"].type.name}
                      </CardTitle>
                    ) : null}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {item.sprites &&
                  item.sprites.versions["generation-v"]["black-white"].animated[
                    "front_default"
                  ] ? (
                    <div className="flex items-center justify-center">
                      <img
                        className="w-52 h-auto"
                        src={`${item.sprites.other["official-artwork"].front_default}`}
                        alt={item.name}
                      />
                      <img
                        src={`${item.sprites.versions["generation-v"]["black-white"].animated["front_default"]}`}
                        className="w-40 h-auto"
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="flex gap-4  ">
                      <Skeleton className="h-[250px] w-[250px] rounded-xl" />
                      <Skeleton className="h-[250px] w-[250px] rounded-xl" />
                    </div>
                  )}
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            ))
          : null}
      </div>
    </section>
  );
};

export default index;
