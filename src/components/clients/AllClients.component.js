// import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./clients.css";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";



export default function AllClients(){
    const{http, logout} = AuthUser();

    const navigation = useNavigate();
    const [noData,setNoData] = useState(false);
    const [clients,setClients] = useState([]);
    const [searchName,setSearchName] = useState('');
    const [loading,setLoading] = useState(false);
    const [permission,setPermission] = useState(true);

    useEffect(() => {
        document.title = "العالمية | كل العملاء";
        setLoading(true);
        fetchClients();
    },[])
    const searchInClients = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchClients();
    }

    const addInvoice = (id, name) => {
        // navigation(-1);
        navigation(`../invoices/invoice/${id}`, { replace: true });
    }

    const goToInvoices = (id) => {
        navigation(`../clients/details/${id}`);
    }
    const fetchClients = async () => {
        await http.get("clients?searchName="+searchName).then(({data}) => {

            if(data.data){
                setLoading(false);
                setClients(data.data);
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
                <h1>كل العملاء</h1>
            </div> */}
            <div className="row px-3">
                <div className='routes d-flex align-items-center'>
            <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/clients/client">كل العملاء</Link>
            </div>
                <div className="col-10">
                </div>
                <button onClick={() => navigation('../clients/client')} className="col-lg-2 col-md-3 col-sm-4 btn btn-success">أضافة عميل</button>
            </div>
                <div class="table-responsive p-3 mt-4" style={{background:"#fff"}}>
            <form onSubmit={searchInClients} className="row justify-content-center">
                <div className="col-8">
                    <input type="text" className="form-control" placeholder=" أبحث بأسم العميل"
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
                    <th  className="text-danger" scope="col">أسم العميل</th>
                    <th className="text-danger"  scope="col">أجمالى حساب العميل</th>
                    <th className="text-danger"  scope="col">المبلغ المدفوع حتى الان</th>
                    <th className="text-danger"  scope="col">المبلغ المتبقى حتى الان</th>
                    <th className="text-danger"  scope="col">الفواتير</th>
                    </tr>
                </thead>
                <tbody>
                {
                    clients.map((client,index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{client.name}</td>
                                <td>{client.total}</td>
                                <td>{client.paid}</td>
                                <td>{client.delayed}</td>
                                <td className="">
                                <button onClick={() => goToInvoices(client.id)} className="btn btn-primary "> المزيد </button>
                                {/* <span className="mx-1"></span>
                                <button onClick={() => addInvoice(client.id, client.name)} className="btn btn-success "> أضافة فاتورة </button> */}
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            :
            <div className="alert alert-danger col-12 text-center mt-5">لايوجد عملاء</div>
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
        </>
    )
}