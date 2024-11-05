import React from 'react'
import { STARTUP_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import StartupCard, { type TypeStartupCard } from './StartupCard'


async function UserStartups({ id }: {id: string}) {
    const startups = (await client.fetch(STARTUP_BY_AUTHOR_QUERY, { id: id })) || []

  return (
    <>
        { startups.length > 0 ? (
            startups.map((startup: TypeStartupCard) => (
                <StartupCard key={startup._id} {...startup} />
            ))
        ) : (
            <p className="no-result">
                Стартапов не найдено
            </p>
        )}
    </>
  )
}

export default UserStartups