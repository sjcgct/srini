import Link from "next/link";
import { linkResolver } from "../../prismic-configuration";

const truncateWords = (text, maxWords = 20) => {
  if (!text) return "";
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

const StoryCard = ({
  story
}) => {
  return (
    <div className="md:px-10 mb-7 md:mb-10 px-4">
      <h3 className="text-BLACK text-xs md:text-base uppercase content-bold mb-1">
        {story.data.category.data.name}
      </h3>
      <div className="flex flex-row items-start">
        <div className="basis-2/5 md:basis-1/4 shrink-0">
          <Link href={linkResolver(story)} passHref>
            <a>
              <img
                className="w-full h-auto"
                src={story.data.featured_image.url}
              />
            </a>
          </Link>
        </div>
        <div className="ml-3 md:ml-4 flex flex-col basis-3/5 md:basis-3/4 overflow-hidden">
          <Link href={linkResolver(story)} passHref>
            <a>
              <h2 className="text-base title md:text-2xl mb-1 h-[52px] md:h-[36px] overflow-hidden hover:text-[#1c2e4a] dark:hover:text-[#FDE7C9] transition-colors">
                {story.data.title[0].text}
              </h2>
            </a>
          </Link>
          <p className="hidden md:block mb-2">
            {truncateWords(story.data.excerpt, 20)}
          </p>
          <div className="flex flex-row items-center">
            <Link href={linkResolver(story.data.author)} passHref>
              <a>
                <img
                  className="w-[24px] md:w-[36px] h-auto mr-1 p-[1px] rounded-full border-2 border-darkgreen"
                  src={story.data.author.data.picture.url}
                />
              </a>
            </Link>
            <Link href={linkResolver(story.data.author)} passHref>
              <a className="text-xs md:text-base hover:text-[#1c2e4a] dark:hover:text-[#FDE7C9] transition-colors">
                {story.data.author.data.name}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
