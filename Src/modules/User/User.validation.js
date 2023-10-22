import { generalFields } from '../../middleware/validation.js'
import joi from 'joi';

export const profile = {
    file: generalFields.file.required(),
}

export const updatePassword = {
    body: joi.object({
        oldPassword: generalFields.password,
        newPassword: generalFields.password.invalid(joi.ref('oldPassword')),
        cPassword: generalFields.password.valid(joi.ref('newPassword')),
    })
}

export const shareProfile = {
    params: joi.object({
        id: generalFields.id
    })
}