import AllEventsListing from "@/components/all-events-listing";
import content from "../../content.json";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "All Events - Thousand Madleens to Gaza UK",
  description:
    "View all upcoming events and activities for the Thousand Madleens to Gaza UK delegation.",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header - Same as event detail pages */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="w-full max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link href="/">
              <Image
                src={content.navigation.logo.src}
                alt={content.navigation.logo.alt}
                width={240}
                height={100}
                quality={95}
                className="h-16 w-auto object-contain cursor-pointer my-2 ml-4"
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8 flex-1 justify-center">
            {content.navigation.menuItems.map((item: any) => (
              <Link
                key={item.href}
                href={`/${item.href}`}
                className="text-gray-700 font-bold hover:text-green-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <Link target="_blank" href={content.navigation.buttons[0].href}>
              <Button className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-3 py-2 whitespace-nowrap">
                <span className="hidden sm:inline">
                  {content.navigation.buttons[0].label}
                </span>
                <span className="sm:hidden">
                  {content.navigation.buttons[0].shortLabel}
                </span>
              </Button>
            </Link>
            <Link target="_blank" href={content.navigation.buttons[1].href}>
              <Button className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-3 py-2 whitespace-nowrap">
                <span className="sm:inline">
                  {content.navigation.buttons[1].label}
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              All Events
            </h1>
            <p className="text-lg text-gray-700">
              Join us at events across the UK as we prepare for the Spring 2026
              flotilla
            </p>
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <AllEventsListing content={content} />
    </div>
  );
}
