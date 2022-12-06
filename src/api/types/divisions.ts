export interface DivisionCreateRequest {
  address: string;
  halls_count: number;
}

export interface DivisionUpdateRequest {
  address: string;
  halls_count: number;
}

export interface DivisionResponse {
  id: number;
  address: string;
  halls_count: number;
}

export type DivisionsListResponse = DivisionResponse[];
