import { Suspense } from "react";
import { type Recipe } from "@/db/definitions";

async function getRecipes(query: string | null): Promise<Recipe[]>{
  const res = await fetch(`http://localhost:3000/api?query=${query}`)
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
      <Suspense>
        <ul>
          {data.map(recipe => 
            (<li key= {recipe.id}>{recipe.name}</li>))}
        </ul>
      </Suspense>  
   </div>
  )
}
