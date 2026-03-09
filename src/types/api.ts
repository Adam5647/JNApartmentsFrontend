export type GuestDetailsPayload = {
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
};

export type BookingRequestPayload = {
  residenceType: string;
  rentalType: string;
  guests: number;
  checkIn: string; // ISO date string
  checkOut?: string;
  guest: GuestDetailsPayload;
  specialRequests?: string;
};

export type BookingResponse = {
  bookingId: string;
  createdAtUtc: string;
  updatedAtUtc: string;
  status: string;
  residenceType: string;
  rentalType: string;
  guests: number;
  checkIn: string;
  checkOut?: string;
  guest: GuestDetailsPayload;
  specialRequests?: string | null;
};

export type InquiryRequestPayload = {
  fullName: string;
  email: string;
  subject?: string;
  message: string;
};

export type InquiryResponse = {
  ticketId: string;
  receivedAtUtc: string;
  updatedAtUtc: string;
  status: string;
  fullName: string;
  email: string;
  subject?: string | null;
  message: string;
};

export type CustomerRegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type CustomerLoginPayload = {
  email: string;
  password: string;
};

export type CustomerAuthResponse = {
  customerId: string;
  fullName: string;
  email: string;
  token: string;
  expiresAtUtc: string;
};

export type CustomerBookingStatusPayload = {
  status: string;
};
