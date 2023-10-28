"use client";
import Badge from "@/app/components/badge";
import api from "@/app/service/api";
import { IProcessos } from "@/app/service/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"
import { use, useEffect, useState } from "react";

export default function Processo() {
  const [processo, setProcesso] = useState({} as IProcessos);

  const {slug} = useParams();

  useEffect(() => {
    const query = {
      query: `query {
        search(param: "${slug}") {
          cnj
          data_inicio
          tribunal_origem
          partes_processo {
            nome
            posicao
          }
          movimentacoes {
            data
            descricao
          }
        }
      }`
    };

    api.post("/", query).then((response) => {
      setProcesso(response.data.data.search[0])
    }).catch((error) => {
      console.log(error.response);
    })
  }, [])
  
  console.log(processo)

  return (
    <div className="bg-[#fafafa] w-full flex flex-col items-center justify-center p-10">
      <div className="flex flex-col sm:flex sm:flex-row sm:items-center sm:justify-center gap-5 mb-10">
        <div className="flex flex-col sm:flex sm:flex-row">
          <h1 className="font-semibold text-sm sm:text-2xl text-[#323232] ">PROCESSO CNJ:</h1>
          <p className="ml-2 font-semibold text-sm sm:text-2xl text-[#766966]">{processo.cnj}</p>
        </div>
        <Badge>{processo.tribunal_origem}</Badge>
      </div>

      <div className="flex w-[1000px] justify-between gap-2">
        <div className="flex">
        <h3 className="font-semibold text-[#323232]">Distribuido em:</h3>
        <p className="font-semibold  text-[#766966]">{processo.data_inicio}</p>
        </div>
          <Link href="/" className="text-[#766966] underline">Voltar</Link>     
      </div>


      <div className="bg-white rounded-md sm:max-w-[1000px] w-full p-8 flex flex-col-reverse sm:flex sm:flex-row justify-between">
        <section className="flex flex-col w-[70%]">
          <p className="font-semibold text-2xl mb-5 text-[#323232]">Movimentações</p>
          {
            processo?.movimentacoes?.map((movimentacao, index) => (
              <section key={movimentacao.data}>
                <div className="flex mt-2 gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <div id="ball" className="w-[40px] h-[40px] bg-[#766966] rounded-[50%] flex items-center justify-center">
                      <Image src="/calendar.png" alt="jusLogo" width={20} height={20} />
                    </div>
                    {processo.movimentacoes.length - 1 > index &&
                    <div id="vertical-div" className="w-[2px] h-[50px] bg-gray-300"></div>
                    }
                  </div>
                  <div className="flex flex-col" key={movimentacao.data}>
                    <p className="text-lg font-semibold">{movimentacao.data}</p>
                    <p className="text-[#766966]">{movimentacao.descricao}</p>
                    <div id="horizontal-div" className="w-[50px] h-[2px] bg-gray-300"></div>
                  </div>
                </div>
              </section>
            ))
          }
        </section>

        <section className="w-[25%]">
          <p className="font-semibold text-2xl mb-5 text-[#323232]">Partes do Processo</p>
          {
            processo?.partes_processo?.map((parte) => (
              <div className="flex flex-col" key={parte.posicao}>
                <p className="underline font-semibold text-[#323232]">{parte.posicao}</p>
                <p className="text-[#766966]">{parte.nome}</p>
              </div>
            ))
          }
        </section>
      </div>
    </div>
  )
}