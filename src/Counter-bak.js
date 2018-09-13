import React, { Component } from 'react';
import {createStore} from "./redux";
import counter from "./reducers/counter";
let store=createStore(counter);

class Counter extends Component {
    constructor(){
        super();
        this.state={value:store.getState().number};
    }
    componentWillMount(){
        //订阅
        this.unsubscribe=store.subscribe(()=>{
            this.setState({value:store.getState().number});
        })
    }
    componentWillReceiveProps(){
        this.unsubscribe()
    }
    render() {
        return (
            <div>
                <p>{this.state.value}</p>
                <button>+</button>
                <button>-</button>
            </div>
        )
    }
}
export default Counter;