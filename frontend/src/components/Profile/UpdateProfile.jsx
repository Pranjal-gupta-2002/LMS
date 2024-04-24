import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { updateProfile } from '../../redux/actions/profile'
import { getMyProfile } from '../../redux/actions/user'

const UpdateProfile = ({user}) => {
  const navigate = useNavigate()

    const [name,setName] = useState(user.name)
    const [email,setEmail] = useState(user.email)
    const dispatch = useDispatch()
    const submitHandler = async(e) => {
      e.preventDefault();
      await dispatch(updateProfile(name,email));
      dispatch(getMyProfile())
      navigate("/profile")
    }
  return (
    <Container py={'16'}minH={"90vh"}>
        <form onSubmit={submitHandler}>
            <Heading children={"Update Profile"} my={'16'} textAlign={['center','left']} textTransform={'uppercase'}ran/>
            <VStack spacing={'8'}>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              type="text"
              focusBorderColor="yellow.500"
            />
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              type="text"
              focusBorderColor="yellow.500"
            />
            <Button w={'full'}colorScheme='yellow' type='submit'>Change</Button>
            </VStack>
        </form>
    </Container>
  )
}


export default UpdateProfile