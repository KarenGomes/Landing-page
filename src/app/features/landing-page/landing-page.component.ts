import { Component } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
