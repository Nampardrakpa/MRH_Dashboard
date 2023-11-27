import React,{ useState } from "react";
import { useTable } from "@refinedev/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CustomButton } from "components";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import PropertyDetails from "./property-details";


const AllProperties = () => {
    const navigate = useNavigate();
    const [displayDetails,setDispleyDetails] = useState(false);
    const [property,setProperty] = useState({
        _id : "",
        title  : "",
        asset : "",
        model: "",
        serial : "",
        price : "",
        installationDate : "",
        expirationDate : "",
        manufacturer : "",
        warranty : "",
        photo : "",

    });

    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        setCurrent,
        setPageSize,
        pageCount,
        sorter,
        setSorter,
        filters,
        setFilters,
    } = useTable();

    const allProperties = data?.data ?? [];
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [propertyToDelete, setPropertyToDelete] = React.useState("");

    const currentPrice = sorter.find((item) => item.field === "price")?.order;

    const toggleSort = (field: string) => {
        setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
    };
    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) =>
            "field" in item ? item : []
        );

        return {
            title:
                logicalFilters.find((item) => item.field === "title")?.value || "",
            propertyType:
                logicalFilters.find((item) => item.field === "propertyType")
                    ?.value || "",
        };
    }, [filters]);

    const handleDeleteProperty = (propertyId: string) => {
        setPropertyToDelete(propertyId);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        // Implement the logic to delete the property using propertyToDelete
        // You can make an API request or perform the deletion as needed
        // After the property is deleted, close the dialog
        setDeleteDialogOpen(false);
        // Optionally, you can also update the property list after deletion.
        // You may want to remove the deleted property from the list.
    };

    const closeDeleteDialog = () => {
        setPropertyToDelete("");
        setDeleteDialogOpen(false);
    };
    
    const handleDisplayPropertDetails = (id: string) => {
        setDispleyDetails(true);
      
        const foundProperty = allProperties.find((data) => data._id === id);
      
        if (foundProperty) {
            alert("Add spare parts??")
          setProperty({
            _id: foundProperty._id,
            title: foundProperty.title,
            asset: foundProperty.asset,
            model: foundProperty.model,
            serial: foundProperty.serial,
            price: foundProperty.price,
            installationDate: foundProperty.installationDate,
            expirationDate: foundProperty.expirationDate,
            manufacturer: foundProperty.manufacturer,
            warranty: foundProperty.warranty,
            photo: foundProperty.photo,
          });
        console.log("property", property);

        }
      
      };
      

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error...</Typography>;

    return (
        <>
         {displayDetails ?    
       
       <PropertyDetails
       id={property?._id}
       title={property?.title}
       photo={property?.photo}

     />
  :
        <Box>
            <Box mt="20px">
                <Typography fontSize={25} fontWeight={700} color="#11142d">
                    {!allProperties.length
                        ? "There are no properties"
                        : "All Items"}
                </Typography>
                <Box mb={2} mt={3} display="flex" justifyContent="space-between">
                    <CustomButton
                        title={`Sort price ${
                            currentPrice === "asc" ? "↑" : "↓"
                        }`}
                        handleClick={() => toggleSort("price")}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                    />
                    <TextField
                        variant="outlined"
                        color="info"
                        placeholder="Search by Item Name"
                        value={currentFilterValues.title}
                        onChange={(e) => {
                            setFilters([
                                {
                                    field: "title",
                                    operator: "contains",
                                    value: e.currentTarget.value
                                        ? e.currentTarget.value
                                        : undefined,
                                },
                            ]);
                        }}
                        style={{ width: "900px" }}
                    />
                    <Select
                        variant="outlined"
                        color="info"
                        displayEmpty
                        required
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue=""
                        value={currentFilterValues.propertyType}
                        onChange={(e) => {
                            setFilters(
                                [
                                    {
                                        field: "propertyType",
                                        operator: "eq",
                                        value: e.target.value,
                                    },
                                ],
                                "replace"
                            );
                        }}
                    >
                        <MenuItem value="">All</MenuItem>
                        {["Critical", "Semi-Critical", "Non-Critical"].map(
                            (type) => (
                                <MenuItem key={type} value={type.toLowerCase()}>
                                    {type}
                                </MenuItem>
                            )
                        )}
                    </Select>
                </Box>
            </Box>

            <CustomButton
                title="Add Item"
                handleClick={() => navigate("/properties/create")}
                backgroundColor="#475be8"
                color="#fcfcfc"
                icon={<AddIcon />}
            />
            {/* {displayDetails ? proper\} */}
            {allProperties.map((property) => (
                
                <Box key={property._id} onClick = {() => handleDisplayPropertDetails(property._id)}>
                    <Box
                        key={property._id}
                        display="flex"
                        alignItems="center"
                        mt={3}
                        p={2}
                        boxShadow={2}
                        borderRadius={2}
                    >
                        <img
                            src={property.photo}
                            alt={property.title}
                            width="150"
                            height="100"
                            style={{ objectFit: "cover", marginRight: "16px" }}
                        />
                        <div>
                            <Typography variant="h6" color="primary">
                                {property.title}
                            </Typography>
                            <Typography variant="body1">
                                <span style={{ color: "#000000" }}>Asset Number:</span> <span style={{ color: "red" }}>{property.asset}</span>
                            </Typography>
                            <Typography variant="body1">
                                <span style={{ color: "#000000" }}>Equipment Model</span>: <span  style={{ color: "red" }}>{property.model}</span>
                            </Typography>
                            <Typography variant="body2">
                                <span  style={{ color: "#000000" }}>Serial Number: </span> <span  style={{ color: "red" }}>{property.serial}</span>
                            </Typography>
                            <Typography variant="body2">
                                <span  style={{ color: "#000000" }}>Cost:</span> Nu. <span  style={{ color: "red" }}>{property.price}</span>
                            </Typography>
                        </div>
                        <div style={{ marginLeft: "90px" }}>
                            <Typography variant="body2">
                                <span  style={{ color: "#000000" }}>Installation Date: </span> <span  style={{ color: "red" }}>{property.installationDate}</span>
                            </Typography>
                            <Typography variant="body2">
                                <span  style={{ color: "#000000" }}>Warranty Expiration Date:</span> <span  style={{ color: "red" }}>{property.expirationDate}</span>
                            </Typography>
                            <Typography variant="body2">
                                <span  style={{ color: "#000000" }}>Manufacturer:</span> <span  style={{ color: "red" }}>{property.manufacturer}</span>
                            </Typography>
                            <Typography variant="body2">
                                <span style={{ color: "#000000" }}>Warranty:</span> <span  style={{ color: "red" }}>{property.warranty}</span> year
                            </Typography>
                        </div>
                        <Box ml="auto">
                            <Link to={`/properties/edit/${property._id}`}>
                                <CustomButton
                                    title="Edit"
                                    backgroundColor="transparent"
                                    color="#000000"
                                    icon={<EditIcon />}
                                />
                            </Link>
                            <CustomButton
                                title="Delete"
                                handleClick={() => handleDeleteProperty(property._id)}
                                backgroundColor="transparent"
                                color="red"
                                icon={<DeleteIcon />}
                            />
                        </Box>
                    </Box>
                </Box>
            ))}

            <Dialog
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this property?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {allProperties.length > 0 && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={3}
                >
                    {/* ... (previous code) */}
                </Box>
            )}
        </Box>}
        </>

    );
};

export default AllProperties;
