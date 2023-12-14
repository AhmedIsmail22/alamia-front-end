import React, { useState } from 'react'
import "./reports.css";
import AuthUser from '../authentication/AuthUser';
const Expenses = () => {

    const {http, user, logout} = AuthUser();
    const [openForm, setOpenForm] = useState(false);
    const [client, setClient] = useState('');
    const [item, setItem] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

   const getDataReport = async(e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append("client_id", client);
        formData.append("item_id", item);
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
        await http.post("reports/sales", formData).then(({data}) => {
            if(data.data){
                setLoading(false);
                setData(data.data);
            }
        }).catch(({response}) => {
            setLoading(false);
            if(response.status === 401){
                logout();
            }
        })

    }
  return (
    <div className='report'>
        <h3 className='title'>تقارير بالمصروفات</h3>
        <button onClick={() => setOpenForm(!openForm)} className='btn btn-primary col-2'>فلتر</button>
         {
            openForm && 
            <form className='filter-inputs row' onSubmit={getDataReport}>
         {/* <ion-icon name="close-outline"></ion-icon> */}
            <div className='form-group col-md-3 col-sm-12 mb-2'>
                <input className='form-control' type='text' placeholder='ابحث باسم العميل'
                value={client}
                onChange={(e) => setClient(e.target.value)}
                 />
            </div>

            <div className='form-group col-md-3 col-sm-12 mb-2'>
                <input className='form-control' type='text' placeholder='ابحث باسم الصنف'
                value={item}
                onChange={(e) => setItem(e.target.value)}
                 />
            </div>

            <div className='form-group col-md-3 col-sm-12 mb-2'>
                <input className='form-control' type='date' placeholder='تاريخ البداية' 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div className='form-group col-md-3 col-sm-12 mb-2'>
                <input className='form-control' type='date' placeholder='تاريخ النهاية' 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <input type='submit' className='btn btn-success col-2' value='أبحث' />
        </form> 
         }


         <table className='table table-striped responsive mt-5'>
            <thead className='table-dark'>
                <tr>
                    <th>#</th>
                    <th>اسم العميل</th>
                    <th>اسم الصنف</th>
                    <th>الكمية</th>
                    <th>سعر الواحدة</th>
                    <th>الاجمالي</th>
                    {/* <th></th>
                    <th></th> */}
                </tr>
                <tbody>
                    {data.map((item, index) => {
                        return( <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.client}</td>
                            <td>{item.item}</td>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                            <td>{item.total}</td>
                        </tr>)
                        })
                    }
                </tbody>
            </thead>
         </table>
    </div>
  )
}

export default Expenses