export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/signup"],
        disallow: ["/app/", "/api/"],
      },
    ],
    sitemap: "https://agrisaathi.com/sitemap.xml",
  };
}
