import { appconstants } from "../Services/Appconstants"
import { Services } from "../Services/Services"

export const Action = {
    GetAllTask,
    setapartRemoveTask,
    SeteditObj,
    MarkTask
}

function GetAllTask() {
    try {
        return dispatch => {
            Services.GetAllTask()
                .then(
                    constants => {
                        dispatch({ type: appconstants.SET_ALL_TASKS, constants })
                    }
                )
        }
    }
    catch (ex) {
        console.log("GetAllTaks ==>" + ex.message)
    }
}

function setapartRemoveTask(task_id) {
    return dispatch => {
        dispatch({ type: appconstants.APART_REMOVE_SET_TASKS, task_id });
    }
}

function SeteditObj(editObj) {
    return dispatch => {
        debugger
        dispatch({ type: appconstants.SET_EDIT_TASK, editObj });
    }
}

function MarkTask(marktask) {
    return dispatch => {
        dispatch({ type: appconstants.CLICK_CHECKBOX, marktask });
    }
}

