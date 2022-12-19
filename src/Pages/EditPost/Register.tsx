import React, { useState } from "react";
import { Iprops } from "./EditPost";
import "./EditPost.scss";

const Register = ({ modalOpen, setModalOpen }: Iprops): JSX.Element => {
  // const [modalClose, setModalClose] = useState<Boolean>(true); //등록확인 모달창

  const handlePopup = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && (
        <div className="registerContainer">
          <div className="registerMain">
            <p className="title">게시글에 등록되었습니다</p>
            <button onClick={handlePopup}>확인</button>
          </div>
        </div>
      )}
    </>
  );
};
export default Register;
