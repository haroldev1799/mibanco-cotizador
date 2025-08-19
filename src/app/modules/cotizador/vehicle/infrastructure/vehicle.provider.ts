import { VehicleRepository } from "../domain/repository/vehicle.repository";
import { VehicleRepositoryService } from "./vehicle.service";

export const VehicleProvider = [
	{
		provide: VehicleRepository,
		useClass: VehicleRepositoryService,
	},
];
