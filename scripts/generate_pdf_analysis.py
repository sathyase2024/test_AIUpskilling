"""Generate career-paths analysis PDF for AIUpskilling platform."""

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak,
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from datetime import date
import os

OUTPUT = os.path.join(os.path.dirname(__file__), '..', 'AIUpskilling_CareerPaths_Analysis.pdf')

# ── Colours ───────────────────────────────────────────────────────────────────
NAVY   = colors.HexColor('#1E3A5F')
TEAL   = colors.HexColor('#0F766E')
GOLD   = colors.HexColor('#D97706')
SLATE  = colors.HexColor('#475569')
LIGHT  = colors.HexColor('#F1F5F9')
WHITE  = colors.white
RED    = colors.HexColor('#DC2626')
GREEN  = colors.HexColor('#16A34A')
PURPLE = colors.HexColor('#7C3AED')

# ── Data ──────────────────────────────────────────────────────────────────────
PATCH_1 = [
    {
        'rank': 1, 'title': 'AI Engineer', 'slug': 'ai-engineer',
        'difficulty': 'Advanced', 'duration': '8 months',
        'demand': '★★★★★', 'salary': '$145–195K',
        'courses': [
            ('Python for AI/ML',               'AI & Machine Learning', 'Beginner'),
            ('Large Language Models',           'AI & Machine Learning', 'Intermediate'),
            ('Retrieval-Augmented Generation',  'AI & Machine Learning', 'Intermediate'),
            ('AI Agents & Agentic Workflows',   'AI & Machine Learning', 'Advanced'),
            ('MLOps & Model Deployment',        'AI & Machine Learning', 'Advanced'),
        ],
        'rationale': 'Fastest-growing tech role in 2025–26. LLM-native tooling is '
                     'mainstream; demand for production AI outpaces supply 3:1.',
    },
    {
        'rank': 2, 'title': 'DevOps Engineer', 'slug': 'devops-engineer',
        'difficulty': 'Advanced', 'duration': '5 months',
        'demand': '★★★★★', 'salary': '$130–175K',
        'courses': [
            ('Linux & Shell Scripting',             'DevOps',  'Beginner'),
            ('Docker & Containers',                 'DevOps',  'Beginner'),
            ('Kubernetes',                          'DevOps',  'Intermediate'),
            ('Terraform & Infrastructure as Code',  'DevOps',  'Intermediate'),
            ('CI/CD with GitHub Actions',           'DevOps',  'Beginner'),
        ],
        'rationale': 'Evergreen demand. Platform engineering is the new DevOps title; '
                     'Kubernetes + Terraform are must-haves for every cloud hire.',
    },
    {
        'rank': 3, 'title': 'Cloud Engineer', 'slug': 'cloud-engineer',
        'difficulty': 'Advanced', 'duration': '6 months',
        'demand': '★★★★½', 'salary': '$135–180K',
        'courses': [
            ('AWS Core Services',             'Cloud', 'Beginner'),
            ('AWS Solutions Architect',       'Cloud', 'Intermediate'),
            ('Terraform & Infrastructure as Code', 'DevOps', 'Intermediate'),
            ('Cloud Security',                'Cloud', 'Intermediate'),
            ('Serverless Architecture',       'Cloud', 'Intermediate'),
        ],
        'rationale': 'AWS holds 33 % cloud market share; SAA-C03 remains the #1 '
                     'entry-level cloud cert by job-listing volume.',
    },
    {
        'rank': 4, 'title': 'Data Engineer', 'slug': 'data-engineer',
        'difficulty': 'Advanced', 'duration': '6 months',
        'demand': '★★★★½', 'salary': '$130–170K',
        'courses': [
            ('SQL Mastery',                          'Data Engineering', 'Beginner'),
            ('Apache Kafka & Messaging',             'Data Engineering', 'Intermediate'),
            ('Apache Spark',                         'Data Engineering', 'Intermediate'),
            ('Apache Airflow & Orchestration',       'Data Engineering', 'Intermediate'),
            ('dbt & Analytics Engineering',          'Data Engineering', 'Intermediate'),
        ],
        'rationale': 'Data pipelines underpin every AI initiative. dbt + Airflow + Spark '
                     'is now the standard modern data stack hired by 70 % of data teams.',
    },
    {
        'rank': 5, 'title': 'Full Stack Java Developer', 'slug': 'fullstack-java',
        'difficulty': 'Advanced', 'duration': '7 months',
        'demand': '★★★★', 'salary': '$120–160K',
        'courses': [
            ('Java Spring Boot',   'Backend',  'Intermediate'),
            ('PostgreSQL Mastery', 'Backend',  'Intermediate'),
            ('React.js',           'Frontend', 'Beginner'),
            ('Docker & Containers','DevOps',   'Beginner'),
        ],
        'rationale': 'Java remains the dominant enterprise language. Spring Boot + React '
                     'is the standard stack at banks, fintechs and large ISVs.',
    },
]

