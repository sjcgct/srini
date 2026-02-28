import { PrismicRichText } from "@prismicio/react";

const Quote = ({ slice }) => {
  return (
    <blockquote>
      <PrismicRichText field={slice.primary.quote} />
    </blockquote>
  );
};

export default Quote;
