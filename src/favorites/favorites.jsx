// favorites/Favorites.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

const Favorites = ({ festivalData }) => {
    const { id } = useParams();

    console.log(festivalData); // 데이터 확인

    if (!festivalData || !festivalData.length) {
        return <p>축제 데이터를 불러올 수 없습니다.</p>;
    }

    const festival = festivalData[id];

    if (!festival) {
        return <p>축제를 찾을 수 없습니다.</p>;
    }

    return (
        <div>
            <h3>{festival.MAIN_TITLE}</h3>
            <p><strong>장소:</strong> {festival.PLACE}</p>
            <p><strong>주소:</strong> {festival.ADDR1}</p>
            <p><strong>전화번호:</strong> {festival.CNTCT_TEL}</p>
            <p><strong>내용:</strong> {festival.ITEMCNTNTS}</p>
        </div>
    );
};

export default Favorites;
