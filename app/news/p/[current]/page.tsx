import { notFound } from "next/navigation";
import { getNewsList } from "@/app/_libs/microcms";
import { NEWS_LIST_LIMIT } from "@/app/_components/_constants";
import NewsList from "@/app/_components/NewsList";
import Pagenation from "@/app/_components/Pagination";

type Props = {
    params: Promise<{
        paramCurrent: string;
    }>;
};

export default async function Page({params}: Props ) {
    const { paramCurrent } = await params;
    const current = parseInt(paramCurrent, 10);

    if (Number.isNaN(current) || current < 1 ) {
        notFound();
    }
    const { contents: news, totalCount } = await getNewsList({
        limit: NEWS_LIST_LIMIT,
        offset: NEWS_LIST_LIMIT * (current - 1),
    });

    if (news.length === 0) {
        notFound();
    }

    return (
        <>
            <NewsList news={news} />;
            <Pagenation totalCount={totalCount} current={current}/>
        </>
    );
}