
//import token
const jwt = require('jsonwebtoken');

userdetails = {
    1000: { acno: 1000, username: "Alan", password: 1001,balance:1000,transaction:[] },
    1001: { acno: 1001, username: "rahul", password: 1002 ,balance:1000,transaction:[]  },
  
    1002: { acno: 1002, username: "babu", password: 1003, balance: 1000,transaction:[]  },
}
signin=(acno, username, password) =>  {
  
    if (acno in userdetails) {
        return {
          status: 'false',
          statusCode:400,
          message: "user already registered"
           
      }

    }
    else {
      userdetails[acno] = {
        acno,
        username,
        password,
        balance: 0,
        transaction:[]
      }
     
      console.log(userdetails);
        return {
          status: 'true',
          statusCode:200,
            message:"signin sucessfull"
      }
      
    }
}
login=(acno, pswd)=> {

  if (acno in userdetails) {
    if (pswd == userdetails[acno]['password']) {
      currentUser = userdetails[acno]['username']
      currentacno = acno;

      const token = jwt.sign({
        currentacno: acno
      },'superkey2022')//to generate token
    
      return {
        status: 'true',
          statusCode:200,
        message: "login sucessfull",
        token:token
      }
    }
    else {
      return {
        status: 'false',
        statusCode:400,
          message:"incorrect password"
    }

    }
  }
  else {
    return {
      status: 'false',
      statusCode:400,
        message:"invalid userdetails"
  }

  }
}


deposit=(acno, pswd, amt)=> {
  var amount = parseInt(amt)

  if (acno in userdetails) {
    if (pswd == userdetails[acno]['password']) {
      userdetails[acno]['balance'] += amount;
      userdetails[acno]['transaction'].push({
        Type: 'Credit',
        Amount:amount
      })
      return {
        status: 'true',
          statusCode:200,
            message:`${amount} is credited and balance is ${userdetails[acno]['balance']}`
      }
    
      // console.log(userdetails);
      
      // return userdetails[acno]['balance']
    }
    else {
      // alert("password incorrect");
      return  {
        status: 'false',
        statusCode:400,
          message:"incorrect password"
    }

    }
  } else {
    // alert("invalid data");
    return  {
      status: 'false',
      statusCode:400,
        message:"invalid userdetails"
  }
  }
}

withdraw=(acno, pswd, amt)=> {
  var amount = parseInt(amt)
 
  if (acno in userdetails) {
    if (pswd == userdetails[acno]['password']) {
      if (userdetails[acno]['balance'] > amount) {
        userdetails[acno]['balance'] -= amount;
        userdetails[acno]['transaction'].push({
          Type: 'debit',
          Amount:amount
        })
        // this.savedetails();
        // console.log(userdetails);
        return  {
          status: 'true',
            statusCode:200,
              message:`${amount} is debited and balance is ${userdetails[acno]['balance']}`
        }
      
      }
      else {
        // alert("transaction failed")
        return {
          status: 'false',
          statusCode:400,
            message:"transaction failed"
      }
      }
    }
      else {
        // alert("password incorrect");
        return {
          status: 'false',
          statusCode:400,
            message:"incorrect password"
      }

      }
    } else {
      // alert("invalid data");

    return  {
      status: 'false',
      statusCode:400,
        message:"invalid data"
  }


    
    }
}

gettransaction = (acno) => {
 return {
    status: 'true',
      statusCode:200,
       transaction:userdetails[acno]['transaction']
  }
  // return this.userdetails[acno]['transaction']
}
module.exports = {
  signin,
  login,
  deposit,
  withdraw,
  gettransaction

  }
