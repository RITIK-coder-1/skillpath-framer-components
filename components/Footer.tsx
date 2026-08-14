/* ---------------------------------------------------------------------------------
Footer.tsx
displays the footer with site branding, navigation links and copyright information
----------------------------------------------------------------------------------- */

import type { CSSProperties } from "react";

/* ---------------------------------------------------------------------------------
footer component
----------------------------------------------------------------------------------- */

// displays the site's secondary navigation and footer information
export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={footerContainerStyle}>
        {/* main footer content */}
        <div style={footerContentStyle}>
          {/* site branding and description */}
          <div style={footerBrandStyle}>
            <a href="#" style={footerLogoStyle}>
              Skill
              <span style={footerLogoAccentStyle}>Path</span>
            </a>

            <p style={footerDescriptionStyle}>
              Learn practical skills from courses designed to help you grow,
              build and create.
            </p>
          </div>

          {/* secondary navigation */}
          <nav aria-label="Footer navigation" style={footerNavigationStyle}>
            {/* courses navigation */}
            <div style={footerNavigationGroupStyle}>
              <p style={footerNavigationTitleStyle}>Learn</p>

              <a href="#courses" style={footerLinkStyle}>
                Courses
              </a>

              <a href="#categories" style={footerLinkStyle}>
                Categories
              </a>
            </div>

            {/* company navigation */}
            <div style={footerNavigationGroupStyle}>
              <p style={footerNavigationTitleStyle}>Company</p>

              <a href="#about" style={footerLinkStyle}>
                About
              </a>

              <a href="#contact" style={footerLinkStyle}>
                Contact
              </a>
            </div>
          </nav>
        </div>

        {/* copyright and legal links */}
        <div style={footerBottomStyle}>
          <p style={copyrightStyle}>© 2026 SkillPath. All rights reserved.</p>

          <div style={footerMetaStyle}>
            <a href="#privacy" style={footerMetaLinkStyle}>
              Privacy
            </a>

            <a href="#terms" style={footerMetaLinkStyle}>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------------------
all footer styles
----------------------------------------------------------------------------------- */

const footerStyle: CSSProperties = {
  width: "100%",
  background: "#111113",
  borderTop: "1px solid #27272A",
  boxSizing: "border-box",
};

const footerContainerStyle: CSSProperties = {
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
  padding: "56px 24px 28px",
  display: "flex",
  flexDirection: "column",
  gap: 40,
  boxSizing: "border-box",
};

const footerContentStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 48,
};

const footerBrandStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  maxWidth: 360,
};

const footerLogoStyle: CSSProperties = {
  color: "#FAFAFA",
  fontSize: 21,
  fontWeight: 700,
  lineHeight: 1,
  textDecoration: "none",
  letterSpacing: "-0.03em",
};

const footerLogoAccentStyle: CSSProperties = {
  color: "#A78BFA",
};

const footerDescriptionStyle: CSSProperties = {
  margin: 0,
  color: "#71717A",
  fontSize: 14,
  lineHeight: 1.6,
};

const footerNavigationStyle: CSSProperties = {
  display: "flex",
  gap: 64,
};

const footerNavigationGroupStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const footerNavigationTitleStyle: CSSProperties = {
  margin: 0,
  color: "#E4E4E7",
  fontSize: 13,
  fontWeight: 600,
};

const footerLinkStyle: CSSProperties = {
  color: "#71717A",
  fontSize: 13,
  fontWeight: 400,
  textDecoration: "none",
};

const footerBottomStyle: CSSProperties = {
  paddingTop: 24,
  borderTop: "1px solid #27272A",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 24,
};

const copyrightStyle: CSSProperties = {
  margin: 0,
  color: "#52525B",
  fontSize: 12,
};

const footerMetaStyle: CSSProperties = {
  display: "flex",
  gap: 20,
};

const footerMetaLinkStyle: CSSProperties = {
  color: "#52525B",
  fontSize: 12,
  textDecoration: "none",
};
