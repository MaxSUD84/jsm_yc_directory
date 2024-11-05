import { auth, signOut, signIn } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Navbar = async () => {
    const session = await auth()

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className="flex justify-between items-center">
            <Link 
                href="/"
            >
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={144}
                    height={30}
                />
            </Link>

            <div className="flex items-center gap-5 text-black">
                {session && session?.user ? (
                    <>
                        <Link
                            href="/startup/create"
                            className="text-black hover:text-primary transition-all duration-500"
                        >
                            <span className='max-sm:hidden'>Создать</span>
                            <BadgePlus className='hidden max-sm:block items-center size-6 text-green-500' />
                        </Link>
                        <form
                            className="text-black hover:text-primary transition-all duration-500"
                            action={async () => {
                                "use server"; 
                                await signOut({ redirectTo: '/'});}}
                        >
                            <button
                             type='submit'
                            >
                                <span className='max-sm:hidden'>Выход</span>
                                <LogOut className='hidden max-sm:block items-center size-6 text-red-500' />
                            </button>
                        </form>
                        <Link
                            href={`/user/${session?.id}`}
                            className="text-black hover:text-primary transition-all duration-500"
                        >
                            {/* <span>{session?.user?.name}</span> */}
                            <Avatar className='size-10'>
                                <AvatarImage
                                    src={session?.user?.image}
                                />
                                <AvatarFallback>AV</AvatarFallback>
                            </Avatar>
                        </Link>

                    </>
                ) : (
                    <form
                        action={async () => {
                            "use server";
                            await signIn('github')}}
                        className="text-black hover:text-primary transition-all duration-500"
                    >
                        <button type='submit'>Вход</button>
                    </form> 
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar