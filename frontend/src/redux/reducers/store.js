import {configureStore} from "@reduxjs/toolkit";
import { profileReducer, subscriptionReducer, userReducer } from "./userReducer";
import { courseReducer } from "./courseReducer";
import { adminReducer } from "./adminReducer";
import { otherReducer } from "./otherReducer";


const store = configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        course:courseReducer,
        subscription:subscriptionReducer,
        admin:adminReducer,
        other:otherReducer
    },
})

export const server = "http://localhost:4000/api/v1";

export default store;