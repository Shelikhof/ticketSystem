import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../UI";
import roleValidator from "../../utils/roleValidator";

interface IProp {
  role: string;
}

const Menu: React.FC<IProp> = ({ role }) => {
  return (
    <>
      {roleValidator(role, ["Админ", "Преподаватель", "Менеджер"]) && <Link to="/tickets">Заявки</Link>}
      {roleValidator(role, ["Админ"]) && <Link to="/groups">Группы</Link>}
      {roleValidator(role, ["Админ"]) && <Link to="/students">Студенты</Link>}
      {roleValidator(role, ["Админ"]) && <Link to="/users">Персонал</Link>}
      {roleValidator(role, ["Админ"]) && <Link to="/certificates">Справки</Link>}
      {roleValidator(role, ["Преподаватель"]) && (
        <Link to={"/tickets/add"}>
          <Button>Создать заявку</Button>
        </Link>
      )}
    </>
  );
};

export default Menu;
