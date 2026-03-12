import { collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './config';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Order {
  id?: string;
  orderId: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: Date;
}

const ORDERS_COLLECTION = 'orders';

export const orderService = {
  async createOrder(orderData: Omit<Order, 'id' | 'orderId' | 'createdAt'>): Promise<string> {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const order: Order = {
      ...orderData,
      orderId,
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), order);
    return orderId;
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    const q = query(collection(db, ORDERS_COLLECTION), where('orderId', '==', orderId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return null;
    
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Order;
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  },

  async getAllOrders(): Promise<Order[]> {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  }
};
