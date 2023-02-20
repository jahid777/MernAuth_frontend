// import React, { useEffect, useRef, useState } from "react";

// const ResetPassword = () => {
//   const passwordChangeRef = useRef();
//   const confirmPasswordRef = useRef();
//   const [msg, setMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [sessionGmailVlaue, setSessionGmailValue] = useState("");

//   //get the gmail that comes form fortotpassword gmail localStroage stroage
//   useEffect(() => {
//     const value = localStorage.getItem("reset_email");
//     setSessionGmailValue(value);
//   }, []);

//   const handleEditPass = async (e) => {
//     e.preventDefault();

//     const editPass = { password: passwordChangeRef.current.value };

//     fetch(`https://server.gynecologybooks.org/editPass/${sessionGmailVlaue}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(editPass),
//     })
//       .then((res) => {
//         if (res.ok) {
//           passwordChangeRef.current.value = "";
//           return res.json();
//         } else {
//           throw new Error("Error updating password");
//         }
//       })
//       .then((result) => {
//         console.log(result);
//         setMsg("Password updated successfully!");
//       })
//       .catch((error) => {
//         console.error(error);
//         setErrorMsg(
//           "An error occurred while updating the password. Please try again."
//         );
//       });
//   };
//   return (
//     <div>
//       {/* reset Password */}
//       <form className="mt-5 container" onSubmit={handleEditPass}>
//         <input
//           type="password"
//           className="form-control mb-3"
//           placeholder="Type Your New Password"
//           ref={passwordChangeRef}
//           required
//         />
//         {/* <input
//           type="password"
//           className="form-control mb-3"
//           placeholder="Confirm Your Password"
//           ref={confirmPasswordRef}
//         /> */}

//         <p style={{ color: "green", fontWeight: "bold" }}>{msg}</p>

//         <p style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>

//         <button type="submit" className="mt-3 btn btn-primary">
//           SUBMIT PASSWORD
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useEffect, useRef, useState } from "react";

const ResetPassword = () => {
  const passwordChangeRef = useRef();
  const passwordConfirmRef = useRef();
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sessionGmailVlaue, setSessionGmailValue] = useState("");

  useEffect(() => {
    const value = localStorage.getItem("reset_email");
    setSessionGmailValue(value);

    const timer = setTimeout(() => {
      localStorage.removeItem("reset_email");
      setSessionGmailValue("");
      setErrorMsg("Your session has expired. Please try again.");
    }, 120000);

    return () => clearTimeout(timer);
  }, []);

  const handleEditPass = async (e) => {
    e.preventDefault();

    if (!sessionGmailVlaue) {
      setErrorMsg("Your session has expired. Please try again.");
      return;
    }

    const password = passwordChangeRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    if (password !== passwordConfirm) {
      setErrorMsg("Password and confirm password do not match.");
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
      return;
    }

    const editPass = { password };

    fetch(`https://server.gynecologybooks.org/editPass/${sessionGmailVlaue}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editPass),
    })
      .then((res) => {
        if (res.ok) {
          passwordChangeRef.current.value = "";
          passwordConfirmRef.current.value = "";
          return res.json();
        } else {
          throw new Error("Error updating password");
        }
      })
      .then((result) => {
        console.log(result);
        setMsg("Password updated successfully!");
        setTimeout(() => {
          setMsg("");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setErrorMsg(
          "An error occurred while updating the password. Please try again."
        );
      });
  };

  return (
    <div>
      <form className="mt-5 container" onSubmit={handleEditPass}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Type Your New Password"
          ref={passwordChangeRef}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Your New Password"
          ref={passwordConfirmRef}
          required
        />

        <p style={{ color: "green", fontWeight: "bold" }}>{msg}</p>

        <p style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>

        <button type="submit" className="mt-3 btn btn-primary">
          SUBMIT PASSWORD
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
