
import { Tag } from "@/components/ui/tag-selector";

export const AVAILABLE_TAGS: Tag[] = [
  { id: "casual", label: "Casual" },
  { id: "formal", label: "Formal" },
  { id: "streetwear", label: "Streetwear" },
  { id: "vintage", label: "Vintage" },
  { id: "minimalist", label: "Minimalist" },
  { id: "bohemian", label: "Bohemian" },
  { id: "sporty", label: "Sporty" },
  { id: "elegant", label: "Elegant" },
  { id: "colorful", label: "Colorful" },
  { id: "neutral", label: "Neutral" },
  { id: "summer", label: "Summer" },
  { id: "winter", label: "Winter" },
];

export const VALIDATION_MESSAGES = {
  NO_IMAGES: "Please upload at least one image",
  NO_TITLE: "Please enter a title",
  NO_TAGS: "Please select at least one tag",
} as const;

export const MAX_PORTFOLIO_IMAGES = 10;

export const MAX_TAGS_PER_ITEM = 5;

