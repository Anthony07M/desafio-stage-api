const ERROR_MESSAGES = {
  User_email_key: { status: 409, message: 'Email já existe!' },
  notFound: { status: 404, message: 'Registro não encontrado' },
};

export const ERRORS_PRISMA = {
  P2002: (keyError: string) => {
    return ERROR_MESSAGES[keyError];
  },
  P2025: () => {
    return ERROR_MESSAGES['notFound'];
  },
};
