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
    type: {
      name: string;
    };
  };
};

const index = () => {
  const [data, setData] = useState<listPokemon[]>([]);
  const store = usePokeStore();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(
  //         `https://pokeapi.co/api/v2/pokemon/` + store.name
  //       );
  //       const json = await response.json();
  //       if (response.status !== 200) throw new Error(json.message);
  //       setData([json]);
  //       console.log(data);
  //     } catch (error) {
  //       console.log("Aconteceu o seguinte erro: " + error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   return fetchData;
  // }, [store.name]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/` + store.name)
      .then((response) => {
        return response.json();
      })
      .then((data: listPokemon) => {
        setData([data]);
        console.log(data);
      });
  }, []);
  return (
    <section className="mt-10">
      <div className="justify-center flex flex-col items-center">
        {loading && <Skeleton />}
        {data
          ? data.map((item, index) => (
              <Card className="max-w-max flex" key={item.id | index}>
                <CardHeader>
                  <CardTitle className="text-center text-4xl capitalize font-semibold tracking-tight ">
                    {`#${item.id}`}
                  </CardTitle>
                  <CardTitle className="text-center text-4xl capitalize font-semibold tracking-tight ">
                    {item.name}
                  </CardTitle>
                  <CardTitle className="text-center text-4xl capitalize font-semibold tracking-tight ">
                    {item.types.type.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {item.sprites &&
                  item.sprites.versions["generation-v"]["black-white"].animated[
                    "front_default"
                  ] ? (
                    <div className="flex items-center flex-col justify-center">
                      <img
                        className="w-full h-auto"
                        src={`${item.sprites["front_default"]}`}
                        alt={item.name}
                      />
                      <img
                        src={`${item.sprites.versions["generation-v"]["black-white"].animated["front_default"]}`}
                        className="w-full h-auto"
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
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            ))
          : null}
      </div>
    </section>
  );
};

export default index;
