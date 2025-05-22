import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor() { }

  // Método para rolar a página para o topo
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
