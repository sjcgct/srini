import Heading from "../Heading";
import Canvas from "../Generic/Canvas";
const AbcChannel = () => {
  return (
    <Canvas bgcolor="white">
      <Heading title={"ABC Channel"} />
      <div className="flex md:gap-y-8 md:my-4 p-6">
        <iframe
          className="aspect-video w-full h-auto"
          src="https://www.youtube.com/embed/msizPweg3kE"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope;"
          allowFullScreen
        ></iframe>
      </div>
    </Canvas>
  );
};

export default AbcChannel;
