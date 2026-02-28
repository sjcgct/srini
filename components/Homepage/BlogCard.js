const BlogCard = () => {
  return (
    <div className="place-items-center py-4">
      <div className="w-full h-auto">
        <img src="https://source.unsplash.com/random/900x600" />
      </div>
      <div className="py-2">
        <h2 className="title text-2xl mb-1">
          The title of this goddamn long af post
        </h2>
        <div className="flex items-center text-xs text-grey-800 uppercase">
          <div className="basis-4/5">
            <p className="text-base">Ajai Kannan K</p>
          </div>

          <div className="basis-1/5 text-right">
            <span className="mr-1">2020</span>
            <span className="mr-1">|</span>
            <span>Mech</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
