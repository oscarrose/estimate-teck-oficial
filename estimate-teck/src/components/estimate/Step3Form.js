import React, { useState } from 'react'
import { Button, Spin, Table } from 'antd';
import useEstimate from "../../hooks/useEstimate"
function Step3From({ idProyecto }) {

   
    //Para saber cuando se estan obteniendo los datos
    const [loading, setLoanding] = useState(false);

    const { prev, setStep, saveProductivityPlatform,prevSaveComponents} = useEstimate();

 
    return (
        <Spin spinning={loading}>
           <h4>paso siguiente</h4>
        </Spin>
    )
}

export default Step3From