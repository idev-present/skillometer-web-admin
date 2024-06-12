import { object, string} from 'yup';
import { yupToFormErrors } from '@/shared/utils/yupToFormErrors.js'


export const VacancyFormSchema = object({
  name: string().required("Необходимо заполнить поле"),
  salaryFrom: string().nullable(),
  salaryTo: string().nullable(),
  currency: string().required("Необходимо заполнить поле"),
  isRemote: string(),
  description: string().required("Необходимо заполнить поле"),
  team: string().required("Необходимо заполнить поле"),
  todo: string().required("Необходимо заполнить поле"),
  cityId: string().required("Необходимо заполнить поле"),
  employmentTypeId: string().required("Необходимо заполнить поле"),
  divisionId: string().required("Необходимо заполнить поле"),
  qualificationId: string().required("Необходимо заполнить поле"),
  skillSet: string().required("Необходимо заполнить поле"),
})

export const VacancyForm = {
  validate(fields) {
    console.log('fields', fields)
    try {
      VacancyFormSchema.validateSync(fields, { abortEarly: false });
    } catch (err) {
      return yupToFormErrors(err);
    }
  }
}

export default VacancyForm;
