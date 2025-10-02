import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

function RatingStars({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <Star
              className={`w-4 h-4 ${
                i < fullStars
                  ? 'fill-bosnia-yellow text-bosnia-yellow'
                  : i === fullStars && hasHalfStar
                  ? 'fill-bosnia-yellow/50 text-bosnia-yellow'
                  : 'fill-transparent text-zinc-600'
              }`}
            />
          </motion.div>
        ))}
      </div>
      <span className="font-semibold text-white text-base">{rating.toFixed(1)}</span>
    </div>
  );
}

export default RatingStars;
