import React from 'react'
/**
 *Se encarga de recibir para mostrar la informacion de los usuario
 * @param {*} { title, content }
 */
const DescriptionsItem = ({ title, content }) => {
    return (
        <div className="description-item-profile">
            <p className="description-item-profile-label">{title}:</p>
            {content}
        </div>
    )
}
export default DescriptionsItem;
