import React,{useState,useEffect} from "react";
import "../component/Table.css";

import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";



const GroupPage = ({group_id,group_name,total_group_amount,members}) => {
    // const id ="660f0aba2e85078af39d4696"
    // const [g_name,setGdetail] =useState({
    //     group_name:group_name,
    // })

    //for getting groups of particular user
    console.log(group_id,group_name,total_group_amount,members);
   


    return (
        <>
          <div className="container m-5">
            <Row>
            <h1 className="text-center"> {group_name}</h1>
              <div className="col m-3">
                <Card className="shadow">
                  <Table className="align-items-center" responsive="sm">
                    <thead className="thead-dark">
                      <tr className="table-dark">
                        <th>ID</th>
                        <th>Members</th>
                        {/* <th></th>
                        <th></th> */}
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
             
                      {members && members?.length > 0 ?  (
                        members.map((index,i) => {
                          return (
                            <>
                              <tr key={i}>
                                <td>{i+1}</td>
                               
                                <td >{members?.email}</td>
                                <td >{members?.members_amount}</td>
                                
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <span className="no_data text-center">NO Members present in group </span>
                      )}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
            <ToastContainer />
          </div>
        </>
      );
}

export default GroupPage
