
function maskPassword(pass){
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str  += "*"
    }
    return str
}
function unmaskPassword(pass){
    alert(`Unamask USN is running => ${pass}`)

    showPasswords()
}

// function copyText(txt) {
//     navigator.clipboard.writeText(txt).then(
//         () => {
//           /* clipboard successfully set */
//           document.getElementById("alert").style.display = "inline"
//           setTimeout(() => {
//             document.getElementById("alert").style.display = "none"
//           }, 2000);

//         },
//         () => {
//           /* clipboard write failed */
//           alert("Clipboard copying failed")
//         },
//       );
//   }

const deletePassword = (website)=>{
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e)=>{
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert(`Successfully deleted ${website}`)
    showPasswords()

}
const fine = (returnDate)=>{
    let data = localStorage.getItem("returnDate")
    // let arr = JSON.parse(data);
    // arrUpdated = arr.filter((e)=>{
    //     return e.website != website
    // })
   // localStorage.setItem("passwords", JSON.stringify(arrUpdated))
   const currentDate = new Date();
  const returnDateObj = new Date(returnDate);
  
  // Calculate the difference in days
  const timeDiff = currentDate.getTime() - returnDateObj.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Calculate the fine amount (1 rupee per day)
  const fineAmount = daysDiff * 1 - 1 ;

  alert(`Fine amount is ${fineAmount} rupees.`);

}

// Logic to fill the table
const showPasswords = () => {
    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No Data To Show"
    }
    else {
        tb.innerHTML =  `<tr>
        <th>Book name</th>
        <th>Book id</th>
        <th>USN</th>
        <th>Return date</th>
        <th>Delete book</th>
        <th>show USN</th>
        <th>Get fine</th>
        
    </tr> `
        let arr = JSON.parse(data);
        let str = ""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
    <td>${element.website} 
    </td>
    <td>${element.username}
    </td>
    <td>${maskPassword(element.password)}
    </td>
    <td>${element.returnDate}
    </td>
    
    <td><button class="btn" onclick="deletePassword('${element.website}')">Delete</button></td>
    <td><button class="btn" onclick="unmaskPassword('${element.password}')">Unmask USN</button></td>
    <td><button class="btn" onclick="fine('${element.returnDate}')">Fine</button></td>
        </tr>`
        }
        tb.innerHTML = tb.innerHTML + str

    }
    website.value = ""
    username.value = ""
    password.value = ""
    returnDate.value=""
}

console.log("Working");
showPasswords()
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("Clicked....")
    console.log(username.value, password.value)
    let passwords = localStorage.getItem("passwords")
    console.log(passwords)
    if (passwords == null) {
        let json = []
        json.push({website: website.value, username: username.value, password: password.value })
        alert("Book Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ website: website.value, username: username.value, password: password.value,returnDate: returnDate.value })
        alert("Book saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showPasswords()
})
