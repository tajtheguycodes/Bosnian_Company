import { motion, AnimatePresence } from 'framer-motion';
import CompanyCard from './CompanyCard';

function CompanyList({ result, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="glass-card h-64"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: [0.3, 0.5, 0.3], scale: 1 }}
            transition={{
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.5 }
            }}
          />
        ))}
      </div>
    );
  }

  if (!result) {
    return null;
  }

  if (result.type === 'text') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card p-10"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-zinc-300 text-lg leading-relaxed"
        >
          {result.text}
        </motion.p>
      </motion.div>
    );
  }

  if (result.type === 'company') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            {result.company.name}
          </motion.h2>
        </div>
        <div className="glass-card p-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-zinc-300 text-lg leading-relaxed mb-8"
          >
            {result.summary}
          </motion.p>
          <CompanyCard company={result.company} index={0} />
        </div>
      </motion.div>
    );
  }

  if (result.type === 'list') {
    return (
      <div className="space-y-8">
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            {result.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-zinc-400 text-lg"
          >
            {result.items.length} {result.items.length === 1 ? 'company' : 'companies'} found
          </motion.p>
        </div>
        <AnimatePresence mode="wait">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.items.map((company, index) => (
              <CompanyCard key={company.id} company={company} index={index} />
            ))}
          </div>
        </AnimatePresence>
      </div>
    );
  }

  return null;
}

export default CompanyList;
