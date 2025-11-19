import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { ResumeLayout } from "../ResumeLayout";
import { ResumeTemplateProps } from "../../types/ResumeProps";
import { ResumeImage } from "../ResumeImage";

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: 12,
  },
  sidebar: {
    width: "34%",
    backgroundColor: "#0f172a",
    color: "#f1f5f9",
    padding: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  main: {
    flex: 1,
    padding: 4,
    gap: 8,
  },
  chip: {
    fontSize: 8,
    padding: "3 5",
    borderRadius: 999,
    backgroundColor: "rgba(14,165,233,0.15)",
    color: "#bae6fd",
    marginRight: 4,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: "#0f172a",
    letterSpacing: 1.3,
  },
  badge: {
    fontSize: 9,
    color: "#cbd5f5",
  },
});

export function CreativeProfessionalTemplate({
  data,
  imageSrc,
}: ResumeTemplateProps) {
  return (
    <ResumeLayout backgroundColor="#f8fafc">
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
          {data.personalInfo.name}
        </Text>
        <Text style={{ color: "#475569", fontSize: 10 }}>
          {data.personalInfo.title}
        </Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.sidebar}>
          <View style={{ alignItems: "center" }}>
            <ResumeImage
              src={imageSrc ?? data.personalInfo.image ?? ""}
              size={80}
            />
          </View>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 600 }}>Contact</Text>
            <Text style={styles.badge}>{data.personalInfo.location}</Text>
            <Text style={styles.badge}>{data.personalInfo.email}</Text>
            <Text style={styles.badge}>{data.personalInfo.phone}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 600 }}>Links</Text>
            {data.links.map((link) => (
              <Text key={link.label} style={styles.badge}>
                {link.label}: {link.url}
              </Text>
            ))}
          </View>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 600 }}>Strengths</Text>
            {data.coreCompetencies.strengths.map((strength) => (
              <Text key={strength} style={styles.badge}>
                {strength}
              </Text>
            ))}
          </View>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 600 }}>Languages</Text>
            {data.languages?.map((lang) => (
              <Text key={lang.name} style={styles.badge}>
                {lang.name} · {lang.proficiency}
              </Text>
            ))}
          </View>
          <View>
            <Text style={{ fontSize: 9, fontWeight: 600 }}>Tools</Text>
            {data.coreCompetencies.tools.map((tool) => (
              <Text key={tool} style={styles.badge}>
                {tool}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.main}>
          <View>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={{ fontSize: 10 }}>{data.summary}</Text>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
              <View
                key={exp.company}
                style={{
                  marginTop: 4,
                  backgroundColor: "#ffffff",
                  borderRadius: 8,
                  padding: 8,
                  border: "0.5pt solid #e2e8f0",
                }}
              >
                <Text style={{ fontWeight: 600, fontSize: 10 }}>
                  {exp.role} · {exp.company}
                </Text>
                <Text style={{ fontSize: 9, color: "#64748b" }}>
                  {exp.location} · {exp.startDate} –{" "}
                  {exp.current ? "Present" : exp.endDate}
                </Text>
                {exp.achievements.slice(0, 4).map((ach, idx) => (
                  <Text key={idx} style={{ fontSize: 9, marginTop: 2 }}>
                    • {ach}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          <View>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project) => (
              <View key={project.name} style={{ marginBottom: 5 }}>
                <Text style={{ fontWeight: 600, fontSize: 10 }}>
                  {project.name}
                </Text>
                <Text style={{ fontSize: 9, color: "#475569" }}>
                  {project.description}
                </Text>
                {project.tech && (
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {project.tech.map((tech) => (
                      <Text key={tech} style={styles.chip}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                )}
                {project.outcomes?.slice(0, 2).map((point, idx) => (
                  <Text key={idx} style={{ fontSize: 9 }}>
                    • {point}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          <View>
            <Text style={styles.sectionTitle}>Education & Highlights</Text>
            {data.education.map((edu) => (
              <View key={edu.degree} style={{ marginBottom: 4 }}>
                <Text style={{ fontWeight: 600, fontSize: 10 }}>
                  {edu.degree}
                </Text>
                <Text style={{ fontSize: 9, color: "#475569" }}>
                  {edu.institution} · {edu.location}
                </Text>
                {edu.details?.map((detail, idx) => (
                  <Text key={idx} style={{ fontSize: 9 }}>
                    • {detail}
                  </Text>
                ))}
              </View>
            ))}
            {data.certifications?.map((cert) => (
              <Text key={cert.name} style={{ fontSize: 9 }}>
                • {cert.name} — {cert.achievement}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </ResumeLayout>
  );
}
