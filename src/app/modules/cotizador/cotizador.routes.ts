import { Routes } from '@angular/router';

export const routes: Routes = [
	{
        path: 'vehicle',
        loadChildren: () => import('./vehicle/vehicle.routes').then((m) => m.routes),
    },
    {
        path: '',
        redirectTo: 'vehicle',
        pathMatch: 'full',
    },
];
