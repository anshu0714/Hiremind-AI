const PDFDocument = require("pdfkit");

const generateInterviewPDF = (res, report, fileName) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${fileName}.pdf"`,
  );

  doc.pipe(res);

  doc
    .fontSize(22)
    .font("Helvetica-Bold")
    .text("Interview Report", { align: "center" });

  doc.moveDown(1.5);

  doc.fontSize(14).font("Helvetica-Bold").text("Role:");
  doc.font("Helvetica").text(report.title);

  doc.moveDown(0.5);

  doc.font("Helvetica-Bold").text("Match Score:");
  doc.font("Helvetica").text(`${report.matchScore}%`);

  doc.moveDown(1.5);

  doc.fontSize(16).font("Helvetica-Bold").text("Summary");
  doc.moveDown(0.5);
  doc
    .fontSize(12)
    .font("Helvetica")
    .text(report.summary || "No summary");

  doc.moveDown(1.5);

  doc.fontSize(16).font("Helvetica-Bold").text("Skill Gap Analysis");
  doc.moveDown(0.5);

  report.skillGap.forEach((s, i) => {
    doc.text(`${i + 1}. ${s.skill} (${s.severity})`);
  });

  doc.moveDown(1.5);

  doc.fontSize(16).font("Helvetica-Bold").text("Technical Questions");
  doc.moveDown(0.5);

  report.technicalQuestions.forEach((q, i) => {
    doc.font("Helvetica-Bold").text(`${i + 1}. ${q.question}`);
    doc.font("Helvetica").text(`Intention: ${q.intention}`);
    doc.text(`Answer: ${q.answer}`);
    doc.moveDown();
  });

  doc.moveDown();

  doc.fontSize(16).font("Helvetica-Bold").text("Behavioral Questions");
  doc.moveDown(0.5);

  report.behavioralQuestions.forEach((q, i) => {
    doc.font("Helvetica-Bold").text(`${i + 1}. ${q.question}`);
    doc.font("Helvetica").text(`Intention: ${q.intention}`);
    doc.text(`Answer: ${q.answer}`);
    doc.moveDown();
  });

  doc.moveDown();

  // ===== PREPARATION PLAN =====
  doc.fontSize(16).font("Helvetica-Bold").text("Preparation Plan");
  doc.moveDown(0.5);

  report.preparationPlan.forEach((day) => {
    doc.font("Helvetica-Bold").text(`Day ${day.day}`);

    doc.font("Helvetica").text("Focus:");
    day.focus.forEach((f) => doc.text(`• ${f}`));

    doc.moveDown(0.3);

    doc.text("Tasks:");
    day.tasks.forEach((t) => doc.text(`• ${t}`));

    doc.moveDown();
  });

  doc.end();
};

module.exports = { generateInterviewPDF };
