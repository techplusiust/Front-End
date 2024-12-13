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
} from "@nextui-org/react";

import { useEffect } from "react";
import "./ProfileSidebar.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../../recoil/userAtom";
import { authAtom } from "../../recoil/authAtom";

const ProfileSidebar = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const setAuth = useSetRecoilState(authAtom);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  useEffect(() => {
    if (user) {
      console.log("User Information: ", user);
    } else {
      console.log("No user information available.");
    }
  }, [user]);

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
          {user?.username || "نام کاربری"}
        </h1>
        <Divider className=" mb-8 mt-8" />
        <Spacer y={1} />
        <p>نام کاربری: {user?.username || "نام کاربری"}</p> <Spacer y={0.5} />
        <p>ایمیل: {user?.email || "ایمیل"}</p>
        <Spacer y={0.5} />
        <p>رشته: {user?.department || "رشته تحصیلی"}</p>
        {/* دکمه‌ها */}
        <div className="profile-sidebar-buttons">
          <Button
            color="primary"
            onClick={() => console.log("Change Password")}
            style={{ flex: 1 }}
          >
            تغییر رمز ورود
          </Button>

          <Button
            color="danger"
            onClick={() => handleOpenDeleteProfile()}
            style={{ flex: 1 }}
          >
            حذف پروفایل
          </Button>
        </div>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                <Button
                  onClick={() => onSubmitDeleteProfile()}
                  color="primary"
                  onPress={onClose}
                >
                  بله
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileSidebar;
