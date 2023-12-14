import { Form, Link, useParams } from "react-router-dom";
import "./items.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoaderIcon from "react-loader-icon";
import Swal from "sweetalert2";
import AuthUser from "../authentication/AuthUser";



export default function  ImportItems (){
    

    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";

    const {http, logout} = AuthUser();

    const {id} = useParams();

    const [clientId, setClientId] = useState(id);
    const [quantityInput, setQuantityInput] = useState(false);
    const [clientItems, setClientItems] = useState([]);
    const [items, setItems] = useState([]);
    const [item, setItem] = useState({});
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [rentalPrice, setRentalPrice] = useState('');
    const [rowId, setRowId] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors,setErrors] = useState(null);
    const [allClients, setAllClients] = useState([]);
    const [searchName, setSearchName] = useState('');


    const handleQuantity = (e) => {
        e.preventDefault();
        setQuantityInput(false);
        item.quantity = quantity;
        // console.log(item);
        setItems([...items, item]);
        setQuantity('');
        setClientItems(clientItems.filter(data => data.item_name != item.item_name))
    }

    const deleteItem = (item) => {
        setClientItems([...clientItems, item])
        setItems(items.filter(data => data.item_name != item.item_name))
    }
    const handleFormQuantity = (item) => {
        setQuantityInput(true)
        setItem(item);
        // setItemId(item.id);
        // setQuantity(item.quantity);
        // setRentalPrice(item.rental_price);
        // setRowId(item.id);
    }
    useEffect(() => {
        if(loading){
            document.body.style.overflow = "hidden";
        }
        if(!loading){
            document.body.style.overflow = "auto";
        }
    },[loading])
    useEffect(() => {
        document.title = "العالمية | أسترداد معدة بعد الايجار";
        setLoading(true);
        fetchClientItems();
        fetchClients();
    },[])

    useEffect(() => {
        setLoading(true);
        fetchClientItems();
    },[clientId])

    const fetchClientItems = async () => {
        await http.get("clients/clientItems/"+clientId).then(({data})  => {
            if(data.data){
                setClientItems(data.data);
                setLoading(false);
            }
        }).catch(({response}) => {
            if(response.status === 401){
                logout();
            }
        });
        
    }

    const fetchClients = async () => {
        await http.get("clients?searchName="+searchName).then(({data}) => {
            if(data.data){
                setAllClients(data.data);
            }
        
    }).catch(({response}) => {
        if(response.status === 401){
            logout();
        }
    })
}


    const saveData = async(e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append("client_id",clientId);
        formData.append("items",JSON.stringify(items));
        console.log(formData);

        await http.post("clients/importItems",formData).then(({data}) => {
            if(data.success){
                if(data.data){
                    Swal.fire('حسنا', 'لقد تم اضافة المعدة بنجاح', 'success')
        }
        setLoading(false);
    }
}).catch(({response}) => {
            Swal.fire(
                'خطأ',
                'للأسف حدثت شئ خطأ أثناء تخزين البيانات حاول مرة أخرى',
                'error'
              )
            setLoading(false);
            if(response.status === 422){
                setErrors(response.data.errors);
                }

                if(response.status === 401){
                    logout();
                }
            })
    }
    return (
        <>
            <div className="main-section">
                {/* <div className='page-title'>
                    <h1> أسترداد معدة بعد الايجار</h1>
                </div> */}
                <div className='routes d-flex align-items-center'>
            <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/clients/all-clients">كل العملاء</Link>
                <p className='pt-3'>-</p>
                <Link to="/clients/import/item/0" className='text-secondary link'>تفاصيل العميل</Link>
            </div>
                <div className="row justify-content-between">
                    <div className="col-12 pb-2 mb-2">
                        <select className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                            <option value="0">أختر العميل</option>
                            {allClients.map((client,index) => {
                                    return (
                                        <option selected={client.id == id ? "selected":""} key={index} value={client.id}>{client.name}</option>
                                        )
                                })}
                        </select>
                    </div>
                    <div className="col-md-5 col-sm-12 p-2">
                    <table className="table table-striped text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">اسم المعدة</th>
                                    <th></th>
                                    <th scope="col"> الكمية المستردة</th>
                                </tr>
                            </thead>
                            {
                               !loading ?
                               <tbody>
                               {
                                   clientItems.length > 0 ?
                                   clientItems.map((item, index) => {
                                       return (
                                           <tr key={index}>
                                               <td>{item.item_name}</td>
                                               <td></td>
                                               <td>
                                               <button onClick={() => handleFormQuantity(item)} className="btn btn-danger">استرداد</button>
                                               </td>
                                           </tr>
                                       )
                                   }):
                                   <td colSpan={3} className="alert alert-danger w-100 text-center">لا يوجد بيانات</td>
                               }
                           </tbody>
                           : <p className="loading-icon"><LoaderIcon color={"orange"} size={120} /></p>
                            }
                        </table>
                    </div>
                    <div className="col-2 text-center fs-1 text-success vertical-align-middle">
                    <ion-icon name="swap-horizontal-outline" className="text-success"></ion-icon>
                    </div>
                    <div className="col-md-5 col-sm-12 p-2">
                        <table className="table table-striped text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">اسم المعدة</th>
                                    <th scope="col" className="text-left"> الكمية المستردة</th>
                                    <th>الغاء</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.length > 0 ?
                                    items.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.item_name}</td>
                                                <td>{item.quantity}</td>
                                                <td>
                                                    <button onClick={() => deleteItem(item)} className="btn btn-danger" >الغاء</button>
                                                </td>
                                            </tr>
                                        )
                                    }): <td colSpan={3} className="alert alert-danger w-100 text-center">لا يوجد بيانات</td>
                                }
                                {/* <tr>
                                    <td>معدة بعد الايجار</td>
                                    <td></td>
                                    <td>1</td>
                                </tr> */}
                            </tbody>
                        </table>
                        {
                            items.length > 0 && <button onClick={(e) => saveData(e)} className="btn btn-primary">حفظ البيانات</button>
                        }
                    </div>
                </div>
            </div>

            {
                quantityInput && <form onSubmit={handleQuantity} className="import-quantity bg-light">
                    <h5 className="text-center">{item.item_name} </h5>
                    {/* <input type="hidden" value={item.name} /> */}
                    <input className="form-control mb-1" 
                    type="number" 
                    placeholder="الكمية المستردة" 
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    required
                    />
                    <button className="btn btn-primary mt-1">استرداد</button>
                </form>
            }
            </>
    )
}