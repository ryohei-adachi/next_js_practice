import { notFound } from "next/navigation";
import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagenatiion from "@/app/_components/Pagination";
import { NEWS_LIST_LIMIT } from "@/app/_components/_constants";

type Props = {
    params: Promise<{
        id: string;
        paramCurrent: string;
    }>;
};

export default async function Page({params}: Props) {
    const { id, paramCurrent } = await params;

    const current = parseInt(paramCurrent, 10);

    if(Number.isNaN(current) || current < 1) {
        notFound();
    }

    const category = await getCategoryDetail(id).catch(notFound);

    const { contents: news, totalCount } = await getNewsList({
        filters: `categoray[equals]${category.id}`,
        limit: NEWS_LIST_LIMIT,
        offset: NEWS_LIST_LIMIT * ( current - 1 ),
    });

    if (news.length === 0) {
        notFound();
    }

    return(
        <>
            <NewsList news={news} />
            <Pagenatiion 
                totalCount={totalCount} 
                current={current}
                basePath={`/news/category/${category.id}`}
            />
        </>
    )
}