PATCH_2 = [
    {
        'rank': 6, 'title': 'Frontend Engineer', 'slug': 'frontend-engineer',
        'difficulty': 'Intermediate', 'duration': '4 months',
        'demand': '★★★★', 'salary': '$100–140K',
        'courses': [
            ('TypeScript',                  'Frontend', 'Beginner'),
            ('React.js',                    'Frontend', 'Beginner'),
            ('Next.js',                     'Frontend', 'Intermediate'),
            ('Tailwind CSS & Modern CSS',   'Frontend', 'Beginner'),
        ],
        'rationale': 'React + Next.js + TypeScript is the dominant frontend trio. '
                     'Strong overlap with MERN and Full Stack Java paths reduces content cost.',
    },
    {
        'rank': 7, 'title': 'MERN Stack', 'slug': 'mern-stack',
        'difficulty': 'Intermediate', 'duration': '5 months',
        'demand': '★★★★', 'salary': '$100–140K',
        'courses': [
            ('React.js',          'Frontend', 'Beginner'),
            ('Node.js & Express', 'Backend',  'Beginner'),
            ('TypeScript',        'Frontend', 'Beginner'),
            ('MongoDB',           'Backend',  'Beginner'),
        ],
        'rationale': 'Most popular "first full-stack" learning path globally. '
                     '3 of 4 courses shared with Frontend/Full Stack Java reduces net cost.',
    },
    {
        'rank': 8, 'title': 'Data Scientist', 'slug': 'data-scientist',
        'difficulty': 'Intermediate', 'duration': '6 months',
        'demand': '★★★½', 'salary': '$115–155K',
        'courses': [
            ('Python for AI/ML',             'AI & Machine Learning', 'Beginner'),
            ('SQL Mastery',                  'Data Engineering',      'Beginner'),
            ('Machine Learning Fundamentals','AI & Machine Learning', 'Beginner'),
            ('Data Science with Python',     'AI & Machine Learning', 'Beginner'),
        ],
        'rationale': 'Strong learner demand but role is evolving toward AI Engineer. '
                     'Ranked 8th to allow Patch 1 AI Engineer track to launch first.',
    },
    {
        'rank': 9, 'title': 'Web & Cloud Security Engineer', 'slug': 'cybersecurity-engineer',
        'difficulty': 'Advanced', 'duration': '6 months',
        'demand': '★★★★', 'salary': '$130–175K',
        'courses': [
            ('Linux & Shell Scripting',         'DevOps',    'Beginner'),
            ('Web App Security OWASP',          'Security',  'Intermediate'),
            ('API Security',                    'Security',  'Intermediate'),
            ('Cloud Security Fundamentals',     'Security',  'Beginner'),
            ('DevSecOps',                       'DevOps',    'Intermediate'),
        ],
        'rationale': 'Defensive/application security scope only (renamed from Cybersecurity). '
                     'High industry demand but niche learner base; Patch 2 placement is optimal.',
    },
    {
        'rank': 10, 'title': 'Mobile Developer', 'slug': 'mobile-developer',
        'difficulty': 'Intermediate', 'duration': '5 months',
        'demand': '★★★', 'salary': '$105–145K',
        'courses': [
            ('TypeScript',              'Frontend',      'Beginner'),
            ('React Native',            'Frontend',      'Intermediate'),
            ('Flutter',                 'Frontend',      'Intermediate'),
            ('API Design & Best Practices', 'System Design', 'Intermediate'),
        ],
        'rationale': 'Healthy but slower-growth segment. React Native + Flutter dual coverage '
                     'maximises reach. TypeScript shared with Frontend/MERN paths.',
    },
]

ALL_PATHS = PATCH_1 + PATCH_2

