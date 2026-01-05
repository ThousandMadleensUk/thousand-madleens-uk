"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PressRelease from "@/components/press-release";
import CampaignProgress from "@/components/campaign-progress";
import EventsSection from "@/components/events-section";
import {
  Ship,
  Heart,
  Users,
  Megaphone,
  Mail,
  MapPin,
  Twitter,
  Instagram,
  ExternalLink,
  Anchor,
  Globe,
  HandHeart,
  MessageSquare,
  AlertTriangle,
  Clipboard,
  Check,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { RiTiktokLine, RiTelegram2Line, RiMailLine } from "react-icons/ri";
import { toast } from "sonner";

// Icon mapping for dynamic icon rendering
const iconMap = {
  Ship,
  Heart,
  Users,
  Megaphone,
  Mail,
  MapPin,
  Twitter,
  Instagram,
  ExternalLink,
  Anchor,
  Globe,
  HandHeart,
  MessageSquare,
  AlertTriangle,
  Clipboard,
  RiTiktokLine,
  RiTelegram2Line,
    RiMailLine,
};

interface MadleensLandingContentProps {
  content: any; // Type this properly based on your content.json structure
}

export default function MadleensLandingContent({ content }: MadleensLandingContentProps) {
  const campaignMessage = content.site.campaignMessage;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="w-full max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Image
              src={content.navigation.logo.src}
              alt={content.navigation.logo.alt}
              width={80}
              height={80}
              className="h-20 w-auto object-contain"
            />
          </div>
          <nav className="hidden md:flex space-x-8 flex-1 justify-center">
            {content.navigation.menuItems.map((item: any) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 font-bold hover:text-green-600 transition-colors"
              >
                {item.label}
              </a>
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

      {/* Combined Hero/Mission Section */}
      <section
        id="mission"
        className="relative min-h-screen bg-black text-white"
      >
        {/* Banner Image Background */}
        <div className="absolute inset-0">
          <Image
            src={content.hero.backgroundImage.src}
            alt={content.hero.backgroundImage.alt}
            fill
            className="object-cover object-top opacity-20"
          />
          <div className="absolute inset-0 "></div>
        </div>

        <div className="relative z-10">
          {/* Hero Content */}
          <div className="container mx-auto px-4 pt-48 pb-16">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 drop-shadow-lg">
                {content.hero.title}
              </h1>
              <div className="inline-block bg-black px-6 py-3 mb-8">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                  {content.hero.subtitle}
                </h2>
              </div>
              <p className="text-xl md:text-2xl lg:text-3xl drop-shadow-lg mb-8">
                {content.hero.tagline}
              </p>
              <p className="text-lg md:text-xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
                {content.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                {content.hero.buttons.map((button: any, index: number) => {
                  const IconComponent =
                    iconMap[button.icon as keyof typeof iconMap];
                  return (
                    <Link key={index} target="_blank" href={button.href}>
                      <Button
                        size="lg"
                        className={
                          button.style === "primary"
                            ? "bg-green-600 hover:bg-green-700 text-white px-8 py-4"
                            : "border-white text-white hover:bg-white hover:text-black bg-transparent px-8 py-4"
                        }
                        variant={
                          button.style === "outline" ? "outline" : "default"
                        }
                      >
                        <IconComponent className="mr-2 h-5 w-5" />
                        {button.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Mission Cards at Bottom - Leaking out of section */}
          <div className="container mx-auto px-4 pb-0 pt-12">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                  {content.mission.title}
                </h2>
                <p className="text-lg text-gray-200">
                  {content.mission.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 transform translate-y-8">
                {content.mission.cards.map((card: any, index: number) => {
                  const IconComponent =
                    iconMap[card.icon as keyof typeof iconMap];
                  return (
                    <Card
                      key={index}
                      className="bg-black border-green-600 border-2 shadow-2xl"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center text-green-400 text-xl">
                          <IconComponent className="mr-2 h-6 w-6" />
                          {card.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {card.description.split('\n\n').map((paragraph: any, pIndex: number) => (
                            <p key={pIndex} className="text-gray-200">{paragraph}</p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Goals & Organization */}
      <section id="goals" className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-green-600 mb-6">
                {content.goals.title}
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                {content.goals.description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {content.goals.items.map((item: any, index: number) => {
                const IconComponent =
                  iconMap[item.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-16 w-16 text-green-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-green-600 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-700">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                {content.getInvolved.title}
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
                {content.getInvolved.description}
              </p>
            </div>

            {/* Two-column grid on desktop, stacked on mobile */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Campaign Progress Card */}
              <div>
                <CampaignProgress campaignId={content.getInvolved.campaignId} />
              </div>

              {/* Join UK Delegation Card */}
              <div className="bg-white rounded-lg border-2 border-green-200 shadow-lg p-6 flex flex-col">
                <div className="space-y-4 mb-6 flex-grow">
                  {content.getInvolved.joinDelegation.points.map((point: any, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-base text-gray-700 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
                <Link href={content.getInvolved.joinDelegation.buttonUrl} target="_blank" className="block">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-bold">
                    <Users className="mr-2 h-5 w-5" />
                    {content.getInvolved.joinDelegation.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <EventsSection content={content} />

      {/* Press Release Section */}
      <PressRelease content={content} />

      {/* Social Media Section - Moved to Bottom */}
      <section className="py-8 sm:py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6">
              {content.socialMedia.title}
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-4 sm:mb-8">
              {content.socialMedia.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 mb-3 sm:mb-4">
              {content.socialMedia.platforms.map((platform: any, index: number) => {
                const IconComponent =
                  iconMap[platform.icon as keyof typeof iconMap];
                return (
                  <motion.a
                    key={index}
                    href={platform.href}
                    target="_blank"
                    className="flex flex-col items-center p-2 sm:p-4 lg:p-6 bg-gray-800 hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <IconComponent
                      className={`h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 ${platform.color} mb-1 sm:mb-2 lg:mb-3`}
                    />
                    <span className="font-semibold text-xs sm:text-sm lg:text-base">
                      {platform.name}
                    </span>
                    <span className="text-xs text-gray-400 hidden sm:block">
                      {platform.description}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            <div className="bg-gray-800 p-3 sm:p-4 lg:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
                {content.socialMedia.shareSection.title}
              </h3>
              <div className="bg-gray-700 p-2 sm:p-3 lg:p-4 mb-2 sm:mb-4">
                <p
                  className="text-xs sm:text-sm text-gray-300 italic"
                  id="campaign-message"
                >
                  &quot;{campaignMessage}&quot;
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                {content.socialMedia.shareSection.buttons.map(
                  (button: any, index: number) => {
                    const IconComponent =
                      iconMap[button.icon as keyof typeof iconMap];

                    if (button.action === "copy") {
                      return (
                        <Button
                          key={index}
                          className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm px-3 py-2"
                          onClick={async () => {
                            await navigator.clipboard.writeText(
                              campaignMessage
                            );
                            toast.success("Message copied to clipboard!");
                          }}
                        >
                          <IconComponent className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">
                            {button.label}
                          </span>
                          <span className="sm:hidden">{button.shortLabel}</span>
                        </Button>
                      );
                    }

                    if (button.action === "email") {
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          className="border-white text-white hover:bg-white hover:text-black bg-transparent text-xs sm:text-sm px-3 py-2"
                          onClick={() => {
                            const subject = encodeURIComponent(
                              "Join the 1000 Madleens to Gaza Campaign"
                            );
                            const body = encodeURIComponent(
                              `${campaignMessage}\n\nLearn more and get involved: ${window.location.href}`
                            );
                            window.open(
                              `mailto:?subject=${subject}&body=${body}`
                            );
                            toast.info("Email client opened");
                          }}
                        >
                          <IconComponent className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">
                            {button.label}
                          </span>
                          <span className="sm:hidden">{button.shortLabel}</span>
                        </Button>
                      );
                    }

                    if (button.href) {
                      return (
                        <Link key={index} href={button.href} target="_blank">
                          <Button
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-black bg-transparent text-xs sm:text-sm px-3 py-2"
                          >
                            <IconComponent className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">
                              {button.label}
                            </span>
                            <span className="sm:hidden">
                              {button.shortLabel}
                            </span>
                          </Button>
                        </Link>
                      );
                    }

                    return null;
                  }
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                {content.disclaimer.title}
              </h2>
            </div>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  {(() => {
                    const IconComponent =
                      iconMap[content.disclaimer.icon as keyof typeof iconMap];
                    return <IconComponent className="mr-2 h-5 w-5" />;
                  })()}
                  {content.disclaimer.subtitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                {content.disclaimer.points.map((point: any, index: number) => (
                  <p key={index}>
                    <strong>{point.title}:</strong> {point.description}
                  </p>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src={content.footer.logo.src}
                  alt={content.footer.logo.alt}
                  width={96}
                  height={96}
                  className="h-24 w-auto object-contain filter brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 text-sm">
                {content.footer.description}
              </p>
            </div>

            {content.footer.sections.map((section: any, index: number) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {section.links.map((link: any, linkIndex: number) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        className="hover:text-green-400 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {content.footer.socialLinks.map((social: any, index: number) => {
                  const IconComponent =
                    iconMap[social.icon as keyof typeof iconMap];
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      className="border border-gray-600 text-gray-400 hover:text-white hover:border-green-400 bg-transparent rounded px-2 py-2 transition-colors"
                    >
                      <IconComponent className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {content.footer.copyright.text} |
              {content.footer.copyright.links.map((link: any, index: number) => (
                <span key={index}>
                  <a
                    href={link.href}
                    className="hover:text-green-400 transition-colors ml-1"
                  >
                    {link.label}
                  </a>
                  {index < content.footer.copyright.links.length - 1 && " |"}
                </span>
              ))}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
