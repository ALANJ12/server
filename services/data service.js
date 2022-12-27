
//import token
const jwt = require('jsonwebtoken');
const db=require('../db')


userdetails = {
    1000: { acno: 1000, username: "Alan", password: 1001,balance:1000,transaction:[] },
    1001: { acno: 1001, username: "rahul", password: 1002 ,balance:1000,transaction:[]  },
    1002: { acno: 1002, username: "babu", password: 1003, balance: 1000,transaction:[]  },
}
const signin = (acno, username, password) => {
  return db.User.findOne({ acno })
    .then(user => {
      if (user) {
        return {
          status: false,
          statusCode: 400,
          message:"User already registered"
      }
      }
      else {
        const newUser = new db.User({
          acno: acno,
          username: username,
          password: password,
          balance: 0,
          transaction:[]
        })
        newUser.save();
        return {
          status: true,
          statusCode: 200,
          message:"register sucessfull"
        }
      }
  })
  
    // if (acno in userdetails) {
    //     return {
    //       status: 'false',
    //       statusCode:400,
    //       message: "user already registered"
           
    //   }

    // }
    // else {
    //   userdetails[acno] = {
    //     acno,
    //     username,
    //     password,
    //     balance: 0,
    //     transaction:[]
    //   }
     
    //   console.log(userdetails);
    //     return {
    //       status: 'true',
    //       statusCode:200,
    //         message:"signin sucessfull"
    //   }
      
    // }
}
const login = (acno, pswd) => {
  return db.User.findOne({ acno, password: pswd })
    .then(user => {
      if (user) {
        currentUser = user.username
        currentacno = acno
        const token = jwt.sign({
          currentacno: acno
        }, 'superkey2022')//to generate token
        return {
          status: 'true',
          statusCode: 200,
          message: "login sucessfull",
          token: token,
          currentUser:currentUser,
          currentacno:currentacno
        }
      
      }
      else {
        return {
          status: 'false',
          statusCode: 400,
          message: "invalid userdetails"
        }
      }
  })
}
// login=(acno, pswd)=> {

//   if (acno in userdetails) {
//     if (pswd == userdetails[acno]['password']) {
//       currentUser = userdetails[acno]['username']
//       currentacno = acno;

//       const token = jwt.sign({
//         currentacno: acno
//       },'superkey2022')//to generate token
    
//       return {
//         status: 'true',
//           statusCode:200,
//         message: "login sucessfull",
//         token:token
//       }
//     }
//     else {
//       return {
//         status: 'false',
//         statusCode:400,
//           message:"incorrect password"
//     }

//     }
//   }
//   else {
//     return {
//       status: 'false',
//       statusCode:400,
//         message:"invalid userdetails"
//   }

//   }
// }

const deposit=(acno, pswd, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({ acno, pswd })
    .then(user => {
      if (user) {
        user.balance += amount;
        user.transaction.push({
          Type: 'Credit',
          Amount:amount
          
        })
        user.save();
        return {
          status: 'true',
            statusCode:200,
              message:`${amount} is credited and balance is ${user.balance}`
        }
      }
      else {
        return { status: 'false',
        statusCode:400,
          message:"incorrect userdetails"
          
        }
      }
  })
}

// deposit=(acno, pswd, amt)=> {
//   var amount = parseInt(amt)

//   if (acno in userdetails) {
//     if (pswd == userdetails[acno]['password']) {
//       userdetails[acno]['balance'] += amount;
//       userdetails[acno]['transaction'].push({
//         Type: 'Credit',
//         Amount:amount
//       })
//       return {
//         status: 'true',
//           statusCode:200,
//             message:`${amount} is credited and balance is ${userdetails[acno]['balance']}`
//       }
    
//       // console.log(userdetails);
      
//       // return userdetails[acno]['balance']
//     }
//     else {
//       // alert("password incorrect");
//       return  {
//         status: 'false',
//         statusCode:400,
//           message:"incorrect password"
//     }

//     }
//   } else {
//     // alert("invalid data");
//     return  {
//       status: 'false',
//       statusCode:400,
//         message:"invalid userdetails"
//   }
//   }
// }
const withdraw = (acno, pswd, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({ acno, pswd })
    .then(user => {
      if (user) {
        if (user.balance > amount) {
          if (user.balance)
            user.balance -= amount;
          user.transaction.push({
            Type: 'debit',
            Amount: amount
          
          })
          user.save();
          return {
            status: 'true',
            statusCode: 200,
            message: `${amount} is debited and balance is ${user.balance}`
          }
        }
        else {
          return {
            status: 'false',
            statusCode: 400,
            message: "incorrect userdetails"
          
          }
        }
      }
      })

}

// withdraw=(acno, pswd, amt)=> {
//   var amount = parseInt(amt)
 
//   if (acno in userdetails) {
//     if (pswd == userdetails[acno]['password']) {
//       if (userdetails[acno]['balance'] > amount) {
//         userdetails[acno]['balance'] -= amount;
//         userdetails[acno]['transaction'].push({
//           Type: 'debit',
//           Amount:amount
//         })
//         // this.savedetails();
//         // console.log(userdetails);
//         return  {
//           status: 'true',
//             statusCode:200,
//               message:`${amount} is debited and balance is ${userdetails[acno]['balance']}`
//         }
      
//       }
//       else {
//         // alert("transaction failed")
//         return {
//           status: 'false',
//           statusCode:400,
//             message:"transaction failed"
//       }
//       }
//     }
//       else {
//         // alert("password incorrect");
//         return {
//           status: 'false',
//           statusCode:400,
//             message:"incorrect password"
//       }

//       }
//     } else {
//       // alert("invalid data");

//     return  {
//       status: 'false',
//       statusCode:400,
//         message:"invalid data"
//   }


    
//     }
// }
gettransaction = (acno) => {
  var amount = parseInt(amount)
  return db.User.findOne({ acno })
    .then(user => {
      if(user){
      return {
        status: 'true',
        statusCode: 200,
        transaction: user.transaction
      }
      // return this.userdetails[acno]['transaction']
      }
      else {
        return {
          status: "false",
          statusCode: 400,
          message:"user not found"
        }
    }})
user.save();}

// gettransaction = (acno) => {
//  return {
//     status: 'true',
//       statusCode:200,
//        transaction:userdetails[acno]['transaction']
//   }
//   // return this.userdetails[acno]['transaction']
// }
module.exports = {
  signin,
  login,
  deposit,
  withdraw,
  gettransaction

  }
