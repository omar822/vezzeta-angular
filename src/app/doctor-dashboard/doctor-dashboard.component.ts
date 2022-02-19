import { ApiService } from '../shared/api.service'
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DoctorModel } from './doctor-dashboard.model';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  formValue !: FormGroup
  doctorModelObj : DoctorModel = new DoctorModel();
  doctorData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,
  private api :ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name : ['', Validators.required],
      specialization : ['', Validators.required],
      fees : ['', Validators.required],
      phoneNumber : ['', Validators.required],
    })
    this.getAllDoctor();
  }
  clickAddDoctor(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postDoctorDetails(){
    this.doctorModelObj.name = this.formValue.value.name;
    this.doctorModelObj.specialization = this.formValue.value.specialization;
    this.doctorModelObj.fees = this.formValue.value.fees;
    this.doctorModelObj.phoneNumber = this.formValue.value.phoneNumber;

    this.api.postDoctor(this.doctorModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Doctor Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllDoctor();
    },
    err=>{
      alert("Something Went Wrong")
    })

  }
  getAllDoctor(){
    this.api.getDoctor()
    .subscribe(res=>{
      this.doctorData = res;
    })
  }
  deleteDoctor(row : any){
    this.api.deleteDoctor(row.id)
    .subscribe(res=>{
      alert("Doctor Deleted");
      this.getAllDoctor();
    })
  }
  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.doctorModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['specialization'].setValue(row.specialization);
    this.formValue.controls['fees'].setValue(row.fees);
    this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
  }
  updateDoctorDetails(){
    this.doctorModelObj.name = this.formValue.value.name;
    this.doctorModelObj.specialization = this.formValue.value.specialization;
    this.doctorModelObj.fees = this.formValue.value.fees;
    this.doctorModelObj.phoneNumber = this.formValue.value.phoneNumber;

    this.api.updateDoctor(this.doctorModelObj,this.doctorModelObj.id)
    .subscribe(res=>{
      alert("updated successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllDoctor();
    })
  }
}
