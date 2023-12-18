import { Suspense } from "react";
import { type Recipe } from "@/db/definitions";
import Search from "@/app/ui/search"

async function getRecipes(query: string | null): Promise<Recipe[]>{
  // Adding this change to hopefully rebuild this 
  const baseUrl = process.env.ROOT_URL || "http://localhost:3000"
  const params = new URLSearchParams();
  if(query){
    params.set('query', query);
    params.set("page", "1")
    params.set("size", "10")
  }
  else {
    params.delete('query');
    params.delete('page');
    params.delete('size');
  }
  const res = await fetch(`${baseUrl}/api?${params.toString()}`);
  if(!res.ok){

    throw new Error('Failed to fetch Recipes')
  }
  return res.json()
}

export default async function Home({searchParams}: {searchParams : {query: string}}) {

  const query = searchParams.query

  const data = await getRecipes(query);
  return (
    <div>
      <Search placeholder="Please Search a Recipe Name"/>
      <Suspense>
        {query && <ul>
          {data.map(recipe => 
            (<li key= {recipe.id}>{recipe.name}</li>))}
        </ul>}
      </Suspense>  
   </div>
  )
}
