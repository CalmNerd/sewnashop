import { NavItem } from "@/types/page.type";

export const NAV_ITEMS: NavItem[] = [
    { label: "About", href: "#" },
    { label: "Apps", href: "#" },
    { label: "Features", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
];

export const MOBILE_BREAKPOINT = "(max-width: 992px)";

export const HERO_ANIMATION_CONFIG = {
    duration: 0.8,
    delay: 0.2,
    ease: "easeOut" as const,
} as const;

export const IMAGES = [
    "/gg.png",
    "/pink.jpg",
    "/gg.jpg",
    "/yw.jpg",
    "/be.jpg",
    "/craft.jpg",
    "/bluegradient.jpg",
    "/boy.jpg",
    "/darkg.jpg",
    "/art.jpg",
    "/black.jpg",
    "/outfit.png",
    "/green.png",
    "/vool.jpg",
    "/bb.jpg",
]
