"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Search, Upload, Sparkles, ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/ui/image-upload";
import { FilterBar } from "@/components/ui/filter-bar";
import { ProgressiveImageExpansion } from "@/components/ui/progressive-image-expansion";
import { StaticImageGrid } from "@/components/ui/static-image-grid";
import Logo from "@/components/logo";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DesignerProfile } from "@/types/customer.type";
import { DESIGNERS, MAX_INSPIRATION_IMAGES, BREAKPOINTS, FILTER_CATEGORIES } from "@/constants/customer.constant";

export default function CustomerDiscoveryPage() {
    const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);
    const isSmallOrMedium = useMediaQuery(BREAKPOINTS.SMALL_OR_MEDIUM);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [showInspirationUpload, setShowInspirationUpload] = useState(false);
    const [inspirationImages, setInspirationImages] = useState<string[]>([]);
    const [selectedDesigner, setSelectedDesigner] = useState<DesignerProfile | null>(null);

    const filteredDesigners = DESIGNERS.filter((designer) => {
        const matchesSearch =
            searchQuery === "" ||
            designer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            designer.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            designer.specialization.some((spec) =>
                spec.toLowerCase().includes(searchQuery.toLowerCase())
            );

        // Category filter
        const matchesFilters =
            activeFilters.length === 0 ||
            activeFilters.some((filter) =>
                designer.specialization.includes(filter)
            );

        return matchesSearch && matchesFilters;
    });

    const handleInspirationUpload = (files: File[]) => {
        const newUrls = files.map((file) => URL.createObjectURL(file));
        setInspirationImages((prev) => [...prev, ...newUrls]);
    };

    const getAllPortfolioImages = () => {
        return filteredDesigners.flatMap((designer) => designer.portfolioImages);
    };

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
                                { label: "Discover", href: "#" },
                                { label: "Inspiration", href: "#" },
                                { label: "Favorites", href: "#" },
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
                        Find Your <span className="text-[var(--brand-green)] font-pacifico">Perfect</span>
                        <br />
                        <span className="text-[var(--brand-green)] font-pacifico">Designer</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mb-6">
                        Browse talented designers, upload inspiration images, and discover the perfect match for your style.
                    </p>

                    {/* Search Bar and Inspiration Upload - Side by Side */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
                        {/* Search Bar */}
                        <div className="relative flex-1 w-full sm:max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search designers by name, style, or specialization..."
                                className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]/50 cursor-text"
                            />
                        </div>

                        {/* Inspiration Upload Button - With Cancel Icon */}
                        <button
                            onClick={() => setShowInspirationUpload(!showInspirationUpload)}
                            className={`border-2 shadow-sm cursor-pointer py-3 px-6 rounded-full flex items-center justify-center gap-1.5 group relative overflow-hidden transition-transform duration-500 ease-out hover:scale-[0.94] whitespace-nowrap ${showInspirationUpload
                                ? "bg-[var(--brand-green)] border-[var(--brand-green)] text-white"
                                : "bg-[var(--brand-green)] text-background border-background"
                                }`}
                        >
                            {showInspirationUpload ? (
                                <>
                                    <X className="w-4 h-4 relative z-10" />
                                    <span className="relative z-10 font-medium text-xs">Cancel</span>
                                </>
                            ) : (
                                <>
                                    <span className="relative z-10 font-medium">Upload Inspiration</span>
                                    <div className="block flex items-center justify-center shrink-0 p-1.5 rounded-full relative z-10 bg-background pointer-events-none">
                                        <Upload className="inline-block shrink-0 size-3.5 text-[var(--brand-green)] transition-colors" />
                                    </div>
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* Inspiration Upload Section */}
                {showInspirationUpload && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8 bg-muted/50 rounded-lg p-6 border border-border"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-[var(--brand-green)]" />
                            <h2 className="text-xl font-semibold">Upload Your Inspiration</h2>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Share images that inspire your vision. We'll help you find designers who match your style.
                        </p>
                        <ImageUpload
                            maxImages={MAX_INSPIRATION_IMAGES}
                            existingImages={inspirationImages}
                            onUpload={handleInspirationUpload}
                            onRemove={(index) => {
                                setInspirationImages((prev) => prev.filter((_, i) => i !== index));
                            }}
                        />
                    </motion.div>
                )}

                {/* Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mb-8"
                >
                    <FilterBar
                        filters={FILTER_CATEGORIES}
                        activeFilters={activeFilters}
                        onFiltersChange={setActiveFilters}
                    />
                </motion.div>

                {/* Designers Grid */}
                {selectedDesigner ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8 overflow-hidden"
                    >
                        {/* Back Button - Simple ghost style */}
                        <button
                            onClick={() => setSelectedDesigner(null)}
                            className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="font-medium">Back to Designers</span>
                        </button>

                        {/* Designer Detail View */}
                        <div className="bg-muted/50 rounded-lg p-4 sm:p-6 border border-border">
                            {/* Top Row: Avatar and Contact Button */}
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[var(--brand-green)] flex-shrink-0">
                                    <Image
                                        src={selectedDesigner.avatar}
                                        alt={selectedDesigner.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <button className="bg-muted border-2 shadow-sm border-background cursor-pointer p-1 pl-4 rounded-full flex items-center gap-2 group relative overflow-hidden transition-transform duration-500 ease-out hover:scale-[0.94] flex-shrink-0">
                                    <span className="relative z-10 font-medium text-sm sm:text-base">Contact Designer</span>
                                    <div className="block bg-[var(--brand-green)] flex items-center justify-center shrink-0 p-1 rounded-full relative z-10">
                                        <ArrowUpRight className="inline-block text-white shrink-0 size-5 sm:size-6" />
                                    </div>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--brand-green)] rounded-full scale-0 origin-center transition-transform duration-500 ease-out group-hover:scale-[15]"></div>
                                </button>
                            </div>
                            
                            {/* Designer Info Section */}
                            <div className="w-full min-w-0">
                                <h2 className="text-2xl sm:text-3xl font-semibold mb-2">{selectedDesigner.name}</h2>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500">★</span>
                                        <span className="font-medium">{selectedDesigner.rating}</span>
                                    </div>
                                    <span className="text-muted-foreground text-sm sm:text-base">
                                        {selectedDesigner.portfolioCount} designs
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm sm:text-base">{selectedDesigner.bio}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {selectedDesigner.specialization.map((spec) => (
                                        <span
                                            key={spec}
                                            className="px-2 sm:px-3 py-1 rounded-full bg-[var(--brand-green)]/10 border border-[var(--brand-green)]/30 text-xs sm:text-sm"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Portfolio Preview */}
                            <div className="mt-6">
                                <h3 className="text-lg sm:text-xl font-semibold mb-4">Portfolio Preview</h3>
                                {isSmallOrMedium ? (
                                    <StaticImageGrid
                                        images={selectedDesigner.portfolioImages}
                                        columns={2}
                                        gap={12}
                                    />
                                ) : (
                                    <ProgressiveImageExpansion
                                        images={selectedDesigner.portfolioImages}
                                        baseWidth={180}
                                        baseHeight={250}
                                        numColumns={4}
                                        columnGap={16}
                                        imageGap={12}
                                        className="w-max"
                                    />
                                )}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        {/* Designers List */}
                        {filteredDesigners.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-center py-20"
                            >
                                <p className="text-lg text-muted-foreground mb-4">
                                    No designers match your search criteria.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setActiveFilters([]);
                                    }}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                                >
                                    Clear Filters
                                </button>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {filteredDesigners.map((designer, index) => (
                                    <motion.div
                                        key={designer.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        onClick={() => setSelectedDesigner(designer)}
                                        className="bg-muted/50 rounded-lg p-6 border border-border cursor-pointer hover:border-[var(--brand-green)]/50 hover:shadow-lg shadow-sm transition-all group"
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--brand-green)]">
                                                <Image
                                                    src={designer.avatar}
                                                    alt={designer.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold mb-1">{designer.name}</h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-yellow-500">★</span>
                                                    <span className="text-sm font-medium">{designer.rating}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        ({designer.portfolioCount} designs)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-10">
                                            {designer.bio}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {designer.specialization.slice(0, 3).map((spec) => (
                                                <span
                                                    key={spec}
                                                    className="px-2 py-1 rounded-full bg-[var(--brand-green)]/10 border border-[var(--brand-green)]/30 text-xs"
                                                >
                                                    {spec}
                                                </span>
                                            ))}
                                            {designer.specialization.length > 3 && (
                                                <span className="px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                                                    +{designer.specialization.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                        <div className="w-full flex justify-center">
                                            <button className="w-max border-2 shadow-sm border-background cursor-pointer py-2 px-6 rounded-full flex items-center gap-1.5 group relative overflow-hidden transition-transform duration-500 ease-out hover:scale-[0.94] bg-[var(--brand-green)] text-background">
                                                <span className="relative z-10 font-medium text-xs">View Portfolio</span>
                                                <div className="block flex items-center justify-center shrink-0 p-1 rounded-full relative z-10 bg-background pointer-events-none">
                                                    <ArrowUpRight className="inline-block shrink-0 size-3 text-[var(--brand-green)] transition-colors" />
                                                </div>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Portfolio Gallery Preview */}
                        {filteredDesigners.length > 0 && getAllPortfolioImages().length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mt-12"
                            >
                                <h2 className="text-3xl font-semibold mb-6">
                                    Explore <span className="text-[var(--brand-green)] font-pacifico">Designs</span>
                                </h2>
                                <div className="overflow-hidden rounded-lg">
                                    {isSmallOrMedium ? (
                                        <StaticImageGrid
                                            images={getAllPortfolioImages()}
                                            columns={2}
                                            gap={12}
                                        />
                                    ) : (
                                        <ProgressiveImageExpansion
                                            images={getAllPortfolioImages()}
                                            baseWidth={180}
                                            baseHeight={250}
                                            numColumns={5}
                                            columnGap={16}
                                            imageGap={12}
                                            className="w-max"
                                        />
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}

