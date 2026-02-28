import Link from "next/link";
import { client } from "../prismic-configuration";

export default function SearchPage({ results, searchQuery }) {
  return (
  <div className="bg-white dark:bg-grey-800 min-h-screen py-16 px-4">
    <div className="max-w-4xl mx-auto">

      {/* Title Section */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl dark:text-white md:text-4xl font-bold mb-3">
          Search Results
        </h1>
        <p className="text-gray-600 dark:text-white text-lg">
          {results.length} result{results.length !== 1 && 's'} found for{' '}
          <span className="font-semibold">
            &ldquo;{searchQuery}&rdquo;
          </span>
        </p>
      </div>

      {/* Results Container Background */}
      <div className="bg-gray-50 rounded-2xl p-6 md:p-8">

        {results.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <p className="text-gray-600 dark:text-white text-lg">No results found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-grey-800 border border-gray-100 rounded-xl shadow-sm p-6 hover:shadow-md transition duration-300"
              >
                <Link href={`/story/${item.uid}`}>
                  <a>
                    <h2 className="text-xl md:text-2xl font-semibold text-black dark:text-white hover:text-green-600 transition">
                      {item.data.title?.[0]?.text}
                    </h2>
                  </a>
                </Link>

                {item.data.date && (
                  <p className="text-gray-500 dark:text-white text-sm mt-2">
                    {item.data.date}
                  </p>
                )}

                {item.data.excerpt && (
                  <p className="mt-3 text-gray-700 dark:text-white leading-relaxed">
                    {item.data.excerpt}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  </div>
);
}
export async function getServerSideProps(context) {
  const { q } = context.query;

  if (!q) {
    return {
      props: {
        results: [],
        searchQuery: "",
      },
    };
  }

  try {
    const response = await client.get({
    q: [
      `[[fulltext(document, "${q}")]]`,
    ],
    pageSize: 20,
    orderings: [
      {
        field: "my.blogs.date",
        direction: "desc",
      },
    ],
  });

    return {
      props: {
        results: response.results,
        searchQuery: q,
      },
    };
  } catch (error) {
    console.error("Search error:", error);
    return {
      props: {
        results: [],
        searchQuery: q,
      },
    };
  }
}