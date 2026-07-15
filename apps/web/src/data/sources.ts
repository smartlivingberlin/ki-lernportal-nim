import {
  ApprovalStatus,
  ReviewStatus,
  Source,
  SourceType,
  TrustLevel
} from './types';

export const seedSources: Source[] = [
  {
    id: 'digcomp-30',
    name: 'DigComp 3.0 Digital Competence Framework for Citizens',
    publisher: 'European Commission Joint Research Centre',
    url: 'https://joint-research-centre.ec.europa.eu/projects-and-activities/education-and-training/digital-transformation-education/digital-competence-framework-digcomp/digcomp-30_en',
    sourceType: SourceType.Framework,
    reviewStatus: ReviewStatus.Published,
    approvalStatus: ApprovalStatus.Approved,
    trustLevel: TrustLevel.Verified,
    lastReviewed: '2026-07-13',
    publicDisplayAllowed: true,
    description: 'Aktueller europäischer Referenzrahmen für digitale Kompetenzen mit querschnittlich integrierter KI-Kompetenz.'
  },
  {
    id: 'wcag-22',
    name: 'Web Content Accessibility Guidelines 2.2',
    publisher: 'W3C Web Accessibility Initiative',
    url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
    sourceType: SourceType.Guideline,
    reviewStatus: ReviewStatus.Published,
    approvalStatus: ApprovalStatus.Approved,
    trustLevel: TrustLevel.Verified,
    lastReviewed: '2026-07-13',
    publicDisplayAllowed: true,
    description: 'Internationaler Standard für barrierefreie Webinhalte.'
  },
  {
    id: 'eu-ai-act',
    name: 'European Commission AI Act official overview',
    publisher: 'European Commission',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    sourceType: SourceType.Regulation,
    reviewStatus: ReviewStatus.Published,
    approvalStatus: ApprovalStatus.Approved,
    trustLevel: TrustLevel.Verified,
    lastReviewed: '2026-07-13',
    publicDisplayAllowed: true,
    description: 'Offizielle Übersicht zum europäischen Rechtsrahmen für künstliche Intelligenz.'
  },
  {
    id: 'nvidia-nim-docs',
    name: 'NVIDIA NIM Documentation',
    publisher: 'NVIDIA',
    url: 'https://docs.nvidia.com/nim/',
    sourceType: SourceType.Documentation,
    reviewStatus: ReviewStatus.SourceAttached,
    approvalStatus: ApprovalStatus.ReviewRequired,
    trustLevel: TrustLevel.High,
    lastReviewed: '2026-07-13',
    publicDisplayAllowed: false,
    description: 'Interne technische Referenz. Keine bestehende NVIDIA-Partnerschaft oder produktive NIM-Integration.'
  },
  {
    id: 'nist-ai-rmf',
    name: 'Artificial Intelligence Risk Management Framework 1.0',
    publisher: 'National Institute of Standards and Technology',
    url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10',
    sourceType: SourceType.Framework,
    reviewStatus: ReviewStatus.Published,
    approvalStatus: ApprovalStatus.Approved,
    trustLevel: TrustLevel.Verified,
    lastReviewed: '2026-07-13',
    publicDisplayAllowed: true,
    description: 'Offizieller freiwilliger Rahmen für vertrauenswürdige und verantwortungsvolle KI-Risikosteuerung.'
  },
  {
    id: 'nist-genai-profile',
    name: 'Generative Artificial Intelligence Profile – NIST AI 600-1',
    publisher: 'National Institute of Standards and Technology',
    url: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence',
    sourceType: SourceType.Framework,
    reviewStatus: ReviewStatus.Published,
    approvalStatus: ApprovalStatus.Approved,
    trustLevel: TrustLevel.Verified,
    lastReviewed: '2026-07-13',
    publicDisplayAllowed: true,
    description: 'Offizielles NIST-Profil zu besonderen Risiken und Prüfanforderungen generativer KI.'
  },
  {
    id: 'oecd-ai-principles',
    name: 'OECD AI Principles',
    publisher: 'Organisation for Economic Co-operation and Development',
    url: 'https://oecd.ai/en/ai-principles',
    sourceType: SourceType.Guideline,
    reviewStatus: ReviewStatus.Published,
    approvalStatus: ApprovalStatus.Approved,
    trustLevel: TrustLevel.Verified,
    lastReviewed: '2026-07-13',
    publicDisplayAllowed: true,
    description: 'Internationale Prinzipien für menschenzentrierte, vertrauenswürdige und verantwortungsvolle KI.'
  },
  {
    id: 'eu-gdpr',
    name: 'General Data Protection Regulation – official text',
    publisher: 'EUR-Lex',
    url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj',
    sourceType: SourceType.Regulation,
    reviewStatus: ReviewStatus.Published,
    approvalStatus: ApprovalStatus.Approved,
    trustLevel: TrustLevel.Verified,
    lastReviewed: '2026-07-13',
    publicDisplayAllowed: true,
    description: 'Offizieller Text der Datenschutz-Grundverordnung der Europäischen Union.'
  }
];

export const publicSources = seedSources.filter(
  (source) =>
    source.publicDisplayAllowed &&
    source.approvalStatus === ApprovalStatus.Approved &&
    source.reviewStatus === ReviewStatus.Published
);
