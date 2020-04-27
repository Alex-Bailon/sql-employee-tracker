# sql-employee-tracker
 
## Description
Employee-tracker is a CLI that allows the user to be able to manage employees within a company. The app allows the user to be able to add/remove employees, departments and roles. The user can also edit employees manager or role. The user can view all employees by department or manager. In order for the app to work it uses the follow npm:
* mySQL (as a database to store data)
* Inquirer (to interface with user on terminal)
* console.table (to display data in a nice table)

## Installation/Usage
Please ensure to do the following before/when running code:
* Run `npm install`
* Make sure to run both `schema.sql` and `seeds.sql` files in mySQL Workbench
* To run code type `npm start`
* Ensure to setup departments first, Roles after that and lastly add employees.

Below is a demonstration how the code operates  
![employee tracker demonstration](./assets/sql-Employee-Tracker.gif)
## License
MIT License

Copyright (c) 2020 Alex Bailon

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.