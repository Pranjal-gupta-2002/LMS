import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  HStack,
  Heading,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Sidebar from '../Sidebar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { Chart, DougChart } from './Chart.js';
import { getDashboardStats } from '../../../redux/actions/admin.js';
import Loader from '../../Layout/Loader/Loader';

const DataBox = ({ title, qty, qtyPercent, profit }) => (
  <Box
    width={['full', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    p={'8'}
    borderRadius={'lg'}
  >
    <Text children={title} />
    <HStack spacing={'6'}>
      <Text fontSize={'2xl'} children={qty} fontWeight={'bold'} />
      <HStack>
        <Text children={`${qtyPercent}%`} />
        {profit ? (
          <RiArrowUpLine color={'green'} />
        ) : (
          <RiArrowDownLine color={'red'} />
        )}
      </HStack>
    </HStack>
    <Text
      opacity={0.6}
      children={'Since last month'}
      fontWeight={'bold'}
      mt={'4'}
      mb={'4'}
    />
  </Box>
);

const Bar = ({ title, value, profit }) => (
  <Box py={'4'} px={['0', '20']}>
    <Heading size={'sm'} children={title} />
    <HStack w={'full'} alignItems={'center'}>
      <Text children={profit ? '0%' : `-${value}%`} />
      <Progress w={'full'} value={profit ? value : 0} colorScheme={'purple'} />
      <Text children={`${value > 100 ? value : 100}%`} />
    </HStack>
  </Box>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    loading,
    stats,
    usersCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    usersPercentage,
    viewsPercentage,
    subscriptionProfit,
    usersProfit,
    viewsProfit,
  } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{
        cursor: `url(),default`,
      }}
    >
      {loading || !stats? (
        <Loader color="purple.500" />
      ) : (
        <Box boxSizing={'border-box'} py={'16'} px={['4', '0']}>
          <Text
            textAlign={'center'}
            opacity={0.5}
            children={`Last Updated on ${String(new Date(stats[11].createdAt)).split('G')[0]}`}
          />

          <Heading
            ml={['0', '16']}
            mb={'16'}
            textAlign={['center', 'left']}
            children={'Dashboard'}
          />
          <Stack
            direction={['column', 'row']}
            minHeight={'24'}
            justifyContent={'space-evenly'}
          >
            <DataBox title={'Views'} qty={viewsCount} qtyPercent={viewsPercentage} profit={viewsProfit} />
            <DataBox title={'Users'} qty={usersCount} qtyPercent={usersPercentage} profit={usersProfit} />
            <DataBox
              title={'Subscribtion'}
              qty={subscriptionCount}
              qtyPercent={subscriptionPercentage}
              profit={subscriptionProfit}
            />
          </Stack>
          <Box
            m={['0', '16']}
            borderRadius={'lg'}
            p={['0', '16']}
            mt={['4', '16']}
            boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
          >
            <Heading
              textAlign={['center', 'left']}
              size={'md'}
              p={['8', '0']}
              ml={['0', '16']}
              children={'Views Graph'}
            />
            <Chart viewsArray={stats.map((item)=> item.views)}/>
          </Box>

          <Grid templateColumns={['1fr', '2fr 1fr']}>
            <Box p={'4'}>
              <Heading
                textAlign={['center', 'left']}
                size={'md'}
                children={'Progess Bar'}
                my={'8'}
                ml={['0', '16']}
              />
              <Box>
                <Bar title={'Views'} value={viewsPercentage} profit={viewsProfit} />
                <Bar title={'Users'} value={usersPercentage} profit={usersProfit} />
                <Bar title={'Subscribtion'} value={subscriptionPercentage} profit={subscriptionProfit} />
              </Box>
            </Box>
            <Box p={['0', '16']} boxSizing={'border-box'}>
              <Heading
                textAlign={['center', 'left']}
                size={'md'}
                children={'Users'}
                mb={'4'}
              />
              <DougChart users={[subscriptionCount,usersCount-subscriptionCount]}/>
            </Box>
          </Grid>
        </Box>
      )}
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
