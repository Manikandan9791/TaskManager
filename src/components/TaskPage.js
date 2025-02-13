import React, { Component } from 'react'
import { history } from '../helpers/history'
import { connect } from 'react-redux';
import { Action } from '../Action/Action';
import { ToastContainer, toast } from 'react-toastify';

class TaskPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: "",
            description: "",
            TaskLevel: "",
            IsTitle: false,
            Isdescriptcion: false,
            IsTaskLevel: false,
            currentPageNo: 0,
            NumberofRecord: 5,
            totalPage: 0,
            startinx: 0,
            endinx: 10,
            lfilterdt: [],
            rerenderhelpflag: true,
            EditObj: {},
            IsEditFlag: false,
            Mode: localStorage.getItem('togglemode') ? JSON.parse(localStorage.getItem('togglemode')) : false,
            option: "Select",
            CopyAllTasks: props.getAlltasks,
            UpdateFlag: true,
            filtertext: '',
            Low: '',
            medium: '',
            high: '',
            editdiscription: false,
            completionstatus: "",
            pending: '',
            Finished: '',
            prioritysort: "",
            datefilterFormat: ""
        }
        // localStorage.removeItem('set_all_tasks')
        this.props.GetAllTask();
    }

    componentDidMount() {
        setTimeout(() => {
            this.LoadgetAlltasks();
        }, 400);
        setTimeout(() => {
            this.setState({ CopyAllTasks: this.state.getAlltasks })
        }, 300);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.rerenderhelpflag !== prevState.rerenderhelpflag) {
            this.LoadgetAlltasks();
        }

        let IsnotAvaildraw = setInterval(() => {
            if (this.state.getAlltasks.length == 0) {
                this.state.GetAllTask();
                clearInterval(IsnotAvaildraw)
            }
        }, 300);
    }

    notify = (msg) => toast(msg);

    static getDerivedStateFromProps(props, state) {
        return { getAlltasks: props.getAlltasks };
    };

    chkbtnClick = (type) => {
        if (type == 'Low') {
            if (this.state.Low == '') {
                this.state.Low = type;
                this.setState({ Low: type });
            }
            else {
                this.state.Low = '';
                this.setState({ Low: '' });
            }
        }
        else if (type == 'Medium') {
            if (this.state.medium == '') {
                this.state.medium = type;
                this.setState({ medium: type });
            }
            else {
                this.state.medium = '';
                this.setState({ medium: '' });
            }
        }
        else if (type == 'High') {
            if (this.state.high == '') {
                this.state.high = type;
                this.setState({ high: type });
            }
            else {
                this.state.high = '';
                this.setState({ high: '' });
            }
        }
        else if (type == 'pending') {
            if (this.state.pending == '') {
                this.state.pending = type;
                this.setState({ pending: type });
            }
            else {
                this.state.pending = '';
                this.setState({ pending: '' });
            }
        }
        else if (type == 'Finished') {
            if (this.state.Finished == '') {
                this.state.Finished = type;
                this.setState({ Finished: type });
            }
            else {
                this.state.Finished = '';
                this.setState({ Finished: '' });
            }
        }
        this.LoadgetAlltasks();
    }

    storefilter = (e) => {
        debugger
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
        if (e.target.name == 'prioritysort') {
            this.state.prioritysort = value;
        }
        this.LoadgetAlltasks();
    }


    LoadgetAlltasks = () => {
        if (this.state.getAlltasks && this.state.getAlltasks.length > 0) {
            let Store = this.state.getAlltasks;
            debugger
            // Search Filter
            Store = Store.filter((fobj) => fobj.title.toLowerCase().includes(this.state.filtertext.toLowerCase()))
            if (this.state.pending.length > 0 != this.state.Finished.length > 0) {
                if (this.state.pending.length > 0) {
                    Store = Store.filter(a => a.completed == false)
                }
                else if (this.state.Finished.length > 0) {
                    Store = Store.filter(a => a.completed == true)
                }
            }
            let fdata = Store.filter(filterData => {
                return (this.state.Low == '' && this.state.medium == '' && this.state.high == '') || (this.state.Low != '' && this.state.medium != '' && this.state.high != '') ?
                    filterData : ((filterData.priority == this.state.Low && this.state.medium == 0 && this.state.high == '') ||
                        (filterData.priority == this.state.medium && this.state.Low == '' && this.state.high == '') ||
                        (filterData.priority == this.state.high && this.state.Low == '' && this.state.medium == '') ||
                        (filterData.priority == this.state.Low || filterData.priority == this.state.medium && this.state.high == '') ||
                        (filterData.priority == this.state.medium || filterData.priority == this.state.high && this.state.Low == '') ||
                        (filterData.priority == this.state.Low || filterData.priority == this.state.high && this.state.medium == '')
                    )
            });
            // Sort Priority Type
            if (this.state.prioritysort.length > 0) {
                let apartchoose = fdata.filter(obj => obj.priority != this.state.prioritysort)
                let fromchoose = fdata.filter(obj => obj.priority == this.state.prioritysort)
                fdata = [...fromchoose, ...apartchoose]
            }
            // Date Sort
            if (this.state.datefilterFormat == 'up') {
                fdata = fdata.sort((a, b) => new Date(a.date) - new Date(b.date));
            }
            else if (this.state.datefilterFormat == 'down') {
                fdata = fdata.sort((a, b) => new Date(b.date) - new Date(a.date));
            }
            let ldt = fdata;
            this.setState({ lfilterdt: ldt });
            let ltotpage = Math.trunc(ldt.length / this.state.NumberofRecord);
            let ltotpage1 = Math.trunc(ldt.length % this.state.NumberofRecord);
            if (ltotpage1 == 0) {
                ltotpage = ltotpage - 1;
            }
            this.setState({ currentPageNo: 0 });
            this.setState({ totalPage: ltotpage })
            this.setState({ startinx: 0, endinx: this.state.NumberofRecord });
        }
        else {
            this.setState({ lfilterdt: [] });
        }
    }



    loadnxtdata = (st) => {
        if (st == "+") {
            if (this.state.currentPageNo != this.state.totalPage) {
                this.state.currentPageNo = this.state.currentPageNo + 1;
            }
        }
        else if (st == "-") {
            if (this.state.currentPageNo != 0) {
                this.state.currentPageNo = this.state.currentPageNo - 1;
            }
        }
        let _startinx = this.state.currentPageNo * this.state.NumberofRecord;
        let _endinx = _startinx + this.state.NumberofRecord;
        this.setState({ startinx: _startinx, endinx: _endinx });
    }

    HandleChange = (e) => {
        this.setState({ IsTitle: false })
        this.setState({ Isdescriptcion: false })
        this.setState({ IsTaskLevel: false })
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value })
    }



    SumbitTask = () => {
        this.setState({ IsTitle: false })
        this.setState({ Isdescriptcion: false })
        this.setState({ IsTaskLevel: false })
        let Allowtask = true;
        if (this.state.Title.length == 0) {
            this.setState({ IsTitle: true });
            Allowtask = false;
        }
        if (this.state.description.length == 0 && this.state.editdiscription == false) {
            this.setState({ Isdescriptcion: true });
            Allowtask = false;
        }
        if (this.state.TaskLevel.length == 0) {
            this.setState({ IsTaskLevel: true });
            Allowtask = false;
        }
        if (Allowtask) {
            let today = new Date();
            let date = today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getDate();
            console.log(date)
            if (this.state.IsEditFlag == false) {
                let _alltasks = this.props.getAlltasks;
                let addid = this.state.getAlltasks.length;
                let NewObj = { completed: false, userId: 7, id: addid, title: this.state.Title, description: this.state.description, date: date, priority: this.state.TaskLevel }
                _alltasks.unshift(NewObj);
                localStorage.setItem('set_all_tasks', JSON.stringify(_alltasks));
                this.setState({ rerenderhelpflag: !this.state.rerenderhelpflag });
                this.notify('Task SuccessFully Created...');
                this.resetProperties();
            }
            else {
                let NewObj = { ...this.state.EditObj, title: this.state.Title, description: this.state.description, date: date, priority: this.state.TaskLevel }
                this.props.SeteditObj(NewObj);
                this.setState({ editdiscription: false })
                this.setState({ rerenderhelpflag: !this.state.rerenderhelpflag });
                this.notify('Task SuccessFully Edited...');
                this.setState({ IsEditFlag: false })
                this.resetProperties();
            }
        }
    }

    resetProperties = () => {
        this.setState({ Title: "" });
        this.setState({ description: "" });
        this.setState({ TaskLevel: "" });
    }

    deleteTask = (Obj) => {
        this.props.RemoveTask(Obj.id);
        this.resetProperties()
        this.setState({ rerenderhelpflag: !this.state.rerenderhelpflag });
        this.notify('Task SuccessFully Deleted...');
    }


    EditTask = (Obj) => {
        this.setState({ EditObj: Obj });
        this.setState({ IsEditFlag: true });
        this.setState({ Title: Obj.title ? Obj.title : "" });
        this.setState({ description: Obj.description ? Obj.description : "" });
        this.setState({ TaskLevel: Obj.TaskLevel ? Obj.TaskLevel : "" });
        this.setState({ rerenderhelpflag: !this.state.rerenderhelpflag });
        this.setState({ editdiscription: true })
    }

    ToggleChange = (e) => {
        let Mode_value = e.target.checked;
        this.setState({ Mode: Mode_value })
        localStorage.setItem('togglemode', Mode_value)
    }

    ChooseOption = (e, Obj) => {
        if (e.target.value == 'delete') {
            this.deleteTask(Obj);
        }
        else if (e.target.value == 'edit') {
            this.EditTask(Obj)
        }
    }


    Taskallow = (Obj) => {
        let flag = Obj.completed == false ? true : false;
        this.props.MarkTask({ ...Obj, completed: flag });
        this.setState({ rerenderhelpflag: !this.state.rerenderhelpflag });
    }

    Datefilter = (type) => {
        debugger
        this.setState({ datefilterFormat: type });
        this.state.datefilterFormat = type;
        this.LoadgetAlltasks()
    }


    render() {
        console.log('getAlltasks => ', this.state.getAlltasks);
        return (
            <div className={`${this.state.Mode == true ? 'dark-mode' : ''} `}>
                <header>
                    <div class="navbar">
                        <div class="logo">
                            <img src="assets/images/logo.png" alt="Task Manager" />
                        </div>
                        <nav>
                            <div class="cont">
                                <div class="toggle">
                                    <input type="checkbox" onChange={(e) => { this.ToggleChange(e) }} id="mode-toggle" checked={this.state.Mode} className={`toggle__input ${this.state.Mode == true ? 'dark-mode' : ''} `} />
                                    <label for="mode-toggle" class={`toggle__label ${this.state.Mode == true ? 'toggle__label_on' : ''} `}></label>
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>
                <div className={`container ${this.state.Mode == true ? 'dark_mode_textcolor' : ''}`} style={{ marginTop: '5%' }}>
                    <div  >
                        <div class="row">
                            <div class="col-25">
                                <label for="fname">Title</label>
                            </div>
                            <div class="col-75">
                                <input type="text" onChange={(e) => { this.HandleChange(e) }} value={this.state.Title} name="Title" placeholder="Enter Title.." />
                                {this.state.IsTitle && <p className='red'>Please Enter Title.</p>}
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-25">
                                <label for="TaskLevel">Priority</label>
                            </div>
                            <div class="col-75">
                                <label htmlFor="dropdown">Choose an option:</label>
                                <select id="TaskLevel" value={this.state.TaskLevel} onChange={(e) => { this.HandleChange(e) }} name="TaskLevel">
                                    <option selected="selected">Select</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                {this.state.IsTaskLevel && <p className='red'>Please Choose Priority.</p>}
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-25">
                                <label for="subject">Description..</label>
                            </div>
                            <div class="col-75">
                                <textarea disabled={this.state.editdiscription} onChange={(e) => { this.HandleChange(e) }} value={this.state.description} name="description" placeholder="Write something.." style={{ height: '200px' }}></textarea>
                                {this.state.Isdescriptcion && <p className='red'>Please Enter Description.</p>}
                            </div>
                        </div>

                        <div class="row">
                            <button onClick={() => { this.SumbitTask() }} className='submitbtn'>Submit</button>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '5%' }} className={`container ${this.state.Mode == true ? 'dark_mode_textcolor' : ''}`}>
                    <div class="input-section">
                        <input type="text" class="input-bar" onChange={(e) => { this.storefilter(e) }} name='filtertext' value={this.state.filtertext} placeholder="Search..." />
                    </div>
                    <div class="checkboxes" style={{ marginTop: '2%' }}>
                        <p>Filter Task : </p>
                        <label>
                            <input type="checkbox" class="checkbox" onClick={() => this.chkbtnClick('Low')} checked={this.state.Low.length > 0 ? true : false} /> Low
                        </label>
                        <label>
                            <input type="checkbox" class="checkbox" onClick={() => this.chkbtnClick('Medium')} checked={this.state.medium.length > 0 ? true : false} /> Medium
                        </label>
                        <label>
                            <input type="checkbox" class="checkbox" onClick={() => this.chkbtnClick('High')} checked={this.state.high.length > 0 ? true : false} /> High
                        </label>
                    </div>
                    <div>
                        <p>Completion status : </p>
                        <label>
                            <input type="checkbox" class="checkbox" onClick={() => this.chkbtnClick('pending')} checked={this.state.pending.length > 0 ? true : false} /> Pending
                        </label>
                        <label>
                            <input type="checkbox" class="checkbox" onClick={() => this.chkbtnClick('Finished')} checked={this.state.Finished.length > 0 ? true : false} /> Finished
                        </label>
                    </div>

                    <p>Priority Based Sort: </p>
                    <select id="TaskLevel2" onChange={(e) => { this.storefilter(e) }} name="prioritysort">
                        <option value="" selected="selected" >Select any One</option>
                        <option value="_normal" >Unselect</option>
                        <option value="Low">Low</option>
                        <option value="Medium" >Medium</option>
                        <option value="High" >High</option>
                    </select>

                    {/* <select class="dropdown" name='' value={this.state.prioritysort} onChange={(e) => { this.ChooseOption(e) }}>
                        
                    </select> */}
                </div>


                {this.state.getAlltasks && this.state.getAlltasks.length > 0 ?
                    <div class="table-wrapper Margindown" >
                        <table class="fl-table">
                            <thead>
                                <tr className={`${this.state.Mode == true ? 'dark_mode_textcolor' : ''}`}>
                                    <th>CheckBox</th>
                                    <th>
                                        <div className={`up ${this.state.datefilterFormat == 'up' ? 'active' : ''} `} onClick={() => { this.Datefilter('up') }} ></div>
                                        Date
                                        <div className={`down ${this.state.datefilterFormat == 'down' ? 'active' : ''} `} onClick={() => { this.Datefilter('down') }} class="down"></div>
                                    </th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Priority</th>
                                    <th>Icon</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.lfilterdt.slice(this.state.startinx, this.state.endinx)
                                    .map((x1, inx1) =>
                                        <tr className={`${this.state.Mode == true ? 'dark_mode_textcolor' : ''}`}>
                                            <td><input type="checkbox" class="checkbox" onClick={() => this.Taskallow(x1)} checked={x1.completed} /> </td>
                                            <td>{x1.date ? x1.date : ""}</td>
                                            <td>{x1.title}</td>
                                            <td>{x1.description}</td>
                                            <td>{x1.priority ? x1.priority : ""}</td>
                                            <td>
                                                <select class="dropdown" name='dropdown' value={this.state.option} onChange={(e) => { this.ChooseOption(e, x1) }}>
                                                    <option selected="selected">Select</option>
                                                    <option value="delete" >Delete</option>
                                                    <option value="edit" >Edit</option>
                                                </select>
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <div className="paginationBtn">
                                <button>
                                    <img src="./assets/images/left-arrow.png" className={this.state.currentPageNo == 0 ? "pagination-inactive" : ""} alt="left arrow" onClick={() => this.loadnxtdata("-")} />
                                </button>
                                <div>
                                    <span>{this.state.lfilterdt && this.state.lfilterdt.length > 0 ? this.state.currentPageNo + 1 : 0}</span>
                                    <span> / </span>
                                    <span>{this.state.lfilterdt && this.state.lfilterdt.length > 0 ? this.state.totalPage + 1 : 0}</span>
                                </div>
                                <button>
                                    <img src="./assets/images/right-arrow.png" alt="right arrow" className={this.state.currentPageNo == this.state.totalPage ? "pagination-inactive" : ""} onClick={() => this.loadnxtdata("+")} />
                                </button>
                            </div>
                        </div>
                        <ToastContainer />
                    </div> :
                    <p >No Task Pending...</p>
                }

            </div>
        )
    }
}


function mapStateToProps(state) {
    const { getAlltasks } = state.ActionReducer;
    return { getAlltasks };
}
const mapActionToProps = {
    GetAllTask: Action.GetAllTask,
    RemoveTask: Action.setapartRemoveTask,
    SeteditObj: Action.SeteditObj,
    MarkTask: Action.MarkTask
    //alertsucc: alertActions.success
}
export default connect(mapStateToProps, mapActionToProps)(TaskPage)