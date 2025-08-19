import { Component, inject, OnInit } from '@angular/core';
import { VEHICLE_LIST_IMPORTS } from './vehicle-list-constants';
import { InputData } from '@shared/interfaces/input.dto';
import { ButtonData, ButtonType } from '@shared/interfaces/button.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '@shared/services/loader.service';
import { VehicleRepository } from '@modules/cotizador/vehicle/domain/repository/vehicle.repository';
import { Vehicle } from '@modules/cotizador/vehicle/domain/dto/vehicle.dto';
import { forkJoin } from 'rxjs';
import { IOptionSelect } from '@components/atoms/select/select.component.interface';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [...VEHICLE_LIST_IMPORTS],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent implements OnInit {

  private loaderService = inject(LoaderService);
  private vehiculeRepository = inject(VehicleRepository);
  
  searchInput: InputData = {
      label: 'Buscar factura',
      name: 'search',
      type: 'text',
      value: '',
      placeholder: 'Buscar factura',
      clear: true,
  }

  BUTTON_DATA: Record<'AGREGAR' | 'COTIZAR', ButtonData> = {
      AGREGAR: {
          text: 'Cotizar',
          type: ButtonType.DARK,
      },
      COTIZAR: {
          text: 'Cotizar',
          type: ButtonType.DARK,
      },
  }
    
  quotes: Vehicle[] = [];
  vehicles: Vehicle[] = [];
  showModalForm: boolean = false;

  formGroup!: FormGroup;
  img: string | null = null;

  optionsVehicle: IOptionSelect[] = [];

  ngOnInit(): void {
	  this.loaderService.requestLoaded(true);
    this.formGroup = new FormGroup({
        id: new FormControl(''),
        vehicle: new FormControl(''),
        year: new FormControl({value: '', disabled: true}, [Validators.required]),
        useType: new FormControl({value: '', disabled: true}, [Validators.required]),
        description: new FormControl({value: '', disabled: true}, [Validators.required]),
        edad: new FormControl(''),
        img: new FormControl(''),
        basePrice: new FormControl(''),
        primaTotal: new FormControl(''),
        brand: new FormControl(''),
        model: new FormControl(''),
    });
    this._init();
  }

  cotizar() {
    this.formGroup.reset();
    this.formGroup.markAsUntouched();
    this.img = null;
    this.showModalForm = true;
  }

  changeVehicle(vehicleId: string) {
    const vehicle = this.vehicles.find( s => s.id == vehicleId);
    this.formGroup.patchValue({
        id: vehicle?.id,
        year: vehicle?.year,
        useType: vehicle?.useType,
        description: vehicle?.description,
        img: vehicle?.img,
        basePrice: vehicle?.basePrice,
        brand: vehicle?.brand,
        model: vehicle?.model,
    });
    this.img = vehicle?.img ?? null;
  }

  saveCotizar() {
    this.loaderService.requestLoaded(true)
    this.formGroup.controls['primaTotal'].setValue(this._primaCalculate());
    this.vehiculeRepository.create(this.formGroup.getRawValue()).subscribe({
        next: () => {
          this._init();
          this.formGroup.reset();
          this.img = null;
          this.formGroup.markAsUntouched();
          this.showModalForm = false;
        },
        complete: () => this.loaderService.requestLoaded(false)
    });
  }

  private _primaCalculate(): number {
    const vehiculo = this.formGroup.getRawValue();
    console.log(vehiculo.basePrice, ' price')
    let primaBase: number = vehiculo.basePrice * 0.1;
    console.log(primaBase, ' primaBase') // prima inicial (puede variar según negocio)
    // Ajuste por antigüedad del vehículo
    const anioActual = new Date().getFullYear();
    const antiguedad = anioActual - Number(vehiculo.year);
    if (antiguedad > 10) {
      primaBase += 1000; // vehículos muy antiguos = +300
    } else if (antiguedad > 5) {
      primaBase += 500;
    }

    // Ajuste por edad del conductor
    if (vehiculo.edad < 25) {
      primaBase += 3500;
    } else if (vehiculo.edad > 60) {
      primaBase += 2000;
    }
    console.log(primaBase, ' primagenerada') // prima inicial (puede variar según negocio)
    return primaBase;
  }


  private _init() {
    //llamada simultanea
    forkJoin({
      vehicles: this.vehiculeRepository.getVehicules(),
      quotes: this.vehiculeRepository.list()
    }).subscribe(({ vehicles, quotes }) => {
      this.vehicles = [...vehicles.data];
      this.optionsVehicle = vehicles.data.map( s => ({
        name: s.brand + ' - ' + s.model,
        value: s.id 
      }));
      this.quotes = [...quotes.data];
    });
  }

}
