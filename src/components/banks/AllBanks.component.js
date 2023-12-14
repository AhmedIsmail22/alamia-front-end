import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthUser from "../authentication/AuthUser";
import LoaderIcon from "react-loader-icon";
import Swal from "sweetalert2";

export default function AllBanks(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";
    const {http, logout} = AuthUser();

    const navigation = useNavigate();


    const [noData,setNoData] = useState(false);
    const [banks,setBanks] = useState([]);
    // const [bankName,setBankName] = useState('');
    const [searchName,setSearchName] = useState('');
    const [loading,setLoading] = useState(false);
    const [bankName, setBankName] = useState('');
    const [bankQuantity, setBankQuantity] = useState(0);
    const [errors, setErrors] = useState([]);
    const [addItem, setAddItem] = useState(false);
    const [btnLoading,setBtnLoading] = useState(false);


    useEffect(() => {
        document.title = "العالمية | حسابات البنوك والخزنة";
    })
    const addBank = (e) => {
        e.preventDefault();
        setAddItem(true);
      }
    const saveBank = async(e) => {
        e.preventDefault();
        
        setBtnLoading(true);
        const formData = new FormData();
        formData.append("name", bankName);
        formData.append("balance", bankQuantity);
        await http.post("banks/add", formData).then(({data}) => {
            setErrors([]);
            if(data.data){
                Swal.fire('حسنا', 'لقد تم اضافة البنك بنجاح', 'success')
                setBtnLoading(false);
                setBankName('');
                setBankQuantity(0);
                setErrors([]);
                setAddItem(false);
            }
        }).catch(({response}) => {
            if(response.status === 401){
                logout();
            }
            if(response.data.errors){
                setErrors(response.data.errors);
                setBtnLoading(false);
                // setAddItem(false);
            }else{
                Swal.fire('خطأ', 'للأسف حدثت شئ خطأ أثناء تخزين البيانات حاول مرة أخرى', 'error')
                setBtnLoading(false);
                // setAddItem(false);

            }
        })
    }

    useEffect(() => {
        setLoading(true);
        fetchBanks();
    },[]);

    const searchInBanks = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchBanks();
    }

    const goToDetails = (id) => {
        navigation(`../banks/bank/${id}`);
    }

    const fetchBanks = async () => {
        await http.get( "banks").then(({data}) => {
            if(data.data){
                setLoading(false);
                setBanks(data.data);
                // setBankName(data.data.bank_name)
                if(data.data.length === 0){
                setNoData(true);
            }else{
                setLoading(false);
                    setNoData(false);
                }
            }else{
                setLoading(false);
                setNoData(true);
            }
        }).catch(({response}) => {

            if(response.status === 401){
                logout();
            }
            setLoading(false);
            setNoData(true);
        })
    }

    return(
        <>
            {/* <div className='page-title'>
                <h1>كل البنوك</h1>
            </div> */}
            <div className="row px-3">
                <div className='routes d-flex align-items-center'>
            <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/banks/bank">كل البنوك</Link>
            </div>
                <div className="col-10">
                </div>
                <button onClick={(e) => setAddItem(true)} className="col-lg-2 col-md-3 col-sm-4 btn btn-success">أضافة بنك</button>
            </div>
            <div class="table-responsive p-3 mt-4" style={{background:"#fff"}}>
            <form onSubmit={searchInBanks} className="row justify-content-center">
                <div className="col-8">
                    <input type="text" className="form-control" placeholder=" أبحث  باسم البنك"
                    value={searchName}
                    onChange={(e) => {setSearchName(e.target.value)}}
                    />
                </div>
                <div className="col-4">
                    <button type ="submit" className="btn btn-primary mb-3"> بحث </button>
                </div>
            </form>
            {
                !noData ?
            <table class="table table-bordered table-hover text-center">
                <thead>
                    <tr>
                    <th className="text-danger"  scope="col" >#</th>
                    {/* <th className="text-danger"  scope="col"> رقم الحساب</th> */}
                    <th className="text-danger"  scope="col"> أسم البنك </th>
                    <th className="text-danger"  scope="col" >قيمة الحساب</th>
                    {/* <th className="text-danger"  scope="col" >   قيمة السحب</th>
                    <th className="text-danger"   scope="col"> قيمة الأيداع</th> */}
                    <th className="text-danger"  scope="col">التفاصيل</th>
                    </tr>
                </thead>
                <tbody>
                {
                    banks.map((bank,index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                {/* <td> {bank.code} </td> */}
                                <td>{bank.name}</td>
                                <td>{bank.balance}</td>
                                {/* <td>{bank.delayed}</td>
                                <td>{bank.created_at.split("T")[0]}</td> */}
                                <td className="">
                                <button onClick={() => goToDetails(bank.id)} className="btn btn-primary"> التفاصيل </button>
                                <span className="m-2"></span>
                                {/* <button onClick={() => navigation(`../bank/add/payment/${bank.id}`)} className="btn btn-success "> أضافة دفع </button> */}
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            :
            <div className="alert alert-danger col-12 text-center mt-5">لايوجد بنوك</div>
            }
            {loading && <p className="loading-icon"><LoaderIcon color={"orange"} size={120} /></p>}
            </div>



            {addItem && <div className="abs-body">
            <form onSubmit={saveBank} className="px-3 pt-5">
                <h2 className="pb-2">أضافة حساب</h2>
                <div className='close' onClick={(e) => setAddItem(false)}><ion-icon name="close-outline"></ion-icon></div>
                <div className='col-12 my-1 px-3'>
                        <label  className="form-label">أسم البنك</label>
                        <input className="form-control my-2" type="text" placeholder="أدخل اسم البنك" 
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        />
                        {errors.name && <p className="text-danger">{errors.name[0]}</p>}
                </div>
                <div className='col-12 my-1 px-3'>
                        <label  className="form-label">قيمة الحساب</label>
                        <input className="form-control my-2" type="number" placeholder="أدخل الكمية" 
                        value={bankQuantity}
                        onChange={(e) => setBankQuantity(e.target.value)}
                        />
                        {errors.quantity && <p className="text-danger">{errors.quantity[0]}</p>}
                </div>
                        <div className="col-12 my-1 px-3">
                            <button type ="submit" className="btn btn-primary mb-3 d-flex align-items-center w-100 justify-content-center mt-5" disabled={btnLoading}>
                                <span>حفظ البيانات </span>  
                                {btnLoading && <span><LoaderIcon color={"white"} type={"spokes"} size={20} style={{marginRight:"10px"}}/></span>}
                            </button>
                        </div>

                    </form>
            </div>}
        </>
    )
}