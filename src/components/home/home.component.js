import React, { useEffect, useState } from 'react'
import "./home.css";
import LoaderIcon from "react-loader-icon";
import AuthUser from '../authentication/AuthUser';
export default function Home(){

        const {http, logout, checkLogin} = AuthUser();
    const [noData,setNoData] = useState(false);
    const [allSettings , setAllSettings] = useState();
    const [clientsData , setClientsData] = useState(true);
    const [suppliersData , setSuppliersData] = useState(true);
    const [itemsData , setItemsData] = useState(true);
    


useEffect(() => {
        document.title = "العالمية | الصفحة الرئيسية ";
        checkLogin();
        getSettings();
},[]);

const getSettings = async () => {
        await http.get("settings").then(({data}) => {
        if(data){
                setAllSettings(data.data);
        }
}).catch((response) => {
        if(response.response.status === 401){
                logout();
        }
    })
}
// console.log(settings.clients);
  return (
        allSettings ? <>
        <div className='list-container'>
                <div className='list'>
                        <div className='list-header'>
                                <h4>العملاء</h4>
                                <h4 onClick={(e) => setClientsData(!clientsData)}> 
                                <ion-icon name="chevron-down-outline"></ion-icon>
                                </h4>
                        </div>
                        {clientsData &&<div className='list-body'>
                        {
                                allSettings.clients && allSettings.clients.map((client,index) => (
                                        <div className={'list-card card'+(index+1)}>
                                        { client.name} : {client.count}
                                        </div>
                                        ))
                                }
                        
                        </div>}
                        
                </div>
                <div className='list'>
                <div className='list-header'>
                                <h4>الموردين</h4>
                                <h4 onClick={(e) => setSuppliersData(!suppliersData)}> 
                                <ion-icon name="chevron-down-outline"></ion-icon>
                                </h4>
                        </div>
                        {suppliersData &&<div className='list-body'>
                        {
                                allSettings.suppliers.map((supplier,index) => (
                                        <div className={'list-card card'+(index+1)}>
                                        { supplier.name} : {supplier.count}
                                        </div>
                                        ))
                                }
                        
                        </div>}
                </div>
                <div className='list'>
                <div className='list-header'>
                                <h4>المخزن</h4>
                                <h4 onClick={(e) => setItemsData(!itemsData)}> 
                                <ion-icon name="chevron-down-outline"></ion-icon>
                                </h4>
                        </div>
                        {itemsData &&<div className='list-body'>
                        {
                                allSettings.items.map((item,index) => (
                                        <div className={'list-card card'+(index+1)}>
                                        { item.name} : {item.count}
                                        </div>
                                        ))
                                }
                        
                        </div>}
                </div>
        </div>
</>:<>
        <div className="loading"></div>
        <p className="loading-icon"><LoaderIcon color={"orange"} size={120} /></p>
            </>
  )   
}



