
import _ from 'lodash';
//Actions 
let nextTodoId = 0;
let productId=0;
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}
export const addProduct = (data) => {
  return {
    type: 'ADD_PRODUCT',
    id: productId++,
    data
  }
}

export const deleteTodo = (text) => {
  return {
	  type: 'DELETE_TODO',
      text
  }
}
export const deleteProduct = (data) => {
  return {
    type: 'DELETE_PRODUCT',
    data
  }
}


//reducer
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
	//console.log(action);
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'DELETE_TODO':
     let Index = _.findIndex(state,{text:action.text})
	 state.splice(Index,1)
	 return [...state]
	case 'ADD_PRODUCT':
		console.log('action',action);
		let productData=[];
		 return [
        ...state,
        {
          id: action.id,
          data: action.data,
        }
      ]
	  case 'DELETE_PRODUCT':
     let index = _.findIndex(state,{data:action.data})
	 state.splice(index,1)
	 return [...state]
    default:
      return state
  }
}

export default todos