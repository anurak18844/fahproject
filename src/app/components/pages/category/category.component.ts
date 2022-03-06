import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  categoryForm!: FormGroup;

  categories: any;
  currentCategory: any;
  statusBtnupdate!: boolean;
  btnText = "เพิ่มข้อมูล"

  constructor(private service: CategoryService, private router: Router) { }

  ngOnInit(): void {
    
    this.statusBtnupdate = false;
    this.service.getCategories().subscribe((res)=>{
      this.categories = res.data;
    });
  
    this.categoryForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl()
    })
  }

  deleteCategory(id: any){
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
        this.service.deleteCategory(id).subscribe((res)=>{
          this.router.navigateByUrl('/', {skipLocationChange: true})
            .then(()=> this.router.navigate(['/category']));
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
      let category = {
        id: this.categoryForm.value.id,
        name: this.categoryForm.value.name
      }

      this.service.updateCategory(this.currentCategory._id, category).subscribe((res)=>{
        Swal.fire(
          'SUCCESS',
          'UPDATE DATA SUCCESS',
          'success'
        )
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/category']));
        });
    }else{
      let cateogy = {
        id: this.categoryForm.value.id,
        name: this.categoryForm.value.name
      }
      this.service.addCateogy(cateogy).subscribe((res)=>{
        Swal.fire(
          'SUCCESS',
          'INSERT DATA SUCCESS',
          'success'
        )
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(()=> this.router.navigate(['/category']));
      });
    }
  }

  editCategory(id?: any){
    this.statusBtnupdate = true;
    this.btnText = "อัปเดตข้อมูล"

    this.service.getCategoryById(id).subscribe((res)=>{
      console.log(res.data.name);
      this.currentCategory = res.data;
      this.categoryForm.controls['id'].setValue(this.currentCategory.id);
      this.categoryForm.controls['name'].setValue(this.currentCategory.name);
     });
  }
}
