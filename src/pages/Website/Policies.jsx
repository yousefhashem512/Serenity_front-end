
const sections = [
  {
    id: "infocollect",
    title: "1. WHAT INFORMATION DO WE COLLECT?",
    content: `
We collect personal information that you voluntarily provide to us when you register on the Services, contact us, or participate in activities on the platform.

This may include:
• Name
• Email address
• Phone number
• Booking information
• Device and browser information
• IP address and usage analytics

We do not process sensitive personal information.
    `,
  },
  {
    id: "infouse",
    title: "2. HOW DO WE PROCESS YOUR INFORMATION?",
    content: `
We process your information to:
• Provide and manage our services
• Improve user experience
• Communicate with users
• Prevent fraud and maintain security
• Comply with legal obligations

We may also process information with your consent.
    `,
  },
  {
    id: "whoshare",
    title: "3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
    content: `
We may share information with:
• Business partners
• Service providers
• Affiliates
• Legal authorities when required
• Companies involved in mergers or acquisitions
    `,
  },
  {
    id: "cookies",
    title: "4. DO WE USE COOKIES AND TRACKING TECHNOLOGIES?",
    content: `
Yes. We use cookies and similar technologies to:
• Improve performance
• Save preferences
• Analyze traffic
• Enhance security
• Deliver personalized content and advertising
    `,
  },
  {
    id: "sociallogins",
    title: "5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?",
    content: `
If you log in through social media accounts, we may receive profile information associated with those accounts depending on your privacy settings.
    `,
  },
  {
    id: "intltransfers",
    title: "6. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?",
    content: `
Your information may be stored and processed in countries outside your own where our partners and providers operate.
    `,
  },
  {
    id: "inforetain",
    title: "7. HOW LONG DO WE KEEP YOUR INFORMATION?",
    content: `
We keep personal information only as long as necessary for legal, operational, and business purposes.
    `,
  },
  {
    id: "infominors",
    title: "8. DO WE COLLECT INFORMATION FROM MINORS?",
    content: `
We do not knowingly collect data from children under the age of 13.
    `,
  },
  {
    id: "privacyrights",
    title: "9. WHAT ARE YOUR PRIVACY RIGHTS?",
    content: `
Depending on your location, you may have rights to:
• Access your data
• Correct information
• Delete your data
• Withdraw consent
• Object to data processing
    `,
  },
  {
    id: "policyupdates",
    title: "10. DO WE MAKE UPDATES TO THIS NOTICE?",
    content: `
Yes. We may update this Privacy Notice periodically to comply with legal requirements or service changes.
    `,
  },
  {
    id: "contact",
    title: "11. HOW CAN YOU CONTACT US?",
    content: `
Serenity Recovery
46 Abbas El Akkad Street, Nasr City, 6th Floor
Cairo, Egypt

Email: Info@Serenityrecovery-eg.com
Phone: +20 100 676 8004
Website: https://Serenityrecovery-eg.com
    `,
  },
];

export default function Policies() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#ececec]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="uppercase tracking-[0.2em] text-xs text-gray-500">
              Serenity Recovery
            </p>

            <h1 className="text-2xl font-semibold mt-1">
              Privacy Policy
            </h1>
          </div>

          <a
            href="https://Serenityrecovery-eg.com"
            target="_blank"
            rel="noreferrer"
            className="border border-black rounded-full px-5 py-2 text-sm hover:bg-black hover:text-white transition"
          >
            Visit Website
          </a>
        </div>
      </header>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr] gap-16 px-6 py-12">
        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-28 h-fit">
          <div className="bg-white border border-[#ececec] rounded-3xl p-6">
            <p className="text-sm font-medium text-gray-500 mb-5">
              TABLE OF CONTENTS
            </p>

            <nav className="flex flex-col gap-4">
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

        {/* Main Content */}
        <main className="space-y-24">
          {/* Hero */}
          <section>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-5">
              Last Updated — 2026
            </p>

            <h2 className="text-5xl leading-tight font-semibold tracking-tight max-w-4xl mb-8">
              Privacy Notice
            </h2>

            <div className="space-y-6 text-gray-700 leading-8 text-[17px] max-w-4xl">
              <p>
                This Privacy Notice explains how Serenity Recovery collects,
                stores, uses, and protects your personal information when you
                use our services.
              </p>

              <p>
                By using the platform, you agree to the practices described in
                this Privacy Policy.
              </p>

              <p>
                If you do not agree with our policies, please discontinue use of
                the Services.
              </p>
            </div>
          </section>

          {/* Sections */}
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <div className="border-t border-[#ececec] pt-10">
                <h3 className="text-3xl font-semibold mb-6">
                  {section.title}
                </h3>

                <div className="bg-white border border-[#ececec] rounded-3xl p-8">
                  <p className="whitespace-pre-line leading-8 text-gray-700 text-[16px]">
                    {section.content}
                  </p>
                </div>
              </div>
            </section>
          ))}

          {/* Footer */}
          <footer className="border-t border-[#ececec] pt-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="font-semibold text-lg">
                  Serenity Recovery
                </h4>

                <p className="text-gray-500 text-sm mt-2">
                  © 2026 All rights reserved.
                </p>
              </div>

              <div className="flex items-center gap-5 text-sm">
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