import { client } from "../../prismic-configuration";
import { SliceZone } from "@prismicio/react";
import { components } from "../../slices";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import Link from "next/link";
import * as prismicH from "@prismicio/helpers";

export default function AlumspaceDetail({ page }) {

  if (!page || !page.data) {
    return <div>Not Found</div>;
  }

  const title = page.data.title;
  const alum = page.data.alum || "";
  const batch = page.data.batch || "";
  const department = page.data.department || "";
  const date = page.data.date || "";
  // Handle both string and Link type fields
  const websiteRaw = page.data.website;
  const website = websiteRaw?.url || (typeof websiteRaw === "string" && websiteRaw) || null;


  return (
    <div className="bg-white dark:bg-grey-800">
      <article>
        {/* Header */}
        <div className="flex flex-col justify-center w-full mx-auto md:max-w-4xl lg:max-w-5xl pt-10 pb-6 px-4">
          <Link href="/alumspace" passHref>
            <a className="text-base dark:text-white content-bold text-sm uppercase mb-6 hover:text-[#143e75] dark:hover:text-[#FDE7C9] transition-colors hover:underline">
              &larr; Back to AlumSpace
            </a>
          </Link>
          <h1 className="title text-center text-base dark:text-white text-3xl md:text-5xl py-1 mb-4">
            <PrismicText field={title} />
          </h1>
          {/* Alumni Info */}
          <p className="text-center dark:text-white content-bold text-base md:text-lg mb-1">
            {website ? (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base hover:underline"
              >
                {alum}
              </a>
            ) : (
              alum
            )}
          </p>
          {(batch || department) && (
            <p className="text-center dark:text-white text-grey-500 text-sm mb-2">
              {batch && <span>Batch of {batch}</span>}
              {batch && department && <span> · </span>}
              {department && <span>{department}</span>}
            </p>
          )}

          {date && (
            <p className="text-center dark:text-white text-grey-400 text-xs">
              Published on {date}
            </p>
          )}
        </div>

        {/* Featured Image */}
        <div className="w-full md:max-w-4xl mx-auto px-4">
          {prismicH.isFilled.image(page.data.featured_image) && (
            <figure className="bg-gray-100">
              {page.data.featured_image.hero ? (
                <PrismicNextImage
                  field={page.data.featured_image.hero}
                  layout="responsive"
                />
              ) : (
                <img
                  src={page.data.featured_image.url}
                  alt={alum}
                  className="w-full h-auto"
                />
              )}
            </figure>
          )}
        </div>

        {/* Content Body */}
        <div className="w-full mx-auto max-w-2xl px-4 py-8 text-black dark:text-white md:pt-14 post-container flex flex-col">
          <SliceZone slices={page.data.body} components={components} />
        </div>

        {/* Footer */}
        <div className="w-full mx-auto max-w-2xl px-4 pb-10">
          <div className="border-t border-grey-300 pt-6">
            <Link href="/alumspace" passHref>
              <a className="text-base dark:text-white content-bold text-sm uppercase hover:text-[#143e75] dark:hover:text-[#FDE7C9] transition-colors hover:underline">
                &larr; Back to AlumSpace
              </a>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export async function getStaticProps({ params }) {
  try {
    const page = await client.getByUID("alumspace", params.uid);

    if (!page) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        page,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const pages = await client.getAllByType("alumspace");

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