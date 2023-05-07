import React, { useEffect, useState, useStyles } from 'react';
import {Box} from "@mui/material";
import {info} from "../../info/Info";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from 'moment';

export default function Portfolio() {
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [data, setData] = useState([]);

    function handleFirstSelectChange(event) {
        setOption1(event.target.value);
      }
    
    function handleSecondSelectChange(event) {
        setOption2(event.target.value);
      }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
          option1,
          option2
        };
        axios.post(`http://localhost:3001/install`,{data})
            .then((response) => {
            console.log(response);
            })
            .catch((error) => {
            console.log(error);
            });
      };

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'3rem'}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="option1">edge_server_memory:</label>
                    <select id="option1" value={option1} onChange={handleFirstSelectChange}>
                        <option value="">edge_server_memory</option>
                        <option value="45">45</option>
                        <option value="55">55</option>
                        <option value="65">65</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="option2">edge_server_ip:</label>
                    <select id="option2" value={option2} onChange={handleSecondSelectChange}>
                        <option value="">edge_server_ip</option>
                        <option value="192.168.0.1">192.168.0.1</option>
                        <option value="192.168.0.2">192.168.0.2</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </Box>
    )
}
