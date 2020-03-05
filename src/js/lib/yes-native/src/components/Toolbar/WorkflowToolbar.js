import React , { Component } from 'react';
import NavigatorToolbar from './NavigatorToolbar';

export default class WorkflowToolbar extends NavigatorToolbar{
    getItems(){
        return this.props.controlState.get('items').filter((value)=>{
            const tag = value.get('tag');
            return tag==='bpm' || tag==='loadworkitem';
        })
    }
}