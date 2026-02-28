import * as prismic from "@prismicio/client";

const repoName = process.env.PRISMIC_REPO_NAME;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;
const endpoint = prismic.getEndpoint(repoName);

export const linkResolver = (doc) => {
  if (doc.type) {
    // URL for a category type
    if (doc.type === "category") {
      return `/category/${doc.uid}`;
    }

    // URL for a blog type
    if (doc.type === "blogs") {
      return `/story/${doc.uid}`;
    }

    // URL for HoG
    if (doc.type === "hog") {
      return `/hog/${doc.uid}`;
    }

    if (doc.type === "alumspace") {
      return `/alumspace/${doc.uid}`;
    }

    if (doc.type === "apertures") {
      return `/aperture/${doc.uid}`;
    }

    if (doc.type === "internview") {
      return `/internview/${doc.internview}`;
    }

    if (doc.type === "author") {
      return `/author/${doc.uid}`;
    }
  }

  // Backup for all other types
  return "/";
};

export const predicate = prismic.predicate;

// creating a prismic client  object

export const client = prismic.createClient(endpoint, { accessToken });

// import Prismic from 'prismic-javascript'

// // Prismic API endpoint
// export const apiEndpoint = process.env.PRISMIC_API_URL

// // Access Token if the repository is not public
// // Generate a token in your dashboard and configure it here if your repository is private
// export const accessToken = process.env.PRISMIC_TOKEN

// // Client method to query documents from the Prismic repo
// export const client = Prismic.client(apiEndpoint, {accessToken})

// export const linkResolver = (doc) => {
//   if (doc) {
//     // URL for a category type
//     if (doc.type === 'category') {
//       return `/category/${doc.uid}`
//     }

//     // URL for a tag type
//     if (doc.type === 'tag') {
//       return `/tag/${doc.uid}`
//     }

//     // URL for a article type
//     if (doc.type === 'article') {
//       return `/article/${doc.uid}`
//     }
//   }

//   // Backup for all other types
//   return '/'
// }

// export const hrefResolver = (doc) => {
//   // URL for a category type
//   if (doc.type === 'category') {
//     return '/category/[uid]'
//   }

//   // URL for a tag type
//   if (doc.type === 'tag') {
//     return '/tag/[uid]'
//   }

//   // URL for a article type
//   if (doc.type === 'article') {
//     return '/article/[uid]'
//   }

//   // Backup for all other types
//   return '/'
// }
