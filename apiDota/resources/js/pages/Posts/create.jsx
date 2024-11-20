import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';




const PostCreate = () => {
   
const { data, setData, post, processing, errors, reset } = useForm({
    titulo: '',
    contenido: '',
    
});

const submit = (e) => {
    e.preventDefault();

    post(route('posts.store'), {
        onFinish: () => reset('contenido',"titulo"),
    });
};

    return (
        <AuthenticatedLayout>
             
        <form onSubmit={submit} className='mx-80'>
                <div>
                    <InputLabel htmlFor="titulo" value="titulo" className='text-white'/>

                    <TextInput
                        id="titulo"
                        type="text"
                        name="titulo"
                        value={data.titulo}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('titulo', e.target.value)}
                    />

                    <InputError message={errors.titulo} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="contenido" value="contenido" className='text-white'/>

                    <TextInput
                        id="contenido"
                        type="textarea"
                        name="contenido"
                        value={data.contenido}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('contenido', e.target.value)}
                    />

                    <InputError message={errors.contenido} className="mt-2" />
                </div>

                

                    <PrimaryButton className="ms-4 text-white" disabled={processing}>
                        publicar
                    </PrimaryButton>
                
            </form>
            </AuthenticatedLayout>
    );
};

export default PostCreate;