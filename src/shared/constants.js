const applicant =[{
  'title': 'Илья Журавлев',
  'salary_from': 400000,
  'currency': { 'key': 'RUR', 'value': '₽' },
  'age': 29,
  'is_relocation': false,
  'is_remote': true,
  'search_status_id': 'passive',
  'qualification_id': 'middle',
  'division_id': 'frontend_developer',
  'city_id': 'kirov',
  'skill_set': 'typescript,html,vue,javascript',
  'id': 'ichiro18',
  'user_id': 'uuid',
  'experience': '8 лет и 7 месяцев',
  'last_visited': '2024-06-08T16:54:15',
  'registered_at': '2024-06-08T16:54:16'
}]

export const statusDescriptions = {
  NEW: "Кандидат только что откликнулся на вакансию и ожидает начала обработки.",
  CV_REVIEW: "Текущий этап - оценка резюме кандидата на соответствие требованиям вакансии.",
  HR_INTERVIEW: "Запланировано или проводится первичное интервью с кандидатом для уточнения базовых данных и проверки общих навыков.",
  CV_AGREEMENT: "Рекрутер рассматривает и принимает решение о дальнейших шагах по этому кандидату на основе его резюме и первичного интервью.",
  JOB_INTERVIEW: "С кандидатом запланировано или проводится более углубленное техническое собеседование.",
  REQUIRED_TASK: "Кандидату выдано техническое задание для оценки его практических навыков.",
  WAITING: "Ожидание решения после выполнения всех предыдущих этапов, включая интервью и техническое задание.",
  OFFER_POSTED: "Кандидат получил предложение о работе (оффер).",
  OFFER_ACCEPTED: "Кандидат принял предложение о работе, заключается договор.",
  RESERVE: "Кандидат внесён в резерв. Возможно, с ним свяжутся в будущем при возникновении подходящей вакансии.",
  DECLINED: "Кандидату отказано на каком-либо этапе процесса найма.",
  DONE: "Процесс найма завершён. Кандидат успешно прошёл все этапы и принят на работу.",
}

export const REPLY_STATUS_COLOR = {
  "NEW": {bgColor: "bg-blue-100", textColor: "text-blue-700", fillColor: "fill-blue-500", bgIndicator: "bg-blue-500"},
  "CV_REVIEW": {bgColor: "bg-yellow-100", textColor: "text-yellow-700", fillColor: "fill-yellow-500", bgIndicator: "bg-yellow-500"},
  "HR_INTERVIEW": {bgColor: "bg-purple-100", textColor: "text-purple-700", fillColor: "fill-purple-500", bgIndicator: "bg-purple-500"},
  "CV_AGREEMENT": {bgColor: "bg-yellow-100", textColor: "text-yellow-700", fillColor: "fill-yellow-500", bgIndicator: "bg-yellow-500"},
  "JOB_INTERVIEW": {bgColor: "bg-indigo-100", textColor: "text-indigo-700", fillColor: "fill-indigo-500", bgIndicator: "bg-indigo-500"},
  "REQUIRED_TASK": {bgColor: "bg-purple-100", textColor: "text-purple-700", fillColor: "fill-purple-500", bgIndicator: "bg-purple-500"},
  "WAITING": {bgColor: "bg-yellow-100", textColor: "text-yellow-700", fillColor: "fill-yellow-500", bgIndicator: "bg-yellow-500"},
  "OFFER_POSTED": {bgColor: "bg-purple-100", textColor: "text-purple-700", fillColor: "fill-purple-500", bgIndicator: "bg-purple-500"},
  "OFFER_ACCEPTED": {bgColor: "bg-green-100", textColor: "text-green-700", fillColor: "fill-green-500", bgIndicator: "bg-green-500"},
  "RESERVE": {bgColor: "bg-yellow-100", textColor: "text-yellow-700", fillColor: "fill-yellow-500", bgIndicator: "bg-yellow-500"},
  "DECLINED": {bgColor: "bg-red-100", textColor: "text-red-700", fillColor: "fill-red-500", bgIndicator: "bg-red-500"},
  "DONE": {bgColor: 'bg-green-100', textColor: 'text-green-700', fillColor: "fill-green-500", bgIndicator: "bg-green-500"}
}
