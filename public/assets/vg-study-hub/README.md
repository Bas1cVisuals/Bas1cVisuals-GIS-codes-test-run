# VG Study Hub Asset Upload Guide

Upload optimized `.webp` images here:

- `website-design/` for website or app layout screenshots
- `thumbnails/` for YouTube thumbnail designs
- `posters/` for poster and promotional designs
- `book-covers/` for book cover and study material cover designs

After uploading, open `components/VGStudyHubShowcase.tsx` and add one item to the matching array inside `vgStudyHubAssets`.

Example:

```ts
{
  title: "Design Title",
  category: "Posters",
  thumbnail: "/assets/vg-study-hub/posters/design-file.webp",
  full: "/assets/vg-study-hub/posters/design-file.webp",
  alt: "Short description of the design"
}
```

Use simple filenames when possible, for example `physics-thumbnail-01.webp` or `admission-poster-01.webp`.
