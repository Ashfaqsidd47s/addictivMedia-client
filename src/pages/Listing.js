import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./listing.css";
import axios from "axios";
import moment from "moment";

function Listing() {
    const PF = "http://localhost:8800/files/";
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        const fetchUsers = async ()=>{
            try {
                const res = await axios.get("http://localhost:8800/users");
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUsers();
    },[]);

    const alphabeticSort =async (e)=>{
        try {
            const res = await axios.get("http://localhost:8800/users/sortalpha");
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const dateSortDesc =async (e)=>{
        try {
            const res = await axios.get("http://localhost:8800/users/sortdatedesc");
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const dateSortAsc =async (e)=>{
        try {
            const res = await axios.get("http://localhost:8800/users/sortdateasc");
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handelDelete = async (id)=>{
        try {
            const res = await axios.delete("http://localhost:8800/users/"+id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    console.log(users)
  return (
    <div className="listing">
        <h1>Listing Page</h1>
        <Link to="/" >
            <button className="inputPageBtn">Input Page</button>
        </Link>
        <div className="listWrapper">
            <div className="listHeading">
                <div className="headdingTop">
                    <div className="filter">
                        <h3>filter</h3>
                        <button onClick={alphabeticSort}>Alphabetically</button>
                        <button onClick={dateSortDesc}>latest submission</button>
                        <button onClick={dateSortAsc}>oldest submission</button>
                    </div>
                </div>
                <ul className="headdingBottom">
                    <li>Name</li>
                    <li>Date of Birth</li>
                    <li>Country</li>
                    <li>Submitted on</li>
                    <li>Resume</li>
                    <li>Delete</li>
                </ul>
            </div>
            <div className="listContainer">
                {users.map((user)=> (
                    <div key={user.id} className="listItem">
                        <div className="userName">{user.name }</div>
                        <div className="userDob">{moment(user.dob).format("DD-MM-YYYY")}</div>
                        <div className="userCountry">{user.country}</div>
                        <div className="submittion">
                            <p>{moment(user.createdat).format("HH:mm:ss")}</p>
                            <h5>{moment(user.createdat).format("DD-MM-YYYY")}</h5>
                        </div>
                        <div className="viewResume"><a href={PF +user.resume} target="_blank">{user.resume}</a></div>
                        <div className="download">Download</div>
                        <button onClick={()=> handelDelete(user.id)} className="delete">delete</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Listing;
