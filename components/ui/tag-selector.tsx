"use client";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";


export interface Tag {
  id: string;
  label: string;
  color?: string;
}

export interface TagSelectorProps {
  availableTags: Tag[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  maxTags?: number;
  className?: string;
}


export function TagSelector({
  availableTags,
  selectedTags,
  onTagsChange,
  maxTags = 5,
  className,
}: TagSelectorProps) {

  const handleTagToggle = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagsChange(selectedTags.filter((id) => id !== tagId));
    } else {
      if (selectedTags.length < maxTags) {
        onTagsChange([...selectedTags, tagId]);
      }
    }
  };

  const handleRemoveTag = (tagId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onTagsChange(selectedTags.filter((id) => id !== tagId));
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTags.map((tagId) => {
            const tag = availableTags.find((t) => t.id === tagId);
            if (!tag) return null;

            return (
              <motion.div
                key={tagId}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-green)]/10 border border-[var(--brand-green)]/30 text-sm font-medium"
              >
                <span>{tag.label}</span>
                <button
                  onClick={(e) => handleRemoveTag(tagId, e)}
                  className="hover:bg-[var(--brand-green)]/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Available Tags */}
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => {
          const isSelected = selectedTags.includes(tag.id);
          const isDisabled = !isSelected && selectedTags.length >= maxTags;

          return (
            <motion.button
              key={tag.id}
              whileHover={{ scale: isDisabled ? 1 : 1.05 }}
              whileTap={{ scale: isDisabled ? 1 : 0.95 }}
              onClick={() => handleTagToggle(tag.id)}
              disabled={isDisabled}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                isSelected
                  ? "bg-[var(--brand-green)] text-white shadow-sm"
                  : isDisabled
                    ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                    : "bg-muted hover:bg-[var(--brand-green)]/10 hover:border-[var(--brand-green)]/30 border border-border"
              )}
            >
              {tag.label}
            </motion.button>
          );
        })}
      </div>

      {selectedTags.length >= maxTags && (
        <p className="text-xs text-muted-foreground mt-2">
          Maximum {maxTags} tags selected
        </p>
      )}
    </div>
  );
}

