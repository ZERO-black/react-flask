import React, { useState } from "react";
import axios from "axios";
const UploadName = () => {
  const [name, setName] = useState("");
  const [pageStatus, setPageStatus] = useState(0);
  const [result, setResult] = useState("HI");

  const onChange = (event) => {
    setName(event.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === "") return alert("이름을 입력하세요");
    setPageStatus(1);
    const headers = {
      Authorization: "Bearer my-token",
      "My-Custom-Header": "foobar",
    };

    let response = null;
    try {
      response = await axios.post(
        "/uploadname",
        { name: name, id: 0 },
        { headers }
      );
      setResult(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const InputForm = () => (
    <form onSubmit={onSubmit} name="text">
      <input type="text" value={name} onChange={onChange} placeholder="name" />
      <input type="submit" value="submit" />
    </form>
  );
  const Output = () => <div>{result}</div>;
  return <>{pageStatus ? <Output /> : <InputForm />}</>;
};

export default UploadName;
