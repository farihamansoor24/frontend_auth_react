import { Badge, Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Web Development",
    description:
      "Fast, responsive, and scalable web applications built with modern React and cloud architectures.",
    badge: "Popular",
    icon: (
      <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "UI / UX Design",
    description:
      "Clean, user-centered interfaces designed to maximize usability, accessibility, and engagement.",
    badge: "Design",
    icon: (
      <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: "Cloud & API Integration",
    description:
      "Seamless backend integration, authentication workflows, and reliable API management.",
    badge: "Scalable",
    icon: (
      <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
];

const features = [
  {
    title: "Fast Performance",
    description: "Optimized asset delivery and clean state management for near-instant page loads.",
  },
  {
    title: "Secure Authentication",
    description: "Role-based access control and protected routes built right into your workflow.",
  },
  {
    title: "Mobile-First Responsive",
    description: "Consistent layouts across phones, tablets, and wide desktop displays.",
  },
  {
    title: "24/7 Reliable Support",
    description: "Dedicated monitoring and technical assistance whenever your team needs help.",
  },
];

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* 1. Hero Banner */}
      <section className="border-b border-gray-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:border-gray-800 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-screen-xl px-4 py-16 text-center lg:py-24">
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
            Welcome to MyApp
          </div>

          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
            Build Modern Digital Experiences Faster
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 sm:text-lg lg:text-xl dark:text-gray-300">
            Streamline your projects, manage users effortlessly, and launch responsive web applications with confidence.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button as={Link} to="/signup" color="blue" size="lg">
              Get Started Free
            </Button>
            <Button as={Link} to="/about" color="light" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Services Cards */}
      <section className="mx-auto max-w-screen-xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Our Services
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Everything you need to design, develop, and scale your online presence.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
                  {service.icon}
                </div>
                <Badge color="info">{service.badge}</Badge>
              </div>

              <h3 className="mt-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {service.title}
              </h3>

              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {service.description}
              </p>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Request Service
                  <svg className="ml-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Key Features */}
      <section className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
        <div className="mx-auto max-w-screen-xl px-4 py-16">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Why Choose Us
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              Built with clean architecture, strong security, and modern UI standards.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;