import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { ViewAdvertisementComponent } from '../view-advertisement/view-advertisement.component';
import { ConfigService } from '../../../services/config.service';
import { StorageService } from '../../../services/storage.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreateNewRuleComponent } from '../create-new-rule/create-new-rule.component';
import { MatSelectModule } from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';

import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SearchPipe } from "../../../pipes/search.pipe";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NewRuleComponent } from '../new-rule/new-rule.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { formatDate } from '@angular/common';
import { AlertService } from '../../../services/alert.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-link-add-rule-device',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCardModule,
    ViewAdvertisementComponent,
    CreateNewRuleComponent,
    MatDialogModule,
    MatSelectModule,
    MatSliderModule,
    MatDatepickerModule,
    MatCheckboxModule,
    SearchPipe,
    MatButtonToggleModule,
    NewRuleComponent,
    MatTooltipModule,
    CommonModule
],
  templateUrl:'./link-add-rule-device.component.html',
  styleUrl:'./link-add-rule-device.component.css'
})
export class LinkAddRuleDeviceComponent {

  constructor(
    private configSrvc: ConfigService,
    private storageSer: StorageService,
    private dialog : MatDialog,
    private alertSer: AlertService,
  ) {}

  // @Input() dataFromAds: any;
  @Input() currentAdd: any;
  @Input() currentSite: any;
  @Output() newItemEvent = new EventEmitter<any>()

  deviceSearch!: string;
  ruleSearch!: string;
  currentDate = new Date();

  // searchSite:any
  // searchSites(event: any) {
  //   this.searchSite = (event.target as HTMLInputElement).value;
  // }

  searchDevice:any
  searchDevices(event: any) {
    this.searchDevice = (event.target as HTMLInputElement).value;
  }

  fontStyleControl = new FormControl('');
  fontStyle?: string;


 

  personshow : boolean = false;
  deviceCam: any = 0;
  


  objectRule:any 
  person:any = 1;
 

  

  modifiedWorkingDays: any;
  ngOnInit() {
    this.listDeviceRules()

  //   this.addAssetForm = this.fb.group({
  //     adId : new FormControl(''),
  //     adHours: new FormControl('true'),
  //     workingDays: new FormControl('true'),
  //     temp: new FormControl(''),
  //     objectRule: new FormControl(''),
  //     cameraId: new FormControl(''),
  //     modelObjectTypeId: new FormControl(''),
  //     objectCount: new FormControl(''),
  //     createdBy: new FormControl(''),

  //     tempFrom: new FormControl(''),
  //     tempTo: new FormControl(''),
      
  //     deviceCam: new FormControl('')
  // });
  }

  ngAfterViewInit(): void {
  }

  getType(type: any) {
    return this.storageSer.getType(type)[0].metadata;
  }

  newRulesData:any = [];

  weekdayays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  listDeviceRules() {
    this.configSrvc.listDeviceRules({siteId: this.currentSite?.siteId, adId: this.currentAdd?.adId}).subscribe({
      next:(res: any) => {
        // console.log(res);
        this.devicesData = res.sites.flatMap((item:any) => item.Devices);
        this.rulesData = this.devicesData.flatMap((item:any) => item.rules);

        this.newRulesData = this.rulesData;
        this.openRuleFormFor(this.currentDevice ? this.currentDevice : this.devicesData[0]);

        this.newRulesData.forEach((el: any) => {
          el.workingDays = el.workingDays.split(',').map((el: any) => +el);
        });
      }
    })
  }

  RuleForm:boolean = false;

createRuleForm() {
  this.RuleForm = true;
}
closereateRuleForm() {
  this.RuleForm = false;
}


  currentRuleData:any
  rulesData:any = [];
  devicesData:any = [];
  // getDevicesAndRulesData() {
  //   this.devicesData = this.dataFromAds.sites[0].flatMap((item:any) => item.Devices)
  //   console.log(this.devicesData)

  //   this.rulesData = this.devicesData.flatMap((item:any) => item.rules)
  // }

