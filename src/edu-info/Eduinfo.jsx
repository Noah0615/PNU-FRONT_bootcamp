import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASEURL = 'http://apis.data.go.kr/6260000/FestivalService/getFestivalKr?ServiceKey=i6ZTiKykGItHJct42IizSTjtdh1YFjhtaBuHnPCkPgDyDNE2TchmRBSVFk9EEas%2BrET5qsQgWCiXG6KWMVuBtQ%3D%3D&pageNo=1&numOfRows=10&resultType=json';

const EduInfo = ({ setFestivalData }) => { // setFestivalData 추가
    let [eduList, setEduList] = useState([]);

    const getServerData = async () => {
        try {
            const response = await axios.get(BASEURL);
            let rows = response.data.getFestivalKr.item;
            console.log(rows.length);
            setEduList(rows);
            setFestivalData(rows); // 축제 데이터를 상태에 저장
        } catch (e) {
            console.log(e);
        }
    };

    let items = eduList.map((item, index) => {
        let MAIN_TITLE = item.MAIN_TITLE; // 축제명
        let PLACE = item.PLACE; // 장소
        let ADDR1 = item.ADDR1; // 주소
        let CNTCT_TEL = item.CNTCT_TEL; // 전화번호
        return (
            <tr key={index}>
                <td><Link to={`/favorites/${index}`}>{MAIN_TITLE}</Link></td>
                <td>{PLACE}</td>
                <td>{ADDR1}</td>
                <td>{CNTCT_TEL}</td>
            </tr>
        );
    });

    useEffect(() => {
        getServerData();
    }, []);

    return (
        <>
            <h3>부산시 축제 현황</h3>
            <br />
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">축제명</th>
                        <th scope="col">장소</th>
                        <th scope="col">주소</th>
                        <th scope="col">전화번호</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </>
    );
}

export default EduInfo;