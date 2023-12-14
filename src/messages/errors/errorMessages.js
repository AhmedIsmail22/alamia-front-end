import Swal from 'sweetalert2';


export default function ErrorMessages(){


    const setAlertMsg = (title='',msg,type) =>{
        Swal.fire(
            title?title:
            type==="success"?"عملية ناجحة":"عملية فاشلة",
            msg,
            type
        )
    }

    return {
        setAlertMsg
    }
}






