import React, { useEffect, useRef, useState } from 'react';
import useFetch from '../../hook/useFetch';
import './Comments.scss';
import moment from 'moment';
import axios from 'axios';

interface CommentType {
  id: 0;
  content: '새로운 내용을 작성해보았어요';
  date: '2022-12-18 17:04:50';
  corporationId: 1;
}

function Comments() {
  const [text, setText] = useState('');
  const [newText, setNewText] = useState('');
  const [replyModify, setReplyModify] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);

  const inputRef = useRef<HTMLInputElement>(null); //ref는 돔요소가 생성돈 후 접근이 가능
  // let comments: CommentType[] = useFetch('http://localhost:3004/comment');

  useEffect(() => {
    axios('http://localhost:3004/comment').then((data) =>
      setComments(data.data)
    );
  }, []);

  const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const commentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const commentPost = () => {
    if (inputRef.current) {
      const content = inputRef.current.value;

      if (content.length <= 0) {
        alert('작성된 게시글이 없습니다');
        return;
      }

      fetch('http://localhost:3004/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', //보내는 리소스의 타입을 의미
        },
        body: JSON.stringify({
          content,
          corporationId: 1,
          date: nowTime,
        }),
      }).then((res) => {
        alert('생성이 완료 되었습니다');
        setComments(comments);
      });
    }
  };

  //1. 수정버튼을 누르면 댓글에 Input 나타나기
  //2. 수정버튼 등록버튼으로 변경

  const commentModify = (id: number) => {
    // if (comments.id) {
    //   setReplyModify(!replyModify);
    // }
    // fetch('http://localhost:8000/comment', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     //수정을 위한 정보를 body에 넣어준다
    //     ...comments, //기존데이터에
    //     // isDone: !isDone, //수정되는 값을 추가
    //   }),
    // }).then((res) => {
    //   if (res.ok) {
    //     // comment.content;
    //   }
    // });
  };

  const commentDelete = (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      //alert창
      fetch('http://localhost:3004/comment', {
        method: 'DELETE',
      }).then((res) => {
        setComments(comments.filter((delComment) => delComment.id !== id));
      });
    }
  };

  return (
    <div className='container comments-area'>
      <h5>comment</h5>
      {comments.map((comment) => (
        <div key={comment.id} className='comment'>
          <div className='comment-area'>
            <div className='comment-data'>
              <span className='nickname'>{comment.corporationId}</span>
              <span className='date'>{comment.date}</span>
            </div>
            <div className='comment-modify'>
              <button onClick={() => commentModify(comment.id)}>수정</button>
              <span>|</span>
              <button onClick={() => commentDelete(comment.id)}>삭제</button>
            </div>
          </div>
          <div className='comment-reply'>
            {replyModify ? (
              <input
                type='text'
                ref={inputRef}
                maxLength={1000}
                defaultValue={text ? text : newText}
                onChange={commentInput}
                placeholder='위 멤버에게 궁금한 점이나 제안하고 싶은 내용을 댓글로 남겨보세요.'
              />
            ) : (
              <div>{comment.content}</div>
            )}
            <button>답글 쓰기</button>
          </div>
        </div>
      ))}

      <div className='comments-area__input'>
        <input
          type='text'
          ref={inputRef}
          maxLength={1000}
          defaultValue={text ? text : newText}
          onChange={commentInput}
          placeholder='위 멤버에게 궁금한 점이나 제안하고 싶은 내용을 댓글로 남겨보세요.'
        />
        <div className='comments-area__function'>
          <button onClick={commentPost}>등록</button>
          <span>{text.length}/1000</span>
        </div>
      </div>
    </div>
  );
}

export default Comments;
