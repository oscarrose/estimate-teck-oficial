const tipoComponente = [
    {
        "TipoComponente_Id": 1,
        "NombreComponente": "Entradas Externas"
    },
    {
        "TipoComponente_Id": 2,
        "NombreComponente": "Salidas Externas"
    },
    {
        "TipoComponente_Id": 3,
        "NombreComponente": "Consultas Externas"
    },
    {
        "TipoComponente_Id": 4,
        "NombreComponente": "Archivos Lógicos Internos"
    },
    {
        "TipoComponente_Id": 5,
        "NombreComponente": "Interfaces Externas"
    }
]

const Complejidad = [
    {

        Complejidad: "Baja"
    },
    {

        Complejidad: "Media"
    },
    {

        Complejidad: "Alta"
    }
]

const ScoreForAdjustmentFactor = [
    {
        valor: 0,
        significado: "Sin influencia"
    },
    {
        valor: 1,
        significado: "Incidental"
    },
    {
        valor: 2,
        significado: "Moderado"
    },
    {
        valor: 3,
        significado: "Medio"
    },
    {
        valor: 4,
        significado: "Significativo"
    },
    {
        valor: 5,
        significado: "Esencial"
    }
]

const CharacteristicSystem = [
    {
        key: 1,
        characteristic: "Comunicación de datos"
    },
    {
        key: 2,
        characteristic: "Procesamiento de datos distribuido"
    },
    {
        key: 3,
        characteristic: "Rendimiento"
    },
    {
        key: 4,
        characteristic: "Uso del hardware existente"
    },
    {
        key: 5,
        characteristic: "Transacciones"
    },
    {
        key: 6,
        characteristic: "Entrada de datos interactiva6"
    },
    {
        key: 7,
        characteristic: "Eficiencia"
    },
    {
        key: 8,
        characteristic: "Actualizaciones on-line "
    },
    {
        key: 9,
        characteristic: "Complejidad de procesamiento"
    },
    {
        key: 10,
        characteristic: "Reusabilidad"
    },
    {
        key: 11,
        characteristic: "Facilidad de conversión e instalación"
    },
    {
        key: 12,
        characteristic: "Facilidad de operación"
    },
    {
        key: 13,
        characteristic: "Múltiples instalaciones"
    },
    {
        key: 14,
        characteristic: "Facilidad de mantenimiento"
    }
]
export { tipoComponente, Complejidad, ScoreForAdjustmentFactor, CharacteristicSystem }