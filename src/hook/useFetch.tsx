import { useEffect, useState } from 'react';
import axios from 'axios';

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

export default function useFetch(url: string) {
  const [data, setData] = useState<CompanyType>();

  useEffect(() => {
    axios(url) //필요한 url이 바뀔예정이다
      .then((data) => setData(data.data));
  }, [url]);

  return data; //결국 필요한 data를 리턴해서 받을예정
}
