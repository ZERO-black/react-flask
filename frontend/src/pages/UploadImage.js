import axios from "axios";
import { useState } from "react";
import Result from "./Result";

const UploadImage = () => {
  const [uploadOption, setUploadOption] = useState(0);
  const [attachment, setAttachment] = useState(null);
  const [colors, setColors] = useState(null);
  const [total, setTotal] = useState(1);

  const onAttahmentChange = (event) => {
    try {
      const {
        target: { files },
      } = event;
      const theAttachment = files[0];
      const reader = new FileReader();
      reader.onloadend = (fininshedEvent) => {
        const {
          currentTarget: { result },
        } = fininshedEvent;
        setAttachment(result);
      };
      reader.readAsDataURL(theAttachment);
    } catch (error) {
      return;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (attachment === null) return alert("사진을 입력하세요");
    try {
      const response = await axios.post("/send_image", { image: attachment });
      console.log(response.data);
      setColors(response.data[0]);
      setTotal(response.data[1]);
      setUploadOption(3);
    } catch (error) {
      console.log(error);
    }
  };
  const GiveOption = () => {
    return (
      <>
        <button onClick={() => setUploadOption(1)}>카메라로 등록</button>
        <button onClick={() => setUploadOption(2)}>버튼으로 등록</button>
      </>
    );
  };

  const WithCam = () => {
    return <div>카메라로 사진 입력</div>;
  };
  const WithAlbum = () => {
    return (
      <>
        <form onSubmit={onSubmit}>
          <input type="file" accept=".png, .jpg" onChange={onAttahmentChange} />
          <button type="submit">입력</button>
        </form>
        <img src={attachment} width="100px" />
      </>
    );
  };
  switch (uploadOption) {
    case 0:
      return <GiveOption></GiveOption>;
    case 1:
      return <WithCam></WithCam>;
    case 2:
      return <WithAlbum></WithAlbum>;
    case 3:
      return <Result colors={colors} total={total}></Result>;
  }
};

export default UploadImage;
