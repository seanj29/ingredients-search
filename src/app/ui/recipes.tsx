import { fetchRecipeTitles } from "@/db/data";

export default async function RecipeList() {

    const eggrecipes = await fetchRecipeTitles('egg');
  
    return (
      <ul>
   {eggrecipes.map( async (recipe, i) => <li key={i} >{recipe.name}</li>
   )}
     </ul>
    )
  }