import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Register from "./Register";
import axios from "axios";
import { useParams } from "react-router-dom";

import "./EditPost.scss";

export interface Iprops {
  modalOpen: Boolean;
  setModalOpen: Dispatch<SetStateAction<Boolean>>;
  modifyBtn: Boolean;
  setModifyBtn: Dispatch<SetStateAction<Boolean>>;
}

const EditPost: React.FC = () => {
  const [category, setCategory] = useState<string>(""); //카테고리
  const [companyName, setCompanyName] = useState<string>(""); //회사이름
  const [imageSrc, setImageSrc] = useState<string>(""); //로고 이미지 썸네일
  const [logoFile, setLogoFile] = useState<File>(); //로고 이미지 파일
  const [countIntTextarea, setCountIntTextarea] = useState<number>(0); //회사소개 글자수
  const [compIntro, setCompIntro] = useState<string>(""); //회사소개
  const [compHomepage, setCompHomepage] = useState<string>(""); //홈페이지 주소
  const [countComma, setCountComma] = useState<number>(0); //쉼표 갯수
  const [compMain, setCompMain] = useState<string>(""); //주력 업무 분야
  const [countDetailTextarea, setCountDetailTextarea] = useState<number>(0); //자세한소개 글자수
  const [compDetail, setCompDatil] = useState<string>(""); //자세한소개
  const [countBenefitTextarea, setCountBenefitTextarea] = useState<number>(0); //멤버혜택 글자수
  const [compBenefit, setCompBenefit] = useState<string>(""); //멤버혜택
  const [compCall, setCompCall] = useState<string>(""); //연락처
  const [intFileName, setIntFileName] = useState<string>(""); //회사소개서 파일명
  const [intFile, setIntFile] = useState<File>(); //회사소개서 파일
  const [compLocal, setCompLocal] = useState<string>(""); //이용 중인 지점
  const [modalOpen, setModalOpen] = useState<Boolean>(false); //등록확인 모달창
  const [showCategoryAlert, setShowCategoryAlert] = useState<Boolean>(false); //필수항목 경고창(카테고리)
  const [showNameAlert, setShowNameAlert] = useState<Boolean>(false); //필수항목 경고창(회사이름)
  const [showLogoAlert, setShowLogoAlert] = useState<Boolean>(false); //필수항목 경고창(회사로고)
  const [showIntAlert, setShowIntAlert] = useState<Boolean>(false); //필수항목 경고창(회사소개)
  const [showMainAlert, setShowMainAlert] = useState<Boolean>(false); //필수항목 경고창(주력업무분야)
  const [showCallAlert, setShowCallAlert] = useState<Boolean>(false); //필수항목 경고창(연락처)
  const [showLocalAlert, setShowLocalAlert] = useState<Boolean>(false); //필수항목 경고창(이용 중인 지점)
  const [showBoxAlert, setShowBoxAlert] = useState<Boolean>(false); //필수항목 경고창(체크박스)
  const [modifyBtn, setModifyBtn] = useState<Boolean>(false); //수정 버튼
  const checkRef = useRef<HTMLInputElement>(null); //체크박스 Ref
  const [saveTime, setSaveTime] = useState<string>(""); //현재시간
  const [isPrevData, setIsPrevData] = useState<Boolean>(false);
  const mandatory: (string | number)[] = [
    category,
    companyName,
    compIntro,
    compMain,
    compCall,
    compLocal,
  ]; //필수 작성 항목
  const params = useParams();

  const fileUpload = async (how: string) => {
    const formData = new FormData();
    formData.append("image", logoFile as File);
    formData.append("introduction_file", intFile as File);
    await axios({
      method: `${how}`,
      url: `http://localhost:8000/corporation${params.id}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
  };

  const stringUpload = async (how: string) => {
    const splitCompMain = compMain.split(",");
    await axios({
      method: `${how}`,
      url: `http://localhost:8000/corporation${params.id}`,
      data: {
        category_id: category,
        corporation_name: companyName,
        introduction: compIntro,
        url: compHomepage,
        field: splitCompMain,
        detail_introduction: compDetail,
        members_benefits: compBenefit,
        corporation_number: compCall,
        place_id: compLocal,
      },
    });
  };

  const prevData = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8000/corporation${params.id}`,
    }).then((res) => {
      const result = res.data.data;
      const keys = Object.keys(result);
      console.log(result);

      if (keys.filter((ele) => result[ele] === "").length !== 11) {
        setModifyBtn(true);
        setIsPrevData(true);
      }
      setCategory(result.category_id);
      setCompanyName(result.corporation_name);
      setCompIntro(result.introduction);
      setCompHomepage(result.url);
      setCompMain(result.field);
      setCompDatil(result.detail_introduction);
      setCompBenefit(result.members_benefits);
      setCompCall(result.corporation_number);
      setCompLocal(result.place_id);
      setIntFile(result.introduction_file);
      setIntFileName(result.introduction_file.name);
      setLogoFile(result.image);
    });
  };
  useEffect(() => {
    prevData();
  }, []);

  const handleRegister = (): void => {
    const onResult = mandatory.filter((ele) => ele !== "");
    const offResult = mandatory.filter((ele) => ele === "");
    if (
      onResult.length === 6 &&
      logoFile !== undefined &&
      checkRef.current?.checked === true
    ) {
      fileUpload("POST");
      stringUpload("POST");
      setModalOpen(true);
    } else if (
      onResult.length === 6 &&
      logoFile !== undefined &&
      checkRef.current?.checked === false
    ) {
      setShowBoxAlert(true);
      return;
    } else if (
      logoFile?.name === undefined &&
      offResult[0] === compIntro &&
      onResult[1] === companyName
    ) {
      setShowCategoryAlert(false);
      setShowNameAlert(false);
      setShowLogoAlert(true);
      return;
    } else {
      switch (offResult[0]) {
        case category:
          setShowCategoryAlert(true);
          break;
        case companyName:
          setShowNameAlert(true);
          setShowCategoryAlert(false);
          break;
        case compIntro:
          setShowIntAlert(true);
          setShowNameAlert(false);
          setShowCategoryAlert(false);
          setShowLogoAlert(false);
          break;
        case compMain:
          setShowMainAlert(true);
          setShowIntAlert(false);
          setShowNameAlert(false);
          setShowCategoryAlert(false);
          setShowLogoAlert(false);
          break;
        case compCall:
          setShowCallAlert(true);
          setShowMainAlert(false);
          setShowIntAlert(false);
          setShowNameAlert(false);
          setShowCategoryAlert(false);
          setShowLogoAlert(false);
          break;
        case compLocal:
          setShowLocalAlert(true);
          setShowCallAlert(false);
          setShowMainAlert(false);
          setShowIntAlert(false);
          setShowNameAlert(false);
          setShowCategoryAlert(false);
          setShowLogoAlert(false);
          break;
      }
    }
  };
  function useInterval(callback: () => void, delay: number | null): void {
    const savedCallback = useRef<typeof callback>(callback);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => currentTime(), 60000);

  const currentTime = (): void => {
    let now = new Date();
    let year: number = now.getFullYear();
    let month: number = now.getMonth() + 1;
    let date: number = now.getDate();
    let hours: number = now.getHours();
    let minutes: number = now.getMinutes();
    setSaveTime(
      year +
        ". " +
        month +
        ". " +
        date +
        ". " +
        hours +
        "시" +
        " " +
        minutes +
        "분"
    );
  };
  useEffect(() => {
    currentTime();
    fileUpload("PUT");
    stringUpload("PUT");
  }, [saveTime]);

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log(e.target.value);
    console.log(typeof e.target.value);

    setCategory((e.target as HTMLSelectElement).value);
  };

  const handleCompanyName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCompanyName((e.target as HTMLInputElement).value);
  };

  const countIntTextLength = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const countText = (e.target as HTMLTextAreaElement).value.length;
    setCountIntTextarea(countText);
    setCompIntro((e.target as HTMLTextAreaElement).value);
  };

  const countDetailTextLength = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const countText = (e.target as HTMLTextAreaElement).value.length;
    setCountDetailTextarea(countText);
    setCompDatil((e.target as HTMLTextAreaElement).value);
  };

  const countBenefitTextLength = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const countText = (e.target as HTMLTextAreaElement).value.length;
    setCountBenefitTextarea(countText);
    setCompBenefit((e.target as HTMLTextAreaElement).value);
  };

  const handleHomepage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCompHomepage((e.target as HTMLInputElement).value);
  };

  const handlecountComma = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const countCom = (e.target as HTMLInputElement).value.split(",").length - 1;
    setCountComma(countCom);
    setCompMain((e.target as HTMLInputElement).value);
  };

  const handleCall = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCompCall((e.target as HTMLInputElement).value);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fileList = e.target.files! as FileList;
    if (fileList[0].size > 1024 * 1024 * 10) {
      alert(
        `10MB 이하의 파일만 등록할 수 있습니다.\n\n현재파일 용량 : ${Math.round(
          fileList[0].size / 1024 / 1024
        )}MB`
      );
      e.target.value = "";
      return;
    }
    setLogoFile(fileList[0]);

    setImageSrc(URL.createObjectURL(fileList[0]));
  };

  const handleLogoCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setLogoFile(undefined);
    setImageSrc("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fileList = e.target.files! as FileList;
    if (fileList[0].size > 1024 * 1024 * 30) {
      alert(
        `30MB 이하의 파일만 등록할 수 있습니다.\n\n현재파일 용량 : ${Math.round(
          fileList[0].size / 1024 / 1024
        )}MB`
      );
      e.target.value = "";
      return;
    }
    setIntFileName(fileList[0].name);
    setIntFile(fileList[0]);
  };

  const intFileCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setIntFile(undefined);
    setIntFileName("");
  };

  const handleLocal = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCompLocal((e.target as HTMLSelectElement).value);
  };

  return (
    <div className="mainContainer">
      <div className="head">
        <p className="headTitle">우리 회사 소개하기</p>
      </div>
      <div className="AutoSaveWrap">
        <p>우측*표시는 필수 작성 항목입니다.</p>
        {saveTime && (
          <p className="autoSave">{saveTime}에 마지막으로 저장 되었습니다.</p>
        )}
      </div>
      <div className="dropdown">
        <span>업종*</span>
        <select className="category" onChange={handleCategory} value={category}>
          <option value="0" selected>
            카테고리
          </option>
          <option value="1">IT</option>
          <option value="2">광고•마케팅</option>
          <option value="3">콘텐츠</option>
          <option value="4">개발</option>
          <option value="5">디자인</option>
          <option value="6">기획•컨설팅</option>
          <option value="7">세무•회계</option>
          <option value="8">법률</option>
          <option value="9">교육</option>
          <option value="10">금융</option>
          <option value="11">그외1</option>
          <option value="12">그외2</option>
        </select>
        <select className="detail">
          <option value="">상세</option>
        </select>
      </div>

      {showCategoryAlert && (
        <p className="categoryAlert">필수 작성 항목입니다.</p>
      )}

      <div className="companyNameWrap">
        <span>회사 이름*</span>
        <input
          type="text"
          className="companyNameInput"
          onChange={handleCompanyName}
          value={companyName}
        />
        {showNameAlert && <p className="nameAlert">필수 작성 항목입니다.</p>}
      </div>
      <div className="compLogoWrap">
        <span>회사 로고 or 대표 이미지*</span>
        <div className="fileAddWrap">
          <input
            type="file"
            accept="image/jpg, image/png"
            id="fileAdd"
            onChange={handleLogoUpload}
          ></input>
          <label htmlFor="fileAdd" className="fileAddLabel">
            파일 첨부하기
          </label>
          <div className="logoPreview">
            {imageSrc && (
              <>
                <img src={imageSrc} alt="preview_img" className="logoImg" />
                <button
                  className="imgLogoCancel"
                  onClick={handleLogoCancel}
                ></button>
              </>
            )}
          </div>
          <p>10mb 이하의 jpg, png파일을 선택해주세요.</p>
          {showLogoAlert && <p className="logoAlert">필수 작성 항목입니다.</p>}
        </div>
      </div>
      <div className="compIntroduceWrap">
        <span className="intTitle">회사 소개*</span>
        <div className="intTextWrap">
          <textarea
            className="compIntroduce"
            placeholder="100자 이내로 간단하게 설명해주세요."
            maxLength={100}
            onChange={countIntTextLength}
            value={compIntro}
          />
          <span
            className={countIntTextarea === 100 ? "textCnt full" : "textCnt"}
          >
            {countIntTextarea}/100
          </span>
          {showIntAlert && <p className="intAlert">필수 작성 항목입니다.</p>}
        </div>
      </div>
      <div className="compHomepageWrap">
        <span>홈페이지</span>
        <input
          type="text"
          className="compHomepage"
          placeholder="우리 회사의 홈페이지 주소를 알려주세요."
          onChange={handleHomepage}
          value={compHomepage}
        />
      </div>
      <div className="compMainWrap">
        <span>주력 업무 분야*</span>
        <input
          type="text"
          className="compMain"
          placeholder="5개 이하의 주요 업무를 쉼표로 구분하여 입력해주세요. ex) 디지털 마케팅, 콘텐츠 제작, 영상 제작"
          onChange={handlecountComma}
          value={compMain}
        />
        {countComma === 5 && <p>주력 업무는 5개 이하로 소개해주세요.</p>}
        {showMainAlert && <p className="mainAlert">필수 작성 항목입니다.</p>}
      </div>

      <div className="compDetailWrap">
        <p>자세한 소개 및 업무 레퍼런스</p>
        <div className="DetailTextWrap">
          <textarea
            className="compDetail"
            placeholder="우리 회사 소개, 패스트파이브 멤버들과 협업하고 싶은 프로젝트, 지금까지의 업무 레퍼런스 등 자세한 내용을 공유해주세요."
            maxLength={1000}
            onChange={countDetailTextLength}
            value={compDetail}
          />
          <span
            className={
              countDetailTextarea === 1000
                ? "compDetailCnt full"
                : "compDetailCnt"
            }
          >
            {countDetailTextarea}/1000
          </span>
        </div>
      </div>
      <div className="compBenefitWrap">
        <p>패스트파이브 멤버 혜택</p>
        <div className="benefitTextWrap">
          <textarea
            className="compBenefit"
            placeholder="패스트파이브 멤버에게만 제공되는 혜택이 있다면 알려주세요. &#13;ex)패스트파이브 멤버 컨택 시 견적의 10% 할인 제공"
            maxLength={100}
            onChange={countBenefitTextLength}
            value={compBenefit}
          />
          <span
            className={
              countBenefitTextarea === 100
                ? "compBenefitCnt full"
                : "compBenefitCnt"
            }
          >
            {countBenefitTextarea}/100
          </span>
        </div>
      </div>
      <div className="compCallWrap">
        <span>대표 연락처*</span>
        <input
          type="text"
          className="compCall"
          placeholder="업무상 컨택이 가능한 연락처를 알려주세요. ex) sample@fastfive.co.kr, 010-1234-1234"
          onChange={handleCall}
          value={compCall}
        />
        {showCallAlert && <p className="callAlert">필수 작성 항목입니다.</p>}
      </div>
      <div className="compIntroLetterWrap">
        <span>회사 소개서</span>
        <div className="comIntroLetterSection">
          <input
            type="file"
            accept=".pdf, .jpg, .png"
            id="inputFile"
            onChange={handleFileUpload}
          ></input>
          <label htmlFor="inputFile" className="letterAdd">
            파일 첨부하기
          </label>
          <span className="letterName">{intFileName}</span>
          {intFileName && (
            <button className="intFileCancel" onClick={intFileCancel}></button>
          )}
          <p>30mb 이하의 pdf, jpg, png 파일을 선택해주세요.</p>
        </div>
      </div>
      <div className="usePlaceWrap">
        <span>이용 중인 지점*</span>
        <select className="usePlace" onChange={handleLocal} value={compLocal}>
          <option value="" selected>
            지점명
          </option>
          <option value="gn1">강남1호점</option>
          <option value="gn2">강남2호점</option>
          <option value="gn3">강남3호점</option>
          <option value="gn4">강남4호점</option>
          <option value="gn5">강남5호점</option>
          <option value="gwm">광화문점</option>
          <option value="gd">교대점</option>
          <option value="gr1">구로1호점</option>
          <option value="md1">명동1호점</option>
          <option value="ss1">삼성1호점</option>
          <option value="ss2">삼성2호점</option>
          <option value="ss3">삼성3호점</option>
          <option value="ss4">삼성4호점</option>
          <option value="sos">서울숲점</option>
          <option value="sc">서초점</option>
          <option value="sr1">선릉1호점</option>
          <option value="sr2">선릉2호점</option>
          <option value="sjr">선정릉점</option>
          <option value="sungsoo">성수점</option>
          <option value="sc1">시청1호점</option>
          <option value="sc2">시청2호점</option>
          <option value="snh1">신논현1호점</option>
          <option value="sinsa">신사점</option>
          <option value="yud">여의도점</option>
          <option value="ys2">역삼1호점</option>
          <option value="ys2">역삼2호점</option>
          <option value="ys3">역삼3호점</option>
          <option value="ys4">역삼4호점</option>
          <option value="ydp">영등포점</option>
          <option value="os1">용산1호점</option>
          <option value="ejr">을지로점</option>
          <option value="hj">합정점</option>
          <option value="hd1">홍대1호점</option>
          <option value="hd2">홍대2호점</option>
        </select>
        {showLocalAlert && <p className="localAlert">필수 작성 항목입니다.</p>}
      </div>
      <div className="termsOfUseWrap">
        <input
          type="checkbox"
          className="termsOfUseCheck"
          // onClick={handleCheck}
          ref={checkRef}
        />
        <span>패스트파이브 서비스 이용약관에 동의하십니까?(필수)</span>
      </div>
      {showBoxAlert && (
        <p className="boxAlert">서비스 이용약관에 동의해주세요</p>
      )}
      <div className="btnWrap">
        <button className="preview">미리보기</button>
        {modifyBtn ? (
          <button className="register" onClick={() => handleRegister()}>
            수정하기
          </button>
        ) : (
          <button className="register" onClick={() => handleRegister()}>
            등록하기
          </button>
        )}
        {modalOpen && (
          <Register
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setModifyBtn={setModifyBtn}
            modifyBtn={modifyBtn}
          />
        )}
        <button className="cancel">취소</button>
      </div>
    </div>
  );
};
export default EditPost;
