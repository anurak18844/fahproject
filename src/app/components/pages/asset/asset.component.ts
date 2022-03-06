import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AssetService } from 'src/app/service/asset.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  assetForm!: FormGroup;

  assets: any;
  currentAssets: any;
  statusBtnupdate!: boolean;
  btnText = "เพิ่มข้อมูล"

  constructor(private service: AssetService, private router: Router) { }

  ngOnInit(): void {
    
    
    this.statusBtnupdate = false;
    this.service.getAssets().subscribe((res)=>{
      this.assets = res.data;
    });
  
    this.assetForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      acquired: new FormControl(),
      unit: new FormControl(),
      price: new FormControl(),
      age: new FormControl(),
      comment: new FormControl(),
      acknowledsedyear: new FormControl(),
      approvalyear: new FormControl(),
      removeyear: new FormControl(),
      dischargedyear: new FormControl(),
      reasonforselling: new FormControl(),
      status: new FormControl()
    })
  }

  deleteAsset(id: any){
    this.swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.service.deleteAssets(id).subscribe((res)=>{
          this.router.navigateByUrl('/', {skipLocationChange: true})
            .then(()=> this.router.navigate(['/asset']));
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
  btnEvent(){
    if(this.statusBtnupdate){
      let asset = {
        id: this.assetForm.value.id,
        name: this.assetForm.value.name,
        acquired: this.assetForm.value.acquired,
        unit: this.assetForm.value.unit,
        price: this.assetForm.value.price,
        age: this.assetForm.value.age,
        comment: this.assetForm.value.comment,
        acknowledsedyear: this.assetForm.value.acknowledsedyear,
        approvalyear: this.assetForm.value.approvalyear,
        removeyear: this.assetForm.value.removeyear,
        dischargedyear: this.assetForm.value.dischargedyear,
        reasonforselling: this.assetForm.value.reasonforselling,
        status: this.assetForm.value.status
      }

      this.service.updateAssets(this.currentAssets._id, asset).subscribe((res)=>{
        Swal.fire(
          'SUCCESS',
          'UPDATE DATA SUCCESS',
          'success'
        )
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/asset']));
        });
    }else{
      let asset = {
        id: this.assetForm.value.id,
        name: this.assetForm.value.name,
        acquired: this.assetForm.value.acquired,
        unit: this.assetForm.value.unit,
        price: this.assetForm.value.price,
        age: this.assetForm.value.age,
        comment: this.assetForm.value.comment,
        acknowledsedyear: this.assetForm.value.acknowledsedyear,
        approvalyear: this.assetForm.value.approvalyear,
        removeyear: this.assetForm.value.removeyear,
        dischargedyear: this.assetForm.value.dischargedyear,
        reasonforselling: this.assetForm.value.reasonforselling,
        status: this.assetForm.value.status
      }
      this.service.addAssets(asset).subscribe((res)=>{
        Swal.fire(
          'SUCCESS',
          'INSERT DATA SUCCESS',
          'success'
        )
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/asset']));
      });
    }
  }

  editAsset(id?: any){
    this.statusBtnupdate = true;
    this.btnText = "อัปเดตข้อมูล"

    this.service.getAssetsById(id).subscribe((res)=>{
      this.currentAssets = res.data;
      this.assetForm.controls['id'].setValue(this.currentAssets.id);
      this.assetForm.controls['name'].setValue(this.currentAssets.name);
      this.assetForm.controls['acquired'].setValue(this.currentAssets.acquired);
      this.assetForm.controls['unit'].setValue(this.currentAssets.unit);
      this.assetForm.controls['price'].setValue(this.currentAssets.price);
      this.assetForm.controls['age'].setValue(this.currentAssets.age);
      this.assetForm.controls['comment'].setValue(this.currentAssets.comment);
      this.assetForm.controls['acknowledsedyear'].setValue(this.currentAssets.acknowledsedyear);
      this.assetForm.controls['approvalyear'].setValue(this.currentAssets.approvalyear);
      this.assetForm.controls['removeyear'].setValue(this.currentAssets.removeyear);
      this.assetForm.controls['dischargedyear'].setValue(this.currentAssets.dischargedyear);
      this.assetForm.controls['reasonforselling'].setValue(this.currentAssets.reasonforselling);
      this.assetForm.controls['status'].setValue(this.currentAssets.status);
     });
  }
}
