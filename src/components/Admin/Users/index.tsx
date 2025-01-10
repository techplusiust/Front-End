import { useState, useEffect } from "react";
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

interface IUserDto {
  id: number;
  fullname: string;
  national_code: string;
  email: string;
  department: string;
  student_number: string;
  is_superuser: boolean;
}

const UserPage = () => {
  const { t } = useTranslation();
  const [subjectOptions] = useState<any[]>([
    {
      id: "1",
      title: t("user_management.computer_engineering"),
    },
  ]);
  const [users, setUsers] = useState<IUserDto[]>([]);
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
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/accounts/users/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const data: IUserDto[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const filteredUsers = users
    .filter((user) => user.fullname)
    .filter((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
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
              Authorization: `Token ${token}`,
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

  const validationSchema = Yup.object({
    fullname: Yup.string().required(t("validation.name_required")),
    email: Yup.string()
      .email(t("validation.email_invalid"))
      .required(t("validation.email_required")),
    department: Yup.string().required(t("validation.department_required")),
  });

  const onSubmit = async (values: IUserDto) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/accounts/users/${values.id}/edit/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) throw new Error("Failed to update user");
      const updatedUser = await response.json();
      setUsers(users.map((u) => (u.id === values.id ? updatedUser : u)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
    onCloseEditModalOpen();
  };

  const formik = useFormik({
    initialValues: editUser || {
      id: 0,
      fullname: "",
      email: "",
      student_number: "",
      national_code: "",
      department: "1",
      is_superuser: false,
    },
    onSubmit,
    validationSchema,
    validateOnMount: false,
    enableReinitialize: true,
  });

  return (
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
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-center p-4 bg-gray-100 rounded-lg shadow-lg gap-4"
          >
            <div className="sm:col-span-1 md:col-span-2">
              <p className="font-medium">{user.fullname}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="hidden md:block md:col-span-1">
              <p className="font-medium">
                {
                  subjectOptions.find((item) => item.id === user.department)
                    ?.title || ""
                }
              </p>
            </div>
            <div className="flex justify-end md:col-span-2 gap-2">
              <Button color="primary" size="sm" onClick={() => handleEdit(user)}>
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
      <Modal
        isOpen={isOpenEditModalOpen}
        onOpenChange={onOpenChangeEditModalOpen}
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-bold">
              {t("user_management.edit_user")}
            </h2>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <Input
                {...formik.getFieldProps("fullname")}
                label={t("user_management.name")}
                isInvalid={!!formik.errors.fullname}
              />
              <Input
                {...formik.getFieldProps("email")}
                label={t("user_management.email")}
                isInvalid={!!formik.errors.email}
              />
              <Select
                {...formik.getFieldProps("department")}
                label={t("user_management.department")}
              >
                {subjectOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.title}
                  </SelectItem>
                ))}
              </Select>
              <Button type="submit" disabled={!formik.isValid}>
                {t("user_management.confirm")}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenDeleteModalOpen}
        onOpenChange={onOpenChangeDeleteModalOpen}
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader>
            <h2 className="text-lg font-bold">
              {t("user_management.delete_confirmation")}
            </h2>
          </ModalHeader>
          <ModalBody>
            <p>{t("user_management.delete_user_confirmation_text")}</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseDeleteModalOpen}>
              {t("user_management.cancel")}
            </Button>
            <Button color="danger" onClick={handleDeleteConfirm}>
              {t("user_management.confirm")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserPage;
