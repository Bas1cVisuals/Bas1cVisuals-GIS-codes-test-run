/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { VideoItem } from "../types";
import { ImageSkeleton } from "./ImageSkeleton";
import { VideoPreview } from "./VideoPreview";
import { Reveal } from "./Reveal";
import {
  Play,
  ArrowLeft,
} from "lucide-react";

const VIDEO_WORKS: VideoItem[] = [
  {
    id: "fashion-reels",
    title: "Fashion Brand Reel",
    duration: "0:35",
    category: "reels",
    genre: "business",
    subcategory: "fashion",
    year: "2025",
    client: "Sample Brand Project",
    description:
      "A clean vertical reel focused on fabric texture, slow movement, and a premium lifestyle mood.",
    details: [
      "This edit was built to feel calm, polished, and easy to watch.",
      "The pacing stays slow enough to show the product clearly while still keeping the reel engaging for social media.",
      "The final look focuses on clean movement, balanced color, and a refined brand feel.",
    ],
    thumbnailColor: "bg-neutral-800",
    aspectRatio: "9:16",
    youtubeEmbedId: "4oPlevh4h7s",
    tags: ["Fashion Reel", "Clean Pacing", "Lifestyle Mood", "Color Polish"],
    role: "Video Editor",
    fps: "24.00 fps",
    resolution: "2.7K Vertical",
  },
  {
    id: "jewellers-craft",
    title: "Jewelry Product Reel",
    duration: "0:45",
    category: "reels",
    genre: "business",
    subcategory: "jewellers",
    year: "2026",
    client: "Jewelry Visual Concept",
    description:
      "A close-up product edit focused on shine, detail, hand movement, and elegant pacing.",
    details: [
      "The edit highlights small product details using clean cuts, subtle sound, and controlled color.",
      "The goal is to make the piece feel refined without using unnecessary effects.",
      "Sound, rhythm, and close-up movement are used to give the product a premium feel.",
    ],
    thumbnailColor: "bg-neutral-900",
    aspectRatio: "9:16",
    youtubeEmbedId: "diCmlb9_D6c", // Replace with your YouTube reel ID
    tags: ["Product Reel", "Jewelry Visuals", "Detail Shots", "Sound Design"],
    role: "Editor & Finishing",
    fps: "59.94 fps",
    resolution: "4K Vertical",
  },
  {
    id: "fashion-lookbook-cut",
    title: "Fashion Lookbook Reel",
    duration: "0:28",
    category: "reels",
    genre: "business",
    subcategory: "fashion",
    year: "2026",
    client: "Fashion Campaign Concept",
    description:
      "A fast but elegant reel built around outfit changes, fabric movement, and clean model pacing.",
    details: [
      "The edit uses quick but readable transitions so each outfit has a clear moment on screen.",
      "Pacing, music accents, and color balance are shaped to make the collection feel premium on mobile.",
      "The final reel is designed for launch posts, Instagram Reels, and short-form brand promotion.",
    ],
    thumbnailColor: "bg-stone-800",
    aspectRatio: "9:16",
    tags: ["Fashion", "Lookbook", "Brand Reel", "Outfit Flow"],
    role: "Video Editor",
    fps: "24.00 fps",
    resolution: "1080x1920 Vertical",
  },
  {
    id: "fashion-detail-reel",
    title: "Fashion Detail Reel",
    duration: "0:22",
    category: "reels",
    genre: "business",
    subcategory: "fashion",
    year: "2026",
    client: "Apparel Detail Concept",
    description:
      "A texture-first edit focused on stitching, fabric close-ups, label details, and premium product rhythm.",
    details: [
      "Close-up shots are arranged to highlight fabric quality and small design details.",
      "The cut stays minimal so the clothing remains the hero instead of the transitions.",
      "Sound accents and clean grading help the reel feel polished without becoming noisy.",
    ],
    thumbnailColor: "bg-neutral-700",
    aspectRatio: "9:16",
    tags: ["Fabric Detail", "Product Reel", "Minimal Edit", "Texture"],
    role: "Editor & Color Polish",
    fps: "30.00 fps",
    resolution: "1080x1920 Vertical",
  },
  {
    id: "fashion-launch-teaser",
    title: "Fashion Launch Teaser",
    duration: "0:18",
    category: "reels",
    genre: "business",
    subcategory: "fashion",
    year: "2026",
    client: "Drop Launch Concept",
    description:
      "A short teaser reel made for product drops, using sharp pacing, clean typography, and reveal moments.",
    details: [
      "The reel builds anticipation through quick product glimpses and simple reveal timing.",
      "Text placement is kept clean so it can work well on social media feeds and story formats.",
      "The final export is optimized for a polished launch announcement.",
    ],
    thumbnailColor: "bg-zinc-900",
    aspectRatio: "9:16",
    tags: ["Launch Teaser", "Drop Reel", "Social Ad", "Clean Type"],
    role: "Short-form Editor",
    fps: "30.00 fps",
    resolution: "1080x1920 Vertical",
  },
  {
    id: "jewellery-ring-reveal",
    title: "Jewelry Ring Reveal Reel",
    duration: "0:24",
    category: "reels",
    genre: "business",
    subcategory: "jewellers",
    year: "2026",
    client: "Ring Product Concept",
    description:
      "A refined vertical reel built around sparkle, macro movement, and a slow reveal of the product.",
    details: [
      "The edit gives the ring enough time to catch light and show detail without feeling slow.",
      "Cuts are placed around small hand movements and shine moments to create a luxury feel.",
      "The final rhythm works for product pages, reels, and promotional launch clips.",
    ],
    thumbnailColor: "bg-neutral-950",
    aspectRatio: "9:16",
    tags: ["Ring Reel", "Macro Detail", "Luxury Product", "Reveal"],
    role: "Editor & Finishing",
    fps: "30.00 fps",
    resolution: "4K Vertical",
  },
  {
    id: "jewellery-store-showcase",
    title: "Jewelry Store Showcase Reel",
    duration: "0:32",
    category: "reels",
    genre: "business",
    subcategory: "jewellers",
    year: "2026",
    client: "Jewelry Store Concept",
    description:
      "A showroom-style reel that blends display counters, product close-ups, and customer-ready presentation.",
    details: [
      "The edit moves from store atmosphere into detailed product shots for a complete brand impression.",
      "Smooth pacing helps the reel feel trustworthy, premium, and clear for local business promotion.",
      "Color and contrast are balanced to keep metal, stones, and lighting clean.",
    ],
    thumbnailColor: "bg-slate-900",
    aspectRatio: "9:16",
    tags: ["Store Reel", "Showcase", "Jewellery Brand", "Premium"],
    role: "Video Editor",
    fps: "24.00 fps",
    resolution: "1080x1920 Vertical",
  },
  {
    id: "jewellery-festive-offer",
    title: "Jewelry Festive Offer Reel",
    duration: "0:20",
    category: "reels",
    genre: "business",
    subcategory: "jewellers",
    year: "2026",
    client: "Festive Campaign Concept",
    description:
      "A promotional reel designed for festive offers, using elegant cuts, readable text, and product shine.",
    details: [
      "The reel balances offer messaging with product visuals so it still feels premium.",
      "Text timing is kept short and readable for mobile viewers scrolling quickly.",
      "The final style works for seasonal ads, sale announcements, and WhatsApp promotion.",
    ],
    thumbnailColor: "bg-yellow-950",
    aspectRatio: "9:16",
    tags: ["Festive Offer", "Promo Reel", "Jewelry Ads", "Readable Text"],
    role: "Editor & Motion Text",
    fps: "30.00 fps",
    resolution: "1080x1920 Vertical",
  },
  {
    id: "estate-luxury-tour",
    title: "Luxury Property Tour Reel",
    duration: "0:36",
    category: "reels",
    genre: "business",
    subcategory: "real-estate",
    year: "2026",
    client: "Luxury Property Concept",
    description:
      "A premium home-tour reel focused on wide spaces, natural light, and a calm walkthrough rhythm.",
    details: [
      "The edit helps viewers understand the flow of the property from entry to key rooms.",
      "Cuts are kept smooth and intentional so the space feels open, bright, and high-value.",
      "The final reel is built for property listings, realtor pages, and paid social promotion.",
    ],
    thumbnailColor: "bg-stone-200",
    aspectRatio: "9:16",
    tags: ["Luxury Home", "Property Tour", "Real Estate", "Walkthrough"],
    role: "Video Editor",
    fps: "24.00 fps",
    resolution: "1080x1920 Vertical",
  },
  {
    id: "estate-apartment-highlight",
    title: "Apartment Highlight Reel",
    duration: "0:26",
    category: "reels",
    genre: "business",
    subcategory: "real-estate",
    year: "2026",
    client: "Apartment Listing Concept",
    description:
      "A quick listing reel that shows rooms, amenities, and selling points in a clean mobile-first flow.",
    details: [
      "The structure moves quickly through the property while keeping each feature easy to read.",
      "Simple labels and clean pacing help viewers understand the apartment without needing audio.",
      "The edit is suited for Instagram, Facebook, and realtor WhatsApp sharing.",
    ],
    thumbnailColor: "bg-neutral-300",
    aspectRatio: "9:16",
    tags: ["Apartment", "Listing Reel", "Amenities", "Mobile-first"],
    role: "Short-form Editor",
    fps: "30.00 fps",
    resolution: "1080x1920 Vertical",
  },
  {
    id: "estate-before-after-reel",
    title: "Real Estate Before/After Reel",
    duration: "0:21",
    category: "reels",
    genre: "business",
    subcategory: "real-estate",
    year: "2026",
    client: "Property Upgrade Concept",
    description:
      "A transformation reel for renovations, staging, or upgraded spaces with clear before-after rhythm.",
    details: [
      "The edit pairs matching angles where possible so the transformation is easy to understand.",
      "Pacing is built around reveal moments, clean transitions, and strong final room impressions.",
      "This format works well for interior teams, realtors, and property marketing campaigns.",
    ],
    thumbnailColor: "bg-zinc-700",
    aspectRatio: "9:16",
    tags: ["Before After", "Renovation", "Property Marketing", "Reveal"],
    role: "Editor & Story Flow",
    fps: "30.00 fps",
    resolution: "1080x1920 Vertical",
  },
  {
    id: "estate-reels-vertical",
    title: "Real Estate Walkthrough Reel",
    duration: "0:30",
    category: "reels",
    genre: "business",
    subcategory: "real-estate",
    year: "2026",
    client: "Real Estate Visual Sample",
    description:
      "A vertical property reel designed to show space, light, movement, and key features clearly.",
    details: [
      "The edit keeps the viewer oriented while moving through the property.",
      "Cuts are timed to feel smooth and natural, making the space easy to understand on mobile.",
      "The final video focuses on clarity, clean movement, and simple presentation.",
    ],
    thumbnailColor: "bg-neutral-100",
    aspectRatio: "9:16",
    youtubeEmbedId: "1jJzYem7NlY",
    tags: ["Real Estate", "Walkthrough", "Mobile Reel", "Clean Flow"],
    role: "Video Editor",
    fps: "24.00 fps",
    resolution: "2.7K Vertical",
  },
];

