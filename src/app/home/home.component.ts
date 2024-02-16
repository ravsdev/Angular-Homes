import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HousingLocationComponent } from '../housing-location/housing-location.component'
import { HousingLocation } from '../housinglocation'
import { HousingService } from '../housing.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = []
  filteredLocationList: HousingLocation[] = []
  housingService: HousingService = inject(HousingService)

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[])=>{
      this.housingLocationList = housingLocationList
      this.filteredLocationList = housingLocationList
    }
    )
  }

  filterLocations(value: string){
    if(!value) this.filteredLocationList = this.housingLocationList
    this.filteredLocationList = this.housingLocationList.filter(el=>el.name.toLocaleLowerCase().includes(value.toLowerCase()))
  }

  getChange(value:string){
    console.log("change: ", value)
  }
}
