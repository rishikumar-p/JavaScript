function getData(uId) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            const error = true;
            if(error){
                reject(new Error("Error Occured"));
            } else{
                console.log("Fetched the data!");
                resolve("skc@gmail.com");
            }
        }, 4000);
    }
)}
    
console.log("start");
const email = getData("skc");
email.then((emailId) => {
    console.log("Email id of the user id is: " + emailId)
});
console.log("end");