    import React, { useEffect, useState } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { Card, CardContent, Grid, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
    import axios from 'axios';
    import img from '../../../assets/sliderimg.png';
    import './Home.css';
    import { addAccount } from '../../../redux/accountslice';
    import AddAccountDetails from './AddAccountDetails';

    const Home = () => {
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const { account, status, error } = useSelector((state) => state.account);
    const [accountAdded, setAccountAdded] = useState(false);

    //   useEffect(() => {
    //     // Fetch account details if needed
    //   }, [accountAdded]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddAccount = async (accountData) => {
        try {
        const token = localStorage.getItem('access_token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post('http://localhost:7100/account/add', accountData, config);
        dispatch(addAccount(response.data));
        setOpenDialog(false); 
        setAccountAdded(true); 
        } catch (error) {
        console.error('Error adding account details:', error);
        }
    };

    return (
        <div className='container'>
        <div className='slider'>
            <img src={img} alt="Slider Image" style={{ width: "100%" }} />
            <div className='slider-content'>
            <p>You may never get as rich as you could with other people's money and some luck, but the tradeoff is sleeping at night.</p>
            </div>
        </div>
        <div className='services'>
            <h2 style={{ color: "black" }}>Our Services</h2>
            {accountAdded ? (
            <Grid container spacing={2} style={{ padding: "10px" }}>
                <Grid xs={6}>
                <Card sx={{ margin: "10px" }}>
                    <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Business Consulting
                    </Typography>
                    <Typography color="text.secondary">
                        Our business consulting services offer tailored solutions to enhance your operations, improve efficiency, and drive growth. From strategic planning to market analysis, we provide the expertise you need to succeed.
                    </Typography>
                    </CardContent>
                </Card>
                </Grid>
                <Grid xs={6}>
                <Card sx={{ margin: "10px" }}>
                    <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Insurance Consulting
                    </Typography>
                    <Typography color="text.secondary">
                        Get expert advice on insurance products that best suit your needs. Whether it's life, health, or property insurance, we're here to guide you through the options and find the right coverage for you.
                    </Typography>
                    </CardContent>
                </Card>
                </Grid>
            </Grid>
            ) : (
            <div className="add-account-message">
                <p>Please add your account details to view our services.</p>
                <Button variant="contained" onClick={handleOpenDialog}>Add Account Details</Button>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add Account Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    <AddAccountDetails onAddAccount={handleAddAccount} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                </DialogActions>
                </Dialog>
            </div>
            )}
        </div>
        </div>
    );
    };

    export default Home;
