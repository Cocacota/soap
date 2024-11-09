import React from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import axios from 'axios';

export default function DonationForm() {
    const [amount, setAmount] = React.useState('');
    const [error, setError] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/donate', { amount });
            window.location.href = response.data.url; // Redirigir manualmente a la URL de Mercado Pago
        } catch (error) {
            setError('Hubo un problema al procesar la donación.');
        }
    };

    return (
        <GuestLayout>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputLabel htmlFor="amount" value="Monto de la Donación (USD)" />
                <TextInput
                    id="amount"
                    type="number"
                    value={amount}
                    min="1"
                    step="0.01"
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full mt-1"
                />
                {error && <InputError message={error} className="mt-2" />}
                <PrimaryButton className="mt-4" type="submit">
                    Donar con Mercado Pago
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
