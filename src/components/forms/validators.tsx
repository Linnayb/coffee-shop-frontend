import { Role } from "@/api/users"
import { z } from "zod"

export const nameValidations = {
    onChange: z
        .string()
        .min(3, "debe ser contener al menos 3 caracteres"),
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: z.string().refine(
        async (value) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return !value.includes('error')
        },
        { message: "No 'error' allowed in name", },
    ),
}

export const ageValidators = {
    onChange: z
        .coerce
        .number()
        .gte(0, "La edad minima es 0")
        .lte(200, "La edad maxima es 200")
    ,
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: z.coerce.number().refine(
        async (value) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return value >= 0
        },
        { message: "Solamente puedes aumentar la edad", },
    ),
}

export const usernameValidators = {
    onChange: z
        .string()
        .min(3, "debe ser contener al menos 3 caracteres"),
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: z.string().refine(
        async (value) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return !value.includes('error')
        },
        { message: "No 'error' allowed in first name", },
    ),
}

export const passwordValidators = {
    onChange: z
        .string()
        .min(8, "debe contener al menos 8 caracters")
        .refine(pass => {
            const containsUppercase = (ch: string) => /[A-Z]/.test(ch)
            const containsLowercase = (ch: string) => /[a-z]/.test(ch)
            const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_+\[\]{};':"\\|,.<>\/?~]/.test(ch)
            let countOfUppercase = 0,
                countOfLowercase = 0,
                countOfNumbers = 0,
                countOfSpecialChar = 0;
            for (let i = 0; i < pass.length; i++) {
                const ch = pass.charAt(i)
                if (!isNaN(+ch)) countOfNumbers++;
                else if (containsUppercase(ch)) countOfUppercase++;
                else if (containsLowercase(ch)) countOfLowercase++;
                else if (containsSpecialChar(ch)) countOfSpecialChar++;
            }
            return (countOfLowercase > 0 && countOfUppercase > 0 && countOfSpecialChar > 0 && countOfNumbers > 0)
        }, { message: "debe contener numeros, caracteres especiales, minusculas y mayusculas" }),
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: z.string().refine(
        async (value) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return !value.includes('error')
        },
        { message: "No 'error' allowed in first name", },
    ),
}

export const roleValidators = {
    onChange: z.nativeEnum(Role),
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: z.nativeEnum(Role).refine(
        async (value) => { await new Promise((resolve) => setTimeout(resolve, 1000)) },
        { message: "", },
    ),
}

