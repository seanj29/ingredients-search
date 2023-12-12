"use client"
import { useState } from "react"

export default function Home() {

  const [query, setQuery] = useState("")

  const datarec =  {"egg ": "soyyyyy", "nog": "boyyy"}

  return (
    <div>
   <input placeholder="Enter Recipe Name" onChange= {(e) => setQuery(e.target.value)} />
   {
   
   Object.keys(datarec)

   .filter((title) => 

   {
   if(title.toLowerCase().includes(query.toLowerCase())){
    return title
   }
   }
   
   )
   .map((title, i) => 
   <p key={i}>{title}</p>
   )
}
   </div>
  )
}