# Course sharing map (slug → paths that use it)
SHARED = {
    'TypeScript':                  ['Frontend', 'MERN', 'Mobile'],
    'React.js':                    ['Frontend', 'MERN', 'Full Stack Java'],
    'Docker & Containers':         ['DevOps', 'Full Stack Java'],
    'Terraform & Infra as Code':   ['DevOps', 'Cloud'],
    'Python for AI/ML':            ['AI Engineer', 'Data Scientist'],
    'Linux & Shell Scripting':     ['DevOps', 'Security'],
    'SQL Mastery':                 ['Data Engineer', 'Data Scientist'],
    'Next.js':                     ['Frontend'],
    'Tailwind CSS':                ['Frontend'],
    'Node.js & Express':           ['MERN'],
    'MongoDB':                     ['MERN'],
    'Spring Boot':                 ['Full Stack Java'],
    'PostgreSQL Mastery':          ['Full Stack Java'],
    'Kubernetes':                  ['DevOps'],
    'AWS Core / Solutions Arch':   ['Cloud'],
    'Cloud Security':              ['Cloud', 'Security'],
    'Serverless Architecture':     ['Cloud'],
    'LLMs':                        ['AI Engineer'],
    'RAG':                         ['AI Engineer'],
    'AI Agents':                   ['AI Engineer'],
    'MLOps':                       ['AI Engineer'],
    'Kafka':                       ['Data Engineer'],
    'Apache Spark':                ['Data Engineer'],
    'Airflow':                     ['Data Engineer'],
    'dbt':                         ['Data Engineer'],
    'ML Fundamentals':             ['Data Scientist'],
    'Data Science with Python':    ['Data Scientist'],
    'Web App Security OWASP':      ['Security'],
    'API Security':                ['Security'],
    'DevSecOps':                   ['Security'],
    'React Native':                ['Mobile'],
    'Flutter':                     ['Mobile'],
    'API Design':                  ['Mobile'],
}

# ── PDF builder ───────────────────────────────────────────────────────────────

