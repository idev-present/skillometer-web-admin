export const baseHHUrl = "https://hh.ru/vacancy"
export const baseHabrUrl = "https://career.habr.com/vacancies"
export const habrLink = (id) => {
  if(!id) return null
  return `${baseHabrUrl}/${id}`
}
export const hhLink = (id) => {
  if(!id) return null
  return `${baseHHUrl}/${id}`
}