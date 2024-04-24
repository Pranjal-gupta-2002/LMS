import { Button, HStack, Image, Td, Tr, useDisclosure } from '@chakra-ui/react';
import { Th } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
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
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getCourseLectures } from '../../../redux/actions/course';
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin';
import toast from 'react-hot-toast';
const AdminCourses = () => {
  const dispatch = useDispatch();
  const{courses,lectures} = useSelector(state => state.course)
  const{loading,error,message} = useSelector(state => state.admin)
  const[courseId,setCourseId] = useState('') 
  const[courseTitle,setCourseTitle] = useState('') 
  const courseDetailsHandler = (courseId,courseTitle)=> {
    dispatch(getCourseLectures(courseId))
    onOpen();
    setCourseId(courseId)
    setCourseTitle(courseTitle)
  };
  const deleteHandler = courseId=> {
    console.log(courseId)
    dispatch(deleteCourse(courseId))
  };
  const deleteLectureButtonHandler = async(courseId, lectureId) => {
    await dispatch(deleteLecture(courseId,lectureId))
    dispatch(getCourseLectures(courseId))
  };
  const addLectureHandler= async(e,courseId,description,title,video)=> {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', video);

    await dispatch(addLecture(courseId,formData));
    dispatch(getCourseLectures(courseId))
  }
  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }
    if(message){
      toast.success(message)
      dispatch({type:'clearMessage'})
    }
    dispatch(getAllCourses());
  },[dispatch,error,message])

  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{
        cursor: `url(),default`,
      }}
    >
      <Box p={['0', '8']} overflowX={'auto'}>
        <Heading
          children={'All Courses'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
          my={'16'}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'}>
            <TableCaption>All Available Courses in the Database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <Row
                  key={item._id}
                  item={item}
                  courseDetailsHandler={courseDetailsHandler}
                  deleteHandler={deleteHandler}
                  loading={loading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          id={courseId}
          courseTitle = {courseTitle}
          lectures={lectures}
          isLoading={loading}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;

function Row({ item, courseDetailsHandler, deleteHandler ,loading}) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image
          src={item.poster.url}
          alt={item.title}
          w={'100vw'}
          h={'100px'}
          borderRadius={'md'}
          objectFit={'cover'}
          mb={'4'}
          boxShadow={'md'}
          border={'1px solid #ccc'}
        />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.noOfVideo}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            colorScheme={'purple.500'}
            onClick={() => courseDetailsHandler(item._id,item.title)}
            // isLoading={loading}
          >
            View Lecture
          </Button>
          <Button variant={'outline'} onClick={() => deleteHandler(item._id)}>
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
