import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/course.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';

const Founder = () => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
    <VStack>
      <Avatar boxSize={['40', '48']} />
      <Text children="Co-Founder" opacity={'0.7'} />
    </VStack>
    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="Pranjal Gupta" size={['md', 'xl']} />
      <Text
        textAlign={['center', 'left']}
        children="Hi, I am a Full-stack Developer.
              Our mission is to provide quality content at reasonable prize "
      />
    </VStack>
  </Stack>
);

const TandC = ()=>(
    <Box>
        <Heading size={'md'} children="Terms & Conditions" textAlign={["center",'left']} my={'4'} />

        <Box h={'sm'} p={'4'} overflowY={'scroll'}>
            <Text  textAlign={['center','left']} letterSpacing={"widest"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, aliquam voluptatibus, praesentium nostrum culpa nobis tenetur at accusamus unde doloribus pariatur alias ea earum architecto eligendi? Sit ducimus, eos excepturi voluptatum quas libero temporibus repellendus aliquam ut, veniam assumenda perspiciatis, hic quaerat ab culpa. Praesentium in enim fuga distinctio exercitationem nostrum deserunt facilis repellendus labore consectetur quibusdam sed, sunt sequi, quam deleniti mollitia. Officiis dignissimos perferendis cupiditate soluta explicabo magni modi, possimus voluptates sed quod est magnam quas quam molestiae sequi labore, aspernatur dolorum quisquam perspiciatis doloremque fugiat repudiandae nesciunt ullam molestias. Eligendi reprehenderit maxime natus iure autem neque distinctio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat sapiente hic vitae pariatur delectus ducimus praesentium aut nihil, quae tempore doloribus magnam asperiores unde saepe voluptatum excepturi quam molestiae esse. Quas quisquam a eos! Mollitia tempora iure nisi quibusdam, molestiae, placeat maiores fugit debitis aliquam quaerat facilis inventore. Expedita fugiat, officia eveniet libero pariatur adipisci repellendus at accusamus. Dignissimos perferendis sunt non provident hic esse, fugiat inventore accusamus laboriosam numquam id suscipit quos reprehenderit nisi dolorum alias officiis voluptas molestias dolorem, consequuntur error maxime illum ullam officia. Officia quae cupiditate veniam eaque nihil autem consequuntur facere facilis perspiciatis maiores labore iste omnis quod accusamus, atque quia ea ducimus libero, repellendus molestias. Eos, mollitia corporis incidunt consectetur perferendis distinctio dolorem hic modi vel quis! Reprehenderit laboriosam perspiciatis atque labore esse ullam iure beatae? Aperiam esse quasi unde praesentium, in cumque dolor ipsam porro deserunt voluptate nam a? Reprehenderit similique labore nesciunt ea, vero, vel consequatur dolore nemo culpa deleniti expedita perferendis dolorum natus reiciendis cumque iste assumenda? Molestias, laborum assumenda ea qui iste libero laudantium fugit hic ex, neque ipsum voluptatem minus nisi mollitia officia fugiat beatae sed. Saepe magnam accusamus quia harum ut asperiores quo natus, nihil dolor quod sint!
            </Text>

            <Heading my={'4'} size={'xs'} children="Refund Only Applicable For Cancellaton Within 7 Days."/>
        </Box>
    </Box>
)

const VideoPlayer = ()=>(
    <Box>
            <video
          autoPlay={true}
          muted
          loop
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo}
        ></video>
    </Box>
)


const About = () => {



  return (
    <Container padding={'16'} boxShadow={'lg'} maxW={'container.lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />
      <Founder />

      <Stack m={'8'} direction={['column', 'row']} alignItems={'center'}>
        <Text m={'8'} textAlign={['center', 'left']}>
          We are a video streaming Platform with some premium courses available
          for premium users.
        </Text>

        <Link to={'/subscribe'}>
          <Button colorScheme="yellow" variant={'ghost'}>
            Checkout Our plans
          </Button>
        </Link>
      </Stack>
      <VideoPlayer/>

      <TandC/>

      <HStack my={'4'} p={'4'}>
        <RiSecurePaymentFill/>
        <Heading children="Payment is Secured By RazorPay" size={'xs'} textTransform={'uppercase'}/>
      </HStack>
    </Container>
  );
};

export default About;
