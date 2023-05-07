import React, { useEffect, useState, useStyles } from 'react';
import Style from './About.module.scss';
import Terminal from "./Terminal";
import {Box} from "@mui/material";
import {info} from "../../info/Info";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from 'moment';

export default function About() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [data, setData] = useState([]);

    const handleChange = (date) => {
        setSelectedDate(date);
        fetchData(date);
      };
    //   `http://localhost:3001/data?date=${formattedDate}`
    const fetchData = (selectedDate) => {
        // axios.get(`http://localhost:3001/data`)
        // .then(response => {
        //     setData(response.data);
        // })
        // .catch(error => console.log(error));
        const formattedDate = selectedDate.toISOString().slice(0, 10);

        return axios.get(` http://localhost:3001/data?date=${formattedDate}`)
            .then(response => {
                    setData(response.data);
                })
            .catch((error) => console.log(error));
        //   .then((res: any) => {
        //     console.log(res);
        //  }).catch((err: any) => {
        //     console.log(err);
        //  })
    };

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'3rem'}>
            <div>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat="yyyy-MM-dd"
                />
                {data.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>data_time</th>
                                <th>data_data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                            <tr key={item.DATA_time}>
                                <td>{item.DATA_time}</td>
                                <td>{item.DATA_data}</td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No data available</p>
                )}
                </div>
        </Box>
    )
}