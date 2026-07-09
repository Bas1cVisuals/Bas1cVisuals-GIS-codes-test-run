import React, { useState, useEffect } from 'react';
import { ArrowRight, Image as ImageIcon, Layout, BookOpen, Presentation, Video } from 'lucide-react';
import LightboxModal from './LightboxModal';

export const VGStudyHubShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('website');
  const [lightboxImage, setLightboxImage] = useState<VGImage | null>(null);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else if (isModalOpen) {
          setIsModalOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, isModalOpen]);

  const scrollToContact = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsModalOpen(false);
    setTimeout(() => {
      const element = document.getElementById('correspondence');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const tabs = [
    { id: 'website', label: 'Course Campaign Visuals', icon: Layout },
    { id: 'thumbnails', label: 'YouTube Thumbnails', icon: ImageIcon },
    { id: 'posters', label: 'Posters', icon: Presentation },
    { id: 'covers', label: 'Book Covers', icon: BookOpen },
    { id: 'reels', label: 'Shorts / Trending Reels', icon: Video },
  ];

  interface VGImage {
    title: string;
    category: string;
    thumbnail: string;
    full: string;
    alt: string;
  }

  // To add real images, place optimized WebP images in the respective directories inside public/assets/vg-study-hub/:
  // - public/assets/vg-study-hub/website-design/
  // - public/assets/vg-study-hub/thumbnails/
  // - public/assets/vg-study-hub/posters/
  // - public/assets/vg-study-hub/book-covers/
  // Then add one object to the matching array below. Use the same file for thumbnail and full unless you create a separate preview image.
  const vgStudyHubAssets: Record<string, VGImage[]> = {
    website: [
      {
        title: "CS Professional Syllabus Launch",
        category: "Course Campaign Visual",
        thumbnail: "/assets/vg-study-hub/website-design/New proj 17-04-2026_14.webp",
        full: "/assets/vg-study-hub/website-design/New proj 17-04-2026_14.webp",
        alt: "CS Professional new syllabus launch campaign visual for both groups"
      },
      {
        title: "Tax Laws Group 2 Course Visual",
        category: "Course Campaign Visual",
        thumbnail: "/assets/vg-study-hub/website-design/New proj 17-04-2026_7.webp",
        full: "/assets/vg-study-hub/website-design/New proj 17-04-2026_7.webp",
        alt: "CS Executive Group 2 Tax Laws course visual"
      },
      {
        title: "Company Law Group 1 Course Visual",
        category: "Course Campaign Visual",
        thumbnail: "/assets/vg-study-hub/website-design/New proj 17-04-2026_1.webp",
        full: "/assets/vg-study-hub/website-design/New proj 17-04-2026_1.webp",
        alt: "CS Executive Group 1 Company Law course visual"
      },
      {
        title: "CAFM Group 1 Course Visual",
        category: "Course Campaign Visual",
        thumbnail: "/assets/vg-study-hub/website-design/New proj 17-04-2026_4.webp",
        full: "/assets/vg-study-hub/website-design/New proj 17-04-2026_4.webp",
        alt: "CS Executive Group 1 CAFM course visual"
      },
      {
        title: "JIGL Group 1 Course Visual",
        category: "Course Campaign Visual",
        thumbnail: "/assets/vg-study-hub/website-design/New proj 17-04-2026_3.webp",
        full: "/assets/vg-study-hub/website-design/New proj 17-04-2026_3.webp",
        alt: "CS Executive Group 1 JIGL course visual"
      },
      {
        title: "SBILL Group 1 Course Visual",
        category: "Course Campaign Visual",
        thumbnail: "/assets/vg-study-hub/website-design/New proj 17-04-2026_2.webp",
        full: "/assets/vg-study-hub/website-design/New proj 17-04-2026_2.webp",
        alt: "CS Executive Group 1 SBILL course visual"
      },
    ],
    thumbnails: [
      {
        title: "Biggest Announcement Thumbnail",
        category: "YouTube Thumbnail",
        thumbnail: "/assets/vg-study-hub/thumbnails/Thumbnail on BIGGEST ANNOUNCEMENT.webp",
        full: "/assets/vg-study-hub/thumbnails/Thumbnail on BIGGEST ANNOUNCEMENT.webp",
        alt: "Biggest announcement thumbnail for CS students"
      },
      {
        title: "ECIPL Part-A Marathon Thumbnail",
        category: "YouTube Thumbnail",
        thumbnail: "/assets/vg-study-hub/thumbnails/ecipl part a.webp",
        full: "/assets/vg-study-hub/thumbnails/ecipl part a.webp",
        alt: "ECIPL Part-A marathon class thumbnail"
      },
      {
        title: "Drafting Trishul Batch Thumbnail",
        category: "YouTube Thumbnail",
        thumbnail: "/assets/vg-study-hub/thumbnails/DRAFTING TRISHUL BATCH.webp",
        full: "/assets/vg-study-hub/thumbnails/DRAFTING TRISHUL BATCH.webp",
        alt: "Drafting Trishul Batch thumbnail design"
      },
      {
        title: "Harsh Sir Lecture Thumbnail",
        category: "YouTube Thumbnail",
        thumbnail: "/assets/vg-study-hub/thumbnails/Harsh Sir Thumnbail 03-04-2026.webp",
        full: "/assets/vg-study-hub/thumbnails/Harsh Sir Thumnbail 03-04-2026.webp",
        alt: "Harsh Sir lecture thumbnail design"
      },
      {
        title: "Directors Chapter Thumbnail",
        category: "YouTube Thumbnail",
        thumbnail: "/assets/vg-study-hub/thumbnails/Directors.webp",
        full: "/assets/vg-study-hub/thumbnails/Directors.webp",
        alt: "Directors chapter thumbnail design"
      },
      {
        title: "VG Sir Lecture 1 Thumbnail",
        category: "YouTube Thumbnail",
        thumbnail: "/assets/vg-study-hub/thumbnails/Thumbnail_vg sir_Lecture-1.webp",
        full: "/assets/vg-study-hub/thumbnails/Thumbnail_vg sir_Lecture-1.webp",
        alt: "VG Sir Lecture 1 thumbnail design"
      },
    ],
    posters: [
      {
        title: "SBILL Subject Poster",
        category: "Educational Poster",
        thumbnail: "/assets/vg-study-hub/posters/SBILL.webp",
        full: "/assets/vg-study-hub/posters/SBILL.webp",
        alt: "SBILL subject promotional poster"
      },
      {
        title: "CS Course Promo Poster",
        category: "Educational Poster",
        thumbnail: "/assets/vg-study-hub/posters/POSTER_3.webp",
        full: "/assets/vg-study-hub/posters/POSTER_3.webp",
        alt: "CS course promotional poster design"
      },
      {
        title: "Student Batch Poster",
        category: "Educational Poster",
        thumbnail: "/assets/vg-study-hub/posters/Poster 4.webp",
        full: "/assets/vg-study-hub/posters/Poster 4.webp",
        alt: "Student batch promotional poster design"
      },
      {
        title: "Course Update Poster",
        category: "Educational Poster",
        thumbnail: "/assets/vg-study-hub/posters/Poster 05-03-2026.webp",
        full: "/assets/vg-study-hub/posters/Poster 05-03-2026.webp",
        alt: "Course update promotional poster design"
      },
      {
        title: "Premium Re-Look Campaign Poster",
        category: "Educational Poster",
        thumbnail: "/assets/vg-study-hub/posters/Re_Look_V3_Poster_01-03-2026.webp",
        full: "/assets/vg-study-hub/posters/Re_Look_V3_Poster_01-03-2026.webp",
        alt: "Premium re-look campaign poster design"
      },
      {
        title: "Revision Batch Poster",
        category: "Educational Poster",
        thumbnail: "/assets/vg-study-hub/posters/pOSTER_R2.webp",
        full: "/assets/vg-study-hub/posters/pOSTER_R2.webp",
        alt: "Revision batch poster design"
      },
    ],
    covers: [
      {
        title: "CS Executive Study Cover",
        category: "Book Covers",
        thumbnail: "/assets/vg-study-hub/book-covers/CS Book Cover.webp",
        full: "/assets/vg-study-hub/book-covers/CS Book Cover.webp",
        alt: "CS Executive study material book cover design",
      },
      {
        title: "Bold JIGL Subject Cover",
        category: "Book Covers",
        thumbnail: "/assets/vg-study-hub/book-covers/Bold_Book_cover_JIGL.webp",
        full: "/assets/vg-study-hub/book-covers/Bold_Book_cover_JIGL.webp",
        alt: "Bold JIGL subject book cover design",
      },
      {
        title: "Minimal Study Material Cover",
        category: "Book Covers",
        thumbnail: "/assets/vg-study-hub/book-covers/Minimal_Book Cover.webp",
        full: "/assets/vg-study-hub/book-covers/Minimal_Book Cover.webp",
        alt: "Minimal study material book cover design",
      },
    ]
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'website':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h4 className="font-serif text-2xl text-black">Course Campaign Visuals</h4>
              <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                Created bold course campaign visuals for VG Study Hub, built around strong subject readability, mentor presence, and fast recognition for students.
              </p>
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-3">What I handled:</p>
                <ul className="space-y-2 text-sm text-neutral-700 font-sans">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Subject-focused campaign layouts</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Mentor-led visual hierarchy</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> High-contrast student-facing design</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Platform-ready educational creatives</li>
                </ul>
              </div>
            </div>
            {/* Visuals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vgStudyHubAssets.website.length > 0 ? (
                vgStudyHubAssets.website.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="relative w-full aspect-video rounded-xl border border-neutral-200 bg-neutral-950 overflow-hidden cursor-pointer group"
                    onClick={() => setLightboxImage(img)}
                  >
                    <img 
                      src={img.thumbnail} 
                      alt={img.alt} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500" 
                    />
                    <div className="absolute inset-x-3 bottom-3 rounded-[8px] border border-white/20 bg-white/10 px-3 py-2 shadow-lg shadow-black/20 backdrop-blur-md">
                      <span className="block text-[9px] font-mono uppercase tracking-widest text-white/75 mix-blend-difference">{img.category}</span>
                      <span className="block truncate text-xs font-semibold text-white mix-blend-difference">{img.title}</span>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="aspect-video bg-neutral-100 rounded-xl border border-dashed border-neutral-300 flex flex-col items-center justify-center p-6 text-center">
                    <Layout className="text-neutral-300 mb-2" size={24} />
                    <span className="text-xs font-medium text-neutral-500 mb-1">Campaign Visual</span>
                    <span className="text-[10px] text-neutral-400">Preview slot for selected VG Study Hub work.</span>
                  </div>
                  <div className="aspect-video bg-neutral-100 rounded-xl border border-dashed border-neutral-300 flex flex-col items-center justify-center p-6 text-center hidden sm:flex">
                    <Layout className="text-neutral-300 mb-2" size={24} />
                    <span className="text-xs font-medium text-neutral-500 mb-1">Campaign Visual</span>
                    <span className="text-[10px] text-neutral-400">Preview slot for selected VG Study Hub work.</span>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 'thumbnails':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h4 className="font-serif text-2xl text-black">YouTube Thumbnails</h4>
              <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                Created bold and clear YouTube thumbnail designs focused on readability, subject clarity, and stronger click appeal for educational videos.
              </p>
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-3">What I handled:</p>
                <ul className="space-y-2 text-sm text-neutral-700 font-sans">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Thumbnail composition</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Title emphasis</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Subject-focused layout</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Color and contrast balancing</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Cover-style visual direction</li>
                </ul>
              </div>
            </div>
            {/* Visuals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vgStudyHubAssets.thumbnails.length > 0 ? (
                vgStudyHubAssets.thumbnails.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="relative w-full aspect-video rounded-xl border border-neutral-200 bg-neutral-950 overflow-hidden cursor-pointer group"
                    onClick={() => setLightboxImage(img)}
                  >
                    <img 
                      src={img.thumbnail} 
                      alt={img.alt} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500" 
                    />
                    <div className="absolute inset-x-3 bottom-3 rounded-[8px] border border-white/20 bg-white/10 px-3 py-2 shadow-lg shadow-black/20 backdrop-blur-md">
                      <span className="block text-[9px] font-mono uppercase tracking-widest text-white/75 mix-blend-difference">{img.category}</span>
                      <span className="block truncate text-xs font-semibold text-white mix-blend-difference">{img.title}</span>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="aspect-video bg-neutral-100 rounded-xl border border-dashed border-neutral-300 flex flex-col items-center justify-center p-6 text-center">
                    <ImageIcon className="text-neutral-300 mb-2" size={24} />
                    <span className="text-xs font-medium text-neutral-500 mb-1">Thumbnail Design</span>
                    <span className="text-[10px] text-neutral-400">Preview slot for selected VG Study Hub work.</span>
                  </div>
                  <div className="aspect-video bg-neutral-100 rounded-xl border border-dashed border-neutral-300 flex flex-col items-center justify-center p-6 text-center hidden sm:flex">
                    <ImageIcon className="text-neutral-300 mb-2" size={24} />
                    <span className="text-xs font-medium text-neutral-500 mb-1">Thumbnail Design</span>
                    <span className="text-[10px] text-neutral-400">Preview slot for selected VG Study Hub work.</span>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 'posters':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h4 className="font-serif text-2xl text-black">Posters</h4>
              <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                Designed educational and promotional posters for VG Study Hub with a focus on clear hierarchy, readable text, and strong visual presence.
              </p>
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-3">What I handled:</p>
                <ul className="space-y-2 text-sm text-neutral-700 font-sans">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Study-related posters</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Promotional designs</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Social media creatives</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Clean layout and typography</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Brand-consistent visual style</li>
                </ul>
              </div>
            </div>
            {/* Visuals Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {vgStudyHubAssets.posters.length > 0 ? (
                vgStudyHubAssets.posters.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="relative w-full aspect-[3/4] rounded-xl border border-neutral-200 bg-neutral-950 overflow-hidden cursor-pointer group"
                    onClick={() => setLightboxImage(img)}
                  >
                    <img 
                      src={img.thumbnail} 
                      alt={img.alt} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500" 
                    />
                    <div className="absolute inset-x-3 bottom-3 rounded-[8px] border border-white/20 bg-white/10 px-3 py-2 shadow-lg shadow-black/20 backdrop-blur-md">
                      <span className="block text-[9px] font-mono uppercase tracking-widest text-white/75 mix-blend-difference">{img.category}</span>
                      <span className="block truncate text-xs font-semibold text-white mix-blend-difference">{img.title}</span>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="aspect-[3/4] bg-neutral-100 rounded-xl border border-dashed border-neutral-300 flex flex-col items-center justify-center p-4 text-center">
                    <Presentation className="text-neutral-300 mb-2" size={24} />
                    <span className="text-xs font-medium text-neutral-500 mb-1">Poster Creative</span>
                    <span className="text-[10px] text-neutral-400">Preview slot for selected VG Study Hub work.</span>
                  </div>
                  <div className="aspect-[3/4] bg-neutral-100 rounded-xl border border-dashed border-neutral-300 flex flex-col items-center justify-center p-4 text-center">
                    <Presentation className="text-neutral-300 mb-2" size={24} />
                    <span className="text-xs font-medium text-neutral-500 mb-1">Poster Creative</span>
                    <span className="text-[10px] text-neutral-400">Preview slot for selected VG Study Hub work.</span>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 'covers':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h4 className="font-serif text-2xl text-black">Book Covers</h4>
              <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                Created book cover visuals and study material covers that needed to feel clear, structured, and suitable for an education-focused audience.
              </p>
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-3">What I handled:</p>
                <ul className="space-y-2 text-sm text-neutral-700 font-sans">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Book cover design</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Study material cover layout</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Typography hierarchy</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Subject-focused presentation</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Clean export-ready visuals</li>
                </ul>
              </div>
            </div>
            {/* Visuals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {vgStudyHubAssets.covers.length > 0 ? (
                vgStudyHubAssets.covers.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="relative w-full aspect-[3/4] min-h-[320px] sm:min-h-[380px] rounded-xl border border-neutral-200 bg-neutral-950 overflow-hidden cursor-pointer group"
                    onClick={() => setLightboxImage(img)}
                  >
                    <img 
                      src={img.thumbnail} 
                      alt={img.alt} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500" 
                    />
                    <div className="absolute inset-x-3 bottom-3 rounded-[8px] border border-white/20 bg-white/10 px-3 py-2 shadow-lg shadow-black/20 backdrop-blur-md">
                      <span className="block text-[9px] font-mono uppercase tracking-widest text-white/75 mix-blend-difference">{img.category}</span>
                      <span className="block truncate text-xs font-semibold text-white mix-blend-difference">{img.title}</span>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="aspect-[3/4] bg-neutral-100 rounded-xl border border-dashed border-neutral-300 flex flex-col items-center justify-center p-4 text-center">
                    <BookOpen className="text-neutral-300 mb-2" size={24} />
                    <span className="text-xs font-medium text-neutral-500 mb-1">Book Cover</span>
                    <span className="text-[10px] text-neutral-400">Preview slot for selected VG Study Hub work.</span>
                  </div>
                  <div className="aspect-[3/4] bg-neutral-100 rounded-xl border border-dashed border-neutral-300 flex flex-col items-center justify-center p-4 text-center">
                    <BookOpen className="text-neutral-300 mb-2" size={24} />
                    <span className="text-xs font-medium text-neutral-500 mb-1">Book Cover</span>
                    <span className="text-[10px] text-neutral-400">Preview slot for selected VG Study Hub work.</span>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 'reels':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h4 className="font-serif text-2xl text-black">Shorts / Trending Reels</h4>
              <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                Edited trend-based Shorts/Reels for VG Study Hub. This part of the work focused on timing, short-form pacing, captions, and trend-friendly presentation.
              </p>
              
              <div className="p-4 bg-black text-white rounded-xl">
                <p className="text-sm font-sans leading-relaxed">
                  Some selected edits crossed million+ views, helping the content reach a wider student audience.
                </p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-3">What I handled:</p>
                <ul className="space-y-2 text-sm text-neutral-700 font-sans">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Short-form editing</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Trend-based pacing</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Captions and timing</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Quick visual flow</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black rounded-full"></div> Social platform-ready exports</li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="vg-study-hub" className="py-24 bg-white border-t border-neutral-200/40 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-neutral-200/60 pb-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">CLIENT WORK</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mb-4">
              VG Study Hub
            </h2>
            <p className="text-sm text-neutral-600 font-sans leading-relaxed">
              A focused creative support project covering study-related visuals, YouTube assets, posters, book covers, and social media content for an education-focused brand.
            </p>
          </div>
        </div>

        {/* Introduction Text */}
        <div className="max-w-3xl mb-12 space-y-4">
          <p className="text-neutral-700 font-sans text-sm md:text-base leading-relaxed">
            For VG Study Hub, I worked across multiple visual formats — from thumbnails and posters to book covers and web design visuals. The goal was to keep the content clear, bold, and useful for students while still making it visually strong for digital platforms.
          </p>
          <p className="text-neutral-500 font-serif italic text-sm md:text-base border-l-2 border-neutral-200 pl-4">
            Also contributed to trend-based Shorts/Reels editing, with selected videos reaching million+ views.
          </p>
        </div>

        {/* Featured Card */}
        <div 
          onClick={() => setIsModalOpen(!isModalOpen)}
          className={`group cursor-pointer bg-themeBg border border-neutral-200/80 rounded-3xl p-6 md:p-10 transition-all duration-300 hover:shadow-md hover:border-neutral-300 ${isModalOpen ? 'mb-8' : ''}`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4 max-w-xl">
              <h3 className="font-sans font-black text-3xl md:text-4xl text-black tracking-tight">VG Study Hub</h3>
              <p className="text-neutral-500 font-sans text-sm leading-relaxed">
                Education brand visuals, thumbnails, posters, covers, and social content.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="inline-flex px-3 py-1 bg-white border border-neutral-200 text-neutral-600 text-[10px] font-mono uppercase tracking-widest rounded-full">
                  Client: VG Study Hub
                </span>
                <span className="inline-flex px-3 py-1 bg-white border border-neutral-200 text-neutral-600 text-[10px] font-mono uppercase tracking-widest rounded-full">
                  Scope: Design + Editing Support
                </span>
                <span className="inline-flex px-3 py-1 bg-white border border-neutral-200 text-neutral-600 text-[10px] font-mono uppercase tracking-widest rounded-full">
                  Formats: Posters, Thumbnails, Book Covers, Website Visuals
                </span>
              </div>
            </div>
            
            <div className="shrink-0 w-full md:w-auto">
              <button className="w-full md:w-auto py-3 px-6 bg-black text-white rounded-full font-mono text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-neutral-800 transition-colors">
                <span>{isModalOpen ? 'CLOSE PROJECT DETAILS' : 'VIEW PROJECT DETAILS'}</span>
                <ArrowRight size={14} className={`transition-transform ${isModalOpen ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Content Inline */}
        {isModalOpen && (
          <div className="w-full bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden flex flex-col animate-fade-in mt-6">
            
            {/* Main Content Area */}
            <div className="flex flex-col md:flex-row min-h-[500px]">
              
              {/* Sidebar Tabs */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-neutral-100 bg-neutral-50/50 p-4 overflow-x-auto md:overflow-y-auto shrink-0 flex flex-row md:flex-col gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left whitespace-nowrap md:whitespace-normal ${
                        activeTab === tab.id 
                          ? 'bg-white shadow-sm border border-neutral-200 text-black' 
                          : 'hover:bg-neutral-100/80 text-neutral-500 border border-transparent'
                      }`}
                    >
                      <Icon size={16} className={activeTab === tab.id ? "text-black" : "text-neutral-400"} />
                      <span className={`text-xs font-medium ${activeTab === tab.id ? 'font-semibold' : ''}`}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-style bg-white">
                {renderTabContent()}

                {/* Case Study Summary Blocks */}
                <div className="mt-12 pt-10 border-t border-neutral-100 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <h4 className="font-sans font-black text-lg text-black">What I Did</h4>
                      <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                        I supported VG Study Hub across multiple creative needs, including educational posters, YouTube thumbnails, book covers, and website design visuals. The work focused on clarity, strong layout, readable text, and content that feels suitable for students while still standing out online.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-sans font-black text-lg text-black">Project Focus</h4>
                      <ul className="space-y-2 text-sm text-neutral-600 font-sans">
                        <li className="flex items-start gap-2"><div className="w-1 h-1 mt-1.5 bg-black rounded-full shrink-0"></div> Clear educational communication</li>
                        <li className="flex items-start gap-2"><div className="w-1 h-1 mt-1.5 bg-black rounded-full shrink-0"></div> Strong thumbnail readability</li>
                        <li className="flex items-start gap-2"><div className="w-1 h-1 mt-1.5 bg-black rounded-full shrink-0"></div> Consistent poster and cover design</li>
                        <li className="flex items-start gap-2"><div className="w-1 h-1 mt-1.5 bg-black rounded-full shrink-0"></div> Student-friendly visual structure</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-themeBg border border-neutral-200 rounded-2xl p-6">
                    <h4 className="font-sans font-black text-lg text-black mb-3">Result</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                      The work helped VG Study Hub maintain a stronger visual presence across YouTube, social platforms, study materials, and promotional content.
                    </p>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-neutral-100">
                    <button 
                      onClick={scrollToContact}
                      className="px-6 py-3 bg-black hover:bg-neutral-800 text-white rounded-full font-mono text-[10px] tracking-widest uppercase transition-colors text-center font-medium"
                    >
                      START A SIMILAR PROJECT
                    </button>
                    <button 
                      onClick={scrollToContact}
                      className="px-6 py-3 bg-white hover:bg-neutral-50 border border-neutral-200 text-black rounded-full font-mono text-[10px] tracking-widest uppercase transition-colors text-center font-medium"
                    >
                      CONTACT FOR DESIGN WORK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal 
        image={lightboxImage} 
        onClose={() => setLightboxImage(null)} 
      />
    </section>
  );
};

export default VGStudyHubShowcase;
