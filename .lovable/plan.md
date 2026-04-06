

## Plan: Fit Slide 2 Image from Bottom

**What**: Change the hero image on Slide 2 so it anchors to the bottom of the container, allowing the top to be cropped rather than centering the image.

**How**: On line 68 of `src/pages/HomePage.tsx`, change `object-cover` to `object-cover object-bottom` on the `<img>` tag. This keeps the bottom of the image visible and crops from the top.

**Change**:
```tsx
// Line 68 — before:
<img src={heroImage2} alt="Delivery Al Janna" className="absolute inset-0 w-full h-full object-cover" />

// After:
<img src={heroImage2} alt="Delivery Al Janna" className="absolute inset-0 w-full h-full object-cover object-bottom" />
```

Single one-line change, no other files affected.

