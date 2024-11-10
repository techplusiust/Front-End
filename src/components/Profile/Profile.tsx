import { Card, Avatar, Divider, Spacer, Button } from "@nextui-org/react";
import { useUser } from "../../contexts/UserContext";
import { useEffect } from "react";
import "./ProfileSidebar.css";

const ProfileSidebar = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log("User Information: ", user);
    } else {
      console.log("No user information available.");
    }
  }, [user]);

  return (
    <Card
      shadow="md"
      className="profile-sidebar-card"
      style={{
        height: "100vh"
      }}
    >
      <div className="profile-sidebar-avatar-container">
        <Avatar
          size="lg"
          src={user?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
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
          auto
          onClick={() => console.log("Change Password")}
          style={{ flex: 1 }}
        >
          تغییر رمز ورود
        </Button>

        <Button
          color="danger"
          auto
          onClick={() => console.log("Delete Profile")}
          style={{ flex: 1 }}
        >
          حذف پروفایل
        </Button>
      </div>
    </Card>
  );
};

export default ProfileSidebar;
