import {createStore, combineReducers} from 'redux';
import {v4 as uuid} from 'uuid';

// ADD EXPENSE
const addExpense = ({
  amount = 0, 
  note = '', 
  description = '', 
  createdAt = 0} = {}) => ({

  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    amount,
    description,
    note,
    createdAt
  }
})
// Remove Expense
// EDIT EXPENSE
// ADD TEXT FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

const filterReducerDefaultState = {
  text: '',
  sortBy: 'date', //amount,
  startDate: undefined,
  endDate: undefined
}

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch(action.type){
    default:
      return state;
  }
}

const expenseReducerDefaultState = []
const expenseReducer = (state = expenseReducerDefaultState, action) => {
  switch(action.type){
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer
  })
);


const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
})


store.dispatch(addExpense({amount: 5}  ));
store.dispatch(addExpense({amount: 15} ));