import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { EmployeeService } from "src/app/core/services/employee.service";
import { BranchService } from "src/app/core/services/branch.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-create-or-update-employee",
  templateUrl: "./create-or-update-employee.component.html",
  styleUrls: ["./create-or-update-employee.component.scss"],
})
export class CreateOrUpdateEmployeeComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  employeeId: number | null = null;

  breadCrumbItems: Array<{}>;
  employeeForm: FormGroup;
  branches: any[] = [];
  users: any[] = [];
  positions = ["Pharmacist", "Cashier", "Manager", "Technician"];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private branchService: BranchService,
    private userService: UserService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Dashboard" },
      {
        label: this.isEditMode ? "Update Employee" : "Create Employee",
        active: true,
      },
    ];

    this.employeeForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      name: ["", Validators.required],
      branchId: ["", Validators.required],
      position: ["", Validators.required],
      salary: ["", [Validators.required, Validators.min(0)]],
      hireDate: ["", Validators.required],
    });

    this.loadBranches();
    // this.loadUsers();

    this.route.paramMap.subscribe((params) => {
      this.employeeId = Number(params.get("id"));
      if (this.employeeId) {
        this.isEditMode = true;
        this.loadEmployee();
      }
    });
  }

  loadBranches() {
    this.branchService.getAll().subscribe({
      next: (branches) => {
        this.branches = branches;
      },
      error: () => {
        this.toastr.error("Error loading branches");
      },
    });
  }

  // loadUsers() {
  //   this.userService.getAllUsers().subscribe({
  //     next: (users) => {
  //       this.users = users;
  //     },
  //     error: () => {
  //       this.toastr.error("Error loading users");
  //     },
  //   });
  // }

  loadEmployee() {
    this.employeeService.getById(this.employeeId!).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          username: employee.username,
          email: employee.email,
          name: employee.name,
          phoneNumber: employee.phoneNumber,
          userId: employee.userId,
          branchId: employee.branchId,
          position: employee.position,
          salary: employee.salary,
          hireDate: new Date(employee.hireDate).toISOString().split("T")[0],
        });
      },
      error: () => {
        this.toastr.error("Error loading employee");
      },
    });
  }

  onSubmit(): void {
    Object.values(this.employeeForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.employeeForm.invalid) return;

    const formData = this.employeeForm.value;
    formData.hireDate = new Date(formData.hireDate);

    if (this.isEditMode && this.employeeId) {
      this.employeeService.update(this.employeeId, formData).subscribe({
        next: () => {
          this.toastr.success("Employee updated successfully!", "Success");
          this.router.navigate(["/employees/list"]);
        },
        error: () => {
          this.toastr.error("Error updating employee!", "Error");
        },
      });
    } else {
      this.employeeService.create(formData).subscribe({
        next: () => {
          this.toastr.success("Employee created successfully!", "Success");
          this.router.navigate(["/employees/list"]);
          this.employeeForm.reset();
        },
        error: () => {
          this.toastr.error("Error creating employee!", "Error");
        },
      });
    }
  }
}
