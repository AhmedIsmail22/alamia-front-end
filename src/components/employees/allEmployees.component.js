// import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./employees.css";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";
import Swal from "sweetalert2";

export default function Employees(){
    const{http, logout, imgPath} = AuthUser();

    const navigation = useNavigate();
    const [noData,setNoData] = useState(false);
    const [employees,setEmployees] = useState([]);
    const [searchName,setSearchName] = useState('');
    const [loading,setLoading] = useState(false);
    const [loadingBtn,setLoadingBtn] = useState(false);
    const [permission,setPermission] = useState(true);
    const [addAward,setAddAward] = useState(false);
    const [addAdvance,setAddAdvance] = useState(false);
    const [addDeduction,setAddDeduction] = useState(false);
    const [amount,setAmount] = useState();
    const [details,setDetails] = useState();
    const [employee,setEmployee] = useState();
    const [error,setError] = useState(false);

    useEffect(() => {
        document.title = "العالمية | كل الموظفين";
        setAddAward(false);
        setAddAdvance(false);
        setAddDeduction(false);
        setLoading(true);
        fetchEmployees();
    },[])
    const searchInEmployees = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchEmployees();
    }

    const setAction = (e,action,emp) => {
        e.preventDefault();
        setAddAward(false);
        setAddAdvance(false);
        setAddDeduction(false);
        setEmployee(emp)
        if(action == 1){
            navigation(`/employees/employee/${emp.id}`)
        }else if(action == 2){
            setAddAward(true);
        }else if(action == 3){
            setAddDeduction(true);
        }else if(action == 4){
            setAddAdvance(true);
        }
        console.log("======>", action,"//////////",emp.id)
    }
    const saveAwardDeductionAdvance = async(e) => {
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

            await http.post(addAward?"employees/award":
            addDeduction?"employees/deduction":"employees/advance", formData).then(({data}) => {
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
                    {/* <th className="text-danger"  scope="col"> صرف مكافأة</th>
                    <th className="text-danger"  scope="col"> خصم من المرتب </th> */}
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
                                <td className="">
                                    <select className="form-select" value={0} onChange={(e) => setAction(e,e.target.value,employee)}>
                                        <option value="0">أجراءات</option>
                                        <option value="1">عرض</option>
                                        <option value="2">مكافأة</option>
                                        <option value="3">خصم</option>
                                        <option value="4">سلفة</option>
                                    </select>
                                </td>
                                {/* <button onClick={(e) => {setAddDeduction(false); setAddAward(true); setEmployee(employee)}} className="btn btn-success "> صرف مكافئة </button></td>
                                <td className="">
                                <button onClick={(e) => {setAddDeduction(true); setAddAward(false); setEmployee(employee)}} className="btn btn-danger "> خصم من المرتب </button></td>
                                <td className="">
                                <button onClick={() => navigation(`/employees/employee/${employee.id}`)} className="btn btn-primary "> تفاصيل </button></td> */}
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
        (addAward || addDeduction || addAdvance)  &&<div className="model">
            {
                addAward && <form className="award-deduction-advance-model" onSubmit={saveAwardDeductionAdvance}>
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
                addDeduction && <form className="award-deduction-advance-model" onSubmit={saveAwardDeductionAdvance}>
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

            {
                addAdvance && <form className="award-deduction-advance-model" onSubmit={saveAwardDeductionAdvance}>
                {
                    error && <div className="errors">
                    <h5>يجب أدخال كل المعلومات</h5>
                </div>
                }
                <h4 className="text-primary">سلفة لموظف</h4>
            <div className='close' onClick={(e) => {setAddAward(false);setAddDeduction(false);setAddAdvance(false);setEmployee();setAmount();setDetails();}}><ion-icon name="close-outline"></ion-icon></div>
                <div className="col-12 my-3">
                    <label className="form-label"> أسم الموظف</label>
                    <input type="text" value={employee?.name} className="form-control" readOnly required/>
                </div>
                
                <div className="col-12 my-3">
                    <label className="form-label">فيمة السلفة</label>
                    <input type="number" placeholder="أدخل قيمة السلفة" className="form-control" required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="col-12 my-3">
                    <label className="form-label"> تفاصيل</label>
                    <textarea className="form-control" placeholder="أدخل تفاصيل السلفة"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    ></textarea>
                </div>
                <div className="col-12 my-3">
                    <button className="btn btn-primary col-12">   صرف سلفة
                    {loadingBtn && <span><LoaderIcon color={"white"} type={"spokes"} size={20} style={{marginRight:"10px"}}/></span>}
                    </button>
                </div>
            </form>
            }
        </div>
    }
        </>
    )
}