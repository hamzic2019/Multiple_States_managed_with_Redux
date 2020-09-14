import {createStore, combineReducers} from 'redux';
import {v4 as uuid} from 'uuid';

// ADD EXPENSE
const addExpense = ({
  amount = 0, 
  note = '', 
  description = ''} = {}) => ({

  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    amount,
    description,
    note,
    createdAt: new Date().getTime()
  }
})
// Remove Expense
const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})
// EDIT EXPENSE
const editExpense = ({id, update} = {}) => ({
  type: 'EDIT_EXPENSE',
  id,
  update

})
// ADD TEXT FILTER
const setTextFilter = ({text = ''} = {}) => ({
  type: 'ADD_TEXT_FILTER',
  text
})
// SORT_BY_DATE
const setSortByDate = () => ({
  type: 'SORT_BY_DATE'
})
// SORT_BY_AMOUNT
const setSortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})
// SET_START_DATE
const setStartDate = ({date = undefined} = {}) => ({
  type:'SET_START_DATE',
  date

})
// SET_END_DATE
const setEndDate = ({date = undefined}) => ({
  type: 'SET_END_DATE',
  date
})

const filterReducerDefaultState = {
  text: '',
  sortBy: 'date', //amount,
  startDate: undefined,
  endDate: undefined
}

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch(action.type){
    case 'ADD_TEXT_FILTER':
      return {...state, text: action.text};
    case 'SORT_BY_DATE': 
      return {...state, sortBy: 'date'}
    case 'SORT_BY_AMOUNT':
      return {...state, sortBy: 'amount'}
    case 'SET_START_DATE': 
      return {...state, startDate: action.date}
    case 'SET_END_DATE':
      return {...state, endDate: action.date}
    default:
      return state;
  }
}

const expenseReducerDefaultState = []
const expenseReducer = (state = expenseReducerDefaultState, action) => {
  switch(action.type){
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return [...state.filter((exp) => action.id !== exp.id )];
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id === action.id){
          return {...expense, ...action.update};
        }else {
          return {...expense}
        }
      })

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


const d1 = store.dispatch(addExpense({amount: 5}  ));
const d2 = store.dispatch(addExpense({amount: 15} ));


// REMOVE STATE
//store.dispatch(removeExpense({id: d1.expense.id}))

// EDIT STATE
//store.dispatch(editExpense({id: d2.expense.id, update: {amount: 50, description: 'STA IMA JARANE?'}}))



// SET TEXT FILTER
store.dispatch(setTextFilter({text: 'rent a car'}))

store.dispatch(setSortByAmount());
store.dispatch(setStartDate({date: new Date('12 January 1996').getTime()}))