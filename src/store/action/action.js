import ActionTypes from '../constant/constant';
//import history from '../../History';
// import createBrowserHistory from 'history/createBrowserHistory'
import firebase from 'firebase';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory()

// const hsitory = createBrowserHistory()

  // Initialize Firebase
var config = {
    apiKey: "AIzaSyDvmeiyGBZDjmKiXl7oen-nnqm8FJfvRGw",
    authDomain: "todo-app-eb535.firebaseapp.com",
    databaseURL: "https://todo-app-eb535.firebaseio.com",
    projectId: "todo-app-eb535",
    storageBucket: "",
    messagingSenderId: "775351169666"
};
firebase.initializeApp(config);

export function getTodo() {
    return dispatch=>{
        firebase.database().ref('TodoList/').once('value')
        .then((todoList) => {
            let allTodo = todoList.val();
            let arrayTodo=[];
            for(let props in allTodo)
            {
                arrayTodo.push(props);
            }
            dispatch({ type: ActionTypes.ADDTODO, payload: arrayTodo })
        });       
    }
}
export function insertTodo(data) {
    return dispatch=>{
        firebase.database().ref('TodoList/'+data).once('value',(snapshot)=>{
            if(snapshot.val()!=null)
            {
                console.log(snapshot.val());
                alert("Todo already exists in the list");
            }
            else{
                firebase.database().ref('TodoList/'+data).set(data)
                .then(()=>{
                    firebase.database().ref('TodoList/').once('value')
                    .then((todoList) => {
                        let allTodo = todoList.val();
                        let arrayTodo=[];
                        for(let props in allTodo)
                        {
                            arrayTodo.push(props);
                        }
                        dispatch({ type: ActionTypes.ADDTODO, payload: arrayTodo })
                    });
                })
            }

        })
    }
}
export function EditTodo(oldata,newdata) {
    return dispatch=>{
        firebase.database().ref('TodoList/'+oldata).once('value',(snapshot)=>{
            if(snapshot.val()!=null)
            {
                snapshot.ref.remove();
                firebase.database().ref('TodoList/'+newdata).set(newdata)
                .then(()=>{
                    firebase.database().ref('TodoList/').once('value')
                    .then((todoList) => {
                        let allTodo = todoList.val();
                        let arrayTodo=[];
                        for(let props in allTodo)
                        {
                            arrayTodo.push(props);
                        }
                        dispatch({ type: ActionTypes.UPDATETODO, payload: arrayTodo })
                    });
                })
            }

        })
    }
}
export function DelTodo(data) {
    return dispatch=>{
        firebase.database().ref('TodoList/'+data).once('value')
        .then((snapshot)=>{
            if(snapshot.val()!=null)
            {
                snapshot.ref.remove();
                firebase.database().ref('TodoList/').once('value')
                .then((todoList) => {
                    let allTodo = todoList.val();
                    let arrayTodo=[];
                    for(let props in allTodo)
                    {
                        arrayTodo.push(props);
                    }
                    dispatch({ type: ActionTypes.DELTODO, payload: arrayTodo })
                });
            }
        })
    }
}

export function DelAll() {
    return dispatch=>{
        firebase.database().ref('TodoList/').remove()
        .then(()=>{
            dispatch({ type: ActionTypes.DELTODO, payload: [] })
        })
    }
}