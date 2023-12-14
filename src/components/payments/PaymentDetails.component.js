import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import User from "../../images/user.jpg";
import AuthUser from '../authentication/AuthUser';
import LoaderIcon from "react-loader-icon";

const PaymentDetails = () => {

    const {http, theUrl, imgPath, logout} = AuthUser();
    const {id} = useParams();

    const [paymentDetails,setPaymentDetails] = useState([]);
    const [openImg,setOpenImg] = useState(false);
    const [loading,setLoading] = useState(false);


    useEffect(() => {
        document.title = "العالمية | تفاصيل الدفع";
        setLoading(true);
        fetchPaymentDetails();

        console.log("=============>"+imgPath + paymentDetails.check.image);
    },[]);

    const fetchPaymentDetails = async () => {
        await http.post("payments/details/" + id).then(({data}) => {
            if(data.data){
                setLoading(false);
                setPaymentDetails(data.data);
            }
        }).catch(({response}) => {
            setLoading(false);
            if(response.status === 401){
                logout();
            }
        })
    }
  return (
    <div>
        {
            loading ? <p className="loading-icon"><LoaderIcon color={"orange"} size={120} /></p> : 
            <>
        {paymentDetails&& <><div className='col-12'>
          <h1 className='text-center mt-5'>تفاصيل الدفع </h1>
        </div>
        <div className='row payment-details'>
        <table className='col-md-8 col-sm-12 table-payment-details bg-light font-weight-bold '>
        <tr>
            <td> اسم المورد  </td>
            <td className='align-items-center'><p className='bg-success px-3 text-light rounded py-1'>{paymentDetails.supplier.name}</p ></td>
        </tr>
        <tr>
            <td> طريقة الدفع   </td>
            <td><p className='bg-success px-3 text-light rounded py-1'> {paymentDetails.payment_type}</p ></td>
        </tr>
        <tr>
            <td>قيمة المبلغ</td>
            <td><p className='bg-success px-3 text-light rounded py-1'>{paymentDetails.payment_value}</p ></td>
        </tr>
        <tr>
            <td>  تاريخ الاستلام  </td>
            <td><p className='bg-success px-3 text-light rounded py-1'>{paymentDetails.created_at}</p ></td>
        </tr>
        <tr>
            <td> رقم الشيك   </td>
            <td><p className='bg-success px-3 text-light rounded py-1'>{paymentDetails.check.number}</p ></td>
        </tr>
           
        </table>
        <div className='col-md-4 col-sm-12 d-flex flex-column justify-content-center'>
            <img src={paymentDetails.check.image?imgPath + paymentDetails.check.image:User} alt=''/>
            <button className='btn btn-primary mt-1' onClick={() => setOpenImg(true)}>فتح الصورة</button>
        </div>
        </div>



        {openImg && <div className='open-img'>
        <img src={paymentDetails.check.image?imgPath + paymentDetails.check.image:User} alt=''/>

            <div className='close' onClick={() => setOpenImg(!openImg)}>
            <ion-icon name="close"></ion-icon>
            </div>
        </div>
        }
            </>
        }
            </>
        }
      
    </div>
  )
}

export default PaymentDetails
