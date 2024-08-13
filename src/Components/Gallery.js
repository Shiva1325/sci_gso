import React from 'react';
import Transition from './Transition';
import GalleryCards from './GalleryCards';
import {eventsdata} from "./MembersData/eventsdata"
const Gallery = () => {
    return (
        <div>
            <h1>This is the gallery page</h1>
            <div className="properties">
                    {eventsdata.map((item) => (
                        <GalleryCards data={item} key={item.id} />
                    ))}
                </div>
        </div>
    )
}

export default Transition(Gallery);