const { db } = require("@vercel/postgres")
const recipes = require("../../recipesjson/betterercipe.json")


async function seedRecipes(client) {

    try{
      const extension = await client.sql`CREATE EXTENSION IF NOT EXISTS pg_trgm`
      console.log(`Created "extension" to table`);
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS recipes (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          ingredients TEXT [] NOT NULL
        );
      `;

      console.log(`Created "recipe" table`);

    //   const insertedRecipes = await Promise.all(
    // recipes.map(async (recipe) =>{

    //   return client.sql`
    //   INSERT INTO recipes (name, ingredients)
    //   VALUES (${recipe.title}, ${recipe.ingredients})
    //   `;
    // }),
    // );

    // console.log(`Seeded ${insertedRecipes.length} recipes`);

    return{
      createTable,
      // recipes: insertedRecipes,
    };
    }
    catch (err) {
      console.error(`Error seeding recipes:`, err);
      throw err;

    }


}

async function main() {
    const client = await db.connect();

    await seedRecipes(client);


}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});