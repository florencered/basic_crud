
import './App.css';
//importing database from firestore 
import {db} from "./FirebaseConfig" 
import { useState,useEffect } from 'react'; 
import {collection,getDocs,addDoc,updateDoc,doc,deleteDoc} from "firebase/firestore";
function App() { 
  // we  need to update the state or info about users so use state is used 
  const [users,setUsers]=useState([]); 
  //need to specify the database name and the table(collection name) stored in it 
  //variable which refers to the concerned database and collection/table
  //we need to update the user info as soon as he enters the page so 
  //we will use useEffect hook 
const usersCollectionRef = collection(db, "users"); 
//for updating the content from ui to firestore 
const [newName,setNewName]=useState("");
const [newAge,setNewAge]=useState(0); 
const [input,setNewInput]=useState(false);

const createUser=async ()=>{ 
    // addDoc(`the variable representing the db and 
    //collection we want to add our data to`,
    //`the values collection should be taking`)
    await addDoc(usersCollectionRef,{name:newName,age:newAge});
}; 
const modifyAge= ()=>{
   setNewInput(!input);  
}


//update user 
const updateUser=async (id,age)=>{   
  const userDoc = doc(db, "users", id);
  const newFields = { age:newAge}; 
  await updateDoc(userDoc, newFields);
};
//delete user 
const deleteUser=async (id)=>{
  const userDoc = doc(db, "users", id); 
  await deleteDoc(userDoc);
};
useEffect(() => {
  const getUsers = async () => {
    const data= await getDocs(usersCollectionRef);
    //get the overall data for a specific collection
    console.log(data)
    //obtain the value of the elements stored in collection
    data.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    }); 
//update the use state 
//map returns an array,we use it when we need to add something to an existing array for each element
setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
  };
    
    getUsers();
  }, []);
  return (
    <div className="App"> 
    {/* //display the collecction credentials to the user */} 
    {/* //need to modify the users state */}  
    {/* //we need a diff div if need to print multiple mapped elements */}
  {/* //add/update operation */} 
  <h2 style={{textAlign:"center"}}>PLEASE REFRESH THE PAGE TO NOTICE THE RESULTS</h2>
  <input type='text' placeholder='enter your name' onChange={(e)=>setNewName((e.target.value))}/>
  <input type='number' placeholder='enter age' onChange={(e)=>setNewAge(Number(e.target.value))}/> 
  <button onClick={createUser}>CREATE USER</button>
  {
    users.map((item)=>
    <div>
    <h1>Name:{item.name}</h1>
    <h1>Age:{item.age}</h1> 
    {/* <button onClick={()=>{updateUser(item.id,item.age)}}>INCREASE AGE</button>  */}
    <button onClick={ modifyAge}>MODIFY AGE</button>
    {input&&(
      <div>
      <input type='number' placeholder='enter new age'  onChange={(e)=>setNewAge(Number(e.target.value))} /> 
      <button onClick={()=>{updateUser(item.id,item.age)}}>ENTER</button> 
      </div>
    )
  }
    <button onClick={()=>deleteUser(item.id)}>DELETE USER</button>
    </div>
    )
  }
      
    </div>
  );
}

export default App;
