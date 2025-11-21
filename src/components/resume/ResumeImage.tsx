import type { ResumeImageProps } from "@/components/types/resume";

import { Image, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 9999,
    overflow: "hidden",
    border: "1pt solid #e5e7eb",
  },
});

export function ResumeImage({
  src,
  size = 80,
  borderRadius = 9999,
}: ResumeImageProps) {
  if (!src) return null;
  return (
    <View style={[styles.wrapper, { width: size, height: size, borderRadius }]}>
      {/* React PDF Image component doesn't support alt attributes */}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        src={src}
        style={{ width: size, height: size, objectFit: "cover" }}
      />
    </View>
  );
}
