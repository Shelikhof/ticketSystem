const roleValidator = (role: string, accessRole: string[]) => {
  const i = accessRole.indexOf(role);
  if (i === -1) {
    return false;
  }
  return true;
};

export default roleValidator;
