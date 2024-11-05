import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

export default class Write extends Component {
  state={
    isModifyMode:false,
    title:'',
    content:''
  }
  Write = (e)=>{ //
    e.preventDefault();;
    Axios.post('http://localhost:8000/insert',{ //두번째 인자에 넣음 요청이 온 사이트 주소
      title:this.state.title,
      content:this.state.content
    })
    .then((res)=> { //결과 res의 결과를 변수에 담음
      console.log(res)
    })
    .catch((e)=>{
      // 에러 핸들링
      console.log(e);
    });
  }

  update = (e)=>{ //
    e.preventDefault();
    Axios.post('http://localhost:8000/update',{ //두번째 인자에 넣음 요청이 온 사이트 주소
      title:this.state.title,
      content:this.state.content,
      id:this.props.boardId //수정할 글 번호
    })
    .then((res)=> { //결과 res의 결과를 변수에 담음
      this.setState({
        title:'',
        content:'',
        isModifyMode:false //수정후 목록변경, 모드변경
      });
      this.props.handleCancel();
      //글 수정 완료 후 수정모드 -> false로 변경, 목록을 다시 조회해야함. (list). 보드의 아이디 초기화
      
    })
    .catch((e)=>{
      // 에러 핸들링
      console.log(e);
    });
  }
  detail = () =>{
    Axios.get(`http://localhost:8000/detail?id=${this.props.boardId}`)
    //뒷 숫자 조회 -> 서버에 전달해야함
    .then((res)=> { //결과 res의 결과를 변수에 담음
      const {data} = res; //초깃값으로 설정되어있던 state의 title.cotent를 true로 바꿈
      console.log(data);
      this.setState({
        title:data[0].BOARD_TITLE,
        content:data[0].BOARD_CONTENT,
        isModifyMode:true
      })
    })
    .catch((e)=>{
      // 에러 핸들링
      console.log(e);
    });
  }
  //true-->false로 바뀌면 실행 / this.prop.isModifyMode에 변동사항생기면 실행
  //write.js 업데이트 여부 결정 | componentDidUpdate
  componentDidUpdate(prevProps) {
    if (this.props.isModifyMode && this.props.boardId !== prevProps.boardId) {
      this.detail();
    }
  }

  handleChage = (e)=>{
    this.setState({
      [e.target.name]:e.target.value //computed 계산된 속성 | 상황에 따라 바뀐다. 
    })
    console.log(this.state);
  }
  render() {
    return (
    <Form>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>제목</Form.Label>
        <Form.Control type="text" name='title' value={this.state.title} placeholder="제목을 입력하세요" onChange={this.handleChage} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="content">
        <Form.Label>내용</Form.Label>
        <Form.Control as="textarea" name='content' value={this.state.content} onChange={this.handleChage} rows={3} />
      </Form.Group>
      <div className="d-flex gap-1">
        <Button variant="primary" type='submit' onClick={this.state.isModifyMode ? this.update : this.write} >{this.state.isModifyMode ? '수정완료' : '작성완료'}</Button>
        <Button variant="secondary" type='reset'>취소</Button>
      </div>
    </Form>
    )
  }
}
