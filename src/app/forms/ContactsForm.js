import {number, object, string} from 'yup';
import { yupToFormErrors } from '@/shared/utils/yupToFormErrors.js'


export const ContactsFormSchema = object({
  email: string().email('Некорректная почта').required("Необходимо заполнить поле"),
  phone: string().required("Необходимо заполнить поле"),
})

export const ContactsForm = {
  validate(fields) {
    try {
      ContactsFormSchema.validateSync(fields, { abortEarly: false });
    } catch (err) {
      return yupToFormErrors(err);
    }
  }
}

export default ContactsForm;
