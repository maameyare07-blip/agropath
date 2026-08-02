import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const EMAIL = "maameyare07@gmail.com";
const LAST_UPDATED = "2 August 2026";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card rounded-2xl border border-border shadow-sm p-6 lg:p-8">
    <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-3">{title}</h2>
    <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24">
      <section className="py-14 lg:py-20 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Legal
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              How this website, owned and maintained by Mohamed Mohamud SH Hassan, handles
              the limited information it collects.
            </p>
            <p className="text-sm text-muted-foreground mt-4">Last updated: {LAST_UPDATED}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Section title="Overview">
            <p>
              This site is a personal professional portfolio. It collects only the minimal
              information described below — website usage analytics, and details you choose to
              submit yourself through the testimonial form or the contact options.
            </p>
          </Section>

          <Section title="Analytics and Cookies">
            <p>
              This site uses Google Analytics 4 to understand general site traffic — for example
              which pages are visited, how visitors arrive, approximate location, device type, and
              overall usage patterns. Google Analytics sets cookies in your browser to measure this.
            </p>
            <p>
              This data is aggregated and used only to improve the site. It is not used to identify
              you personally. You can block or delete these cookies in your browser settings at any
              time, and browser-level tracking protection or the Google Analytics opt-out add-on will
              also prevent this measurement.
            </p>
          </Section>

          <Section title="Testimonial Submissions">
            <p>When you submit a testimonial, the form collects:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your full name</li>
              <li>Your position or role</li>
              <li>Your organization</li>
              <li>Your email address</li>
              <li>An optional profile photo</li>
              <li>Your testimonial message</li>
            </ul>
            <p>
              These submissions are stored in the site's backend database (hosted on Supabase
              infrastructure). Every submission is reviewed before it appears on the site.
            </p>
            <p>
              Only approved testimonials are shown publicly, and only the name, position,
              organization, photo, and message are displayed. <strong className="text-foreground">
              Email addresses are never displayed publicly</strong> — they are visible only to the
              site owner, and used solely to verify or follow up on your submission.
            </p>
          </Section>

          <Section title="Contact Information You Share">
            <p>
              The contact section provides phone, WhatsApp, and email options, plus a form that opens
              a pre-filled message in your own email client or WhatsApp. Messages sent this way are
              not stored by this website — they arrive directly in the site owner's inbox or WhatsApp,
              and only include what you voluntarily choose to send.
            </p>
          </Section>

          <Section title="Sharing of Information">
            <p>
              Your information is never sold, rented, or traded. No data is shared with third parties
              beyond the two services required to operate this site: Google Analytics (site usage
              measurement) and the Supabase backend infrastructure (database and file storage for
              testimonials).
            </p>
          </Section>

          <Section title="Your Choices and Rights">
            <p>
              You can request at any time that your testimonial be edited or removed, or that your
              submitted details be deleted from the database. Just get in touch using the contact
              details below and the request will be honoured.
            </p>
          </Section>

          <Section title="Privacy Questions">
            <p>
              For any privacy-related question or request, contact the site owner, Mohamed Mohamud SH
              Hassan, at{" "}
              <a href={`mailto:${EMAIL}`} className="text-primary font-medium hover:underline">
                {EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section title="Updates to This Policy">
            <p>
              This policy may be updated if the site's functionality changes. Any revision will be
              reflected in the "Last updated" date at the top of this page.
            </p>
          </Section>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
