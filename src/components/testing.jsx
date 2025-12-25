import { useState } from "react"
import "./testing.css"


export default function Testing (){

    //hook is use for state management and functional components
    //useState - this use for declare a state variable in functional component
    //setCount = this is function that is used to update the state variable
    //count = this is the current value of the state variable
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Geeth");

    function increment(){
        setCount(count + 1);
        console.log(count);
    }

    function decrement(){
        setCount(count - 1);
        console.log(count);
    }

    function changeName(newName){
        setName(newName);
    }
    
    

    return (
        <div className="background">

        <h1>{name}</h1>
            <button className = "value" onClick={decrement}>-</button>

            <span> {count} </span>

            <button className = "value" onClick={increment}>+</button>
           
            <div className="role-buttons">
                <button onClick={() => changeName("Students")}>Students</button>
                <button onClick={() => changeName("Teachers")}>Teachers</button>
                <button onClick={() => changeName("Admin")}>Admin</button>
            </div>

        </div>
    )

}