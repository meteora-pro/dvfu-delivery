export interface ServerVersionInfo {
  version: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  telegram: string;
  avatar?: string;
}

export enum OrderStatus {
  DRAFT = 'DRAFT',
  WAITING_DELIVERYMAN = 'WAITING_DELIVERYMAN',
  ACCEPTED_BY_DELIVERYMAN = 'ACCEPTED_BY_DELIVERYMAN',
  IN_PROGRESS = 'IN_PROGRESS',
  COLLECTED = 'COLLECTED',
  READY_TO_TRANSFER= 'READY_TO_TRANSFER',
  CANCELED = 'CANCELED',
  DISPUTE = 'DISPUTE',
  CLOSED = 'CLOSED',
}

export type Vote = 1 | 2 | 3 | 4 | 5;

export interface Order {
  id: number;
  user: User;
  positions: OrderPosition[];
  shop?: Shop;
  createAt: Date;
  expiredAt: Date;
  deliveryTo: string;
  status: OrderStatus;
  readonly totalMaxCost: number; // вычисляется из positions
  finalCost?: number;
  deliverymanBenefit?: number; // не меньше 100 рублей + 3%
  customerVote?: Vote;
  deliverymanVote?: Vote;
  readonly deliveryMan: User;
  delivery?: Delivery;
}

export enum OrderPositionStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export interface OrderPosition {
  title: string; // До 255 символов
  maxCost: number; // От 10 до 2^32
  status: OrderPositionStatus;
  declinedComment?: string;
}

export enum DeliveryStatus {
  OPENED= 'OPENED',
  IN_PROGRESS= 'IN_PROGRESS',
  CANCELED= 'CANCELED',
  CLOSED= 'CLOSED',
}

export interface Delivery {
  id: number;
  deliveryman: User;
  orders: Order[];
  readonly status: DeliveryStatus;
}

export interface Shop {
  id: number;
  address: string;
  name: string;
  description: string;
}



// Сделать вычисление рейтинга
