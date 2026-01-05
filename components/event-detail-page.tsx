"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AddToCalendarButton } from "add-to-calendar-button-react";

// Event type badge themes (matching events-section.tsx)
const eventThemes = {
  "Protest": {
    badge: "Protest",
    badgeColor: "bg-red-600",
    borderColor: "border-red-200",
  },
  "Fundraiser": {
    badge: "Fundraiser",
    badgeColor: "bg-green-600",
    borderColor: "border-green-200",
  },
  "Meeting": {
    badge: "Meeting",
    badgeColor: "bg-blue-600",
    borderColor: "border-blue-200",
  },
  "Workshop": {
    badge: "Workshop",
    badgeColor: "bg-purple-600",
    borderColor: "border-purple-200",
  },
  "Community": {
    badge: "Community",
    badgeColor: "bg-orange-600",
    borderColor: "border-orange-200",
  }
};

interface EventDetailPageProps {
  event: any;
  content: any;
}

export default function EventDetailPage({ event, content }: EventDetailPageProps) {
  const theme = eventThemes[event.eventType as keyof typeof eventThemes] || eventThemes["Community"];

  // Use home page banner for hero
  const heroBannerImage = "/thousand-madleens-banner.jpg";

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

  const displayDate = event.dateTime ? formatDate(event.dateTime) : event.date || '';
  const displayTime = event.dateTime ? formatTime(event.dateTime) : event.time || '';

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as main page */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="w-full max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link href="/">
              <Image
                src={content.navigation.logo.src}
                alt={content.navigation.logo.alt}
                width={80}
                height={80}
                className="h-20 w-auto object-contain cursor-pointer"
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

      {/* Hero Banner - Same as home page */}
      <section className="relative h-96 bg-black text-white overflow-hidden mt-24">
        <div className="absolute inset-0">
          <Image
            src={heroBannerImage}
            alt="Thousand Madleens to Gaza"
            fill
            className="object-cover object-top opacity-20"
          />
          <div className="absolute inset-0 "></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className={`${theme.badgeColor} text-white mb-4`}>
              {event.eventType}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {event.title}
            </h1>

            {/* Event metadata */}
            <div className="flex flex-wrap items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-400" />
                <span className="font-medium text-lg">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-400" />
                <span className="font-medium text-lg">{displayDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-400" />
                <span className="font-medium text-lg">{displayTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Details */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button and Action Buttons */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/#events">
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </Link>

          <div className="flex flex-wrap gap-3">
            {/* Get Tickets Button - Only if ticketsUrl exists */}
            {event.ticketsUrl && (
              <Link href={event.ticketsUrl} target="_blank">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Get Tickets
                </Button>
              </Link>
            )}

            {/* Add to Calendar Button */}
            <div>
              <AddToCalendarButton
                  name={event.title}
                  startDate={event.dateTime.split('T')[0]}
                  startTime={event.dateTime.split('T')[1]}
                  endTime={event.endTime || "23:00"}
                  timeZone="Europe/London"
                  location={event.location}
                  description={event.shortDescription}
                  options="'Apple','Google','iCal','Outlook.com','Microsoft 365'"
                  lightMode="bodyScheme"
              />
            </div>
          </div>
        </div>

        {/* Full Description */}
        <motion.div
          className="prose prose-lg max-w-none mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {event.fullDescription}
          </div>
        </motion.div>

        {/* Event Image Inline */}
        <motion.div
          className="mb-12 relative w-full h-96"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div
          className="border-t border-gray-200 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/#events">
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Events
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
