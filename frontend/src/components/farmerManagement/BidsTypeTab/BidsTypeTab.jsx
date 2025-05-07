import React from 'react'

function BidsTypeTab(props) {
  const handleClick = () => {
    props.onClick(props.bids);
  }

  const baseClasses = 'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200';
  const selectedClasses = `${baseClasses} bg-green-50 text-green-700 border border-green-200`;
  const unselectedClasses = `${baseClasses} text-gray-500 hover:bg-gray-50 hover:text-gray-700`;

  return (
    <div className="inline-block">
      <h3 
        className={props.selectedBidsType === props.bids ? selectedClasses : unselectedClasses}
        onClick={handleClick}
      >
        {props.bids}
      </h3>
    </div>
  );
}

export default BidsTypeTab