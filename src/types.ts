export type ServiceCategory = 'hair' | 'beard' | 'combo' | 'spa';

export interface BarberService {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  durationMinutes: number;
  featured?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  bio: string;
  specialties: string[];
  avatarUrl: string;
  instagram: string;
}

export interface AppointmentCustomer {
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
  promoCode?: string;
}

export interface Appointment {
  id: string;
  bookingCode: string;
  serviceId: string;
  serviceName: string;
  barberId: string;
  barberName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  endTime: string; // HH:mm
  customer: AppointmentCustomer;
  price: number;
  originalPrice: number;
  discountAmount: number;
  durationMinutes: number;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}
