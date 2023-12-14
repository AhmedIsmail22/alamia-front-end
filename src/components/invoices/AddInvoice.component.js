import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./invoice.css";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";

export default function AddInvoice(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    // const theBaseURL = "http://localhost/alamia/API/public/api/";

    const{http, logout} = AuthUser();

    const navigate = useNavigate();

    const { id, clientName } = useParams();

    const [addItemForm, setAddItemForm] = useState(false)
    const [client, setClient] = useState('');
    const [clientId, setClientId] = useState(id);
    const [item_id, setItem_id] = useState(0);
    // const [item_name, setItem_name] = useState('');
    const [item_name, setItem_Name] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [maxQuantity, setMaxQuantity] = useState(1);
    const [rental_price, setRental_price] = useState(0);
    const [selling_price, setSelling_price] = useState(0);
    const [getItems, setGetItems] = useState([]);
    const [items, setItems] = useState([]);
    const [errors,setErrors] = useState(null);
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [active, setActive] = useState(1);
    const [allClients, setAllClients] = useState([]);

    // const [typePayment, setTypePayment] = useState('');
    // const [paymentValue, setPaymentValue] = useState('');
    // const [checkNumber, setCheckNumber] = useState('');
    // const [checkDate, setCheckDate] = useState('');
    // const [checkImage, setCheckImage] = useState('');
    // const [banks, setBanks] = useState('');
    // const [bankId, setBankId] = useState('');
    const [invoiceType, setInvoiceType] = useState("rental");
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setErrors();
        document.title = "العالمية | أضافة فاتورة";
        fetchAllItems();
        fetchClients();
        // fetchAllBanks();
    },[]);

    const addItemFunction = (e) =>{
        e.preventDefault();
        setAddItemForm(true);
    }

    const fetchAllItems = async() => {
        await http.get("items?searchName="+searchName).then(({data}) => {
            if(data.data){
                setGetItems(data.data);
            }
        }).catch(({response}) => {
            if(response.status === 401){
                logout();
            }
        })
    }

    // const fetchAllBanks = async() => {
    //     await axios.get(theBaseURL + "banks").then(({data}) => {
    //         if(data.data){
    //             setBanks(data.data);
    //         }
    //     })
    // }

    const fetchClients = async () => {
        await http.get("clients?searchName="+searchName).then(({data}) => {
            if(data.data){
                setAllClients(data.data);
            }
        
    })
}

    const updateForm = (item_id) => {
        // e.preventDefault();
        const itemData = getItems.find(item => item.id == item_id);

        if(itemData){
            setItem_id(itemData.id);
            setItem_Name(itemData.name);
            setMaxQuantity(itemData.quantity);
            setQuantity(1);
            setRental_price(itemData.rental_price);
            setSelling_price(itemData.selling_price);
        }else{
            setQuantity(0);
            setRental_price(0);
            setSelling_price(0);
        }
        
        // setAddItemForm(false);
    }
    const addItem = (e) => {
        e.preventDefault();
        if(!item_name || !quantity || (!rental_price && !selling_price)){
            // console.log(name, quantity, rental_price)
            Swal.fire(
                'خطأ',
                'من فضلك ادخل كل البيانات',
                'error'
              )
        }else{
            const checkItem = items.find(item => item.item_name == item_name);
            if(checkItem){
                Swal.fire(
                    'خطأ',
                    'هذا العنصر موجود بالفعل',
                    'error'
                  )
            }else{
                if(invoiceType === "rental"){
                    setItems([...items, {item_id, item_name, quantity, rental_price}])
                    setItem_Name('');
                    setQuantity(0);
                    setRental_price(0);
                    setItem_id(0)
                }else if(invoiceType === "selling"){
                    setItems([...items, {item_id, item_name, quantity, selling_price}])
                    setItem_Name('');
                    setQuantity(0);
                    setSelling_price(0);
                    setItem_id(0)
                }
                
            }
        }
    }

    const deleteItem = (item_name) => {
        setItems(items.filter(item => item.item_name != item_name));
    }
    const saveInvoice = async(e) => {
        setErrors();
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        // if(!items || !invoiceType ||
        //     (typePayment === "check" && paymentValue && !checkNumber && !checkDate)
        //     || (typePayment === "cash" && !paymentValue) || !typePayment){
        //      Swal.fire(
        //         'خطأ',
        //         'من فضلك ادخل كل البيانات',
        //         'error'
        //       )
        //       setLoading(false);
        //       return false;
        // }else{
            formData.append('items', JSON.stringify(items));
            // formData.append('paymentType', typePayment);
            // formData.append('paid', paymentValue);
            // formData.append('check_number', checkNumber);
            // formData.append('check_date', checkDate);
            formData.append('client_id', clientId);
            // formData.append('bank_id', bankId);
            // formData.append('invoice_type', invoiceType);
            // formData.append('check_image', checkImage);
        // }

        await http.post("clients/exportItems",formData).then(({data}) => {
            if(data.success){
                if(data.data){
                    Swal.fire(
                        'حسنا',
                        'لقد تم أضافة الفاتورة',
                        'success'
                      )
                    console.log(data.data);
                    setLoading(false);
                    setItem_Name('');
                    setErrors(null);
                    // navigate('/');
                }
            }else if(data.errors){
                // Swal.fire(
                //     'خطأ',
                //     data.msg,
                //     'error'
                //   )
                setLoading(false);
                setErrors(data.errors)
            }    
        console.log(data.success);
    }).catch(({response}) => {
        Swal.fire(
            'خطأ',
            'للأسف حدث شئ خطأ أثناء تخزين البيانات حاول مرة أخرى',
            'error'
          )
        setLoading(false);
        if(response.status === 422){
            setErrors(response.data.errors);
            }
        }) 
    }

    return(
        <>
        <div className="container layout">
        {/* <div className='page-title'>
            <h1>انشاء فاتورة للعميل</h1>
        </div> */}
        <div className='routes d-flex align-items-center'>
            <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
                <p className='pt-3'>-</p>
                <Link className='text-secondary link' to="/clients/all-clients">كل العملاء</Link>
                <p className='pt-3'>-</p>
                <Link to="/invoices/invoice/0" className='text-secondary link'>أنشاء فاتورة</Link>
            </div>
        <div className="row justify-content-between">
            <div className="col-md-4 col-sm-4 px-2">
                {/* <div className="col-12 mb-2 mx-1"> */}
                <div className="col-12 py-3 bg-light px-3 mb-2 box">
                        <div className="col-12">
                            <label className="text-dark"> أختر عميل <span className="text-danger"> * </span></label>
                            <select className="form-select mb-3" onChange={(e) => setClientId(e.target.value)}>
                                <option value="0">أختر عميل</option>
                                {allClients.map((client,index) => {
                                    return (
                                        <option selected={client.id == id ? "selected":""} key={index} value={client.id}>{client.name}</option>
                                        )
                                })}
                            </select>
                            <p className="text-center text-danger ">{errors?.client_id}</p>
                        </div>
                        <div className="col-12">
                                        <label className="text-dark">أختر نوع الفاتورة <span className="text-danger"> * </span></label>
                            <select className="form-select" onChange={(e) => {setInvoiceType(e.target.value); setItems([])}}>
                                <option value="" disabled>أختر نوع الفاتورة</option>
                                <option value="rental">  أيجار</option>
                                <option value="selling"> بيع </option>
                            </select>
                            <p className="text-center text-danger ">{errors?.invoiceType}</p>
                        </div>
                    </div>
                {/* </div > */}
                <form onSubmit={addItem} className="col-12 bg-light p-1 px-3 box">
                    <div className="form-group my-1">
                        <label className="text-dark my-1">أختر الصنف <span className="text-danger"> * </span> </label>
                        <select className="form-select mb-2" onChange={(e) => updateForm(e.target.value)}>
                            <option value="0" selected>اختر الصنف</option>
                            {
                                getItems.map((item,index) => {
                                    return(
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                        <p className="text-center text-danger ">{errors?.item_id}</p>
                    </div>

                    <div className="form-group my-1">
                        <label className="text-dark my-1">سعر أيجار الوحدة باليوم <span className="text-danger"> * </span> </label>
                        <input type="number" className="form-control mb-2" placeholder="أدخل سعر الايجار"    
                        value={invoiceType === "rental" ? rental_price : selling_price}
                        onChange={(e) => {invoiceType === "rental" ? setRental_price(e.target.value) : setSelling_price(e.target.value)}} 
                        />   
                        <p className="text-center text-danger ">{errors?.invoiceType}</p>
                    </div>
        
                    <div className="form-group my-1">
                        <label className="text-dark my-1"> الكمية <span className="text-danger"> * </span> </label>
                        <input type="number" className="form-control mb-2" placeholder="أدخل  الكمية" 
                        value={quantity}
                        max={maxQuantity}
                        onChange={(e) => {setQuantity(e.target.value)}}
                        />    
                        <p className="text-center text-danger ">{errors?.quantity}</p>
                    </div>
        
                    <div className="form-group justify-content-around">
                        {/* <button onClick={() => setAddItemForm(false)} className="btn btn-danger col-5 mx-1">  الغاء</button>     */}
                        <button type="submit" className="btn btn-success col-12 my-1">أضف الى الفاتورة</button>    
                    </div>
                </form>
            </div>

            <div className="col-md-8 col-sm-8 ">
                    <div className="col-12 item-form">
                    <table class="table table-striped text-center">
                                    <thead className="table-dark">
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">أسم الصنف</th>
                                        {invoiceType === "rental" ?
                                        <th scope="col"> سعر الايجار</th>
                                        :
                                        <th scope="col"> سعر البيع</th>
                                        }
                                        <th scope="col">   الكمية</th>
                                        <th scope="col">حذف</th>
                                        </tr>
                                    </thead>
                                        {   items.length > 0 ?
                                    <tbody className="bg-light">
                                        {
                                            items.map((item,index) => {
                                                return(
                                                    <tr key={index}>
                                                        <th scope="row">{index+1}</th>
                                                        <td>{item.item_name}</td>
                                                        <td>{
                                                            invoiceType === "rental"?
                                                             item.rental_price
                                                             :
                                                             item.selling_price
                                                            }</td>
                                                        <td>{item.quantity}</td>
                                                        <td className="align-middle">
                                                        <button onClick={(e) => deleteItem(item.item_name)} className="btn btn-danger"> حذف </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })  
                                        }
                                    </tbody>:<td colSpan={"5"} rowSpan={"5"}  className="text-center mt-5 fs-4 alert alert-danger text-dark">لا يوجد أصناف مضافة</td>}
                                </table>
                    </div>

                    {/* <div className="col-12">
                        <div className="right-side-bottom">
                            <button type="text" onClick={(e) => addItemFunction(e)} className="btn btn-success col-4 m-1">أضافة صنف الى الفاتورة</button>
                        </div>
                    </div> */}

                <form onSubmit={saveInvoice}>
                    <div className="col-12">
                        <button type ="submit" className="btn btn-primary mb-3 d-flex align-items-center" disabled={loading}>
                            <span>حفظ البيانات </span>  
                            {loading && <span><LoaderIcon color={"white"} type={"spokes"} size={20} style={{marginRight:"10px"}}/></span>}
                        </button>
                    </div> 
                </form>
            </div>
        </div>
                        {/* <div className="left-side">
                            <div className="form-group w-100 my-3">
                                <select className="form-select" onChange={(e) => setTypePayment(e.target.value)}>
                                    <option value="0" selected>اختر طريقة الدفع</option>
                                    <option value="cash">نقدا</option>
                                    <option value="check">شيك بنكى</option>
                                </select>
                            </div >
                            {
                                typePayment === "cash" ? 
                                
                                <div className="form-group">
                                    <input type="number" className="form-control" placeholder="المبلغ" 
                                    value={paymentValue}
                                    onChange={(e) => setPaymentValue(e.target.value)}
                                    />
                                </div>:
                                typePayment === "check" ? <>
                                    <div className="form-group">
                                    <select className="form-select w-100" onChange={(e) => setBankId(e.target.value)}>
                                        <option value="0" selected>اختر  البنك</option>
                                        {
                                            banks && banks.map((bank,index) => {
                                                return (
                                                    <option key={index} value={bank.id}>{bank.name}</option>
                                                )
                                            })
                                        }
                                </select>
                            </div >
                            <div className="form-group">
                                <input type="number" className="form-control" placeholder="قيمة الشيك"
                                value={paymentValue}
                                onChange={(e) => setPaymentValue(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" placeholder="رقم الشيك" 
                                value={checkNumber}
                                onChange={(e) => setCheckNumber(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input type="date" className="form-control" placeholder="تاريخ الشيك" 
                                value={checkDate}
                                onChange={(e) => setCheckDate(e.target.value)}
                                />
                            </div>
                            <div className="form-group my-3">
                                <input type="file" className="form-control" placeholder="صورة الشيك" 
                                // value={checkImage}
                                onChange={(e) => setCheckImage(e.target.files[0])}
                                />
                            </div>
                            </>:<></> }
                        </div> */}
                    </div>
        </>
    )
}