"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Plus, Grid3x3, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/ui/image-upload";
import { TagSelector } from "@/components/ui/tag-selector";
import { FilterBar, FilterOption } from "@/components/ui/filter-bar";
import { ProgressiveImageExpansion } from "@/components/ui/progressive-image-expansion";
import Logo from "@/components/logo";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PortfolioItem } from "@/types/designer.type";
import {
  AVAILABLE_TAGS,
  VALIDATION_MESSAGES,
  MAX_PORTFOLIO_IMAGES,
  MAX_TAGS_PER_ITEM,
} from "@/constants/designer.constant";

export default function DesignerPortfolioPage() {
    const isMobile = useMediaQuery("(max-width: 992px)");
    const [isUploadMode, setIsUploadMode] = useState(false);
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [newItemTitle, setNewItemTitle] = useState("");
    const [newItemCategory, setNewItemCategory] = useState("");
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const filterCategories: FilterOption[] = [
    { id: "casual", label: "Casual", count: portfolioItems.filter((item) => item.category === "casual").length },
    { id: "formal", label: "Formal", count: portfolioItems.filter((item) => item.category === "formal").length },
    { id: "streetwear", label: "Streetwear", count: portfolioItems.filter((item) => item.category === "streetwear").length },
    { id: "vintage", label: "Vintage", count: portfolioItems.filter((item) => item.category === "vintage").length },
    { id: "minimalist", label: "Minimalist", count: portfolioItems.filter((item) => item.category === "minimalist").length },
  ];
  
  const handleImageUpload = (files: File[]) => {
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prev) => [...prev, ...newUrls]);
  };

  const handleAddPortfolioItem = () => {
    if (uploadedImages.length === 0) {
      alert(VALIDATION_MESSAGES.NO_IMAGES);
      return;
    }

    if (!newItemTitle.trim()) {
      alert(VALIDATION_MESSAGES.NO_TITLE);
      return;
    }

    if (selectedTags.length === 0) {
      alert(VALIDATION_MESSAGES.NO_TAGS);
      return;
    }

    const newItems: PortfolioItem[] = uploadedImages.map((url, index) => ({
      id: `item-${Date.now()}-${index}`,
      imageUrl: url,
      tags: selectedTags,
      title: newItemTitle || `Design ${portfolioItems.length + 1}`,
      category: newItemCategory || selectedTags[0],
    }));

    setPortfolioItems((prev) => [...prev, ...newItems]);
    setUploadedImages([]);
    setSelectedTags([]);
    setNewItemTitle("");
    setNewItemCategory("");
    setIsUploadMode(false);
  };

  const handleRemoveItem = (id: string) => {
    setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredItems = portfolioItems.filter((item) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.some((filterId) => 
      item.category === filterId || item.tags.includes(filterId)
    );
  });

  const galleryImages = filteredItems.map((item) => item.imageUrl);

    return (
        <section className="relative min-h-screen flex flex-col bg-green-500/5">
            {/* Header - Sticky */}
            <div className="sticky top-0 flex justify-between gap-2 z-50 w-full items-center mx-auto px-3 p-2 backdrop-blur-lg">
                <Link href="/" className="flex items-center cursor-pointer">
                    <Logo />
                </Link>
                <div className="flex bg-transparent sm:backdrop-blur-lg border-2 shadow-sm border-background bg-muted rounded-full max-w-4xl items-center justify-between px-8 py-2">
                    {!isMobile ? (
                        <nav className="flex gap-8 font-medium">
                            {[
                                { label: "Portfolio", href: "#" },
                                { label: "Upload", href: "#" },
                                { label: "Settings", href: "#" },
                            ].map((item, index) => (
                                <a href={item.href} key={index} className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">{item.label}</a>
                            ))}
                        </nav>
                    ) : (
                        <nav className="flex gap-4 font-medium">
                            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer">Menu</a>
                        </nav>
                    )}
                </div>
                <Link href="/">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50 hover:bg-muted transition-colors text-sm font-medium hover:border-[var(--brand-green)]/30 cursor-pointer">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                    </button>
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex-1 pt-6 px-6 pb-12 max-w-7xl mx-auto w-full">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    <h1 className="text-6xl font-medium font-satoshi leading-tight tracking-tight mb-4">
                        Your <span className="text-[var(--brand-green)] font-pacifico">Portfolio</span>
                        <br />
                        <span className="text-[var(--brand-green)] font-pacifico">Showcase</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl">
                        Upload your designs, tag them with styles, and build your creative portfolio.
                        Let your work speak for itself.
                    </p>
                </motion.div>

                {/* Upload Section - Only show top button when portfolio has items */}
                {portfolioItems.length > 0 && (
                    <>
                        {isUploadMode ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mb-8 bg-muted/50 rounded-lg p-6 border border-border"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-semibold">Add New Design</h2>
                                    <button
                                        onClick={() => {
                                            setIsUploadMode(false);
                                            setUploadedImages([]);
                                            setSelectedTags([]);
                                            setNewItemTitle("");
                                        }}
                                        className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>

                                {/* Image Upload */}
                                <div className="mb-6">
                                    <ImageUpload
                                        maxImages={MAX_PORTFOLIO_IMAGES}
                                        existingImages={uploadedImages}
                                        onUpload={handleImageUpload}
                                        onRemove={(index) => {
                                            setUploadedImages((prev) => prev.filter((_, i) => i !== index));
                                        }}
                                    />
                                </div>

                                {/* Title Input */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2">
                                        Design Title
                                    </label>
                                    <input
                                        type="text"
                                        value={newItemTitle}
                                        onChange={(e) => setNewItemTitle(e.target.value)}
                                        placeholder="Enter a title for your design..."
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/50"
                                    />
                                </div>

                                {/* Category Select */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={newItemCategory}
                                        onChange={(e) => setNewItemCategory(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/50 cursor-pointer"
                                    >
                                        <option value="">Select a category</option>
                                        {filterCategories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tag Selector */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2">
                                        Tags (Select up to 5)
                                    </label>
                                    <TagSelector
                                        availableTags={AVAILABLE_TAGS}
                                        selectedTags={selectedTags}
                                        onTagsChange={setSelectedTags}
                                        maxTags={MAX_TAGS_PER_ITEM}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="w-full flex justify-center">
                                    <button
                                        onClick={handleAddPortfolioItem}
                                        disabled={uploadedImages.length === 0 || selectedTags.length === 0}
                                        className="w-full sm:w-1/3 border-2 shadow-sm border-background cursor-pointer py-2 px-6 rounded-full flex items-center justify-center gap-1.5 group relative overflow-hidden transition-transform duration-500 ease-out hover:scale-[0.94] bg-[var(--brand-green)] text-background disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
                                    >
                                        <span className="relative z-10 font-medium text-xs">Add to Portfolio</span>
                                        <div className="block flex items-center justify-center shrink-0 p-1 rounded-full relative z-10 bg-background pointer-events-none">
                                            <ArrowUpRight className="inline-block shrink-0 size-3 text-[var(--brand-green)] transition-colors" />
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mb-8"
                            >
                                <button
                                    onClick={() => setIsUploadMode(true)}
                                    className="bg-muted border-2 shadow-sm border-background cursor-pointer p-2 pl-4 rounded-full flex items-center gap-2 group relative overflow-hidden transition-transform duration-500 ease-out hover:scale-[0.94]"
                                >
                                    <Plus className="w-4 h-4 relative z-10" />
                                    <span className="relative z-10 font-medium">Add New Design</span>
                                    <div className="block bg-[var(--brand-green)] flex items-center justify-center shrink-0 p-2 rounded-full relative z-10">
                                        <ArrowUpRight className="inline-block text-white shrink-0 size-6" />
                                    </div>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--brand-green)] rounded-full scale-0 origin-center transition-transform duration-500 ease-out group-hover:scale-[15]"></div>
                                </button>
                            </motion.div>
                        )}
                    </>
                )}

                {/* Filter Bar */}
                {portfolioItems.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="mb-8"
                    >
                        <FilterBar
                            filters={filterCategories}
                            activeFilters={activeFilters}
                            onFiltersChange={setActiveFilters}
                        />
                    </motion.div>
                )}

                {/* Portfolio Gallery */}
                {portfolioItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="p-6 rounded-full bg-[var(--brand-green)]/10 mb-4">
                            <Grid3x3 className="w-12 h-12 text-[var(--brand-green)]" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Your Portfolio is Empty</h3>
                        <p className="text-muted-foreground mb-6">
                            Start building your portfolio by uploading your first design.
                        </p>
                        {/* Upload form when portfolio is empty */}
                        {isUploadMode ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full max-w-2xl bg-muted/50 rounded-lg p-6 border border-border"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-semibold">Add Your First Design</h2>
                                    <button
                                        onClick={() => {
                                            setIsUploadMode(false);
                                            setUploadedImages([]);
                                            setSelectedTags([]);
                                            setNewItemTitle("");
                                        }}
                                        className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>

                                {/* Image Upload */}
                                <div className="mb-6">
                                    <ImageUpload
                                        maxImages={MAX_PORTFOLIO_IMAGES}
                                        existingImages={uploadedImages}
                                        onUpload={handleImageUpload}
                                        onRemove={(index) => {
                                            setUploadedImages((prev) => prev.filter((_, i) => i !== index));
                                        }}
                                    />
                                </div>

                                {/* Title Input */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2">
                                        Design Title
                                    </label>
                                    <input
                                        type="text"
                                        value={newItemTitle}
                                        onChange={(e) => setNewItemTitle(e.target.value)}
                                        placeholder="Enter a title for your design..."
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/50"
                                    />
                                </div>

                                {/* Category Select */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={newItemCategory}
                                        onChange={(e) => setNewItemCategory(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/50 cursor-pointer"
                                    >
                                        <option value="">Select a category</option>
                                        {filterCategories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tag Selector */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-2">
                                        Tags (Select up to 5)
                                    </label>
                                    <TagSelector
                                        availableTags={AVAILABLE_TAGS}
                                        selectedTags={selectedTags}
                                        onTagsChange={setSelectedTags}
                                        maxTags={MAX_TAGS_PER_ITEM}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="w-full flex justify-center">
                                    <button
                                        onClick={handleAddPortfolioItem}
                                        disabled={uploadedImages.length === 0 || selectedTags.length === 0}
                                        className="w-full sm:w-1/3 border-2 shadow-sm border-background cursor-pointer py-2 px-6 rounded-full flex items-center justify-center gap-1.5 group relative overflow-hidden transition-transform duration-500 ease-out hover:scale-[0.94] bg-[var(--brand-green)] text-background disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
                                    >
                                        <span className="relative z-10 font-medium text-xs">Add to Portfolio</span>
                                        <div className="block flex items-center justify-center shrink-0 p-1 rounded-full relative z-10 bg-background pointer-events-none">
                                            <ArrowUpRight className="inline-block shrink-0 size-3 text-[var(--brand-green)] transition-colors" />
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <button
                                onClick={() => setIsUploadMode(true)}
                                className="bg-muted border-2 shadow-sm border-background cursor-pointer p-2 pl-4 rounded-full flex items-center gap-2 group relative overflow-hidden transition-transform duration-500 ease-out hover:scale-[0.94]"
                            >
                                <Plus className="w-4 h-4 relative z-10" />
                                <span className="relative z-10 font-medium">Add Your First Design</span>
                                <div className="block bg-[var(--brand-green)] flex items-center justify-center shrink-0 p-2 rounded-full relative z-10">
                                    <ArrowUpRight className="inline-block text-white shrink-0 size-6" />
                                </div>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--brand-green)] rounded-full scale-0 origin-center transition-transform duration-500 ease-out group-hover:scale-[15]"></div>
                            </button>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="overflow-hidden"
                    >
                        {filteredItems.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-lg text-muted-foreground">
                                    No designs match your selected filters.
                                </p>
                                <button
                                    onClick={() => setActiveFilters([])}
                                    className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <ProgressiveImageExpansion
                                images={galleryImages}
                                baseWidth={180}
                                baseHeight={250}
                                numColumns={5}
                                columnGap={16}
                                imageGap={12}
                                className="w-max"
                            />
                        )}
                    </motion.div>
                )}

                {/* Portfolio Stats */}
                {portfolioItems.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        <div className="p-6 rounded-lg bg-muted/50 border border-border">
                            <div className="text-3xl font-bold text-[var(--brand-green)] mb-1">
                                {portfolioItems.length}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Designs</div>
                        </div>
                        <div className="p-6 rounded-lg bg-muted/50 border border-border">
                            <div className="text-3xl font-bold text-[var(--brand-green)] mb-1">
                                {new Set(portfolioItems.flatMap((item) => item.tags)).size}
                            </div>
                            <div className="text-sm text-muted-foreground">Unique Tags</div>
                        </div>
                        <div className="p-6 rounded-lg bg-muted/50 border border-border">
                            <div className="text-3xl font-bold text-[var(--brand-green)] mb-1">
                                {new Set(portfolioItems.map((item) => item.category)).size}
                            </div>
                            <div className="text-sm text-muted-foreground">Categories</div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

