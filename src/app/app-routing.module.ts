import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'cotizador', pathMatch: 'full' },
  {
		path: 'cotizador',
		loadChildren: () => import('./modules/cotizador/cotizador.routes').then((m) => m.routes),
	},
  { path: '**', redirectTo: 'cotizador' } // para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
