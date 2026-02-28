import Link from "next/link";
import { linkResolver } from "../../prismic-configuration";

const HogCard = ({ story }) => {
  return (
    <div className={`w-full h-auto md:basis-1/2 my-4 relative`}>
      <Link href={linkResolver(story)} passHref>
        <a>
          <img
            src={story.data.featured_image.url}
            className="border-b pb-3 mb-1"
            alt="Example image"
          />
        </a>
      </Link>
      <p className="vertical-label mt-1 text-xs text-grey-400 hover:text-[#143e75] transition-colors dark:hover:text-[#FDE7C9]">
        {story.data.title[0].text.match(/^\d+/)?.[0]}
      </p>
      <Link href={linkResolver(story)} passHref>
        <a>
          <h2 className="content-bold text-lg hover:text-[#143e75] transition-colors dark:hover:text-[#FDE7C9]">{story.data.name}</h2>
        </a>
      </Link>
    </div>
  );
};

export default HogCard;
