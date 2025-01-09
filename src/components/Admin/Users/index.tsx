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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [subjectOptions] = useState<any[]>([
    {
      id: "1",
      title: t("user_management.computer_engineering"),
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
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const [userToDelete, setUserToDelete] = useState<IUserDto | null>(null);
  const [token] = useState("your-admin-token");

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
    name: Yup.string().required(t("validation.name_required")),
    email: Yup.string()
      .email(t("validation.email_invalid"))
      .required(t("validation.email_required")),
    department: Yup.string().required(t("validation.department_required")),
  });

  const onSubmit = async (values: IUserDto) => {
    const { name, email, department, id } = values;

    try {
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
          {t("user_management.title")}
        </h1>
        <Input
          className="mb-6"
          placeholder={t("user_management.search_placeholder")}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="space-y-4">
          {filteredUsers.map((user, index) => (
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
                  {t("user_management.edit_user")}
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => handleDelete(user)}
                >
                  {t("user_management.delete_user")}
                </Button>
              </div>
            </div>
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
                <h2 className="text-lg font-bold">
                  {t("user_management.edit_user")}
                </h2>
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
                      label={t("user_management.name")}
                      size="sm"
                      variant="bordered"
                      labelPlacement={"outside"}
                      errorMessage={<>{formik.errors.name ?? ""}</>}
                      isInvalid={!!formik.errors.name}
                    />
                    <Input
                      {...formik.getFieldProps({ name: "email" })}
                      name="email"
                      label={t("user_management.email")}
                      size="sm"
                      variant="bordered"
                      labelPlacement={"outside"}
                      errorMessage={<>{formik.errors.email ?? ""}</>}
                      isInvalid={!!formik.errors.email}
                    />
                    <Select
                      size="sm"
                      label={t("user_management.department")}
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
                        {t("user_management.cancel")}
                      </Button>
                      <Button
                        size="sm"
                        type="submit"
                        disabled={!formik.isValid}
                        color="primary"
                      >
                        {t("user_management.confirm")}
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
                <h2 className="text-lg font-bold">
                  {t("user_management.delete_confirmation")}
                </h2>
              </ModalHeader>
              <ModalBody>
                <p>{t("user_management.delete_user_confirmation_text")}</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onClick={() => onClose()}>
                  {t("user_management.cancel")}
                </Button>
                <Button color="danger" onClick={handleDeleteConfirm}>
                  {t("user_management.confirm")}
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
