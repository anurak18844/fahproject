import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { DepartmentService } from 'src/app/service/department.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  userForm!: FormGroup;

  users: any;
  categories: any;
  departments: any;
  currentUser: any;
  currentCategory: any;
  currentDepartment: any;
  statusBtnupdate!: boolean;
  btnText = "เพิ่มข้อมูล";


  constructor(private categoryService: CategoryService, private departmentService: DepartmentService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.statusBtnupdate = false;

    this.userService.getUsers().subscribe((res: any) => {
      this.users = res.data;
    });

    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });

    this.departmentService.getDepartMents().subscribe((res: any) => {
      this.departments = res.data;
    });

    this.userForm = new FormGroup({
      id: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      category: new FormControl(),
      department: new FormControl()
    });
  }

  deleteUser(id: any) {
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
        this.userService.deleteUser(id).subscribe((res) => {
          this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/user']));
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
      this.categoryService.getCategoryById(this.userForm.value.category).subscribe((res: any) => {
        this.currentCategory = res.data;

        this.departmentService.getDepartmentById(this.userForm.value.department).subscribe((res: any) => {
          this.currentDepartment = res.data;
          let user = {
            id: this.userForm.value.id,
            name: this.userForm.value.name,
            category: {
              _id: this.currentCategory._id,
              id: this.currentCategory.id,
              name: this.currentCategory.name
            },
            department: {
              _id: this.currentDepartment._id,
              id: this.currentDepartment.id,
              name: this.currentDepartment.name
            }
          }
          this.userService.updateUser(this.currentUser._id, user).subscribe((res) => {
            Swal.fire(
              'SUCCESS',
              'UPDATE DATA SUCCESS',
              'success'
            )
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.router.navigate(['/user']));
          });
        });
      });

    } else {
      this.categoryService.getCategoryById(this.userForm.value.category).subscribe((res: any) => {
        this.currentCategory = res.data;

        this.departmentService.getDepartmentById(this.userForm.value.department).subscribe((res: any) => {
          this.currentDepartment = res.data;

          let user = {
            id: this.userForm.value.id,
            name: this.userForm.value.name,
            password: this.userForm.value.password,
            category: {
              _id: this.currentCategory._id,
              id: this.currentCategory.id,
              name: this.currentCategory.name
            },
            department: {
              _id: this.currentDepartment._id,
              id: this.currentDepartment.id,
              name: this.currentDepartment.name
            }
          }

          console.log(user);

          this.userService.addUser(user).subscribe((res) => {
            Swal.fire(
              'SUCCESS',
              'INSERT DATA SUCCESS',
              'success'
            )
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.router.navigate(['/user']));
          });

        });

      });
    }
  }

  editUser(id: any) {
    this.statusBtnupdate = true;
    this.btnText = "อัปเดตข้อมูล"

    this.userService.getUserById(id).subscribe((res) => {
      this.currentUser = res.data;
      console.log(this.currentUser);
      this.categoryService.getCategoryById(this.currentUser.category._id).subscribe((res: any) => {
        this.currentCategory = res.data;
        console.log(this.currentCategory);

        this.departmentService.getDepartmentById(this.currentUser.department._id).subscribe((res: any) => {
          this.currentDepartment = res.data;
          console.log(this.currentDepartment);

          this.userForm.controls['id'].setValue(this.currentUser.id);
          this.userForm.controls['name'].setValue(this.currentUser.name);
          this.userForm.controls['category'].setValue(this.currentCategory._id);
          this.userForm.controls['department'].setValue(this.currentDepartment._id);
          this.userForm.controls['password'].disable();
        });


      });
    });
  }

}
