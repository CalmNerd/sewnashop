"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ProgressiveImageExpansionProps {
  images: string[];
  baseWidth?: number;
  baseHeight?: number;
  columnGap?: number;
  imageGap?: number;
  numColumns?: number;
  className?: string;
}

export function ProgressiveImageExpansion({
  images,
  baseWidth = 200,
  baseHeight = 250,
  columnGap = 16,
  imageGap = 12,
  numColumns = 7,
  className,
}: ProgressiveImageExpansionProps) {
  const getImagesPerColumn = (columnIndex: number): number => {
    if (columnIndex === 0) return 1;
    if (columnIndex === 1) return 2;
    return columnIndex + 1;
  };

  // Calculate column width - progressively wider
  const getColumnWidth = (columnIndex: number): number => {
    // Progressive width increase
    const widthMultiplier = 1 + columnIndex * 0.15; // Each column gets 15% wider
    return Math.round(baseWidth * widthMultiplier);
  };

  // Calculate image height - can vary within column for visual interest
  const getImageHeight = (columnIndex: number, imageIndexInColumn: number, totalImagesInColumn: number): number => {
    // Base height with slight variation
    const variation = (imageIndexInColumn % 3 === 0) ? 1.1 : 1.0; // Every 3rd image slightly taller
    return Math.round(baseHeight * variation);
  };

  // Calculate vertical offset for centering first column
  const getColumnVerticalOffset = (columnIndex: number, totalImagesInColumn: number): number => {
    if (columnIndex === 0) {
      // Center the single image vertically
      return 0; // Will be handled by flex centering
    }
    return 0; // Other columns start from top
  };

  // Group images into columns
  const createColumns = () => {
    const columns: Array<Array<{ src: string; index: number }>> = [];
    let imageIndex = 0;

    for (let colIndex = 0; colIndex < numColumns && imageIndex < images.length; colIndex++) {
      const imagesPerColumn = getImagesPerColumn(colIndex);
      const column: Array<{ src: string; index: number }> = [];

      for (let imgInCol = 0; imgInCol < imagesPerColumn && imageIndex < images.length; imgInCol++) {
        column.push({
          src: images[imageIndex % images.length], // Cycle through images if needed
          index: imageIndex,
        });
        imageIndex++;
      }

      columns.push(column);
    }

    return columns;
  };

  const columns = createColumns();

  return (
    <div
      className={cn(
        "flex items-center",
        className
      )}
      style={{
        gap: `${columnGap}px`,
      }}
    >
      {columns.map((columnImages, columnIndex) => {
        const columnWidth = getColumnWidth(columnIndex);
        const totalImagesInColumn = columnImages.length;
        const isFirstColumn = columnIndex === 0;

        return (
          <motion.div
            key={columnIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: columnIndex * 0.15,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="flex flex-col flex-shrink-0"
            style={{
              width: `${columnWidth}px`,
              gap: `${imageGap}px`,
              alignItems: "stretch",
            } as React.CSSProperties}
          >
            {columnImages.map((imageData, imageIndexInColumn) => {
              const imageHeight = getImageHeight(
                columnIndex,
                imageIndexInColumn,
                totalImagesInColumn
              );
              const delay = columnIndex * 0.15 + imageIndexInColumn * 0.05;

              return (
                <motion.div
                  key={imageData.index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="overflow-hidden rounded-lg p-1 shadow-sm bg-background transition-all duration-300 hover:scale-[1.02] flex-shrink-0"
                  style={{
                    width: "100%",
                    height: `${imageHeight}px`,
                  } as React.CSSProperties}
                >
                  <Image
                    src={imageData.src}
                    alt={`Gallery image ${imageData.index + 1}`}
                    width={columnWidth}
                    height={imageHeight}
                    className="w-full h-full object-cover rounded-[6px]"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
}