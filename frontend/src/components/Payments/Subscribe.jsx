import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../redux/reducers/store';
import { buySubscription } from '../../redux/actions/user';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import logo from '../../assets/images/logo.jpg'

const Subscribe = ({user}) => {
  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const { error:courseError} = useSelector(
    state => state.course
  );
  const dispatch = useDispatch();
  const [key, setKey] = useState("");

  const subscribeHandler = async () => {
    const { data } = await axios.get(`${server}/razorpaykey`);
    setKey(data.key);
    dispatch(buySubscription());
  };
  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }
    if(courseError){
      toast.error(courseError)
      dispatch({type:'clearError'})
    }
    if(subscriptionId){
      const openPopUp = ()=>{
        const options = {
          key:key,
          name:"ClassLink",
          description:"Get all Premium courses",
          image:logo,
          subscription_id:subscriptionId,
          callback_url : `${server}/paymentverification`,
          prefill:{
            name:user.name,
            email:user.email,
            contact:""
          },
          note:{
            address:"ClassLink"
          },
          theme:{
            color:"#FFC800"
          }
        };

        const razor = new window.Razorpay(options);
        razor.open();
      }
      openPopUp()
    }
  },[dispatch,error,user.name,user.email,key,subscriptionId,courseError])
  return (
    <Container h={'90vh'} p="16">
      <Heading children="Welcome" my={'8'} textAlign={'center'} />

      <VStack
        boxShadow={'lg'}
        alignItems={'stretch'}
        borderRadius={'lg'}
        spacing={'0'}
      >
        <Box bg={'yellow.400'} py={'4'} css={{ borderRadius: '8px 8px 0 0 ' }}>
          <Text>Pro Pack - $150.00</Text>
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt="4" spacing={'8'}>
            <Text color={'black'}>
              Join pro pack and Get access to all Content.
            </Text>
            <Heading size={'md'} children={'$299 Only'} />
          </VStack>

          <Button
            onClick={subscribeHandler}
            my={'8'}
            width={'full'}
            colorScheme="yellow"
            isLoading={loading}
          >
            But Now
          </Button>
        </Box>

        <Box bg={'blackAlpha.600'} p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading
            size={'sm'}
            color={'white'}
            textTransform={'uppercase'}
            children={'100% Refund At Cancellation'}
          />

          <Text
            fontSize={'sm'}
            color={'white'}
            children={'*Terms & Conditions Applied'}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
