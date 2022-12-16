import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';

type CompanyType = {
  id: number;
  title: string;
  explain: String;
  img: string;
  field: string;
  benefit: string;
  page: string;
  number: string;
  detail: string;
  introduction: string;
};

function Detail() {
  const [company, setCompany] = useState<CompanyType[]>([]);
  let { id } = useParams();
  console.log(company);

  const getCompanyDetail = () => {
    axios
      .get(`http://localhost:3004/company/${id}`)
      .then((res) => setCompany(res.data));
  };

  useEffect(() => {
    getCompanyDetail();
  }, [id]);
  console.log('id', id);
  return (
    <div className='container'>
      <div>전체보기</div>
      {/* <img src={company?.img} alt='banner' />
      <div>{company?.title}</div>
      <div>{company?.explain}</div> */}
      <Comment />
    </div>
  );
}

export default Detail;
