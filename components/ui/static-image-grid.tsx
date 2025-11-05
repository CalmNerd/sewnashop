"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface StaticImageGridProps {
  images: string[];
  columns?: number;
  gap?: number;
  className?: string;
}

export function StaticImageGrid({
  images,
  columns = 2,
  gap = 12,
  className,
}: StaticImageGridProps) {
  return (
    <div
      className={cn(
        "grid w-full",
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
      } as React.CSSProperties}
    >
      {images.map((src, index) => (
        <motion.div
          key={`${src}-${index}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.05,
            duration: 0.4,
            ease: "easeOut",
          }}
          className="overflow-hidden rounded-lg shadow-sm bg-background transition-all duration-300 hover:scale-[1.02] aspect-[3/4] relative"
        >
          <Image
            src={src}
            alt={`Gallery image ${index + 1}`}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </motion.div>
      ))}
    </div>
  );
}

