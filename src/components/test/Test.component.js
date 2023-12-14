// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import "./test.css"
// const Test = () => {

//     const [toggle, setToggle] = useState(false);
//   return (
//     <>
        
//         <div className="main">
//             <h1>Main</h1>
//         </div>
//         <div className={toggle ? "small-sidebar" : "test-sidebar"}>
//             <h1>Sidebar</h1>
//         </div>
//     </>
//   )
// }

// export default Test








// <div>
//       <div className='main-section'>
//         <div className='main-header py-3 d-flex justify-content-between align-items-center'>
//             <div className='routes d-flex align-items-center'>
//             <Link className='text-secondary link pl-3' to="/"><ion-icon name="home"></ion-icon></Link>
//                 <Link className='text-secondary link' to="/">كل العملاء</Link>
//                 <p className='pt-3'>-</p>
//                 <Link to="/test" className='text-secondary link'>تفاصيل العميل</Link>
//             </div>
//         </div>
//         <form className='main-section-body'>
//                 <div className='right py-3  inputs-box'>
//                   {
//                     payType === "import" &&<>
//                     <div className="main-section-body-title pb-3 px-3">
//                         تحصيل دفعة من العميل
//                     </div>
//                     <div className='col-12 my-3 px-3'>
//                         <label>أسم العميل</label>
//                         <select className="form-select" onChange={(e) => setClientId(e.target.value)}>
//                           <option value="0" selected>اختر  ألعميل</option>
//                           {
//                               clients && clients.map((client,index) => {
//                                   return (
//                                       <option key={index} value={client.id}>{client.name}</option>
//                                   )
//                               })
//                           }
//                         </select>
//                         <p className="error">{errors&&errors.name?errors.name[0]:""}</p>
//                     </div>
//                     </>
//                   }
//                   {
//                     payType === "export" &&<>
//                     <div className="main-section-body-title pb-3 px-3">
//                        تسديد دفعة للمورد
//                     </div>
//                     <select className="form-select" onChange={(e) => setSupplierId(e.target.value)}>
//                         <option value="0" selected>اختر  المورد</option>
//                         {
//                           suppliers && suppliers.map((supplier,index) => {
//                               return (
//                                   <option key={index} value={supplier.id}>{supplier.name}</option>
//                               )
//                           })
//                         }
//                          </select>
//                     </>
//                   }
                    

//                     <div className='col-12 px-3'>
//                     <label  className="form-label">اختر طريقة الدفع</label>
//                     <select className="form-select" onChange={(e) => setTypePayment(e.target.value)}>
//                       <option value="0" selected>اختر طريقة الدفع</option>
//                       <option value="cash">نقدا</option>
//                       <option value="check">شيك بنكى</option>
//                     </select>
//                     <p className="error">{errors&&errors.mobile?errors.mobile[0]:""}</p>
//                     </div>
//                     {
//                                 typePayment === "cash" ? 
                                
//                                 <div className="form-group">
//                                     <input type="number" className="form-control" placeholder="المبلغ" 
//                                     value={paymentValue}
//                                     onChange={(e) => setPaymentValue(e.target.value)}
//                                     />
//                                      <p className="error">{errors&&errors.whatsapp?errors.whatsapp[0]:""}</p>
//                                 </div>:
//                                 typePayment === "check" ? <>
//                                     <div className='col-12 px-3'>
//                         <label  className="form-label">واتساب</label>
//                                     <select className="form-select w-100" onChange={(e) => setBankId(e.target.value)}>
//                                         <option value="0" selected>اختر  البنك</option>
//                                         {
//                                             banks && banks.map((bank,index) => {
//                                                 return (
//                                                     <option key={index} value={bank.id}>{bank.name}</option>
//                                                 )
//                                             })
//                                         }
//                                 </select>
//                             </div >
//                             <div className='col-12 px-3'>
//                         <label  className="form-label">قيمة الشيك</label>
//                                 <input type="number" className="form-control" placeholder="قيمة الشيك"
//                                 value={paymentValue}
//                                 onChange={(e) => setPaymentValue(e.target.value)}
//                                 />
//                                  <p className="error">{errors&&errors.whatsapp?errors.whatsapp[0]:""}</p>
//                             </div>
//                             <div className='col-12 px-3'>
//                         <label  className="form-label">رقم الشيك</label>
//                                 <input type="number" className="form-control" placeholder="رقم الشيك" 
//                                 value={checkNumber}
//                                 onChange={(e) => setCheckNumber(e.target.value)}
//                                 />
//                                  <p className="error">{errors&&errors.whatsapp?errors.whatsapp[0]:""}</p>
//                             </div>
//                             <div className='col-12 px-3'>
//                         <label  className="form-label">تاريخ الشيك</label>
//                                 <input type="date" className="form-control" placeholder="تاريخ الشيك" 
//                                 value={checkDate}
//                                 onChange={(e) => setCheckDate(e.target.value)}
//                                 />
//                                  <p className="error">{errors&&errors.whatsapp?errors.whatsapp[0]:""}</p>
//                             </div>
//                             </>:<></> 
//                             }
//                 {typePayment === "check" &&<div className='leftd-flex flex-column'>
//                     <div className='d-flex flex-column inputs-box'>
//                         <div className='img-title'>
//                             صورة الشيك
//                         </div>
//                         <input type='file' className="form-control" className='img' placeholder="صورة الشيك"
//                          onChange={(e) => setCheckImage(e.target.files[0])} />
//                                  <p className="error">{errors&&errors.whatsapp?errors.whatsapp[0]:""}</p>
//                     </div>}

//                     <div className='col-md-3 col-sm-12 d-flex flex-column'>
//                     <div className='p-4 d-flex flex-column '>
//                         <div className='img-title'>
//                             حفظ البيانات
//                         </div>
//                         <button type ="submit" className="btn btn-primary mb-3 d-flex align-items-center" disabled={loading}>
//                             <span>حفظ البيانات </span>  
//                             {loading && <span><LoaderIcon color={"white"} type={"spokes"} size={20} style={{marginRight:"10px"}}/></span>}
//                         </button>
//                     </div>
//                 </div>
//                 </div>
//             </form>
//       </div>
            
//     </div>