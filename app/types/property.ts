export type PropertyStatus = "For sale" | "Sold" | "SSTC";

export type PropertyType =
  | "house"
  | "flat"
  | "detached"
  | "apartment"
  | "terraced house"
  | "town house"
  | "land"
  | "unspecified";

export type Tenure = "Freehold" | "Leasehold";

export interface PropertyAsset {
  image: string; 
  description: string | null;
  category_id: number | null;
}

export interface PropertyFloorplan {
  image: string; 
  description: string | null;
}

export interface PropertyLink {
  url: string;
  category_id: number;
  description: string;
}

export interface AgencyBranch {
  branch_name: string;
  url_label: string;
}

export interface Agency {
  branch: AgencyBranch;
  agency_name: string;
  agency_id: number;
  agency_logo: string;
  external_domain: string | null;
  url_label: string;
  resource_uri: string;
  member_subscription_level?: number; 
}

export interface Property {
  property_id: number;
  vox_number: string | null;
  administration_fee: number | null;
  investment_yield?: number;
  isSaved: boolean;
  property_type: PropertyType;
  age: number;
  furnishing: string | null;
  student: boolean | null;
  pets: boolean | null;
  smoking: boolean | null;
  shared: boolean | null;
  dss_considered: boolean | null;
  single_room_let: boolean | null;
  searchable_keyword: string;
  eir_current: number | null;
  eir_potential: number | null;
  eer_current: number | null;
  eer_potential: number | null;
  tenure: Tenure | null;
  primary_channel: "sales" | "lettings";
  contact_telephone: string | null;
  property_ref: string | null;
  assets: PropertyAsset[];
  floorplans: PropertyFloorplan[];
  links: PropertyLink[];
  lat: number;
  lng: number;
  bedrooms: number;
  bathrooms: number | null;
  reception_rooms: number | null;
  price: string; 
  price_value: number;
  pppw_price: number | null;
  currency_code: string | null;
  available_on: string | null;
  branch_id: number;
  photos: string[]; 
  new_home: boolean | null;
  tags: string[];
  acreage: number | null;
  square_feet: number | null;
  status: PropertyStatus;
  short_description: string;
  description: string | null;
  featured_short_description: string | null;
  featured: boolean;
  display_address: string;
  street_address: string | null;
  town: string | null;
  postcode: string;
  features: string[];
  comments: string | null;
  resource_uri: string;
  created_at: string;
  create_date: string; 
  hidden: boolean | null;
  international: boolean | null;
  associated_branch_ids: number[] | null;
  launched_date: string | null;
  exchanged_at: string | null;
  last_baked_at: string | null;
  location_id: number | null;
  location_name: string | null;
  location_county: string | null;
  agency: Agency;
}

export interface PropertySearch {
  saved: boolean;
  id: number | null;
  run_at: string; 
  query: string | null;
  portal_id: number;
  hidden: boolean;
  international: boolean;
  channel: string;
  min_price: string | null;
  max_price: string | null;
  meta_data: Record<string, unknown>;
  alert_frequency: string | null;
}

export interface PropertiesResult {
  properties: {
    has_next: boolean;
    elements: Property[];
  };
  search: PropertySearch;
  alternative_places: Record<string, unknown>;
  location: Record<string, unknown>;
  county: Record<string, unknown>;
  country: Record<string, unknown>;
}

export interface PropertiesResponse {
  error: string | null;
  result: PropertiesResult;
  response: {
    status: number;
    time_taken: number;
  };
}
export interface PropertySummary {
  property_id: number;
  display_address: string;
  price: string;
  photo: string | null; 
}
