class EmployeePayrollData {

    get id(){
      return this._id;
    }

    set id(id) {
      this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw "Name is incorrect!";
    }
    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }
    get salary() {
        return this._salary;
    }
    set salary(salary) {
        let salaryRegex = RegExp('^[1-9]{1}[0-9]*$');
        if (salaryRegex.test(salary))
            this._salary = salary;
        else throw "Salary should be non zero positive number";
    }
    get gender() {
        return this._gender;
    }
    set gender(gender) {
        if (gender != undefined) {
            let genderRegex = RegExp('^(male|female)$');
            if (genderRegex.test(gender)) {
                this._gender = gender;
            } else {
                throw "Gender incorrect";
            }
        }
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        if (startDate != undefined) {
            if (startDate <= new Date()) {
                const options = { year: "numeric", month: "long", day: "numeric" };
                const employeeDate = startDate.toLocaleDateString("en-US", options);
                this._startDate = employeeDate;
            }
            else throw " Please select the valid date!";
        }
    }
    toString() {
        return " Name: " + this.name + " Salary: " + this.salary + " Gender: " + this.gender + " Start Date: " + this.startDate + "Department: " + this.department;
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      textError.textContent = "";
      return;
    }
    try {
      (new EmployeePayrollData()).name = name.value;
      textError.textContent = "";
    } catch (e) {
      textError.textContent = e;
    }
  });
});


const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});

const day = document.querySelector("#day");
const year = document.querySelector("#year");
const month = document.querySelector("#month");
const dateError = document.querySelector(".date-error");
[day, month, year].forEach((item) =>
  item.addEventListener("input", function () {
    if (month.value == 1) {
      if (isLeapYear(year.value)) {
        if (day.value > 29) {
          dateError.textContent = "Invalid Date!";
        } else dateError.textContent = "";
      } else {
        if (day.value > 28) {
          dateError.textContent = "Invalid Date!";
        } else dateError.textContent = "";
      }
    }
    if (
      month.value == 3 ||
      month.value == 5 ||
      month.value == 8 ||
      month.value == 10
    ) {
      if (day.value > 30) {
        dateError.textContent = "Invalid Date!";
      } else dateError.textContent = "";
    }
  })
);

function save() {
    try {
        var name = document.querySelector('#name').value;
        var salary = document.querySelector('#salary').value;
        var gender = document.querySelector('input[name=gender]:checked').value;
        var year = document.querySelector('#year').value;
        var month = document.querySelector('#month').value;
        var day = document.querySelector('#day').value;
        var startDate = new Date(year, month, day);
        let department = new Array();
        const departmentForm = document.getElementsByClassName("checkbox");
        for (let i = 0; i < departmentForm.length; i++) {
            if (departmentForm[i].checked)
                department.push(departmentForm[i].value);
        }
        var employee = new EmployeePayrollData(name, salary, gender, startDate, department);
        alert(employee);
    } catch (error) {
        alert(error);
    }
} 

const isLeapYear = (year) => {
    let result = false;
    if (year % 4 == 0) {
      if (year % 100 == 0) {
        if (year % 400 == 0) {
          result = true;
        }
      } else {
        result = true;
      }
    }
    return result;
  };