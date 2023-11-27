import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CustomButton } from "components";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid";

const PropertyDetails = ({
  id,
  title,
  photo,
}: {
  id: string;
  title: string;
  photo: string;
}) => {
  const navigate = useNavigate();
  const [displayDetails, setDisplayDetails] = useState(false);

  if (!id) {
    return <Typography>Loading property details...</Typography>;
  }

  return (
    <Box>
      {/* Header Section */}
      <Grid container alignItems="center" justifyContent="space-between">
        <CustomButton
          title="Back"
          handleClick={() => navigate("/")}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<ArrowBackIcon />}
        />
        <Typography variant="h4">Spare Parts</Typography>
        <CustomButton
          title="Add Item"
          handleClick={() => navigate("/properties/create")}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<AddIcon />}
        />
      </Grid>

      {/* Content Section */}
      <Grid container mt={2}>
        {/* Photo */}
        <Grid item xs={12} md={6}>
          <img
            src={photo}
            alt="Property Photo"
            style={{
              maxWidth: "100%",
              height: "auto",
              marginTop: "10px",
              borderRadius: "8px", // Add some border-radius for a more appealing look
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
            }}
          />
        </Grid>

        {/* Equipment Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" mt={2}>
            Equipment: {title}
          </Typography>
          {/* Add more information as needed */}
          <Typography variant="body1" mt={1}>
            {/* Additional information goes here */}
          </Typography>
          {/* Add more Typography components for additional information */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyDetails;
