const FLIPHTML5_BASE = "https://online.fliphtml5.com/";

const ApertureCard = ({ item, onSelect }) => {
  const title = item.data.title?.[0]?.text || "Untitled";
  const description = item.data.description || "";
  const link = item.data.link || "";

  const thumbnailUrl = link ? `${FLIPHTML5_BASE}${link}/files/shot.jpg` : null;

  const handleClick = () => {
    if (onSelect && link) {
      onSelect({
        title,
        embedUrl: `${FLIPHTML5_BASE}${link}`,
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="block w-full text-left focus:outline-none group cursor-pointer"
    >
      <div className="relative">
        {thumbnailUrl && (
          <div className="aspect-[3/4] overflow-hidden bg-grey-200 shadow-md group-hover:shadow-xl transition-all duration-300 border border-grey-200">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex flex-col items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 content-bold text-lg">
                View Issue
              </span>
              {description && (
                <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 px-4 text-center line-clamp-3">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <h3 className="title text-base md:text-lg mt-3 text-black dark:text-white text-center group-hover:text-[#1c2e4a] dark:hover:text-[#FDE7C9] transition-colors duration-200">
        {title}
      </h3>
    </button>
  );
};

export default ApertureCard;
