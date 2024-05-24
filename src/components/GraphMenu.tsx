import { useEffect, useState } from 'react';

export default function MenuBar() {
    const IdBarFood = "barAlimentacion";
    const IdBarExercises = "barEjercicios";
    const [selectedItem, setSelectedItem] = useState<string>(IdBarFood);
    const [graphFood, setGraphFood] = useState('');
    const [graphExercises, setGraphExercises] = useState('');

    async function loadGraph(url: string) {
        const response = await fetch(url);
        if (response.ok) {
            return response.blob(); 
        }
    }
    
    useEffect(() => {
        async function fetchData() {
            const foodBlob = await loadGraph("http://localhost:5000/plot/food?id=1");
            const exercisesBlob = await loadGraph("http://localhost:5000/plot/exercise?id=1");
            setGraphFood(URL.createObjectURL(foodBlob!));
            setGraphExercises(URL.createObjectURL(exercisesBlob!));
        }
    
        fetchData();
    }, []);

    function BarItem({ id, barTitle } : { id: string, barTitle: string }) {
        return (
            <div className="w-full">
                <div 
                    onClick={() => setSelectedItem(id)}
                    className={`w-full p-3.5 text-center bg-gray-100 ${selectedItem === id ? 'selected' : ''} text-lg cursor-pointer`}
                >
                    {barTitle}
                </div>

                <style> {`
                    .selected {
                        border-bottom: 2px solid #00E0FF;
                        color: #00779C;
                    }
                `}
                </style>
            </div>
        );
    }

    function getTitle() {
        if(selectedItem == IdBarFood) {
            return "Consumo semanal de calorías";
        } else {
            return "Calorías quemadas";
        }
    }

    function getImage() {
        if(selectedItem == IdBarFood) {
            return graphFood;
        } else {
            return graphExercises;
        }    
    }

    return (
        <div className="flex flex-col w-full gap-5">
            <div className="flex flex-row w-full">
                <BarItem id={IdBarFood} barTitle="Alimentación"/>
                <BarItem id={IdBarExercises} barTitle="Ejercicios"/>
            </div>
            <div className="flex flex-col w-full gap-5">
                <div className="flex flex-col w-full">
                    <div className="text-xl">{getTitle()}</div>
                    <hr/>
                </div>
                <img src={getImage()}/>
            </div>
        </div>
    );
}