import React, { useState } from 'react';
import { Box, Button, HStack } from "@chakra-ui/react";
import SearchUser from '../components/user/SearchUser';
import DisplayTable from '../components/user/DisplayTable';
// import SearchUser from './SearchUser';
// import DisplayTable from './DisplayTable'; // Assuming you have these components defined

function MenuSelection() {
    const [selectedAction, setSelectedAction] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleButtonClick = (action) => {
        setSelectedAction(action);
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const data = []; // Assuming you have data to display

    return (
        <Box>
            <HStack spacing={4}>
                <Button colorScheme='teal' variant='outline' onClick={() => handleButtonClick('payLoanInstallments')}>
                    Pay Loan Installments
                </Button>
                <Button colorScheme='teal' variant='outline' onClick={() => handleButtonClick('noticeGeneration')}>
                    Notice Generation
                </Button>
            </HStack>
            <Box px="3">
                {selectedAction === 'payLoanInstallments' && (
                    <>
                        <SearchUser onSearch={handleSearchChange} />
                        <DisplayTable users={data} search={searchTerm} />
                    </>
                )}
                {selectedAction === 'noticeGeneration' && (
                    {/* Render your notice generation component here */}
                )}
            </Box>
        </Box>
    );
}

export default MenuSelection;

// <Box px="3">
// <SearchUser onSearch={handleSearchChange} />
// <DisplayTable users={data} search={search} />
// </Box>