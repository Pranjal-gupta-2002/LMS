import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { changePassword } from '../../redux/actions/profile'
import toast, { Toaster } from 'react-hot-toast'

const ChangePassword = () => {

    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const dispatch = useDispatch()
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(changePassword(oldPassword,newPassword));
    }
    const {loading,message,error} = useSelector(state => state.profile)
    useEffect(() => {
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearError"})
      }
    },[dispatch,message,error])
  return (
    <Container py={'16'}minH={"90vh"}>
      <Toaster/>
        <form on onSubmit={submitHandler}>
            <Heading children={"Change Password"} my={'16'} textAlign={['center','left']} textTransform={'uppercase'}ran/>
            <VStack spacing={'8'}>
            <Input
              required
              id="oldpassword"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder="Enter Old Password"
              type="password"
              focusBorderColor="yellow.500"
            />
            <Input
              required
              id="newpassword"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
              type="password"
              focusBorderColor="yellow.500"
            />
            <Button w={'full'}colorScheme='yellow' type='submit' isLoading={loading}>Change</Button>
            </VStack>
        </form>
    </Container>
  )
}

export default ChangePassword