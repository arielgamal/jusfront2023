import Link from "next/link";
import Badge from "../badge";
import { IProcessos } from "@/app/service/types";

type Props = {
  element: IProcessos
}


export default function ResultCard({element} : Props) {
  return(
    <Link href={`/processo/${element.cnj}`} className="border max-w-[600px] bg-white w-full border-1 rounded-md p-4 hover:bg-slate-100">  
        <div className="flex justify-between">
          <div>
            <p className="font-semibold">Processo:</p>
            <p className="font-semibold text-gray-400">{element.cnj}</p>
          </div>
          
          <div className="flex items-center">
            <Badge>{element.tribunal_origem}</Badge>
          </div>
        </div>

        <div className="flex justify-start text-blue-500 mt-6">
          <p>Ver processo</p>
        </div>
    </Link>  
  )
}