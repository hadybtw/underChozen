export interface DiscountCode {
  code: string;
  percent: number;  // e.g. 10, 20
  description: string;
  active: boolean;
}

const codes: DiscountCode[] = [
  { code: "REFER10", percent: 10, description: "Referral discount", active: true },
  { code: "WELCOME20", percent: 20, description: "Welcome discount", active: true },
  { code: "LAUNCH15", percent: 15, description: "Launch discount", active: true },
];

export function validateDiscount(code: string): DiscountCode | null {
  const found = codes.find(c => c.code === code.toUpperCase().trim() && c.active);
  return found || null;
}

export function applyDiscount(price: number, code: DiscountCode): number {
  return Math.round(price * (1 - code.percent / 100));
}
