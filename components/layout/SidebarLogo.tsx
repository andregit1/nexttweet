import { useRouter } from "next/router"
import { FaBrain } from "react-icons/fa"

const SidebarLogo = () => {
  const router = useRouter()

  return (
    <div 
      onClick={() => router.push('/')}
      className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-slate-300 hover:bg-opacity-30 cursor-pointer transition"
    >
      <FaBrain size={20} color="red" />
    </div>
  )
}

export default SidebarLogo