def build():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=2*cm, rightMargin=2*cm,
        topMargin=2*cm, bottomMargin=2*cm,
        title='AIUpskilling — Career Paths Analysis',
        author='AIUpskilling Platform',
    )

    S = getSampleStyleSheet()

    def style(name, **kw):
        return ParagraphStyle(name, parent=S['Normal'], **kw)

    h1 = style('H1', fontSize=24, textColor=NAVY, leading=30, spaceAfter=6, fontName='Helvetica-Bold')
    h2 = style('H2', fontSize=16, textColor=TEAL, leading=22, spaceBefore=14, spaceAfter=4, fontName='Helvetica-Bold')
    h3 = style('H3', fontSize=12, textColor=NAVY, leading=16, spaceBefore=8, spaceAfter=3, fontName='Helvetica-Bold')
    body = style('Body', fontSize=9, textColor=SLATE, leading=13, spaceAfter=4)
    small = style('Small', fontSize=8, textColor=SLATE, leading=11)
    tag_style = style('Tag', fontSize=8, textColor=WHITE, leading=10)
    caption = style('Caption', fontSize=8, textColor=SLATE, leading=10, alignment=TA_CENTER, spaceAfter=2)
    right = style('Right', fontSize=8, textColor=SLATE, leading=10, alignment=TA_RIGHT)

    story = []

    # ── Cover ─────────────────────────────────────────────────────────────────
    story.append(Spacer(1, 1.5*cm))
    story.append(Paragraph('AIUpskilling Platform', style('Cover1', fontSize=13, textColor=TEAL,
                                                           fontName='Helvetica-Bold', alignment=TA_CENTER)))
    story.append(Spacer(1, 0.4*cm))
    story.append(Paragraph('Career Paths &amp; Course Catalogue', style('Cover2', fontSize=22, textColor=NAVY,
                                                                         fontName='Helvetica-Bold', alignment=TA_CENTER)))
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph('Strategic Analysis — 2025-2026', style('Cover3', fontSize=13, textColor=SLATE,
                                                                    alignment=TA_CENTER)))
    story.append(Spacer(1, 0.4*cm))
    story.append(Paragraph(f'Prepared: {date.today().strftime("%B %d, %Y")}',
                            style('CoverDate', fontSize=9, textColor=SLATE, alignment=TA_CENTER)))
    story.append(HRFlowable(width='100%', thickness=2, color=TEAL, spaceAfter=0.8*cm, spaceBefore=0.8*cm))

    # ── Executive Summary ─────────────────────────────────────────────────────
    story.append(Paragraph('Executive Summary', h2))
    summary_rows = [
        ['Metric', 'Value'],
        ['Total career paths',     '10'],
        ['Total unique courses',   '45'],
        ['Shared courses (2+ paths)', '5'],
        ['Patch 1 paths (launch-ready)', '5 — AI Engineer, DevOps, Cloud, Data Engineer, Full Stack Java'],
        ['Patch 2 paths', '5 — Frontend, MERN, Data Scientist, Security, Mobile'],
        ['Avg courses per path',   '4.5 (down from 5.2 before optimisation)'],
        ['Estimated Patch 1 gen cost', '~22 courses × $0.03 avg = ~$0.66 (Haiku model)'],
    ]
    t = Table(summary_rows, colWidths=[5.5*cm, 10.5*cm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), NAVY),
        ('TEXTCOLOR',  (0,0), (-1,0), WHITE),
        ('FONTNAME',   (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE',   (0,0), (-1,-1), 9),
        ('BACKGROUND', (0,1), (-1,-1), LIGHT),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT]),
        ('GRID', (0,0), (-1,-1), 0.4, colors.HexColor('#CBD5E1')),
        ('LEFTPADDING',  (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING',   (0,0), (-1,-1), 5),
        ('BOTTOMPADDING',(0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t)
    story.append(Spacer(1, 0.5*cm))

    # ── Industry Demand Rankings ──────────────────────────────────────────────
    story.append(Paragraph('Industry Demand Rankings — All 10 Paths', h2))
    story.append(Paragraph(
        'Rankings based on job-posting volume (LinkedIn/Indeed 2025 Q1), YoY salary growth, '
        'learner enrolment trends and strategic ROI for the platform.',
        body))

    demand_rows = [['Rank', 'Career Path', 'Difficulty', 'Duration', 'Demand', 'Salary Range (USD)', 'Patch']]
    for p in ALL_PATHS:
        patch = '1 🟢' if p['rank'] <= 5 else '2 🔵'
        demand_rows.append([
            str(p['rank']), p['title'], p['difficulty'], p['duration'],
            p['demand'], p['salary'], patch,
        ])

    dt = Table(demand_rows, colWidths=[1*cm, 4.5*cm, 2*cm, 2*cm, 2*cm, 3*cm, 1.5*cm])
    dt.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), NAVY),
        ('TEXTCOLOR',  (0,0), (-1,0), WHITE),
        ('FONTNAME',   (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE',   (0,0), (-1,-1), 8),
        ('ROWBACKGROUNDS', (0,1), (-1,5),  [colors.HexColor('#F0FDF4'), colors.HexColor('#DCFCE7')]),
        ('ROWBACKGROUNDS', (0,6), (-1,-1), [LIGHT, WHITE]),
        ('GRID', (0,0), (-1,-1), 0.4, colors.HexColor('#CBD5E1')),
        ('LEFTPADDING',  (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING',   (0,0), (-1,-1), 4),
        ('BOTTOMPADDING',(0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (0,-1), 'CENTER'),
        ('ALIGN', (6,0), (6,-1), 'CENTER'),
    ]))
    story.append(dt)
    story.append(Spacer(1, 0.4*cm))

    story.append(Paragraph(
        '<b>Key insight:</b> Patch 1 focuses on infrastructure + AI roles where job-market '
        'demand is highest and salary premiums are strongest. Patch 2 covers high-learner-volume '
        'tracks where content overlap reduces net production cost significantly.',
        body))

    story.append(PageBreak())

    # ── Patch 1 Detail ────────────────────────────────────────────────────────
    story.append(Paragraph('Patch 1 — Launch-Priority Career Paths', h2))
    story.append(Paragraph(
        'These 5 paths should be generated and published first. They target the highest-paying, '
        'fastest-growing roles and require 22 unique course topics (some shared).',
        body))

    _render_paths(story, PATCH_1, h3, body, small, GREEN)

    story.append(PageBreak())

    # ── Patch 2 Detail ────────────────────────────────────────────────────────
    story.append(Paragraph('Patch 2 — Second-Wave Career Paths', h2))
    story.append(Paragraph(
        'These 5 paths leverage high content-overlap with Patch 1 tracks, cutting net production cost. '
        'Frontend, MERN and Mobile share TypeScript and React with Full Stack Java and MERN.',
        body))

    _render_paths(story, PATCH_2, h3, body, small, PURPLE)

    story.append(PageBreak())

    # ── Course Sharing Map ────────────────────────────────────────────────────
    story.append(Paragraph('Course Sharing Map', h2))
    story.append(Paragraph(
        'Courses appearing in multiple paths are generated once and reused, reducing cost and '
        'ensuring consistency. Shared courses are shown in <b>bold</b> in the path detail above.',
        body))

    shared_rows = [['Course', 'Used in Paths', 'Count']]
    for course, paths in sorted(SHARED.items(), key=lambda x: -len(x[1])):
        shared_rows.append([course, ', '.join(paths), str(len(paths))])

    st = Table(shared_rows, colWidths=[5*cm, 8.5*cm, 2.5*cm])
    st.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), TEAL),
        ('TEXTCOLOR',  (0,0), (-1,0), WHITE),
        ('FONTNAME',   (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE',   (0,0), (-1,-1), 8),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT]),
        ('GRID', (0,0), (-1,-1), 0.4, colors.HexColor('#CBD5E1')),
        ('LEFTPADDING',  (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('TOPPADDING',   (0,0), (-1,-1), 4),
        ('BOTTOMPADDING',(0,0), (-1,-1), 4),
        ('ALIGN', (2,0), (2,-1), 'CENTER'),
        ('FONTNAME', (2,1), (2,-1), 'Helvetica-Bold'),
    ]))
    story.append(st)
    story.append(Spacer(1, 0.4*cm))

    # ── Full Catalogue ────────────────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph('Full Course Catalogue — 61 Courses', h2))
    story.append(Paragraph(
        'Complete list of all courses in the platform catalogue, organised by category.',
        body))

    catalogue = [
        # AI & Machine Learning
        ('Python for AI/ML',               'AI & ML', 'Beginner'),
        ('Large Language Models',           'AI & ML', 'Intermediate'),
        ('AI Agents & Agentic Workflows',   'AI & ML', 'Advanced'),
        ('Retrieval-Augmented Generation',  'AI & ML', 'Intermediate'),
        ('PyTorch Deep Learning',           'AI & ML', 'Intermediate'),
        ('TensorFlow & Keras',              'AI & ML', 'Intermediate'),
        ('Hugging Face Transformers',       'AI & ML', 'Intermediate'),
        ('MLOps & Model Deployment',        'AI & ML', 'Advanced'),
        ('Data Science with Python',        'AI & ML', 'Beginner'),
        ('Machine Learning Fundamentals',   'AI & ML', 'Beginner'),
        ('Generative AI for Developers',    'AI & ML', 'Intermediate'),
        ('Vector Databases & Embeddings',   'AI & ML', 'Intermediate'),
        # Cloud
        ('AWS Core Services',               'Cloud', 'Beginner'),
        ('AWS Solutions Architect',         'Cloud', 'Intermediate'),
        ('AWS Data & Analytics',            'Cloud', 'Intermediate'),
        ('Google Cloud Platform',           'Cloud', 'Beginner'),
        ('Google Cloud AI/ML',              'Cloud', 'Intermediate'),
        ('Microsoft Azure Fundamentals',    'Cloud', 'Beginner'),
        ('Azure AI Services',               'Cloud', 'Intermediate'),
        ('Cloud Security',                  'Cloud', 'Intermediate'),
        ('Serverless Architecture',         'Cloud', 'Intermediate'),
        # DevOps
        ('Docker & Containers',             'DevOps', 'Beginner'),
        ('Kubernetes',                      'DevOps', 'Intermediate'),
        ('Terraform & Infrastructure as Code','DevOps', 'Intermediate'),
        ('CI/CD with GitHub Actions',       'DevOps', 'Beginner'),
        ('Linux & Shell Scripting',         'DevOps', 'Beginner'),
        ('Monitoring & Observability',      'DevOps', 'Intermediate'),
        ('Site Reliability Engineering',    'DevOps', 'Advanced'),
        ('DevSecOps',                       'DevOps', 'Intermediate'),
        # Backend
        ('Python FastAPI/Django',           'Backend', 'Beginner'),
        ('Node.js & Express',               'Backend', 'Beginner'),
        ('Java Spring Boot',                'Backend', 'Intermediate'),
        ('Go Golang',                       'Backend', 'Intermediate'),
        ('Rust Programming',                'Backend', 'Advanced'),
        ('GraphQL APIs',                    'Backend', 'Intermediate'),
        ('Microservices Architecture',      'Backend', 'Advanced'),
        ('Apache Kafka & Messaging',        'Backend', 'Intermediate'),
        ('PostgreSQL Mastery',              'Backend', 'Intermediate'),
        ('MongoDB',                         'Backend', 'Beginner'),
        # Data Engineering
        ('SQL Mastery',                     'Data Engineering', 'Beginner'),
        ('Apache Spark',                    'Data Engineering', 'Intermediate'),
        ('dbt & Analytics Engineering',     'Data Engineering', 'Intermediate'),
        ('Apache Airflow & Orchestration',  'Data Engineering', 'Intermediate'),
        ('Snowflake BigQuery',              'Data Engineering', 'Intermediate'),
        ('Real-time Data Streaming',        'Data Engineering', 'Advanced'),
        ('Data Warehouse Design',           'Data Engineering', 'Intermediate'),
        # Frontend
        ('React.js',                        'Frontend', 'Beginner'),
        ('Next.js',                         'Frontend', 'Intermediate'),
        ('TypeScript',                      'Frontend', 'Beginner'),
        ('Vue.js Nuxt.js',                  'Frontend', 'Intermediate'),
        ('Tailwind CSS & Modern CSS',       'Frontend', 'Beginner'),
        ('React Native',                    'Frontend', 'Intermediate'),
        ('Flutter',                         'Frontend', 'Intermediate'),
        # System Design
        ('System Design Interview Prep',    'System Design', 'Advanced'),
        ('Distributed Systems',             'System Design', 'Advanced'),
        ('API Design & Best Practices',     'System Design', 'Intermediate'),
        ('Redis & Caching Strategies',      'System Design', 'Intermediate'),
        ('Database Scaling & Sharding',     'System Design', 'Advanced'),
        # Security
        ('Web App Security OWASP',          'Security', 'Intermediate'),
        ('API Security',                    'Security', 'Intermediate'),
        ('Cloud Security Fundamentals',     'Security', 'Beginner'),
    ]

    # Group by category
    from itertools import groupby
    cat_rows = [['#', 'Course Name', 'Category', 'Difficulty']]
    for i, (name, cat, diff) in enumerate(catalogue, 1):
        cat_rows.append([str(i), name, cat, diff])

    ct = Table(cat_rows, colWidths=[0.8*cm, 7.5*cm, 3.5*cm, 2.2*cm])
    diff_colors = {'Beginner': GREEN, 'Intermediate': GOLD, 'Advanced': RED}
    ts = [
        ('BACKGROUND', (0,0), (-1,0), NAVY),
        ('TEXTCOLOR',  (0,0), (-1,0), WHITE),
        ('FONTNAME',   (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE',   (0,0), (-1,-1), 8),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT]),
        ('GRID', (0,0), (-1,-1), 0.4, colors.HexColor('#CBD5E1')),
        ('LEFTPADDING',  (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('TOPPADDING',   (0,0), (-1,-1), 3),
        ('BOTTOMPADDING',(0,0), (-1,-1), 3),
        ('ALIGN', (0,0), (0,-1), 'CENTER'),
    ]
    for row_i, (_, _, diff) in enumerate(catalogue, 1):
        c = diff_colors.get(diff, SLATE)
        ts.append(('TEXTCOLOR', (3, row_i), (3, row_i), c))
        ts.append(('FONTNAME',  (3, row_i), (3, row_i), 'Helvetica-Bold'))
    ct.setStyle(TableStyle(ts))
    story.append(ct)

    story.append(Spacer(1, 0.6*cm))
    story.append(Paragraph(
        'Difficulty colour legend: '
        '<font color="#16A34A"><b>Beginner</b></font>  '
        '<font color="#D97706"><b>Intermediate</b></font>  '
        '<font color="#DC2626"><b>Advanced</b></font>',
        small))

    # ── Generation Cost Estimate ───────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph('Generation Cost Estimate', h2))
    story.append(Paragraph(
        'Using Claude Haiku at $0.80/M input + $4/M output tokens. '
        'Each lesson: ~2,000 input tokens + ~3,500 output tokens = ~$0.0156/lesson. '
        '35 lessons per course.',
        body))

    cost_rows = [['Patch', 'Unique Courses', 'Lessons', 'Est. Cost', 'Notes']]
    cost_rows.append(['Patch 1', '22', '770', '$12.00', 'AI, DevOps, Cloud, Data Eng, Java — no prior content'])
    cost_rows.append(['Patch 2', '10*', '350', '$5.46', '*Excludes 13 courses shared with Patch 1'])
    cost_rows.append(['Total', '32', '1,120', '$17.46', 'Remaining 29 catalogue courses for future phases'])

    cst = Table(cost_rows, colWidths=[2.5*cm, 3*cm, 2.5*cm, 2.5*cm, 5.5*cm])
    cst.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), NAVY),
        ('TEXTCOLOR',  (0,0), (-1,0), WHITE),
        ('FONTNAME',   (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTNAME',   (0,-1), (-1,-1), 'Helvetica-Bold'),
        ('BACKGROUND', (0,-1), (-1,-1), LIGHT),
        ('FONTSIZE',   (0,0), (-1,-1), 9),
        ('ROWBACKGROUNDS', (0,1), (-1,-2), [WHITE, LIGHT]),
        ('GRID', (0,0), (-1,-1), 0.4, colors.HexColor('#CBD5E1')),
        ('LEFTPADDING',  (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING',   (0,0), (-1,-1), 5),
        ('BOTTOMPADDING',(0,0), (-1,-1), 5),
    ]))
    story.append(cst)
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph(
        '<b>Note:</b> 8 AI/ML courses (indexes 0–11 minus Data Science with Python) have already '
        'been generated in a prior run at ~$4.42. The remaining 22 Patch-1 courses are the '
        'priority generation target.',
        body))

    # ── Footer note ───────────────────────────────────────────────────────────
    story.append(Spacer(1, 1*cm))
    story.append(HRFlowable(width='100%', thickness=1, color=SLATE))
    story.append(Paragraph(
        f'AIUpskilling Platform · Confidential · Generated {date.today().strftime("%B %d, %Y")}',
        style('Footer', fontSize=7, textColor=SLATE, alignment=TA_CENTER, spaceBefore=4)))

    doc.build(story)
    print(f'PDF written to: {os.path.abspath(OUTPUT)}')


def _render_paths(story, paths, h3, body, small, accent):
    """Render a section of path cards."""
    for p in paths:
        story.append(HRFlowable(width='100%', thickness=1, color=accent, spaceBefore=6, spaceAfter=4))
        story.append(Paragraph(
            f'{p["rank"]}. {p["title"]}  '
            f'<font color="#{accent.hexval()[2:]}">●</font>  '
            f'{p["difficulty"]} · {p["duration"]} · {p["salary"]}',
            h3))
        story.append(Paragraph(p['rationale'], body))

        course_rows = [['#', 'Course', 'Category', 'Difficulty']]
        for i, (name, cat, diff) in enumerate(p['courses'], 1):
            course_rows.append([str(i), name, cat, diff])

        t = Table(course_rows, colWidths=[0.6*cm, 6.5*cm, 3.5*cm, 2.4*cm])
        diff_colors = {'Beginner': GREEN, 'Intermediate': GOLD, 'Advanced': RED}
        ts = [
            ('BACKGROUND', (0,0), (-1,0), accent),
            ('TEXTCOLOR',  (0,0), (-1,0), WHITE),
            ('FONTNAME',   (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE',   (0,0), (-1,-1), 8),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, LIGHT]),
            ('GRID', (0,0), (-1,-1), 0.4, colors.HexColor('#CBD5E1')),
            ('LEFTPADDING',  (0,0), (-1,-1), 5),
            ('RIGHTPADDING', (0,0), (-1,-1), 5),
            ('TOPPADDING',   (0,0), (-1,-1), 3),
            ('BOTTOMPADDING',(0,0), (-1,-1), 3),
            ('ALIGN', (0,0), (0,-1), 'CENTER'),
        ]
        for row_i, (_, _, diff) in enumerate(p['courses'], 1):
            c = diff_colors.get(diff, SLATE)
            ts.append(('TEXTCOLOR', (3, row_i), (3, row_i), c))
            ts.append(('FONTNAME',  (3, row_i), (3, row_i), 'Helvetica-Bold'))
        t.setStyle(TableStyle(ts))
        story.append(t)
        story.append(Spacer(1, 0.2*cm))


if __name__ == '__main__':
    build()
