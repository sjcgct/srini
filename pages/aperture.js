import { useState } from "react";
import { client } from "../prismic-configuration";
import Canvas from "../components/Generic/Canvas";
import Heading from "../components/Heading";
import ApertureCard from "../components/Aperture/ApertureCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { PuffLoader } from "react-spinners";

const PAGE_SIZE = 12;

export default function AperturePage({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  const closeModal = () => setSelectedItem(null);
  const hasMore = displayCount < items.length;

  const getMoreItems = () => {
    setDisplayCount((prev) => Math.min(prev + PAGE_SIZE, items.length));
  };

  const visibleItems = items.slice(0, displayCount);

  return (
    <Canvas bgcolor="white">
      <Heading title="Aperture" />

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 px-6 md:px-16 my-6">
          {visibleItems.map((item) => (
            <ApertureCard key={item.id} item={item} onSelect={setSelectedItem} />
          ))}
        </div>
      </InfiniteScroll>

      {items.length === 0 && (
        <div className="text-center py-20">
          <p className="text-grey-500">No newsletters available yet.</p>
        </div>
      )}

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-4xl max-h-[90vh] rounded-lg overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="title text-xl">{selectedItem.title}</h2>
              <button
                onClick={closeModal}
                className="text-grey-500 hover:text-black text-2xl font-bold leading-none"
              >
                &times;
              </button>
            </div>
            <div className="w-full" style={{ height: "calc(90vh - 80px)" }}>
              <iframe
                src={selectedItem.embedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                allow="autoplay; fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </Canvas>
  );
}

export async function getServerSideProps() {
  const apertures = await client.getByType("apertures", {
    pageSize: 100,
    orderings: {
      field: "my.apertures.date",
      direction: "desc",
    },
    graphQuery: `{
      apertures {
        title
        description
        date
        link
      }
    }`,
  });

  return {
    props: {
      items: apertures.results,
    },
  };
}
