import Link from "next/link";
import React from "react";
import Icon1 from "@/assets/assets/icons/PicsArt_04-14-04.42 1.svg";
import Group1 from "@/assets/assets/icons/Group 1000002515.svg";
import Group2 from "@/assets/assets/icons/Group 1000002516.svg";
import Group3 from "@/assets/assets/icons/Group 1000002518.svg";
import Card1 from "@/assets/assets/icons/carbon_notebook-reference.svg";

export default function Landing() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-background p-8 bg-custom-blue text-white pt-20 md:pr-12">
        <Link href={"/"}>Home</Link>
        <div className="flex flex-col lg:flex-row items-start justify-between">
          <div className="flex">
            {/* Vertical Line */}
            <div className="border-l-8 border-yellow h-full min-h-[100px] mr-4 mt-12"></div>

            {/* Content Section */}
            <div className="mt-12 ml-0 md:ml-6">
              <h1 className="text-3xl md:text-5xl font-bold">Accelerate Innovation</h1>
              <h1 className="text-3xl md:text-5xl font-bold mt-2">with Global AI Challenges</h1>

              {/* Paragraph and Button Section */}
              <div className="mt-6 max-w-full md:max-w-[450px]">
                <p className="text-muted-foreground mb-6">
                  AI Challenges at DPhi simulate real-world problems. It is a great place to
                  put your AI/Data Science skills to test on diverse datasets, allowing you to
                  foster learning through competitions.
                </p>
                <Link href={"/addHackthon"}>
                  <button className="bg-secondary hover:bg-secondary/80 py-2 px-4 rounded-lg mb-6 bg-white text-custom-blue font-bold">
                    Create Challenge
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Icon Section */}
          <div className="mt-12 lg:mt-0 lg:mr-20 flex justify-center">
            <Icon1 width={300} height={300} />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col lg:flex-row justify-center bg-dark-blue text-white p-12 space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Stat Item 1 */}
        <div className="flex items-center space-x-4">
          <Group1 width={60} height={60} />
          <div className="flex flex-col">
            <span className="text-4xl font-bold">100K+</span>
            <span className="text-muted-foreground">AI model submissions</span>
          </div>
        </div>

        {/* Stat Item 2 */}
        <div className="flex items-center space-x-4">
          <Group2 width={60} height={60} />
          <div className="flex flex-col">
            <span className="text-4xl font-bold">50K+</span>
            <span className="text-muted-foreground">Data Scientists</span>
          </div>
        </div>

        {/* Stat Item 3 */}
        <div className="flex items-center space-x-4">
          <Group3 width={60} height={60} className="mb-2" />
          <div className="flex flex-col">
            <span className="text-4xl font-bold">100+</span>
            <span className="text-muted-foreground">AI Challenges hosted</span>
          </div>
        </div>
      </div>

      {/* Why Participate Section */}
      <div className="mt-10 bg-white">
        <h1 className="text-3xl font-bold text-center mb-6">
          Why Participate in{" "}
          <span className="text-primary text-custom-green">AI Challenges?</span>
        </h1>

        <div className="bg-white mt-9 justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:ml-20 lg:ml-40">
            {/* Card 1 */}
            <div className="p-6 mb-16 md:mb-36">
              <Card1 width={86} height={86} />
              <h1 className="text-2xl font-bold mt-4">Prove your skills</h1>
              <span className="text-gray-500 mt-4 block max-w-full md:max-w-[430px]">
                Gain substantial experience by solving real-world problems and
                pit against others to come up with innovative solutions.
              </span>
            </div>

            {/* Card 2 */}
            <div className="p-6 mb-16 md:mb-36">
              <h1 className="text-2xl font-bold mt-4">Learn from community</h1>
              <span className="text-gray-500 mt-4 block max-w-full md:max-w-[430px]">
                One can look and analyze the solutions submitted by other Data
                Scientists in the community and learn from them.
              </span>
            </div>

            {/* Card 3 */}
            <div className="p-6 mb-16 md:mb-36">
              <h1 className="text-2xl font-bold mt-4">Challenge yourself</h1>
              <span className="text-gray-500 mt-4 block max-w-full md:max-w-[430px]">
                There is nothing for you to lose by participating in a challenge. You can fail safe,
                learn out of the entire experience, and bounce back harder.
              </span>
            </div>

            {/* Card 4 */}
            <div className="p-6 mb-16 md:mb-36">
              <h1 className="text-2xl font-bold mt-4">Earn recognition</h1>
              <span className="text-gray-500 mt-4 block max-w-full md:max-w-[430px]">
                You will stand out from the crowd if you do well in AI challenges; it not only helps
                you shine in the community but also earns rewards.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
