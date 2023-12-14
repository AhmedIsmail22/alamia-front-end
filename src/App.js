import * as React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router, Routes,Route,Link, useNavigate} from 'react-router-dom';
import Client from './components/clients/Client.component';
import AllClients from './components/clients/AllClients.component';
import ClientInvoices from './components/clients/AllClientsInvoices.component';
import AllItems from './components/items/AllItems.component';
import AddItem from './components/items/AddItem.component';
import AddInvoice from './components/invoices/AddInvoice.component';
import InvoicePayments from './components/payments/InvoicePayments.component';
import Sidebar from './components/Sidebar/Sidebar';
import { useState } from 'react';
import AllInvoices from './components/invoices/AllInvoices.component';
import AddPayment from './components/payments/AddPayment.component';
import AllBanks from './components/banks/AllBanks.component';
import AllPayment from './components/payments/AllPayment.component';
import Home from './components/home/home.component';
import ClientDetails from './components/clients/ClientDetails.component';
import ImportItems from './components/items/importItems.component';
import AddBank from './components/banks/AddBank.component';
import AllSuppliers from './components/suppliers/AllSuppliers.component';
import Supplier from './components/suppliers/Supplier.component';
import SupplierAddItems from './components/suppliers/SupplierAddItems.component';
import SupplierDetails from './components/suppliers/SupplierDetails.component';
// import Login from './components/authentication/Login';
import AuthUser from './components/authentication/AuthUser';
import Guest from './navbar/guest';
import Auth from './navbar/auth';
import Sales from './components/reports/Sales.component';
import Expenses from './components/reports/Expenses.component';
import PaymentDetails from './components/payments/PaymentDetails.component';
import Test from './components/test/Test.component';
import Expends from './components/expends/allExpends.component';
import AddExpend from './components/expends/addExpends.component';
import Employees from './components/employees/allEmployees.component';
import AddEmployee from './components/employees/addEmployee.component';
import EmployeeDetails from './components/employees/EmployeeDetails.component';
import Paids from './components/expends/allPaids.component';
import Disbursements from './components/employees/disbursements.component';
import Logo from './images/logo.jpg';
import Footer from './components/footer/footer.component';
import Error from './messages/errors/error.component';
import Transactions from './components/transactions/transactions.component';
import AllChecks from './components/checks/AllChecks.component';
// import { socket } from './index';
export const data = {
  "data10":"anything",
  "data11":"anything",
}
function App() {
  
    const {getToken} = AuthUser();
    const [toggle, setToggle] = useState(false);
    // const navigate = useNavigate();
    if(!getToken()){
      return (
        <Guest />
        )
    }
    return (
      
      // <Router>
            <div className='App'>
      {/* <Routes>
        <Route path='*' element={<Error />}/>
      </Routes> */}
             
              <div className="header">
            <h3 className='com-name'> 
            <img className='logo' src={Logo} alt="logo" />العالمية
            </h3>
            <div className='main-header'>
              <Auth />
            </div>
        </div>
            <div className='responsive-header'>
            <h1> <img className='logo' src={Logo} alt="logo" />العالمية</h1>
                <div className='d-flex justify-content-around'>
                <ion-icon className="text-light" name="menu-outline" onClick={(e) => setToggle(!toggle)}></ion-icon>
                <span className='px-1'></span>
                <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                </div>
            </div>

            <div className={toggle?"sidebar":"small-sidebar"}><Sidebar /></div>
            
                    
            <div className="main">
            <Routes>
                  
            <Route path='*' element={<Error />}/>

            
                  {/* Home */}
                  <Route path='/' element={<Home/>} />
    
    
                  {/* /Login */}
                  {/* <Route path='/login' element={<Login/>} /> */}
    
    
                  {/* clients */}
                  <Route path='clients/client' element={<Client/>} />
                  <Route path='clients/all-clients' element={<AllClients/>} />
                  <Route path="clients/invoices/:id" element={<ClientInvoices/>} />
                  <Route path="clients/details/:id" element={<ClientDetails/>} />



    
    
    
                  {/* suppliers */}
                  <Route path='suppliers/supplier' element={<Supplier/>} />
                  <Route path='suppliers/all-suppliers' element={<AllSuppliers/>} />
                  <Route path="suppliers/add/item/:id" element={<SupplierAddItems/>} />
                  <Route path="suppliers/details/:id" element={<SupplierDetails/>} />
    
    
                  {/* items */}
                  <Route path='items/all-items' element={<AllItems/>} />
                  <Route path='items/item' element={<AddItem/>} />
                  <Route path='clients/import/item/:id' element={<ImportItems/>} />
    
                  <Route path='test' element={<Test/>} />
    
                  {/* invoices */}
                  <Route path='invoices/invoice/:id' element={<AddInvoice/>} />
                  <Route path='invoices/all-invoices' element={<AllInvoices/>} />
    
                  {/* payments */}
                  <Route path='invoice/payments/:id' element={<InvoicePayments/>} />
                  <Route path='payments/payment/:type' element={<AddPayment/>} />
                  <Route path='payments/all-payments' element={<AllPayment/>} />
                  <Route path='payments/details/:id' element={<PaymentDetails/>} />
    
    
                  {/* Banks */}
                  <Route path='banks/all-banks' element={<AllBanks/>} />
                  <Route path='banks/bank' element={<AddBank/>} />
    
    
                  {/* expends */}
                  <Route path='expends/all-expends' element={<Expends/>} />
                  <Route path='expends/expend' element={<AddExpend/>} />
                  <Route path='paids/all-paids' element={<Paids/>} />


                  {/* employees */}
                  <Route path='employees/all-employees' element={<Employees/>} />
                  <Route path='employees/employee' element={<AddEmployee/>} />
                  <Route path='employees/employee/:id' element={<EmployeeDetails/>} />
                  <Route path='employees/disbursements' element={<Disbursements/>} />


                {/* Reports */}
                <Route path='transactions' element={<Transactions/>} />




                  {/* Reports */}
                  <Route path='reports/sales' element={<Sales/>} />
                  <Route path='reports/expenses' element={<Expenses/>} />



                  {/* Checks */}
                  <Route path='checks/cashed' element={<AllChecks/>} />
            </Routes>
            </div>


            <Footer />
            </div>
          // </Router>
            );
    
}

export default App;
