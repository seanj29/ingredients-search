import { type Recipe } from "@/db/definitions";


async function getRecipe(id: string): Promise<Recipe[]>{
    // Adding this change to hopefully rebuild this 
    const baseUrl = process.env.ROOT_URL || "http://localhost:3000"
 
    const res = await fetch(`${baseUrl}/api/${id}`);
    if(!res.ok){
  
      throw new Error('Recipe with that id Not Found')
    }
    return res.json()
  }

export default async function Page({ params }: {params: { recipeid: string } }) {

  const id = params.recipeid
  const data = await getRecipe(id)
return (
<div className="container mx-auto px-4 py-10">
  <h1 className="w-full mx-auto"> Recipe Name: {data[0].name}</h1>
  <p className="w-full mx-auto"> Ingredients: {data[0].ingredients.join(", ")}</p>
</div>
)

}