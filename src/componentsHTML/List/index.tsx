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
};

const index = () => {
  const [data, setData] = useState<listPokemon[]>([]);
  const store = usePokeStore()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        setLoading(true)
        setData([])
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + store.name);
        const json = await response.json();
        if (response.status !== 200) throw new Error(json.message);
        setData([json]);
        console.log(data);
      } catch (error) {
        console.log('Aconteceu o seguinte erro: ' + error);
        setData([])
      } finally{
        setLoading(false)
      }
    }
    
    return fetchData
   
  }, [store.name]);
  return (
    <section className="mt-10">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-10">
    
        {loading && <Skeleton/> }
        {data ? (data.map((item, index) => (
          <Card key={item.id | index}>
            <CardHeader>
              <CardTitle className="text-center text-4xl capitalize font-semibold tracking-tight ">
                {item.name}
              </CardTitle>
              {item.sprites && item.sprites.versions["generation-v"]["black-white"].animated["front_default"] ? (
                <div>
                  <img
                    src={`${item.sprites.versions["generation-v"]["black-white"].animated["front_default"]}`}
                    alt=""
                  />
                  <img src={`${item.sprites["front_default"]}`} alt={item.name} />
                </div>
              ) : null}
            </CardHeader>
            <CardContent>
              <CardDescription>{item.name}</CardDescription>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))): null} 
       
      </div>
    </section>
  );
};

export default index;
