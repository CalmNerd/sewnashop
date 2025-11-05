"use client";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";


export interface ImageUploadProps {

  maxImages?: number;
  accept?: string;
  onUpload?: (files: File[]) => void;
  existingImages?: string[];
  onRemove?: (index: number) => void;
  className?: string;
}

export function ImageUpload({
  maxImages = 10,
  accept = "image/*",
  onUpload,
  existingImages = [],
  onRemove,
  className,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>(existingImages);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const remainingSlots = maxImages - previewImages.length;

    if (fileArray.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more image(s)`);
      return;
    }

    const newPreviewUrls: string[] = [];
    fileArray.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        newPreviewUrls.push(url);
      }
    });

    setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
    onUpload?.(fileArray);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    setPreviewImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      return newImages;
    });
    onRemove?.(index);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 cursor-pointer transition-all duration-300",
          isDragging
            ? "border-[var(--brand-green)] bg-[var(--brand-green)]/10 scale-[1.02]"
            : "border-muted-foreground/30 hover:border-[var(--brand-green)]/50 hover:bg-[var(--brand-green)]/5"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="p-4 rounded-full bg-[var(--brand-green)]/10">
            <Upload className="w-8 h-8 text-[var(--brand-green)]" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">
              {isDragging ? "Drop images here" : "Click to upload or drag and drop"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {previewImages.length} / {maxImages} images
            </p>
          </div>
        </div>
      </motion.div>

      {/* Preview Grid */}
      {previewImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"
        >
          {previewImages.map((url, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted"
            >
              <Image
                src={url}
                alt={`Upload preview ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

