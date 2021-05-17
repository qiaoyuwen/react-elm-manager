export interface ShopActivity {
  id: number;
  name: string;
  iconName: string;
  iconColor: string;
  description: string;
  rankingWeight: number;
}

export interface ShopDeliveryMode {
  id: number;
  text: string;
  color: string;
  isSolid: string;
}

export interface ShopCategory {
  id: number;
  name: string;
  imageUrl: string;
  level: number;
  count: number;
  parent: string;
}

export interface ShopIdentification {
  id: number;
  companyName: string;
  identificateAgency: string;
  identificateDate: string;
  legalPerson: string;
  licensesDate: string;
  licensesNumber: string;
  licensesScope: string;
  operationPeriod: string;
  registeredAddress: string;
  registeredNumber: string;
}

export interface ShopSupport {
  id: number;
  name: string;
  iconName: string;
  iconColor: string;
  description: string;
}

export interface Shop {
  id: number;
  address: string;
  description: string;
  orderLeadTime: string;
  distance: string;
  location: string;
  floatDeliveryFee: number;
  floatMinimumOrderAmount: number;
  activities: ShopActivity[];
  deliveryMode: ShopDeliveryMode;
  categories: ShopCategory[];
  identification: ShopIdentification;
  imagePath: string;
  isPremium: boolean;
  isNew: boolean;
  latitude: number;
  longitude: number;
  businessLicenseImage: string;
  cateringServiceLicenseImage: string;
  name: string;
  openingHours: string;
  phone: string;
  piecewiseAgentFee: string;
  promotionInfo: string;
  rating: number;
  ratingCount: number;
  recentOrderNum: number;
  status: number;
  supports: ShopSupport[];
}
