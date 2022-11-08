import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Countries from '../data/country';
import "./input.css";


function Input() {
    const [name,setName] = useState("");
    const [dob,setDob] = useState({});
    const [query, setQuery] = useState("");
    const [resume,setResume] = useState(null);

    const handelSubmit =async (e)=>{
        e.preventDefault();
        const values = {
            name: name,
            dob: moment(dob).format("YYYY-MM-DD"),
            country: query,
        }
        if(resume){
            const data =new FormData();
            const filename = Date.now() +resume.name;
            data.append("name",filename);
            data.append("file",resume);
            values.resume = filename;
            try {
                await axios.post("http://localhost:8800/users/upload", data)
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.post("http://localhost:8800/users", values);
            console.log(res.data);
            window.location.replace("/listing");
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className="input">
        <h1>Input Page</h1>
        <Link to="/listing" >
            <button className="listingPageBtn">Listing Page</button>
        </Link>
        <form 
            className="formContainer"
            onSubmit={handelSubmit}
        >
            <div className="inputItem">
                <label htmlFor="nameInput">Name</label>
                <input 
                    type="text" 
                    id="nameInput" 
                    required={true}
                    onChange={(e)=> setName(e.target.value)}
                />
            </div>
            <div className="inputItem">
                <label htmlFor="dateInput">Date of birth</label>
                <input 
                    type="date" 
                    id="dateInput"
                    required={true} 
                    onChange={(e)=> setDob(e.target.value)}
                />
            </div>
            <div className="inputItem" id="multiInput">
                <label htmlFor="countryInput">Country</label>
                <input type="text" id="countryInput" 
                    placeholder="country"
                    required={true}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
            </div>
            <ul className="countryContainer">
                {Countries.filter((country) => 
                    country.toLowerCase().includes(query)
                ).map((country) => (
                    <li className="country" onClick={(e)=> setQuery(country)}>{country}</li>
                ))}
            </ul>
            <div className="inputItem">
                <label htmlFor="resumeInput">Resume</label>
                <input 
                    type="file" 
                    id="resumeInput" 
                    onChange={(e)=> setResume(e.target.files[0])}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Input;