// import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./transactions.css";
import LoaderIcon from "react-loader-icon";
import AuthUser from "../authentication/AuthUser";


export default function Transactions() {

  const{http, logout} = AuthUser();

    const navigation = useNavigate();
    const [noData,setNoData] = useState(false);
    const [transactionData,setTransactionData] = useState([]);
    const [date,setDate] = useState('');
    const [loading,setLoading] = useState(false);
    const [permission,setPermission] = useState(true);

    useEffect(() => {
        document.title = "العالمية | تقارير يومية ";
        setLoading(true);
        fetchAllTransactions();
        
    },[])

    const fetchAllTransactions = async () => {
      const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  setDate(formattedDate);
  console.log(date)
      await http.get("transactions?date="+formattedDate).then(({data}) => {
        if(data.data){
          console.log(data.data)
        }
      }).catch(({response}) => {
        if(response.status === 401){
          logout();
      }
      })
    }
  return (
    <div>itemTransactions.component</div>
  )
}
