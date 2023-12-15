import { Suspense } from "react";
import RecipeList from "@/app/ui/recipes";

export default async function Home() {


  return (
    <div>
      <Suspense fallback ={<p>Loading...</p>}>
        <RecipeList/>
      </Suspense>
   </div>
  )
}
