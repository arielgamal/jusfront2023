"use client"

import ResultPage from "../result-page";
import SearchButton from "./search-button";
import SearchInput from "./search-input";

export default function SearchHeader() {
  return (
    <div className="flex flex-col items-center h-full justify-center gap-5 bg-[#fafafa] pt-10">
      <div className="flex flex-col items-center">
        <h1 className="text-[#323232] text-3xl">Consulta Processual</h1>
        <h3 className="text-[#766966]">Faca uma busca pelo número do processo ou pela sigla do tribunal</h3>
      </div>

      <div>
        <SearchInput onChange={(e) => console.log(e.target.value)} />
        <SearchButton>CONSULTAR</SearchButton>
      </div>

      <div>
      <ResultPage />
      </div>
    </div>
  )
}
