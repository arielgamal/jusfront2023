"use client"

import api from "@/app/service/api";
import SearchButton from "./search-button";
import SearchInput from "./search-input";
import ResultCard from "../result-card";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SearchProcess() {
  const [inputText, setInputText] = useState("");
  const [processos, setProcessos] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [emptyInput, setEmptyInput] = useState("");


  useEffect(() => {
    const storedData = localStorage.getItem("mykey");
    if (storedData) {
      setProcessos(JSON.parse(storedData));
    }
  }, [])
  async function findBy () {
    setNotFound(false)
    const query = {
      query: `query {
        search(param: "${inputText}") {
          cnj
          tribunal_origem
        }
      }`
    };
    
    if (inputText.trim().length === 0) {
      setEmptyInput("Você precisa preencher o campo")
      return 
    } 
    api.post("/", query).then((response) => {
      setProcessos(response.data.data.search) // data
      localStorage.setItem("mykey", JSON.stringify(response.data.data.search));
      setEmptyInput("")
      response.data.data.search.length === 0 && setNotFound(true)
    }).catch((error) => {
      console.log(error.response);
    }).finally(() => {
      setInputText("")
    })
  }

  return (
    <div className="flex flex-col items-center h-full w-full gap-5 bg-[#fafafa] p-10">
      <div className="flex flex-col items-center justify-center m-5">
        <h1 className="text-[#323232] text-3xl">Consulta Processual</h1>
        <h3 className="text-[#766966]">Faca uma busca pelo número do processo ou pela sigla do tribunal</h3>
      </div>

      {/* <div className="flex flex-col sm:flex sm:flex-row w-full justify-center items-center gap-2 sm:gap-0 m-5"> */}
      <div className="max-w-[600px] w-full flex p-5 gap-3">
        <div className="w-full">
          <SearchInput onKeyDown={(e) => e.key === "Enter" && findBy()} onChange={(e) => setInputText(e.target.value)} value={inputText} />
          <p className="mt-[5px] text-[red]">{emptyInput}</p>
        </div>
        <div>
          <SearchButton onClick={() => findBy()}>CONSULTAR</SearchButton>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        {
          notFound &&
          <div className="flex justify-center flex-col items-center gap-3">
            <p className="max-w-[600px] font-extrabold">Não encontramos nenhum resultado</p>
            <Image src="/notfound.png" alt="search" width={100} height={100} />
          </div>
        }
        {
          processos.length >= 1 &&
          <div className="w-full flex justify-center flex-col items-center gap-3">
            <p className="max-w-[600px] w-full font-semibold text-[#766966]">Voce encontrou {processos.length} resultado(s):</p>
          </div>
        }
        {
          processos.map((element, index) => (      
            <div key={index} className="w-full flex justify-center flex-col items-center gap-3">
              <ResultCard element={element} />
            </div>
        ))
      }
      </div>
    </div>
  )
}
