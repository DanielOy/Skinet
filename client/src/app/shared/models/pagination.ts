import { Product } from "./product";

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: Product[];
}

export class Pagination implements IPagination{
    pageIndex!: number;
    pageSize!: number;
    count!: number;
    data: Product[] =[];

}