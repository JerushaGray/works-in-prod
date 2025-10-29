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
        <motion.h1
          className="text-5xl font-extrabold bg-gradient-to-r from-[#84CC16] to-[#8B5CF6] bg-clip-text text-transparent"
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
        >
          About Works in Prod
        </motion.h1>

        <motion.p
          className="text-lg text-gray-700 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Works in Prod explores how complex systems behave in real environments—fluid, adaptive, and full of learning.{" "}
          Created by Jerusha Gray, it continues an exploration into{" "}
          Marketing Operations, MarTech infrastructure, and Data Strategy.
        </motion.p>
      </motion.header>

      {/* Main Content */}
      <motion.section
        className="max-w-3xl mx-auto space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.25,
            },
          },
        }}
      >
        <motion.p
          className="text-base text-gray-700 leading-relaxed"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          The project showcases a MarTech Stack Management Tool built with{" "}
          Supabase, Next.js, and Vercel. 
          It simulates and tracks system health, integration flow, and performance insights across a connected stack.
        </motion.p>

        <motion.p
          className="text-base text-gray-700 leading-relaxed"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          The goal is to bring clarity, stability, and operational calm to modern marketing ecosystems.{" "}
          Let’s build something remarkable and make sure it truly works in prod.
        </motion.p>
      </motion.section>

      {/* Call to Action / Links */}
      <motion.footer
        className="flex gap-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Button
            asChild
            variant="outline"
            className="transition-all duration-300 hover:shadow-md hover:border-[#84CC16]"
          >
            <Link
              href="https://github.com/jerushagray/works-in-prod"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Link>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Button
            asChild
            variant="outline"
            className="transition-all duration-300 hover:shadow-md hover:border-[#8B5CF6]"
          >
            <Link
              href="https://www.linkedin.com/in/jerushagray"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
            </Link>
          </Button>
        </motion.div>
      </motion.footer>
    </div>
  );
}
