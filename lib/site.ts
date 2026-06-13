/** Central place to tweak brand + nav. Change `name` to rename the store. */
export const siteConfig = {
  name: "SILLAGE",
  tagline: "Iconic scents. A fraction of the price.",
  description:
    "Discover the community-favorite clones of the world's most coveted designer and niche fragrances — vetted, marked up fairly, and shipped to your door.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Designer", href: "/fragrances?category=designer" },
    { label: "Niche", href: "/fragrances?category=niche" },
    { label: "Browse All", href: "/fragrances" },
    { label: "About", href: "/about" },
  ],
} as const;
