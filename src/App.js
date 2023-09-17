import { useState } from "react";
import { db } from "./DataManager.js";



import './App.css';
import FormInput from './components/FormInput';

function App() {
  const [values, setValues] = useState({
    name      : "",
    nrc       : "",
    phNum     : "",
    ticketNum : "",
    transCode : ""
  })

  const inputs = [
    {
      id : 1,
      name: "name",
      type: "text",
      label : "အမည်",
      placeholder: "Name",
    },
    {
      id : 2,
      name: "nrc",
      type: "text",
      label : "မှတ်ပုံတင်",
      placeholder: "NRC"
    },
    {
      id : 3,
      name: "phNum",
      type: "text",
      label : "ဖုန်းနံပါတ်",
      placeholder: "Phone",
    },
    {
      id : 4,
      name: "ticketNum",
      type: "text",
      label : "ထီနံပါတ်",
      placeholder: "Ticket",
      errorMessage: "တစ်သောင်းမှလေးသောင်းထိသာ",
      pattern : "^[1-4]([0-9]{4})",
      required : true
    },
    {
      id : 5,
      name: "transCode",
      type: "text",
      label : "ငွေလွှဲကုဒ်နံပါတ်",
      placeholder: "Transaction Code",
      errorMessage: "format မမှန်ပါ",
      pattern : "[0-9]{14}", /* wave, kpay */
      required : true
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name : "abc",
      postal : 11223
    }

    //const res = await db.collection('cities').doc('LA').set(data);
      
      db.ref("Customers/"+values.ticketNum).set({
        name  : values.name,
        nrc   : values.nrc,
        phone : values.phNum,
        ticket: values.ticketNum,
        transactionCode : values.transCode
      }).then( () => {
        alert('Submitted')
      }).catch(error => {
        alert(error.message)
      })
    
  }

  const checkAvailable = async () => {
   const tickNum = '10000'
    console.log("Checking "+tickNum)
  
    db.ref("Customers/"+tickNum).get().then((snapshot)=>{
      const ticketData = snapshot.val();
      console.log("Hi " + JSON.stringify(ticketData))
    })
  }


  const handleChange = (e) => {
    setValues({...values, [e.target.name]:e.target.value})
  };

  // console.log(values)

  return (

    <div className="app">
      <form >
        <h1>အောင်ဘာလေဌီ</h1>
        {
          inputs.map((input) => (
            <FormInput 
              key={input.id} 
              {...input} 
              value={values[input.name]} 
              onChange={handleChange} 
              />
              ) )
            }
        <button onClick={handleSubmit}>ထိုးမည်</button>
      </form>
    </div>
  );
}

export default App;
