import type { MetadataRoute } from "next";
import { salaryData } from "@/data/salaries";

const BASE_URL = "https://underchozen.com";

const cities = [
  "San Francisco",
  "New York",
  "Seattle",
  "Austin",
  "Chicago",
];

function toSlug(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/lp/underpaid`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/lp/salary-check`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const salaryRoutes: MetadataRoute.Sitemap = salaryData.flatMap((role) =>
    cities.map((city) => ({
      url: `${BASE_URL}/salary/${toSlug(role.role)}/${toSlug(city)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [...staticRoutes, ...salaryRoutes];
}
