import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { HousingLocation } from '../housinglocation'
import { HousingService } from '../housing.service'
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  housingLocation: HousingLocation | undefined
  housingLocationId: number = -1
  housingService: HousingService = inject(HousingService)

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })
  constructor() {
    this.housingLocationId = parseInt(this.route.snapshot.params['id'], 10)
    this.housingService.getHousingLocationById(
      this.housingLocationId
    ).then(housingLocation=>this.housingLocation=housingLocation)
  }

  submitApplication(): void {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }
}
