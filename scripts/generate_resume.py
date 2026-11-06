#!/usr/bin/env python3
"""Generate the downloadable Android/software resume PDF.

Requires: python -m pip install reportlab pypdf
The generated PDF is a portfolio asset, not a claim about runtime project verification.
"""

from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resume" / "krister-lloyd-magalso-android-developer.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

CHARCOAL = colors.HexColor("#191C19")
SECONDARY = colors.HexColor("#404740")
SAGE = colors.HexColor("#425540")
AMBER = colors.HexColor("#765619")
BORDER = colors.HexColor("#C9C7BE")

styles = {
    "name": ParagraphStyle("name", fontName="Times-Bold", fontSize=19, leading=20, textColor=CHARCOAL, spaceAfter=2),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=8.2, leading=10, textColor=AMBER, spaceAfter=4),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=6.8, leading=8.2, textColor=SECONDARY, alignment=TA_RIGHT),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=6.8, leading=8, textColor=SAGE, spaceBefore=5.5, spaceAfter=2.5),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=7.1, leading=8.65, textColor=SECONDARY, spaceAfter=2),
    "title": ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=7.35, leading=8.9, textColor=CHARCOAL),
    "meta": ParagraphStyle("meta", fontName="Helvetica", fontSize=6.6, leading=8, textColor=SAGE),
    "date": ParagraphStyle("date", fontName="Helvetica", fontSize=6.4, leading=8, textColor=SAGE, alignment=TA_RIGHT),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=6.9, leading=8.35, textColor=SECONDARY, leftIndent=9, firstLineIndent=0, bulletIndent=0, spaceAfter=1),
}


def P(text, style="body"):
    return Paragraph(text, styles[style])


def section(title):
    return [
        P(title.upper(), "section"),
        HRFlowable(width="100%", thickness=0.45, color=BORDER, spaceBefore=0, spaceAfter=3.5),
    ]


def bullet(text):
    return Paragraph(text, styles["bullet"], bulletText="•")


def role(title, organization, dates, bullets):
    heading = Table(
        [[P(f"<b>{title}</b><br/><font name='Helvetica' size='6.7' color='#425540'>{organization}</font>", "title"), P(dates, "date")]],
        colWidths=[142 * mm, 38 * mm],
        hAlign="LEFT",
    )
    heading.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    return KeepTogether([heading, Spacer(1, 1.5)] + [bullet(item) for item in bullets] + [Spacer(1, 2)])


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.35)
    canvas.line(15 * mm, 11 * mm, A4[0] - 15 * mm, 11 * mm)
    canvas.setFont("Helvetica", 5.8)
    canvas.setFillColor(SAGE)
    canvas.drawString(15 * mm, 7.5 * mm, "KRISTER LLOYD MAGALSO  /  ANDROID + SOFTWARE DEVELOPMENT")
    canvas.drawRightString(A4[0] - 15 * mm, 7.5 * mm, f"PAGE {doc.page}")
    canvas.restoreState()


doc = BaseDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    leftMargin=15 * mm,
    rightMargin=15 * mm,
    topMargin=12 * mm,
    bottomMargin=15 * mm,
    title="Krister Lloyd Magalso — Android and Software Developer Resume",
    author="Krister Lloyd Magalso",
    subject="Junior Android Developer | Junior Software Developer",
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
doc.addPageTemplates([PageTemplate(id="resume", frames=[frame], onPage=footer)])

story = []
header = Table(
    [[
        [P("KRISTER LLOYD MAGALSO", "name"), P("Junior Software Developer | Android Developer", "role")],
        P("Caloocan City, Philippines<br/>+63 945 874 1752<br/>kristerlloyd23@gmail.com<br/>github.com/kristerlloyd23-netizen", "contact"),
    ]],
    colWidths=[119 * mm, 61 * mm],
)
header.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
story += [header, HRFlowable(width="100%", thickness=1, color=CHARCOAL, spaceBefore=3, spaceAfter=2)]

story += section("Professional Summary")
story += [P("Computer Science graduate with hands-on project experience developing an offline-first Android Point-of-Sale and inventory management application using Kotlin, Jetpack Compose, Room, and SQLite. Familiar with local persistence, migrations, barcode scanning, device integrations, and Android tools. Also brings professional IT support experience in troubleshooting, equipment configuration, and user assistance.")]

story += section("Technical Skills")
for label, value in [
    ("Android & UI", "Kotlin, Jetpack Compose, Material 3, AndroidX Lifecycle, ViewModel"),
    ("Data & background", "Room, SQLite, migrations, app-private storage, Room FTS, WorkManager"),
    ("Device & integrations", "CameraX, ML Kit, Photo Picker, ExifInterface, Open Food Facts, Gemini API client"),
    ("Build & testing", "JDK 17, Gradle, KSP, Android SDK 34, JUnit, Android Lint"),
]:
    story += [P(f"<b>{label}:</b> {value}")]

story += section("Flagship Technical Project")
story += [role(
    "SariSariPOS — Offline-First POS and Inventory Management",
    "Android application | Kotlin, Jetpack Compose, Room, SQLite | Source: github.com/kristerlloyd23-netizen/SariSariPOS",
    "2026",
    [
        "Implemented POS, inventory, customer-credit, reporting, local backup, and assistant-related components in a source-reviewed Android project.",
        "Configured Room/SQLite persistence through schema version 3, explicit migrations, app-private product images, and attribution records.",
        "Integrated CameraX and ML Kit barcode workflows, Open Food Facts lookup, Room FTS retrieval, and optional Gemini/private HTTPS generation in source.",
        "Included five JUnit tests for break-bulk logic; broader runtime and integration verification remains a documented next step.",
    ],
)]

story += section("Professional Experience")
story += [role(
    "IT Support – Administrative Support",
    "Educational Resources and Interactive Events Services, Inc. (NCERIES)",
    "Feb 2025 – Mar 2026",
    [
        "Installed, configured, and tested 3D dome projection equipment at school sites.",
        "Assisted school personnel with setup and basic troubleshooting during educational activities.",
        "Prepared and maintained audiovisual equipment for interactive learning experiences.",
    ],
)]
story += [role(
    "IT Support Intern",
    "Grace Medical General Center – IT Department",
    "Jan 2025 – Apr 2025",
    [
        "Assisted with basic hardware, software, and workstation troubleshooting.",
        "Helped users resolve common computer-related problems and provided technical guidance.",
        "Supported network connectivity checks and routine IT maintenance.",
    ],
)]

story += section("Education")
story += [P("<b>Bachelor of Science in Computer Science</b> — Immaculada Concepcion College | Graduated July 2025")]

story += section("Certifications and Training")
story += [P("<b>Contact Center Services NC II</b> — TESDA Training Institute / Mindbank Training | 2023")]
story += [P("<b>Data Analyst General Course</b> — Refocus Digital Academy | February 2022 – February 2023")]

doc.build(story)
print(OUTPUT)

try:
    from pypdf import PdfReader
    reader = PdfReader(str(OUTPUT))
    print(f"Pages: {len(reader.pages)}")
    print(f"Text characters: {sum(len(page.extract_text() or '') for page in reader.pages)}")
except ImportError:
    pass
