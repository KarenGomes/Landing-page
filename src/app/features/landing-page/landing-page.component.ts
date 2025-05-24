import { Component } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { CardsComponent } from './components/cards/cards.component';
import { ContactComponent } from './components/contact/contact.component';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [BannerComponent, CardsComponent, ContactComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
