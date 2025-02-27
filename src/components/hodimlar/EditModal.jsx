import React, { useEffect, useState } from "react";
import { Button, Input, Modal, message } from "antd";
import styles from "./Hodimlar.module.scss";
import { BACKEND_URL } from "../../Common/Constants";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import PhoneInput from "react-phone-number-input";
dayjs.extend(customParseFormat);

const EditModal = ({ isOpen, onClose, selectedUser, isEditing }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    position: "",
    salary: "",
    startedWorkingAt: "",
  });

  // ⚡ selectedUser o‘zgarganda ma’lumotlarni o‘rnatish
  useEffect(() => {
    if (isEditing && selectedUser) {
      setUserData(selectedUser);
    } else {
      setUserData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        position: "",
        salary: "",
        startedWorkingAt: "",
      });
    }
  }, [selectedUser, isEditing]);

  // 📝 Inputlar uchun handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // 📤 Saqlash
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token"); // Tokenni olish

      // Backendga yuborish uchun faqat kerakli maydonlarni ajratib olish
      const cleanedUserData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        position: userData.position,
        salary: Number(userData.salary), // salary string bo‘lsa, numberga aylantiramiz
        startedWorkingAt: userData.startedWorkingAt,
        ...(isEditing && { password: "password" }), // Faqat PUT uchun password qo‘shiladi
      };

      if (isEditing) {
        // ✍️ PUT so‘rovi (hodimni yangilash)
        const response = await fetch(
          `${BACKEND_URL}/users/${selectedUser.key}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cleanedUserData),
          }
        );

        if (response.ok) {
          message.success("Hodim ma'lumotlari yangilandi!");
        } else {
          message.error("Hodimni yangilashda xatolik yuz berdi!");
        }
      } else {
        // ➕ POST so‘rovi (yangi hodim qo‘shish)
        const response = await fetch(`${BACKEND_URL}/auth/employee/sign-up`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cleanedUserData),
        });

        if (response.ok) {
          console.log("Yangi hodim:", cleanedUserData);
          message.success("Yangi hodim muvaffaqiyatli qo'shildi!");
        } else {
          message.error("Yangi hodim qo'shishda xatolik yuz berdi!");
        }
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      message.error("Server bilan bog‘lanishda xatolik!");
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      title={isEditing ? "Hodimni tahrirlash" : "Yangi hodim qo'shish"}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Bekor qilish
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Saqlash
        </Button>,
      ]}
    >
      <div className={styles.modalContent}>
        <div className={styles.inpBox}>
          <label>Ism: </label>
          <Input
            placeholder="Ism"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inpBox}>
          <label>Familiya: </label>
          <Input
            placeholder="Familiya"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inpBox}>
          <label>Telefon raqami: </label>
          <PhoneInput
            international
            defaultCountry="UZ"
            placeholder="Telefon raqam"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inpBox}>
          <label>Lavozim: </label>
          <Input
            placeholder="Lavozim"
            name="position"
            value={userData.position}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inpBox}>
          <label>Oylik: </label>
          <Input
            placeholder="Oylik daromad"
            name="salary"
            value={userData.salary}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inpBox}>
          <label>Ish boshlash sanasi: </label>
          <DatePicker
            format="DD/MM/YYYY"
            placeholder="Ish boshlanish sanasi"
            value={
              userData.startedWorkingAt
                ? dayjs(
                    userData.startedWorkingAt,
                    userData.startedWorkingAt.includes("/")
                      ? "DD/MM/YYYY"
                      : "YYYY-MM-DD"
                  )
                : null
            }
            onChange={(date, dateString) =>
              setUserData({ ...userData, startedWorkingAt: dateString })
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
