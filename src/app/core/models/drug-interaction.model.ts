// src/app/core/models/drug-interaction.models.ts
export enum InteractionSeverity {
  MILD = 'MILD',
  MODERATE = 'MODERATE',
  SEVERE = 'SEVERE',
  CONTRAINDICATED = 'CONTRAINDICATED'
}

export class DrugInteraction {
  id: number;
  productId: number;
  interactsWithId: number;
  severity: InteractionSeverity;
  description: string;
  clinicalManagement: string;
  evidenceLevel: string;
  createdAt: Date;

  // Additional display fields
  productName: string;
  interactsWithName: string;
  productCategory: string;
  interactsWithCategory: string;
  severe: boolean;
}
