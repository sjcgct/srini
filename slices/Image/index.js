import * as prismicH from "@prismicio/helpers";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

const Image = ({ slice }) => {
  return (
    <figure className="grid grid-cols-1 gap-4 bg-gray-100">
      {prismicH.isFilled.image(slice.primary.image) && (
        <div>
          <PrismicNextImage field={slice.primary.image} layout="responsive" />
        </div>
      )}
      {prismicH.isFilled.richText(slice.primary["image-description"]) && (
        <figcaption className="text-center font-serif italic tracking-tight text-grey-500">
          <PrismicRichText field={slice.primary["image-description"]} />
        </figcaption>
      )}
    </figure>
  );
};

export default Image;
