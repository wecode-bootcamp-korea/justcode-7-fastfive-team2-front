import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Iprops } from "./EditPost";
import "./EditPost.scss";

const Register = ({
  modalOpen,
  setModalOpen,
  modifyBtn,
  setModifyBtn,
}: Iprops): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();

  const handlePopup = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setModalOpen(false);
    modifyBtn === true && goToDetailPage();
  };
  const goToDetailPage = () => {
    navigate(`/list/${params.id}`);
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
