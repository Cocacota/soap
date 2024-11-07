import React from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function DonationForm() {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Enviar la solicitud POST al controlador de Laravel
        post(route('donate'));
    };

    return (
        <GuestLayout>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputLabel htmlFor="amount" value="Monto de la Donación (USD)" />
                <TextInput
                    id="amount"
                    type="number"
                    value={data.amount}
                    min="1"
                    step="0.01"
                    onChange={(e) => setData('amount', e.target.value)}
                    className="block w-full mt-1"
                />
                <InputError message={errors.amount} className="mt-2" />
                <PrimaryButton className="mt-4" disabled={processing}>
                    Donar con Mercado Pago
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
