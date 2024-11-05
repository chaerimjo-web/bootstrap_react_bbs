import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BoardList from './BoardList';
import Write from './Write';

import React, { Component } from 'react'

export default class App extends Component {
  state = {
    isModifyMode :false, //수정모드
    isComplete:true, //렌더 완료(목록 출력 완료)
    boardId:0 //수정,삭제할 글 번호
  }

  handleModify = (checkList)=>{
    if(checkList.length === 0){
      alert('수정할 게시글을 선택하세요');
    } else if(checkList.length > 1){
      alert('하나의 게시글만 선택하세요');
    }
    this.setState({
      isModifyMode:checkList.length === 1 //하나 있으면 isModifyMode를 true로 변경
    });
    this.setState({
      boardId:checkList[0] || 0 //숫자 있으면 극 그 값 사용, 없으면 0
    });
  }

  handleCancel = ()=>{ //1 글 수정 완료 후 수정모드
    this.setState({
      isModifyMode:false,
      isComplete:false, //isComplete기존값과 다르면 앱을 다시 추렭
      boardId:0
    })

  }

  render() {
    return (
      <div className="container">
        <h1>React Board</h1>
        <BoardList isComplete={this.state.isComplete} handleModify={this.handleModify}/>
        <Write 
          isModifyMode={this.state.isModifyMode} 
          boardId={this.state.boardId}
          handleCancel = {this.handleCancel}
        />
      </div>
    )
  }
}