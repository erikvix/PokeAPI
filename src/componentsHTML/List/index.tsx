import React, { useEffect, useState } from "react";
import useFetch from "@/Hooks/useFetch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
};

const index = () => {
  const [data, setData] = useState<listPokemon[]>([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
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
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-10">
        {data.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-center text-4xl">
                {item.name}
              </CardTitle>
              <img src={`${item.sprites["front_default"]}`} alt="" />
              <img
                src={`${item.sprites.versions["generation-v"]["black-white"].animated["front_default"]}`}
                alt=""
              />
            </CardHeader>
            <CardContent>
              <CardDescription>{item.name}</CardDescription>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card> */}
    </section>
  );
};

export default index;
