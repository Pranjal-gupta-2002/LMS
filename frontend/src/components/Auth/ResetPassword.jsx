import { useNavigate } from 'react-router-dom';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';

const ResetPassword = () => {

    const [password, setPassword] = useState('');

    const params = useParams();

    const {loading, error, message} = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(resetPassword(params.token,password))
    }
    useEffect(()=>{
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
        navigate("/login")
      }
    }
    ,[error, message, dispatch,navigate])


  return (
    <Container py={'16'} height={'90vh'} display={'flex'} alignItems={'center'} dir='column' justifyContent={'center'}>
      <Toaster/>
      <form onSubmit={submitHandler}>
        <Heading
          children={'Reset Password'}
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
        <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="New Password"
              type="password"
              focusBorderColor="yellow.500"
            />

            <Button isLoading={loading} type='submit' width={'full'} colorScheme='yellow'>Reset Password</Button>
        </VStack>
        
      </form>
    </Container>
  );
};

export default ResetPassword




