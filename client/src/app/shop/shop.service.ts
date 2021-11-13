import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ProductType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseURL = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http.get<Pagination>(this.baseURL + 'products', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        }));
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseURL + 'products/' + id);
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseURL + 'products/brands');
  }

  getTypes() {
    return this.http.get<ProductType[]>(this.baseURL + 'products/types');
  }

}
