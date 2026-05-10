import { motion } from "framer-motion";
import { Award, Globe2, Building2, MapPin } from "lucide-react";

const memberships = [
  {
    title: "FAO e-Agriculture Community Member",
    description:
      "Recognized member of the FAO e-Agriculture global community contributing to knowledge exchange in plant pathology, crop protection, sustainable agriculture, climate adaptation, and agricultural research.",
    organization: "Food and Agriculture Organization of the United Nations (FAO)",
    country: "Somalia",
  },
];

const MembershipsSection = () => (
  <section id="memberships" className="py-20 lg:py-28 bg-secondary/30 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          Global Affiliations
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
          International Memberships & Professional Networks
        </h2>
        <div className="mt-5 mx-auto h-1 w-16 bg-primary rounded-full" />
      </motion.div>

      {/* Membership Card */}
      <div className="space-y-6">
        {memberships.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="group relative"
          >
            <div className="relative rounded-2xl bg-card border border-border p-7 sm:p-9 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

              {/* Subtle institutional watermark */}
              <div className="absolute -right-6 -top-6 w-40 h-40 rounded-full bg-primary/[0.03] pointer-events-none" />

              <div className="relative">
                {/* Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                      <Globe2 className="w-3 h-3" />
                      International Membership
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-3xl">
                  {item.description}
                </p>

                {/* Meta */}
                <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Organization
                      </p>
                      <p className="text-sm font-medium text-foreground mt-0.5">
                        {item.organization}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Country
                      </p>
                      <p className="text-sm font-medium text-foreground mt-0.5">
                        {item.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default MembershipsSection;