type CategoryId = "real-estate" | "fashion" | "jewellers";

const CATEGORY_PAGES: Array<{
  id: CategoryId;
  label: string;
  kicker: string;
  description: string;
  accent: string;
}> = [
  {
    id: "real-estate",
    label: "Real Estate",
    kicker: "Property reels",
    description:
      "Mobile-first edits for listings, walkthroughs, apartments, interiors, and property transformations.",
    accent: "Spaces, light, location flow",
  },
  {
    id: "fashion",
    label: "Fashion",
    kicker: "Brand reels",
    description:
      "Clean campaign reels for clothing drops, lookbooks, outfit details, and premium product launches.",
    accent: "Texture, movement, launch rhythm",
  },
  {
    id: "jewellers",
    label: "Jewelry",
    kicker: "Product reels",
    description:
      "Refined vertical edits for rings, showrooms, festive offers, sparkle, macro detail, and store promotion.",
    accent: "Shine, detail, luxury pacing",
  },
];

export const VideoGallery: React.FC = () => {
  const [activeCategoryPage, setActiveCategoryPage] = useState<CategoryId | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const selectedCategory = CATEGORY_PAGES.find(
    (category) => category.id === activeCategoryPage
  );
  const visibleWorks = activeCategoryPage
    ? VIDEO_WORKS.filter((work) => work.subcategory === activeCategoryPage)
    : [];
  const featuredWork = visibleWorks.find((work) => work.youtubeEmbedId) || visibleWorks[0];

  return (
    <div
      id="projects"
      className="py-24 bg-transparent border-t border-neutral-200/50"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-neutral-200/60 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              SELECTED WORK
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black">
              Reel Categories{" "}
              <span className="italic font-normal text-neutral-500">
                by Industry
              </span>
            </h2>
          </div>
          <div className="max-w-md space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-900 flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 bg-neutral-900 rounded-full animate-ping"></span>
              CHOOSE A FOCUSED PAGE
            </p>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed">
              Select a category to open a dedicated portfolio page with only
              that topic’s videos. New cards added to these categories will
              automatically appear on the matching page.
            </p>
          </div>
        </div>

        {!selectedCategory ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {CATEGORY_PAGES.map((category, idx) => {
              const works = VIDEO_WORKS.filter(
                (work) => work.subcategory === category.id
              );
              const preview = works.find((work) => work.youtubeEmbedId) || works[0];

              return (
                <div key={category.id}>
                  <Reveal delay={0.1 * idx}>
                    <button
                      type="button"
                      onClick={() => setActiveCategoryPage(category.id)}
                      className="group w-full min-h-[420px] text-left bg-white border border-neutral-200 rounded-[8px] overflow-hidden shadow-sm hover:shadow-xl hover:border-black/30 transition-all cursor-pointer flex flex-col"
                    >
                    <div className="relative h-64 bg-black overflow-hidden">
                      {preview?.youtubeEmbedId ? (
                        <VideoPreview
                          embedId={preview.youtubeEmbedId}
                          title={preview.title}
                          className="absolute inset-0 w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div
                          className={`absolute inset-0 ${preview?.thumbnailColor || "bg-neutral-900"} flex items-center justify-center`}
                        >
                          <Play size={24} className="text-white/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">
                            {category.kicker}
                          </span>
                          <h3 className="font-serif text-4xl text-white leading-none mt-1">
                            {category.label}
                          </h3>
                        </div>
                        <span className="shrink-0 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                          <ArrowLeft size={16} className="rotate-180" />
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col gap-6 grow">
                      <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                        {category.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                          {category.accent}
                        </span>
                        <span className="text-xs font-mono text-black uppercase tracking-widest">
                          {works.length} reels
                        </span>
                      </div>
                    </div>
                    </button>
                  </Reveal>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-10">
            <div className="relative overflow-hidden bg-black text-white rounded-[8px] min-h-[420px] flex items-end">
              {featuredWork?.youtubeEmbedId && (
                <VideoPreview
                  embedId={featuredWork.youtubeEmbedId}
                  title={featuredWork.title}
                  className="absolute inset-0 w-full h-full opacity-45"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
              <div className="relative z-10 p-6 md:p-10 max-w-3xl space-y-6">
                <button
                  type="button"
                  onClick={() => setActiveCategoryPage(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black hover:bg-neutral-200 px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  Back to Categories
                </button>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                    {selectedCategory.kicker}
                  </span>
                  <h3 className="font-serif text-5xl md:text-7xl leading-none mt-2">
                    {selectedCategory.label}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-xl">
                  {selectedCategory.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORY_PAGES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategoryPage(category.id)}
                  className={`px-4 py-2 rounded-full border text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                    activeCategoryPage === category.id
                      ? "bg-black border-black text-white"
                      : "bg-white border-neutral-200 text-neutral-500 hover:border-black hover:text-black"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {visibleWorks.map((work, idx) => (
                <div key={work.id}>
                  <Reveal delay={0.08 * (idx % 4)}>
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(work)}
                      className="group w-full text-left bg-white border border-neutral-200 rounded-[8px] overflow-hidden hover:border-black/40 hover:shadow-lg transition-all cursor-pointer"
                      id={`video-card-${work.id}`}
                    >
                    <div className="relative bg-black aspect-[4/5] md:aspect-video overflow-hidden">
                      {work.youtubeEmbedId ? (
                        <VideoPreview
                          embedId={work.youtubeEmbedId}
                          title={work.title}
                          className="absolute inset-0 w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : work.imageUrl ? (
                        <ImageSkeleton
                          src={work.imageUrl}
                          alt={work.title}
                          className="absolute inset-0 w-full h-full"
                        />
                      ) : (
                        <div
                          className={`absolute inset-0 ${work.thumbnailColor} flex items-center justify-center`}
                        >
                          <Play size={22} className="text-white/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                        <span className="rounded-full bg-white text-black px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                          {work.aspectRatio}
                        </span>
                        <span className="rounded-full bg-black/70 text-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                          {work.duration}
                        </span>
                      </div>
                      <div className="absolute left-5 right-5 bottom-5">
                        <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">
                          {work.client} • {work.year}
                        </span>
                        <h4 className="font-sans font-black text-2xl text-white leading-tight mt-1">
                          {work.title}
                        </h4>
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {work.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 border-t border-neutral-100 pt-4">
                        {work.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono bg-themeBg border border-neutral-200 text-neutral-600 px-2 py-0.5 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    </button>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CASE STUDY & EDITING DESK DRAWER OVERLAY */}
      {selectedVideo && (
        <VideoEditorDesk
          work={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

// Immersive Interactive Editing Sandbox for the client to "test" editing controls
const VideoEditorDesk = ({
  work,
  onClose,
}: {
  work: VideoItem;
  onClose: () => void;
}) => {
  const BackButton = ({ className = "" }: { className?: string }) => (
    <button
      type="button"
      onClick={onClose}
      className={`inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-white shadow-lg shadow-black/20 ring-1 ring-white/20 transition-colors hover:bg-neutral-800 cursor-pointer font-mono text-[10px] uppercase tracking-widest ${className}`}
    >
      <ArrowLeft size={14} className="text-white" />
      <span>Back</span>
    </button>
  );

  // Close desk on ESC key and prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.classList.add("media-active");
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.classList.remove("media-active");
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fade-in">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-neutral-200 animate-slide-in">
        {/* Header Toolbar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-neutral-100 px-4 md:px-8 py-4 md:py-5 flex justify-between items-center gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              TIMELINE DIRECTORY
            </span>
            <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
            <span className="hidden sm:inline font-mono text-xs text-neutral-600 uppercase tracking-widest font-bold truncate">
              {work.title.substring(0, 32)}...
            </span>
          </div>

        </div>

        {/* Content Area */}
        <div className="p-6 md:p-12 space-y-12 flex-grow">
          {/* Title & Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 bg-themeBg border border-neutral-200 px-3 py-1 rounded-full">
                CATEGORY: {work.category.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 bg-themeBg border border-neutral-200 px-3 py-1 rounded-full">
                SUB-SEGMENT: {work.subcategory.toUpperCase()}
              </span>
            </div>

            <h1 className="font-sans font-bold text-4xl md:text-5xl text-black tracking-tight leading-tight">
              {work.title}
            </h1>
            <p className="font-serif italic text-xl md:text-2xl text-neutral-500 max-w-2xl leading-relaxed">
              &ldquo;{work.description}&rdquo;
            </p>
          </div>

          {/* Video Player Section */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-black flex items-center justify-center">
            <BackButton className="absolute top-3 left-3 z-20" />
            {work.youtubeEmbedId ? (
              <div
                className={`w-full relative ${work.aspectRatio === "9:16" ? "aspect-[9/16] max-h-[85vh] mx-auto max-w-[48vh]" : "aspect-video"}`}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${work.youtubeEmbedId}?autoplay=1&mute=1&loop=1&playsinline=1&controls=1&modestbranding=1&rel=0&playlist=${work.youtubeEmbedId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 object-cover w-full h-full"
                ></iframe>
              </div>
            ) : work.imageUrl ? (
              <div className="w-full relative">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            ) : (
              <div
                className={`w-full relative ${work.aspectRatio === "9:16" ? "aspect-[9/16] max-h-[85vh] mx-auto max-w-[48vh]" : "aspect-video"} flex items-center justify-center py-24`}
              >
                <span className="text-white/50 font-mono text-sm uppercase tracking-widest">
                  {work.category === "thumbnails"
                    ? "Thumbnail Pending"
                    : "Video Pending"}
                </span>
              </div>
            )}
          </div>

          {/* Project Details Sheet (Client, Role, Frame rate) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-neutral-100 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-widest font-semibold">
                CLIENT BRAND
              </span>
              <span className="font-sans text-neutral-800 font-semibold text-sm">
                {work.client}
              </span>
            </div>
            <div className="space-y-1 border-l border-neutral-100 pl-4">
              <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-widest font-semibold">
                EDIT CAPACITY
              </span>
              <span className="font-sans text-neutral-800 font-semibold text-sm">
                {work.role}
              </span>
            </div>
            <div className="space-y-1 border-l border-neutral-100 pl-4">
              <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-widest font-semibold">
                TIMELINE FRAME RATE
              </span>
              <span className="font-mono text-neutral-800 font-semibold text-sm">
                {work.fps}
              </span>
            </div>
            <div className="space-y-1 border-l border-neutral-100 pl-4">
              <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-widest font-semibold">
                TIMELINE EXPORT
              </span>
              <span className="font-mono text-neutral-800 font-semibold text-sm">
                {work.resolution} • {work.duration}
              </span>
            </div>
          </div>

          {/* Core Case Study Writing (Clean humanise tone) */}
          <div className="space-y-6 text-neutral-600 font-sans text-base leading-relaxed max-w-3xl">
            {work.details.map((pText, idx) => (
              <p key={idx}>{pText}</p>
            ))}
          </div>

          {/* Key tags list */}
          <div className="flex flex-wrap gap-2">
            {work.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-mono bg-neutral-100 text-neutral-600 px-4 py-1.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Info inside Drawer */}
        <div className="bg-neutral-50 px-6 md:px-12 py-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-neutral-500 font-mono">
          <span>PROJECT DETAILS</span>
          <span>OPERATED BY RITESH BERA • INDIA</span>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
