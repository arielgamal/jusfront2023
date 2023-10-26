export default function Badge( {children} : {children: React.ReactNode}) {
  return(
    <div className="bg-green-500/20 text-green-700 p-1 w-14 h-8 rounded-md flex font-semibold justify-center">{children}</div>
  )
}
