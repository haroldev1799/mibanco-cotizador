import { Observable } from 'rxjs';

import { HttpBaseResponse } from '@shared/types/response-http.type';
import { Vehicle, VehicleListResponse } from '../dto/vehicle.dto';

export abstract class VehicleRepository {
	abstract list(): Observable<VehicleListResponse>;

	abstract create(data: Vehicle): Observable<HttpBaseResponse>;

	abstract getVehicules(): Observable<VehicleListResponse>;
}
