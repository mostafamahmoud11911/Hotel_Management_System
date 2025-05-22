export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  country: string;
  role?: string;
  profileImage?: FileList | null | undefined;
}

export interface ForgetData {
  email: string;
}

export interface ResetPass {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}

export interface Facilities {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoomFacilities {
  name: string;
}

export interface Ads {
  createdAt: string;
  createdBy: {
    userName: string;
    _id: string;
  };
  isActive: boolean;
  room: {
    capacity: number;
    createdAt: string;
    createdBy: string;
    discount: number;
    facilities: string[];
    images: string[];
    price: number;
    roomNumber: string;
    updatedAt: string;
    _id: string;
  };
  updatedAt: string;
  _id: string;
}

export interface AdsRoom {
  room: string;
  discount: number;
  isActive: string;
}

export interface Rooms {
  capacity: number;
  createdAt: string;
  discount: number;
  facilities: string[];
  images: string[];
  price: number;
  roomNumber: string;
  updatedAt: string;
  _id: string;
}

export interface RoomDataType {
  roomNumber: string;
  capacity: number;
  price: number;
  discount: number;
  facilities: string[];
  imgs: FileList[];
}

interface User {
  userName: string;
  _id: string;
}

export interface FavoriteType {
  createdAt: string;
  rooms: Rooms[];
  updatedAt: string;
  _id: string;
  user: User;
}
