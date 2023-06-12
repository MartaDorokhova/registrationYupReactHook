import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './App.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.email('Неверный почта')
		.required('Поле обязательно для заполнения'),
	password: yup
		.string()
		.matches(
			/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
			' Пароль должен содержать символы, буквы и цифры разного регистра. Минимум одна из букв должна быть заглавной. Длина пароля  не менее 6 символов',
		)
		.required('Поле обязательно для заполнения'),
	repeatPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Пароли не совпадают')
		.required('Поле обязательно для заполнения'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(validationSchema),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatPasswordError = errors.repeatPassword?.message;
	return (
		<div className={styles.App}>
			<form onSubmit={handleSubmit(sendFormData)}>
				<div>Почта</div>
				<input
					name="email"
					placeholder="Введите email"
					type="text"
					{...register('email')}
				/>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				<div>Пароль</div>
				<input
					name="password"
					placeholder="Введите пароль"
					type="text"
					{...register('password')}
				/>
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				<div>Повторите пароль</div>
				<input
					name="repeatPassword"
					placeholder="Повторите пароль"
					type="text"
					{...register('repeatPassword')}
				/>
				{repeatPasswordError && (
					<div className={styles.errorLabel}>{repeatPasswordError}</div>
				)}
				<button type="submit" disabled={!!passwordError}>
					Зарегистрироваться
				</button>
			</form>

			{/* <form onSubmit={handleSubmit(sendFormData)} className={styles.Form}>
				<div>Почта</div>
				<input
					name="email"
					type="email"
					placeholder="Введите email"
					value={email}
					className="styles.input"
				/>

				<input
					name="password"
					type="password"
					placeholder="Введите пароль"
					value={password}

				/>

				<div>Повторите пароль</div>
				<input
					name="repeatPassword"
					type="password"
					placeholder="Повторите пароль"
					value={repeatPassword}
				/> */}

			{/* <button
					type="submit"
					disabled={!!emailError}
				>
					Зарегистрироваться
				</button>
			</form> */}
		</div>
	);
};
