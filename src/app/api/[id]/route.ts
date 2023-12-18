
import { sql } from '@vercel/postgres';
import { type Recipe } from "../../../db/definitions"
import { type NextRequest } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: number } }
    ){
  const id = params.id

  const data = await sql<Recipe>`SELECT id, name, ingredients FROM recipes WHERE id =${id}`;  
    

    return Response.json(data.rows)
  }