import { z } from 'zod';

export const formSchema = z.object({
	title: z
		.string()
		.min(3, 'Наименование должно содержать хотя бы 3 символа')
		.max(100, 'Наименование слишком длинное. Максимальная длина 100 символов.'),
	description: z
		.string()
		.min(20, 'Описание должно содержать хотя бы 20 символов')
		.max(500, 'Описание слишком длинное. Максимальная длина 500 символов.'),
	category: z
		.string()
		.min(3, 'Категория должна содержать хотя бы 3 символа')
		.max(30, 'Категория слишком длинная. Максимальная длина 30 символов.'),
	link: z
		.string()
		.url('Неправильная ссылка на картинку')
		.refine(async (url) => {
			try {
				const res = await fetch(url, { method: 'HEAD' });
				const contentType = res.headers.get('content-type');
				return contentType?.startsWith('image/');
			} catch {
				return false;
			}
		}, 'URL должен указывать на картинку'),
	pitch: z
		.string()
		.min(10, 'Описание идеи должно содержать хотя бы 10 символов'),
});
