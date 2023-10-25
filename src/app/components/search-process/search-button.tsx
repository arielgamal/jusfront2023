type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &{
  children: React.ReactNode
}
export default function SearchButton({children,...props}: Props) {
  return (
    <button 
      className="bg-[#0091ea] h-[48px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      {...props}
    >
      {children}
    </button>
  )
}