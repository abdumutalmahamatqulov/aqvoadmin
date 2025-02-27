  import React, { useState } from "react";
import { Button, message, Modal, Switch } from "antd";
import styles from "./Hodimlar.module.scss";
import { BACKEND_URL } from "../../Common/Constants";

const ViewModal = ({ isOpen, onClose, user }) => {
  if (!user) return null; // Agar user tanlanmagan bo'lsa, hech narsa ko'rsatmaymiz
  const [input, setInput] = useState(false);

  const handleAttendanceChange = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.key,
          isCame: input,
        }),
      });

      if (response.ok) {
        message.success("Muvaffaqiyatli o'zgartirildi!");
      } else {
        message.error("O'zgartirishda xatolik yuz berdi!");
      }
    } catch (error) {
      console.error(error);
      message.error("Server bilan bog‘lanishda xatolik!");
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      title="Hodim ma'lumotlari"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div className={styles.attendanceBox}>
        <p>
          <strong>Ism:</strong> {user.firstName}
        </p>
        <p>
          <strong>Familiya:</strong> {user.lastName}
        </p>
        <p>
          <strong>Telefon:</strong> {user.phoneNumber}
        </p>
        <p>
          <strong>Oylik daromadi:</strong> {user.salary}
        </p>
        <p>
          <strong>Lavozimi:</strong> {user.position}
        </p>
        <p>
          <strong>Ish boshlagan vaqti:</strong> {user.startedWorkingAt}
        </p>
        <div className={styles.attendance}>
          <p>
            <strong>Kelganmi:</strong>{" "}
            <Switch
              checked={input}
              checkedChildren="Ha"
              unCheckedChildren="Yo'q"
              onChange={() => {
                setInput(!input);
              }}
              style={{
                backgroundColor: input ? "green" : "red",
              }}
            />
          </p>
          <Button type="primary" onClick={handleAttendanceChange}>
            Saqlash
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewModal;
