export interface HallCreateRequest {
  division_id: number;
  name: string;
  seats_count: number;
}

export interface HallUpdateRequest {
  division_id: number;
  name: string;
  seats_count: number;
}

export interface HallResponse {
  id: number;
  division_id: number;
  division_address: string;
  name: string;
  seats_count: number;
}

export type HallsListResponse = HallResponse[];
