import { appconstants } from "../Services/Appconstants";


// localStorage.removeItem('set_all_tasks')
let alltask = localStorage.getItem('set_all_tasks') ? JSON.parse(localStorage.getItem('set_all_tasks')) : [];

const initialstate = { getAlltasks: alltask }

export const ActionReducer = (state = initialstate, action) => {
    switch (action.type) {
        case appconstants.SET_ALL_TASKS:
            // assign dummy  created date  
            for (var i = 0; i < 30; i++) {
                action.constants[i].date = "2025-01-" + (i + 1)
            }
            localStorage.setItem('set_all_tasks', JSON.stringify(action.constants));
            return {
                ...state,
                getAlltasks: alltask.length > 0 ? alltask : action.constants
            };
        case appconstants.APART_REMOVE_SET_TASKS:
            let removetask = state.getAlltasks.filter(fobj => fobj.id !== action.task_id)
            localStorage.setItem('set_all_tasks', JSON.stringify(removetask))
            return {
                ...state,
                getAlltasks: removetask
            };
        case appconstants.SET_EDIT_TASK:
            let Getindex = state.getAlltasks.findIndex(fobj => fobj.id === action.editObj.id);
            state.getAlltasks[Getindex] = action.editObj;
            localStorage.setItem('set_all_tasks', JSON.stringify(state.getAlltasks))
            return {
                ...state,
                getAlltasks: state.getAlltasks
            };
        case appconstants.CLICK_CHECKBOX:
            debugger
            let _Getindex = state.getAlltasks.findIndex(fobj => fobj.id === action.marktask.id);
            state.getAlltasks[_Getindex] = action.marktask;
            localStorage.setItem('set_all_tasks', JSON.stringify(state.getAlltasks))
            return {
                ...state,
                getAlltasks: state.getAlltasks
            };

        default:
            return { ...state }
    }
}