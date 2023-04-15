export default function Validate(state, newTarget) {
  if (state === null || state === undefined)
    throw new Error('state가 null 또는 undefined 입니다.');
  if (!Array.isArray(state)) throw new Error('state가 배열이 아닙니다.');
  if (newTarget === undefined) {
    throw new Error('new 키워드가 사용되지 않았습니다.');
  }
}
