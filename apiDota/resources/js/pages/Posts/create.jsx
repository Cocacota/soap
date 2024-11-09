import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';


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
        <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="titulo" value="titulo" />

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
                    <InputLabel htmlFor="contenido" value="contenido" />

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

                

                    <PrimaryButton className="ms-4" disabled={processing}>
                        publicar
                    </PrimaryButton>
                
            </form>
    );
};

export default PostCreate;