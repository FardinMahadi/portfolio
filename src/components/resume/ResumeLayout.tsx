import { ReactNode } from "react";
import { Document, Page, StyleSheet, View } from "@react-pdf/renderer";

interface ResumeLayoutProps {
  children: ReactNode;
  backgroundColor?: string;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: "24pt 28pt",
    lineHeight: 1.4,
    color: "#1f2937",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
});

export function ResumeLayout({
  children,
  backgroundColor = "#ffffff",
}: ResumeLayoutProps) {
  return (
    <Document>
      <Page size="A4" style={[styles.page, { backgroundColor }]}>
        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {children}
        </View>
      </Page>
    </Document>
  );
}
