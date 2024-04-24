
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { forgetPassword } from '../../redux/actions/profile';
import toast,{ Toaster } from 'react-hot-toast';

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const {loading, error, message} = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(forgetPassword(email))
    }
    useEffect(()=>{
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
      }
    }
    ,[error, message, dispatch])
  return (
    <Container py={'16'} height={'90vh'} display={'flex'} alignItems={'center'} dir='column' justifyContent={'center'}>
      <Toaster/>
      <form onSubmit={submitHandler}>
        <Heading
          children={'Forget Password'}
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
        <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type="email"
              focusBorderColor="yellow.500"
            />

            <Button type='submit' isLoading={loading}width={'full'} colorScheme='yellow'>Send Reset Link</Button>
        </VStack>
        
      </form>
    </Container>
  );
};

export default ForgetPassword;
