import { useState } from "react";
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
  username: string;
  email: string;
  gender: eGender;
  department: string;
}

const mockUsers: IUserDto[] = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    gender: eGender.Male,
    department: "1",
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    gender: eGender.Female,
    department: "1",
  },
];

const UserPage = () => {
  const [subjectOptions, setSubjectOptions] = useState<any[]>([
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

  const [userToDelete, setUserToDelete] = useState<IUserDto | null>(null);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user: IUserDto) => {
    setEditUser(user);
    onOpenEditModalOpen();
  };

  const handleDelete = (user: IUserDto) => {
    setUserToDelete(user);
    onOpenDeleteModalOpen();
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u !== userToDelete));
    }
    onCloseDeleteModalOpen();
    setUserToDelete(null);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("نام پروفایل را وارد نمایید"),
    username: Yup.string().required("نام کاربری را وارد نمایید"),
    email: Yup.string()
      .email("فرمت ایمیل صحیح نیست")
      .required("ایمیل را وارد نمایید"),
    department: Yup.string().required("رشته تحصیلی را وارد نمایید"),
  });

  const onSubmit = async (values: IUserDto) => {
    const { name, email, username, department, id } = values;

    const tempUsers = [...users];
    const userIndex = tempUsers.findIndex((item) => item.id === id);
    const tempUser = users[userIndex];
    const updatedUser = {
      ...tempUser,
      name,
      email,
      username,
      department,
    };
    tempUsers[userIndex] = updatedUser;
    setUsers([...tempUsers]);
    onCloseEditModalOpen();
  };

  const formik = useFormik({
    initialValues: editUser || {
      id: 0,
      name: "",
      username: "",
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
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 mt-14">مدیریت کاربران</h1>
      <Input
        className="mb-4"
        placeholder="Search users..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-4">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center p-4 bg-gray-100 rounded-lg shadow"
          >
            <div className="col-span-2">
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="col-span-1">
              <p className="font-medium">
                {
                  subjectOptions.find((item) => item.id === user.department)
                    .title
                }
              </p>
            </div>
            <div className="flex justify-end gap-2 col-span-2">
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
        ))}
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
                      {...formik.getFieldProps({ name: "username" })}
                      name="username"
                      label="نام کاربری"
                      size="sm"
                      variant="bordered"
                      labelPlacement={"outside"}
                      errorMessage={<>{formik.errors.username ?? ""}</>}
                      isInvalid={!!formik.errors.username}
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
              {" "}
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
    </div>
  );
};

export default UserPage;
