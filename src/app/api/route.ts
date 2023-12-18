
import { sql } from '@vercel/postgres';
import { Recipe } from "../../db/definitions"
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest){
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  const page = searchParams.get('page')
  const size = searchParams.get('size')

  const sizeasNum = parseInt(size || "25")
  const pageasNum = parseInt(page ||"1")
  const data = query 
  ? 
  await sql<Recipe>`SELECT id, name FROM recipes WHERE ${query} % ANY(STRING_TO_ARRAY(name, ' ')) ORDER BY SIMILARITY(name, ${query}) DESC OFFSET ${(pageasNum-1) * sizeasNum} FETCH NEXT ${sizeasNum} ROW ONLY` 
  : 
  await sql<Recipe>`SELECT id, name FROM recipes ORDER BY id ASC OFFSET ${(pageasNum-1) * sizeasNum} FETCH NEXT ${sizeasNum} ROW ONLY`;
  
  
  return Response.json(data.rows)
  } 
  