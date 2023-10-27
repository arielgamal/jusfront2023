"use client";
import Badge from "@/app/components/badge";
import { useParams } from "next/navigation"

export default function Processo() {
  const {slug} = useParams();
  return (
    <div className="bg-[#fafafa] w-full flex justify-center p-10">
      <div className="bg-white rounded-md w-[800px] h-[600px] p-8">
        <div className="flex">
          <h1 className="font-semibold text-xl">Processo n.</h1>
          <p className="font-semibold text-xl text-gray-400">{slug}</p>
        </div>
          
          <h3 className="font-semibold">Distribuido em:</h3>
          <p className="font-semibold text-gray-400">10/10/2021</p>     

          <Badge>TJRJ</Badge>

        <section className="flex">
          <div className="w-full border-[1px] border-solid border-[lightgrey] rounded">
            <div className="py-2.5 text-{24px} font-bold bg-slate-300 p-[20px]">
              <p>Movimentações</p>
            </div>
            <div className="p-4">
              <p>11/12/2021</p>
                
              <p>texto texto texto</p>
            </div>
          </div>

          <div className="ml-[50px]">
            <p className="font-bold">Partes envolvidas</p>
                <div className="border-b-[1px]">
                <p className="italic underline">Joao</p>
                <p>Parte envolvida: Advogado</p>
                </div>
          </div>
        </section>
      </div>
    </div>
  )
}