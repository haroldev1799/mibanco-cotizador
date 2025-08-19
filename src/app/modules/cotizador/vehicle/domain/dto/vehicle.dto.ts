import { HttpListResponse } from "@shared/types/response-http.type";

export interface Vehicle {
	id: string;
	brand: string;
	model: string;
	year: string;
	useType: string;
	basePrice: number;
	description: number;
	img: string;
	edad?: number;
	primaTotal?: number;
}

export type VehicleListResponse = HttpListResponse<Vehicle>;