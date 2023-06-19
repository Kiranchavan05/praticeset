import React, { Fragment, useRef } from "react";
import classes from './ResetPassword.module.css'

const ResetPassword = () => {
    const inputEmail = useRef()

    const submitHandler = (event) => {
        event.preventDefault()
        const enteredEmail = inputEmail.current.value

        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDQkJzMSxna8JiN6hDqpbwqZkH5J9uSN4s",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: enteredEmail
            }),
            headers: {
              "content-type": "application/json",
            },
          }
        )
          .then((res) => {
            console.log(res);
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => alert(data.error.message));
            }
          })
          .then((data) => {
            console.log("received data ", data);
          })
          .catch((err) => console.log(err));
    }

    return <Fragment>
        <form onSubmit={submitHandler} className={classes.form}>
            <h1>Reset Password</h1>
            <label>Enter the Email which you have registered</label>
            <input type='email' id='email' ref={inputEmail} required />
            <button>Send Link</button>
        </form>
    </Fragment>
}

export default ResetPassword