"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiBarChart2,
  FiClock,
  FiCpu,
  FiMapPin,
  FiMenu,
  FiPlay,
  FiFeather,
  FiTrendingUp,
  FiUsers,
  FiX,
  FiShield,
} from "react-icons/fi";
import AgriLivingEnvironment from "./AgriLivingEnvironment";
import MotionReveal from "./MotionReveal";

// All landing page content is managed dynamically through arrays.

const navigation = [
  { label: "Home", href: "/", type: "home" },
  { label: "Market Prices", href: "/app/mandi-prices" },
  { label: "Crop Suggestion", href: "/app/crop-suggestion" },
  { label: "About", href: "#why-agrisaathi" },
];

const heroHighlights = [
  { label: "Real-Time", secondLine: "Mandi Prices", icon: FiBarChart2 },
  { label: "AI Crop", secondLine: "Suggestions", icon: FiCpu },
  { label: "Nearby", secondLine: "Markets", icon: FiMapPin },
  { label: "Historical", secondLine: "Trends", icon: FiTrendingUp },
];

const benefits = [
  {
    title: "Higher Profits",
    description: "Compare market information and make better selling decisions.",
    icon: FiTrendingUp,
  },
  {
    title: "Data-Driven Farming",
    description: "Use agricultural insights to make better crop decisions.",
    icon: FiFeather,
  },
  {
    title: "Save Time",
    description: "Get important farming information in one simple platform.",
    icon: FiClock,
  },
  {
    title: "Support for Farmers",
    description: "Built around the practical needs of the farming community.",
    icon: FiUsers,
  },
];

const platformFeatures = [
  {
    title: "Mandi Price Insights",
    description: "Explore crop prices and compare available market information across India.",
    icon: FiBarChart2,
    href: "/app/mandi-prices",
    action: "Explore Prices",
  },
  {
    title: "AI Crop Suggestions",
    description: "Discover suitable crops using your farm's soil and local growing conditions.",
    icon: FiCpu,
    href: "/app/crop-suggestion",
    action: "Find Crop Ideas",
  },
  {
    title: "Market Analysis",
    description: "Understand seasonal price trends and make high-yield selling decisions.",
    icon: FiTrendingUp,
    href: "/app/market-analysis",
    action: "View Analysis",
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="landing-page">

      {/* NAVBAR */}
      <header className="landing-header">
        <div className="landing-header-inner">

          <Link href="/" className="brand" onClick={closeMenu} aria-label="AgriSaathi Home">
            <span className="brand-mark shadow-sm">
              <FiFeather />
            </span>
            <span>AgriSaathi</span>
          </Link>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          <nav
            className={`main-navigation ${menuOpen ? "is-open" : ""}`}
            aria-label="Main Navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  item.type === "home"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}

            <Link href="/login" className="nav-login" onClick={closeMenu}>
              Login
            </Link>

            <Link
              href="/login"
              className="nav-get-started shadow-sm"
              onClick={closeMenu}
            >
              Get Started <FiArrowRight />
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO SECTION WITH IMMERSIVE LIVING AGRICULTURAL ENVIRONMENT */}
      <section className="hero-section" aria-label="Hero Introduction">
        {/* Living background simulation */}
        <AgriLivingEnvironment
          mode="hero"
          showAtmosphere={true}
          showParticles={true}
          showCrops={true}
          interactive={true}
        />

        <div className="hero-overlay" />

        <div className="hero-content">

          <div className="hero-eyebrow">
            <span className="inline-block w-2 h-2 rounded-full bg-[#55df8b] shadow-[0_0_8px_#55df8b] mr-1.5 animate-pulse" />
            <FiFeather /> SMARTER FARMING STARTS HERE
          </div>

          <h1>
            Better Decisions
            <br />
            for a Prosperous Harvest
          </h1>

          <p className="hero-description">
            Get real-time mandi prices, AI-powered crop suggestions,
            market insights and more — all in one place.
          </p>

          <div className="hero-highlights">
            {heroHighlights.map((item, idx) => {
              const Icon = item.icon;

              return (
                <div
                  className="hero-highlight"
                  key={item.label}
                  style={{
                    animation: `heroTextEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + idx * 0.08}s both`,
                  }}
                >
                  <span className="hero-highlight-icon">
                    <Icon />
                  </span>

                  <span>
                    {item.label}
                    <br />
                    {item.secondLine}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="hero-actions">
            <Link href="/login" className="primary-cta glow-pulse">
              Get Started <FiArrowRight className="text-base" />
            </Link>

            <a href="#platform-features" className="demo-cta">
              <span className="play-icon">
                <FiPlay className="translate-x-0.5" />
              </span>
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="benefits-section" id="why-agrisaathi" aria-label="Why choose AgriSaathi">

        <MotionReveal direction="up" distance={20} className="section-heading">
          <span className="section-kicker">WHY AGRISAATHI</span>

          <h2>Why choose AgriSaathi?</h2>

          <p>
            Useful agricultural insights, brought together in one place.
          </p>
        </MotionReveal>

        <div className="benefit-grid">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <MotionReveal
                as="article"
                key={benefit.title}
                direction="up"
                distance={24}
                delay={index * 90}
                className="benefit-card"
              >
                <span className="benefit-icon">
                  <Icon />
                </span>

                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>
              </MotionReveal>
            );
          })}
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="platform-section" id="platform-features" aria-label="Platform Features">

        <MotionReveal direction="up" distance={20} className="section-heading">
          <span className="section-kicker">
            ONE PLATFORM, MANY POSSIBILITIES
          </span>

          <h2>Tools to support every farming decision</h2>

          <p>
            Explore the tools designed to make farming decisions easier.
          </p>
        </MotionReveal>

        <div className="platform-grid">
          {platformFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <MotionReveal
                as="article"
                key={feature.title}
                direction="up"
                distance={24}
                delay={index * 110}
                className="platform-card"
              >

                <span className="platform-icon">
                  <Icon />
                </span>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <Link href={feature.href} className="text-link group">
                  {feature.action} <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>

              </MotionReveal>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <MotionReveal direction="up" distance={24} className="farmer-cta-section shadow-xl">

        <div className="farmer-cta-icon shadow-inner">
          <FiShield />
        </div>

        <div>
          <span className="section-kicker">
            MAKE INFORMED CHOICES
          </span>

          <h2>Your next farming decision starts here.</h2>

          <p>
            Sign in to explore the tools and information available on
            AgriSaathi.
          </p>
        </div>

        <Link href="/login" className="primary-cta cta-light shadow-md hover:shadow-lg">
          Get Started <FiArrowRight />
        </Link>

      </MotionReveal>

      {/* FOOTER */}
      <footer className="landing-footer">

        <Link href="/" className="brand footer-brand" aria-label="AgriSaathi">
          <span className="brand-mark">
            <FiFeather />
          </span>
          AgriSaathi
        </Link>

        <p>
          Helping farmers make more informed decisions.
        </p>

        <span className="footer-copyright">
          © {new Date().getFullYear()} AgriSaathi
        </span>

      </footer>

    </main>
  );
}
