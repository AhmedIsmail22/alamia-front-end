import { useState, useEffect } from "react"
import "./bank.css";
import axios from "axios";
import Swal from "sweetalert2";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";

export default function AddBank(){
    
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    const {http, logout} = AuthUser();


    const [bankName, setBankName] = useState('');
    const [bankQuantity, setBankQuantity] = useState(0);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "العالمية |أضافة حساب بنكى ";
    })

    const saveBank = async(e) => {
        e.preventDefault();

        setLoading(true);
        const formData = new FormData();
        formData.append("name", bankName);
        formData.append("balance", bankQuantity);
        await http.post("banks/add", formData).then(({data}) => {
            setErrors([]);
            if(data.data){
                Swal.fire('حسنا', 'لقد تم اضافة البنك بنجاح', 'success')
                setLoading(false);
                setBankName('');
                setBankQuantity(0);
                setErrors([]);
            }
        }).catch(({response}) => {
            if(response.status === 401){
                logout();
            }
            if(response.data.errors){
                setErrors(response.data.errors);
                setLoading(false);
            }else{
                Swal.fire('خطأ', 'للأسف حدثت شئ خطأ أثناء تخزين البيانات حاول مرة أخرى', 'error')
                setLoading(false);

            }
        })
    }

    return (
        <>
            <div className="container layout py-2">
                <h1 className='page-title'>أضافة بنك جديد</h1>
                <div className="bank">
                    <form onSubmit={saveBank} className="w-100 px-3">
                    <input className="form-control my-2" type="text" placeholder="أدخل اسم البنك" 
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        />
                        {errors.name && <p className="text-danger">{errors.name[0]}</p>}
                        <input className="form-control my-2" type="number" placeholder="أدخل الكمية" 
                        value={bankQuantity}
                        onChange={(e) => setBankQuantity(e.target.value)}
                        />
                        {errors.quantity && <p className="text-danger">{errors.quantity[0]}</p>}
                        
                        <div className="col-12">
                            <button type ="submit" className="btn btn-primary mb-3 d-flex align-items-center" disabled={loading}>
                                <span>حفظ البيانات </span>  
                                {loading && <span><LoaderIcon color={"white"} type={"spokes"} size={20} style={{marginRight:"10px"}}/></span>}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}