import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	private isLoading = new BehaviorSubject<boolean>(false);
	isLoading$ = this.isLoading.asObservable();

	requestLoaded(status: boolean) {
		this.isLoading.next(status);
	}
}
