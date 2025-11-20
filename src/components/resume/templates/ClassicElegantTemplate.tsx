import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { ResumeLayout } from "../ResumeLayout";
import { ResumeTemplateProps } from "../../types/ResumeProps";

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    borderBottom: "1pt solid #cbd5f5",
    paddingBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#111827",
  },
  subtitle: {
    fontSize: 11,
    color: "#475569",
  },
  section: {
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#0f172a",
    borderBottom: "1pt solid #e5e7eb",
    marginBottom: 6,
  },
  entryTitle: {
    fontWeight: 600,
  },
  meta: {
    fontSize: 10,
    color: "#475569",
  },
});

export function ClassicElegantTemplate({ data }: ResumeTemplateProps) {
  return (
    <ResumeLayout backgroundColor="#ffffff">
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.subtitle}>{data.personalInfo.title}</Text>
        <Text style={styles.subtitle}>
          {data.personalInfo.location} · {data.personalInfo.email} ·{" "}
          {data.personalInfo.phone}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text>{data.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp) => (
          <View key={exp.company} style={{ marginBottom: 8 }}>
            <Text style={styles.entryTitle}>
              {exp.role} — {exp.company}
            </Text>
            <Text style={styles.meta}>
              {exp.location} · {exp.startDate} —{" "}
              {exp.current ? "Present" : exp.endDate}
            </Text>
            {exp.achievements.map((point, idx) => (
              <Text key={idx} style={{ marginTop: 2 }}>
                • {point}
              </Text>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {data.projects.map((project) => (
          <View key={project.name} style={{ marginBottom: 6 }}>
            <Text style={styles.entryTitle}>{project.name}</Text>
            <Text style={styles.meta}>{project.description}</Text>
            {project.outcomes?.map((point, idx) => (
              <Text key={idx}>• {point}</Text>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Expertise</Text>
        <Text>Frontend: {data.coreCompetencies.frontend.join(", ")}</Text>
        <Text>Backend: {data.coreCompetencies.backend.join(", ")}</Text>
        <Text>Tools: {data.coreCompetencies.tools.join(", ")}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu) => (
          <View key={edu.degree} style={{ marginBottom: 6 }}>
            <Text style={styles.entryTitle}>{edu.degree}</Text>
            <Text style={styles.meta}>
              {edu.institution} · {edu.location}
            </Text>
            {edu.details?.map((detail, idx) => (
              <Text key={idx}>• {detail}</Text>
            ))}
          </View>
        ))}
      </View>
    </ResumeLayout>
  );
}
