import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { IPagination, Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ProductType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseURL = environment.apiUrl;
  products: Product[] = [];
  brands: Brand[] = [];
  types: ProductType[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();
  productCache = new Map();

  constructor(private http: HttpClient) { }

  getProducts(useCache: boolean) {
    if (useCache == false) {
      this.productCache = new Map();
    } else if (this.productCache.size > 0 &&
      this.productCache.has(Object.values(this.shopParams).join('-'))) {
      this.pagination.data = this.productCache.get(Object.values(this.shopParams).join('-'));
      return of(this.pagination);
    }
    let params = new HttpParams();

    if (this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }

    if (this.shopParams.typeId !== 0) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseURL + 'products', { observe: 'response', params })
      .pipe(
        map(response => {
          if (response.body) {
            this.productCache.set(Object.values(this.shopParams).join('-'), response.body.data);
            this.pagination = response.body;
          }
          return this.pagination;
        }));
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number) {
    let product: Product | undefined;
    this.productCache.forEach((products: Product[]) => {
      product = products.find(p => p.id === id);
    })

    if (product) {
      return of(product);
    }

    return this.http.get<Product>(this.baseURL + 'products/' + id);
  }

  getBrands() {
    if (this.brands.length > 0) {
      return of(this.brands);
    }

    return this.http.get<Brand[]>(this.baseURL + 'products/brands').pipe(
      map(response => {
        this.brands = response;
        return response;
      })
    )
  }

  getTypes() {
    if (this.types.length > 0) {
      return of(this.types);
    }

    return this.http.get<ProductType[]>(this.baseURL + 'products/types').pipe(
      map(response => {
        this.types = response;
        return response;
      })
    )
  }

}
