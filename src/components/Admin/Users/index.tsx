import { useState } from "react";
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, useDisclosure, ModalContent } from "@nextui-org/react";

interface User {
  id: number;
  name: string;
  email: string;
  gender: "Male" | "Female";
  department: string;
}

const sharedUsers: User[] = [
  { id: 1, name: "علی محمدی", email: "ali@example.com", gender: "Male", department: "مهندسی کامپیوتر" },
  { id: 2, name: "مهدی حسینی", email: "mehdi@example.com", gender: "Male", department: "علوم پایه" },
  { id: 3, name: "فرگل نصیری", email: "fargol@example.com", gender: "Female", department: "مهندسی نرم‌افزار" },
  { id: 4, name: "امیررضا قاسمی", email: "amirreza@example.com", gender: "Male", department: "ریاضیات کاربردی" },
  { id: 5, name: "سمیرا علوی", email: "samira@example.com", gender: "Female", department: "علوم کامپیوتر" },
];

const UserPage = () => {
  const [users, setUsers] = useState(sharedUsers);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const { isOpen: isEditOpen, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    onOpenEdit();
  };

  const handleEditConfirm = () => {
    if (selectedUser) {
      setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
    }
    onOpenChangeEdit(false);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    onOpenDelete();
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete.id));
    }
    onOpenChangeDelete(false);
  };

  return (
    <div className="container mx-auto px-4 mt-2 md:px-8">
      <h1 className="text-xl font-bold mb-4 text-center md:text-right">مدیریت کاربران</h1>
      <Input className="mb-6" placeholder="جستجو..." onChange={(e) => setSearch(e.target.value)} />
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center p-4 bg-gray-100 rounded-lg shadow-lg gap-4">
            <div className="sm:col-span-1 md:col-span-2">
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="hidden md:block md:col-span-1">
              <p className="font-medium">{user.department}</p>
            </div>
            <div className="flex justify-end md:justify-end md:col-span-1 gap-2">
              <Button color="primary" size="sm" onClick={() => handleEdit(user)}>ویرایش</Button>
              <Button color="danger" size="sm" onClick={() => handleDelete(user)}>حذف</Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isEditOpen} onOpenChange={onOpenChangeEdit}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-lg font-bold">ویرایش کاربر</h2>
              </ModalHeader>
              <ModalBody>
                {selectedUser && (
                  <div className="flex flex-col gap-4">
                    <Input
                      label="نام"
                      value={selectedUser.name}
                      onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    />
                    <Input
                      label="ایمیل"
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    />
                    <Input
                      label="رشته"
                      value={selectedUser.department}
                      onChange={(e) => setSelectedUser({ ...selectedUser, department: e.target.value })}
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" color="danger" onClick={onClose}>انصراف</Button>
                <Button color="primary" onClick={handleEditConfirm}>ذخیره</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isDeleteOpen} onOpenChange={onOpenChangeDelete}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-lg font-bold">حذف کاربر</h2>
              </ModalHeader>
              <ModalBody>
                <p>آیا از حذف {userToDelete?.name} اطمینان دارید؟</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onClick={onClose}>انصراف</Button>
                <Button color="danger" onClick={handleDeleteConfirm}>حذف</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserPage;
