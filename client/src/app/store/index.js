import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "@/entities/user";
import {housingReducer} from "@/entities/housing";
import {tagReducer} from "@/entities/tag";


const rootReducer = combineReducers({
    user: userReducer,
    housing: housingReducer,
    tags: tagReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}
