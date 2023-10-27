import Link from "next/link";
import Badge from "../badge";

export default function ResultCard() {
  return(
    <div className="border max-w-[600px] bg-white w-full border-1 rounded-md p-4">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">Processo n.</p>
          <p className="font-semibold text-gray-400">5001682-88.2020.8.13.0672</p>
        </div>
        
        <div className="flex items-center">
          <Badge>TJRJ</Badge>
        </div>
      </div>

      <div className="flex justify-start text-blue-500 mt-6">
        <Link href="/processo/5001682-88.2020.8.13.0672">Ver processo</Link>
      </div>
    </div>
  )
}