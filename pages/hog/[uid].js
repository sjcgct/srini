import { client } from "../../prismic-configuration";
import { PrismicText, PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";
import HogCard from "../../components/Hogpage/HogCard";
import { SliceZone } from "@prismicio/react";
import { components } from "../../slices";
import Link from "next/link";

export default function HogStory({ page, otherStories }) {
  if (!page || !page.data) {
    return <div>Not Found</div>
  }
  otherStories = otherStories || [];
  return (
    <div className="bg-white dark:bg-grey-800 grid-col-1 align-center justify-center px-2 py-1">
      <article>
        <div className="flex flex-col justify-center text-base dark:text-white w-full mx-auto md:max-w-4xl lg:max-w-5xl mx-auto pt-10 pb-6 px-4">
          <Link href="/humansofgct" passHref>
            <a className="text-base dark:text-white content-bold text-sm uppercase mb-6 hover:text-[#143e75] transition-colors hover:underline">
              &larr; Back to Humans of GCT
            </a>
          </Link>
          <span className="content-bold mx-auto px-2 py-1 text-sm md:text-base text-dominantbg dark:text-white bg-grey-500 text-center uppercase mb-2">
            {page.data.title[0].text.split("-")[0]}
          </span>
          <h1 className="title text-center mx-auto text-3xl md:text-5xl py-1 mb-3">
            {page.data.title[0].text.substring(
              page.data.title[0].text.indexOf("-") + 1
            )}
          </h1>
          <div className="mx-auto px-2 py-1 text-center pb-1">
            <span className="">{`${page.data.name}.`}</span>
          </div>
        </div>
        <div className="w-full md:max-w-2xl mx-auto">
          <figure className="grid grid-cols-1 gap-4 bg-gray-100">
            {prismicH.isFilled.image(page.data.featured_image) && (
              <div>
                <PrismicNextImage
                  field={page.data.featured_image}
                  layout="responsive"
                />
              </div>
            )}
          </figure>
        </div>
        <div className="w-full mx-auto max-w-2xl px-1 py-8 md:pt-14 text-base text-gray-800 dark:text-gray-200 post-container">
          <PrismicRichText
            field={page.data.story}
            components={{
              paragraph: ({ children }) => (
                <p className="mb-4 text-base dark:text-white">
                  {children}
                </p>
              ),
              heading2: ({ children }) => (
                <h2 className="text-2xl font-bold mt-8 mb-4 text-base dark:text-white">
                  {children}
                </h2>
              ),
            }}
          />
        </div>
      </article>

      <div className="flex flex-col justify-center w-full mx-auto md:max-w-3xl lg:max-w-5xl mx-auto pt-8 pb-6">
        {/* {console.log(otherStories)} */}
        <h3 className="divider line razor title text-base dark:text-white text-2xl md:text-3xl mx-auto">
          Other Stories
        </h3>
        <div className="grid grid-cols-1 mx-auto text-base dark:text-white md:grid-cols-3 md:gap-x-16	md:gap-y-8 md:mb-4">
          {otherStories.map((story) => {
            return <HogCard key={story.id} story={story} />;
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const page = await client.getByUID("hog", params.uid);

  const otherStories = await client.getByType("hog", {
    page: 1,
    pageSize: 3,
    orderings: {
      field: "my.hog.date",
      direction: "desc",
    },
    graphQuery: `{
            hog {
              title
              date
              featured_image
              name
              uid
            }
          }`,
  });
  return {
    props: {
      page,
      otherStories: otherStories.results,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  try {
    const pages = await client.getAllByType("hog");

    return {
      paths: pages
        .filter(item => item && item.uid)
        .map((item) => ({
          params: {
            uid: item.uid,
          },
        })),
      fallback: 'blocking',
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}
