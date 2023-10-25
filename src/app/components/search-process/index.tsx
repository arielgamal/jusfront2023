"use client"

import api from "@/app/service/api";
import ResultPage from "../result-page";
import SearchButton from "./search-button";
import SearchInput from "./search-input";

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
    <div className="flex flex-col items-center h-full justify-center gap-5 bg-[#fafafa] pt-10">
      <div className="flex flex-col items-center">
        <h1 className="text-[#323232] text-3xl">Consulta Processual</h1>
        <h3 className="text-[#766966]">Faca uma busca pelo número do processo ou pela sigla do tribunal</h3>
      </div>

      <div>
        <SearchInput onChange={(e) => console.log(e.target.value)} />
        <SearchButton onClick={() => findAll()}>CONSULTAR</SearchButton>
      </div>

      <div>
        <ResultPage />
      </div>
    </div>
  )
}
