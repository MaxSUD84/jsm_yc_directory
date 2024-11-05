import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import markdownit from 'markdown-it'
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import View from "@/components/View"
import { formatDate } from "@/lib/utils"
import StartupCard, { TypeStartupCard } from "@/components/StartupCard"

const md = markdownit()
export const experimental_ppr = true

const StartupPage = async({ params }: { params: Promise<{ id: string }>}) => {
    const id = (await params).id
    
    // ** PARALLEL LOAD DATA **
    const [post, startups] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, { id }),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" })
    ])

    // ** SEQUENTIAL LOAD DATA **
    // const post = await client.fetch(STARTUP_BY_ID_QUERY, { id })
    // const startups = await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" });

    const editorPosts = startups[0]?.select || [];

    if (!post) return notFound()

    const parseContent = md.render(post?.pitch || '')

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">{formatDate(post?._createdAt)}</p>
                <h1 className="heading">{post.title}</h1>
                <p className="sub-heading !max-w-5xl">{post.description}</p>
            </section>

            <section className="section_container">
                <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-auto object-cover rounded-xl"
                />
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link 
                            href="/user/[id]" 
                            as={`/user/${post.author?._id}`}
                            className="flex items-center gap-2 mb-3"
                        >
                            <Image
                                src={post.author?.image}
                                alt={post.author?.name}
                                width={64}
                                height={64}
                                className="rounded-full drop-shadow-lg"
                            />
                            <div>
                                <p className="text-20-medium">{post.author?.name}</p>
                                <p className="text-16-medium !text-black-300">@{post.author?.username}</p>
                            </div>
                        </Link>

                        <p className="category-tag">{post.category}</p>
                    </div>
                    <h3 className="text-30-bold">Описание</h3>
                    {parseContent ? (
                        <article 
                            dangerouslySetInnerHTML={{ __html: parseContent }}
                            className="prose max-w-4xl font-work-sans break-all" 
                        />
                    ) : (
                        <p className="no-result">
                            Описание отсутствует
                        </p>
                    )}

                    <hr className="divider" />
                    
                    {editorPosts?.length > 0 && (
                        <div className="mx-auto max-w-4xl">
                            <p className="text-30-semibold">Популярные стартапы</p>

                            <ul className="mt-7 card_grid-sm">
                                {editorPosts?.map((post: TypeStartupCard) => (
                                    <StartupCard
                                        key={post._id}
                                        {...post}
                                    />
                                ))}
                            </ul>
                        </div>
                    )}

                    <Suspense 
                        fallback={<Skeleton className="view_skeleton"/>}
                    >
                        <View id={id} />
                    </Suspense>
                </div>
            </section>
            
        </>
    )
}

export default StartupPage