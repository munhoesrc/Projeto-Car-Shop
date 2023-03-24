// Resposta
const answer = (_status: number, _message: unknown) => ({
  status: _status,
  message: _message,
});

// Resposta de erro
const answerError = (_status: number, _message: unknown) => ({
  status: _status,
  message: { message: _message },
});

export { answer, answerError };
