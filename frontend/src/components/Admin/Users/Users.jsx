import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { Button, HStack, Td, Tr } from '@chakra-ui/react';
import { Th } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Heading,
  Table,
  TableCaption,
  Tbody,
  TableContainer,
  Thead,
} from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { deleteTheUser, getAllUsers, updateTheRole } from '../../../redux/actions/admin';
import Loader from '../.././Layout/Loader/Loader'
import toast, { Toaster } from 'react-hot-toast';

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading,error,message } = useSelector(state => state.admin);
  const updateHandler = async(userId) => {
    console.log('hi')
    await dispatch(updateTheRole(userId))
    dispatch(getAllUsers())
  };
  const deleteHandler = async(userId) => {
    await dispatch(deleteTheUser(userId))
    dispatch(getAllUsers())
  }; 

  useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:'clearError'})
      }
      if(message){
        toast.success(message)
        dispatch({type:'clearMessage'})
      }
    dispatch(getAllUsers());
  }, [dispatch,error,message]);
  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{
        cursor: `url(),default`,
      }}
    >
      <Toaster/>
      {loading ? (
        <Loader />
      ) : (
        <Box p={['0', '16']} overflowX={'auto'}>
          <Heading
            children={'All Users'}
            textTransform={'uppercase'}
            textAlign={['center', 'left']}
            my={'16'}
          />
          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'}>
              <TableCaption>All Available Users in the Database</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Subscription</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map(item => (
                  <Row
                    key={item._id}
                    item={item}
                    updateHandler={updateHandler}
                    deleteHandler={deleteHandler}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Sidebar />
    </Grid>
  );
};

export default Users;

function Row({ item, updateHandler, deleteHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>#{item.name}</Td>
      <Td>#{item.email}</Td>
      <Td>#{item.role}</Td>
      <Td>
        #{item.subscription && item.subscription.status === 'active' ? 'Active' : 'Not Active'}
      </Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            colorScheme={'purple.500'}
            onClick={() => updateHandler(item._id)}
          >
            Change Role
          </Button>
          <Button variant={'outline'} onClick={() => deleteHandler(item._id)}>
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
