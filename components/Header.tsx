/* ---------------------------------------------------------------------------------
Header.tsx
displays the main navigation and hero section for the SkillPath landing page
----------------------------------------------------------------------------------- */

import type { CSSProperties } from "react";

/* ---------------------------------------------------------------------------------
header component
----------------------------------------------------------------------------------- */

// displays the site navigation and primary hero content
export default function Header() {
  return (
    <header style={headerStyle}>
      {/* -------------------------------------------------------------------------
        primary navigation
        -------------------------------------------------------------------------- */}

      <div style={containerStyle}>
        {/* site branding */}
        <a href="#" style={logoStyle}>
          Skill<span style={logoAccentStyle}>Path</span>
        </a>

        {/* primary navigation */}
        <nav
          className="header-navigation"
          aria-label="Primary navigation"
          style={navStyle}
        >
          <a href="#courses" style={navLinkStyle}>
            Courses
          </a>

          <a href="#about" style={navLinkStyle}>
            About
          </a>

          <a href="#contact" style={navLinkStyle}>
            Contact
          </a>
        </nav>
      </div>

      {/* -------------------------------------------------------------------------
        hero content
        -------------------------------------------------------------------------- */}

      <div style={heroContainerStyle}>
        {/* hero headline */}
        <h1 style={heroHeadingStyle}>Build Skills. Shape Your Future.</h1>

        {/* one-line hero description */}
        <p style={heroDescriptionStyle}>
          Learn practical skills through courses designed to help you grow,
          build and create.
        </p>

        {/* primary hero call-to-action */}
        <a href="#courses" style={heroCtaStyle}>
          Explore Courses
        </a>
      </div>

      {/*
        ---------------------------------------------------------------------------------
        extra style for the navigation items to disappear on mobile screens
        -----------------------------------------------------------------------------------
            */}

      <style>{`
                @media (max-width: 768px) {
                    .header-navigation {
                        display: none !important;
                    }
                }
            `}</style>
    </header>
  );
}

/* ---------------------------------------------------------------------------------
all the styles for the header and hero
----------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------
header styles
----------------------------------------------------------------------------------- */

// main header container
const headerStyle: CSSProperties = {
  width: "100%",
  background: "#111113",
  borderBottom: "1px solid #27272A",
  boxSizing: "border-box",
};

/* ---------------------------------------------------------------------------------
navigation styles
----------------------------------------------------------------------------------- */

// navigation container
const containerStyle: CSSProperties = {
  width: "100%",
  maxWidth: 1200,
  minHeight: 72,
  margin: "0 auto",
  padding: "0 24px",
  display: "flex",
  alignItems: "center",
  gap: 32,
  boxSizing: "border-box",
};

// branding
const logoStyle: CSSProperties = {
  color: "#FAFAFA",
  fontSize: 21,
  fontWeight: 700,
  lineHeight: 1,
  textDecoration: "none",
  letterSpacing: "-0.03em",
};

const logoAccentStyle: CSSProperties = {
  color: "#A78BFA",
};

// navigation
const navStyle: CSSProperties = {
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: 28,
};

const navLinkStyle: CSSProperties = {
  color: "#A1A1AA",
  fontSize: 14,
  fontWeight: 500,
  textDecoration: "none",
};

/* ---------------------------------------------------------------------------------
hero styles
----------------------------------------------------------------------------------- */

// hero content container
const heroContainerStyle: CSSProperties = {
  width: "100%",
  maxWidth: 900,
  minHeight: 420,
  margin: "0 auto",
  padding: "80px 24px 96px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
  boxSizing: "border-box",
  textAlign: "center",
};

// hero headline
const heroHeadingStyle: CSSProperties = {
  margin: 0,
  maxWidth: 800,
  color: "#FAFAFA",
  fontSize: 56,
  fontWeight: 700,
  lineHeight: 1.08,
  letterSpacing: "-0.04em",
};

// hero supporting text
const heroDescriptionStyle: CSSProperties = {
  margin: 0,
  maxWidth: 620,
  color: "#A1A1AA",
  fontSize: 17,
  fontWeight: 400,
  lineHeight: 1.6,
};

// hero call to action
const heroCtaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 44,
  marginTop: 8,
  padding: "0 20px",
  borderRadius: 8,
  background: "#FAFAFA",
  color: "#18181B",
  fontSize: 14,
  fontWeight: 600,
  textDecoration: "none",
  whiteSpace: "nowrap",
};
