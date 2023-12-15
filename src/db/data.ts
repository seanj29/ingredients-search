import { sql } from '@vercel/postgres';
import { Recipes } from "./definitions"
import { performance } from 'perf_hooks';
import { unstable_noStore as noStore } from 'next/cache'

export async function fetchRecipes(){
    noStore()

    try{
            let startTime = performance.now();
            console.log('Fetching all reicpe data...');
            const data = await sql<Recipes>`SELECT * FROM recipes`;
            let  endTime = performance.now()
            console.log("Data fetch completed after ",(endTime - startTime), " millisecnonds")
            return data.rows
    }
    catch(error){

        console.error("Database Error:", error)
        throw new Error("Failed to fetch recipes")
    }
}

export async function fetchRecipeTitles(searchbar: string) {
    noStore()
    try{
        const startTime = performance.now();
        console.log('Fetching matching recipe data...');
        const data = await sql<Recipes>`SELECT * FROM recipes WHERE ${searchbar} % ANY(STRING_TO_ARRAY(name, ' ')) ORDER BY SIMILARITY(name, ${searchbar}) DESC LIMIT 10 `;
        const  endTime = performance.now()
        console.log("Data fetch completed after ",(endTime - startTime), " millisecnonds")
        return data.rows
    } 
    catch(error){

    console.error("Database Error:", error)
    throw new Error("Failed to fetch recipes")
}

}