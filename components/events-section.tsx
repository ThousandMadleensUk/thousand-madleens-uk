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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import defaultContent from "../content.json";

// Event type badge themes
const eventThemes = {
  "Protest": {
    badge: "Protest",
    badgeColor: "bg-red-600",
    borderColor: "border-red-200",
    buttonColor: "border-red-600 text-red-600 hover:bg-red-50"
  },
  "Fundraiser": {
    badge: "Fundraiser",
    badgeColor: "bg-green-600",
    borderColor: "border-green-200",
    buttonColor: "border-green-600 text-green-600 hover:bg-green-50"
  },
  "Meeting": {
    badge: "Meeting",
    badgeColor: "bg-blue-600",
    borderColor: "border-blue-200",
    buttonColor: "border-blue-600 text-blue-600 hover:bg-blue-50"
  },
  "Workshop": {
    badge: "Workshop",
    badgeColor: "bg-purple-600",
    borderColor: "border-purple-200",
    buttonColor: "border-purple-600 text-purple-600 hover:bg-purple-50"
  },
  "Community": {
    badge: "Community",
    badgeColor: "bg-orange-600",
    borderColor: "border-orange-200",
    buttonColor: "border-orange-600 text-orange-600 hover:bg-orange-50"
  }
};

interface EventsSectionProps {
  content?: any;
}

export default function EventsSection({ content = defaultContent }: EventsSectionProps) {
  const [currentSet, setCurrentSet] = useState(0);

  const { title, description, events } = content.events;

  // Format date and time for display from ISO datetime
  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Filter out events that are more than 24 hours in the past and sort by date ascending
  const upcomingEvents = events
    .filter((event: any) => {
      if (!event.dateTime) return true; // Keep events without dateTime

      const eventDate = new Date(event.dateTime);
      const now = new Date();
      const hoursSinceEvent = (now.getTime() - eventDate.getTime()) / (1000 * 60 * 60);

      // Keep event if it's less than 24 hours in the past or in the future
      return hoursSinceEvent < 24;
    })
    .sort((a: any, b: any) => {
      // Sort by dateTime ascending (soonest first)
      return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
    });

  // Split events into sets of 3
  const eventsPerSet = 3;
  const totalSets = Math.ceil(upcomingEvents.length / eventsPerSet);

  const getCurrentEvents = () => {
    const start = currentSet * eventsPerSet;
    return upcomingEvents.slice(start, start + eventsPerSet);
  };

  const nextSet = () => {
    setCurrentSet((prev) => (prev + 1) % totalSets);
  };

  const previousSet = () => {
    setCurrentSet((prev) => (prev - 1 + totalSets) % totalSets);
  };

  return (
    <section id="events" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              {title}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {description}
            </p>
          </div>

          {/* Events Display */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSet}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 gap-4 md:gap-6 max-w-4xl mx-auto"
              >
                {getCurrentEvents().map((event: any, index: number) => {
                  // Get theme styling
                  const theme = eventThemes[event.eventType as keyof typeof eventThemes] || eventThemes["Community"];

                  // Format date/time for display
                  const displayDate = event.dateTime ? formatDate(event.dateTime) : event.date || '';
                  const displayTime = event.dateTime ? formatTime(event.dateTime) : event.time || '';

                  return (
                    <motion.div
                      key={event.slug}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group"
                    >
                      <Card
                        className={`overflow-hidden h-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] ${theme.borderColor}`}
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative h-64 sm:h-full sm:w-64 lg:w-80 overflow-hidden flex-shrink-0">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge
                                className={`${theme.badgeColor} text-white text-xs`}
                              >
                                {theme.badge}
                              </Badge>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          <CardContent className="p-4 sm:p-6 flex-1">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-3 line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
                              {event.title}
                            </h3>

                            {/* Event metadata */}
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{displayDate}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{displayTime}</span>
                              </div>
                            </div>

                            <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
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
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-green-100 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-green-100 rounded-full opacity-20 animate-pulse" />
          </div>

          {/* Pagination Controls */}
          {totalSets > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <Button
                variant="outline"
                size="sm"
                onClick={previousSet}
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>

              {/* Pagination dots */}
              <div className="flex gap-2">
                {Array.from({ length: totalSets }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSet(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSet
                        ? "bg-green-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextSet}
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

          {/* Page counter */}
          {totalSets > 1 && (
            <div className="text-center mt-4">
              <span className="text-xs sm:text-sm text-gray-500">
                Page {currentSet + 1} of {totalSets}
              </span>
            </div>
          )}

          {/* View All Events Button */}
          <div className="text-center mt-8">
            <Link href="/events">
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4"
              >
                View All Events
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
