
const sections = [
  {
    id: "services",
    title: "1. OUR SERVICES",
    content: `
The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation.

Those who access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws if applicable.
    `,
  },
  {
    id: "ip",
    title: "2. INTELLECTUAL PROPERTY RIGHTS",
    content: `
We are the owner or licensee of all intellectual property rights in our Services, including source code, databases, functionality, website designs, text, graphics, and trademarks.

You are granted a limited, non-exclusive, non-transferable licence to access and use the Services for personal and internal business purposes only.
    `,
  },
  {
    id: "user",
    title: "3. USER REPRESENTATIONS",
    content: `
By using the Services, you represent and warrant that:
• You have legal capacity to comply with these Terms.
• You are not under the age of 13.
• You will not use automated systems to access the platform.
• You will not use the Services for illegal purposes.
    `,
  },
  {
    id: "prohibited",
    title: "4. PROHIBITED ACTIVITIES",
    content: `
You may not:
• Use the Services unlawfully.
• Attempt unauthorized access.
• Upload harmful or malicious code.
• Use automated scripts or bots.
• Interfere with platform functionality.
    `,
  },
  {
    id: "privacy",
    title: "5. PRIVACY POLICY",
    content: `
We collect limited user data including booking details and contact information in order to provide and improve our Services.

Please review our Privacy Policy for complete details regarding data collection and usage.
    `,
  },
  {
    id: "termination",
    title: "6. TERM AND TERMINATION",
    content: `
We reserve the right to suspend or terminate access to the Services for any breach of these Terms without prior notice.
    `,
  },
  {
    id: "law",
    title: "7. GOVERNING LAW",
    content: `
These Terms shall be governed by and interpreted in accordance with the laws of Egypt.
    `,
  },
  {
    id: "contact",
    title: "8. CONTACT US",
    content: `
Serenity Recovery
46 Abbas El Akkad Street, Nasr City, 6th Floor
Cairo, Egypt

Phone: +20 100 676 8004
Email: Info@Serenityrecovery-eg.com
Website: https://Serenityrecovery-eg.com
    `,
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111]">
      {/* Header */}
      <header className="border-b border-[#eaeaea] bg-white sticky top-0 z-50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Serenity Recovery
            </p>

            <h1 className="text-2xl font-semibold mt-1">
              Terms of Service
            </h1>
          </div>

          <a
            href="https://Serenityrecovery-eg.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm border border-black rounded-full px-4 py-2 hover:bg-black hover:text-white transition"
          >
            Visit Website
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[260px_1fr] gap-14 px-6 py-12">
        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-28 h-fit">
          <div className="bg-white border border-[#eaeaea] rounded-3xl p-6">
            <p className="text-sm font-medium mb-5 text-gray-500">
              TABLE OF CONTENTS
            </p>
            <nav className="flex flex-col gap-3">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-gray-600 hover:text-black transition"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="space-y-20">
          {/* Intro */}
          <section>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
              Last updated — May 10, 2026
            </p>

            <h2 className="text-5xl font-semibold tracking-tight leading-tight mb-8">
              Agreement To Our Legal Terms
            </h2>

            <div className="space-y-6 text-gray-700 leading-8 text-[17px]">
              <p>
                We are Serenity Recovery, operating as Serenity, an online
                booking platform for hijama centers in Egypt and Gulf countries.
              </p>

              <p>
                By accessing or using our website and services, you agree to be
                legally bound by these Terms of Service.
              </p>

              <p>
                If you do not agree with these Terms, you must discontinue use
                of the Services immediately.
              </p>
            </div>
          </section>

          {/* Sections */}
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <div className="border-t border-[#eaeaea] pt-10">
                <h3 className="text-3xl font-semibold mb-6">
                  {section.title}
                </h3>

                <div className="bg-white border border-[#ececec] rounded-3xl p-8">
                  <p className="text-gray-700 leading-8 whitespace-pre-line text-[16px]">
                    {section.content}
                  </p>
                </div>
              </div>
            </section>
          ))}

          {/* Footer */}
          <footer className="border-t border-[#eaeaea] pt-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="font-semibold text-lg">
                  Serenity Recovery
                </p>

                <p className="text-gray-500 mt-2 text-sm">
                  © 2026 All rights reserved.
                </p>
              </div>

              <div className="flex gap-5 text-sm">
                <a
                  href="mailto:Info@Serenityrecovery-eg.com"
                  className="text-gray-600 hover:text-black transition"
                >
                  Email
                </a>

                <a
                  href="https://Serenityrecovery-eg.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-black transition"
                >
                  Website
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}