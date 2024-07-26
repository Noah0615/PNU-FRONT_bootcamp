import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Hello = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [description, setDescription] = useState('');

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 데이터 불러오기
    useEffect(() => {
        const storedImage = localStorage.getItem('selectedImage');
        const storedDescription = localStorage.getItem('description');
        
        if (storedImage) {
            setSelectedImage(storedImage);
        }
        if (storedDescription) {
            setDescription(storedDescription);
        }
    }, []);

    // 이미지 선택 핸들러
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            localStorage.setItem('selectedImage', imageUrl); // 로컬 스토리지에 이미지 저장
        }
    };

    // 설명 변경 핸들러
    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
        localStorage.setItem('description', value); // 로컬 스토리지에 설명 저장
    };

    return (
        <div className="container">
            <h1>축제 사진</h1>
            <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mb-3" />
            {selectedImage && (
                <div>
                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '300px', maxHeight: '300px' }} />
                    <div className="form-floating mb-3">
                        <textarea
                            className="form-control"
                            placeholder="사진에 대한 설명을 입력하세요..."
                            id="floatingTextarea2"
                            value={description}
                            onChange={handleDescriptionChange}
                            style={{ height: '100px' }}
                        />
                        <label htmlFor="floatingTextarea2">사진 설명</label>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Hello;
