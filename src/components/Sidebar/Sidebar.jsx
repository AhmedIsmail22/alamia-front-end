import React, { useState } from 'react'
import './Sidebar.css';
import Logo  from '../../images/favicon.png';
import { Link } from 'react-router-dom';
import AddPayment from '../payments/AddPayment.component';
const Sidebar = () => {

    const [clientsMenu, setClientsMenu] = useState(false);
    const [suppliersMenu, setSuppliersMenu] = useState(false);
    const [invoicesMenu, setInvoicesMenu] = useState(false);
    const [paymentsMenu, setPaymentsMenu] = useState(false);
    const [storeMenu, setStoreMenu] = useState(false);
    const [banksMenu, setBanksMenu] = useState(false);
    const [walletMenu, setWalletMenu] = useState(false);
    const [reports, setReports] = useState(false);
    const [payment, setPayment] = useState(false);
    const [expendsMenu, setExpendsMenu] = useState(false);
    const [employeesMenu, setEmployeesMenu] = useState(false);
    // const [toggle, setToggle] = useState(false);


    

    const resetSideBar = (e) => {
        e.preventDefault();
        setClientsMenu(false);
        setInvoicesMenu(false);
        setPaymentsMenu(false);
    }
  return (
    <>
             <div className='parentMenuItem pt-4'>
                <div className='menuItem'>
                        <div>
                        <ion-icon name="home-outline"></ion-icon>
                        </div>
                    <Link to="../" className='link d-flex justify-content-between w-100 align-items-center'>
                                    <span>الصفحة الرئيسية</span>
                    </Link>
                </div>
            </div>

                {/* ============================================================================= */}

            <div className='parentMenuItem'>
                <div className='menuItem'>
                        <div>
                        <ion-icon name="settings-outline"></ion-icon>
                        </div>
                    <Link to="../settings" className='link d-flex justify-content-between w-100 align-items-center'>
                                    <span>الأعدادات</span>
                    </Link>
                </div>
            </div>
        <hr className='text-light'></hr>




             {/* Menu */}
             <div className='menu'>
                {/* ============================================================================= */}

             <div className='parentMenuItem'>
                <div className='menuItem'>
                        <div to="clients/client">
                        <ion-icon name="person-add-outline"></ion-icon>
                        </div>
                    <div onClick={() => setClientsMenu(!clientsMenu)} className='item d-flex justify-content-between w-100 align-items-center'>
                                    <span>العملاء</span>
                            
                            {
                                clientsMenu ? 
                                    <ion-icon name="caret-down-outline"></ion-icon>
                                :
                                    <ion-icon name="caret-forward-outline"></ion-icon>
                               
                            }
                    </div>
                </div>
                    {
                        clientsMenu  && <div className='menuList'>
                        <div className='menuItem'>
                            <span></span>
                            <Link to="clients/all-clients" className='link'>
                                    <span> كل العملاء</span>
                            </Link>
                        </div>
                        <div className='menuItem'>
                            <span></span>
                            <Link to="clients/client" className='link'>
                                    <span> أضافة عميل</span>
                            </Link>
                        </div>

                        <div className='menuItem'>
                            <span></span>
                            <Link to="clients/import/item/0" className='link'>
                                    <span>  أسترداد معدة</span>
                            </Link>
                        </div>

                        <div className='menuItem'>
                            <span></span>
                            <Link to="invoices/invoice/0" className='link'>
                                    <span>   انشاء فاتورة للعميل</span>
                            </Link>
                        </div>


                        <div className='menuItem'>
                            <span></span>
                            <Link to="payments/payment/import" className='link'>
                                    <span>تحصيل دفعة من العميل</span>
                            </Link>
                        </div>
                    
                    </div>
                    }
                </div>


                {/* ============================================================================= */}

                <div className='parentMenuItem'>
                                <div className='menuItem'>
                                        <div to="suppliers/supplier">
                                        <ion-icon name="person-add-outline"></ion-icon>
                                        </div>
                                    <div onClick={() => setSuppliersMenu(!suppliersMenu)} className='item d-flex justify-content-between w-100 align-items-center'>
                                                    <span>الموردين</span>
                                            
                                            {
                                                suppliersMenu ? 
                                                    <ion-icon name="caret-down-outline"></ion-icon>
                                                :
                                                    <ion-icon name="caret-forward-outline"></ion-icon>
                                            
                                            }
                                    </div>
                                </div>
                                    {
                                        suppliersMenu  && <div className='menuList'>
                                        <div className='menuItem'>
                                            <span></span>
                                            <Link to="suppliers/all-suppliers" className='link'>
                                                    <span> كل الموردين</span>
                                            </Link>
                                        </div>
                                        <div className='menuItem'>
                                            <span></span>
                                            <Link to="suppliers/supplier" className='link'>
                                                    <span> أضافة مورد</span>
                                            </Link>
                                        </div>

                                        <div className='menuItem'>
                                            <span></span>
                                            <Link to="suppliers/add/item/0" className='link'>
                                                    <span>  شراء معدة</span>
                                            </Link>
                                        </div>

                                        {/* <div className='menuItem'>
                                            <span></span>
                                            <Link to="invoices/invoice/0" className='link'>
                                                    <span>   انشاء فاتورة للمورد</span>
                                            </Link>
                                        </div> */}
                                        <div className='menuItem'>
                                            <span></span>
                                            <Link to="payments/payment/export" className='link'>
                                                    <span>تسديد دفعة  للمورد</span>
                                            </Link>
                                        </div>
                                    
                                    </div>
                                    }
                                </div>


                {/* ===================================================== */}

                <div className='parentMenuItem'>
                    <div className='menuItem'>
                            <div to="clients/client">
                            <ion-icon name="cash-outline"></ion-icon>
                            </div>
                        <div onClick={() => setPaymentsMenu(!paymentsMenu)} className='item d-flex justify-content-between w-100 align-items-center'>
                                        <span>المدفوعات</span>
                                
                                {
                                    paymentsMenu ? 
                                        <ion-icon name="caret-down-outline"></ion-icon>
                                    :
                                        <ion-icon name="caret-forward-outline"></ion-icon>
                                
                                }
                        </div>
                    </div>
                        {
                            paymentsMenu  && <div className='menuList'>
                            <div className='menuItem'>
                                <span></span>
                                <Link to="payments/all-payments" className='link'>
                                        <span> كافة المدفوعات</span>
                                </Link>
                            </div>
                            <div className='menuItem'>
                                <span></span>
                                <Link  to="payments/payment/import" className='link'>
                                        <span >تحصيل دفعة من العميل</span>
                                </Link >
                            </div>
                            <div className='menuItem'>
                                <span></span>
                                <Link  to="payments/payment/export" className='link'>
                                        <span >تسديد دفعة للمورد</span>
                                </Link >
                            </div>
                        
                        </div>
                        }
                 </div>

                        {/* ===================================================== */}

                {/* <div className='parentMenuItem'>
                    <div className='menuItem'>
                            <div to="clients/client">
                            <ion-icon name="list-outline"></ion-icon>
                            </div>
                        <div onClick={() => setInvoicesMenu(!invoicesMenu)} className='item d-flex justify-content-between w-100 align-items-center'>
                                        <span>الفواتير</span>
                                
                                {
                                    invoicesMenu ? 
                                        <ion-icon name="caret-down-outline"></ion-icon>
                                    :
                                        <ion-icon name="caret-forward-outline"></ion-icon>
                                
                                }
                        </div>
                    </div>
                        {
                            invoicesMenu  && <div className='menuList'>
                            <div className='menuItem'>
                                <span></span>
                                <Link to="invoices/all-invoices" className='link'>
                                        <span> كافة الفواتير</span>
                                </Link>
                            </div>
                            <div className='menuItem'>
                                <span></span>
                                <Link to="invoices/invoice/0" className='link'>
                                        <span> أضافة فاتورة</span>
                                </Link>
                            </div>
                        
                        </div>
                        }
                 </div> */}






                 

 {/* ===================================================== */}

 <div className='parentMenuItem'>
                    <div className='menuItem'>
                            <div to="clients/client">
                            <ion-icon name="cash-outline"></ion-icon>
                            </div>
                        <div onClick={() => setBanksMenu(!banksMenu)} className='item d-flex justify-content-between w-100 align-items-center'>
                                        <span>البنوك و الخزنة</span>
                                
                                {
                                    banksMenu ? 
                                        <ion-icon name="caret-down-outline"></ion-icon>
                                    :
                                        <ion-icon name="caret-forward-outline"></ion-icon>
                                
                                }
                        </div>
                    </div>
                        {
                            banksMenu  && <div className='menuList'>
                            <div className='menuItem'>
                                <span></span>
                                <Link to="banks/all-banks" className='link'>
                                        <span> حسابات البنوك و الخزنة</span>
                                </Link>
                            </div>
                            {/* <div className='menuItem'>
                                <span></span>
                                <Link to="banks/bank" className='link'>
                                        <span> أضافة بنك</span>
                                </Link>
                            </div> */}
                        
                        </div>
                        }
                 </div>

                {/* ===================================================== */}

                <div className='parentMenuItem'>
                                    <div className='menuItem'>
                                            <div to="clients/client">
                                            <ion-icon name="cash-outline"></ion-icon>
                                            </div>
                                        <div onClick={() => setStoreMenu(!storeMenu)} className='item d-flex justify-content-between w-100 align-items-center'>
                                                        <span>المخزن</span>
                                                
                                                {
                                                    storeMenu ? 
                                                        <ion-icon name="caret-down-outline"></ion-icon>
                                                    :
                                                        <ion-icon name="caret-forward-outline"></ion-icon>
                                                
                                                }
                                        </div>
                                    </div>
                                        {
                                            storeMenu  && <div className='menuList'>
                                            <div className='menuItem'>
                                                <span></span>
                                                <Link to="items/all-items" className='link'>
                                                        <span> كافة الاصناف</span>
                                                </Link>
                                            </div>
                                            <div className='menuItem'>
                                                <span></span>
                                                <Link  to="suppliers/add/item/0" className='link'>
                                                        <span > أضافة صنف</span>
                                                </Link >
                                                
                                            </div>
                                        
                                        </div>
                                        }
                                </div>



                       

{/* ===================================================== */}

<div className='parentMenuItem'>
                    <div className='menuItem'>
                            <div to="clients/client">
                            <ion-icon name="list-outline"></ion-icon>
                            </div>
                        <div onClick={() => setExpendsMenu(!expendsMenu)} className='item d-flex justify-content-between w-100 align-items-center'>
                                        <span>ايرادات أخرى</span>
                                
                                {
                                    expendsMenu ? 
                                        <ion-icon name="caret-down-outline"></ion-icon>
                                    :
                                        <ion-icon name="caret-forward-outline"></ion-icon>
                                
                                }
                        </div>
                    </div>
                        {
                            expendsMenu  && <div className='menuList'>
                            <div className='menuItem'>
                                <span></span>
                                <Link to="expends/all-expends" className='link'>
                                        <span> كافة الأيرادات</span>
                                </Link>
                            </div>

                            {/* <div className='menuItem'>
                                <span></span>
                                <Link to="paids/all-paids" className='link'>
                                        <span> كافة المصروفات</span>
                                </Link>
                            </div> */}
                            <div className='menuItem'>
                                <span></span>
                                <Link to="expends/expend" className='link'>
                                        <span> أضافة بند</span>
                                </Link>
                            </div>
                        
                        </div>
                        }
                 </div>
                 {/* ===================================================== */}

                {/* <div className='parentMenuItem'>
                    <div className='menuItem'>
                            <div to="clients/client">
                            <ion-icon name="cash-outline"></ion-icon>
                            </div>
                        <div onClick={() => setWalletMenu(!walletMenu)} className='item d-flex justify-content-between w-100 align-items-center'>
                                        <span>الخزنة</span>
                                
                                {
                                    walletMenu ? 
                                        <ion-icon name="caret-down-outline"></ion-icon>
                                    :
                                        <ion-icon name="caret-forward-outline"></ion-icon>
                                
                                }
                        </div>
                    </div>
                        {
                            walletMenu  && <div className='menuList'>
                            <div className='menuItem'>
                                <span></span>
                                <Link to="store/store" className='link'>
                                        <span>اجمالى الموجود بالخزنة</span>
                                </Link>
                            </div>
                            <div className='menuItem'>
                                <span></span>
                                <Link to="store/store-details" className='link'>
                                        <span>تفاصيل</span>
                                </Link>
                            </div>
                        
                        </div>
                        }
                 </div> */}


{/* ===================================================== */}

<div className='parentMenuItem'>
                    <div className='menuItem'>
                            <div to="clients/client">
                            <ion-icon name="list-outline"></ion-icon>
                            </div>
                        <div onClick={() => setEmployeesMenu(!employeesMenu)} className='item d-flex justify-content-between w-100 align-items-center'>
                                        <span> ادارة الموظفين</span>
                                
                                {
                                    employeesMenu ? 
                                        <ion-icon name="caret-down-outline"></ion-icon>
                                    :
                                        <ion-icon name="caret-forward-outline"></ion-icon>
                                
                                }
                        </div>
                    </div>
                        {
                            employeesMenu  && <div className='menuList'>
                            <div className='menuItem'>
                                <span></span>
                                <Link to="employees/all-employees" className='link'>
                                        <span> كافة الموظفين</span>
                                </Link>
                            </div><div className='menuItem'>
                                <span></span>
                                <Link to="employees/employee" className='link'>
                                        <span> أضافة موظف</span>
                                </Link>
                            </div>
                            <div className='menuItem'>
                                <span></span>
                                <Link to="employees/disbursements" className='link'>
                                        <span> صرف مرتبات الموظفين </span>
                                </Link>
                            </div>

                        
                        </div>
                        }
                 </div>

                 {/* ===================================================== */}
{/* <div className='parentMenuItem'>
                    <div className='menuItem'>
                            <div to="clients/client">
                            <ion-icon name="cash-outline"></ion-icon>
                            </div>
                        <div onClick={() => setReports(!reports)} className='item d-flex justify-content-between w-100 align-items-center'>
                                        <span>تقارير</span>

                                {
                                    reports ? 
                                        <ion-icon name="caret-down-outline"></ion-icon>
                                    :
                                        <ion-icon name="caret-forward-outline"></ion-icon>
                                
                                }
                        </div>
                    </div>
                        {
                            reports  && <div className='menuList'>
                            <div className='menuItem'>
                                <span></span>
                                <Link to="reports/sales" className='link'>
                                        <span>المبيعات</span>
                                </Link>
                            </div>
                            <div className='menuItem'>
                                <span></span>
                                <Link to="reports/expenses" className='link'>
                                        <span>المصروفات</span>
                                </Link>
                            </div>
                        
                        </div>
                        }
                 </div> */}
</div>
        
    </>
  )
}

export default Sidebar
 