import{createStore} from 'redux';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
/* <Provider store={store}> 사용할부분 감싸기
    <div></div>
    </Provider> 
    const number = userSelector((state) => state.number);
    <h3>{number}</h3>
    ...
    const dispatch = useDispatch();
    <button onClick={()=>{dispatch({type:'plus'})}}>
    </button>
    */
function reducer(currentState, action){
    const newState = {...currentState};
    if(action.type === 'plus'){
        newState.number++;
    }
    return newState;
}
const store = createStore(reducer);
export default store;
