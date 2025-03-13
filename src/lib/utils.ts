import { Question } from "@/comps/Admin/content/models";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 const VITE_API_LINK = import.meta.env.VITE_API_LINK;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function deleteContest(){
 
  const res = await axios.delete(VITE_API_LINK,{})
}
export async function addOneQuestion(question:Question) : Promise<void>{
 const res = await axios
}
