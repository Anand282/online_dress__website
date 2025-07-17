import React from 'react'
import { useState } from 'react'
import axios from 'axios';
const Report = () => {
    const [report,setReport] = useState({"email":"","name":"","number":"","message":""})
    const on_Change_ = (e)=>{
        setReport((report)=>{
            return {...report,[e.target.name]:e.target.value}
        })
    }
    const onsubmit__ = async(e)=>{
        e.preventDefault();
        try{
            if(report.email && report.name && report.number && report.message){  
                const response_data = await axios.post('https://online-dress-website.onrender.com/report',report);
                console.log(response_data);
                
                setReport(()=>{
                    return {"email":"","name":"","number":"","message":""}
                })
            }
            else{
                alert("fill details");
            }
        }
        catch(error){
            console.error("error adding report form",error);
        }
    }


    return (
        <>
            <div className='container mb-2 ' style={{"min-height":"80vh"}}>
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-12 col-lg-6 p-3'>
                        <h2>Report Form</h2>
                        <form action='' encType='multipart/form-data' onSubmit={onsubmit__}>
                            <div className='form-group mt-2'>
                                <label>Email Address:</label>
                                <input type='email' name='email' className='form-control' placeholder='enter your email' value={report.email} onChange={on_Change_} ></input>
                            </div>
                            <div className='form-group mt-2'>
                                <label>Name:</label>
                                <input type='name' name='name' className='form-control' placeholder='enter your name' value={report.name} onChange={on_Change_} ></input>
                            </div>
                            <div className='form-group mt-2'>
                                <label>Phone Number:</label>
                                <input type='number' name='number' className='form-control' placeholder='enter your number' value={report.number} onChange={on_Change_} ></input>
                            </div>
                            <div className='form-group mt-2'>
                                <label>:</label>
                                <textarea  name='message' className='form-control' placeholder='enter your message' cols='10' rows='5' value={report.message} onChange={on_Change_} ></textarea>
                            </div>
                            <button className='btn btn-primary px-3'>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report