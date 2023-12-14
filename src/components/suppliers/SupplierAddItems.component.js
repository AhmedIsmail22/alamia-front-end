import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";

export default function SupplierAddItems(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";


    const {http, logout} = AuthUser();

    const navigate = useNavigate();
    const [suppliers,setSuppliers] = useState('');
    const [supplierId,setSupplierId] = useState('');
    const [items,setItems] = useState('');
    const [itemId,setItemId] = useState('');
    const [isThere,setIsThere] = useState('0');
    const [searchName,setSearchName] = useState('');
    const [name,setName] = useState('');
    const [quantity,setQuantity] = useState('');
    const [price,setPrice] = useState('');
    const [rentalPrice,setRentalPrice] = useState('');
    const [sellingPrice,setSellingPrice] = useState('');
    const [errors,setErrors] = useState(null);
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false);

    useEffect(() => {
        document.title = "العالمية |شراء معدة ";
        fetchAllSuppliers();
        fetchAllItems();
    },[]);
    
    const fetchAllSuppliers = async () => {
        await http.get("suppliers?searchName" + searchName).then(({data}) => {
            setSuppliers(data.data);
        }).catch(({response}) => {
            if(response.status === 401){
                logout();
            }
        })
    }

    const fetchAllItems = async () => {
        await http.get("items?searchName" + searchName).then(({data}) => {
            setItems(data.data);
        }).catch(({response}) => {
            if(response.status === 401){
                logout();
            }
        })
    }
    const createItem= async(e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('supplier_id', supplierId);
        formData.append('item_id', itemId);
        formData.append('name', name);
        formData.append('quantity_in_store', quantity);
        formData.append('item_price', price);
        formData.append('rental_price', rentalPrice);
        formData.append('selling_price', sellingPrice);

        await http.post("items/add",formData).then(({data}) => {
            if(data.success){
                if(data.data){
                    Swal.fire(
                        'حسنا',
                        'لقد تم أضافة المعدة بنجاح',
                        'success'
                      )
                    console.log(data.data);
                    setLoading(false);
                    setName('');
                    setItemId('');
                    setSupplierId('');
                    setPrice('');
                    setQuantity('');
                    setRentalPrice('');
                    setSellingPrice('');
                    setErrors(null);
                    // navigate('/');
                }
            }else if(data.errors){
                Swal.fire(
                    'خطأ',
                    'للأسف حدثت شئ خطأ أثناء تخزين البيانات حاول مرة أخرى',
                    'error'
                  )
                setLoading(false);
                setErrors(data.errors)
            }    
        console.log(data.success);
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

    return(
        <>
        <div className="container layout">
        {/* <div className='page-title'>
            <h1>أضافة  معدة جديدة الى المخزن</h1>
        </div> */}
        <div className="my-2"></div>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <div className="title">أضافة معدة جديد الى المخزن</div >
                                <hr></hr>
                                <div className="form-wrapper">
                                    <form onSubmit={createItem} className="row"> 
                                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                        <label  className="form-label">أختر المورد</label>
                                        <select className="form-select" onChange={(e) => {setSupplierId(e.target.value)}}>
                                            <option value="0">أختر مورد</option>
                                            {
                                                suppliers && suppliers.map((supplier, index) => {
                                                    return(
                                                        <option key={index} value={supplier.id}>{supplier.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <p className="error">{errors&&errors.supplier_id?errors.supplier_id[0]:""}</p>
                                     </div>

                                     <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                        <label  className="form-label">هل هذا الصنف موجود من قبل</label>
                                        <select className="form-select" onChange={(e) => {setIsThere(e.target.value)}}>
                                            <option value=""> هل هذا الصنف موجود من قبل</option>
                                            <option value="1"> نعم</option>
                                            <option value="0"> لا</option>
                                        </select>
                                     </div>

                                    {isThere == '1' && items.length > 0 ? <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                    <label  className="form-label">أختر الصنف</label>
                                    <select className="form-select" onChange={(e) => {setItemId(e.target.value)}}>
                                        <option value="0">أختر صنف</option>
                                        {
                                            items && items.map((item, index) => {
                                                return(
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <p className="error">{errors&&errors.item_id?errors.item_id[0]:""}</p>
                                 </div>:
                                 <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                        <label  className="form-label">أسم المعدة</label>
                                        <input type="text" className="form-control" placeholder="أدخل أسم المعدة"
                                        value={name}
                                        onChange={(e) => {setName(e.target.value)}}
                                        />
                                        <p className="error">{errors&&errors.name?errors.name[0]:""}</p>
                                    </div>
                                    
                                    }

                                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                        <label  className="form-label">الكمية</label>
                                        <input type="number" className="form-control" placeholder="أدخل  الكمية"
                                        value={quantity}
                                        onChange={(e) => {setQuantity(e.target.value)}}
                                        />
                                        <p className="error">{errors&&errors.quantity_in_store?errors.quantity_in_store[0]:""}</p>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                        <label  className="form-label"> سعر شراء الصنف الواحد</label>
                                        <input type="number" className="form-control" placeholder="أدخل  سعر ايجار الوحدة فى اليوم"
                                        value={price}
                                        onChange={(e) => {setPrice(e.target.value)}}
                                        />
                                        <p className="error">{errors&&errors.item_price?errors.item_price[0]:""}</p>
                                    </div>
                                    {isThere === '0' && <>
                                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                        <label  className="form-label"> سعر ايجار الصنف فى اليوم الواحد</label>
                                        <input type="number" className="form-control" placeholder="أدخل  سعر ايجار الوحدة فى اليوم"
                                        value={rentalPrice}
                                        onChange={(e) => {setRentalPrice(e.target.value)}}
                                        />
                                        <p className="error">{errors&&errors.rental_price?errors.rental_price[0]:""}</p>
                                    </div>

                                    <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
                                        <label  className="form-label">سعر بيع الوحدة</label>
                                        <input type="text" className="form-control" placeholder="أدخل  بيع الوحدة"
                                        value={sellingPrice}
                                        onChange={(e) => {setSellingPrice(e.target.value)}}
                                        />
                                        <p className="error">{errors&&errors.selling_price?errors.selling_price[0]:""}</p>
                                    </div></>
                                    }
                                        

                                        <div className="col-12">
                                        <button type ="submit" className="btn btn-primary mb-3 d-flex align-items-center" disabled={loading}>
                                            <span>حفظ البيانات </span>  
                                            {loading && <span><LoaderIcon color={"white"} type={"spokes"} size={20} style={{marginRight:"10px"}}/></span>}
                                        </button>
                                    </div> 
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}