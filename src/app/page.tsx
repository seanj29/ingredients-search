"use client"
import { useState, useEffect } from "react"

export default function Home() {

  type RecipeReponse = [{
    id: string,
    ingredients: string,
    title: string,
    uuid: string,
  }]

  const [query, setQuery] = useState("")
  const [recipes, setRecipes] = useState<any>([]) 


  useEffect(() => {

    const fetchRecipes = async () =>{

      const response = await fetch("nottelling.com")
      const data = await response.json()
      setRecipes(data)
    }

    fetchRecipes()
  }, [])

  return (
    <div>
   <input placeholder="Enter Recipe Name" onChange= {(e) => setQuery(e.target.value)} />
   {
   
    recipes

    .filter((recipe: {id: string, title: string; }) => 

   {
   if(recipe.title.toLowerCase().includes(query.toLowerCase())){
    return recipe.title
   }
   }
   
   )

   
   .map((recipe: {id: string, title: string}) => 
   <p key={recipe.id}>{recipe.title}</p>
   )
}
   </div>
  )
}
