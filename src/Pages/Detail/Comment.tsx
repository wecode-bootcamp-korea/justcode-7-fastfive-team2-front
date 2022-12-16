import React from 'react';
import './Comment.scss';

function Comment() {
  return (
    <div className='container comment-area'>
      <div>댓글</div>
      <input
        type='text'
        maxLength={1000}
        placeholder='위 멤버에게 궁금한 점이나 제안하고 싶은 내용을 댓글로 남겨보세요. 댓글 내용이 길어지면 작성 칸이 이렇게 널어나게 됩니다.'
      />
    </div>
  );
}

export default Comment;
