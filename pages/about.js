import Canvas from "../components/Generic/Canvas";
import Heading from "../components/Heading";

export default function AboutPage() {

  return (
    <Canvas bgcolor="white">
      <Heading title="About" />

      <div className="max-w-3xl mx-auto px-6 pb-16">
        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="title text-2xl md:text-3xl mb-4">Our Mission</h2>

          <p className="content text-base dark:text-white md:text-lg leading-relaxed text-grey-700 mb-4">
            The optimised utilisation and enhancement of students&apos; enthusiasm
            in the field of journalism through reporting, visual design,
            photography and all the wings the newsletter demands. A unique
            platform that serves the students, drawing inspiration from various
            wings. To act as a genuine reference representing GCT across diverse
            platforms.
          </p>

          <p className="content text-base dark:text-white md:text-lg leading-relaxed text-grey-700">
            The Student Journalist Council (SJC) officially came into existence
            on 24 December 2013, with the primary objective of fostering and
            promoting the spirit of student-led journalism within the college.
            It was created as a space where students could express themselves
            confidently, learn collaboratively, and contribute to something that
            represents GCT on diverse platforms for years to come.
          </p>
        </section>

        {/* History Section */}
        <section className="mb-12">
          <h2 className="title text-2xl md:text-3xl mb-4">Our History</h2>

          <p className="content text-base dark:text-white md:text-lg leading-relaxed text-grey-700 mb-4">
            In 2013, a group of students interested in journalism realised that
            there was no platform where students could openly share their
            thoughts without fear of judgment or discrimination. Consequently,
            they founded the Student Journalist Council (SJC) on 24 December
            2013 with the objective of promoting informed, student-led
            journalism.
          </p>
        </section>

        {/* What We Do Section */}
        <section className="mb-12">
          <h2 className="title text-2xl md:text-3xl mb-6">What We Do</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:bg-grey-800">
            <div className="bg-white dark:bg-grey-800 p-6 border border-grey-200 dark:border-grey-800">
              <h3 className="title text-xl dark:text-white mb-2">Stories</h3>
              <p className="content text-grey-600 dark:text-white">
                We cover campus news, student achievements, and stories that
                matter.
              </p>
            </div>

            <div className="bg-white dark:bg-grey-800 p-6 border border-grey-200 dark:border-grey-800">
              <h3 className="title text-xl dark:text-white mb-2">Humans of GCT</h3>
              <p className="content text-grey-600 dark:text-white">
                Personal stories and interviews with the people who make our
                campus vibrant.
              </p>
            </div>

            <div className="bg-white dark:bg-grey-800 p-6 border border-grey-200 dark:border-grey-800">
              <h3 className="title text-xl dark:text-white mb-2">AlumSpace</h3>
              <p className="content text-grey-600 dark:text-white">
                Connecting current students with alumni experiences and wisdom.
              </p>
            </div>

            <div className="bg-white dark:bg-grey-800 p-6 border border-grey-200 dark:border-grey-800">
              <h3 className="title text-xl dark:text-white mb-2">Aperture</h3>
              <p className="content text-grey-600 dark:text-white">
                Our visual newsletter capturing campus life through photography
                and design.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="title text-2xl md:text-3xl mb-4">Get in Touch</h2>

          <p className="content text-base dark:text-white md:text-lg leading-relaxed text-grey-700 mb-4">
            Have a story idea? Want to join the team? We&apos;d love to hear from
            you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:sjcgct@gmail.com"
              className="content-bold text-green hover:underline"
            >
              sjcgct@gmail.com
            </a>

            <span className="hidden sm:inline text-grey-400">|</span>

            <a
              href="https://www.instagram.com/sjcgct/"
              target="_blank"
              rel="noopener noreferrer"
              className="content-bold text-green hover:underline"
            >
              @sjcgct on Instagram
            </a>
          </div>
        </section>
      </div>
    </Canvas>
  );
}

