export interface Item {
  _id?: string;
  item_name: string;
  item_price: number;
  item_quantity: number;
}

export interface Bill {
  _id?: string;
  name: string;
  cell_number: number;
  bill_date: Date;
  entry_created_date?: Date;
  final_bill: number;
  bill_items: Item[];
}

export interface BoughtHistory {
  _id?: string;
  bought_quantity: number;
  bought_price: number;
  bought_date: Date;
}

export interface SellingHistory {
  _id?: string;
  sold_date: Date;
  sold_quantity: number;
  sold_price: number;
  profit: number;
}

export interface Product {
  _id?: string;
  product_name: string;
  product_id: number;
  product_quantity: number;
  selling_price: number;
  current_bought_price: number;
  bought_history: BoughtHistory[];
  selling_history: SellingHistory[];
}
