import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";


export default function AllItems(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";

    const {http, logout} = AuthUser();

    const navigation = useNavigate();
    const [noData,setNoData] = useState(false);
    const [items,setItems] = useState([]);
    const [item,setItem] = useState();
    const [searchName,setSearchName] = useState('');
    const [loading,setLoading] = useState(false);
    const [updateForm, setUpdateForm] = useState(false)
    // const [page,setPage] = useState(1);

    useEffect(() => {
        document.title = "العالمية | كل الأصناف ";
        setLoading(true);
        fetchItems();
    },[])
    const searchInItems = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchItems();
    }

    const setAction = (e,action,it) => {
        e.preventDefault();
        // setAddAward(false);
        // setAddAdvance(false);
        // setAddDeduction(false);
        setItem(it)
        // if(action == 1){
        //     navigation(`/items/item/${it.id}`)
        // }else if(action == 2){
        //     // setAddAward(true);
        // }else if(action == 3){
        //     // setAddDeduction(true);
        // }else if(action == 4){
        //     // setAddAdvance(true);
        // }
        console.log("======>", action,"//////////",it.id)
    }
    const formData = new FormData();
    const fetchItems = async () => {
        formData.append('searchName', searchName);
        await http.get("items?searchName="+searchName).then(({data}) => {
            if(data.data){
                setLoading(false);
                setItems(data.data);
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
        <div className="container layout">
            {/* <div className='page-title'>
                <h1>كل المعدات</h1>
            </div> */}
            <div className="row px-3">
                <div className='routes d-flex align-items-center'>
            <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/item/item">كل المعدات</Link>
            </div>
                <div className="col-10">
                </div>
                <button onClick={() => navigation('../suppliers/add/item/0')} className="col-lg-2 col-md-3 col-sm-4 btn btn-success">أضافة معدة</button>
            </div>

            <div class="table-responsive p-3 mt-4" style={{background:"#fff"}}>
            <form onSubmit={searchInItems} className="row justify-content-center">
                <div className="col-8">
                    <input type="text" className="form-control" placeholder=" أبحث بأسم المعدة"
                    value={searchName}
                    onChange={(e) => {setSearchName(e.target.value)}}
                    />
                </div>
                <div className="col-4">
                    <button type ="submit" className="btn btn-primary mb-3"> بحث </button>
                </div>
            </form>
            {/* <div className="row px-3">
                <div className="col-10"></div>
                <button onClick={() => navigation('../suppliers/add/item')} className="col-2 btn btn-success">أضافة معدة الى المخزن</button>
            </div> */}
            
            {
                !noData ?
            <table class="table table-bordered table-hover text-center">
                <thead>
                    <tr>
                    <th className="text-danger" scope="col">#</th>
                    <th className="text-danger" scope="col">أسم المعدة</th>
                    <th className="text-danger" scope="col">أجمالى  الموجود بالمخزن</th>
                    <th className="text-danger" scope="col">أجمالى  خارج المخزن</th>
                    <th className="text-danger" scope="col"> سعر الأيجار</th>
                    <th className="text-danger" scope="col"> سعر البيع</th>
                    <th className="text-danger" scope="col">اجراءات</th>
                    </tr>
                </thead>
                <tbody>
                {
                    items.map((item,index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.quantity_in_store}</td>
                                <td>{item.quantity_out_store}</td>
                                <td>{item.rental_price}</td>
                                <td>{item.selling_price}</td>
                                <td className="">
                                    <select className="form-select" value={0} onChange={(e) => setAction(e,e.target.value,item)}>
                                        <option value="0">أجراءات</option>
                                        <option value="1">عرض</option>
                                        <option value="2">تعديل</option>
                                        <option value="3">حذف</option>
                                    </select>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            :
            <div className="alert alert-danger col-12 text-center mt-5">لايوجد بيانات</div>
            }
            </div>



            {loading && <>
                <div className="loading"></div>
                <p className="loading-icon"><LoaderIcon color={"orange"} size={120} /></p>
            </>}

        </div>
        </>
    )
}