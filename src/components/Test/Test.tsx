import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useFormik } from "formik";
import { Eye, EyeSlash, TickCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
// import { useQuery } from "../../hooks/useQuery";
import CourseModal from "./../Coursedetail/CourseModal"
const initialValues = {
  email: "",
  password: "",
};

const Test = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const closeModal = () => setIsModal(false);

  useEffect(() => {
    //todo
    // after get departments from api =>  setSubjectOptions(subjectOptions);
  }, []);

  const onSubmit = async (values: any) => {
    const { email , password } = values;
    const userData = {
      email,
      password,
    };

    console.log("userData", userData);

    //todo
    // try {
    //   const { data } = await signupUser(userData);
    // } catch (error: any) {
    //   console.log(error);
    // }
  };



  return (
    <div
      className="flex justify-between h-screen relative"
      lang="he-IL"
      dir="rtl"
    >
      <CourseModal isModal={isModal} onClose={closeModal} />
      <Button style={{border:'none',background:'white'}} onClick={()=>setIsModal(true)}><p style={{fontFamily:'iranyekan',fontSize:'16px'}} className="font-bold">جبر</p></Button>
    </div>
  );
};

export default Test;

