import Image from "next/image";

export default function Header () {
  return(
    <section className="px-16 flex items-center justify-center w-full h-20  border-b border-[#bababa] bg-[#fff]">
      <div>
        <Image src="/juslogo.svg" alt="jusLogo" width={120} height={120} />
      </div>
    </section>
  )
}