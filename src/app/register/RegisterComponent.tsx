'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

type RegisterForm = {
    name: string
    password: string
    confirmPassword: string
    gender: string;
    terms: boolean;
}

export default function RegisterComponent() {
    const { handleSubmit, register, formState: { errors }, watch, reset } = useForm<RegisterForm>()
    const password = watch('password')

    const onSubmit = (data: RegisterForm) => {
        console.log(data);
        reset();
    };

    return (
        <div>
            <div>RegisterComponent</div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="mb-1 block font-medium">
                                Họ tên
                            </label>

                            <input
                                id="name"
                                type="text"
                                {...register('name', {
                                    required: 'Tên không được để trống',
                                    minLength: {
                                        value: 3,
                                        message: 'Tên tối thiểu 3 ký tự',
                                    },
                                })}
                                className="w-full rounded border px-3 py-2"
                            />

                            <p className="min-h-5 text-red-500">
                                {errors.name?.message}
                            </p>
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-1 block font-medium">
                                Mật khẩu
                            </label>

                            <input
                                id="password"
                                type="password"
                                {...register('password', {
                                    required: 'Mật khẩu không được để trống',
                                    minLength: {
                                        value: 8,
                                        message: 'Mật khẩu tối thiểu 8 ký tự',
                                    },
                                })}
                                className="w-full rounded border px-3 py-2"
                            />

                            <p className="min-h-5 text-red-500">
                                {errors.password?.message}
                            </p>
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="mb-1 block font-medium">
                                Xác nhận mật khẩu
                            </label>

                            <input
                                id="confirm-password"
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Xác nhận Mật khẩu không được để trống',
                                    minLength: {
                                        value: 8,
                                        message: 'Xác nhận Mật khẩu tối thiểu 8 ký tự',
                                    },
                                    validate: (value) =>
                                        value === password || 'Mật khẩu không khớp',
                                })}
                                className="w-full rounded border px-3 py-2"
                            />

                            <p className="min-h-5 text-red-500">
                                {errors.confirmPassword?.message}
                            </p>
                        </div>

                        <div>
                            <label className="mb-1 block font-medium">
                                Giới tính
                            </label>

                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="male"
                                        {...register('gender', {
                                            required: 'Vui lòng chọn giới tính',
                                        })}
                                    />
                                    Nam
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="female"
                                        {...register('gender', {
                                            required: 'Vui lòng chọn giới tính',
                                        })}
                                    />
                                    Nữ
                                </label>
                            </div>

                            <p className="min-h-5 text-red-500">
                                {errors.gender?.message}
                            </p>
                        </div>

                        <div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    {...register('terms', {
                                        required: 'Bạn phải đồng ý điều khoản',
                                    })}
                                />
                                Đồng ý điều khoản
                            </label>

                            <p className="min-h-5 text-red-500">
                                {errors.terms?.message}
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
                    >
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    )
}
