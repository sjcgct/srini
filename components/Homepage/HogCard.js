import Link from "next/link";
import { linkResolver } from "../../prismic-configuration";

const HogCard = ({ hog }) => {
  const title = hog.data.title?.[0]?.text || "Untitled";
  const imageUrl =
    hog.data.featured_image?.thumbnail?.url || hog.data.featured_image?.url;

  return (
    <Link href={linkResolver(hog)} passHref>
      <a className="block w-full md:w-64 mb-6">
        <div className="overflow-hidden rounded-lg h-48 md:h-56">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover rounded-lg transform transition duration-300 hover:scale-105"
            />
          )}
        </div>
        <h2 className="title text-lg md:text-xl mt-2 hover:text-[#143e75] dark:hover:text-[#FDE7C9] transition-colors">{title}</h2>
      </a>
    </Link>
  );
};

export default HogCard;
