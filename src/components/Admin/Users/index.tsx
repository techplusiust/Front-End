import { useState,useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  Select,
  SelectItem,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent,
} from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";

enum eGender {
  Male = "Male",
  Female = "Female",
}

interface IUserDto {
  id: number;
  name: string;
  email: string;
  gender: eGender;
  department: string;
}

const mockUsers: IUserDto[] = [
  {
    id: 1,
    name: "فرگل نصیری",
    email: "fargol@example.com",
    gender: eGender.Female,
    department: "1",
  },
  {
    id: 2,
    name: "هانیه",
    email: "haniyeh@example.com",
    gender: eGender.Female,
    department: "1",
  },
];

const UserPage = () => {
  const [subjectOptions] = useState<any[]>([
    {
      id: "1",
      title: "مهندسی کامپیوتر",
    },
  ]);
  const [users, setUsers] = useState<IUserDto[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState<IUserDto | null>(null);
  const {
    isOpen: isOpenEditModalOpen,
    onOpen: onOpenEditModalOpen,
    onOpenChange: onOpenChangeEditModalOpen,
    onClose: onCloseEditModalOpen,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteModalOpen,
    onOpen: onOpenDeleteModalOpen,
    onOpenChange: onOpenChangeDeleteModalOpen,
    onClose: onCloseDeleteModalOpen,
  } = useDisclosure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/accounts/users/`);
        if (!response.ok) throw new Error("Failed to fetch users");
        const data: IUserDto[] = await response.json();
        const validUsers = data.filter((user) => user && user.name);
        setUsers(validUsers.length ? validUsers : mockUsers); 
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers(mockUsers); // در صورت بروز خطا، داده‌های پیش‌فرض را ست می‌کنیم
      }
    };
  
    fetchUsers();
  }, []);
  

  const [userToDelete, setUserToDelete] = useState<IUserDto | null>(null);
  const [token] = useState("7ddcab480c848bf79280b8d2ed83ebc3ea1b6908");//your admin token

  const filteredUsers = users
  .filter((user) => user.name) // فقط کاربرانی که فیلد name دارند
  .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));


  const handleEdit = (user: IUserDto) => {
    setEditUser(user);
    onOpenEditModalOpen();
  };

  const handleDelete = (user: IUserDto) => {
    setUserToDelete(user);
    onOpenDeleteModalOpen();
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/accounts/users/${userToDelete.id}/delete/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to delete user");
        setUsers(users.filter((u) => u.id !== userToDelete.id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
      onCloseDeleteModalOpen();
      setUserToDelete(null);
    }
  };

  // const handleDeleteConfirm = () => {
  //   if (userToDelete) {
  //     setUsers(users.filter((u) => u !== userToDelete));
  //   }
  //   onCloseDeleteModalOpen();
  //   setUserToDelete(null);
  // };

  const validationSchema = Yup.object({
    name: Yup.string().required("نام پروفایل را وارد نمایید"),
    email: Yup.string()
      .email("فرمت ایمیل صحیح نیست")
      .required("ایمیل را وارد نمایید"),
    department: Yup.string().required("رشته تحصیلی را وارد نمایید"),
  });

  const onSubmit = async (values: IUserDto) => {
    const { name, email, department, id } = values;

    try {
      console.log("Sending data:", { id, name, email, department });
      const response = await fetch(
        `http://127.0.0.1:8000/api/accounts/users/${id}/edit/`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, email, department }),
        }
      );
      console.log("Response status:", response.status);
      if (!response.ok) throw new Error("Failed to update user");
      const updatedUser = await response.json();
      setUsers(users.map((u) => (u.id === id ? updatedUser : u)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
    onCloseEditModalOpen();

    // const tempUsers = [...users];
    // const userIndex = tempUsers.findIndex((item) => item.id === id);
    // const tempUser = users[userIndex];
    // const updatedUser = {
    //   ...tempUser,
    //   name,
    //   email,
    //   department,
    // };
    // tempUsers[userIndex] = updatedUser;
    // setUsers([...tempUsers]);
    // onCloseEditModalOpen();
  };

  const formik = useFormik({
    initialValues: editUser || {
      id: 0,
      name: "",
      email: "",
      gender: eGender.Male,
      department: "1",
    },
    onSubmit,
    validationSchema,
    validateOnMount: false,
    enableReinitialize: true,
  });

  return (
    <>
      <div className="container mx-auto px-4 mt-4 md:px-8">
        <h1 className="text-xl font-bold mb-4 text-center md:text-right">
          مدیریت کاربران
        </h1>
        <Input
          className="mb-6"
          placeholder="جستجو..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="space-y-4">
          {filteredUsers.map((user, index) => (
            user && user.name ? (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-center p-4 bg-gray-100 rounded-lg shadow-lg gap-4"
            >
              <div className="sm:col-span-1 md:col-span-2">
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div className="hidden md:block md:col-span-1">
                <p className="font-medium">
                  {
                    subjectOptions.find((item) => item.id === user.department)
                      .title
                  }
                </p>
              </div>
              <div className="flex justify-end md:justify-end md:col-span-2 gap-2">
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => handleEdit(user)}
                >
                  ویرایش
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => handleDelete(user)}
                >
                  حذف
                </Button>
              </div>
            </div>
            ) : null
          ))}
        </div>
      </div>
      <Modal
        isOpen={isOpenEditModalOpen}
        onOpenChange={onOpenChangeEditModalOpen}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-lg font-bold">ویرایش کاربر</h2>
              </ModalHeader>
              <ModalBody>
                {editUser && (
                  <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col"
                  >
                    <Input
                      {...formik.getFieldProps({ name: "name" })}
                      name="name"
                      label="نام پروفایل"
                      size="sm"
                      variant="bordered"
                      labelPlacement={"outside"}
                      errorMessage={<>{formik.errors.name ?? ""}</>}
                      isInvalid={!!formik.errors.name}
                    />
                    <Input
                      {...formik.getFieldProps({ name: "email" })}
                      name="email"
                      label="ایمیل"
                      size="sm"
                      variant="bordered"
                      labelPlacement={"outside"}
                      errorMessage={<>{formik.errors.email ?? ""}</>}
                      isInvalid={!!formik.errors.email}
                    />
                    <Select
                      size="sm"
                      label={"رشته"}
                      variant="bordered"
                      labelPlacement={"outside"}
                      {...formik.getFieldProps({ name: "department" })}
                      errorMessage={<>{formik.errors.department ?? ""}</>}
                      isInvalid={!!formik.errors.department}
                    >
                      {subjectOptions.map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </Select>
                    <div className="mt-4 flex items-center gap-2 justify-end">
                      <Button
                        variant="flat"
                        size="sm"
                        type="button"
                        color="danger"
                        onClick={onClose}
                      >
                        انصراف
                      </Button>
                      <Button
                        size="sm"
                        type="submit"
                        disabled={!formik.isValid}
                        color="primary"
                      >
                        تایید
                      </Button>
                    </div>
                  </form>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenDeleteModalOpen}
        onOpenChange={onOpenChangeDeleteModalOpen}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-lg font-bold">هشدار حذف کاربر</h2>
              </ModalHeader>
              <ModalBody>
                <p>آیا از حذف کاربر اطمینان دارید؟</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onClick={() => onClose()}>
                  انصراف
                </Button>
                <Button color="danger" onClick={handleDeleteConfirm}>
                  تایید
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserPage;
