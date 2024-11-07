import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import Carrucel from '@/Components/Carusel';

export default function Dashboard() {
    const { data, setData, get, processing, errors, reset } = useForm({
        id_user: '',
        
    });

    
    return (
        <AuthenticatedLayout 
            header={
                <h2 className="text-3xl bg-gray-800 font-semibold leading-tight text-red-800 dark:text-gray-200  text-red-500">
                   pagina principal
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className=" h-screen w-screen flex flex-row ">
                <div className=" w-1/6 h-full sm:px-6 lg:px-8 bg-black p-5">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-4/5 ">
                        <div className=" p-6 text-gray-900 dark:text-gray-100 aos-flip-up">
                            lista de heroes aqui
                        </div>
                    </div>
                </div>
                <div className=" bg-neutral-500 columns-1 h-full w-5/6 flex-row">
                    <div className=" bg-neutral-800 h-2/5 w-full p-10 ">
                        <div className=" bg-neutral-600  h-full ">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-auto h-auto m-auto p-auto">
                                <div className=" p-auto m-auto ">
                                    <Carrucel/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-neutral-100 flex h-full ">
                        <div className="bg-neutral-300 h-full w-4/6 m-10 p-10">
                        
                        aqui posts
                        </div>
                        <div className="bg-red-700 w-2/6 h-full block">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-4/5 m-8">
                        <Link href='/proPlayer' className=" p-6  text-xl  text-gray-900 dark:text-gray-100 aos-flip-up">jugadores profecionales</Link>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-4/5 m-8">
                    <Link href='/heroes' className=" p-6  text-xl  text-gray-900 dark:text-gray-100 aos-flip-up">lista de los heroes</Link>

                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-4/5 m-8">
                    
                    <InputLabel htmlFor="id_user" value="ingrese el id del usuario" />

                    <TextInput
                        id="id_user"
                        name="id_user"
                        value={data.id_user}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('id_user', e.target.value)}
                        required
                    />

                        <InputError message={errors.name} className="mt-2" />
                        </div>
                        <Link href={`/matchs/${data.id_user}/history`}>
                            Ver historial de partidas
                        </Link>
                    
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
