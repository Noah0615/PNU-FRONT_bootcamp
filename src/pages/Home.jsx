import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <div className="card card-body d-flex flex-column align-items-center">
            <div className="icon-container mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                </svg>
            </div>
            <div className="info-container w-100">
                <table className="table text-center">
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td>전재원</td>
                        </tr>
                        <tr>
                            <td>나이</td>
                            <td>24살</td>
                        </tr>
                        <tr>
                            <td>소속</td>
                            <td>부산대학교</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
