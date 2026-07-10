export default function DvtSetupPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <article className="prose mx-auto max-w-4xl prose-slate">
        <h1>How to Set Up Your Ultrasound System for DVT Detection</h1>
        <p>This guide outlines a practical setup sequence for DVT-supportive vascular imaging workflows in outpatient practices.</p>
        <h2>Setup checklist</h2>
        <ol>
          <li>Standardize vascular presets and depth defaults by exam type.</li>
          <li>Define probe handling, cleaning, and inventory ownership.</li>
          <li>Create a scan-to-report handoff process across clinical and front-office teams.</li>
          <li>Set quality review checkpoints during the first 30 days after go-live.</li>
        </ol>
        <h2>Operational guardrails</h2>
        <ul>
          <li>Use a single naming convention for image labeling.</li>
          <li>Run recurring technician calibration checks.</li>
          <li>Escalate unclear studies through same-day support workflows.</li>
        </ul>
      </article>
    </main>
  );
}
