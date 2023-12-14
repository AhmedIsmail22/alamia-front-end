// import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./employees.css";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";
import Swal from "sweetalert2";
import ErrorMessages from "../../messages/errors/errorMessages";

export default function Disbursements(){
    const{http, logout, imgPath} = AuthUser();

    const {setAlertMsg} = ErrorMessages();

    const navigation = useNavigate();
    const [noData,setNoData] = useState(false);
    const [employees,setEmployees] = useState([]);
    const [searchName,setSearchName] = useState('');
    const [loading,setLoading] = useState(false);
    const [loadingSave,setLoadingSave] = useState(false);
    const [loadingBtn,setLoadingBtn] = useState(false);
    const [permission,setPermission] = useState(true);
    const [addAward,setAddAward] = useState(false);
    const [addDeduction,setAddDeduction] = useState(false);
    const [amount,setAmount] = useState();
    const [details,setDetails] = useState();
    const [employee,setEmployee] = useState();
    const [employeeId,setEmployeeId] = useState();
    const [employeeSalary,setEmployeeSalary] = useState();
    const [error,setError] = useState(false);

    useEffect(() => {
        document.title = "العالمية | صرف مرتبات الموظفين ";
        setLoading(true);
        fetchEmployees();
    },[])
    const searchInEmployees = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchEmployees();
    }
    const handleButtonClick = async(event, id, salary) => {
        setLoadingSave(true);
        event.preventDefault();
        const formData = new FormData();
        formData.append("employee_id", id);
        formData.append("amount", salary);
        await http.post("employees/disbursements", formData).then(({data}) => {
            if (data.data){
                setLoadingSave(false);
                setAmount();
                setDetails();
                setAddAward(false)
            setAddDeduction(false)
                setLoadingBtn(false)
                Swal.fire(
                    'تم',
                    'تمت العملية بنجاح',
                    'success'
                );
                fetchEmployees();
            }
            else if(data.error){
                setLoadingSave(false);   
                setAlertMsg('',data.msg,"error")
            } 
        }).catch(({response}) => {
            setLoadingSave(false);
            setLoadingBtn(false)
            if(response.status === 401){
                logout();
            }
            Swal.fire(
                'خطأ',
                'حدثت مشكلة',
                'error'
            )
        })
    }
    const saveAwardDeduction = async(e) => {
        setLoadingBtn(true)
        e.preventDefault();
        if(!amount || !employee || !employee.id){
            setError(true);
            setLoadingBtn(false)
        }else {
            const formData = new FormData();
            formData.append("employee_id", employee.id);
            formData.append("amount", amount);
            formData.append("details", details);
            addAward ? formData.append("type", "award") : formData.append("type", "deduction");

            await http.post(addAward?"employees/award":"employees/deduction", formData).then(({data}) => {
                if (data.data){
                    setAmount();
                    setDetails();
                    setAddAward(false)
                setAddDeduction(false)
                    setLoadingBtn(false)
                    Swal.fire(
                        'تم',
                        'تمت العملية بنجاح',
                        'success'
                    )
                }
            }).catch(({response}) => {
                setLoadingBtn(false)
                if(response.status === 401){
                    logout();
                }
                Swal.fire(
                    'خطأ',
                    'حدثت مشكلة',
                    'error'
                )
            })
        }

        setError(false)
    }
    const fetchEmployees = async () => {
        await http.get("employees?searchName="+searchName).then(({data}) => {

            if(data.data){
                
                setLoading(false);
                setEmployees(data.data);
                if(data.data.length === 0){
                setNoData(true);
            }else{
                setLoading(false);
                    setNoData(false);
                }
            }else{
                console.log(data.message);
                if(data.message === "Unauthorized"){
                    logout();
                }
                setLoading(false);
                setNoData(true);
            }
        }).catch(({response}) => {
            if(response.status === 401){
                logout();
            }if(response.status === 405 && !response.data.permission){
                console.log(response.data.permission);
                setLoading(false);
                setPermission(false)
            }
            setLoading(false);
            setNoData(true);
        })
    }

    return (
        <>
        {permission ?
        <>
            {/* <div className='page-title'>
                <h1>كل الموظفين</h1>
            </div> */}
            <div className="row px-3">
                <div className='routes d-flex align-items-center'>
            <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/employees/employee">كل الموظفين</Link>
            </div>
                <div className="col-10">
                </div>
                <button onClick={() => navigation('../employees/employee')} className="col-lg-2 col-md-3 col-sm-4 btn btn-success">أضافة موظف</button>
            </div>
                <div class="table-responsive p-3 mt-4" style={{background:"#fff"}}>
            <form onSubmit={searchInEmployees} className="row justify-content-center">
                <div className="col-8">
                    <input type="text" className="form-control" placeholder=" أبحث بأسم الموظف"
                    value={searchName}
                    onChange={(e) => {setSearchName(e.target.value)}}
                    />
                </div>
                <div className="col-4">
                    <button type ="submit" className="btn btn-success mb-3"> بحث </button>
                </div>
            </form>
            {
                !loading?
                !noData ?
                <table class="table table-bordered table-hover text-center">
                <thead >
                    <tr>
                    <th className="text-danger"  scope="col">#</th>
                    <th className="text-danger"  scope="col"><ion-icon name="image-outline"></ion-icon></th>
                    <th  className="text-danger" scope="col">أسم الموظف</th>
                    <th className="text-danger"  scope="col">  نوع الوظيفة</th>
                    <th className="text-danger"  scope="col"> مرتب هذ الشهر </th>
                    <th className="text-danger"  scope="col">أجراءات</th>
                    </tr>
                </thead>
                <tbody>
                {
                    employees.map((employee,index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td><img src={imgPath+employee.img} width={20} height={20} className="img-cycle"/></td>
                                <td>{employee.name}</td>
                                <td>{employee.job_type}</td>
                                <td>{employee.month_salary}</td>
                                {employee.disbursements_status ?
                                <td className="">
                                    <button onClick={(e) => handleButtonClick(e, employee.id, employee.month_salary)} className="btn btn-primary">صرف المرتب</button></td>
                                :<td className="">
                                <button onClick={(e) => handleButtonClick(e, employee.id, employee.month_salary)} className="btn btn-danger" disabled>تم صرف المرتب</button></td>
                            }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            :
            <div className="alert alert-danger col-12 text-center mt-5">لايوجد موظفين</div>
            :<>
            <div className="loading"></div>
            <p className="loading-icon"><LoaderIcon color={"orange"} size={120} /></p>
        </>
        }
        </div>
        </>
        :<div className="pt-5 mt-5">
        <h1 className="mt-5 text-light bg-danger py-4 px-2">
            تنبيه : غير مسموح لك الدخول هنا
        </h1>
    </div>
}

    {
        (addAward || addDeduction) &&<div className="model">
            {
                addAward && <form className="award-deduction-model" onSubmit={saveAwardDeduction}>
                {
                    error && <div className="errors">
                    <h5>يجب أدخال كل المعلومات</h5>
                </div>
                }
                 <h4 className="text-success">صرف مكافأة</h4>
            <div className='close' onClick={(e) => {setAddAward(false);setAddDeduction(false);setEmployee();setAmount();setDetails();}}><ion-icon name="close-outline"></ion-icon></div>
                <div className="col-12 my-3">
                    <label className="form-label"> أسم الموظف</label>
                    <input type="text" value={employee?.name} className="form-control" readOnly required/>
                </div>
                <div className="col-12 my-3">
                    <label className="form-label">فيمة المكافئة</label>
                    <input type="number" placeholder="أدخل قيمة المكافئة" className="form-control" required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="col-12 my-3">
                    <label className="form-label"> تفاصيل</label>
                    <textarea className="form-control" placeholder="أدخل تفاصيل المكافئة"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    ></textarea>
                </div>
                <div className="col-12 my-3">
                    <button className="btn btn-success col-12">صرف المكافأة
                    {loadingBtn && <span><LoaderIcon color={"white"} type={"spokes"} size={20} style={{marginRight:"10px"}}/></span>}
                    </button>
                </div>
            </form>
            }

{
                addDeduction && <form className="award-deduction-model" onSubmit={saveAwardDeduction}>
                {
                    error && <div className="errors">
                    <h5>يجب أدخال كل المعلومات</h5>
                </div>
                }
                <h4 className="text-danger"> خصم من المرتب</h4>
            <div className='close' onClick={(e) => {setAddAward(false);setAddDeduction(false);setEmployee();setAmount();setDetails();}}><ion-icon name="close-outline"></ion-icon></div>
                <div className="col-12 my-3">
                    <label className="form-label"> أسم الموظف</label>
                    <input type="text" value={employee?.name} className="form-control" readOnly required/>
                </div>
                
                <div className="col-12 my-3">
                    <label className="form-label">فيمة الخصم</label>
                    <input type="number" placeholder="أدخل قيمة الخصم" className="form-control" required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="col-12 my-3">
                    <label className="form-label"> تفاصيل</label>
                    <textarea className="form-control" placeholder="أدخل تفاصيل الخصم"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    ></textarea>
                </div>
                <div className="col-12 my-3">
                    <button className="btn btn-danger col-12"> خصم من المرتب
                    {loadingBtn && <span><LoaderIcon color={"white"} type={"spokes"} size={20} style={{marginRight:"10px"}}/></span>}
                    </button>
                </div>
            </form>
            }
        </div>
    }

    {
        loadingSave && <div className="loading-page">
            <p className="loading-icon"><LoaderIcon color={"orange"} size={120} /></p>
        </div>
    }
        </>
    )
}