// src/app/core/services/drug-interaction.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DrugInteraction } from "../models/drug-interaction.model";
import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class DrugInteractionService extends BaseService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAll() {
    return this.get<DrugInteraction[]>("interactions");
  }

  getById(id: number) {
    return this.get<DrugInteraction>(`interactions/${id}`);
  }

  getForProduct(productId: number) {
    return this.get<DrugInteraction[]>(`interactions/product/${productId}`);
  }

  getBetweenProducts(productId1: number, productId2: number) {
    return this.get<DrugInteraction[]>(`interactions/between/${productId1}/${productId2}`);
  }

  getBySeverity(severity: string) {
    return this.get<DrugInteraction[]>(`interactions/severity/${severity}`);
  }

  create(interaction: Partial<DrugInteraction>) {
    return this.post("interactions", interaction);
  }

  update(id: number, interaction: Partial<DrugInteraction>) {
    return this.put(`interactions/${id}`, interaction);
  }

  remove(id: number) {
    return this.delete(`interactions/${id}`);
  }
}
