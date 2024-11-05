import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation'
import React from 'react'

async function Page() {
    const session = await auth()

    if (!session) redirect("/")


  return (
    <>
        <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>Страница создания стартапа</h1>


        </section>
        <section className='section_container'>
        <StartupForm />
        </section>
    </>
  )
}

export default Page