"use client"

import api from "@/app/service/api";
import ResultPage from "../result-page";
import SearchButton from "./search-button";
import SearchInput from "./search-input";
import ResultCard from "../result-card";
import Image from "next/image";

export default function SearchProcess() {
  async function findAll () {
    const query = {
        query: `query {
          findAll {
            numeroCNJ
            nomeDasPartes {
              nome
              posicao
            }
            tribunalDeOrigem
            dataDeInicio
            movimentacoes {
              data
              descricao
            }
          }
        }`
    };

    api.post("/", query).then((response) => {
      console.log(response); // data
    }).catch((error) => {
      console.log(error.response);
    })
  }

  return (
    <div className="flex flex-col items-center h-full w-full gap-5 bg-[#fafafa] p-10">
      <div className="flex flex-col items-center justify-center m-5">
        <h1 className="text-[#323232] text-3xl">Consulta Processual</h1>
        <h3 className="text-[#766966]">Faca uma busca pelo número do processo ou pela sigla do tribunal</h3>
      </div>

      {/* <div className="flex flex-col sm:flex sm:flex-row w-full justify-center items-center gap-2 sm:gap-0 m-5"> */}
      <div className="max-w-[600px] w-full flex p-5">
        <SearchInput onChange={(e) => console.log(e.target.value)} />
        <SearchButton onClick={() => findAll()}>CONSULTAR</SearchButton>
      </div>

      <div className="w-full">
        <div className="w-full flex justify-center flex-col items-center gap-3">
          <Image src="/giphy.gif" alt="search" width={200} height={200} />
        </div>

        <div className="flex justify-center flex-col items-center gap-3">
          <p className="max-w-[600px] font-extrabold">Não encontramos nenhum resultado</p>
          <Image src="/notfound.png" alt="search" width={100} height={100} />
        </div>

        <div className="w-full flex justify-center flex-col items-center gap-3">
          <p className="max-w-[600px] w-full font-semibold">Voce encontrou 1 resultado(s):</p>
          <ResultCard />
          <ResultCard />
          <ResultCard />
          <ResultCard />
          <ResultCard />
        </div>
      </div>
    </div>
  )
}
