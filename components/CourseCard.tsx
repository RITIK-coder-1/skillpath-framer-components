/* ---------------------------------------------------------------------------------
CourseCard.tsx
The course card component 
----------------------------------------------------------------------------------- */

import type { CSSProperties } from "react";
import type { CourseCardProps } from "../types/course_types.ts";

// displays the information for an individual course
export default function CourseCard({
  courseName,
  description,
  price,
  mainCategory,
}: CourseCardProps) {
  return (
    <div style={cardStyle}>
      {/* course category */}
      <div style={categoryStyle}>{mainCategory}</div>

      {/* course name */}
      <h3 style={headingStyle}>{courseName}</h3>

      {/* course description */}
      <p style={descriptionStyle}>{description}</p>

      {/* course price */}
      <strong style={priceStyle}>{price}</strong>
    </div>
  );
}

/* ---------------------------------------------------------------------------------
All the styles for course card
----------------------------------------------------------------------------------- */

const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 20,
  background: "#18181B",
  border: "1px solid #27272A",
  borderRadius: 14,
  width: "100%",
  boxSizing: "border-box",
  color: "#F4F4F5",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
};

const categoryStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#A1A1AA",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const headingStyle: CSSProperties = {
  margin: 0,
  fontSize: 20,
  lineHeight: 1.3,
  fontWeight: 650,
  color: "#FAFAFA",
};

const descriptionStyle: CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.6,
  color: "#A1A1AA",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
};

const priceStyle: CSSProperties = {
  marginTop: 4,
  fontSize: 17,
  fontWeight: 600,
  color: "#E4E4E7",
};
