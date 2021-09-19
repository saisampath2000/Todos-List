import "./App.css";
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { Footer } from "./MyComponents/Footer";
import React, { useState, useEffect } from "react";
import { About } from "./About";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
    let initTodo;
    if (localStorage.getItem("todos") === null) {
        initTodo = [];
    } else {
        initTodo = JSON.parse(localStorage.getItem("todos"));
    }

    const onDelete = (todo) => {
        console.log("delete it", todo);
        setTodos(
            todos.filter((e) => {
                return e !== todo;
            })
        );
        localStorage.getItem("todos");
    };

    const addTodo = (title, desc) => {
        console.log("I'm adding this todo", title, desc);
        let sno;
        if (todos.length === 0) {
            sno = 1;
        } else {
            sno = todos[todos.length - 1].sno + 1;
        }

        const myTodo = {
            sno: sno,
            title: title,
            desc: desc,
        };
        setTodos([...todos, myTodo]);
        console.log(myTodo);
    };

    const [todos, setTodos] = useState(initTodo);
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <>
            <Router>
                <Header title="My Todos List" searchBar={true} />
                <Switch>
                    <Route
                        exact path="/"
                        render={() => {
                            return (
                                <>
                                    `<AddTodo addTodo={addTodo} />
                                    <Todos todos={todos} onDelete={onDelete} />
                                </>
                            );
                        }}
                    ></Route>
                    <Route exact path="/about">
                        <About />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </>
    );
}

export default App;
