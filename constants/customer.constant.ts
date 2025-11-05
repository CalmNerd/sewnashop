
import { FilterOption } from "@/components/ui/filter-bar";
import { DesignerProfile } from "@/types/customer.type";

export const DESIGNERS: DesignerProfile[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/boy.jpg",
    specialization: ["casual", "streetwear", "minimalist"],
    rating: 4.9,
    portfolioCount: 24,
    portfolioImages: [
      "/gg.png",
      "/pink.jpg",
      "/gg.jpg",
      "/yw.jpg",
      "/be.jpg",
      "/craft.jpg",
    ],
    bio: "Specializing in modern streetwear with minimalist touches",
  },
  {
    id: "2",
    name: "Marcus Williams",
    avatar: "/bluegradient.jpg",
    specialization: ["formal", "elegant"],
    rating: 4.8,
    portfolioCount: 18,
    portfolioImages: [
      "/bluegradient.jpg",
      "/darkg.jpg",
      "/art.jpg",
      "/black.jpg",
      "/outfit.png",
    ],
    bio: "Creating elegant formal wear for special occasions",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    avatar: "/green.png",
    specialization: ["bohemian", "vintage", "colorful"],
    rating: 4.7,
    portfolioCount: 31,
    portfolioImages: [
      "/green.png",
      "/vool.jpg",
      "/bb.jpg",
      "/red.jpg",
      "/redy.jpg",
      "/yellow.jpg",
    ],
    bio: "Bohemian and vintage-inspired designs with vibrant colors",
  },
  {
    id: "4",
    name: "Alex Kim",
    avatar: "/art.jpg",
    specialization: ["casual", "sporty", "minimalist"],
    rating: 4.9,
    portfolioCount: 22,
    portfolioImages: [
      "/art.jpg",
      "/craft.jpg",
      "/gg.png",
      "/pink.jpg",
      "/be.jpg",
    ],
    bio: "Active wear and casual designs with clean aesthetics",
  },
];

export const MAX_INSPIRATION_IMAGES = 5;

export const BREAKPOINTS = {
  MOBILE: "(max-width: 992px)",
  SMALL_OR_MEDIUM: "(max-width: 1023px)",
} as const;

export const FILTER_CATEGORIES: FilterOption[] = [
    { id: "casual", label: "Casual", count: DESIGNERS.filter((d) => d.specialization.includes("casual")).length },
    { id: "formal", label: "Formal", count: DESIGNERS.filter((d) => d.specialization.includes("formal")).length },
    { id: "streetwear", label: "Streetwear", count: DESIGNERS.filter((d) => d.specialization.includes("streetwear")).length },
    { id: "vintage", label: "Vintage", count: DESIGNERS.filter((d) => d.specialization.includes("vintage")).length },
    { id: "minimalist", label: "Minimalist", count: DESIGNERS.filter((d) => d.specialization.includes("minimalist")).length },
    { id: "bohemian", label: "Bohemian", count: DESIGNERS.filter((d) => d.specialization.includes("bohemian")).length },
    { id: "sporty", label: "Sporty", count: DESIGNERS.filter((d) => d.specialization.includes("sporty")).length },
    { id: "elegant", label: "Elegant", count: DESIGNERS.filter((d) => d.specialization.includes("elegant")).length },
];