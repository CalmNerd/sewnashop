"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ArrowUpRight } from "lucide-react";
import { AlignJustify, X } from "lucide-react";
import { useRef, useState } from "react";
import { Drawer } from "vaul";
import Logo from "@/components/logo";
import { ProgressiveImageExpansion } from "@/components/ui/progressive-image-expansion";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { motion } from "motion/react";
import { NAV_ITEMS, MOBILE_BREAKPOINT, HERO_ANIMATION_CONFIG, IMAGES } from "@/constants/page.constant";
import { TwitterIcon, InstagramIcon, FacebookIcon } from "@/components/icons/social-icons";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col relative bg-green-500/5">

      <div
        className="absolute flex justify-between gap-2 z-50 top-2 w-full items-center mx-auto px-3 p-2"
      >
        <div className="flex items-center">
          <Logo />
        </div>
        <div
          className="flex bg-transparent sm:backdrop-blur-lg border-2 shadow-sm border-background bg-muted rounded-full max-w-4xl items-center justify-between px-4 sm:px-8 py-2"
        >
          {!isMobile ? (
            <>
              <nav className="flex gap-8 font-medium">
                {NAV_ITEMS.map((item, index) => (
                  <a href={item.href} key={index} className="opacity-60 hover:opacity-100 transition-opacity">{item.label}</a>
                ))}
              </nav>
            </>
          ) : (
            <Drawer.Root direction="right" open={isOpen} onOpenChange={setIsOpen}>
              <Drawer.Trigger className="h-4 grid place-content-center bg-muted border border-background w-fit rounded-lg hover:bg-muted/80 transition-colors">
                <AlignJustify className="w-5 h-5" />
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
                <Drawer.Content
                  className="right-2 top-2 bottom-2 fixed z-50 outline-none w-72 flex"
                  style={
                    {
                      "--initial-transform": "calc(100% + 8px)",
                    } as React.CSSProperties
                  }
                >
                  <div className="bg-muted/95 backdrop-blur-lg border-2 border-background shadow-lg p-2 h-full w-full grow flex flex-col rounded-[16px]">
                    <div className="w-full flex justify-between items-center mb-4">
                      <div className="flex gap-2 px-4 flex-shrink-0 items-center">
                        <Logo />
                      </div>
                      <button
                        className="rounded-md w-fit bg-muted border border-background px-3 py-2 text-sm font-semibold shadow-sm hover:bg-muted/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-green)] transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="rounded-b-md py-2 px-3 flex-1 flex flex-col">
                      <ul className="space-y-2 mb-6">
                        {NAV_ITEMS.map((item, index) => (
                          <li
                            key={index}
                            className="hover:bg-muted/80 cursor-pointer p-3 px-4 rounded-lg transition-colors text-base font-medium"
                            onClick={() => setIsOpen(false)}
                          >
                            <a href={item.href}>{item.label}</a>
                          </li>
                        ))}
                      </ul>
                      {/* Join Sewna Button in Menu for Mobile */}
                      <Link
                        href="https://www.joinsewna.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-muted border-2 shadow-sm border-background cursor-pointer p-2 pl-4 rounded-full flex items-center justify-between gap-2 group relative overflow-hidden transition-transform duration-500 ease-out hover:scale-[0.94] mt-auto"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="relative z-10 font-medium text-sm">Join Sewna</span>
                        <div className="block bg-[var(--brand-green)] flex items-center justify-center shrink-0 p-1 rounded-full relative z-10">
                          <ArrowUpRight className="inline-block text-white shrink-0 size-5" />
                        </div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--brand-green)] rounded-full scale-0 origin-center transition-transform duration-500 ease-out group-hover:scale-[15]"></div>
                      </Link>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          )}
        </div>
        {!isMobile && (
          <Link
            href="https://www.joinsewna.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background border shadow-sm border-background bg-muted cursor-pointer p-1 pl-4 rounded-full flex items-center gap-2 group relative overflow-hidden transition-transform duration-500 ease-out hover:scale-[0.94]"
          >
            <span className="relative z-10 font-medium">Join Sewna</span>
            <div className="block bg-[var(--brand-green)] flex items-center justify-center shrink-0 p-1 rounded-full relative z-10">
              <ArrowUpRight className="inline-block text-white shrink-0 size-6" />
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--brand-green)] rounded-full scale-0 origin-center transition-transform duration-500 ease-out group-hover:scale-[15]"></div>
          </Link>
        )}
      </div>

      <div className="bg-transparent flex-1 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center justify-center overflow-hidden gap-8 text-center pt-20 md:pt-0">
        <motion.div 
          initial={{ opacity: 0, filter: "blur(10px)", y: 50 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={HERO_ANIMATION_CONFIG}
          className="flex flex-1 flex-col gap-4 text-left pl-4 md:pl-6 h-full relative items-start justify-start py-20 md:py-0 md:items-center md:justify-center px-4 md:px-0 min-w-0"
        >
          <div className="flex flex-col gap-4 w-full max-w-2xl min-w-0">
            <h1 className="capitalize text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-left font-satoshi leading-tight tracking-tight break-words">
              Where Every
              <span className="text-[var(--brand-green)] font-pacifico"> Idea</span>
              <br />
              <span className="text-[var(--brand-green)] font-pacifico">Finds </span>
              Its
              <span className="font-fabric"> FABRIC</span>
              <span className="text-[var(--brand-green)] font-pacifico">.</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              <span className="font-medium">Collaborate</span>, <span className="font-medium">customize</span>, and <span className="font-medium">create</span> unique fashion that feels authentically <span className="font-medium">you</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-base sm:text-lg font-medium flex-wrap sm:flex-nowrap">
              <Link href="/designer" className="bg-muted border-2 shadow-sm border-background cursor-pointer p-2 pl-4 rounded-full flex items-center justify-center gap-2 group relative overflow-hidden transition-transform duration-500 ease-out hover:scale-[0.94] text-sm sm:text-base whitespace-nowrap flex-shrink-0">
                <span className="relative z-10">Join as a Designer</span>
                <div className="block bg-[var(--brand-green)] flex items-center justify-center shrink-0 p-1.5 sm:p-2 rounded-full relative z-10">
                  <ArrowUpRight className="inline-block text-white shrink-0 size-4 sm:size-5 md:size-6" />
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--brand-green)] rounded-full scale-0 origin-center transition-transform duration-500 ease-out group-hover:scale-[15]"></div>
              </Link>
              <Link href="/customer" className="bg-muted border-2 shadow-sm border-background cursor-pointer p-2 pl-4 rounded-full flex items-center justify-center gap-2 group relative overflow-hidden transition-transform duration-500 ease-out hover:scale-[0.94] text-sm sm:text-base whitespace-nowrap flex-shrink-0">
                <span className="relative z-10">Hire a Designer</span>
                <div className="block bg-[var(--brand-green)] flex items-center justify-center shrink-0 p-1.5 sm:p-2 rounded-full relative z-10">
                  <ArrowUpRight className="inline-block text-white shrink-0 size-4 sm:size-5 md:size-6" />
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--brand-green)] rounded-full scale-0 origin-center transition-transform duration-500 ease-out group-hover:scale-[15]"></div>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-[6vw] md:translate-x-0 flex gap-3 sm:gap-4 items-center justify-center">
            <a href="https://www.joinsewna.com/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 cursor-pointer">
              <TwitterIcon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </a>
            <a href="https://www.joinsewna.com/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 cursor-pointer">
              <InstagramIcon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </a>
            <a href="https://www.joinsewna.com/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 cursor-pointer">
              <FacebookIcon className="w-[18px] h-[18px] sm:w-5 sm:h-5" />
            </a>
            <span>
              <ModeToggle />
            </span>
          </div>
        </motion.div>
        <div className="overflow-hidden w-full max-h-screen hidden md:flex items-center min-w-0">
          <ProgressiveImageExpansion
            images={IMAGES}
            baseWidth={180}
            baseHeight={250}
            numColumns={5}
            columnGap={16}
            imageGap={12}
            className="w-max"
          />
        </div>
      </div>
    </section>
  );
}
