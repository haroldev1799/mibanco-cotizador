import { Routes } from '@angular/router';
import { ROUTE_NAMES_GNL } from '@core/enums/routes-gnl.enum';

export const routes: Routes = [
	{
		path: ROUTE_NAMES_GNL.LIST,
		loadComponent: () => import('./presentation/pages/vehicle-list/vehicle-list.component').then((m) => m.VehicleListComponent),
	},
	{
		path: ROUTE_NAMES_GNL.CREATE,
		loadComponent: () =>
			import('./presentation/pages/vehicle-create/vehicle-create.component').then((m) => m.VehicleCreateComponent),
	},
	{
		path: `${ROUTE_NAMES_GNL.UPDATE}/:id`,
		loadComponent: () =>
			import('./presentation/pages/vehicle-create/vehicle-create.component').then((m) => m.VehicleCreateComponent),
	},
	{
		path: '',
		redirectTo: ROUTE_NAMES_GNL.LIST,
		pathMatch: 'full',
	},
];
