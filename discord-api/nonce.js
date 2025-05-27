export function nonce() {
  const timestamp = Date.now().toString(); // 13桁
  const randomPart = Math.floor(Math.random() * 1e6).toString().padStart(6, '0'); // 6桁
  return timestamp + randomPart; // 合計19桁
}