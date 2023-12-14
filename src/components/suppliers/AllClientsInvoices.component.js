import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ClientInvoices(){
    // const theBaseURL = "https://quotation-system.net/API/public/api/";
    const theBaseURL = "http://localhost/alamia/API/public/api/";

    const navigate = useNavigate();

    const { id } = useParams();

    const [noData,setNoData] = useState(false);
    const [invoices,setInvoices] = useState([]);
    const [clientName,setClientName] = useState('');
    const [searchName,setSearchName] = useState('');
    const [loading,setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        fetchInvoices();
    },[]);

    const searchInInvoices = (e) => {
        setLoading(true);
        e.preventDefault();
        fetchInvoices();
    }

    const goToDetails = (id) => {
        navigate(`../invoice/payments/${id}`);
    }

    const fetchInvoices = async () => {
        await axios.get(theBaseURL + "clients/invoices/"+id).then(({data}) => {
            if(data.data){
                setLoading(false);
                setInvoices(data.data.invoices);
                setClientName(data.data.client_name)
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
            setLoading(false);
            setNoData(true);
        })
    }

    return(
        <>
            <div className="container layout">
            {/* <div className='page-title'>
                <h1>كل  فواتير {clientName}</h1>
            </div> */}
            <form onSubmit={searchInInvoices} className="row justify-content-center">
                <div className="col-8">
                    <input type="text" className="form-control" placeholder=" أبحث  برقم الفاتورة"
                    value={searchName}
                    onChange={(e) => {setSearchName(e.target.value)}}
                    />
                </div>
                <div className="col-4">
                    <button type ="submit" className="btn btn-primary mb-3"> بحث </button>
                </div>
            </form>
            {/* <div className="row text-center justify-content-center">
                <button onClick={(e) => setPage(page - 1)} className="btn btn-danger col-2 mx-2">السابق</button>
                <button onClick={(e) => setPage(page + 1)} className="btn btn-success col-2 mx-2">التالى</button>
            </div> */}
            {
                !noData ?
            <table class="table table-striped text-center my-2">
                <thead className="table-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col"> رقم الفاتورة</th>
                    <th scope="col">أجمالى حساب الفاتورة</th>
                    <th scope="col">المبلغ المدفوع حتى الان</th>
                    <th scope="col">المبلغ المتبقى حتى الان</th>
                    <th scope="col">فى يوم</th>
                    <th scope="col">التفاصيل</th>
                    </tr>
                </thead>
                <tbody>
                {
                    invoices.map((invoice,index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td> {invoice.code} </td>
                                <td>{invoice.total}</td>
                                <td>{invoice.paid}</td>
                                <td>{invoice.delayed}</td>
                                <td>{invoice.created_at.split("T")[0]}</td>
                                <td className="">
                                <button onClick={() => goToDetails(invoice.id)} className="btn btn-primary"> التفاصيل </button>
                                <span className="m-2"></span>
                                <button onClick={() => navigate(`../invoice/add/payment/${invoice.code}`)} className="btn btn-success "> أضافة دفع </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            :
            <div className="alert alert-danger col-12 text-center mt-5">لايوجد فواتير لهذا العميل</div>
            }
            {loading && <div className="loading">
            <p>برجاء الأنتظار...</p>
            </div>}

        </div>
        </>
    )
}