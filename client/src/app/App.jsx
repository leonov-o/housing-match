import {useEffect, useState} from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

function App() {
    const [cities, setCities] = useState([]);
    useEffect(() => {
        getCities()
    }, []);

    const getCities = async() => {
        const cities = await fetch(import.meta.env.VITE_SERVER_URL + '/api/cities');
        setCities(await cities.json());
    }

    return (
        <div className="p-12 h-screen flex justify-center items-center">
            <div className="w-96 h-96 overflow-auto ">
                <Table>
                    <TableCaption>Список міст</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Місто</TableHead>
                            <TableHead className="text-right">Область</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            cities.map((city) => (
                                <TableRow key={city.id}>
                                    <TableCell>{city.city}</TableCell>
                                    <TableCell className="text-right">{city.region}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default App
