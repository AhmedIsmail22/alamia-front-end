import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./suppliers.css";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";



export default function AllSuppliers(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";

    const {http, logout} = AuthUser();

    const navigation = useNavigate();
    const [noData,setNoData] = useState(false);
    const [suppliers,setSuppliers] = useState([]);
    const [searchName,setSearchName] = useState('');
    const [loading,setLoading] = useState(false);
    // const [page,setPage] = useState(1);

    useEffect(() => {
        document.title = "العالمية | كل الموردين ";
        setLoading(true);
        fetchSuppliers();
    },[])
    const searchInSuppliers = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchSuppliers();
    }

    const addInvoice = (id, name) => {
        // navigation(-1);
        navigation(`../invoices/invoice/${id}`, { replace: true });
    }

    const goToInvoices = (id) => {
        navigation(`../suppliers/details/${id}`);
    }
    const fetchSuppliers = async () => {
        await http.get("suppliers?searchName="+searchName).then(({data}) => {
            if(data.data){
                setLoading(false);
                setSuppliers(data.data);
                // console.log(clients);
                // console.log(data.data);
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

    return (
        <>
        
        {/* <div className='page-title'>
                <h1>كل الموردين</h1>
            </div> */}
            <div className="row px-3">
                <div className='routes d-flex align-items-center'>
            <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/suppliers/supplier">كل الموردين</Link>
            </div>
                <div className="col-10">
                </div>
                <button onClick={() => navigation('../suppliers/supplier')} className="col-lg-2 col-md-3 col-sm-4 btn btn-success">أضافة مورد</button>
            </div>
                <div class="table-responsive p-3 mt-4" style={{background:"#fff"}}>
                        <form onSubmit={searchInSuppliers} className="row justify-content-center w-100">
                        <div className="col-8">
                            <input type="text" className="form-control" placeholder=" أبحث بأسم المورد"
                            value={searchName}
                            onChange={(e) => {setSearchName(e.target.value)}}
                            />
                        </div>
                        <div className="col-4">
                            <button type ="submit" className="btn btn-success mb-3"> بحث </button>
                        </div>
                    </form>
            {
                !loading ? 
                !noData ?
                    <>
                <table class="table table-bordered table-hover text-center">
                <thead >
                    <tr>
                    <th className="text-danger" scope="col">#</th>
                    <th className="text-danger" scope="col">أسم المورد</th>
                    <th className="text-danger" scope="col">أجمالى حساب المورد</th>
                    <th className="text-danger" scope="col">المبلغ المدفوع حتى الان</th>
                    <th className="text-danger" scope="col">المبلغ المتبقى حتى الان</th>
                    <th className="text-danger" scope="col">الفواتير</th>
                    </tr>
                </thead>
                <tbody>
                {
                    suppliers.map((supplier,index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{supplier.name}</td>
                                <td className="text-primary">{supplier.total}</td>
                                <td className="text-success">{supplier.paid}</td>
                                <td className="text-danger">{supplier.delayed}</td>
                                <td className="">
                                <button onClick={() => goToInvoices(supplier.id)} className="btn btn-primary "> المزيد </button>
                                {/* <span className="mx-1"></span>
                                <button onClick={() => addInvoice(client.id, client.name)} className="btn btn-success "> أضافة فاتورة </button> */}
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
                    </>
            :
            <div className="alert alert-danger col-12 text-center mt-5">لايوجد موردين</div>
            :
            <>
                <div className="loading"></div>
                <p className="loading-icon"><LoaderIcon color={"orange"} size={120} /></p>
            </>
            }
            </div>

        
        </>
    )   
}