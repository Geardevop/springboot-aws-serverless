export interface Basket {
    customer_id: string;
    product_list?: Product[];
    total_price: number;
}

export interface Product {
    product_id: string;
    product_name: string;
    product_details: string;
    product_count: number;
    product_price: number;
}

export interface Order {
    orderId: string;
    customer_id: string;
    product: Product[];
    paymentMethod: string | null;
    deliveryLocation: string | null;
    orderStatus: string;
    createdTimestamp: string;
    updatedTimestamp: string;
    orderTotalPrice: number;
}