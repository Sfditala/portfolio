import { about, aiRank, site } from "@/content/site";

const organization = {
  "@type": "Organization",
  name: aiRank.name,
  description: aiRank.pitch,
  ...(aiRank.url ? { url: aiRank.url } : {}),
  founder: { "@type": "Person", name: site.name },
};

const person = {
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  description: site.positioning,
  url: site.url,
  image: `${site.url}/tala-safadi.jpg`,
  email: `mailto:${site.email}`,
  sameAs: Object.values(site.socials),
  worksFor: organization,
  affiliation: { "@type": "CollegeOrUniversity", name: about.university },
};

/** Person and Organization structured data for search engines. */
export default function JsonLd() {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": [person, organization] });
  return (
    <script
      type="application/ld+json"
      // Escaped so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}
