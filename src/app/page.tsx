"use client"
import { useState, useEffect } from "react"

export default function Home() {

  // type RecipeReponse = [{
  //   id: string,
  //   ingredients: string,
  //   title: string,
  //   uuid: string,
  // }]
  type PersonType = {
    result:
    [{
  name: 
    {
    first: string
    }
  ,
  id:
    {
    value: Number
    }
  }
]

  }

  const [query, setQuery] = useState("")
  const [recipes, setRecipes] = useState<PersonType>() 


  useEffect(() => {

    const fetchRecipes = async () =>{

      const response = await fetch("https://randomuser.me/api/?results=50")
      const data = await response.json()
      setRecipes(data)
    }

    fetchRecipes()
  }, [])

  return (
    <div>
   <input placeholder="Enter Recipe Name" onChange= {(e) => setQuery(e.target.value)} />
   {
   
    recipes?.result

    .filter((recipe) => 

   {
   if(recipe.name.first.toLowerCase().includes(query.toLowerCase())){
    return recipe.name.first
   }
   }
   
   )

   
   .map((recipe, i) => 
   <p key={recipe.id.value && i}>{recipe.name.first}</p>
   )
}
   </div>
  )
}
