import { client } from "../../prismic-configuration";
import { PrismicText } from "@prismicio/react";
import Link from "next/link";

export default function ApertureDetail({ page }) {

  if (!page || !page.data) {
    return <div> Not Found</div>
  }
  const title = page.data.title;
  const description = page.data.description || "";
  const date = page.data.date || "";
  const embedLink = page.data.link || "";

  return (
    <div className="bg-purplebg min-h-screen">
      <div className="w-full mx-auto max-w-5xl px-4 py-10">
        <Link href="/aperture" passHref>
          <a className="text-black content-bold text-sm uppercase mb-6 inline-block">
            &larr; Back to Aperture
          </a>
        </Link>

        <header className="mb-8">
          <p className="text-grey-500 text-sm uppercase tracking-wide mb-2">
            {date}
          </p>
          <h1 className="title text-3xl md:text-5xl mb-4">
            <PrismicText field={title} />
          </h1>
          {description && (
            <p className="content-normal text-grey-600 text-lg max-w-2xl">
              {description}
            </p>
          )}
        </header>

        {embedLink && (
          <div className="w-full bg-white rounded shadow-lg overflow-hidden">
            <iframe
              src={embedLink}
              className="w-full aspect-[3/4] md:aspect-video"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen"
            />
          </div>
        )}

        {!embedLink && (
          <div className="w-full bg-white p-10 text-center rounded">
            <p className="text-grey-500">No flipbook available for this issue.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const page = await client.getByUID("apertures", params.uid, {
    graphQuery: `{
      apertures {
        title
        description
        date
        link
      }
    }`,
  });

  return {
    props: {
      page,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  try {
    const pages = await client.getAllByType("apertures");

    return {
      paths: pages
        .filter(item => item && item.uid) // Ensure item and uid exist
        .map((item) => ({
          params: {
            uid: item.uid,
          },
        })),
      fallback: 'blocking',
    };
  } catch (error) {
    console.error("Error in getStaticPaths for aperture:", error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}