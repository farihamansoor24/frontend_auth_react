import { Badge, Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Active Users", value: "10K+" },
  { label: "Projects Delivered", value: "250+" },
  { label: "Uptime SLA", value: "99.9%" },
  { label: "Client Satisfaction", value: "4.9/5" },
];

const values = [
  {
    title: "Clarity & Simplicity",
    description:
      "We strip away unnecessary complexity so users and teams can focus on getting meaningful work done.",
  },
  {
    title: "Security by Default",
    description:
      "Every feature is built with thoughtful access controls, clean data handling, and reliable authentication.",
  },
  {
    title: "Continuous Improvement",
    description:
      "We iterate quickly based on real feedback, refining performance and interface polish every release.",
  },
];

const About = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* 1. Intro / Mission Banner */}
      <section className="border-b border-gray-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:border-gray-800 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-screen-xl px-4 py-16 lg:py-20">
          <div className="max-w-3xl">
            <Badge color="info" className="mb-4 w-fit">
              About Us
            </Badge>
            <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Building Practical, Modern Tools for Everyday Teams
            </h1>
            <p className="mb-7 text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
              MyApp started with a straightforward goal: make everyday workflows, user management, and web experiences faster and more intuitive without sacrificing reliability.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button as={Link} to="/contact" color="blue">
                Get in Touch
              </Button>
              <Button as={Link} to="/home" color="light">
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Strip */}
      <section className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
        <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-6 px-4 py-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-xs dark:border-gray-700 dark:bg-gray-900"
            >
              <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Story & Core Values */}
      <section className="mx-auto max-w-screen-xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Story Column */}
          <div className="space-y-4 lg:col-span-5">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Our Story &amp; Mission
            </h2>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-300">
              Too many applications feel bloated, slow, or fragmented across disconnected tools. We focus on clean component architecture, responsive interfaces, and dependable core workflows.
            </p>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-300">
              Whether you are signing in to manage your account or exploring what we offer, our aim is to keep every interaction clear and responsive.
            </p>
          </div>

          {/* Core Values Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1">
            {values.map((item) => (
              <Card
                key={item.title}
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-800"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;