  closeForm() {
    this.newItemEvent.emit();
  }

  // checked = false;
  disabled = false;

  viewAddForm:boolean = false;

  currentItem: any;
  openViewAddForm(data: any) {
    // console.log(data)
    this.viewAddForm = true;
    this.currentItem = data

  }
  
  closeViewForm() {
    this.viewAddForm = false;
  }
  
showRuleForm:boolean = false;

currentDevice: any
openRuleForm(item:any) {
  this.currentDevice = item
  this.showRuleForm = true;
}

openRuleFormNew() {
  this.showRuleForm = true;
}
closeRuleForm() {
  this.showRuleForm = false;
}

body:any = {
  fromDate:null,
  toDate:null,
  adId:null,
  ruleId:null,
  siteId:null,
  createdBy:1545,
  deviceId:null,
  objectRule:null
}



  @ViewChild('addNewRuleForm') addNewRuleForm = {} as TemplateRef<any>
  openRuleFormForAssociate(item:any)  {
    this.currentItem = item
    this.dialog.open(this.addNewRuleForm, {disableClose: true})
  }


deviceIndex!: number;
openRuleFormFor(data:any) {
  this.currentDevice = data;
  this.deviceIndex = this.devicesData.indexOf(this.currentDevice);

  this.newRulesData.map((item: any) => {
    if(item.deviceId == data.deviceId) {
      item.ruleAssociationStatus = 1;
    } else {
      item.ruleAssociationStatus = 0;
    }
  })
}

// selectedDeviceId: string | null = null; // Property to track the selected device

// openRuleFormFor(data: any) {
//   console.log('Selected data:', data);
//   this.selectedDeviceId = data.deviceId; // Set the selected device ID when the function is called
// }

// // Function to determine highlight color
// getHighlightColor(item: any): string {
//   return item.deviceId === this.selectedDeviceId ? 'lightblue' : 'transparent'; // Change 'lightgreen' to your desired color
// }



submit() {

  // if (!this.body.ruleId) {
  //   this.alertSer.error('Please select a rule before proceeding.');
  //   return; // Prevent submission if ruleId is not selected
  // }
  this.body.fromDate = formatDate(this.body.fromDate , 'yyyy-MM-dd', 'en-us')
  this.body.toDate = formatDate( this.body.toDate, 'yyyy-MM-dd', 'en-us')
  this.body.adId = this.currentAdd.adId
  this.body.siteId = this.currentSite.siteId
  this.body.deviceId = this.currentItem.deviceId
  // this.body.ruleId = this.body.ruleId.toString()
  this.body.ruleId = this.currentItem.objectRule
  let obj = {...this.body, ...this.currentRuleData}
  delete obj.ruleId
  // delete obj.objectType
  delete obj.cameraName
  delete obj.cameraUrl
  delete obj.ruleAssociationStatus
  this.configSrvc.deviceAdRuleConn(obj).subscribe({
    next: (res:any) => {
      if(res?.statusCode == 200) {
        this.alertSer.success(res?.message)
      } else {
        this.alertSer.error(res?.message)
      }
      this.newItemEvent.emit()
      this.listDeviceRules()
    }
  })
}

// @ViewChild('openViewAdver') openViewAdver = {} as TemplateRef<any>
// openAdverForm()  {
//   this.dialog.open(this.openViewAdver)
// }

close() {
  this.listDeviceRules();
  this.newRulesData = 
  this.body.ruleId = null;
  this.body.fromDate = null;
  this.body.toDate = null;
}


deleteBody:any = {
  adId:null,
  ruleId:null,
  deviceId:null,
  createdBy:1545,
}

deleteRule() {
  this.deleteBody.adId = this.currentAdd.adId
  this.deleteBody.ruleId = this.currentSite.ruleId
  this.deleteBody.deviceId = this.currentItem.deviceId
  this.configSrvc.deleteRule(this.deleteBody).subscribe({
    next: (res:any) => {
      console.log(res)
    }
  })
}



}