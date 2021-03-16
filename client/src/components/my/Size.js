import React from 'react';

export default function Size({ size }) {

  const arr = size.split('=')
  const [s,setS] = React.useState(0)
  const onClickSize = (i) => {
    setS(i)
  }

  return (
    <div style={{ display: 'flex' }} className="">
      {arr.map((el, index) => (
        <div key={`${el}_${index}`}
          className={s === index ? 'size size-active' : 'size'}
          onClick={() => onClickSize(index)}>

          {el}

        </div>
      )
      )
      }

    </div>
  
  )
}


