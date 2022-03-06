import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DepartmentService } from 'src/app/service/department.service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  departmentForm!: FormGroup;

  departments: any;
  currentDepartment: any;
  statusBtnupdate!: boolean;
  btnText = "เพิ่มข้อมูล"

  constructor(private service: DepartmentService, private router: Router) { }

  ngOnInit(): void {

    this.statusBtnupdate = false;
    this.service.getDepartMents().subscribe((res) => {
      this.departments = res.data;
    });

    this.departmentForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl()
    })
  }

  deleteCategory(id: any) {
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
        this.service.deleteDepartment(id).subscribe((res) => {
          this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/department']));
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

  btnEvent() {
    if (this.statusBtnupdate) {
      let department = {
        id: this.departmentForm.value.id,
        name: this.departmentForm.value.name
      }

      this.service.updateDepartment(this.currentDepartment._id, department).subscribe((res) => {
        Swal.fire(
          'SUCCESS',
          'UPDATE DATA SUCCESS',
          'success'
        )
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['/department']));
      });
    } else {
      let department = {
        id: this.departmentForm.value.id,
        name: this.departmentForm.value.name
      }
      this.service.addDepartment(department).subscribe((res) => {
        Swal.fire(
          'SUCCESS',
          'INSERT DATA SUCCESS',
          'success'
        )
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['/department']));
      });
    }
  }

  editCategory(id?: any) {
    this.statusBtnupdate = true;
    this.btnText = "อัปเดตข้อมูล"

    this.service.getDepartmentById(id).subscribe((res) => {
      console.log(res.data.name);
      this.currentDepartment = res.data;
      this.departmentForm.controls['id'].setValue(this.currentDepartment.id);
      this.departmentForm.controls['name'].setValue(this.currentDepartment.name);
    });
  }

}
