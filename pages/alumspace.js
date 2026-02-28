import { useState } from "react";
import { client } from "../prismic-configuration";
import Canvas from "../components/Generic/Canvas";
import Heading from "../components/Heading";
import AlumspaceCard from "../components/Alumspace/AlumspaceCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { PuffLoader } from "react-spinners";
const PAGE_SIZE = 10;

export default function AlumspacePage({ items }) {
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  const hasMore = displayCount < items.length;

  const getMoreItems = () => {
    setDisplayCount((prev) => Math.min(prev + PAGE_SIZE, items.length));
  };

  const visibleItems = items.slice(0, displayCount);

  return (
    <Canvas bgcolor="white">
      <Heading title="AlumSpace" />

      <InfiniteScroll
        dataLength={visibleItems.length}
        next={getMoreItems}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-6">
            <PuffLoader color="#4cb387" speedMultiplier={1} />
          </div>
        }
        endMessage={<></>}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10 my-6 ">
          {visibleItems.map((item) => (
            <AlumspaceCard key={item.id} item={item} />
          ))}
        </div>
      </InfiniteScroll>

      {items.length === 0 && (
        <div className="text-center py-20">
          <p className="text-grey-500">No alumni features available yet.</p>
        </div>
      )}
    </Canvas>
  );
}

export async function getServerSideProps() {
  const alumspace = await client.getByType("alumspace", {
    pageSize: 100,
    orderings: {
      field: "my.alumspace.date",
      direction: "desc",
    },
    graphQuery: `{
      alumspace {
        uid
        title
        alum
        batch
        department
        date
        excerpt
        featured_image
      }
    }`,
  });

  return {
    props: {
      items: alumspace.results,
    },
  };
}
