import { useList } from "@refinedev/core";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
} from "components";

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  const latestProperties = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went wrong!</Typography>;

  function handleDeleteProperty(id: string): void {
    throw new Error("Function not implemented.");
  }
  
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// const [equipmentCounts, setEquipmentCounts] = useState({
//   total: 0,
//   semiCritical: 0,
//   critical: 0,
//   nonCritical: 0,
// });

// useEffect(() => {
//   // Make an asynchronous call to fetch equipment counts
//   const fetchEquipmentCounts = async () => {
//     try {
//       // Assuming there's an API endpoint for fetching equipment counts
//       const response = await fetch("/api/equipment/counts");
//       const countsData = await response.json();

//       // Update the state with the fetched counts
//       setEquipmentCounts(countsData);
//     } catch (error) {
//       console.error("Error fetching equipment counts:", error);
//     }
//   };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Total Equipment"
          value={827}
          series={[827,0]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Crititcal Equipment"
          value={153}
          series={[153, 827]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Semi-Critical Equipment"
          value={243}
          series={[243, 827]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Non-Critical Equipment"
          value={431}
          series={[431, 827]}
          colors={["#275be8", "#c4e8ef"]}
        />
      </Box>

      {/* <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack> */}

      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#ffffff"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Latest Properties
        </Typography>

        <Box
          flex={1}
          borderRadius="15px"
          padding="20px"
          bgcolor="#ffffff"
          display="flex"
          flexDirection="column"
          minWidth="100%"
          mt="25px"
        >
          <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {latestProperties.map((property) => (
              <Box key={property._id} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img
                  src={property.photo}
                  alt={property.title}
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px", marginBottom: "8px" }}
                />
                <Typography variant="h6" color="textPrimary">
                  {property.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        
      </Box>
    </Box>
  );
};

export default Home;
