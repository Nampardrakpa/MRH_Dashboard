import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomButton from "./CustomButton";

import { PropertyCardProps } from "interfaces/property";

const PropertyCard = ({
  _id,
  title,
  asset,
  model,
  serial,
  price,
  installationDate,
  expirationDate,
  manufacturer,
  warranty,
  photo,
  handleDeleteProperty,
}: PropertyCardProps) => {
  return (
    <Card
      sx={{
        maxWidth: 330,
        padding: 10,
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
        },
        cursor: "pointer",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        width="100%"
        height={210}
        image={photo}
        alt="card image"
        sx={{ borderRadius: 10 }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingX: 5,
        }}
      >
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#11142d">
            {title}
          </Typography>
          <Typography variant="body1">
            Asset Number: {asset}
          </Typography>
          <Typography variant="body1">
            Equipment Model: {model}
          </Typography>
          <Typography variant="body2">
            Serial Number: {serial}
          </Typography>
          <Typography variant="body2">
            Cost: {price}
          </Typography>
        </Stack>
        <Stack direction="column" gap={1}>
          <Typography variant="body2">
            Installation Date: {installationDate}
          </Typography>
          <Typography variant="body2">
            Warranty Expiration Date: {expirationDate}
          </Typography>
          <Typography variant="body2">
            Manufacturer: {manufacturer}
          </Typography>
          <Typography variant="body2">
            Warranty: {warranty}
          </Typography>
        </Stack>
        <Box sx={{ marginTop: "auto" }}>
          <Link to={`/properties/edit/${_id}`}>
            <CustomButton
              title="Edit"
              backgroundColor="transparent"
              color="#000000"
              icon={<EditIcon />}
            />
          </Link>
          <CustomButton
            title="Delete"
            handleClick={() => handleDeleteProperty(_id)}
            backgroundColor="transparent"
            color="red"
            icon={<DeleteIcon />}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
