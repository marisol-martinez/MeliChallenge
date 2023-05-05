import React from 'react'

function Breadcrumb({categories}) {

  let categoriesConctat = categories;
    
  return (
      <div className='breadcrumb'>
        {categoriesConctat.map((c, i ) => (
          <>
            <span>{c.name} </span>
            {categoriesConctat.length == i+1 ? '' : <span>{'  >  '}</span>}
          </>
        ))}
      </div>
  )
}

export default Breadcrumb