import React, { Component } from 'react';
import './b.css';
import './App.css';
import {connect} from 'react-redux';
import {insertTodo,EditTodo,DelTodo,DelAll,getTodo} from './store/action/action';

class App extends Component {
  arr=[];
  constructor(prop)
  {
    super(prop);
    this.state={
      inptval:"",
      chkstatus:"Add",
      oldData:""
  }
    this.addTodo=this.addTodo.bind(this);
    this.props.getTodo();
  }


  chngIpt(ev){
    this.setState({[ev.target.name]:ev.target.value})
  }
  addTodo(){
    if(this.state.inptval){
      if(this.state.chkstatus==='Add'){
        this.props.insertTodo(this.state.inptval);
        this.arr.push(this.state.inptval);
        this.setState({inptval:""})
      }
      else{
        this.props.updateTodo(this.state.oldData,this.state.inptval);
        ///this.arr.splice(this.state.oldData,1,this.state.inptval);
        this.setState({
          "inptval":"",
          "chkstatus":"Add",
          "oldData":""
        });
      }
    }
  }
  editTodo(text,ev){
    this.textInput.focus();
    this.setState({
      "inptval":text,
      "chkstatus":"edit",
      "oldData":text
    });
  }
  delTodo(item,ev){
    this.props.delTodo(item);
  }
  deleteALL(){
   let x= window.confirm("Are you sure you want to delete all"); 
   if(x){
      this.props.delAllTodo();
      //this.forceUpdate()
    }
  }
  render() {
    let inputstle={
      width:"60%",
      marginLeft:"20px",
      marginRight:"20px",
      padding:"5px 0px",
      borderRadius:"6px"
    }
    return (
      <div className="App" style={{width:"80%",margin:"0 auto",background: "gainsboro",height:"100%"}}>
      <h1 style={{textAlign:"center", fontFamily:"cursive"}}>TODO APP</h1>
        <div className="inp-div">
          <input ref={(input) => { this.textInput = input; }}  style={inputstle} type="text/javascript" key="inptval" name="inptval" value={this.state.inptval} onChange={this.chngIpt.bind(this)} />
          <div className="btn-div" >
            <button style={{background: "rgb(0, 123, 255)",color: "#091865",border:"1px solid #091865"}} className="btn btn-success" onClick={this.addTodo} ref="addedit">{this.state.chkstatus.toLowerCase()==="add"?"ADD":"Edit"}</button>
            <button style={{background: "rgb(0, 123, 255)",color: "red"}} className="btn btn-danger" onClick={this.deleteALL.bind(this)}>Delete All</button>
          </div>
        </div>
        <ul className="list-group" style={{width:"70%",margin:"0px auto 10px auto",textAlign:"left"}}>
        {
          (this.props.todoList.length>0)?(
            this.props.todoList.map((item,index)=>{
            return (
                  <li key={index} className="list-group-item">
                  <table >
                    <tbody>
                    <tr>
                      <td width="96%">{item}</td>
                      <td width="3%"><button className="btn btn-primary" onClick={this.editTodo.bind(this,item)}>Edit</button></td>
                      <td width="3%"><button className="btn btn-danger" onClick={this.delTodo.bind(this,item)}>Delete</button></td>
                     </tr>
                     </tbody>
                    </table>
                    
                    
                    
                  </li>
                )
            })
          ):
          (<li className="list-group-item">No Todo Availaible</li>)
        }
        </ul>
      </div>
    );
  }
}
function mapStateToProp(state){
  return({
      todoList: state.root.todo
  })
}
function mapDispatchToProp(dispatch) {
  return ({
      // changeUserName: ()=>{dispatch(changeUserName())}
      getTodo: ()=>{
        dispatch(getTodo());
      },
      insertTodo: (data)=>{
          dispatch(insertTodo(data));
      },
      updateTodo: (olddata,newdata)=>{
        dispatch(EditTodo(olddata,newdata));
      },
      delTodo: (data)=>{
      dispatch( DelTodo(data));
      },
      delAllTodo: ()=>{
        dispatch( DelAll());
      }
  })
}


export default connect(mapStateToProp,mapDispatchToProp)(App);