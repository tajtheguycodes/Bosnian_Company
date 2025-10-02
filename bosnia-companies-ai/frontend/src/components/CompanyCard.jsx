import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Briefcase, ArrowUpRight } from 'lucide-react';
import RatingStars from './RatingStars';

function CompanyCard({ company, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card p-8 h-full flex flex-col relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-bosnia-yellow/5 rounded-full blur-3xl group-hover:bg-bosnia-yellow/10 transition-all duration-500" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-2xl font-semibold text-white group-hover:text-bosnia-yellow transition-colors duration-300 leading-tight">
              {company.name}
            </h3>
            <motion.a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-bosnia-yellow p-2 -mt-2 -mr-2"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Visit ${company.name} website`}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </div>

          <p className="text-zinc-400 text-base mb-6 flex-grow leading-relaxed">
            {company.description}
          </p>

          <div className="space-y-3 pt-4 border-t border-white/5">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-bosnia-yellow/10">
                <Briefcase className="w-4 h-4 text-bosnia-yellow" />
              </div>
              <span className="text-zinc-300 font-medium">{company.sector}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-bosnia-yellow/10">
                <MapPin className="w-4 h-4 text-bosnia-yellow" />
              </div>
              <span className="text-zinc-400">{company.city}</span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <RatingStars rating={company.ratingAvg} />
              <span className="text-xs text-zinc-500">
                {company.reviewsCount} reviews
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CompanyCard;
