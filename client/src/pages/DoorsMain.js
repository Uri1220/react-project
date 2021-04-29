import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/my/LoadingBox';
import { fetchColors } from '../redux/actions/colorsA';
import { fetchColoredDoors } from '../redux/actions/doorsA';
import { Link } from 'react-router-dom';
import DoorMain from './DoorMain'
import MessageBox from '../components/my/MessageBox';




// import '../scss/DoorOne.scss'

///////Tooltip//////////
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    // color: 'rgba(0, 0, 0, 0.87)',
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

//////////////////EndTolltip/////////////





function DoorsMain() {
  const [s, setS] = React.useState(null) //для цвета active
  const [color, setColor] = React.useState('') // в DoorMain _id нужного цвета



  const colorslist = useSelector((state) => state.colors);
  const { loading, colors } = colorslist;

  // // console.log(colors[0])
  // const aaa = Object.values(Object(colors[0]))
  // // aaa.filter(el)
  // console.log(aaa[0])
  // console.log(color)
  // console.log((Object.values(Object(colors[0]))[0]))





  const doorDetail = useSelector(state => state.doors)
  const { doors, isLoading, error } = doorDetail;

  const dispatch = useDispatch();


  React.useEffect(() => {
    dispatch(fetchColors())
    // if(colors){
      // setColor((Object.values(Object(colors[0]))[0]))
    // }
    

  }, [])

  const onClickColor = (colorId, i) => {
    dispatch(
      fetchColoredDoors({
        colorId
      })
    )
    setColor(colorId)
    setS(i)
  }


  return (
    <>
      <div>
        <h1>DoorsMain</h1>
        {
          loading ? (
            <LoadingBox></LoadingBox>
          ) : (

            <div className="colors-list">


              {colors.map((item, i) => (
                <li
                  className={s === i ? 'color color-active' : 'color'}

                  key={item._id}
                >
                  <LightTooltip title={item.colorName} placement="top">
                    <Link
                      //  className="product"
                      to={'/doors/colorId/' + item._id}>
                      <img
                        src={item.colorUrl}
                        onClick={() => onClickColor(item._id, i)}
                      />
                    </Link>

                  </LightTooltip>


                </li>
              ))}

            </div>

          )
        }
      </div>
      <div className="doors">
        <h2>Doors Page</h2>

        {/* <SearchBox
       text={searchText} setText={setSearchText}
       place_holder_text ='Найти название модели...'/> */}



        {
          isLoading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) :
            (

              <div>
                {/* <div>Выбрано: {searched_doors.length} шт.</div> */}

                <div className="products">
                  {
                    doors &&
                    doors.map((item) =>
                      <DoorMain key={item._id} door={item} color={color} />
                    )
                  }
                </div>
              </div>

            )
        }
      </div>
    </>


  )
}

export default DoorsMain
