import Heading from "../Heading";
import Canvas from "../Generic/Canvas";
import HogCard from "./HogCard";
const HumansOfGct = ({ hogs }) => {
  return (
    <Canvas bgcolor="white">
      <Heading title={"Humans of GCT"} />
      <div className="flex flex-wrap justify-evenly gap-4 md:gap-6 p-1 justify-evenly">
        {hogs &&
          hogs.map((hog) => {
            return <HogCard key={hog.id} hog={hog} />;
          })}
        {/* <HogCard />

        <HogCard />

        <HogCard /> */}

        {/* <HogCard />

        <HogCard />

        <HogCard /> */}
      </div>
    </Canvas>
  );
};

export default HumansOfGct;
