/* ---------------------------------------------------------------------------------
CourseSection.tsx
displays the courses returned by the course API and handles the different
API request states
----------------------------------------------------------------------------------- */

import CourseCard from "./CourseCard.tsx";
import useCourse from "../hooks/useCourse.ts";
import type { CourseHookData } from "../types/course_types.ts";
import type { CourseSectionProps } from "../types/course_property_controls.ts";
import { addPropertyControls, ControlType } from "framer";
import type { CSSProperties } from "react";

/* ---------------------------------------------------------------------------------
course section component
----------------------------------------------------------------------------------- */

// displays the current state of the course API response
export default function CourseSection({
  heading,
  courseCardGap,
}: CourseSectionProps) {
  const {
    courses,
    countryCode,
    coursesLoading,
    countryLoading,
    coursesError,
    countryError,
  }: CourseHookData = useCourse();

  /* ---------------------------------------------------------------------------------
    loading state
    ----------------------------------------------------------------------------------- */

  if (coursesLoading) {
    return (
      <section style={sectionStyle}>
        <div style={stateStyle}>Loading courses...</div>
      </section>
    );
  }

  /* ---------------------------------------------------------------------------------
    error state
    ----------------------------------------------------------------------------------- */

  if (coursesError) {
    return (
      <section style={sectionStyle}>
        <div style={stateStyle}>
          <p>Something went wrong. Refresh the page and try again.</p>
        </div>
      </section>
    );
  }

  /* ---------------------------------------------------------------------------------
    empty state
    ----------------------------------------------------------------------------------- */

  if (courses.length === 0) {
    return (
      <section style={sectionStyle}>
        <div style={stateStyle}>No courses found.</div>
      </section>
    );
  }

  /* ---------------------------------------------------------------------------------
    courses state
    ----------------------------------------------------------------------------------- */

  return (
    <section style={sectionStyle}>
      <div style={sectionHeaderStyle}>
        <h2 style={headingStyle}>{heading}</h2>
      </div>

      <div style={getGridStyle(courseCardGap)}>
        {courses.map((course) => (
          <CourseCard
            key={course.mangoId}
            courseName={course.courseName}
            description={course.description}
            price={
              countryCode
                ? countryCode === "IN"
                  ? new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    }).format(course.priceRupee)
                  : new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(course.priceUsdDollar)
                : countryLoading
                ? "Loading price..."
                : "Refresh to view price"
            }
            mainCategory={course.mainCategory}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------------
The property controls for course section
----------------------------------------------------------------------------------- */

addPropertyControls(CourseSection, {
  heading: {
    type: ControlType.String,
    title: "Heading",
    defaultValue: "Explore Courses",
  },

  courseCardGap: {
    type: ControlType.Number,
    title: "Card Gap",
    defaultValue: 24,
    min: 8,
    max: 64,
    displayStepper: true,
  },
});

/* ---------------------------------------------------------------------------------
All the styles for course section
----------------------------------------------------------------------------------- */

// entire section
const sectionStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  maxWidth: 1200,
  margin: "0 auto",
  padding: "64px 24px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
};

// section header
const sectionHeaderStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginBottom: 32,
};

// section heading
const headingStyle = {
  margin: 0,
  fontSize: 40,
  fontWeight: 600,
  letterSpacing: "0.1em",
  color: "#71717A",
};

// the layout
const getGridStyle = (gap: number): CSSProperties => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: `${gap}px`,
  width: "100%",
});

// the API state
const stateStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  minHeight: 240,
  padding: 32,
  boxSizing: "border-box",
  border: "1px solid #27272A",
  borderRadius: 14,
  background: "#18181B",
  color: "#A1A1AA",
  textAlign: "center",
  width: "100%",
  height: "100%",
  fontSize: 24,
};
