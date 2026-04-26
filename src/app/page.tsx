import { SiteShell } from "@/components/site-shell";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Денис Загоровський",
  alternateName: "Denys Zahorovskyi",
  jobTitle: "Student Software Engineer",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Житомирська політехніка"
  },
  email: "mailto:denys.zahorovskyi@example.com",
  url: "https://zagordenis1.github.io/mysiteportfolio2/",
  sameAs: ["https://github.com/zagordenis1"]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <SiteShell />
    </>
  );
}
