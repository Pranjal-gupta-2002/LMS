import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {

    const location = useLocation()
  return (
    <VStack
      spacing={'8'}
      p={'16'}
      boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
      
    >
      <LinkButton Icon={RiDashboardFill} url={"dashboard"} text={"Dashboard"} active={location.pathname==="/admin/dashboard"}/>
      <LinkButton Icon={RiAddCircleFill} url={"createcourse"} text={"Create Course"} active={location.pathname==="/admin/createcourse"}/>
      <LinkButton Icon={RiEyeFill} url={"admincourses"} text={"Admin Courses"} active={location.pathname==="/admin/admincourses"}/>
      <LinkButton Icon={RiUser3Fill} url={"users"} text={"Your Users"} active={location.pathname==="/admin/users"}/>

    </VStack>
  );
};

export default Sidebar;

function LinkButton({url,Icon,text,active}){
    return(
    <Link to={`/admin/${url}`} >
      <Button fontSize={'lg'} varient={'ghost'} w={'12rem'}colorScheme={active ? 'purple' : 'gray'} >
        <Icon style={{margin:'4px'}} />
        {text}
      </Button>
    </Link>
  )

}
