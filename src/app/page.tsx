'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Dumbbell, TrendingUp, Activity, Zap, Sparkles } from 'lucide-react';
import { sendMessage } from '@/lib/n8n-client';
import { getOrCreateSessionId, formatTime } from '@/lib/utils';
import type { ChatMessage } from '@/types/workflow';
import ChatBubble from '@/components/ChatBubble';
import WorkoutCard from '@/components/WorkoutCard';
import StatCard from '@/components/StatCard';

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [showWorkouts, setShowWorkouts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());

    // Welcome message
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: "Hey! I'm FlexAI, your personal fitness coach. I'm here to help you crush your fitness goals! What would you like to work on today?",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(sessionId, userMessage.content);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-effect border-b border-white/5 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <Dumbbell className="w-8 h-8 text-primary" />
                </motion.div>
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                </motion.div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  FlexAI
                </h1>
                <p className="text-xs text-text-secondary">Your AI Fitness Coach</p>
              </div>
            </motion.div>

            <button
              onClick={() => setShowWorkouts(!showWorkouts)}
              className="glass-effect-light px-4 py-2 rounded-full text-sm font-medium hover:bg-surface-light transition-colors"
            >
              {showWorkouts ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-3xl border border-white/5 overflow-hidden"
              style={{ height: 'calc(100vh - 180px)' }}
            >
              {/* Messages */}
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                  <AnimatePresence mode="popLayout">
                    {messages.map((message, index) => (
                      <ChatBubble
                        key={message.id}
                        message={message}
                        delay={index * 0.05}
                      />
                    ))}
                  </AnimatePresence>

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-2 text-text-secondary"
                    >
                      <div className="glass-effect-light px-4 py-3 rounded-2xl">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-primary rounded-full"
                              animate={{
                                y: [-3, 0, -3],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/5 glass-effect">
                  <form onSubmit={handleSubmit} className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything about fitness..."
                      className="flex-1 bg-surface-light border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-text-secondary transition-all"
                      disabled={isLoading}
                    />
                    <motion.button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-primary to-accent p-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats/Workout Section */}
          <AnimatePresence>
            {showWorkouts && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    icon={<TrendingUp className="w-5 h-5" />}
                    label="Streak"
                    value="7"
                    unit="days"
                    color="primary"
                    delay={0.3}
                  />
                  <StatCard
                    icon={<Activity className="w-5 h-5" />}
                    label="Workouts"
                    value="12"
                    unit="this week"
                    color="accent"
                    delay={0.35}
                  />
                </div>

                {/* Recent Workouts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-effect rounded-3xl border border-white/5 p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold">Recent Workouts</h3>
                  </div>

                  <div className="space-y-3">
                    <WorkoutCard
                      name="Chest + Triceps"
                      date="Today"
                      duration={45}
                      delay={0.45}
                    />
                    <WorkoutCard
                      name="Legs + Core"
                      date="Yesterday"
                      duration={60}
                      delay={0.5}
                    />
                    <WorkoutCard
                      name="Back + Biceps"
                      date="2 days ago"
                      duration={50}
                      delay={0.55}
                    />
                  </div>
                </motion.div>

                {/* Quick Action */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full glass-effect rounded-3xl border border-white/5 p-6 text-left hover:border-primary/30 transition-colors group"
                  onClick={() => setInput("Let's plan my next workout")}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold mb-1">Plan Next Workout</h4>
                      <p className="text-sm text-text-secondary">
                        Get a personalized routine
                      </p>
                    </div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-primary"
                    >
                      →
                    </motion.div>
                  </div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
