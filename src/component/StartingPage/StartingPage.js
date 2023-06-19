import classes from './StartingPage.module.css'
import React,{Fragment,  useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom'
// import AuthContext from '../../store/auth-context';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
// import ProfilePage from './ProfilePage';
import { useDispatch,useSelector } from 'react-redux';
import { authActions } from '../../store/Authentication';
import { expenseActions } from '../../store/Expenses';
import {saveAs} from 'file-saver'

const StartingPage=()=>{
  const history=useHistory()
  // const authCtx=useContext(AuthContext)
  // const [items,setItems]=useState([])
  const [editItem, setEditItem]=useState(null)

  const receivedData=useSelector(state=>state.expense?.data)


  const dispatch = useDispatch()
  const token = useSelector(state => state.authentication.token)

  const premium = useSelector(state => state.expense.showPremium)
  let [isPremiumClicked, setIsPremiumClicked]=useState(false)




  const routeChange=()=>{
    history.push('/home/profile')
  }

  const verification = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDQkJzMSxna8JiN6hDqpbwqZkH5J9uSN4s",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken:token,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            if (data.error.message) {
              alert(data.error.message);
            }
          });
        }
      })
      .then((data) => {
        console.log('received data ',data)
      })
      .catch((err) => console.log(err));
    }
     
    const logoutHandler=()=>{
      // authCtx.logout()
      dispatch(authActions.logout())
      localStorage.removeItem("darktheme");
      localStorage.removeItem("isPremiumClicked");
      history.replace('/')
    }

    // const saveExpenseDataHandler = (expense) => {
    //   setItems((prev) => [...prev, expense]);
    // };

//     const getExpense = useCallback(async() => {
//       const response = await fetch(
//         "https://expense-auth-ce2b3-default-rtdb.firebaseio.com/expenses.json"
//       )
//       const data = await response.json()
//       console.log(data)

//       const loadedExpenses = []

//       for (const key in data) {
//         loadedExpenses.push({
//           id : key,
//           amount : data[key].amount,
//           description : data[key].description,
//           category : data[key].category
//         })
//       }

//       setItems(loadedExpenses)

//     },[])


// useEffect(() => {
//   getExpense()
// },[getExpense])

//   const deleteHandler = id => {
//   console.log('received', id)

//   setItems(prev => {
//     const updatedExpense = prev.filter(item => item.id !== id)
//     return updatedExpense
//   })
// }

const editHandler =key => {
  console.log('received editing id ',key)
  setEditItem(key)

}


const changeToDark = () => {
  dispatch(expenseActions.toggle())
}

const downloadFile = () => {
  const csv =
      "Category,Description,Amount\n" +
      Object.values(receivedData)
        .map(
          ({ category, description, amount }) =>
            `${category},${description},${amount}`
        )
        .join("\n");

    // Create a new blob with the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Save the blob as a file with the name "expenses.csv"
    saveAs(blob, "expenses.csv")
}


useEffect(() => {
  const premiumClickedStatus = localStorage.getItem("isPremiumClicked");
  if (premiumClickedStatus) {
    setIsPremiumClicked(JSON.parse(premiumClickedStatus));
  }
}, []);

useEffect(() => {
  localStorage.setItem("isPremiumClicked", JSON.stringify(isPremiumClicked));
}, [isPremiumClicked]);



const activatePremium = () => {
  localStorage.setItem('isPremiumClicked', true)
  window.location.reload()
}

    return (
      <Fragment>
      <div className={classes.header}>
        <h4>Welcome to Expense Tracker !!!</h4>
        <button onClick={verification} className={classes.email}>Verify Email</button>
        {premium &&  (
            <button className={classes.premium} onClick={activatePremium}>
              Activate premium
            </button>
          )}
        <button onClick={logoutHandler} className={classes.logout}>Logout</button>
        {premium && isPremiumClicked && (
            <button className={classes.toggle} onClick={changeToDark}>
              Toggle dark/light Theme
            </button>
          )}
          {premium && isPremiumClicked && (
            <button className={classes.download} onClick={downloadFile}>
              Download Expense
            </button>
          )}
        <span>Your Profile is Incomplete. <button onClick={routeChange}>Complete now</button></span>
      </div>
      <ExpenseForm  editItem={editItem}/>
      <ExpenseList onEdit={editHandler}/>
    </Fragment>
      
      );
}
export default StartingPage;