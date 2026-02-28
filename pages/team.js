import { client } from "../prismic-configuration";
export async function getServerSideProps() {
  const teams = await client.getAllByType("team");

  const sorted = teams.sort((a, b) => {
    const yearA = parseInt(a.data.year.split("-")[0]);
    const yearB = parseInt(b.data.year.split("-")[0]);
    return yearB - yearA;
  });

  return {
    redirect: {
      destination: `/team/${sorted[0].uid}`,
      permanent: false,
    },
  };
}

export default function TeamRedirect() {
  return null;
}