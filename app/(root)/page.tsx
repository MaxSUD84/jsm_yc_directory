
import { auth } from "@/auth";
import SearchForm from "../../components/SearchForm";
import StartupCard, { type TypeStartupCard } from "@/components/StartupCard";
// import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home({searchParams}: {
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query ?? ''
  const params = { search: query || null };
  const session = await auth();

  // console.log(session)
  
  const { data:posts } = await sanityFetch({ query: STARTUP_QUERY, params });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Презинтуй свои стартап<br /> идеи и привлекай единомышленников.
        </h1>
        <p className="sub-heading !max-w-3xl">
          Присылайте идеи, выбирай и голосуй за понравившеся. И тебя заметят !
        </p>

        <SearchForm query={query}/>

      </section>

      <section className="section_container">
        <p className="text-24-black">
          {query ? `Результаты по запросу: "${query}"` : 'Популярные стартапы'}
        </p>

        <ul className="mt-7 card_grid"> 
          {posts?.length > 0 ? posts.map((post: TypeStartupCard) => (
            <StartupCard key={post._id} {...post} />
          )) : (
            <p className="text-20-medium">Ничего не найдено</p>
          )}
        </ul>
      </section>

      <SanityLive
        // query={STARTUP_QUERY}
        // options={{
        //   initialData: posts,
        //   params: { query },
        //   revalidateOnMount: true,
        //   revalidateOnFocus: true,
        //   revalidateOnReconnect: true,
        // }}
      />
    </>
  );
}
