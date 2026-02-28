import React from "react";
import Prismic from "prismic-javascript";
import { client } from "../prismic-configuration";
import { useRouter } from "next/router";
import Canvas from "../components/Generic/Canvas";
import Heading from "../components/Heading";
import StoryCard from "../components/Stories/StoryCard";

export default function StoriesPage({
  articles,
  totalPages,
  currentPage,
  selectedCategory,
}) {
  const router = useRouter();

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      router.push({
        pathname: "/stories",
        query: {
          category: selectedCategory,
          page: currentPage + 1,
        },
      });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      router.push({
        pathname: "/stories",
        query: {
          category: selectedCategory,
          page: currentPage - 1,
        },
      });
    }
  };

  return (
    <Canvas bgcolor={"white"}>
      <Heading title={"Stories"} />

      <div className="mt-8">
        {articles.length > 0 ? (
          articles.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No stories found.
          </p>
        )}
      </div>

      <div className="flex justify-center items-center gap-6 mt-12 mb-16">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="px-5 py-2 rounded-full text-sm font-medium bg-[#9D9D9D] text-white disabled:bg-gray-300"
        >
          Previous
        </button>

        <span className="text-sm font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-5 py-2 rounded-full text-sm font-medium bg-[#9D9D9D] text-white disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </Canvas>
  );
}

// ================= SERVER SIDE =================

export async function getServerSideProps({ query }) {
  const { category, page } = query;

  const currentPage = page ? parseInt(page) : 1;
  let categoryId = null;

  if (category && category !== "all") {
    const categoryDoc = await client.query(
      Prismic.Predicates.at("my.category.name", category),
      { pageSize: 1 }
    );

    if (categoryDoc.results.length > 0) {
      categoryId = categoryDoc.results[0].id;
    }
  }

  const predicates = [
    Prismic.Predicates.at("document.type", "blogs"),
  ];

  if (categoryId) {
    predicates.push(
      Prismic.Predicates.at("my.blogs.category", categoryId)
    );
  }

  const stories = await client.query(predicates, {
    page: currentPage,
    pageSize: 5,
    orderings: {
      field: "my.blogs.date",
      direction: "desc",
    },
    fetchLinks: [
      "category.name",
      "author.name",
      "author.picture",
    ],
  });

  return {
    props: {
      articles: stories.results,
      totalPages: stories.total_pages,
      currentPage,
      selectedCategory: category || "all",
    },
  };
}