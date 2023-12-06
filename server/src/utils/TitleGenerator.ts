function generateTicketTitle(groupName: string, reference: string): string {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;

  return `Заявка от ${formattedDate} | ${reference} | ${groupName}`;
}

export default generateTicketTitle;
