"use client"

type Props = React.InputHTMLAttributes<HTMLInputElement> &{
  
}

export default function SearchInput({...props}: Props) {
  return (
    <input 
      className="mr-[20px] h-[48px] w-[400px] border-[1px] border-solid border-[lightgrey] pl-[10px] rounded hover:border-[darkgrey] focus:outline-[#0091ea] outline-offset-2 focus:outline focus:outline-1" 
      type="text" 
      placeholder="Digite um número de processo ou sigla do tribunal" 
      {...props}
    />
  )
}