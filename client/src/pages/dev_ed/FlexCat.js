// import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import LoadingBox from '../../components/my/LoadingBox';
// import MessageBox from '../../components/my/MessageBox';
// import { createCat, listCats } from '../../redux/actions/categoryA';
// import '../../scss/flex.scss'







// function DevRdReactToDo() {
//   const [category_new, setCategoryNew] = useState('');

//   const dispatch = useDispatch();
//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(createCat(category_new));
//   }
//   const catRegister = useSelector(state => state.catCreate);
//   const { loading, catMessage, error } = catRegister;

//   // SET//////
//   const set = new Set([1, 1, 2, 2, 2, 2, 6, 7, 8, 8, 8, 8, 8, 8])
//   // console.log(set)
  
//   function uniqValue (arr) {
//     return [... new Set(arr)]
//   }
//   // console.log(uniqValue([1,1,12,2,4,57,77,7,7,7,7,7,8]))

//   var array = 
//     [
//         {"name":"Joe", "age":17}, 
//         {"name":"Bob", "age":17}, 
//         {"name":"Carl", "age": 35}
//     ]

//   const unique = [...new Set(array.map(item => item.age))];
//    console.log('uniq',unique)

//   //////////////////////////////
//   return (
//     <>
//       <div>
//         <div className="raz" id="raz9">
//           <div>11</div>
//           <div>2222</div>
//           <div>33333333</div>
//         </div>

//         {/* <div class="raz" id="raz10">
//           <div></div>
//           <div></div>
//         </div> */}
//       </div>
//       {/* //////////////////////////// */}
//       <div className="form">
//         <form onSubmit={submitHandler}>
//           <ul className="form-container">
//             <li>
//               <h2>Create Category</h2>
//             </li>
//             <li>
//               {loading && <div>Loading...</div>}
//               {error && <div style={{ background: 'red', display: 'inline' }}>{error}</div>}
//               {catMessage && <div style={{ background: 'green', display: 'inline' }}>{catMessage.message}</div>}
//             </li>
//             <li>
//               <label htmlFor="name"> New Category:</label>
//               <input
//                 type="text"
//                 name="category_new"
//                 value={category_new}
//                 id="category_new"
//                 onChange={(e) => setCategoryNew(e.target.value)}
//               ></input>
//             </li>
//             <li>
//               <button type="submit" className="button primary">Register</button>
//             </li>


//           </ul>
//         </form>
//       </div>
//     </>
//   )
// }
// export default DevRdReactToDo
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function CustomizedTooltips() {
  return (
    <div>
      <LightTooltip title="Add">
        <Button>Light</Button>
      </LightTooltip>
      <BootstrapTooltip title="Add">
        <Button>Bootstrap</Button>
      </BootstrapTooltip>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">Tooltip with HTML</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      >
        <Button>HTML</Button>
      </HtmlTooltip>
    </div>
  );
}
