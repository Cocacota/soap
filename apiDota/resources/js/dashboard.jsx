import { Link } from '@inertiajs/inertia-react';

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link href={route('heroes.index')}>Ver Héroes</Link>
        </div>
    );
}
