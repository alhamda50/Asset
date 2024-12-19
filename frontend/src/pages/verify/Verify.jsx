import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StoreContext } from '../../Context/Storecontext';
import './Verify.css'
import axios from 'axios';

const Verify = () => {
    // Directly destructure the params object to get the parameters
    const { success, orderId } = useParams();

    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifypayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        if (response.data.success) {
            navigate('/myorders');
        } else {
            navigate('/');
        }
    };

    useEffect(() => {
        verifypayment();
    }, []);

    return (
        <div>
            <div className="verify">
                <div className="spinner">
                    {/* Add your spinner animation here */}
                </div>
            </div>
        </div>
    );
};

export default Verify;
