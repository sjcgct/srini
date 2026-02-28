import Heading from "../Heading";
import Canvas from "../Generic/Canvas";
import LargeStoryCard from "./LargeStoryCard";
import SmallStoryCard from "./SmallStoryCard";
const RecentStories = ({ stories }) => {
  const otherStories = [...stories.slice(0, 0), ...stories.slice(1)];
  
  return (
    <Canvas bgcolor="white">
      <Heading title={"Recent Stories"} />
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 md:gap-y-8 md:my-4 p-1">
        {/* Large Story Card with grey padding */}
        <div className="bg-white dark:bg-grey-800 p-2 rounded shadow-md">
          <LargeStoryCard
            story={stories[0]}
            title={stories[0].data.title[0].text}
            featuredImage={stories[0].data.featured_image}
            author={stories[0].data.author.data}
            date={stories[0].data.date}
            excerpt={stories[0].data.excerpt}
            uid={stories[0].uid}
          />
        </div>

        {/* Small Story Cards */}
        <div className="secondary-column flex flex-col items-start gap-4">
          {otherStories &&
            otherStories.map((story) => (
              <div
                key={story.id}
                className="bg-white dark:bg-grey-800 p-2 rounded shadow-md w-full"
              >
                <SmallStoryCard story={story} />
              </div>
            ))}
        </div>
      </div>
    </Canvas>
  );
};

export default RecentStories;
