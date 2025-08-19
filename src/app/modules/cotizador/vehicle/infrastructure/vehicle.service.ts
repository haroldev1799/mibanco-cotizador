import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { VehicleRepository } from '../domain/repository/vehicle.repository';
import { URL_BACKEND } from '@core/config/url';
import { HttpBaseResponse } from '@shared/types/response-http.type';
import { Vehicle, VehicleListResponse } from '../domain/dto/vehicle.dto';
import { storageGet, storageRegister } from '@shared/services/local-storage.service';
import { StorageValueKey } from '@core/enums/storage.enum';
import { v4 as uuidv4 } from 'uuid';

export class VehicleRepositoryService extends VehicleRepository {
	private readonly http = inject(HttpClient);
	protected VehicleUrl = `${URL_BACKEND}/Vehicle`;

    list(): Observable<VehicleListResponse> {
		// return this.http.get<UserListResponse>(`${this.userUrl}/${uuid}/subUser${endpoint}`);
        const data = storageGet(StorageValueKey.QUOTE_STORE) ?? [];
        return of({
            status: 200,
            success: true,
            message: '',
            data: data
        });
	}

    create(data: Vehicle): Observable<HttpBaseResponse> {
        console.log(data, ' data')
        const dataDB: Vehicle[] = storageGet(StorageValueKey.QUOTE_STORE) ?? [];
        data.id = uuidv4();
        dataDB.push(data);
        storageRegister(StorageValueKey.QUOTE_STORE, dataDB);
        return of({
            status: 200,
            success: true,
            message: '',
        });
    }

    getVehicules(): Observable<VehicleListResponse> {
		// return this.http.get<UserListResponse>(`${this.userUrl}/${uuid}/subUser${endpoint}`);
        const data = storageGet(StorageValueKey.VEHICLE_STORE) ?? [];
        return of({
            status: 200,
            success: true,
            message: '',
            data: data
        });
	}

}
