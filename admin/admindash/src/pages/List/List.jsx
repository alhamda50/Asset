import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

const List = () => {

  const url = 'http://localhost:4000'
  const [list, setList] = useState([]);

  const fetchlist = async () => {
    const response = await axios.get(`${url}/api/medicine/list`);
    // console.log(response.data)
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("error");

    }
  }

  useEffect(() => {
    fetchlist()
  }, [])

  // const removemed = async (medId) => {
  //   try {
  //     const response = await axios.post(`${url}/api/medicine/remove`, { id: medId });

  //     // Check if deletion was successful
  //     if (response.data.success) {
  //       toast.success("Medicine removed successfully!");
  //       fetchlist(); // Refresh the list only if deletion was successful
  //     } else {
  //       toast.error("Failed to delete medicine.");
  //     }
  //   } catch (error) {
  //     console.error("Error removing medicine:", error);
  //     toast.error("An error occurred while trying to delete the medicine.");
  //   }
  // };

  const removemed = async (medId) => {
    
      const response = await axios.delete(`${url}/api/medicine/remove`, { data: { id: medId } }); // Check if deletion was successful 
      if (response.data.success) {
        toast.success("Item removed successfully!");
        fetchlist(); // Refresh the list only if deletion was successful 
      } else {
        toast.error("Failed to delete.");
      }
  };


  return (
    <div>
    <Navbar/>
    <hr />
      <div className="app-content">
        <Sidebar/>
    <div className='list add flex-col'>
      <p>All Item List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className='cross' onClick={() => removemed(item._id)}>x</p>
            </div>
          )
        })}
      </div>
      </div>
    </div>

    </div>
  )
}

export default List
