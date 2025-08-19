import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from '@shared/services/loader.service';
import { DialogModule } from 'primeng/dialog';

@Component({
	selector: 'app-modal-loader',
	standalone: true,
	imports: [DialogModule],
	templateUrl: './modal-loader.component.html',
	styleUrl: './modal-loader.component.sass',
})
export class ModalLoaderComponent implements OnInit {
	private loaderService = inject(LoaderService);
	isLoading = false;

	ngOnInit() {
		this.loaderService.isLoading$.subscribe((loading) => {
			this.isLoading = loading;
		});
	}
}
