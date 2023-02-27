export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NewKeyWordRequiredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NewKeyWordRequiredError';
  }
}

export function Validate(state, newTarget) {
  if (state === null || state === undefined)
    throw new ValidationError('state가 null 또는 undefined 입니다.');
  if (!Array.isArray(state))
    throw new ValidationError('state가 배열이 아닙니다.');
  if (newTarget === undefined) {
    throw new NewKeyWordRequiredError('new 키워드가 사용되지 않았습니다.');
  }
}
