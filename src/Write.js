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
        content:''
      });
      this.props.handleCancel();
      
    })
    .catch((e)=>{
      // 에러 핸들링
      console.log(e);
    });
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
        <Form.Control type="text" name='title' placeholder="제목을 입력하세요" onChange={this.handleChage} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="content">
        <Form.Label>내용</Form.Label>
        <Form.Control as="textarea" name='content' onChange={this.handleChage} rows={3} />
      </Form.Group>
      <div className="d-flex gap-1">
        <Button variant="primary" type='submit' onClick={this.state.isModifyMode ? this.update : this.write} >{this.state.isModifyMode ? '수정완료' : '작성완료'}</Button>
        <Button variant="secondary" type='reset'>취소</Button>
      </div>
    </Form>
    )
  }
}
