import { Component, OnInit } from '@angular/core';
import { TipoEmpaqueService } from './service/tipo-empaque-service.service';

@Component({
  selector: 'app-tipo-empaque',
  templateUrl: './tipo-empaque.component.html',
  styleUrls: ['./tipo-empaque.component.css']
})
export class TipoEmpaqueComponent implements OnInit {
  tipoempaques: any[] = [];

  constructor(private tipoempaqueService: TipoEmpaqueService) {
    this.tipoempaqueService.getTipoEmpaque().subscribe((data: any) => {
      this.tipoempaques = data;
    });
   }

  ngOnInit() {
  }

}
