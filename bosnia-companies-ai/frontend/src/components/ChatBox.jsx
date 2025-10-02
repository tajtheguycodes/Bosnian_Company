import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search } from 'lucide-react';
import TypingDots from './TypingDots';

function ChatBox({ onAsk, isLoading }) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onAsk(input.trim());
      setInput('');
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-2"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <motion.div
              animate={{
                scale: isFocused ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search companies, cities, or sectors..."
                disabled={isLoading}
                className="w-full pl-14 pr-6 py-5 bg-zinc-900/60 border border-white/5 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-bosnia-yellow/30 focus:bg-zinc-900/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                aria-label="Search query"
              />
            </motion.div>
          </div>
          <motion.button
            type="submit"
            disabled={isLoading || !input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-5 bg-bosnia-yellow hover:bg-yellow-400 disabled:bg-zinc-800 text-black disabled:text-zinc-600 font-semibold rounded-2xl focus:outline-none disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px] transition-all duration-300 shadow-lg hover:shadow-bosnia-yellow/20"
            aria-label="Submit query"
          >
            {isLoading ? (
              <TypingDots />
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Search</span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default ChatBox;
