import { v4 as uuidv4 } from 'uuid';

export interface BasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface IBasket {
    id: string;
    items: BasketItem[];
    clientSecret?: string;
    paymentIntentID?:string;
    deliveryMethodId?:number;
    shippingPrice?:number;
}

export class Basket implements IBasket {
    id = uuidv4();
    items = [];
}

export interface BasketTotals {
    shipping: number,
    subtotal: number,
    total: number
}