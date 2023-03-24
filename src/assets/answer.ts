// Resposta
const answer = (status: number, message: unknown) => ({ status, message });

// Resposta de erro
const answerError = (status: number, message: unknown) => ({ status, message });

export { answer, answerError };