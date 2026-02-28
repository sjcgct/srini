const Canvas = ({ bgcolor = "white", children }) => {
  const bgClasses = {
    white: "bg-white dark:bg-grey-900",
    dominantbg: "bg-dominantbg dark:bg-grey-900",
    pinkbg: "bg-pinkbg dark:bg-grey-900",
    purplebg: "bg-purplebg dark:bg-grey-900",
    greenbg: "bg-greenbg dark:bg-grey-900",
  };

  return (
    <div
      className={`px-2 py-3 md:px-5 md:py-5 text-black dark:text-white ${
        bgClasses[bgcolor] || "bg-white dark:bg-grey-900"
      }`}
    >
      <div className="md:container md:mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Canvas;