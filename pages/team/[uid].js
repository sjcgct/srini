import { client } from "../../prismic-configuration";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import Canvas from "../../components/Generic/Canvas";
import Heading from "../../components/Heading";



export default function TeamPage({ team, allTeams }) {
  if (!team) return <p className="text-center py-20">No team found</p>;

  // Sort by year descending
  const sortedTeams = [...allTeams].sort((a, b) => {
    const yearA = parseInt(a.data.year.split("-")[0]);
    const yearB = parseInt(b.data.year.split("-")[0]);
    return yearB - yearA;
  });

  const currentIndex = sortedTeams.findIndex(
    (item) => item.uid === team.uid
  );

  const previousTeam = sortedTeams[currentIndex + 1];
  const nextTeam = sortedTeams[currentIndex - 1];

  return (
    <Canvas bgcolor="white">
      <div className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">

          {/* Page Heading */}
          <div className="text-center mb-12">
            <Heading title="Our Team" />
            <p className="text-xl text-gray-600 mt-3">
              Board of {team.data.year}
            </p>
          </div>

          {/* Group Photo */}
          {team.data.teampicture?.url && (
            <div className="mb-14">
              <img
                src={team.data.teampicture.url}
                alt={team.data.year}
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          )}

          {/* Sub Teams */}
          <div className="space-y-12">
            {team.data.body.map((slice, index) => (
              <div
                key={index}
                className="bg-white dark:bg-grey-800 rounded-2xl shadow-sm p-8 border border-gray-100"
              >
                <h2 className="text-2xl-base font-semibold mb-6 text-center">
                  {slice.primary["sub-team"]?.[0]?.text}
                </h2>

                <div className="max-w-2xl mx-auto text-base leading-relaxed space-y-2">
                  <PrismicRichText field={slice.primary["member-list"]} />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-16">

            {previousTeam ? (
              <Link href={`/team/${previousTeam.uid}`}>
                <a className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                  ← Previous
                </a>
              </Link>
            ) : <div />}

            {nextTeam ? (
              <Link href={`/team/${nextTeam.uid}`}>
                <a className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                  Next →
                </a>
              </Link>
            ) : <div />}

          </div>

        </div>
      </div>
    </Canvas>
  );
}

export async function getStaticPaths() {
  const teams = await client.getAllByType("team");

  return {
    paths: teams.map((team) => ({
      params: { uid: team.uid },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const team = await client.getByUID("team", params.uid);
  const allTeams = await client.getAllByType("team");

  return {
    props: {
      team,
      allTeams,
    },
  };
}