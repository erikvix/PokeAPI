import { Input } from "@/components/ui/input";
import { usePokeStore } from "@/store/PokeStore";
import { useState } from "react";

export default function index() {
  const [pokemon,setPokemon] = useState('');
  const store = usePokeStore();
  console.log(store);

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    console.log("handle change");
    setPokemon(e.target.value)
    console.log('store name: ' + store.name);
  }
  
  return (
    <header className="w-full">
      <div className="container">
        <h1 className="py-5 text-4xl font-bold">
          Search your favorite Pokemon
        </h1>
        <Input onChange={handleChange} value={pokemon} />  
        <button onClick={() =>{
            store.addItem(store.name = pokemon.toLowerCase());
        }}>search</button>    
      </div>
    </header>
  );
}
