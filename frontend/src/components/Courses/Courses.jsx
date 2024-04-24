import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import vd from '../../assets/images/logo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import toast, { Toaster } from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { getMyProfile } from '../../redux/actions/user';
const Courses = () => {
  const Category = [
    'Web Development',
    'Artificial Intelligence',
    'App Development',
    'Data Structure And Algorithms',
    'Data Science',
    'Game Development',
    'Cyber Security'
  ];
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const addToPlaylistHandler = async(id )=> {
    await dispatch(addToPlaylist(id));
    dispatch(getMyProfile());
  };

  const { loading, courses, error, message } = useSelector(
    state => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }, [category, keyword, dispatch, message,error]);

  return (
    <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
      <Toaster />
      <Heading children={'All Courses'} m={'8'} />

      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search Courses...."
        type="text"
        focusBorderColor="yellow.500"
      />

      <HStack
        overflow={'auto'}
        paddingY={'8'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {Category.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseCard
              key={course._id}
              title={course.title}
              description={course.description}
              views={course.views}
              imgSrc={course.poster.url}
              id={course._id}
              creator={course.createdBy}
              lectureCount={course.noOfVideo}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />
          ))
        ) : (
          <Heading mt={'4'} children={'No Course Found'} />
        )}
      </Stack>
    </Container>
  );
};
const CourseCard = ({
  views,
  title,
  imgSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => (
  <VStack className="courses" alignItems={['center', 'flex-start']}>
    <Image src={imgSrc} boxSize={'60'} objectFit={'contain'} />
    <Heading
      textAlign={['center', 'left']}
      maxW={'200px'}
      noOfLines={3}
      children={title}
      size={'sm'}
    />
    <Text noOfLines={3} children={description} />
    <HStack>
      <Text
        noOfLines={2}
        fontWeight={'bold'}
        textTransform={'uppercase'}
        children={'Creator By :-'}
      />
      <Text noOfLines={2} textTransform={'uppercase'} children={creator} />
    </HStack>

    <Heading
      textAlign={'center'}
      size={'xs'}
      textTransform={'uppercase'}
      children={`Lectures - ${lectureCount}`}
    />
    <Heading
      size={'xs'}
      textTransform={'uppercase'}
      children={`Views - ${views}`}
    />

    <Stack direction={['column', 'row']} alignItems={'center'}>
      <Link to={`/course/${id}`}>
        <Button colorScheme="yellow">Watch Now</Button>
      </Link>
      <Button
        isLoading={loading}
        variant={'ghost'}
        colorScheme="yellow"
        onClick={() => addToPlaylistHandler(id)}
      >
        Add To Playlist
      </Button>
    </Stack>
  </VStack>
);

export default Courses;
