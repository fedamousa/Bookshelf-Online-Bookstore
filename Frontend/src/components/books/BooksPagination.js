import React from "react";
import Pagination from "@mui/material/Pagination";

export default function BooksPagination(prop) {
    const { page, handleChange, totalPages } = prop;
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handleChange} 
                variant="outlined" 
                shape="rounded"
                sx={{
                    "& .MuiPaginationItem-root": {
                        color: "#547050",          // Text color
                        borderColor: "#547050",    // Border color
                    },
                    "& .Mui-selected": {
                        backgroundColor: "#547050", // Selected background color
                        color: "#ffffff",           // Selected text color
                    }
                }}
            />
        </div>
    );
}
