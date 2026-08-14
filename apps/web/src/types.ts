export interface PublicContact {
  email?: string;
  phone?: string;
  address?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface GroupData {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  description?: string;
  website?: string;
  hq_city?: string;
  hq_coordinates?: number[];
  public_contact?: PublicContact;
  social_links?: SocialLink[];
  activities?: string[];
  operating_areas?: string[];
  key_caves?: string[];
  key_activities?: string[];
  annual_highlights?: string[];
  contact_motivation?: string;
  area_relationships?: Array<{ area_id: string; relationship: string }>;
  verified_at: string | null;
  polygon_status: string;
  logo_url?: string;
  polygon?: {
    type: string;
    coordinates: number[][][];
  };
  priority_oblasti?: Array<{
    celok: string;
    uzemie: string;
    lokality: string[];
  }>;
}

export interface AdminCredentials {
  username: string;
  email: string;
  passwordHash?: string;
  passwordRaw?: string;
}

export interface AreaData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  aggregated_cave_count?: {
    value: number;
    estimated?: boolean;
  };
  polygon?: {
    type: string;
    coordinates: number[][][];
  };
  polygon_status: string;
  groups?: string[];
  region_category?: string;
  region_name?: string;
  major_caves?: string[];
}

export interface DataBundle {
  generated_at: string;
  areas_count: number;
  groups_count: number;
  areas: AreaData[];
  groups: GroupData[];
}
