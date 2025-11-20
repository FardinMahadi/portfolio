import { Fragment } from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { ResumeImage } from "../ResumeImage";
import { ResumeLayout } from "../ResumeLayout";
import { ResumeTemplateProps } from "../../types/ResumeProps";

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1pt solid #e5e7eb",
    paddingBottom: 10,
    gap: 10,
  },
  nameBlock: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 2,
    color: "#0b1729",
  },
  title: {
    fontSize: 10,
    color: "#475569",
  },
  contact: {
    marginTop: 4,
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.2,
  },
  sectionTitle: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: "#0b1729",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: 4,
  },
  bullet: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 1,
  },
  bulletDot: {
    marginTop: 1,
  },
  small: {
    fontSize: 9,
    color: "#475569",
  },
  columns: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    marginTop: 10,
  },
  col: {
    flex: 1,
  },
});

export function ModernMinimalTemplate({ data, imageSrc }: ResumeTemplateProps) {
  return (
    <ResumeLayout>
      <View style={styles.header}>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <View style={styles.contact}>
            <Text>{data.personalInfo.location}</Text>
            <Text>{data.personalInfo.email}</Text>
            <Text>{data.personalInfo.phone}</Text>
          </View>
        </View>
        <ResumeImage
          src={imageSrc ?? data.personalInfo.image ?? ""}
          size={70}
        />
      </View>

      <View style={{ marginTop: 10, gap: 4 }}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={{ fontSize: 10 }}>{data.summary}</Text>
      </View>

      <View
        style={{ marginTop: 8, flexDirection: "row", flexWrap: "wrap", gap: 8 }}
      >
        {data.links.map((link) => (
          <Text key={link.label} style={{ fontSize: 9, color: "#0ea5e9" }}>
            {link.label}: {link.url}
          </Text>
        ))}
      </View>

      <View style={styles.columns}>
        <View style={styles.col}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp) => (
            <View key={exp.company} style={{ marginBottom: 6 }}>
              <Text style={{ fontWeight: 600, fontSize: 10 }}>
                {exp.role} · {exp.company}
              </Text>
              <Text style={styles.small}>
                {exp.startDate} – {exp.current ? "Present" : exp.endDate} ·{" "}
                {exp.location}
              </Text>
              {exp.achievements.slice(0, 4).map((item, idx) => (
                <View key={idx} style={styles.bullet}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={{ fontSize: 9 }}>{item}</Text>
                </View>
              ))}
            </View>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: 4 }]}>Projects</Text>
          {data.projects.slice(0, 2).map((project) => (
            <View key={project.name} style={{ marginBottom: 5 }}>
              <Text style={{ fontWeight: 600, fontSize: 10 }}>
                {project.name}
              </Text>
              <Text style={styles.small}>{project.description}</Text>
              {project.outcomes?.slice(0, 2).map((point, idx) => (
                <View key={idx} style={styles.bullet}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={{ fontSize: 9 }}>{point}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.col}>
          <Text style={styles.sectionTitle}>Core Skills</Text>
          {(Object.entries(data.coreCompetencies) as [string, string[]][]).map(
            ([key, list]) => (
              <View key={key} style={{ marginBottom: 4 }}>
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 10,
                    textTransform: "capitalize",
                  }}
                >
                  {key}
                </Text>
                <Text style={{ fontSize: 9 }}>{list.join(" · ")}</Text>
              </View>
            )
          )}

          <Text style={[styles.sectionTitle, { marginTop: 6 }]}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.degree} style={{ marginBottom: 4 }}>
              <Text style={{ fontWeight: 600, fontSize: 10 }}>
                {edu.degree}
              </Text>
              <Text style={styles.small}>
                {edu.institution} · {edu.location}
              </Text>
              {edu.details?.map((detail, idx) => (
                <Text key={idx} style={{ fontSize: 9 }}>
                  • {detail}
                </Text>
              ))}
            </View>
          ))}

          {data.certifications && (
            <View style={{ marginTop: 6 }}>
              <Text style={styles.sectionTitle}>Highlights</Text>
              {data.certifications.map((cert) => (
                <Fragment key={cert.name}>
                  <Text style={{ fontWeight: 600, fontSize: 10 }}>
                    {cert.name}
                  </Text>
                  {cert.achievement && (
                    <Text style={{ fontSize: 9 }}>{cert.achievement}</Text>
                  )}
                </Fragment>
              ))}
            </View>
          )}
        </View>
      </View>
    </ResumeLayout>
  );
}
