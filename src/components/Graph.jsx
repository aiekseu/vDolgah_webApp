import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getData } from '../data/localStorage';




const Graph = () => {

    var data = []
    var allNotes = getData('notes')
    var curentToMeSum = 0
    var currentMeToSum = 0

    allNotes.sort(function (a, b) {
        return new Date(b.DATE) - new Date(a.DATE);
    });
    allNotes.reverse()

    allNotes.forEach(element => {
        switch (element.ID) {
            case 'tome': {
                curentToMeSum += parseInt(element.SUM, 10)
                if (data[data.length-1].name === element.DATE) {
                    data.pop()
                }
                data.push({name: element.DATE, tome: curentToMeSum, meto: currentMeToSum })
                break;
            }
            case 'meto': {
                currentMeToSum += parseInt(element.SUM, 10)
                data.push({name: element.DATE, tome: curentToMeSum, meto: currentMeToSum})
                break;
            }
        }
    });

    return (
        <ResponsiveContainer height={300} width='100%'>
            <LineChart
                data={data}
                margin={{right: 30, top: 30}}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tome" name="Мне должны" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="meto" name="Я должен" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Graph;