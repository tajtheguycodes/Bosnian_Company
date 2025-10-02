import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ChatBox from './components/ChatBox';
import CompanyList from './components/CompanyList';
import { Building2, Sparkles } from 'lucide-react';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const handleAsk = async (userInput) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:3001/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({
        type: 'text',
        text: 'Failed to connect to the server. Please ensure the backend is running on port 3001.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-mesh overflow-x-hidden">
      <div className="relative">
        <motion.div
          style={{ opacity, scale }}
          className="sticky top-0 z-10 pt-20 pb-12 px-4"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-zinc-800/50 backdrop-blur-sm rounded-full border border-white/10"
            >
              <Sparkles className="w-4 h-4 text-bosnia-yellow" />
              <span className="text-sm text-zinc-400">AI-Powered Search</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
                <span className="bg-gradient-to-br from-white via-white to-zinc-400 bg-clip-text text-transparent">
                  Discover
                </span>
                <br />
                <span className="bg-gradient-to-r from-bosnia-yellow via-yellow-400 to-bosnia-yellow bg-clip-text text-transparent">
                  Bosnian Companies
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Explore businesses by city, sector, and rating with intelligent search
            </motion.p>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto px-4 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20"
          >
            <ChatBox onAsk={handleAsk} isLoading={isLoading} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CompanyList result={result} isLoading={isLoading} />
          </motion.div>

          {!result && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-24"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {[
                  { q: 'Companies in Sarajevo', icon: '🏙️' },
                  { q: 'IT companies with 4+ stars', icon: '⭐' },
                  { q: 'How is BH Telecom?', icon: '📱' },
                  { q: 'Retail companies in Tuzla', icon: '🛍️' }
                ].map((item, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleAsk(item.q)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-card p-6 text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-zinc-300 group-hover:text-white transition-colors">
                        {item.q}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
