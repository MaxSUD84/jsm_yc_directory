import { cn, formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"
import type { Author, Startup } from "@/sanity/types"
import { Skeleton } from "./ui/skeleton"

/** ! Используется типы Генерируемые Sanity TypeGen ! */
// export interface IAuthor {
//     _id: string,
//     name: string,
//     image: string,
//     bio: string
// }

// export interface IStartupCard {
//     _id: string,
//     _createdAt: string,
//     views: number,
//     author: IAuthor,
//     description: string,
//     image: string,
//     category: string,
//     title: string,
// }

export type TypeStartupCard = Omit<Startup, 'author'> & { author: Author}

const StartupCard = ({
    _id,
    _createdAt,
    views,
    author,
    description,
    image,
    category,
    title
}: TypeStartupCard) => {
  return (
    <li className="startup-card group">
        <div className="flex-between mt-5 gap-5">
            <p className="startup-card_date">
                {formatDate(_createdAt)}
            </p>
            <div className="flex gap-1 5">
                <EyeIcon className="size-6 text-primary"/>
                <span className="text-16-medium">{views}</span>
            </div>
        </div>

        <div className="flex-between mt-5 gap-5">
            <div className="flex-1">
                <Link href={`/user/${author?._id}`}>
                    <p className="text-16-medium text-black hover:text-primary hover:underline transition-all duration-500 line-clamp-1">
                        {author?.name ?? 'Author: Unknown'}
                    </p>
                </Link>
                <Link href={`/startup/${_id}`}>
                    <h3 className="text-26-semibold line-clamp-1">{title}</h3>
                </Link>
            </div>
            <Link href={`/user/${author?._id}`}>
                <Image
                    src={author?.image ? author.image : 'https://placehold.co/48x48'}
                    alt={author?.name ?? 'Author: Unknown'}
                    width={48}
                    height={48}
                    className="rounded-full"
                />
            </Link>
        </div>

        <Link href={`/startup/${_id}`}>
            <p className="startup-card_desc">
                {description}
            </p>
            <img src={image} alt="post_image" className="startup-card_img"/>
        </Link>

        <div className="flex-between gap-3 mt-5">
            <Link href={`/?query=${category?.toLowerCase()}`}>
                <p className="text-16-medium">
                    {category}
                </p>
            </Link>
            <Button className="startup-card_btn" asChild>
                <Link href={`/startup/${_id}`}>
                    Подробнее
                </Link>
            </Button>
        </div>
    </li>
  )
}

export const StartupCardSkeleton = () => {
    return (
        <>
            {[...Array(3)].map((_, index) => (
                <li 
                    className="startup-card group"
                    key={cn('skeleton', index)}
                >
                    <Skeleton className="startup-card_skeleton" />
                </li>
            ))}
        </>
    )
}

export default StartupCard