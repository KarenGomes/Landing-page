import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor() { }

  // Método para consumo da API
  async getPlans(): Promise<Product[]> {
    try {
      const response = await fetch(this.apiUrl);

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data: Product[] = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar os planos:', error);
      throw error;
    }
  }

}
