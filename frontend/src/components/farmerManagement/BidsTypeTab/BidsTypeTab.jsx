import React from 'react'

function BidsTypeTab(props) {

  const handleClick = () => {
      props.onClick(props.bids);
  }

  if(props.selectedBidsType === props.bids){
    return (
      <div>
          <h3 className='cursor-pointer border-b-2 border-b-green-600 ' onClick={handleClick}>{props.bids}</h3>
      </div>
    )
  }
  else{
    return (
      <div>
          <h3 className='cursor-pointer ' onClick={handleClick}>{props.bids}</h3>
      </div>
    )
  }



  // return (
  //   <div>
  //       <h3 className='cursor-pointer' onClick={handleClick}>{props.bids}</h3>
  //   </div>
  // )
}

export default BidsTypeTab