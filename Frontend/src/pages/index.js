import Image from 'next/image'
import { Inter } from 'next/font/google'
import CheckLogin from '@/components/Layout/CheckLogin'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  
  return (
    <div className='w-full h-64 flex justify-center items-center '>
<CheckLogin/>
      <div className='loader2'></div>
      </div>
  )
}
