/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  category: 'reels' | 'videos' | 'thumbnails' | 'design';
  genre: 'business' | 'youtube' | 'creative' | 'education';
  subcategory: 'realtor' | 'real-estate' | 'marine-safety' | 'fashion' | 'jewellers' | 'documentary' | 'tech' | 'education' | 'thumbnails';
  year: string;
  client: string;
  description: string;
  details: string[];
  thumbnailColor: string; // Tailwind class
  aspectRatio: '9:16' | '16:9' | '1:1' | 'auto';
  youtubeEmbedId?: string; // e.g., 'dQw4w9WgXcQ' for YouTube
  imageUrl?: string; // For image-based items like thumbnails
  tags: string[];
  role: string;
  fps: string;
  resolution: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  role: string;
  message: string;
  timestamp: string;
  createdAt: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PricingModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  turnaround: string;
  badge?: string;
}

