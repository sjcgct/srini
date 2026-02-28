import Link from "next/link";
import { linkResolver } from "../../prismic-configuration";

const truncateWords = (text, maxWords = 25) => {
  if (!text) return "";
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

const AlumspaceCard = ({ item }) => {
  const title = item.data.title?.[0]?.text || "Untitled";
  const alum = item.data.alum || "";
  const batch = item.data.batch || "";
  const department = item.data.department || "";
  const excerpt = item.data.excerpt || "";
  const imageUrl = item.data.featured_image?.thumbnail?.url || item.data.featured_image?.url;

  return (
    <div className="mb-8 md:mb-10">
      <Link href={linkResolver(item)} passHref>
        <a className="block">
          <div className="flex flex-row items-start gap-4">
            {imageUrl && (
              <div className="basis-2/5 md:basis-1/3 shrink-0">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            <div className="basis-3/5 md:basis-2/3 flex flex-col">
              <h2 className="title text-lg md:text-2xl mb-1 hover:text-[#1c2e4a] dark:hover:text-[#FDE7C9] transition-colors">
                {title}
              </h2>
              <p className="content-bold text-sm md:text-base mb-1">{alum}</p>
              {(batch || department) && (
                <p className="text-xs text-grey-500 mb-2">
                  {batch && <span>Batch of {batch}</span>}
                  {batch && department && <span> · </span>}
                  {department && <span>{department}</span>}
                </p>
              )}
              <p className="hidden md:block text-base text-sm">
                {truncateWords(excerpt, 30)}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default AlumspaceCard;
