// src/app/employees/list/list.component.ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Employee } from "src/app/core/models/employee.models";
import { EmployeeService } from "src/app/core/services/employee.service";

@Component({
  selector: "app-employee-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';

  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deletId: any;

  constructor(
    private employeeService: EmployeeService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Home" },
      { label: "Employees", active: true },
    ];

    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = [...this.employees];
      },
      error: (err) => {
        console.error("Failed to load employees", err);
        this.toastr.error("Failed to load employees");
      },
    });
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredEmployees = [...this.employees];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee =>
      (employee.userName && employee.userName.toLowerCase().includes(term)) ||
      (employee.position && employee.position.toLowerCase().includes(term)) ||
      (employee.branchName && employee.branchName.toLowerCase().includes(term))
    );
  }

  edit(id: number): void {
    this.router.navigate(["/employees/update", id]);
  }

  showDeleteModal(id: number): void {
    this.deletId = id;
    this.removeItemModal?.show();
  }

  delete(): void {
    this.employeeService.remove(this.deletId).subscribe({
      next: () => {
        this.toastr.success("Employee deleted successfully!", "Success");
        this.loadEmployees();
      },
      error: () => {
        this.toastr.error("Error deleting employee");
      },
    });
    this.removeItemModal?.hide();
  }
}
