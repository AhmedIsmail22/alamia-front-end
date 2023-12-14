import React, { useEffect } from 'react'
import ERROR from '../../images/404.png'
export default  function Error(){

  useEffect(() => {
    document.title = "404 الصفحة غير موجودة";
})
  return (
    <div className='error-page-404'>
        <img className='img-404' src={ERROR} alt="404" />
    </div>
  )
}

