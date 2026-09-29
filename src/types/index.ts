export type CategoryId = 
  | 'fruits-vegetables' 
  | 'groceries' 
  | 'dairy-bakery' 
  | 'beverages' 
  | 'snacks' 
  | 'personal-care' 
  | 'home-care' 
  | 'household';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  categoryName: string;
  subcategory?: string;
  price: number;
  mrp: number;
  discount: number;
  weight: string;
  rating: number;
  reviewCount: number;
  image: string;
  isBestSeller?: boolean;
  isTodayDeal?: boolean;
  isOrganic?: boolean;
  stock: number;
  description: string;
  features: string[];
  sizes: string[];
  tags: string[];
}

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  image: string;
  itemCount: number;
  description: string;
  popularItems: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  discountText: string;
  code: string;
  category: string;
  bgGradient: string;
  image: string;
  validUntil: string;
  minOrder?: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  locality: string;
  address: string;
  pincode: string;
  phone: string;
  hours: string;
  distance: string;
  status: 'Open Now' | 'Closing Soon' | 'Closed';
  amenities: string[];
  googleMapsUrl: string;
}

export interface Review {
  id: string;
  userName: string;
  userCity: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  pincode: string;
  address?: string;
}

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}
