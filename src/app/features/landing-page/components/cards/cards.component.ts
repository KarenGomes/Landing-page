import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanService } from '../../../../core/services/plan.service';
import { Product } from '../../../../core/interfaces/product';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {
  plans: Product[] = [];
  filteredPlans: Product[] = [];
  searchTerm: string = '';
  sortBy: string = 'default';
  isLoading: boolean = true;
  errorMessage: string | null = null;

  // Variáveis de paginação
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.fetchPlans();
  }

  // Método para buscar os planos do serviço
  async fetchPlans(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    this.planService.getPlans().then((data: Product[]) => {
      this.plans = [...data];
      this.applyFiltersAndSort();
      this.calculateTotalPages();
    }).catch((error: any) => {
      this.errorMessage = 'Falha ao carregar os planos. Tente novamente mais tarde.';
      console.error('Erro ao buscar planos:', error);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  // Método para atualizar os planos filtrados e ordenados
  applyFiltersAndSort(): void {
    let tempPlans = [...this.plans];

    if (this.searchTerm) {
      tempPlans = tempPlans.filter(plan =>
        plan.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.sortBy === 'menor') {
      tempPlans.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'maior') {
      tempPlans.sort((a, b) => b.price - a.price);
    }

    this.filteredPlans = tempPlans;
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  // Calcula o número total de páginas com base nos planos filtrados
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredPlans.length / this.itemsPerPage);
  }

  // Retorna os planos para a página atual
  getPaginatedPlans(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredPlans.slice(startIndex, endIndex);
  }

  // Navega para uma página específica
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Navega para a próxima página
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Navega para a página anterior
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Retorna um array com os números das páginas para renderizar na paginação
  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }
}
