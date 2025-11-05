"use client";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Filter option type
 */
export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

/**
 * Props for FilterBar component
 */
export interface FilterBarProps {
  /**
   * Available filter options
   */
  filters: FilterOption[];
  /**
   * Currently active filter IDs
   */
  activeFilters: string[];
  /**
   * Callback when filters change
   */
  onFiltersChange: (filterIds: string[]) => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * FilterBar Component
 * 
 * A horizontal filter bar for filtering content by categories.
 * Supports multiple active filters with visual feedback.
 */
export function FilterBar({
  filters,
  activeFilters,
  onFiltersChange,
  className,
}: FilterBarProps) {
  /**
   * Handle filter toggle
   */
  const handleFilterToggle = (filterId: string) => {
    if (activeFilters.includes(filterId)) {
      // Remove filter
      onFiltersChange(activeFilters.filter((id) => id !== filterId));
    } else {
      // Add filter
      onFiltersChange([...activeFilters, filterId]);
    }
  };

  /**
   * Clear all filters
   */
  const handleClearAll = () => {
    onFiltersChange([]);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-4 flex-wrap">
        {/* All Filter */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClearAll}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            activeFilters.length === 0
              ? "bg-[var(--brand-green)] text-white shadow-sm"
              : "bg-muted hover:bg-[var(--brand-green)]/10 hover:border-[var(--brand-green)]/30 border border-border"
          )}
        >
          All
        </motion.button>

        {/* Filter Options */}
        {filters.map((filter) => {
          const isActive = activeFilters.includes(filter.id);

          return (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFilterToggle(filter.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
                isActive
                  ? "bg-[var(--brand-green)] text-white shadow-sm"
                  : "bg-muted hover:bg-[var(--brand-green)]/10 hover:border-[var(--brand-green)]/30 border border-border"
              )}
            >
              {filter.label}
              {filter.count !== undefined && (
                <span className="text-xs opacity-80">({filter.count})</span>
              )}
            </motion.button>
          );
        })}

        {/* Clear Button */}
        {activeFilters.length > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearAll}
            className="px-3 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-all"
          >
            Clear ({activeFilters.length})
          </motion.button>
        )}
      </div>
    </div>
  );
}

