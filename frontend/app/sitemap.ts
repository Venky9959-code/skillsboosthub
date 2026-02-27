import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://skillsboosthub.com",
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: "https://skillsboosthub.com/courses",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://skillsboosthub.com/login",
      lastModified: new Date(),
      priority: 0.4,
    },
    {
      url: "https://skillsboosthub.com/register",
      lastModified: new Date(),
      priority: 0.4,
    },
  ];
}
