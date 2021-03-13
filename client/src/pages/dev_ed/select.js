import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { array } from '../../data.js'




function Myselect() {
  const [category, setCategory] = useState('');
  const [sub_category, setSubCategory] = useState('');
  const [filteredDoors, setFilteredDoors] = useState([]);

  // console.log('dssdds',filteredDoors)
  const doorslist = useSelector((state) => state.doors);
  const { isLoading, doors, error } = doorslist;

  const doorsCat = array.doorsCat.map(el => {
    return el.db
  })
  doorsCat.unshift('')
  // console.log('cat',doorsCat)
  //пробелы чтоб в <select/> первая поз была пустая
  // const doorsCat = ['', 'Входные','Массив','Эко Шпон' ,'МДФ']
  const vhod_door = array.vhod_door.map(el => {
    return el.db
  })
  vhod_door.unshift('')
  const massDoors = array.massDoors.map(el => {
    return el.db
  })
  massDoors.unshift('')
  const ecoDoors = array.ecoDoors.map(el => {
    return el.db
  })
  ecoDoors.unshift('')
  const mdfDoors = array.mdfDoors.map(el => {
    return el.db
  })
  mdfDoors.unshift('')

  let sub_categories = []

  //   doorsCat: [
  //     { name: 'Входные', db:'vchod' },
  //     { name: 'Массив', db:'massiv'},
  //     { name: 'Эко Шпон', db:'ecoshpon'},
  //     { name: 'МДФ', db:'mdf'},
  //  ],
  // console.log('sub-array',sub_categories)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  if (category === array.doorsCat[0].db) {
    sub_categories = [...vhod_door]
    // setFilteredDoors(doors.filter(door => door.category === array.doorsCat[0].db))

  } else if (category === array.doorsCat[1].db) {
    sub_categories = [...massDoors]
    // setFilteredDoors(doors.filter(door => door.category === array.doorsCat[1].db))

  } else if (category === array.doorsCat[2].db) {
    sub_categories = [...ecoDoors]
    // setFilteredDoors(doors.filter(door => door.category === array.doorsCat[2].db))

  } else if (category === array.doorsCat[3].db) {
    sub_categories = [...mdfDoors]
    // setFilteredDoors(doors.filter(door => door.category === array.doorsCat[3].db))

  }

  React.useEffect(() => {
    if (category === array.doorsCat[0].db) {
      // sub_categories = [...vhod_door]
      setFilteredDoors(doors.filter(door => door.category === array.doorsCat[0].db))

    } else if (category === array.doorsCat[1].db) {
      // sub_categories = [...massDoors]
      setFilteredDoors(doors.filter(door => door.category === array.doorsCat[1].db))

    } else if (category === array.doorsCat[2].db) {
      // sub_categories = [...ecoDoors]
      setFilteredDoors(doors.filter(door => door.category === array.doorsCat[2].db))

    } else if (category === array.doorsCat[3].db) {
      // sub_categories = [...mdfDoors]
      setFilteredDoors(doors.filter(door => door.category === array.doorsCat[3].db))

    }

  }, [category])

 

  return (
    <div>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            {/* ////////CATEGORY//////////////////// */}
            <li style={{ display: 'flex', marginLeft: '10' }}>
              <div>
                Category:
                  <select
                  value={category || ''}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  {doorsCat.map((x, index) => (
                    <option value={x} key={`${x}_${index}`}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginLeft: '10' }}>
                <label htmlFor="category"> : </label>
                <input
                  type="text"
                  readOnly
                  name="category"
                  value={category || ''}
                ></input>
              </div>
            </li>
            {/* ///////////SUB__CATEGORY///////////////// */}
            <li style={{ display: 'flex', marginLeft: '10' }}>
              <div>
                Sub-Category:
                  <select
                  value={sub_category || ''}
                  onChange={(e) => {
                    setSubCategory(e.target.value);
                  }}
                >
                  {sub_categories.map((x, index) => (
                    <option value={x} key={`${x}_${index}`}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginLeft: '10' }}>
                <label htmlFor="category"> : </label>
                <input
                  type="text"
                  readOnly
                  name="sub_category"
                  value={sub_category || ''}
                ></input>
              </div>
            </li>
            {/* ////////////////////////////////// */}
          </ul>
        </form>
      </div>
    </div>
  )
}

export default Myselect
