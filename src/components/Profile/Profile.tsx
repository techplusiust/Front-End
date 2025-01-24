import {
  Card,
  Avatar,
  Divider,
  Spacer,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import * as Yup from "yup";
import "./ProfileSidebar.css";
import { useRecoilState } from "recoil";
import { userAtom } from "../../recoil/userAtom";
import { authAtom } from "../../recoil/authAtom";
import { useFormik } from "formik";
import { t } from "i18next";
import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";

const ProfileSidebar = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpenEditPass,
    onOpen: onOpenEditPass,
    onOpenChange: onOpenChangeEditPass,
  } = useDisclosure();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleOpenDeleteProfile = () => {
    onOpen();
  };

  const onSubmitDeleteProfile = () => {
    setUser(null);
    setAuth({
      isLoggedin: false,
      isAdmin: false,
    });
    // todo => after api
    // try {
    //   const response = await axios.post("https://localhost/deleteUserProfile", userData);
    //   if (response.data.success) {
    //     console.log("deleteUserProfile successful. User data:", response.data);
    //     setUser({
    //       username: email,
    //       email: email,
    //       department: "-",
    //     });
    //     setAuth({
    //       isLoggedin: true,
    //     });
    //     navigate("/");
    //   } else {
    //     console.error(
    //       "deleteUserProfile error.",
    //       response.data.message
    //     );
    //   }
    // } catch (error) {
    //   console.error("Server connection error. Please try again later.", error);
    // }
  };

  const validationSchema = Yup.object({
    password1: Yup.string()
      .required(t("signup.errors.password1_required"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        t("signup.errors.password1_invalid")
      ),
    password2: Yup.string()
      .required(t("signup.errors.password2_required"))
      .oneOf([Yup.ref("password1"), ""], t("signup.errors.password2_mismatch")),
  });

  const onSubmit = async (values: any) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/accounts/users/${user?.id}/edit/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(values),
        }
      );
      onClose();
      if (!response.ok) throw new Error("Failed to update user");
    } catch (error) {
      console.error("Error updating user:", error);
      onClose();
    }
  };

  const formik = useFormik({
    initialValues: {
      password1: "",
      password2: "",
    },
    onSubmit,
    validationSchema,
    validateOnMount: false,
    enableReinitialize: true,
  });

  return (
    <>
      <Card
        shadow="md"
        className="profile-sidebar-card"
        style={{
          height: "100vh",
        }}
      >
        <div className="profile-sidebar-avatar-container">
          <Avatar
            size="lg"
            src={
              user?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"
            }
            isBordered
            className="profile-sidebar-avatar"
          />
        </div>
        <h1 className="text-blue-700 font-bold text-xl mt-2">
          {user?.email || "نام کاربری"}
        </h1>
        <Divider className=" mb-8 mt-8" />
        <Spacer y={1} />
        <p>ایمیل: {user?.email || "ایمیل"}</p>
        <Spacer y={0.5} />
        <p>رشته: {user?.department || "رشته تحصیلی"}</p>
        {/* دکمه‌ها */}
        <div className="profile-sidebar-buttons">
          <Button
            color="primary"
            onClick={() => onOpenEditPass()}
            style={{ flex: 1 }}
          >
            تغییر رمز ورود
          </Button>
          {!auth.isAdmin && (
            <Button
              color="danger"
              onClick={() => handleOpenDeleteProfile()}
              style={{ flex: 1 }}
            >
              حذف پروفایل
            </Button>
          )}
        </div>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                حذف پروفایل
              </ModalHeader>
              <ModalBody>
                <p>آیا از حذف پروفایل کاربری خود اطمینان دارید؟</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  انصراف
                </Button>
                <Button color="primary" onPress={() => onSubmitDeleteProfile()}>
                  بله
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenEditPass}
        onOpenChange={onOpenChangeEditPass}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={formik.handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  تغییر رمز عبور
                </ModalHeader>
                <ModalBody>
                  <Input
                    {...formik.getFieldProps({ name: "password1" })}
                    name="password1"
                    label={t("signup.password")}
                    size="sm"
                    variant="bordered"
                    labelPlacement={"outside"}
                    type={isVisible ? "text" : "password"}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlash variant="Bulk" />
                        ) : (
                          <Eye variant="Bulk" />
                        )}
                      </button>
                    }
                    errorMessage={<>{formik.errors.password1 ?? ""}</>}
                    isInvalid={!!formik.errors.password1}
                  />
                  <Input
                    {...formik.getFieldProps({ name: "password2" })}
                    name="password2"
                    label={t("signup.confirm_password")}
                    size="sm"
                    variant="bordered"
                    labelPlacement={"outside"}
                    type={isVisible ? "text" : "password"}
                    errorMessage={<>{formik.errors.password2 ?? ""}</>}
                    isInvalid={!!formik.errors.password2}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    انصراف
                  </Button>
                  <Button color="primary" type="submit">
                    بله
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileSidebar;
