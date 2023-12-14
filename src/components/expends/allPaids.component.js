// import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./expends.css";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";



export default function Paids(){
    const{http, logout, imgPath} = AuthUser();

    const navigation = useNavigate();
    const [noData,setNoData] = useState(false);
    const [paids,setPaids] = useState([]);
    const [searchName,setSearchName] = useState('');
    const [loading,setLoading] = useState(false);
    const [permission,setPermission] = useState(true);

    useEffect(() => {
        document.title = "العالمية | كل المصروفات";
        setLoading(true);
        fetchPaids();
    },[])
    const searchInPaids = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchPaids();
    }

    const fetchPaids = async () => {
        await http.get("paids?searchName="+searchName).then(({data}) => {

            if(data.data){
                setLoading(false);
                setPaids(data.data);
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
                <h1>كل المصروفات</h1>
            </div> */}
            <div className="row px-3">
                <div className='routes d-flex align-items-center'>
            <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/paids/paid">كل المصروفات</Link>
            </div>
                <div className="col-10">
                </div>
                <button onClick={() => navigation('../paids/paid')} className="col-lg-2 col-md-3 col-sm-4 btn btn-success">أضافة مصروف</button>
            </div>
                <div class="table-responsive p-3 mt-4" style={{background:"#fff"}}>
            <form onSubmit={searchInPaids} className="row justify-content-center">
                <div className="col-8">
                    <input type="text" className="form-control" placeholder=" أبحث بأسم المصروف"
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
                    {/* <th className="text-danger"  scope="col"><ion-icon name="image-outline"></ion-icon></th> */}
                    <th className="text-danger"  scope="col">  التاريخ </th>
                    <th  className="text-danger" scope="col">أسم البند</th>
                    <th className="text-danger"  scope="col">    القيمة</th>
                    <th className="text-danger"  scope="col">   الشخص الذى كام بالأجراء </th>
                    <th className="text-danger"  scope="col">  التفاصيل</th>
                    </tr>
                </thead>
                <tbody>
                {
                    paids.map((paid,index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                {/* <td><img src={imgPath+paid.expends.img} width={20} height={20} className="img-cycle"/></td> */}
                                <td>{paid.date_added}</td>
                                <td>{paid.expends.name}</td>
                                <td>{paid.amount}</td>
                                <td>{paid.user.name}</td>
                                <td >{paid.details?paid.details:"لا يوجد تفاصيل"}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            :
            <div className="alert alert-danger col-12 text-center mt-5">لايوجد مصروفات</div>
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