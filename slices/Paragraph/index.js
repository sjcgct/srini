import { PrismicRichText } from "@prismicio/react";

const Paragraph = ({ slice }) => {
  return (
    <PrismicRichText
      field={slice.primary.paragraph}
      components={{
        paragraph: ({ children }) => (
          <p className="text-black dark:text-white mb-4">
            {children}
          </p>
        ),
        heading2: ({ children }) => (
          <h2 className="text-2xl font-bold text-black dark:text-white mt-8 mb-4">
            {children}
          </h2>
        ),
        heading3: ({ children }) => (
          <h3 className="text-xl font-semibold text-black dark:text-white mt-6 mb-3">
            {children}
          </h3>
        ),
        strong: ({ children }) => (
          <strong className="text-black dark:text-white">
            {children}
          </strong>
        ),
      }}
    />
  );
};

export default Paragraph;