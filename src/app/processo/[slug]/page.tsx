"use client";
import Badge from "@/app/components/badge";
import api from "@/app/service/api";
import { IProcessos } from "@/app/service/types";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import { use, useEffect, useState } from "react";

export default function Processo() {
  const [processo, setProcesso] = useState({} as IProcessos);
  const router = useRouter()

  const { slug } = useParams();

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

  function newSearch() {
    router.push("/")
    localStorage.removeItem("mykey")
  }

  return (
    <div className="bg-[#fafafa] w-full flex flex-col items-center justify-center p-2">
      <section className="flex flex-col items-center justify-center py-6 md:flex md:flex-row md:gap-8">
        <div className="flex flex-col items-center md:flex md:flex-row">
          <h1 className="font-semibold text-2xl text-[#323232]">PROCESSO CNJ:</h1>
          <p className="md:ml-2 font-semibold text-lg sm:text-2xl text-[#766966]">{processo.cnj}</p>
        </div>
        <Badge>{processo.tribunal_origem}</Badge>
      </section>

      <section className="flex max-w-[1000px] w-full justify-between gap-2">
        <div className="flex p-2">
        <h3 className="font-semibold text-sm sm:text-lg text-[#323232]">Distribuido em:</h3>
        <p className="font-semibold text-sm sm:text-lg text-[#766966]">{processo.data_inicio}</p>
        </div>
          <button onClick={() => newSearch()} className="text-green-700 font-semibold flex items-center">Realizar nova busca</button>
          <Link href="/" className="text-[#766966] underline flex items-center">Voltar</Link>     
      </section>

      <section className="bg-white rounded-md w-full sm:max-w-[1000px] flex flex-col-reverse sm:grid sm:grid-cols-3 md:grid md:grid-cols-4 gap-4 p-2">
        <div className="flex flex-col w-full sm:col-span-2 md:col-span-3">
          <p className="font-semibold text-lg md:text-2xl mb-5 text-[#323232]">Movimentações</p>
          {
            processo?.movimentacoes?.map((movimentacao, index) => (
              <section className="flex mt-2 gap-8 ml-2 md:ml-5" key={index}>
                <div className="flex flex-col items-center gap-2">
                  <div id="ball" className="w-[40px] h-[40px] bg-[#766966] rounded-[50%] flex items-center justify-center">
                    <Image src="/calendar.png" alt="jusLogo" width={20} height={20} />
                  </div>
                  {processo.movimentacoes.length - 1 > index &&
                  <div id="vertical-div" className="w-[2px] h-[50px] bg-gray-300"></div>
                  }
                </div>
                <div className="flex flex-col" key={index}>
                  <p className="font-semibold">{movimentacao.data}</p>
                  <p className="text-[#766966]">{movimentacao.descricao}</p>
                  <div id="horizontal-div" className="w-[50px] h-[2px] bg-gray-300"></div>
                </div>
              </section>
            ))
          }
        </div>

        <section className="w-full max-w-[300px] sm:p-0">
          <p className="font-semibold text-lg md:text-xl mb-5 text-[#323232]">Partes do Processo</p>
          {
            processo?.partes_processo?.map((parte, index) => (
              <div className="flex flex-col" key={index}>
                <p className="underline font-semibold text-[#323232]">{parte.posicao}</p>
                <p className="text-[#766966]">{parte.nome}</p>
              </div>
            ))
          }
        </section>
      </section>
    </div>
  )
}