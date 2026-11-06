import { useText } from "@/lib/farmerI18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";

const EMAIL = "maameyare07@gmail.com";
const LAST_UPDATED = "6 November 2026";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => { const tr = useText(); return (
  <div className="bg-card rounded-2xl border border-border shadow-sm p-6 lg:p-8">
    <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-3">{title}</h2>
    <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
  </div>
); };

const PrivacyPolicy = () => { const tr = useText(); return (
  <div className="min-h-screen bg-background">
    <Seo
      title="Privacy Policy | AgroPath"
      description="How agropath.lovable.app handles the limited personal information it collects, including contact form details, testimonials and analytics cookies."
      path="/privacy-policy"
    />
    <Navbar />
    <main className="pt-24">
      <section className="py-14 lg:py-20 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">{tr("Legal")}</span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">{tr("Privacy Policy")}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{tr("How this website, owned and maintained by Mohamed Mohamud SH Hassan, handles the limited information it collects.")}</p>
            <p className="text-sm text-muted-foreground mt-4">{tr("Last updated:")} {tr(LAST_UPDATED)}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Section title={tr("Overview")}>
            <p>{tr("This site provides a professional portfolio and farmer tools. It collects website usage information and the details you choose to submit through subscriptions, testimonials, farmer accounts, and Crop Doctor.")}</p>
          </Section>

          <Section title={tr("Analytics and Cookies")}>
            <p>{tr("This site uses Google Analytics 4 to understand general site traffic — for example which pages are visited, how visitors arrive, approximate location, device type, and overall usage patterns. Google Analytics sets cookies in your browser to measure this.")}</p>
            <p>{tr("This data is aggregated and used only to improve the site. It is not used to identify you personally. You can block or delete these cookies in your browser settings at any time, and browser-level tracking protection or the Google Analytics opt-out add-on will also prevent this measurement.")}</p>
          </Section>

          <Section title={tr("Testimonial Submissions")}>
            <p>{tr("When you submit a testimonial, the form collects:")}</p>
            <ul className="list-disc ps-5 space-y-1">
              <li>{tr("Your full name")}</li>
              <li>{tr("Your position or role")}</li>
              <li>{tr("Your organization")}</li>
              <li>{tr("Your email address")}</li>
              <li>{tr("An optional profile photo")}</li>
              <li>{tr("Your testimonial message")}</li>
            </ul>
            <p>{tr("These submissions are stored in the site's backend database (hosted on Supabase infrastructure). Every submission is reviewed before it appears on the site.")}</p>
            <p>{tr("Only approved testimonials are shown publicly, and only the name, position, organization, photo, and message are displayed.")}<strong className="text-foreground">{tr("Email addresses are never displayed publicly")}</strong>{tr("— they are visible only to the site owner, and used solely to verify or follow up on your submission.")}</p>
          </Section>

          <Section title={tr("Contact Information You Share")}>
            <p>{tr("The contact section provides phone, WhatsApp, and email options, plus a form that opens a pre-filled message in your own email client or WhatsApp. Messages sent this way are not stored by this website — they arrive directly in the site owner's inbox or WhatsApp, and only include what you voluntarily choose to send.")}</p>
          </Section>

          <Section title={tr("Crop Doctor")}>
            <p>{tr("Crop Doctor collects the crop name, symptoms, uploaded photos, and the AI-generated diagnosis. For signed-in farmers, these records and photos are saved with the farmer account. Anonymous submissions are processed to provide advice but are not saved to a farmer dashboard.")}</p>
            <p>{tr("Your crop details, symptoms, and photos are processed by an AI service to generate preliminary disease possibilities and management guidance.")}</p>
            <p>{tr("The site administrator may review saved submissions and photos to improve the service and follow up. These submissions are not public; other farmers cannot view your records.")}</p>
            <p>{tr("Farmers can ask for their Crop Doctor records and photos to be deleted by contacting the site owner using the contact details below.")}</p>
          </Section>

          <Section title={tr("Sharing of Information")}>
            <p>{tr("Your information is never sold, rented, or traded. Services used to operate this site include Google Analytics for usage measurement, Lovable Cloud for accounts and private record and photo storage, and an AI service for Crop Doctor assessments.")}</p>
          </Section>

          <Section title={tr("Your Choices and Rights")}>
            <p>{tr("You can request at any time that your testimonial be edited or removed, or that your submitted details be deleted from the database. Just get in touch using the contact details below and the request will be honoured.")}</p>
          </Section>

          <Section title={tr("Privacy Questions")}>
            <p>{tr("For any privacy-related question or request, contact the site owner, Mohamed Mohamud SH Hassan, at")}{" "}
              <a href={`mailto:${EMAIL}`} className="text-primary font-medium hover:underline">
                {EMAIL}
              </a>
              .
            </p>
          </Section>

          <Section title={tr("Updates to This Policy")}>
            <p>{tr("This policy may be updated if the site's functionality changes. Any revision will be reflected in the \"Last updated\" date at the top of this page.")}</p>
          </Section>
        </div>
      </section>
    </main>
    <Footer />
  </div>
); };

export default PrivacyPolicy;
