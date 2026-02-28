import Head from "next/head";
import React, { useState } from "react";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import { client } from "../prismic-configuration";
import Link from "next/link";
import Canvas from "../components/Generic/Canvas";
import Heading from "../components/Heading";
import HogCard from "../components/Hogpage/HogCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { PuffLoader } from "react-spinners";
const PAGE_SIZE = 10;
export default function StoriesPage({ articles }) {
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const hasMore = displayCount < articles.length;

  const getMoreStories = () => {
    setDisplayCount((prev) => Math.min(prev + PAGE_SIZE, articles.length));
  };

  const visibleStories = articles.slice(0, displayCount);

  return (
    <Canvas bgcolor="white">
      <Heading title={"Humans of GCT"} />
      <InfiniteScroll
        dataLength={visibleStories.length}
        next={getMoreStories}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center align-center">
            <PuffLoader color="#4cb387" speedMultiplier={1} />
          </div>
        }
        endMessage={<></>}
      >
        <div className="grid grid-cols-1 px-10 md:grid-cols-3 md:gap-x-24 md:gap-y-12 md:my-4 gap-6">
          {visibleStories.map((story) => (
            <HogCard
              key={story.id}
              story={story}
            />
          ))}
        </div>
      </InfiniteScroll>

      {/* <HogCard />

        <HogCard />

        <HogCard /> */}
    </Canvas>

    // <Canvas bgcolor={"dominantbg"}>
    //   <InfiniteScroll
    //     dataLength={stories.length}
    //     next={getMoreStories}
    //     hasMore={hasMore}
    //     loader={
    //       <div className="flex justify-center align-center">
    //         <PuffLoader color="#4cb387" speedMultiplier={1} />
    //       </div>
    //     }
    //     endMessage={<></>}
    //   >
    //     <Heading title={"Stories"} />
    //     {stories.map((story) => (
    //       <StoryCard
    //         key={story.id}
    //         uid={story.uid}
    //         title={story.data.title[0].text}
    //         date={story.data.date}
    //         authorInfo={story.data.author}
    //         categoryInfo={story.data.category}
    //         image={story.data.featured_image.url}
    //         excerpt={story.data.excerpt}
    //       />
    //     ))}
    //   </InfiniteScroll>
    // </Canvas>
  );
}

const getSlugNumber = (item) => {
  const slug = item.slugs?.[0] || "";
  const match = slug.match(/^\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export async function getServerSideProps() {
  const hogs = await client.getByType("hog", {
    pageSize: 100,
    graphQuery: `{
        hog {
          date
          featured_image
          name
          title
        }
      }`,
  });

  const sortedResults = [...hogs.results].sort(
    (a, b) => getSlugNumber(b) - getSlugNumber(a)
  );

  return {
    props: {
      articles: sortedResults,
    },
  };
}
