"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import defaultContent from "../content.json";

interface PressReleaseProps {
  content?: any;
}

export default function PressRelease({ content = defaultContent }: PressReleaseProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pressRelease } = content;

  return (
    <section
      id="press-release"
      className="py-12 bg-gradient-to-br from-green-50 via-white to-green-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Compact Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Badge className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs font-bold">
                PRESS RELEASE
              </Badge>
              <Badge
                variant="outline"
                className="border-green-600 text-green-600 px-2 py-1 text-xs"
              >
                {pressRelease.date}
              </Badge>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-black mb-2 leading-tight">
              {pressRelease.announcement.title}
            </h2>
          </div>

          {/* Compact Press Release Card */}
          <Card className="border-2 border-green-200 shadow-lg bg-white">
            <CardContent className="p-4 lg:p-6">
              {/* Key Description */}
              <div className="mb-4">
                <p className="text-base text-gray-800 leading-relaxed font-medium">
                  {pressRelease.announcement.description}
                </p>
              </div>

              {/* Compact Key Messages */}
              <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-600">
                <div className="flex flex-wrap gap-2">
                  {pressRelease.announcement.keyMessages.map(
                    (message, index) => (
                      <span
                        key={index}
                        className="text-green-700 font-semibold italic text-sm"
                      >
                        "{message}"
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Expandable Full Content */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-gray-900">
                    Full Press Release
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="border-green-600 text-green-600 hover:bg-green-50 text-xs"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-3 w-3 mr-1" />
                        Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 mr-1" />
                        Read More
                      </>
                    )}
                  </Button>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-4 border-t border-gray-200">
                    {/* Display structured sections */}
                    {pressRelease.announcement.sections.map(
                      (section, index) => (
                        <div key={index} className="space-y-2">
                          {section.title && (
                            <h5 className="text-base font-bold text-gray-900">
                              {section.title}
                            </h5>
                          )}
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                      )
                    )}

                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-800 font-medium">
                        {pressRelease.announcement.callToAction}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Compact Media Contacts & Websites */}
                {!isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <h5 className="text-sm font-bold text-gray-900 mb-2">
                          Media Contacts
                        </h5>
                        <div className="space-y-1">
                          {pressRelease.announcement.mediaContacts.map(
                            (contact, index) => (
                              <div key={index} className="text-xs">
                                <span className="font-medium">
                                  {contact.name}
                                </span>
                                <span className="text-gray-600"> - </span>
                                <a
                                  href={`mailto:${contact.email}`}
                                  className="text-green-600 hover:underline"
                                >
                                  {contact.email}
                                </a>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-bold text-gray-900 mb-2">
                          Official Websites
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {pressRelease.announcement.websites.map(
                            (website, index) => (
                              <Link key={index} href={website} target="_blank">
                                <Badge
                                  variant="outline"
                                  className="border-green-600 text-green-600 hover:bg-green-50 text-xs px-2 py-1"
                                >
                                  {website
                                    .replace("https://", "")
                                    .replace("www.", "")}
                                </Badge>
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Detailed Contacts & Websites (when expanded) */}
                {isExpanded && (
                  <>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-base font-bold text-gray-900 mb-3">
                        Media Contacts
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {pressRelease.announcement.mediaContacts.map(
                          (contact, index) => (
                            <div
                              key={index}
                              className="p-3 bg-gray-50 rounded-lg"
                            >
                              <h5 className="font-semibold text-gray-900 mb-1 text-sm">
                                {contact.name}
                              </h5>
                              <p className="text-xs text-gray-600 mb-2">
                                {contact.organization}
                              </p>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-xs">
                                  <Mail className="h-3 w-3 text-gray-500" />
                                  <a
                                    href={`mailto:${contact.email}`}
                                    className="text-green-600 hover:text-green-700 hover:underline"
                                  >
                                    {contact.email}
                                  </a>
                                </div>
                                {contact.phone && (
                                  <div className="flex items-center gap-2 text-xs">
                                    <Phone className="h-3 w-3 text-gray-500" />
                                    <a
                                      href={`tel:${contact.phone}`}
                                      className="text-green-600 hover:text-green-700 hover:underline"
                                    >
                                      {contact.phone}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-base font-bold text-gray-900 mb-3">
                        Official Websites
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pressRelease.announcement.websites.map(
                          (website, index) => (
                            <Link key={index} href={website} target="_blank">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-600 text-green-600 hover:bg-green-50 text-xs"
                              >
                                <Globe className="h-3 w-3 mr-1" />
                                {website
                                  .replace("https://", "")
                                  .replace("www.", "")}
                                <ExternalLink className="h-2 w-2 ml-1" />
                              </Button>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Compact Call to Action */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-green-600 text-white p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2">
                Join the Historic Flotilla
              </h3>
              <p className="mb-3 text-green-100 text-sm">
                Be part of this unprecedented maritime movement for Palestinian
                freedom
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link
                  href="https://chuffed.org/project/138012-a-thousand-madleens-to-gaza"
                  target="_blank"
                >
                  <Button className="bg-white text-green-600 hover:bg-gray-100 font-semibold text-sm">
                    Support the Mission
                  </Button>
                </Link>
                <Link
                  href="https://linktr.ee/thousand.madleens"
                  target="_blank"
                >
                  <Button
                    variant="outline"
                    className="border-white text-green-600 hover:bg-white hover:text-green-600 text-sm"
                  >
                    Join the Movement
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
