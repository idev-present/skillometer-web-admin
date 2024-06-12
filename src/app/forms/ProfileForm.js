import {number, object, string} from 'yup';
import { yupToFormErrors } from '@/shared/utils/yupToFormErrors.js'


export const ProfileFormSchema = object({
  gender: string().required("Необходимо заполнить поле"),
  first_name: string().required("Необходимо заполнить поле"),
  last_name: string().required("Необходимо заполнить поле"),
  birthday: string().required("Необходимо заполнить поле"),
  city: string().required("Необходимо заполнить поле"),
  bio: string().required("Необходимо заполнить поле"),
  description: string().required("Необходимо заполнить поле"),
})

export const ProfileForm = {
  validate(fields) {
    try {
      ProfileFormSchema.validateSync(fields, { abortEarly: false });
    } catch (err) {
      return yupToFormErrors(err);
    }
  }
}

export default ProfileForm;
