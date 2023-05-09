import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Style from './Home.module.scss';
import {Button} from 'react-bootstrap';
import classNames from 'classnames';
import EmojiBullet from "./EmojiBullet";
import SocialIcon from "./SocialIcon";
import {Box} from "@mui/material";
import {info} from "../../info/Info";
import { Chart } from "react-google-charts";

export default function Home() {
   const [data1, setData1] = useState([]);
   const [data2, setData2] = useState([]);
   
   const [num1, setnum1] = useState('');
   const [num2, setnum2] = useState('');

   const [option1, setOption1] = useState('');
   const [option2, setOption2] = useState('');

   const handleSubmit = async (event) => {
   //   event.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:3001/num1', { num1 });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const handleSubmit_2 = async (event) => {
   //   event.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:3001/num2', { num2 });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

   useEffect(() => {
      axios.get(`http://localhost:3001/edge_server_data_1`)
         .then(response => {
                  setData1(response.data);
                  console.log(data1.edge_server_memory);
               })
         .catch((error) => console.log(error));

      axios.get(`http://localhost:3001/edge_server_data_2`)
         .then(response => {
                  setData2(response.data);
               })
         .catch((error) => console.log(error));
   },[]);


   return (
      // <div style="border: 1px solid black; float: left; padding: 10px; width: 49%;">
      //     <h1>1번 edge_server 내용</h1>
      // </div>
      <Box component={'main'}  flexDirection={{xs: 'column', md: 'row'}}/*alignItems={'center'}*/
           /*justifyContent={'center'}*/ minHeight={'calc(100vh - 175px)'}>
         {/* <Box className={classNames(Style.avatar, Style.shadowed)} alt={'image of developer'} style={{background: info.gradient}} component={'img'} src={me} width={{xs: '35vh', md: '40vh'}}
              height={{xs: '35vh', md: '40vh'}}
              borderRadius={'50%'} p={'0.75rem'} mb={{xs: '1rem', sm: 0}} mr={{xs: 0, md: '2rem'}}/> */}
         <div style={{boxShadow: '0 10px 20px rgba(0,0,0,0.19)', float: 'left', padding: '10px', width: '30%', marginLeft: '15%', paddingTop: '30px' }}>
            <h2>1번 기지국</h2>
            <h2><br/></h2>
               {data1.map((item) => (
                  <Chart
                  chartType="PieChart"
                  data={[
                     ['Category', 'Value'], 
                     ['edge_server_memory', item.edge_server_memory], 
                     ['edge_server_data', item.edge_server_data]
                  ]}
                  width="100%"
                  height="400px"
               />
               ))}
            <table className = "edge_server_1">
               <tbody>
                  {data1.map((item) => (
                     <tr key={item.data_time}>
                        <tr>
                           <th>기지국 이름</th>
                           <td>{item.edge_server_name}</td>
                           </tr>
                        <tr>
                           <th>기지국 아이피</th>
                           <td>{item.edge_server_ip}</td>
                           </tr>
                        <tr>
                           <th>기지국 컴퓨팅 리소스</th>
                           <td>{item.edge_server_memory}</td>
                           </tr>
                        <tr>
                           <th>기지국에 연결된 client 수</th>
                           <td>{item.edge_server_data}</td>
                           </tr> 
                     </tr>
                     ))}
               </tbody>
            </table>
            <h2><br/></h2>
            <div className = {Style.submitbutton}>
               <form onSubmit={handleSubmit}>
                  <label>
                  데이터 수:
                  <input type="text" value={num1} onChange={(event) => setnum1(event.target.value)} />
                  </label>
                  <button type="submit">변경</button>
                  </form>
            </div>
         </div>
         {/* <div style = {{ float: 'left', padding: '10px', width: '6%', marginLeft: '0%', paddingTop: '30px'}}>
            <h2><br/></h2>
            <h2><br/></h2>
            <table>
               <tbody>
                     <tr>
                        <tr><th>edge_server_name</th></tr>
                        <tr><th>edge_server_ip</th></tr>
                        <tr><th>edge_server_memory</th></tr>        
                     </tr>
               </tbody>
            </table>
         </div> */}
         <div style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.19)', float: 'right', padding: '10px', width: '30%', marginRight: '15%', whiteSpace: 'pre-wrap', paddingTop: '30px'  }}>
            <h2>2번 기지국</h2>
            <h2><br/></h2>
            {data2.map((item) => (
                  <Chart
                  chartType="PieChart"
                  data={[
                     ['Category', 'Value'], 
                     ['edge_server_memory', item.edge_server_memory], 
                     ['edge_server_data', item.edge_server_data]
                  ]}
                  width="100%"
                  height="400px"
               />
               ))}
            <table className = "edge_server_1">
               <tbody>
                  {data2.map((item) => (
                     <tr key={item.data_time}>
                        <tr>
                           <th>기지국 이름</th>
                           <td>{item.edge_server_name}</td>
                           </tr>
                        <tr>
                           <th>기지국 아이피</th>
                           <td>{item.edge_server_ip}</td>
                           </tr>
                        <tr>
                           <th>기지국 컴퓨팅 리소스</th>
                           <td>{item.edge_server_memory}</td>
                           </tr>
                        <tr>
                           <th>기지국에 연결된 client 수</th>
                           <td>{item.edge_server_data}</td>
                           </tr> 
                     </tr>
                     ))}
               </tbody>
            </table>
            <h2><br/></h2>
            <div className = {Style.submitbutton}>
               <form onSubmit={handleSubmit_2}>
                  <label>
                  데이터 수:
                  <input type="text" value={num2} onChange={(event) => setnum2(event.target.value)} />
                  </label>
                  <button type="submit" style = {{right: 0}}>변경</button>
                  </form>
            </div>
         </div>
      </Box>
   )
}