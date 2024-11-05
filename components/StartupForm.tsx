'use client'

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { formSchema } from '@/lib/validation'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { createPitch } from '@/lib/actions'

function StartupForm() {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState('');
    const { toast } = useToast()
    const router = useRouter()

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link') as string,
                pitch,
            }

            await formSchema.parseAsync(formValues)

            const result = await createPitch(prevState, formData, pitch)
            // const result = await createPitch.bind(null, prevState, formData, pitch)
            
            if (result?.status === 'SUCCESS') {
                toast({
                    title: "Успешно",
                    description: "Форма успешно заполнена",
                });
                router.push(`/startup/${result?._id}`)
            }   
            
            return result;
        } catch (error) {
            if(error instanceof z.ZodError) {
                setErrors((error.flatten().fieldErrors) as unknown as Record<string, string>)

                toast({
                    title: "Ошибка заполнения формы",
                    description: "Пожалуйста, проверьте форму",
                    variant: "destructive",
                });

                return { ...prevState, error: "Ошибка заполнения формы", status: "ERROR" }
            }

            toast({
                title: "Непредвиденная ошибка",
                description: "Непредвиденная ошибка, обратитесь к администратору",
                variant: "destructive",
            });

            return { ...prevState, error: "Непредвиденная ошибка", status: "ERROR" }
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
    })

  return (
    <form
        action={formAction}
        className='startup-form'
    >
        <div>
            <label htmlFor="title" className="startup-form_label">Наименование</label>
            <Input
                id='title'
                name='title'
                type="text"
                className="startup-form_input"
                required
                placeholder='Наименование стартапа'
            />
            {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>

        <div>
            <label htmlFor="description" className="startup-form_label">Описание</label>
            <Textarea
                id='description'
                name='description'
                className="startup-form_textarea"
                required
                placeholder='Описание стартапа'
            />
            {errors.description && <p className="startup-form_error">{errors.description}</p>}
        </div>

        <div>
            <label htmlFor="category" className="startup-form_label">Категория</label>
            <Input
                id='category'
                name='category'
                type="text"
                className="startup-form_input"
                required
                placeholder='Категория стартапа (Tech, Business, Education, etc.)'
            />
            {errors.category && <p className="startup-form_error">{errors.category}</p>}
        </div>

        <div>
            <label htmlFor="link" className="startup-form_label">Картинка</label>
            <Input
                id='link'
                name='link'
                type="text"
                className="startup-form_input"
                required
                placeholder='Картинка (url картинки)'
            />
            {errors.link && <p className="startup-form_error">{errors.link}</p>}
        </div>

        <div data-color-mode="light">
            <label htmlFor="pitch" className="startup-form_label">Описание идеи и принципа</label>
            <MDEditor
                id='pitch'
                preview='edit'
                value={pitch}
                onChange={(value) => setPitch(value as string)}
                height={300}
                style={{borderRadius: '10px', overflow: 'hidden'}}
                textareaProps={{
                    placeholder: 'Опишите свою идею и расскажите для чего она нужна...',
                }}
                previewOptions={{
                    disallowedElements: ['style']
                }}
            />
            {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
        </div>

        <Button
            type="submit"
            className="startup-form_btn text-white"
            disabled={isPending}
        >
            { isPending ? 'Публикация...' : 'Опубликовать стартап'}
            <Send className='size-6 ml-2'/>
        </Button>
    </form>
  )
}

export default StartupForm