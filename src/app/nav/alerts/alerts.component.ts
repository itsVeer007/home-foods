import { Component, ViewChild } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { HeaderComponent } from '../../header/header.component';
import { SubHeaderComponent } from '../sub-header/sub-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatError } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CommonModule,  } from '@angular/common';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [
    SubHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MatOption,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {
[x: string]: any;

  constructor(
    private config: ConfigService,
    private storageSrvc: StorageService
  ) {}


  ngOnInit() {
    this.incidentList()
    console.log(this.storageSrvc.getType(2))
  }

  getType(type: any) {
    return this.storageSrvc.getType(type)[0].metadata
  }

  newIncidentListData: any;
  incidentListData:any 
  incidentList(item?:any) {
    this.config.incidentList(item).subscribe({
      next:(res:any)=> {
        console.log(res);
        if(res.statusCode == 200) {
          this.incidentListData = res.IncidentList;
          this.newIncidentListData = this.incidentListData

        }
      } 
    })
  }


 commonsUrl: string = 'http://usstaging.ivisecurity.com:8080/common/downloadFile_1_0?requestName=incidents&assetName='
  currentItem:any
  openVideoData(item:any) {
    console.log(item)
    this.currentItem = item
    this.currentItem.fullFileUrls = this.currentItem.files.map((file: string) => `${this.commonsUrl}${file}`);

    // Display the dialog
    var x = <HTMLElement>document.getElementById('playModel');
    x.style.display = "block";
  }

  closeDialog() {
    const dialogElement = document.getElementById('playModel') as HTMLElement;
    dialogElement.style.display = 'none';
  }


}