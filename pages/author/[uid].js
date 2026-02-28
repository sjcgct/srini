import { client, predicate } from "../../prismic-configuration";
import Canvas from "../../components/Generic/Canvas";
import Link from "next/link";
import * as prismicH from "@prismicio/helpers";

const truncateWords = (text, maxWords = 20) => {
  if (!text) return "";
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

export default function AuthorPage({ author, stories }) {
  if(!author || !author.data){
    return <div>Not Found</div>
  }
  stories = stories|| [];
  return (
    <Canvas bgcolor="white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <Link href="/stories" passHref>
          <a className="text-base content-bold text-sm uppercase mb-6 inline-block hover:text-[#143e75] transition-colors hover:underline">
            &larr; Back to Stories
          </a>
        </Link>

        {/* Author Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          {prismicH.isFilled.image(author.data.picture) && (
            <img
              src={author.data.picture.url}
              alt={author.data.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-darkgreen"
            />
          )}
          <div className="text-center md:text-left">
            <h1 className="title text-3xl md:text-4xl mb-3">
              {author.data.name}
            </h1>
            {prismicH.isFilled.keyText(author.data.about) && (
              <p className="text-grey-600 text-base md:text-lg max-w-xl">
                {author.data.about}
              </p>
            )}
          </div>
        </div>

        {/* Stories by Author */}
        {stories.length > 0 && (
          <div>
            <h2 className="title text-xl md:text-2xl mb-6 border-b border-grey-300 pb-2">
              Stories by {author.data.name}
            </h2>
            <div className="space-y-6">
              {stories.map((story) => (
                <article key={story.id} className="flex gap-4">
                  <Link href={`/story/${story.uid}`} passHref>
                    <a className="shrink-0">
                      <img
                        src={story.data.featured_image.url}
                        alt={story.data.title[0]?.text}
                        className="w-24 h-24 md:w-32 md:h-32 object-cover"
                      />
                    </a>
                  </Link>
                  <div className="flex flex-col justify-center">
                    <span className="text-base text-xs uppercase content-bold mb-1">
                      {story.data.category?.data?.name}
                    </span>
                    <Link href={`/story/${story.uid}`} passHref>
                      <a>
                        <h3 className="title text-base md:text-xl mb-1 hover:text-[#143e75] transition-colors">
                          {story.data.title[0]?.text}
                        </h3>
                      </a>
                    </Link>
                    <p className="hidden md:block text-grey-600 text-sm">
                      {truncateWords(story.data.excerpt, 25)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {stories.length === 0 && (
          <div className="text-center py-10">
            <p className="text-grey-500">No stories published yet.</p>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-10 pt-6 border-t border-grey-300">
          <Link href="/stories" passHref>
            <a className="text-base content-bold text-sm uppercase hover:text-[#143e75] transition-colors hover:underline">
              &larr; Back to Stories
            </a>
          </Link>
        </div>
      </div>
    </Canvas>
  );
}

export async function getStaticProps({ params }) {
  const author = await client.getByUID("author", params.uid);

  // Get stories by this author
  const storiesResponse = await client.getByType("blogs", {
    pageSize: 50,
    orderings: {
      field: "my.blogs.date",
      direction: "desc",
    },
    predicates: [predicate.at("my.blogs.author", author.id)],
    graphQuery: `{
      blogs {
        title
        date
        featured_image
        excerpt
        uid
        category {
          name
        }
      }
    }`,
  });

  return {
    props: {
      author,
      stories: storiesResponse.results,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  try {
    const pages = await client.getAllByType("author");
    
    return {
      paths: pages
        .filter(item => item && item.uid)
        .map((item) => ({
          params: {
            uid: item.uid,
          },
        })),
      fallback: false,
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}
