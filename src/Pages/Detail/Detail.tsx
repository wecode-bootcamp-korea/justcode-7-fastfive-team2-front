import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hook/useFetch';
import Comments from './Comments';
import './Detail.scss';

type CompanyType = {
  categoryName: string;
  corporationName: string;
  image: string;
  introduction: string;
  url: string;
  field: string;
  detailIntro: string;
  membersBenefits: string;
  number: string;
  introFile: string;
  placeName: string;
};

function Detail() {
  const [company, setCompany] = useState<CompanyType>();

  useEffect(() => {
    axios('http://localhost:8000/corporation/1').then((data) =>
      setCompany(data.data.data)
    );
  }, []);

  console.log(company);

  // const company = useFetch('http://localhost:3004/company');
  // let { id } = useParams();

  return (
    <div className='container'>
      <div className='company-section'>
        <div className='section'>전체보기</div>
        <div className='company-modify'>
          <span>수정</span>
          <span>|</span>
          <span>삭제</span>
        </div>
      </div>

      {company && (
        <div className='Detail-area'>
          <img src={company.image} alt='banner' />
          <h2>{company.corporationName}</h2>
          <div>{company.detailIntro}</div>
          <div>
            <span className='Detail-intro'>업무분야</span>
            <span>{company.field}</span>
          </div>
          <div>
            <span className='Detail-intro'>홈페이지</span>{' '}
            <span>{company.membersBenefits}</span>
          </div>
          <div>
            <span className='Detail-intro'>연락처</span>{' '}
            <span>{company.number}</span>
          </div>
          <div>{company.introFile}</div>
        </div>
      )}

      <Comments />
    </div>
  );
}

export default Detail;
