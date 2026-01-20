"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import defaultContent from "../content.json";

// Event type badge themes (same as events-section.tsx)
const eventThemes = {
  Protest: {
    badge: "Protest",
    badgeColor: "bg-red-600",
    borderColor: "border-red-200",
    buttonColor: "border-red-600 text-red-600 hover:bg-red-50",
  },
  Fundraiser: {
    badge: "Fundraiser",
    badgeColor: "bg-green-600",
    borderColor: "border-green-200",
    buttonColor: "border-green-600 text-green-600 hover:bg-green-50",
  },
  Meeting: {
    badge: "Meeting",
    badgeColor: "bg-blue-600",
    borderColor: "border-blue-200",
    buttonColor: "border-blue-600 text-blue-600 hover:bg-blue-50",
  },
  Workshop: {
    badge: "Workshop",
    badgeColor: "bg-purple-600",
    borderColor: "border-purple-200",
    buttonColor: "border-purple-600 text-purple-600 hover:bg-purple-50",
  },
  Community: {
    badge: "Community",
    badgeColor: "bg-orange-600",
    borderColor: "border-orange-200",
    buttonColor: "border-orange-600 text-orange-600 hover:bg-orange-50",
  },
};

interface AllEventsListingProps {
  content?: any;
}

export default function AllEventsListing({
  content = defaultContent,
}: AllEventsListingProps) {
  const [upcomingPage, setUpcomingPage] = useState(0);
  const [pastPage, setPastPage] = useState(0);
  const [showPastEvents, setShowPastEvents] = useState(false);

  const { events } = content.events;

  // Format date and time for display from ISO datetime
  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Filter events into upcoming and past
  const upcomingEvents = events
    .filter((event: any) => {
      if (!event.dateTime) return true;
      const eventDate = new Date(event.dateTime);
      const now = new Date();
      const hoursSinceEvent =
        (now.getTime() - eventDate.getTime()) / (1000 * 60 * 60);
      return hoursSinceEvent < 24; // Within 24hrs or future
    })
    .sort(
      (a: any, b: any) =>
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
    );

  const pastEvents = events
    .filter((event: any) => {
      if (!event.dateTime) return false;
      const eventDate = new Date(event.dateTime);
      const now = new Date();
      const hoursSinceEvent =
        (now.getTime() - eventDate.getTime()) / (1000 * 60 * 60);
      return hoursSinceEvent >= 24; // More than 24hrs ago
    })
    .sort(
      (a: any, b: any) =>
        new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
    );

  const eventsPerPage = 30;

  // Pagination for upcoming events
  const upcomingTotalPages = Math.ceil(upcomingEvents.length / eventsPerPage);
  const getCurrentUpcomingEvents = () => {
    const start = upcomingPage * eventsPerPage;
    return upcomingEvents.slice(start, start + eventsPerPage);
  };

  // Pagination for past events
  const pastTotalPages = Math.ceil(pastEvents.length / eventsPerPage);
  const getCurrentPastEvents = () => {
    const start = pastPage * eventsPerPage;
    return pastEvents.slice(start, start + eventsPerPage);
  };

  // Pagination handlers
  const nextUpcomingPage = () => {
    setUpcomingPage((prev) => (prev + 1) % upcomingTotalPages);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previousUpcomingPage = () => {
    setUpcomingPage((prev) => (prev - 1 + upcomingTotalPages) % upcomingTotalPages);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextPastPage = () => {
    setPastPage((prev) => (prev + 1) % pastTotalPages);
  };

  const previousPastPage = () => {
    setPastPage((prev) => (prev - 1 + pastTotalPages) % pastTotalPages);
  };

  // Render event card
  const renderEventCard = (event: any, index: number) => {
    const theme =
      eventThemes[event.eventType as keyof typeof eventThemes] ||
      eventThemes["Community"];

    const displayDate = event.dateTime ? formatDate(event.dateTime) : event.date || "";
    const displayTime = event.dateTime ? formatTime(event.dateTime) : event.time || "";

    return (
      <motion.div
        key={event.slug}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.05 }}
        className="group"
      >
        <Card
          className={`overflow-hidden h-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] ${theme.borderColor}`}
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-3 left-3">
              <Badge className={`${theme.badgeColor} text-white text-xs`}>
                {theme.badge}
              </Badge>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-black mb-3 line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
              {event.title}
            </h3>

            {/* Event metadata */}
            <div className="flex flex-col gap-2 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{displayDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>{displayTime}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {event.shortDescription}
            </p>

            <div className="flex items-center justify-end">
              <Link href={`/events/${event.slug}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${theme.buttonColor} bg-transparent transition-all duration-300 hover:shadow-md`}
                >
                  View Details
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Upcoming Events Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
              Upcoming Events
            </h2>

            {upcomingEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  No upcoming events at the moment. Check back soon!
                </p>
              </div>
            ) : (
              <>
                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {getCurrentUpcomingEvents().map((event: any, index: number) =>
                    renderEventCard(event, index)
                  )}
                </div>

                {/* Pagination Controls */}
                {upcomingTotalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={previousUpcomingPage}
                      className="border-green-600 text-green-600 hover:bg-green-50"
                      disabled={upcomingPage === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>

                    <span className="text-sm text-gray-600">
                      Page {upcomingPage + 1} of {upcomingTotalPages}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextUpcomingPage}
                      className="border-green-600 text-green-600 hover:bg-green-50"
                      disabled={upcomingPage === upcomingTotalPages - 1}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Past Events Section */}
          {pastEvents.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-black">
                  Past Events
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setShowPastEvents(!showPastEvents)}
                  className="border-gray-400 text-gray-700 hover:bg-gray-50"
                >
                  {showPastEvents ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Hide Past Events
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      View Past Events
                    </>
                  )}
                </Button>
              </div>

              <AnimatePresence>
                {showPastEvents && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {getCurrentPastEvents().map((event: any, index: number) =>
                        renderEventCard(event, index)
                      )}
                    </div>

                    {/* Pagination Controls */}
                    {pastTotalPages > 1 && (
                      <div className="flex items-center justify-center gap-4 mt-12">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={previousPastPage}
                          className="border-gray-600 text-gray-600 hover:bg-gray-50"
                          disabled={pastPage === 0}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Previous
                        </Button>

                        <span className="text-sm text-gray-600">
                          Page {pastPage + 1} of {pastTotalPages}
                        </span>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={nextPastPage}
                          className="border-gray-600 text-gray-600 hover:bg-gray-50"
                          disabled={pastPage === pastTotalPages - 1}
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
