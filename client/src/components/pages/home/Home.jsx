// import React from 'react';
// import img from '../../../assets/sliderimg.png'
// import './Home.css';
// import { Card, CardContent, Grid, Typography } from '@mui/material';

// const Home = () => {
//     return (
//         <div className='container' >
//             <div className='slider'>
//                 <img src={img} alt="Slider Image" style={{ width: "100%" }} />
//                 <div className='slider-content'>
//                     <h2>Slider Content</h2>
//                     <p>This is some content overlaid on the slider image.</p>
//                 </div>
//             </div>
//             <div className='services'>
//                 <h2 style={{ color: "black" }}>Our Services</h2>
//                 <Grid container spacing={2} style={{ padding: "10px" }}>
//                     <Grid xs={6}>
//                         <Card sx={{ margin: "10px" }}>
//                             <CardContent>
//                                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                                     Business Consulting
//                                 </Typography>

//                                 <Typography color="text.secondary">
//                                     Our business consulting services offer tailored solutions to enhance
//                                     your operations, improve efficiency, and drive growth. From
//                                     strategic planning to market analysis, we provide the expertise you
//                                     need to succeed.
//                                 </Typography>

//                             </CardContent>

//                         </Card>
//                     </Grid>
//                     <Grid xs={6}>
                       
//                         <Card sx={{ margin: "10px" }}>
//                             <CardContent>
//                                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                                     Insurance Consulting
//                                 </Typography>

//                                 <Typography color="text.secondary">
//                                     Get expert advice on insurance products that best suit your needs.
//                                     Whether it's life, health, or property insurance, we're here to
//                                     guide you through the options and find the right coverage for you.
//                                 </Typography>

//                             </CardContent>

//                         </Card>
//                     </Grid>
//                 </Grid>
//                 <Grid container spacing={2} style={{ padding: "10px" }}>
//                     <Grid xs={6}>
//                         <Card sx={{ margin: "10px" }}>
//                             <CardContent>
//                                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                                     Icome Monitoring
//                                 </Typography>

//                                 <Typography color="text.secondary">
//                                     Our income monitoring services help you track your earnings and
//                                     expenses, enabling better financial decision-making. Stay informed
//                                     and in control of your finances with our intuitive tools.
//                                 </Typography>

//                             </CardContent>

//                         </Card>
//                     </Grid>
//                     <Grid xs={6}>
//                     <Card sx={{ margin: "10px" }}>
//                             <CardContent>
//                                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                                     Credit/ Debit Card
//                                 </Typography>

//                                 <Typography color="text.secondary">
//                                     Choose from a range of credit card options designed to suit your
//                                     lifestyle and financial goals. Enjoy perks such as rewards programs,
//                                     travel benefits, and competitive interest rates.
//                                 </Typography>

//                             </CardContent>

//                         </Card>
//                     </Grid>
//                 </Grid>
//             </div>
//         </div>
//     );
// }

// export default Home;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, Grid, Typography, Button } from '@mui/material';
import img from '../../../assets/sliderimg.png';
import './Home.css';
import { addAccount } from '../../../redux/accountslice';
import AddAccountDetails from './AddAccountDetails';

const Home = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const { account } = useSelector((state) => state.account);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddAccount = async (accountData) => {
    try {
      await dispatch(addAccount(accountData));
      setOpenDialog(false); // Close the dialog on success
    } catch (error) {
      console.error('Error adding account details:', error);
    }
  };

  return (
    <div className='container'>
      <div className='slider'>
        <img src={img} alt="Slider Image" style={{ width: "100%" }} />
        <div className='slider-content'>
          <h2>Slider Content</h2>
          <p>This is some content overlaid on the slider image.</p>
        </div>
      </div>
      <div className='services'>
        <h2 style={{ color: "black" }}>Our Services</h2>
        {account ? (
          <Grid container spacing={2} style={{ padding: "10px" }}>
            <Grid item xs={6}>
              <Card sx={{ margin: "10px" }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Business Consulting
                  </Typography>
                  <Typography color="text.secondary">
                    Our business consulting services offer tailored solutions to enhance
                    your operations, improve efficiency, and drive growth. From
                    strategic planning to market analysis, we provide the expertise you
                    need to succeed.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ margin: "10px" }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Insurance Consulting
                  </Typography>
                  <Typography color="text.secondary">
                    Get expert advice on insurance products that best suit your needs.
                    Whether it's life, health, or property insurance, we're here to
                    guide you through the options and find the right coverage for you.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
         
        ) : (
          <div className="add-account-message">
            <p>Please add your account details to view our services.</p>
            <Button variant="contained" onClick={handleOpenDialog}>Add Account Details</Button>
          </div>
        )}
      </div>
      <AddAccountDetails
        open={openDialog}
        handleClose={handleCloseDialog}
        handleAddAccount={handleAddAccount}
      />
    </div>
  );
};

export default Home;
