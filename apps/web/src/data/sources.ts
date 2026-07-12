import { Source, SourceType, ReviewStatus, ApprovalStatus, TrustLevel } from './types';

export const seedSources: Source[] = [
  {
    id: 'digcomp-30',
    name: 'DigComp 3.0 Digital Competence Framework for Citizens',
    url: 'https://joint-research-centre.ec.europa.eu/projects-and-activities/education-and-training/digital-transformation-education/digital-competence-framework-digcomp/digcomp-30_en',
    sourceType: SourceType.Framework,
    reviewStatus: ReviewStatus.SourceAttached,
    approvalStatus: ApprovalStatus.ReviewRequired,
    trustLevel: TrustLevel.High,
    description: 'Aktueller europäischer Referenzrahmen für digitale Kompetenzen einschließlich querschnittlich integrierter KI-Kompetenz.'
  },
  {
    id: 'wcag-22',
    name: 'WCAG 2.2',
    url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
    sourceType: SourceType.Guideline,
    reviewStatus: ReviewStatus.SourceAttached,
    approvalStatus: ApprovalStatus.ReviewRequired,
    trustLevel: TrustLevel.Verified,
    description: 'Richtlinien für barrierefreie Webinhalte.'
  },
  {
    id: 'eu-ai-act',
    name: 'European Commission AI Act official overview',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    sourceType: SourceType.Regulation,
    reviewStatus: ReviewStatus.SourceAttached,
    approvalStatus: ApprovalStatus.ReviewRequired,
    trustLevel: TrustLevel.High,
    description: 'Harmonisierte Vorschriften für künstliche Intelligenz.'
  },
  {
    id: 'nvidia-nim-docs',
    name: 'NVIDIA NIM Documentation',
    url: 'https://docs.nvidia.com/nim/',
    sourceType: SourceType.Documentation,
    reviewStatus: ReviewStatus.SourceAttached,
    approvalStatus: ApprovalStatus.ReviewRequired,
    trustLevel: TrustLevel.High,
    description: 'Technische Dokumentation für NVIDIA NIM Inferenz-Services.'
  },
  {
    id: 'nist-ai-rmf',
    name: 'NIST AI Risk Management Framework',
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
    sourceType: SourceType.Framework,
    reviewStatus: ReviewStatus.SourceAttached,
    approvalStatus: ApprovalStatus.ReviewRequired,
    trustLevel: TrustLevel.High,
    description: 'Framework zur Steuerung von Risiken bei KI-Systemen.'
  },
  {
    id: 'oecd-ai-principles',
    name: 'OECD AI Principles',
    url: 'https://oecd.ai/en/ai-principles',
    sourceType: SourceType.Guideline,
    reviewStatus: ReviewStatus.SourceAttached,
    approvalStatus: ApprovalStatus.ReviewRequired,
    trustLevel: TrustLevel.High,
    description: 'Internationale Standards für vertrauenswürdige KI.'
  }
];
