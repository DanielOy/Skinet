import { Product } from "./product";

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: Product[];
}

export class Pagination implements IPagination {
    pageIndex: number = 0;
    pageSize: number = 0;
    count: number = 0;
    data: Product[] = [];

}