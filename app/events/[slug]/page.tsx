import { notFound } from "next/navigation";
import EventDetailPage from "@/components/event-detail-page";
import content from "../../../content.json";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params in Next.js 15+
  const { slug } = await params;

  // Find the event by slug
  const event = content.events.events.find((e: any) => e.slug === slug);

  // Return 404 if event not found
  if (!event) {
    notFound();
  }

  return <EventDetailPage event={event} content={content} />;
}

// Generate static params for all events at build time
export function generateStaticParams() {
  return content.events.events.map((event: any) => ({
    slug: event.slug,
  }));
}

// Optional: Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = content.events.events.find((e: any) => e.slug === slug);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `${event.title} - Thousand Madleens to Gaza`,
    description: event.shortDescription,
  };
}
