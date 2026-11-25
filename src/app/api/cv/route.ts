import PDFDocument from "pdfkit";
import { experience, profile, skillDomains } from "@/lib/portfolio-data";

export const runtime = "nodejs";

export async function GET() {
  const document = new PDFDocument({
    size: "A4",
    margins: { top: 48, bottom: 48, left: 48, right: 48 },
    info: {
      Title: `${profile.fullName} - CV`,
      Author: profile.fullName,
    },
  });

  const contents = new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    document.on("data", (chunk: Buffer) => chunks.push(chunk));
    document.on("end", () => resolve(Buffer.concat(chunks)));
    document.on("error", reject);

    document.font("Helvetica-Bold").fontSize(23).fillColor("#241b15").text(profile.fullName);
    document.moveDown(0.35);
    document.font("Helvetica").fontSize(10).fillColor("#9a6518").text(profile.headline);
    document.moveDown(0.5);
    document.fontSize(9).fillColor("#444444").text(
      `${profile.location}  |  ${profile.email}  |  ${profile.phonePrimary}`,
    );

    const heading = (label: string) => {
      document.moveDown(1);
      document.font("Helvetica-Bold").fontSize(12).fillColor("#241b15").text(label.toUpperCase());
      document.moveDown(0.35);
    };

    heading("Professional summary");
    document.font("Helvetica").fontSize(9.5).fillColor("#444444").text(profile.biography, { lineGap: 3 });

    heading("Experience");
    for (const role of experience) {
      document.font("Helvetica-Bold").fontSize(10).fillColor("#241b15").text(role.title, { continued: true });
      document.font("Helvetica").fontSize(9).fillColor("#8a5a16").text(`  |  ${role.dates}`);
      document.font("Helvetica").fontSize(9).fillColor("#555555").text(`${role.company} · ${role.location}`);
      for (const highlight of role.highlights) {
        document.font("Helvetica").fontSize(8.5).fillColor("#444444").text(`• ${highlight}`, {
          indent: 10,
          lineGap: 1.5,
        });
      }
      document.moveDown(0.45);
    }

    heading("Education");
    document.font("Helvetica-Bold").fontSize(9.5).fillColor("#241b15").text("Bachelor of Science in Information and Communications Technology");
    document.font("Helvetica").fontSize(9).fillColor("#555555").text("University of Burao · October 2017 – September 2021");

    heading("Core skills");
    document.font("Helvetica").fontSize(9).fillColor("#444444").text(
      skillDomains.map((domain) => `${domain.title}: ${domain.skills.slice(0, 4).join(", ")}`).join("\n"),
      { lineGap: 3 },
    );
    document.end();
  });

  const pdf = await contents;
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Salman-Abdikarim-Hussein-CV.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
