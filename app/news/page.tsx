import { getNewsList } from "@/app/_libs/microcms";
import { NEWS_LIST_LIMIT } from "@/app/_components/_constants";
import NewsList from "../_components/NewsList";
import Pagenation from "@/app/_components/Pagination";
import SearchField from "@/app/_components/SearchField";

export const revalidate = 0;

export default async function Page() {
    const {contents: news, totalCount} = await getNewsList({
        limit: NEWS_LIST_LIMIT,
    });
    return (
        <>
            <SearchField />
            <NewsList news={news} />
            <Pagenation totalCount={totalCount} />
        </>
    );
}