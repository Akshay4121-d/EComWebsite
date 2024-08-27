import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule,SharedModule,MultiSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
