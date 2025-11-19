import React from "react";
import path from "path";
import fs from "fs/promises";

import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { resumeData } from "@/components/resume/resumeData";
import { ResumeTemplateProps } from "@/components/types/ResumeProps";
import { ModernMinimalTemplate } from "@/components/resume/templates/ModernMinimalTemplate";
import { ClassicElegantTemplate } from "@/components/resume/templates/ClassicElegantTemplate";
import { CreativeProfessionalTemplate } from "@/components/resume/templates/CreativeProfessionalTemplate";

const templateMap: Record<
  string,
  (props: ResumeTemplateProps) => React.ReactElement
> = {
  modern: ModernMinimalTemplate,
  creative: CreativeProfessionalTemplate,
  classic: ClassicElegantTemplate,
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getImageDataUri(relativePath?: string) {
  if (!relativePath) return undefined;
  const cleaned = relativePath.startsWith("/")
    ? relativePath.slice(1)
    : relativePath;
  const fullPath = path.join(process.cwd(), "public", cleaned);
  try {
    const buffer = await fs.readFile(fullPath);
    const ext = path.extname(fullPath).toLowerCase();
    const mime =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
        ? "image/webp"
        : "image/jpeg";
    return `data:${mime};base64,${buffer.toString("base64")}`;
  } catch {
    return undefined;
  }
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ template?: string }> }
) {
  try {
    const { template } = await context.params;
    const templateKey = template?.toLowerCase() ?? "modern";
    const Template = templateMap[templateKey] ?? templateMap["modern"];

    const imageSrc = await getImageDataUri(resumeData.personalInfo.image);
    const buffer = await renderToBuffer(
      <Template data={resumeData} imageSrc={imageSrc} />
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Mahadi_Hasan_Fardin_${templateKey}_resume.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("resume pdf generation failed", error);
    return NextResponse.json(
      { message: "Failed to generate resume PDF." },
      { status: 500 }
    );
  }
}
