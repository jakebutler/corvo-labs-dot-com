import Link from 'next/link';

const articles = [
  {
    title: 'The Ultimate Buyer’s Guide to Vein Clinic Ultrasound Machines',
    href: '/proposals/capital-health-solutions/resources/vein-clinic-ultrasound-machine-buyers-guide',
  },
  {
    title: 'Portable vs. Console Ultrasound for Vein Clinics',
    href: '/proposals/capital-health-solutions/resources/portable-vs-console-ultrasound-vein-clinics',
  },
  {
    title: 'How to Set Up Your Ultrasound System for DVT Detection',
    href: '/proposals/capital-health-solutions/resources/dvt-ultrasound-system-setup',
  },
  {
    title: 'Venous Insufficiency Mapping: Workflow, Protocols, and Machine Settings',
    href: '/proposals/capital-health-solutions/resources/venous-insufficiency-mapping-ultrasound-workflow',
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-semibold">Capital Health Solutions Resource Hub</h1>
        <p className="mt-4 text-slate-700">First SEO and AEO batch: four long-form buyer and workflow education pages for vein and vascular practices.</p>
        <div className="mt-8 space-y-4">
          {articles.map((article) => (
            <Link key={article.href} href={article.href} className="block rounded-xl border border-slate-200 p-5 hover:bg-slate-50">
              {article.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
