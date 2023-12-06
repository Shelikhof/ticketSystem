"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateTicketTitle(groupName, reference) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
    return `Заявка от ${formattedDate} | ${reference} | ${groupName}`;
}
exports.default = generateTicketTitle;
//# sourceMappingURL=TitleGenerator.js.map