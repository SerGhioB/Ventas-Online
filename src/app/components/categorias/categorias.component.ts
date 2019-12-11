import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './service/categoria-service.service';
import { Categoria } from './categoria';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[];
  paginador: any;
  constructor(private categoriaService: CategoriaService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.categoriaService.getCategoriasPage(page).subscribe((response: any) => {
        this.categorias = response.content as Categoria[];
        this.paginador = response;
      });
    });
  }

}
