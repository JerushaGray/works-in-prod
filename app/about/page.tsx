"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-10 text-center space-y-10 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#ecfccb] via-[#f3e8ff] to-[#e0f2fe] opacity-70 blur-2xl -z-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Header */}
      <motion.header
        className="space-y-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold">
          <span className="bg-gradient-to-r from-[#84CC16] to-[#8B5CF6] bg-clip-text text-transparent">
            About Works in Prod
          </span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          This demo was built by Jerusha Gray. It showcases a marketing operations dashboard built with Supabase, Next.js, and Vercel.
        </p>
      </motion.header>

      {/* Main Content */}
      <motion.section
        className="max-w-3xl mx-auto space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <p className="text-base text-gray-700 leading-relaxed">
          I'm building the kind of solutions I've wished for years.
          You can view the open-source code or connect with me to discuss how to bring
          data-driven clarity to your marketing operations.
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          Let's Build Something Epic Together
        </p>
      </motion.section>

      {/* Call to Action / Links */}
      <motion.footer
        className="flex gap-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button asChild variant="outline">
          <Link
            href="https://github.com/jerushagray/works-in-prod"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link
            href="https://www.linkedin.com/in/jerushagray"
            target="_blank"
            rel="noopener noreferrer"
          >
            Let's Connect on LinkedIn
          </Link>
        </Button>
      </motion.footer>
    </div>
  );
}
