import Link from 'next/link';

const sections = [
  { label: 'Devices Hub', href: '/proposals/capital-health-solutions/devices' },
  { label: 'Solutions: Vein Clinics', href: '/proposals/capital-health-solutions/solutions/vein-clinics' },
  { label: 'Solutions: Vascular Surgery', href: '/proposals/capital-health-solutions/solutions/vascular-surgery-groups' },
  { label: 'Training', href: '/proposals/capital-health-solutions/training' },
  { label: 'Support', href: '/proposals/capital-health-solutions/support' },
  { label: 'Resources', href: '/proposals/capital-health-solutions/resources' },
  { label: 'Case Studies', href: '/proposals/capital-health-solutions/case-studies' },
  { label: 'Conference Landing', href: '/proposals/capital-health-solutions/conference' },
  { label: 'Contact', href: '/proposals/capital-health-solutions/contact' },
];

export default function CapitalHealthSolutionsProposalPage() {
  return (
    <main className="min-h-screen bg-[#071426] text-slate-100">
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-20">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Capital Health Solutions • Interactive Proposal</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">Vein & Vascular Ultrasound Systems, Training, and Support — End-to-End Growth Experience</h1>
        <p className="mt-6 max-w-3xl text-slate-300">This first-pass prototype includes the full narrative proposal, website architecture, core practice pages, and the first SEO/AEO content batch for stakeholder review.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="rounded-lg bg-[#8b2635] px-4 py-2 font-medium" href="/capital-health-solutions-detailed-proposal.md" download>Download Detailed Proposal</a>
          <a className="rounded-lg border border-slate-500 px-4 py-2 font-medium" href="/capital-health-solutions-first-content-set.md" download>Download Content Set</a>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="rounded-xl border border-slate-700 bg-slate-900/40 p-5 transition hover:bg-slate-900">
            {section.label}
          </Link>
        ))}
      </section>
    </main>
  );
}
